import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site-shell";
import { getAllExtensions } from "@/lib/extensions";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/extensions/support")({
  head: () =>
    pageSeo({
      path: "/extensions/support",
      title: "Extension support — LaMill",
      description: "Get help with a LaMill browser extension.",
    }),
  loader: () => ({ extensions: getAllExtensions() }),
  component: ExtensionSupport,
});

function ExtensionSupport() {
  const { extensions } = Route.useLoaderData();

  return (
    <SiteShell>
      <PageHeader kicker="Extensions" title="Support." />

      <section>
        <div className="mx-auto grid max-w-3xl gap-12 px-6 py-20 md:py-28">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary">// Email</div>
            <a
              href="mailto:hello@lamill.io"
              className="mt-3 block text-2xl font-semibold tracking-tight text-foreground transition hover:text-primary md:text-3xl"
            >
              hello@lamill.io
            </a>
            <p className="mt-6 text-muted-foreground">
              Include the extension name, its version (shown in chrome://extensions), and what you
              expected versus what happened.
            </p>
          </div>

          {extensions.length ? (
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-primary">
                // Extensions
              </div>
              <ul className="mt-4 divide-y divide-border rounded-sm border border-border">
                {extensions.map((x) => (
                  <li
                    key={x.slug}
                    className="flex flex-wrap items-center justify-between gap-3 p-5 text-sm"
                  >
                    <Link
                      to="/extensions/$slug"
                      params={{ slug: x.slug }}
                      className="text-foreground transition hover:text-primary"
                    >
                      {x.name}
                    </Link>
                    <Link
                      to="/extensions/$slug/privacy"
                      params={{ slug: x.slug }}
                      className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition hover:text-primary"
                    >
                      Privacy
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="border-t border-border pt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Built by LaMill
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
