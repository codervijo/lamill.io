import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site-shell";
import { pageSeo } from "@/lib/seo";

// Permanent URL: the license URL embedded in every portfolio-site image's
// metadata and ImageObject schema points here. Never rename or move it (v7.A).
export const Route = createFileRoute("/image-license")({
  head: () =>
    pageSeo({
      path: "/image-license",
      title: "Image License — LaMill",
      description:
        "Images on lamill.io portfolio sites are AI-generated and © lamill.io. No reuse, redistribution or modification without permission.",
    }),
  component: ImageLicensePage,
});

function ImageLicensePage() {
  return (
    <SiteShell>
      <PageHeader kicker="Image license" title="Image license" />

      <section>
        <div className="mx-auto max-w-3xl space-y-6 px-6 py-20 text-lg text-muted-foreground md:py-28">
          <p>Images on lamill.io portfolio sites are AI-generated and © lamill.io.</p>
          <p>No reuse, redistribution or modification without permission.</p>
          <p>
            To license an image,{" "}
            <Link to="/contact" className="text-primary hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
