import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { getExtensionBySlug, privacyUpdated } from "@/lib/extensions";
import { pageSeo } from "@/lib/seo";

// The Chrome Web Store listing links here. Every statement is generated from
// the entry's `data_collected` + `analytics` fields — no hand-written policy.
export const Route = createFileRoute("/extensions/$slug/privacy")({
  loader: ({ params }) => {
    const ext = getExtensionBySlug(params.slug);
    if (!ext) throw notFound();
    return ext;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageSeo({
          path: `/extensions/${loaderData.slug}/privacy`,
          title: `${loaderData.name} privacy policy — LaMill`,
          description: `What ${loaderData.name} does and does not collect.`,
        })
      : { meta: [], links: [] },
  component: ExtensionPrivacy,
});

function ExtensionPrivacy() {
  const ext = Route.useLoaderData();
  const updated = privacyUpdated(ext);
  const collectsNothing = ext.data_collected.length === 0 && !ext.analytics;

  return (
    <SiteShell>
      <section>
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <Link
            to="/extensions/$slug"
            params={{ slug: ext.slug }}
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition hover:text-primary"
          >
            ← {ext.name}
          </Link>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            {ext.name} privacy policy
          </h1>
          {updated ? (
            <div className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Last updated {updated}
            </div>
          ) : null}

          <div className="mt-12 space-y-10 text-muted-foreground">
            <div>
              <h2 className="text-xl font-semibold text-foreground">What is collected</h2>
              {collectsNothing ? (
                <p className="mt-3 leading-relaxed">
                  Nothing. All processing happens locally in your browser. {ext.name} does not
                  collect, store, or transmit any personal data, browsing history, or page content,
                  and does not use analytics.
                </p>
              ) : (
                <>
                  <p className="mt-3 leading-relaxed">
                    {ext.data_collected.length
                      ? `${ext.name} collects only the following:`
                      : `${ext.name} does not collect personal data or page content.`}
                  </p>
                  {ext.data_collected.length ? (
                    <ul className="mt-3 list-disc space-y-1 pl-5">
                      {ext.data_collected.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  ) : null}
                </>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">Analytics</h2>
              <p className="mt-3 leading-relaxed">
                {ext.analytics
                  ? `${ext.name} sends usage analytics to help us understand how it is used. No page content is included.`
                  : `${ext.name} does not use analytics or tracking of any kind.`}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">Sharing</h2>
              <p className="mt-3 leading-relaxed">
                We do not sell or share data with third parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">Permissions</h2>
              <p className="mt-3 leading-relaxed">
                Each permission the extension requests, and why, is listed on its{" "}
                <Link
                  to="/extensions/$slug"
                  params={{ slug: ext.slug }}
                  className="text-foreground underline underline-offset-4 hover:text-primary"
                >
                  extension page
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">Contact</h2>
              <p className="mt-3 leading-relaxed">
                Questions about this policy:{" "}
                <a
                  href="mailto:hello@lamill.io"
                  className="text-foreground underline underline-offset-4 hover:text-primary"
                >
                  hello@lamill.io
                </a>
                .
              </p>
            </div>
          </div>

          <div className="mt-14 border-t border-border pt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Built by LaMill
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
