import Image from "next/image";
import { FileAudio, KeyRound, Mic } from "lucide-react";

import type { ToolIcon as ToolIconData } from "@/lib/tools";
import { cn } from "@/lib/utils";

const lucideMap = {
  KeyRound,
  Mic,
  FileAudio,
} as const;

type Props = {
  icon: ToolIconData;
  className?: string;
};

export function ToolIcon({ icon, className }: Props) {
  if (icon.type === "image") {
    return (
      <div
        className={cn(
          "relative flex size-12 items-center justify-center overflow-hidden rounded-xl bg-foreground/[0.04] ring-1 ring-foreground/10",
          className,
        )}
      >
        <Image
          src={icon.src}
          alt={icon.alt}
          width={32}
          height={32}
          className="size-8 object-contain"
        />
      </div>
    );
  }

  const LucideIcon = lucideMap[icon.name];
  return (
    <div
      className={cn(
        "flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/30",
        className,
      )}
    >
      <LucideIcon className="size-6" strokeWidth={2} />
    </div>
  );
}
