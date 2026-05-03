"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  checkRate,
  recordFail,
  recordSuccess,
  signToken,
  verifyPasswordConstantTime,
  type ToolId,
} from "@/lib/auth";

const TOOL_LABELS: Record<ToolId, string> = {
  "meeting-transcriber": "Meeting Transcriber",
  keyprobe: "keyprobe",
};

function urlFor(tool: ToolId): string | undefined {
  if (tool === "meeting-transcriber") return process.env.MEETING_TRANSCRIBER_URL;
  if (tool === "keyprobe") return process.env.KEYPROBE_URL;
  return undefined;
}

async function getIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown"
  );
}

export type VerifyState = {
  error?: string;
  retryAfterSec?: number;
};

export async function verifyPassword(
  tool: ToolId,
  _prev: VerifyState,
  formData: FormData,
): Promise<VerifyState> {
  const ip = await getIp();

  const rate = checkRate(ip);
  if (!rate.ok) {
    return {
      error: `試行回数が多すぎます。しばらく待ってからやり直してください。`,
      retryAfterSec: Math.ceil(rate.retryAfterMs / 1000),
    };
  }

  const expected = process.env.PORTAL_PASSWORD;
  if (!expected) {
    return { error: "サーバー側でパスワードが未設定です。管理者に連絡してください。" };
  }

  const input = String(formData.get("password") ?? "");
  if (!input) return { error: "パスワードを入力してください。" };

  if (!verifyPasswordConstantTime(input, expected)) {
    recordFail(ip);
    return { error: "パスワードが違います。" };
  }

  recordSuccess(ip);

  const base = urlFor(tool);
  if (!base) {
    return {
      error: `${TOOL_LABELS[tool]} のホスティング URL がまだ設定されていません。`,
    };
  }

  const { t, s } = signToken(tool);
  redirect(`${base.replace(/\/$/, "")}/_enter?t=${t}&s=${s}`);
}
