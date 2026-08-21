import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export type ToolId = "meeting-transcriber" | "keyprobe";

const TOKEN_TTL_MS = 5 * 60 * 1000; // 5 minutes — short window for redirect handoff

function b64url(buf: Buffer): string {
  return buf.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function getSecret(): Buffer {
  const s = process.env.HMAC_SECRET;
  if (!s) throw new Error("HMAC_SECRET is not set");
  return Buffer.from(s, "utf8");
}

export function signToken(tool: ToolId): { t: string; s: string } {
  const payload = `${tool}.${Date.now() + TOKEN_TTL_MS}`;
  const t = b64url(Buffer.from(payload, "utf8"));
  const s = b64url(createHmac("sha256", getSecret()).update(t).digest());
  return { t, s };
}

export function verifyPasswordConstantTime(input: string, expected: string): boolean {
  // 長さ不一致での早期 return は応答時間からパスワード長が漏れるため、
  // 両者を固定長ハッシュに落としてから比較する（長さ情報も消える）
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

type Bucket = { count: number; lockedUntil: number; updatedAt: number };
type GlobalBucket = { fails: number; windowStart: number };

// Note: globalThis 経由なので同一 Vercel function インスタンス内では永続。
// インスタンス間（cold start, リージョン分散）では共有されないが、
// PORTAL_PASSWORD は十分長くしてあるので緩いブルートフォース耐性で十分。
// 厳密に守りたければ Vercel KV / Upstash に移す（現状はスコープ外）。
const STORE = (globalThis as unknown as {
  __rateLimit?: Map<string, Bucket>;
  __rateLimitGlobal?: GlobalBucket;
});
const RATE: Map<string, Bucket> = STORE.__rateLimit ?? new Map();
STORE.__rateLimit = RATE;
const GLOBAL: GlobalBucket = STORE.__rateLimitGlobal ?? { fails: 0, windowStart: Date.now() };
STORE.__rateLimitGlobal = GLOBAL;

const MAX_FAILS = 5;
const LOCK_MS = 30 * 60 * 1000;
// 全 IP 合算でこの試行数を超えたら全リクエストを一旦ロック（分散ブルートフォース対策）
const GLOBAL_MAX_FAILS = 50;
const GLOBAL_WINDOW_MS = 30 * 60 * 1000;

export function checkRate(ip: string): { ok: true } | { ok: false; retryAfterMs: number } {
  const now = Date.now();
  // global window のリセット
  if (now - GLOBAL.windowStart > GLOBAL_WINDOW_MS) {
    GLOBAL.windowStart = now;
    GLOBAL.fails = 0;
  }
  if (GLOBAL.fails >= GLOBAL_MAX_FAILS) {
    return { ok: false, retryAfterMs: GLOBAL_WINDOW_MS - (now - GLOBAL.windowStart) };
  }
  const b = RATE.get(ip);
  if (b && b.lockedUntil > now) return { ok: false, retryAfterMs: b.lockedUntil - now };
  return { ok: true };
}

export function recordFail(ip: string): void {
  const now = Date.now();
  // 失敗だけして去った IP のエントリは recordSuccess で消えず溜まり続けるため、
  // 一定サイズを超えたら期限切れ分を掃除する（長寿命 isolate でのメモリ単調増加対策）
  if (RATE.size > 500) {
    for (const [k, v] of RATE) {
      if (v.lockedUntil < now && now - v.updatedAt > LOCK_MS) RATE.delete(k);
    }
  }
  const b = RATE.get(ip) ?? { count: 0, lockedUntil: 0, updatedAt: now };
  b.updatedAt = now;
  b.count += 1;
  if (b.count >= MAX_FAILS) {
    b.lockedUntil = now + LOCK_MS;
    b.count = 0;
  }
  RATE.set(ip, b);
  if (now - GLOBAL.windowStart > GLOBAL_WINDOW_MS) {
    GLOBAL.windowStart = now;
    GLOBAL.fails = 0;
  }
  GLOBAL.fails += 1;
}

export function recordSuccess(ip: string): void {
  RATE.delete(ip);
}
