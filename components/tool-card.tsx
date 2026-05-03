import Link from "next/link";
import { ArrowUpRight, BookOpen, Download, ExternalLink, KeySquare } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DownloadModal } from "@/components/download-modal";
import { GithubMark } from "@/components/icons/github";
import { ToolIcon } from "@/components/tool-icon";
import type { ActionKind, Tool } from "@/lib/tools";

const kindIcon: Record<ActionKind, React.ComponentType<{ className?: string }>> = {
  use: KeySquare,
  download: Download,
  docs: BookOpen,
  github: GithubMark,
};

type Props = { tool: Tool };

export function ToolCard({ tool }: Props) {
  const SecondaryIcon = kindIcon[tool.secondary.kind];

  return (
    <Card className="group/tool relative gap-5 overflow-hidden p-6 ring-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:ring-primary/40 hover:shadow-[0_24px_60px_-30px_color-mix(in_oklch,var(--primary)_60%,transparent)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/tool:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, color-mix(in oklch, var(--primary) 18%, transparent), transparent 70%)",
        }}
      />

      <CardHeader className="!grid-cols-1 gap-4 px-0">
        <div className="flex items-start justify-between gap-3">
          <ToolIcon icon={tool.icon} />
          <ArrowUpRight
            className="size-5 text-muted-foreground/50 transition-colors group-hover/tool:text-primary"
            aria-hidden
          />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-lg tracking-tight">{tool.name}</CardTitle>
          <CardDescription className="text-sm">{tool.tagline}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 px-0">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {tool.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tool.tech.map((t) => (
            <Badge
              key={t}
              variant="outline"
              className="bg-foreground/[0.03] text-muted-foreground"
            >
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="!rounded-none !border-0 !bg-transparent flex items-center gap-2 px-0 pt-2">
        <PrimaryAction tool={tool} />
        <Button
          asChild
          size="lg"
          variant="outline"
          aria-label={`${tool.name} の ${tool.secondary.label} を開く`}
        >
          <a
            href={"href" in tool.secondary ? tool.secondary.href : "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SecondaryIcon className="size-4" />
            <span className="sr-only md:not-sr-only">
              {tool.secondary.label}
            </span>
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

function PrimaryAction({ tool }: { tool: Tool }) {
  const a = tool.primary;
  if (a.kind === "use") {
    return (
      <Button asChild size="lg" className="flex-1">
        <Link href={`/use/${a.tool}`} aria-label={`${tool.name}: ${a.label}`}>
          <KeySquare className="size-4" />
          {a.label}
        </Link>
      </Button>
    );
  }
  if (a.kind === "download") {
    return (
      <DownloadModal triggerLabel={a.label} triggerClassName="flex-1" />
    );
  }
  // docs / github (fallback for future)
  return (
    <Button asChild size="lg" className="flex-1">
      <a
        href={a.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${tool.name}: ${a.label}`}
      >
        {a.kind === "github" ? (
          <GithubMark className="size-4" />
        ) : (
          <BookOpen className="size-4" />
        )}
        {a.label}
      </a>
    </Button>
  );
}
