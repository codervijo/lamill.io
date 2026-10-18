import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";

const navLinks = [
  { to: "/services", label: "Services" },
  { to: "/web-systems", label: "Web Systems" },
  { to: "/products", label: "Products" },
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
        <Link to="/" className="flex items-center" aria-label="LaMill — home">
          <BrandLogo className="h-7 w-auto" />
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
          <BrandLogo className="h-8 w-auto" />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Engineering studio for teams that start from excellence. Full stack, Linux, hardware,
            IoT, and web systems — and a growing set of useful tools for real work.
          </p>
        </div>
        <FooterCol
          title="Explore"
          items={[
            { to: "/services", label: "Services" },
            { to: "/web-systems", label: "Web Systems" },
            { to: "/products", label: "Products" },
            { to: "/work", label: "Work" },
            { to: "/content", label: "Content" },
            { to: "/notes", label: "Notes" },
            { to: "/extensions", label: "Extensions" },
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
          <a
            href="https://www.youtube.com/@Lamillhq"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block font-mono text-sm text-foreground transition hover:text-primary"
          >
            YouTube ↗
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground md:flex-row md:items-center">
          <div>
            © {new Date().getFullYear()} <Brand />
          </div>
          <div>Build · Deploy · Advance — Useful tools for real work</div>
        </div>
      </div>
    </footer>
  );
}

/**
 * The brand name, always cased "LaMill" — survives `uppercase` labels, which
 * would otherwise render it "LAMILL".
 */
export function Brand() {
  return <span className="normal-case">LaMill</span>;
}

/** The LaMill lockup for the site's dark background (public/brand/logo-dark.svg). */
function BrandLogo({ className }: { className?: string }) {
  return (
    <img src="/brand/logo-dark.svg" alt="LaMill" width={111} height={28} className={className} />
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<{
    to:
      | "/"
      | "/services"
      | "/web-systems"
      | "/products"
      | "/work"
      | "/content"
      | "/notes"
      | "/extensions"
      | "/contact";
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
  kicker: ReactNode;
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
        {intro ? <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p> : null}
      </div>
    </section>
  );
}
