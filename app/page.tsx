import { GithubMark } from "@/components/icons/github";
import { ToolCard } from "@/components/tool-card";
import { tools } from "@/lib/tools";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col">
      <div
        aria-hidden
        className="grid-bg pointer-events-none absolute inset-0 -z-10"
      />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8 sm:pt-10">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/40">
            <span className="size-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
          </div>
          <span className="font-mono text-sm tracking-tight text-foreground/90">
            tomato<span className="text-muted-foreground">.tools</span>
          </span>
        </div>
        <a
          href="https://github.com/Tomato-1101"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          aria-label="GitHub プロフィールを開く"
        >
          <GithubMark className="size-4" />
          <span className="hidden sm:inline">@Tomato-1101</span>
        </a>
      </header>

      <section className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 pt-20 pb-12 sm:pt-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-xs text-muted-foreground">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          Personal tools, made by tomato
        </div>
        <h1 className="font-heading text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl md:text-6xl">
          Tools I built.
          <br />
          <span className="text-muted-foreground">Pick one.</span>
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          会議の文字起こし、ホットキー音声入力、API キー検査――。
          普段使いのために自分で作った3つのツールをここに置いておく。
        </p>
      </section>

      <section
        aria-label="Tools"
        className="mx-auto w-full max-w-6xl flex-1 px-6 pb-24"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <footer className="mx-auto w-full max-w-6xl px-6 pb-10">
        <div className="flex flex-col items-start justify-between gap-3 border-t border-foreground/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>
            Built with Next.js + shadcn/ui · Deployed on Vercel
          </span>
          <span className="font-mono">
            © {new Date().getFullYear()} tomato
          </span>
        </div>
      </footer>
    </main>
  );
}
