"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ArrowLeft, KeyRound, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyPassword, type VerifyState } from "./actions";
import type { ToolId } from "@/lib/auth";

const initial: VerifyState = {};

type Props = { tool: ToolId };

export function PasswordGate({ tool }: Props) {
  const [state, action, pending] = useActionState(
    verifyPassword.bind(null, tool),
    initial,
  );

  return (
    <form
      action={action}
      className="flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-card p-6 shadow-[0_24px_60px_-40px_color-mix(in_oklch,var(--primary)_60%,transparent)]"
    >
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm">
          <KeyRound className="size-4 text-primary" />
          パスワード
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          inputMode="numeric"
          autoComplete="off"
          autoFocus
          required
          placeholder="••••••"
          aria-describedby={state.error ? "password-error" : undefined}
        />
      </div>

      {state.error ? (
        <p
          id="password-error"
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {state.error}
          {state.retryAfterSec ? (
            <span className="block text-xs opacity-80">
              再試行まで約 {Math.ceil(state.retryAfterSec / 60)} 分
            </span>
          ) : null}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            認証中…
          </>
        ) : (
          <>
            <KeyRound className="size-4" />
            アクセス
          </>
        )}
      </Button>

      <Link
        href="/"
        className="inline-flex items-center justify-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3" />
        ポータルへ戻る
      </Link>
    </form>
  );
}
