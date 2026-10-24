import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Brand, SiteShell } from "@/components/site-shell";
import { Gallery, HeroVideo } from "@/components/extension-media";
import { getExtensionBySlug, storeLink } from "@/lib/extensions";
import { extensionJsonLd, getExtensionPage } from "@/lib/extension-pages";
import { pageSeo, SITE_ORIGIN } from "@/lib/seo";

// Landing-page template. Facts come from extensions.json (Tabmill); copy, media
// and FAQ from src/content/extension-pages/<slug>.ts (lamill-owned). Without a
// copy file the page stays short: install, permissions, changelog, tool page.
export const Route = createFileRoute("/extensions/$slug/")({
  loader: ({ params }) => {
    const ext = getExtensionBySlug(params.slug);
    if (!ext) throw notFound();
    return { ext, page: getExtensionPage(ext.slug) ?? null };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [], links: [] };
    const { ext, page } = loaderData;
    return pageSeo({
      path: `/extensions/${ext.slug}`,
      title: page?.title ?? `${ext.name} — LaMill Extensions`,
      description: page?.description ?? ext.pitch,
      image: page?.og ? `${SITE_ORIGIN}${page.og.src}` : undefined,
      imageSize: page?.og?.size,
      jsonLd: extensionJsonLd(ext, page ?? undefined),
      noindex: ext.status === "unlisted",
    });
  },
  component: ExtensionDetail,
});

const kicker = "font-mono text-[11px] uppercase tracking-widest text-primary";
const h2 = "mt-3 text-2xl font-semibold tracking-tight md:text-3xl";

function ExtensionDetail() {
  const { ext, page } = Route.useLoaderData();
  const install = storeLink(ext);

  return (
    <SiteShell>
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-20 md:pt-28">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <li>
                <Link to="/" className="transition hover:text-primary">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link to="/extensions" className="transition hover:text-primary">
                  Extensions
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-foreground">
                {ext.name}
              </li>
            </ol>
          </nav>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
            {page?.h1 ?? ext.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            {page?.valueProp ?? ext.pitch}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {install ? (
              <a
                href={install}
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
            {!page ? (
              <a
                href={ext.tool_page_url}
                className="inline-flex items-center gap-2 rounded-sm border border-primary px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-primary transition hover:bg-primary/10"
              >
                Full tool page ↗
              </a>
            ) : null}
          </div>

          {page?.facts.length ? (
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {page.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          ) : null}

          {page?.heroVideo ? (
            <div className="mt-12">
              <HeroVideo video={page.heroVideo} />
            </div>
          ) : null}
        </div>
      </section>

      {page && (page.steps.length || page.gallery.length) ? (
        <section className="border-b border-border">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
            <div className={kicker}>// How it works</div>
            <h2 className={h2}>From page to file.</h2>
            {page.steps.length ? (
              <ol className="mt-6 grid gap-4 md:grid-cols-3">
                {page.steps.map((s, i) => (
                  <li key={s} className="flex gap-3 text-muted-foreground">
                    <span className="font-mono text-sm text-primary">0{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            ) : null}
            {page.gallery.length ? (
              <div className="mt-10">
                <Gallery shots={page.gallery} />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section>
        <div className="mx-auto grid max-w-3xl gap-14 px-6 py-16 md:py-24">
          {page?.sections.map((s) => (
            <div key={s.kicker}>
              <div className={kicker}>// {s.kicker}</div>
              <h2 className={h2}>{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="mt-4 text-muted-foreground">
                  {p}
                </p>
              ))}
              {s.items.length ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground marker:text-primary">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          <div>
            <div className={kicker}>// Permissions</div>
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

          {page?.faq.length ? (
            <div>
              <div className={kicker}>// FAQ</div>
              <h2 className={h2}>Questions.</h2>
              <dl className="mt-6 divide-y divide-border rounded-sm border border-border">
                {page.faq.map((f) => (
                  <div key={f.q} className="p-5">
                    <dt className="font-semibold text-foreground">{f.q}</dt>
                    <dd className="mt-2 text-sm text-muted-foreground">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          {page?.links.length ? (
            <ul className="space-y-3">
              {page.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-primary underline-offset-4 hover:underline">
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          {ext.changelog.length ? (
            <div>
              <div className={kicker}>// Changelog</div>
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

          {install && page ? (
            <div>
              <a
                href={install}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90"
              >
                Add to Chrome ↗
              </a>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-6 border-t border-border pt-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <Link to="/extensions/privacy" className="transition hover:text-primary">
              Privacy policy
            </Link>
            <Link to="/extensions/support" className="transition hover:text-primary">
              Support
            </Link>
            <span>
              Built by <Brand />
            </span>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
