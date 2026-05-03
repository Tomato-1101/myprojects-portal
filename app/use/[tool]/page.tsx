import { notFound } from "next/navigation";

import { PasswordGate } from "./password-gate";

const TOOL_LABELS = {
  "meeting-transcriber": {
    name: "Meeting Transcriber",
    note: "音声ファイルをアップロードして文字起こしと AI 処理を行う Web アプリです。",
  },
  keyprobe: {
    name: "keyprobe",
    note: "API キー検出と残高チェックのローカル専用ツール。tomato 個人用ロックです。",
  },
} as const;

type Params = { tool: keyof typeof TOOL_LABELS };

export default async function UseToolPage({ params }: { params: Promise<Params> }) {
  const { tool } = await params;
  const meta = TOOL_LABELS[tool];
  if (!meta) notFound();

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 grid-bg"
      />
      <div className="w-full max-w-md">
        <div className="mb-8 space-y-2 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            tomato.tools / use / {tool}
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            {meta.name}
          </h1>
          <p className="text-sm text-muted-foreground">{meta.note}</p>
        </div>
        <PasswordGate tool={tool} />
      </div>
    </main>
  );
}
