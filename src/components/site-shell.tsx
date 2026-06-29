import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";

const navLinks = [
  { to: "/services", label: "Services" },
  { to: "/web-systems", label: "Web Systems" },
  { to: "/work", label: "Work" },
  { to: "/content", label: "Content" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
          LAMILL<span className="text-primary">.io</span>
        </Link>
        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-muted-foreground md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="transition hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/contact"
          className="rounded-sm border border-primary bg-primary px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90"
        >
          Start a project
        </Link>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 font-mono text-sm font-semibold">
            <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
            LAMILL<span className="text-primary">.io</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Engineering studio for teams that start from excellence. Full stack, Linux, hardware,
            IoT, and web systems.
          </p>
        </div>
        <FooterCol
          title="Explore"
          items={[
            { to: "/services", label: "Services" },
            { to: "/web-systems", label: "Web Systems" },
            { to: "/work", label: "Work" },
            { to: "/content", label: "Content" },
          ]}
        />
        <FooterCol
          title="Company"
          items={[
            { to: "/contact", label: "Contact" },
            { to: "/", label: "Home" },
          ]}
        />
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            // Reach us
          </div>
          <a
            href="mailto:hello@lamill.io"
            className="mt-3 block font-mono text-sm text-foreground transition hover:text-primary"
          >
            hello@lamill.io
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground md:flex-row md:items-center">
          <div>LAMILL.IO — © {new Date().getFullYear()}</div>
          <div>Build · Deploy · Advance</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<{
    to: "/" | "/services" | "/web-systems" | "/work" | "/content" | "/contact";
    label: string;
  }>;
}) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        // {title}
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i.to + i.label}>
            <Link to={i.to} className="text-sm text-foreground transition hover:text-primary">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PageHeader({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 md:pt-28">
        <div className="font-mono text-xs uppercase tracking-widest text-primary">// {kicker}</div>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p>
        ) : null}
      </div>
    </section>
  );
}