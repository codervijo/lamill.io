import { Link } from "@tanstack/react-router";
import type { WorkEntry } from "@/lib/content";

/** One LaMill product: name + hostname link out to its site, plus its case study. */
export function ProductCard({ product: p }: { product: WorkEntry }) {
  return (
    <article className="flex flex-col bg-background p-8">
      <h3 className="text-xl font-semibold tracking-tight">
        {p.url ? (
          <a href={p.url} className="transition hover:text-primary">
            {p.title}
          </a>
        ) : (
          <Link
            to="/work/$slug"
            params={{ slug: p.slug }}
            className="transition hover:text-primary"
          >
            {p.title}
          </Link>
        )}
      </h3>
      <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.summary}</p>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-widest">
        {p.url ? (
          <a href={p.url} className="text-foreground transition hover:text-primary">
            {new URL(p.url).hostname} ↗
          </a>
        ) : null}
        <Link
          to="/work/$slug"
          params={{ slug: p.slug }}
          className="text-muted-foreground transition hover:text-primary"
        >
          Case study →
        </Link>
      </div>
    </article>
  );
}
