import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site-shell";
import { getAllExtensions } from "@/lib/extensions";
import { pageSeo } from "@/lib/seo";

// Hub pages stay short and link out: the SEO copy lives on each extension's
// tool page on the portfolio site, and these pages must not compete with it.
export const Route = createFileRoute("/extensions/")({
  head: () =>
    pageSeo({
      path: "/extensions",
      title: "Extensions — LaMill",
      description:
        "Chrome extensions built by LaMill: store links, permissions, privacy, and support.",
    }),
  loader: () => ({ extensions: getAllExtensions() }),
  component: ExtensionsIndex,
});

function ExtensionsIndex() {
  const { extensions } = Route.useLoaderData();

  return (
    <SiteShell>
      <PageHeader
        kicker="Extensions"
        title="Browser extensions."
        intro="Built by LaMill. Each one links to its store listing and its full tool page."
      />

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          {extensions.length === 0 ? (
            <div className="rounded-sm border border-border bg-card/30 p-12 text-center">
              <div className="font-mono text-xs uppercase tracking-widest text-primary">
                // Coming soon
              </div>
            </div>
          ) : (
            <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
              {extensions.map((x) => (
                <article key={x.slug} className="flex flex-col bg-background p-8 md:p-10">
                  <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    <Link
                      to="/extensions/$slug"
                      params={{ slug: x.slug }}
                      className="transition hover:text-primary"
                    >
                      {x.name}
                    </Link>
                  </h2>
                  <p className="mt-3 max-w-md flex-1 text-muted-foreground">{x.pitch}</p>
                  <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-widest">
                    <a
                      href={x.tool_page_url}
                      className="rounded-sm bg-primary px-4 py-2 font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                      Tool page ↗
                    </a>
                    {x.store_url ? (
                      <a
                        href={x.store_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-sm border border-border px-4 py-2 text-foreground transition hover:border-primary hover:text-primary"
                      >
                        Chrome Web Store ↗
                      </a>
                    ) : (
                      <span className="rounded-sm border border-dashed border-border px-4 py-2 text-muted-foreground">
                        In development
                      </span>
                    )}
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
