import { createHmac, timingSafeEqual } from "node:crypto";

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
  const a = Buffer.from(input, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

type Bucket = { count: number; lockedUntil: number };
const RATE: Map<string, Bucket> = (globalThis as unknown as { __rateLimit?: Map<string, Bucket> }).__rateLimit ?? new Map();
(globalThis as unknown as { __rateLimit?: Map<string, Bucket> }).__rateLimit = RATE;

const MAX_FAILS = 5;
const LOCK_MS = 30 * 60 * 1000;

export function checkRate(ip: string): { ok: true } | { ok: false; retryAfterMs: number } {
  const now = Date.now();
  const b = RATE.get(ip);
  if (b && b.lockedUntil > now) return { ok: false, retryAfterMs: b.lockedUntil - now };
  return { ok: true };
}

export function recordFail(ip: string): void {
  const now = Date.now();
  const b = RATE.get(ip) ?? { count: 0, lockedUntil: 0 };
  b.count += 1;
  if (b.count >= MAX_FAILS) {
    b.lockedUntil = now + LOCK_MS;
    b.count = 0;
  }
  RATE.set(ip, b);
}

export function recordSuccess(ip: string): void {
  RATE.delete(ip);
}
