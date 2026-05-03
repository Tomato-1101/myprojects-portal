"use client";

import { useState } from "react";
import { Apple, Download, MonitorCog } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const REPO = "https://github.com/Tomato-1101/voicekey";
const RELEASE_BASE = `${REPO}/releases/latest/download`;

type Props = {
  triggerLabel: string;
  triggerClassName?: string;
};

export function DownloadModal({ triggerLabel, triggerClassName }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className={triggerClassName}>
          <Download className="size-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Voicekey をダウンロード</DialogTitle>
          <DialogDescription>
            お使いの OS を選んでください。GitHub Releases から最新版がダウンロードされます。
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-2">
          <Button asChild size="lg" variant="outline" className="justify-start">
            <a
              href={`${RELEASE_BASE}/voicekey-mac.dmg`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <Apple className="size-5" />
              <span className="ml-1">macOS — voicekey-mac.dmg</span>
            </a>
          </Button>

          <Button asChild size="lg" variant="outline" className="justify-start">
            <a
              href={`${RELEASE_BASE}/voicekey-windows.zip`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <MonitorCog className="size-5" />
              <span className="ml-1">Windows — voicekey-windows.zip</span>
            </a>
          </Button>
        </div>

        <DialogFooter className="flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={`${REPO}/releases`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground underline-offset-4 hover:underline"
          >
            すべてのリリースを見る →
          </a>
          <span className="text-xs text-muted-foreground">
            初回リリースが未公開の場合は 404 になります
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
