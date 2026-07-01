import { createFileRoute, Link } from "@tanstack/react-router";
import heroSphere from "@/assets/hero-sphere.jpg";
import { SiteShell } from "@/components/site-shell";

// JSON-LD entity markup for the homepage hub (Organization-as-ProfessionalService).
// Scoped to "/" only via this route's head() — child pages get their own
// appropriate @type later; do not move this into __root.tsx.
// Canonical host is the apex (lamill.io, never www) — fleet-wide locked convention.
const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "LaMill",
  url: "https://lamill.io/",
  email: "hello@lamill.io",
  slogan: "Build. Deploy. Advance.",
  description:
    "Engineering studio for full stack, Linux, hardware bringup, IoT, and web systems.",
  // Dedicated brand logo (SVG) — distinct from the og:image social-share PNG.
  logo: "https://lamill.io/lamill.svg",
  // sameAs: only confirmed-real profiles corroborate the entity. Add
  // LinkedIn / Twitter / etc. here once each is verified — do NOT add
  // unverified handles.
  sameAs: ["https://github.com/codervijo"],
  knowsAbout: [
    "Full stack engineering",
    "Linux systems",
    "Hardware bringup",
    "IoT",
    "Web systems",
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LaMill — Build. Deploy. Advance." },
      {
        name: "description",
        content:
          "Engineering studio for full stack, Linux, hardware, IoT, and web systems. We start from excellence.",
      },
      { property: "og:title", content: "LaMill — Build. Deploy. Advance." },
      {
        property: "og:description",
        content: "Engineering studio for full stack, Linux, hardware, IoT, and web systems.",
      },
      { property: "og:image", content: "https://lamill.io/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { "script:ld+json": homeJsonLd },
    ],
  }),
  component: Index,
});

const pillars = [
  {
    to: "/services" as const,
    kicker: "Services",
    title: "Full stack, Linux, hardware, IoT.",
    desc: "Senior engineers across the layers — from the silicon to the screen.",
  },
  {
    to: "/web-systems" as const,
    kicker: "LaMill Web Systems",
    title: "Websites, web apps, and mobile.",
    desc: "Marketing sites, SaaS platforms, and native-feel mobile from one team.",
  },
  {
    to: "/content" as const,
    kicker: "Content",
    title: "Articles, photography, video, design.",
    desc: "Original content and visual production that ships alongside the product.",
  },
];

function Index() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div
          className="pointer-events-none absolute right-[-10%] top-1/2 h-[700px] w-[700px] -translate-y-1/2 bg-cover bg-center opacity-70 mix-blend-screen"
          style={{ backgroundImage: `url(${heroSphere})` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-24 md:pt-36">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-card/50 px-4 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Available for engagements — Q3 2026
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            Build.
            <br />
            Deploy.
            <br />
            <span className="text-primary glow-text">Advance.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl">
            LaMill is an engineering studio for teams that don't strive for excellence — they start
            from it. Full stack, Linux, hardware bringup, IoT, and web systems.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90"
            >
              Start a project
              <span className="transition group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary"
            >
              What we do
            </Link>
          </div>

          <div className="mt-20 grid max-w-3xl grid-cols-2 gap-8 border-t border-border pt-8 md:grid-cols-4">
            {[
              ["12+", "Years shipping"],
              ["40+", "Projects delivered"],
              ["6", "Domains covered"],
              ["100%", "Senior engineers"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-mono text-3xl font-semibold text-foreground">{n}</div>
                <div className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-primary">
                // What we do
              </div>
              <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
                Three practices. One team.
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Engineering, web systems, and content production — composed for whatever your product
              actually needs.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
            {pillars.map((p, i) => (
              <Link
                key={p.to}
                to={p.to}
                className="group flex flex-col bg-background p-8 transition hover:bg-card md:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground transition group-hover:text-primary">
                    →
                  </span>
                </div>
                <div className="mt-6 font-mono text-xs uppercase tracking-widest text-primary">
                  {p.kicker}
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-muted-foreground">{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">
            // How we work
          </div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            From the silicon to the screen.
          </h2>
          <div className="mt-8 space-y-6 text-lg text-muted-foreground">
            <p>
              We work the full stack — and we mean all of it. Hardware bringup where the
              system starts. Linux where it runs. IoT where the device meets the network. Web
              systems where the product meets the user. Content where the product meets its
              market.
            </p>
            <p>
              Most studios hand you one layer and a handoff. We hold the layers together. The
              same team that brings up the hardware can reason about the software that drives
              it and the site that ships it — fewer seams, fewer translations lost between
              vendors.
            </p>
            <p>
              Every engagement runs the same loop: understand the system, ship the smallest
              thing that proves it works, then advance. Build. Deploy. Advance. Senior
              engineers only — the people who scope your project are the people who build it.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">
            // Contact
          </div>
          <h2 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
            Let's build something <span className="text-primary glow-text">that ships.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Tell us about your project. We'll respond within one business day with a concrete plan.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90"
            >
              Start a project →
            </Link>
            <a
              href="mailto:hello@lamill.io"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary"
            >
              hello@lamill.io
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}