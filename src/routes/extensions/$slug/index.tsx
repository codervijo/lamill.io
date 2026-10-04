import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { getExtensionBySlug } from "@/lib/extensions";
import { pageSeo } from "@/lib/seo";

// Deliberately short: what it does, install, permissions, changelog. The full
// write-up is the tool page on the portfolio site, linked prominently.
export const Route = createFileRoute("/extensions/$slug/")({
  loader: ({ params }) => {
    const ext = getExtensionBySlug(params.slug);
    if (!ext) throw notFound();
    return ext;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageSeo({
          path: `/extensions/${loaderData.slug}`,
          title: `${loaderData.name} — LaMill Extensions`,
          description: loaderData.pitch,
        })
      : { meta: [], links: [] },
  component: ExtensionDetail,
});

function ExtensionDetail() {
  const ext = Route.useLoaderData();

  return (
    <SiteShell>
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-20 md:pt-28">
          <Link
            to="/extensions"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition hover:text-primary"
          >
            ← All extensions
          </Link>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">{ext.name}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{ext.pitch}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {ext.store_url ? (
              <a
                href={ext.store_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90"
              >
                Add to Chrome ↗
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-sm border border-dashed border-border px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                In development
              </span>
            )}
            <a
              href={ext.tool_page_url}
              className="inline-flex items-center gap-2 rounded-sm border border-primary px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-primary transition hover:bg-primary/10"
            >
              Full tool page ↗
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-3xl gap-14 px-6 py-16 md:py-24">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-primary">
              // Permissions
            </div>
            {ext.permissions.length ? (
              <dl className="mt-4 divide-y divide-border rounded-sm border border-border">
                {ext.permissions.map((p) => (
                  <div key={p.name} className="grid gap-1 p-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                    <dt className="font-mono text-sm text-foreground">{p.name}</dt>
                    <dd className="text-sm text-muted-foreground">{p.reason}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">No special permissions.</p>
            )}
          </div>

          {ext.changelog.length ? (
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-primary">
                // Changelog
              </div>
              <ol className="mt-4 space-y-5">
                {ext.changelog.map((c) => (
                  <li key={c.version + c.date}>
                    <div className="font-mono text-sm text-foreground">
                      {c.version} <span className="text-muted-foreground">· {c.date}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{c.notes}</p>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-6 border-t border-border pt-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <Link
              to="/extensions/$slug/privacy"
              params={{ slug: ext.slug }}
              className="transition hover:text-primary"
            >
              Privacy policy
            </Link>
            <Link to="/extensions/support" className="transition hover:text-primary">
              Support
            </Link>
            <span>Built by LaMill</span>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
