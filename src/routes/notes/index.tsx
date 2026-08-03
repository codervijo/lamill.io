import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site-shell";
import { getAllNotes } from "@/content/notes";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/notes/")({
  head: () =>
    pageSeo({
      path: "/notes",
      title: "Notes — LaMill",
      description:
        "Technical writing from LaMill — engineering notes on embedded Linux, web systems, and the tools we build with.",
      ogDescription: "Engineering notes from LaMill on the systems and tools we build with.",
    }),
  loader: () => ({ notes: getAllNotes() }),
  component: NotesIndex,
});

function NotesIndex() {
  const { notes } = Route.useLoaderData();

  return (
    <SiteShell>
      <PageHeader
        kicker="Notes"
        title={
          <>
            Engineering notes, <span className="text-primary glow-text">from the workshop.</span>
          </>
        }
        intro="Technical writing on the systems we build — embedded Linux, web platforms, and the tradeoffs behind the tools we pick."
      />

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          {notes.length === 0 ? (
            <div className="rounded-sm border border-border bg-card/30 p-12 text-center">
              <div className="font-mono text-xs uppercase tracking-widest text-primary">
                // Coming soon
              </div>
              <p className="mt-3 text-muted-foreground">
                Notes are being written up. Check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
              {notes.map((n) => (
                // The link wraps the title only — anchor text is the article
                // headline, not the whole card blob. Full-card clickability
                // comes from the title link's ::after overlay (inset-0 against
                // the relative card), so no nested/duplicated anchors.
                <article
                  key={n.slug}
                  className="group relative flex flex-col bg-background p-8 transition hover:bg-card md:p-10"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-muted-foreground">
                      {n.datePublished}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground transition group-hover:text-primary">
                      →
                    </span>
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold tracking-tight md:text-3xl">
                    {/* Note bodies are bespoke per-article routes (not a $slug
                        param route), so link by URL. Server-rendered <a>,
                        fully crawlable. */}
                    <a
                      href={`/notes/${n.slug}`}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {n.title}
                    </a>
                  </h2>
                  <p className="mt-3 max-w-md flex-1 text-muted-foreground">{n.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {n.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-sm border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
