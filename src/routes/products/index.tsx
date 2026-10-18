import { createFileRoute, Link } from "@tanstack/react-router";
import { Brand, SiteShell, PageHeader } from "@/components/site-shell";
import { ProductCard } from "@/components/product-card";
import { getProductsByCategory } from "@/lib/content";
import { getAllExtensions } from "@/lib/extensions";
import { pageSeo } from "@/lib/seo";

// LaMill Products — the studio's own tools and sites, grouped by category.
// Renders from the work collection (entries with a `category`) plus the
// extensions hub; each product links out to its own site, so this page is the
// discovery index, not a second copy of each product's pitch.
export const Route = createFileRoute("/products/")({
  head: () =>
    pageSeo({
      path: "/products",
      title: "Products — LaMill",
      description:
        "Useful tools for real work: calculators, document tools, compliance software, reference sites, and browser extensions built and run by LaMill.",
      ogDescription: "Useful tools for real work, built and run by LaMill.",
    }),
  loader: () => ({ groups: getProductsByCategory(), extensions: getAllExtensions() }),
  component: ProductsIndex,
});

function ProductsIndex() {
  const { groups, extensions } = Route.useLoaderData();

  return (
    <SiteShell>
      <PageHeader
        kicker={
          <>
            <Brand /> Products
          </>
        }
        title={
          <>
            Useful tools <span className="text-primary glow-text">for real work.</span>
          </>
        }
        intro="Products LaMill builds and runs, each on its own site. Engineering services live under LaMill Studio."
      />

      <section>
        <div className="mx-auto grid max-w-7xl gap-20 px-6 py-20 md:py-28">
          {groups.map((g) => (
            <div key={g.category}>
              <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
                // {g.category}
              </h2>
              <div className="mt-6 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
                {g.items.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          ))}

          {extensions.length ? (
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
                // Browser extensions
              </h2>
              <div className="mt-6 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
                {extensions.map((x) => (
                  <article key={x.slug} className="flex flex-col bg-background p-8">
                    <h3 className="text-xl font-semibold tracking-tight">
                      <Link
                        to="/extensions/$slug"
                        params={{ slug: x.slug }}
                        className="transition hover:text-primary"
                      >
                        {x.name}
                      </Link>
                    </h3>
                    <p className="mt-3 flex-1 text-sm text-muted-foreground">{x.pitch}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </SiteShell>
  );
}
