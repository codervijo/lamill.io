import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site-shell";
import { getAllWork } from "@/lib/content";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — LaMill" },
      {
        name: "description",
        content:
          "Selected web work by LaMill — marketing sites, content platforms, and catalogs built and shipped end to end.",
      },
      { property: "og:title", content: "Work — LaMill" },
      {
        property: "og:description",
        content: "Selected web work by LaMill — sites built and shipped end to end.",
      },
    ],
  }),
  loader: () => ({ work: getAllWork() }),
  component: WorkIndex,
});

function WorkIndex() {
  const { work } = Route.useLoaderData();

  return (
    <SiteShell>
      <PageHeader
        kicker="Work"
        title={
          <>
            Sites we've <span className="text-primary glow-text">built and shipped.</span>
          </>
        }
        intro="A selection of web work — marketing sites, content platforms, and catalogs, taken from idea to live."
      />

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          {work.length === 0 ? (
            <div className="rounded-sm border border-border bg-card/30 p-12 text-center">
              <div className="font-mono text-xs uppercase tracking-widest text-primary">
                // Coming soon
              </div>
              <p className="mt-3 text-muted-foreground">
                Portfolio pieces are being written up. Check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
              {work.map((w) => (
                <Link
                  key={w.slug}
                  to="/work/$slug"
                  params={{ slug: w.slug }}
                  className="group flex flex-col bg-background p-8 transition hover:bg-card md:p-10"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-muted-foreground">{w.date}</span>
                    <span className="font-mono text-xs text-muted-foreground transition group-hover:text-primary">
                      →
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight md:text-3xl">
                    {w.title}
                  </h3>
                  <p className="mt-3 max-w-md flex-1 text-muted-foreground">{w.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {w.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-sm border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
