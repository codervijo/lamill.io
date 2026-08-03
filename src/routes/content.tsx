import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site-shell";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/content")({
  head: () =>
    pageSeo({
      path: "/content",
      title: "Content — LaMill",
      description:
        "Original articles, photography, video, and design — content production that ships alongside the product.",
      ogDescription: "Articles, photography, video, and design production.",
    }),
  component: ContentPage,
});

const tracks = [
  {
    id: "01",
    title: "Articles",
    desc: "Original, translated, and search-engine-friendly long-form content for product, brand, and docs.",
    bullets: ["Original content", "Translation", "SEO-friendly"],
    handle: "@lamill_content",
  },
  {
    id: "02",
    title: "Photography",
    desc: "Exclusive pictures and graphics for brand, product, and editorial use.",
    bullets: ["Pictures", "Graphics", "Exclusive"],
    handle: "@lamill_pics",
  },
  {
    id: "03",
    title: "Video",
    desc: "Educational, review, and entertainment video — scripted, shot, and edited in-house.",
    bullets: ["Educational", "Review", "Entertainment"],
    handle: "@lamill_studio",
  },
  {
    id: "04",
    title: "Design",
    desc: "Web design, digital design, and infographics that match the product's visual language.",
    bullets: ["Web design", "Digital design", "Infographics"],
    handle: "@lamill_design",
  },
];

function ContentPage() {
  return (
    <SiteShell>
      <PageHeader
        kicker="Content Creation"
        title={
          <>
            Content that ships with <span className="text-primary glow-text">the product.</span>
          </>
        }
        intro="Articles, photography, video, and design — produced in-house and tuned for product, brand, and growth."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
            {tracks.map((t) => (
              <article key={t.id} className="bg-background p-8 md:p-10">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                  <span className="font-mono text-xs text-primary">{t.handle}</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight md:text-3xl">
                  {t.title}
                </h3>
                <p className="mt-3 max-w-md text-muted-foreground">{t.desc}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {t.bullets.map((b) => (
                    <li
                      key={b}
                      className="rounded-sm border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-12 max-w-2xl font-mono text-xs uppercase tracking-widest text-muted-foreground">
            // We're currently working on several open source and proprietary content systems. Stay
            tuned.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">// Brief</div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Send us a brief. We'll send back a <span className="text-primary glow-text">plan.</span>
          </h2>
          <div className="mt-10">
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