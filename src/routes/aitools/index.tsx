import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site-shell";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/aitools/")({
  head: () =>
    pageSeo({
      path: "/aitools",
      title: "AI Tools — LaMill",
      description:
        "A collection of AI-powered tools and utilities — text generation, image analysis, and more.",
      ogDescription: "AI-powered tools and utilities by LaMill.",
    }),
  component: AIToolsPage,
});

const tools = [
  // Both tools are setTimeout mocks with no LLM/vision behind them, so they
  // carry the same "Coming soon" treatment as 03/04 rather than a "Try now"
  // CTA. Re-link them here once they are wired to a real model.
  {
    id: "01",
    title: "Text Generator",
    desc: "Generate creative text content using AI.",
    to: null,
    cta: "Coming soon",
  },
  {
    id: "02",
    title: "Image Analyzer",
    desc: "Analyze and describe images with AI.",
    to: null,
    cta: "Coming soon",
  },
  {
    id: "03",
    title: "Code Assistant",
    desc: "Get help with coding tasks and debugging.",
    to: null,
    cta: "Coming soon",
  },
  {
    id: "04",
    title: "Language Translator",
    desc: "Translate text between multiple languages.",
    to: null,
    cta: "Coming soon",
  },
];

function AIToolsPage() {
  return (
    <SiteShell>
      <PageHeader
        kicker="AI Tools"
        title={
          <>
            Utilities, <span className="text-primary glow-text">powered by AI.</span>
          </>
        }
        intro="A small collection of AI-powered tools and utilities. More land as we build them."
      />

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
            {tools.map((t) => (
              <article
                key={t.id}
                className="group relative flex flex-col bg-background p-8 transition hover:bg-card md:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                  <span className="font-mono text-xs text-muted-foreground transition group-hover:text-primary">
                    {t.to ? "→" : ""}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight md:text-3xl">
                  {t.title}
                </h3>
                <p className="mt-3 max-w-md flex-1 text-muted-foreground">{t.desc}</p>
                <div className="mt-6">
                  {t.to ? (
                    <Link
                      to={t.to}
                      className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90"
                    >
                      {t.cta} →
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {t.cta}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
