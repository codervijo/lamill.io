import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Brand, SiteShell } from "@/components/site-shell";
import { getPrivacyPolicy } from "@/lib/privacy";
import { pageSeo } from "@/lib/seo";

// The Chrome Web Store listing of every LaMill extension links here. Generated
// from src/content/privacy.json (Tabmill) — no hand-written policy text that
// could drift from what Tabmill's release lint checks.
export const Route = createFileRoute("/extensions/privacy")({
  loader: () => {
    const policy = getPrivacyPolicy();
    if (!policy) throw notFound();
    return policy;
  },
  head: () =>
    pageSeo({
      path: "/extensions/privacy",
      title: "Browser extensions privacy policy — LaMill",
      description:
        "What LaMill's browser extensions collect (nothing), what they can access, and why.",
    }),
  component: ExtensionsPrivacy,
});

function ExtensionsPrivacy() {
  const policy = Route.useLoaderData();
  const permissions = Object.entries(policy.permissions);

  return (
    <SiteShell>
      <section>
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <Link
            to="/extensions"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition hover:text-primary"
          >
            ← Extensions
          </Link>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            Browser extensions privacy policy
          </h1>
          <div className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {/* one string: Tabmill's release lint greps the raw HTML for "Policy version N" */}
            {`Policy version ${policy.version} · Last updated ${policy.updated}`}
          </div>
          <p className="mt-8 leading-relaxed text-muted-foreground">
            This policy covers every Chrome extension published by LaMill.
          </p>

          <div className="mt-12 space-y-10 text-muted-foreground">
            <div>
              <h2 className="text-xl font-semibold text-foreground">What is collected</h2>
              <p className="mt-3 leading-relaxed">
                Nothing. All processing happens locally in your browser. Our extensions do not
                collect, store, or transmit any personal data, browsing history, or page content.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">Analytics</h2>
              <p className="mt-3 leading-relaxed">
                None. Our extensions do not use analytics or tracking of any kind.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">Remote code</h2>
              <p className="mt-3 leading-relaxed">
                None. All code ships inside the extension package reviewed by the Chrome Web Store;
                nothing is downloaded and run later.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">Sharing</h2>
              <p className="mt-3 leading-relaxed">
                We do not sell or share data with third parties — there is no data to share.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">Permissions</h2>
              <p className="mt-3 leading-relaxed">
                These are the only permissions our extensions request. Each extension uses just the
                ones it needs; its own page on{" "}
                <Link
                  to="/extensions"
                  className="text-foreground underline underline-offset-4 hover:text-primary"
                >
                  lamill.io/extensions
                </Link>{" "}
                lists exactly which, and why. None of our extensions request access to all websites.
              </p>
              <dl className="mt-6 space-y-4">
                {permissions.map(([name, reason]) => (
                  <div key={name}>
                    <dt className="font-mono text-sm text-foreground">{name}</dt>
                    <dd className="mt-1 leading-relaxed">{reason}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">Changes</h2>
              <p className="mt-3 leading-relaxed">
                If an extension ever needs to do more than this policy describes, the policy is
                updated first and its version number changes.
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
            Built by <Brand />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
