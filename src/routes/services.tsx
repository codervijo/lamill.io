import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site-shell";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — LaMill" },
      {
        name: "description",
        content:
          "Engineering services across full stack, hardware bringup, Linux, and IoT — delivered by senior engineers who've shipped this before.",
      },
      { property: "og:title", content: "Services — LaMill" },
      {
        property: "og:description",
        content: "Full stack, hardware bringup, Linux, and IoT engineering services.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    id: "01",
    title: "Full Stack",
    desc: "Production systems across Ruby on Rails, Go, Python, and modern JavaScript front ends with React and D3.",
    tags: ["Rails", "Go", "React", "D3"],
  },
  {
    id: "02",
    title: "Hardware Bringup",
    desc: "BSP authoring, board definition, OS bringup, and performance tuning across custom and reference platforms.",
    tags: ["BSP", "Boards", "Perf"],
  },
  {
    id: "03",
    title: "Linux",
    desc: "Kernel, U-Boot, boot optimization, TCP/IP tuning, driver development, and deep troubleshooting.",
    tags: ["Kernel", "U-Boot", "Drivers"],
  },
  {
    id: "04",
    title: "IoT",
    desc: "Cross-domain IoT engineering from BLE firmware to cloud, ready for fast-moving startups.",
    tags: ["BLE", "Firmware", "Edge"],
  },
];

const capabilities = [
  "Boot optimization",
  "TCP/IP performance",
  "Driver development",
  "BLE firmware",
  "Board definition",
  "Kernel troubleshooting",
  "React + D3 dashboards",
  "Rails + Go services",
];

function ServicesPage() {
  return (
    <SiteShell>
      <PageHeader
        kicker="Services"
        title={
          <>
            Service that fits <span className="text-primary glow-text">your culture.</span>
          </>
        }
        intro="You're busy getting your idea to market. Hand us the rest — we move at the speed of senior engineers who've shipped this before."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
            {services.map((s) => (
              <article
                key={s.id}
                className="group relative bg-background p-8 transition hover:bg-card md:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{s.id}</span>
                  <span className="font-mono text-xs text-muted-foreground transition group-hover:text-primary">
                    →
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight md:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-md text-muted-foreground">{s.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-sm border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">
            // Capabilities
          </div>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Deep across the stack — from the silicon to the screen.
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => (
              <div key={c} className="flex items-center gap-3 bg-background px-5 py-5">
                <span className="font-mono text-[10px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-16 md:grid-cols-[1fr_2fr]">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-primary">
                // Process
              </div>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                Three phases. No surprises.
              </h2>
              <p className="mt-6 text-muted-foreground">
                Engagement starts with discovery and ends with you owning everything we shipped.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90"
              >
                Start a project →
              </Link>
            </div>
            <ol className="space-y-px overflow-hidden rounded-sm border border-border bg-border">
              {[
                ["Build", "We architect, scaffold, and ship the first working slice in days, not months."],
                ["Deploy", "Production rollout with observability, CI, and the runbooks your team will inherit."],
                ["Advance", "Iterate, optimize, hand off — or stay on as a long-term engineering partner."],
              ].map(([title, desc], i) => (
                <li
                  key={title}
                  className="grid gap-4 bg-background p-8 md:grid-cols-[120px_1fr] md:items-baseline md:p-10"
                >
                  <div className="font-mono text-xs uppercase tracking-widest text-primary">
                    Phase 0{i + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
                    <p className="mt-2 text-muted-foreground">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}