import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site-shell";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/web-systems")({
  head: () =>
    pageSeo({
      path: "/web-systems",
      title: "LaMill Web Systems — Websites, Web Apps, Mobile",
      description:
        "LaMill Web Systems builds marketing sites, SaaS web apps, and native-feel mobile apps from a single senior team.",
      ogTitle: "LaMill Web Systems",
      ogDescription: "Websites, web apps, and mobile apps — one team, shipped end-to-end.",
    }),
  component: WebSystemsPage,
});

const platforms = [
  {
    id: "01",
    kicker: "Websites",
    title: "Marketing sites that load fast and convert.",
    desc: "Content-driven sites built on modern static and SSR stacks. SEO-first, accessible, and edge-deployed.",
    bullets: [
      "Next.js / Astro / TanStack Start",
      "Headless CMS integration",
      "Edge hosting + analytics",
      "Core Web Vitals tuned",
    ],
  },
  {
    id: "02",
    kicker: "Web Apps",
    title: "Internal tools and SaaS products that scale.",
    desc: "Dashboards, admin panels, and full SaaS platforms. Real auth, real data, real-time when you need it.",
    bullets: [
      "React + TypeScript front ends",
      "Rails / Go / Python APIs",
      "Postgres, Redis, queues",
      "Auth, billing, observability",
    ],
  },
  {
    id: "03",
    kicker: "Mobile Apps",
    title: "Native-feel mobile from a single codebase.",
    desc: "iOS and Android apps shipped together — with native bridges to BLE, sensors, and hardware when the product demands it.",
    bullets: [
      "React Native / Expo",
      "BLE + device integrations",
      "Offline-first sync",
      "App Store + Play release",
    ],
  },
];

const stack = [
  "TypeScript",
  "React",
  "TanStack",
  "Next.js",
  "Astro",
  "Tailwind",
  "Node",
  "Rails",
  "Go",
  "Python",
  "Postgres",
  "Redis",
  "React Native",
  "Expo",
  "Cloudflare",
  "AWS",
];

function WebSystemsPage() {
  return (
    <SiteShell>
      <PageHeader
        kicker="LaMill Web Systems"
        title={
          <>
            Websites, web apps, and mobile — <span className="text-primary glow-text">one team.</span>
          </>
        }
        intro="LaMill Web Systems is our product engineering practice. From marketing pages to SaaS platforms to mobile apps with native hardware bridges — we own the surface, end to end."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="space-y-px overflow-hidden rounded-sm border border-border bg-border">
            {platforms.map((p) => (
              <article
                key={p.id}
                className="grid gap-8 bg-background p-8 transition hover:bg-card md:grid-cols-[200px_1fr_1fr] md:p-10"
              >
                <div>
                  <div className="font-mono text-xs text-muted-foreground">{p.id}</div>
                  <div className="mt-2 font-mono text-xs uppercase tracking-widest text-primary">
                    {p.kicker}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{p.title}</h3>
                  <p className="mt-3 text-muted-foreground">{p.desc}</p>
                </div>
                <ul className="space-y-2 md:border-l md:border-border md:pl-8">
                  {p.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground"
                    >
                      <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">// Stack</div>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
            Modern, boring tech — chosen because it ships.
          </h2>
          <div className="mt-10 flex flex-wrap gap-2">
            {stack.map((s) => (
              <span
                key={s}
                className="rounded-sm border border-border bg-background px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">
            // Engage
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Have a surface you need <span className="text-primary glow-text">shipped?</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90"
            >
              Start a project →
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary"
            >
              Engineering services
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}