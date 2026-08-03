import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { getWorkBySlug } from "@/lib/content";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const entry = getWorkBySlug(params.slug);
    if (!entry) throw notFound();
    return entry;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageSeo({
          path: `/work/${loaderData.slug}`,
          title: `${loaderData.title} — LaMill Work`,
          description: loaderData.description,
          // Per-entry card when one exists; otherwise the sitewide fallback.
          image: loaderData.ogImage,
        })
      : { meta: [], links: [] },
  component: WorkDetail,
});

function WorkDetail() {
  const entry = Route.useLoaderData();

  return (
    <SiteShell>
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-20 md:pt-28">
          <Link
            to="/work"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition hover:text-primary"
          >
            ← All work
          </Link>

          <div className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {entry.date}
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
            {entry.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{entry.summary}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {entry.url ? (
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90"
              >
                Visit live site ↗
              </a>
            ) : null}
            {entry.tags.map((t) => (
              <span
                key={t}
                className="rounded-sm border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-3xl gap-12 px-6 py-16 md:py-24">
          {entry.stack.length || entry.outcome ? (
            <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
              {entry.stack.length ? (
                <div className="bg-background p-6">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-primary">
                    // Stack
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {entry.stack.map((s) => (
                      <span key={s} className="font-mono text-sm text-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
              {entry.outcome ? (
                <div className="bg-background p-6">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-primary">
                    // Outcome
                  </div>
                  <p className="mt-3 text-sm text-foreground">{entry.outcome}</p>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="space-y-6">
            {entry.body.map((para, i) => (
              <p key={i} className="text-lg leading-relaxed text-muted-foreground">
                {para}
              </p>
            ))}
          </div>

          <div className="border-t border-border pt-10">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90"
            >
              Start a project →
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
