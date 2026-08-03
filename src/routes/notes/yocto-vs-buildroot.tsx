import { type ReactNode } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { getNoteBySlug, noteUrl } from "@/content/notes";
import { pageSeo } from "@/lib/seo";

const SLUG = "yocto-vs-buildroot";
const note = getNoteBySlug(SLUG);
const canonical = noteUrl(SLUG);

// TechArticle markup. author AND publisher resolve to the LaMill Organization
// entity — never a Person (LaMill is faceless; no bylines). Apex host only.
// NOTE: `image` is intentionally omitted — no article image exists yet.
// TODO(image): add an og/article image and set the `image` property here.
const articleJsonLd = note
  ? {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: note.title,
      description: note.description,
      datePublished: note.datePublished,
      dateModified: note.dateModified,
      author: {
        "@type": "Organization",
        name: "LaMill",
        url: "https://lamill.io/",
      },
      publisher: {
        "@type": "Organization",
        name: "LaMill",
        url: "https://lamill.io/",
        logo: {
          "@type": "ImageObject",
          url: "https://lamill.io/lamill.svg",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonical,
      },
    }
  : null;

export const Route = createFileRoute("/notes/yocto-vs-buildroot")({
  loader: () => {
    if (!note) throw notFound();
    return note;
  },
  head: () =>
    note
      ? pageSeo({
          path: `/notes/${SLUG}`,
          title: `${note.title} — LaMill`,
          description: note.description,
          ogTitle: note.title,
          type: "article",
          jsonLd: articleJsonLd ?? undefined,
        })
      : { meta: [], links: [] },
  component: Article,
});

function Article() {
  const meta = Route.useLoaderData();

  return (
    <SiteShell>
      {/* Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-20 md:pt-28">
          <Link
            to="/notes"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition hover:text-primary"
          >
            ← All notes
          </Link>

          <div className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {meta.datePublished}
          </div>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
            Yocto vs Buildroot: Choosing an Embedded Linux Build System
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">{meta.summary}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {meta.tags.map((t) => (
              <span
                key={t}
                className="rounded-sm border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section>
        <article className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_a]:decoration-primary/50 [&_a]:underline-offset-4 hover:[&_a]:decoration-primary">
            {/* Extractable answer — self-contained, for featured snippets / LLM quoting. */}
            <p className="!mt-0 border-l-2 border-primary pl-5 text-xl font-medium text-foreground">
              Choose Buildroot for a single, fixed-function device on a short
              lifecycle with a small team: it is simpler and faster to learn.
              Choose Yocto for product families, long-lived products, per-package
              updates, formal compliance, or when your silicon vendor ships its BSP
              as a Yocto layer. Yocto costs more to run; that cost buys capability.
            </p>
            <p>
              Every embedded Linux project eventually reaches the same fork in the
              road: Yocto vs Buildroot. Both take source code and toolchains and
              produce a bootable root filesystem, a kernel, and a bootloader for
              your target hardware. They solve that problem with opposite
              philosophies, and the choice between them shapes your build times,
              your team's ramp-up, your update strategy, and your maintenance
              burden for years.
            </p>
            <p>
              The buildroot vs yocto debate is usually flattened to "simple
              versus powerful." That is true and almost useless for making a real
              decision. The better question is not which tool is better in the
              abstract — it is which build model matches your product, your team,
              and your maintenance horizon. This is how we decide in practice.
            </p>

            <Heading>What Buildroot is</Heading>
            <p>
              Buildroot is a set of Makefiles and Kconfig options that builds a
              complete embedded Linux system from source. You configure it once,
              through a single <code>menuconfig</code> tree that produces one{" "}
              <code>.config</code> file, and it produces a cross-toolchain, a
              kernel, a bootloader, and a root filesystem image. The mental model
              is deliberately small: one configuration describes the entire
              system, and the output is a monolithic image you flash to the
              device.
            </p>
            <p>
              That simplicity is the whole point. A competent Linux engineer can
              read a Buildroot tree top to bottom and hold the entire build in
              their head. There is no separate metadata language to learn — adding
              a package means writing a short Makefile fragment, and the whole
              system is transparent enough to debug by reading it.
            </p>

            <Heading>What Yocto is</Heading>
            <p>
              The Yocto Project is not a single build system so much as a framework
              for building your own Linux distribution. It is built on
              OpenEmbedded: <em>recipes</em> (build instructions for individual
              components) are organized into <em>layers</em> (composable
              collections of metadata), and <em>bitbake</em> is the task engine
              that parses all of it and executes the build. Poky is the reference
              distribution that ties these pieces together.
            </p>
            <p>
              Where Buildroot gives you one config and one image, Yocto gives you a
              layered metadata system that produces a distribution — kernel,
              filesystem, and a feed of individually installable packages. That
              extra machinery is why Yocto is harder to learn and why it scales to
              product families, long lifecycles, and formal compliance in ways
              Buildroot does not aim to.
            </p>

            <Heading>The fundamental difference: one config vs. layered metadata</Heading>
            <p>
              This is the distinction everything else follows from. Buildroot is a{" "}
              <strong>root filesystem builder</strong>: a single, flat
              configuration produces a single image, and customization happens by
              editing that configuration or overlaying files on the result. Yocto
              is a <strong>distribution builder</strong>: layered metadata and
              per-component recipes are composed by bitbake, and customization
              happens by adding or overriding layers and recipes without forking
              what you are extending.
            </p>
            <p>
              A flat config is faster to understand and perfectly adequate for a
              fixed-function device on a short lifecycle. Layered metadata costs
              more to learn, but it lets a vendor, a distro team, and a product
              team each own a clean slice of the system without stepping on one
              another — and that separation is what pays off the moment you ship
              more than one board or maintain one for years. Fewer products and a
              shorter horizon favor Buildroot; more of either tips the decision
              toward Yocto.
            </p>

            <ComparisonTable />

            <Heading>Which builds faster, Yocto or Buildroot?</Heading>
            <p>
              It depends which build you mean. Buildroot is typically quicker to a
              first running system on a small image, with fewer moving parts to go
              wrong; Yocto is slower cold but faster on nearly every rebuild after,
              because its shared-state cache reuses unchanged work. Buildroot's
              model has a sharp edge, though: many configuration changes are not
              reliably incremental. Change a core toolchain or system option and
              the safe move is often a clean rebuild, which is slow.
            </p>
            <p>
              Yocto inverts the tradeoff. The first build is heavy — it compiles a
              great deal from scratch and consumes significant disk and time. But its
              shared-state cache (<code>sstate-cache</code>) stores the output of
              individual build tasks, so subsequent builds reuse everything that
              did not change. Change one recipe and bitbake rebuilds only that
              recipe and what depends on it. On a CI system with a warm sstate
              cache and a shared download mirror, Yocto's incremental builds are
              fast and its full builds are reproducible. In short: Buildroot tends
              to win the first build and the small image; Yocto tends to win the
              hundredth build across a team.
            </p>

            <Heading>How long does it take to learn Yocto vs Buildroot?</Heading>
            <p>
              Buildroot takes weeks; Yocto takes months. A Linux engineer can be
              productive in Buildroot within weeks — the concepts are few and the
              system is legible. This is where the two diverge most, and it is a
              real budget line, not a footnote.
            </p>
            <p>
              Yocto is a genuine investment. Engineers need to internalize layers,
              recipes, bitbake tasks, classes, and OpenEmbedded's variable and
              override syntax before they are effective — and the failure modes of
              a large layered build are harder to diagnose than a flat Makefile. In
              our experience the ramp is measured in months to real fluency, not
              weeks. If your team has no dedicated build or platform engineer and no
              appetite to grow one, that cost is decisive and belongs at the front
              of the decision. Standing up and maintaining a Yocto platform is
              exactly the kind of work we scope as part of our{" "}
              <Link to="/services">engineering engagements</Link>, precisely
              because the ongoing maintenance — not the initial setup — is where
              the cost actually lives.
            </p>

            <Heading>How do Yocto and Buildroot handle updates?</Heading>
            <p>
              Buildroot updates by replacing the whole image; Yocto can update
              individual packages from a feed or replace the image. The output
              models differ in a way that directly constrains how you ship updates.
              Buildroot produces a monolithic image; its natural update strategy is
              image-based — you build a new image and replace
              the running one, ideally with an A/B scheme and an updater such as
              RAUC, Mender, or SWUpdate handling the swap and rollback. Buildroot
              does not aim to give you a package manager on the target.
            </p>
            <p>
              Yocto produces package feeds (rpm, deb, or ipk) in addition to a
              full image. That means you can update individual components at
              runtime from a feed using a package manager on the device, or use
              the same image-based A/B strategy — your choice. If your update model
              is per-package over-the-air delivery from a feed, Yocto supports it
              natively and Buildroot effectively does not. If your update model is
              "atomically replace the whole image," both fit, and Buildroot's
              simplicity is an advantage.
            </p>

            <Heading>Customization and layering</Heading>
            <p>
              Yocto's layering is its structural advantage. A <code>.bbappend</code>{" "}
              file lets you extend or patch a vendor's recipe without forking it,
              and layers cleanly separate the BSP, the distribution policy, and
              your application. When a vendor ships an update, your overrides sit
              on top rather than tangled in. For teams maintaining several boards
              or products from shared metadata, this separation is worth the
              complexity it costs.
            </p>
            <p>
              Buildroot customizes through a <code>BR2_EXTERNAL</code> tree,
              defconfig fragments, post-build and post-image scripts, and patches
              applied to packages. It works well and stays legible for a single
              product. But because there is no layering, adapting a vendor-provided
              package often means carrying patches in your external tree, and
              sharing configuration across a family of products is more manual than
              Yocto's compose-a-layer model.
            </p>

            {/* Side-by-side: the SAME task (patch a package you don't own), both ways. */}
            <div className="not-prose my-8 grid gap-4 md:grid-cols-2">
              <Snippet label="Buildroot — patch via BR2_EXTERNAL">{`# Your external tree — the patch lives here, not upstream
br2-external/
└── patches/
    └── libfoo/
        └── 0001-fix-cross-compile.patch

# In your defconfig, point Buildroot at that directory:
BR2_GLOBAL_PATCH_DIR="$(BR2_EXTERNAL_MYCO_PATH)/patches"

# Buildroot auto-applies patches/<pkg>/*.patch in order,
# at extract time. The libfoo package is never edited.`}</Snippet>
              <Snippet label="Yocto — patch via .bbappend">{`# Your layer — the append overlays the vendor's recipe
meta-myco/
└── recipes-support/
    └── libfoo/
        ├── libfoo_%.bbappend
        └── libfoo/
            └── 0001-fix-cross-compile.patch

# libfoo_%.bbappend — the vendor's recipe is never edited:
FILESEXTRAPATHS:prepend := "\${THISDIR}/\${PN}:"
SRC_URI += "file://0001-fix-cross-compile.patch"`}</Snippet>
            </div>
            <p className="!mt-3 text-sm text-muted-foreground">
              The same task — apply one patch to a package you do not own. Buildroot
              drops the patch in your external tree and points a config variable at
              it; Yocto's two-line append overlays the vendor's recipe from a
              separate layer, leaving the original untouched.
            </p>

            <Heading>Licensing and compliance tooling</Heading>
            <p>
              Both systems know what they built and can report the licenses of
              everything in the image — this is a real strength of building from
              source with either tool. Buildroot generates a license report and
              collects source through <code>make legal-info</code>, which covers
              the core of an open-source compliance obligation.
            </p>
            <p>
              Yocto's compliance tooling is more extensive. It produces per-image
              license manifests, can archive corresponding source for GPL
              compliance via its archiver class, generates SPDX-based software
              bills of materials, and includes CVE checking against public
              vulnerability data as part of the build. For regulated products, or
              anywhere a customer will demand an SBOM and a documented
              vulnerability posture, that built-in tooling is a material advantage
              and a genuine reason to choose Yocto.
            </p>

            <Heading>Long-term maintenance and the vendor BSP reality</Heading>
            <p>
              Here is the practical fact that quietly decides many projects: SoC
              vendors ship their board support packages as Yocto layers. When you
              buy silicon from a major vendor, the reference BSP, the errata fixes,
              and the release cadence you are expected to track typically arrive as
              a <code>meta-</code> layer for Yocto first. Buildroot support for the
              same chip may exist, but it is more often community-maintained and
              can lag the vendor's own releases. In practice the split is rarely
              all-or-nothing: on a Xilinx Vivado-based project — Vivado for the FPGA
              design, a build system for the Linux image — Buildroot gave us the
              first bootable version quickly, even on silicon whose long-term vendor
              path runs through Yocto. Getting to a working image fast is what
              Buildroot is good at, which is why it often earns the first cut before
              a product's lifecycle forces the Yocto question.
            </p>
            <p>
              For a long product lifecycle — years of security maintenance and
              vendor errata — aligning with the vendor's BSP format keeps you on
              the supported path. Yocto's long-term-support releases are built for
              exactly this. Buildroot's stable releases are simpler to follow, but
              you shoulder more of the long-tail maintenance yourself. The build
              system is a multi-year commitment in maintenance, not a one-time
              setup cost, which is why we treat build-system selection as an
              architectural decision rather than a preference.
            </p>

            <Heading>When to choose each</Heading>
            <p>
              The decision is a situation, not a feature checklist. Find the row
              that matches your project — then read the two factors below that the
              table cannot fully carry.
            </p>

            <DecisionTable />

            <p>
              Two of those rows turn on one fact that the others cannot outweigh:
              how your silicon vendor ships its board support. When the vendor's
              BSP exists only as a Yocto layer, that settles it regardless of
              product count or team size — you either track the vendor's releases
              and errata on their terms, or you port and maintain the BSP yourself,
              which is a standing cost, not a one-time one.
            </p>
            <p>
              The team row is the one most often underweighted. A configuration you
              can hold in your head is worth real money when no one is dedicated to
              build infrastructure — Buildroot keeps a generalist productive. Yocto
              assumes someone owns the platform; without that person its complexity
              is dead weight, and with them its complexity is the price of
              capabilities you actually need.
            </p>

            <Heading>Migrating between them</Heading>
            <p>
              Moving from one to the other is a re-platform, not a port. The build
              metadata does not carry over: a Buildroot configuration does not
              translate into Yocto recipes and layers, and vice versa. What does
              carry over is the work that is not build-system-specific — your
              kernel configuration, device tree, and application source move with
              you; the machinery that assembles them does not.
            </p>
            <p>
              The common and defensible path runs one direction: prototype on
              Buildroot to reach a running system quickly, then migrate to Yocto
              when the product hits the realities that favor it — a vendor BSP
              shipped as a layer, a lengthening maintenance lifecycle, a second or
              third board, or a compliance requirement. Budget that migration as a
              real project with its own schedule, not a weekend conversion. The
              reverse move — Yocto to Buildroot — is rarer and usually means
              carving a simple, fixed-function spinoff out of a larger platform,
              where shedding Yocto's machinery is the point. Whichever direction
              you go, decide it deliberately: the cost of switching is high enough
              that choosing the right model at the start is worth real analysis up
              front.
            </p>
          </div>

          {/* CTA — company voice, up to /services */}
          <div className="mt-14 border-t border-border pt-10">
            <p className="text-lg text-muted-foreground">
              We have delivered embedded Linux end to end on Buildroot and worked
              hands-on with Yocto, and we scope the build-system decision with your
              product and lifecycle in mind — not a house preference.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-primary-foreground transition hover:bg-primary/90"
              >
                What we do →
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary"
              >
                Start a project
              </Link>
            </div>
          </div>
        </article>
      </section>
    </SiteShell>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="!mt-12 pt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
      {children}
    </h2>
  );
}

function Snippet({ label, children }: { label: string; children: string }) {
  return (
    <figure className="min-w-0">
      <figcaption className="mb-2 font-mono text-[11px] uppercase tracking-widest text-primary">
        {label}
      </figcaption>
      <pre className="overflow-x-auto rounded-sm border border-border bg-card/40 p-4 text-xs leading-relaxed text-foreground">
        <code>{children}</code>
      </pre>
    </figure>
  );
}

// Situation-keyed decision table — must read standalone (screenshot-friendly).
function DecisionTable() {
  const cols = ["Products / boards", "Update strategy", "BSP source", "Lifecycle", "Team", "→ Pick"];
  const rows: Array<[string, string, string, string, string, "Buildroot" | "Yocto"]> = [
    ["One device", "Full-image A/B", "In-tree / community", "Short–medium", "No build engineer", "Buildroot"],
    ["Product family", "Package feeds (OTA)", "Vendor Yocto layer", "Multi-year", "Platform engineer", "Yocto"],
    ["One device", "Full-image A/B", "Vendor-Yocto-only", "Multi-year", "Can fund one", "Yocto"],
    ["Small related family", "Full-image A/B", "In-tree / community", "Medium", "No specialist", "Buildroot"],
    ["One device", "Package feeds (OTA)", "In-tree / community", "Medium", "Has one", "Yocto"],
  ];

  return (
    <div className="not-prose !my-10 overflow-x-auto rounded-sm border border-border">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">
          When to choose Buildroot vs Yocto, by project situation
        </caption>
        <thead>
          <tr className="border-b border-border bg-card/40">
            {cols.map((c) => (
              <th
                key={c}
                className="whitespace-nowrap px-3 py-3 font-mono text-[11px] uppercase tracking-widest text-primary"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border/60 align-top last:border-0">
              {r.slice(0, 5).map((cell, j) => (
                <td key={j} className="whitespace-nowrap px-3 py-3">
                  {cell}
                </td>
              ))}
              <td className="whitespace-nowrap px-3 py-3">
                <span
                  className={
                    r[5] === "Yocto"
                      ? "font-semibold text-primary"
                      : "font-semibold text-foreground"
                  }
                >
                  {r[5]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ComparisonTable() {
  const rows: Array<[string, string, string]> = [
    ["Build model", "Single Kconfig, Makefile-driven", "Layered metadata + recipes, run by bitbake"],
    ["Output", "Monolithic root filesystem image", "Image plus package feeds (rpm / deb / ipk)"],
    [
      "Incremental builds",
      "Config changes often need a clean rebuild",
      "Shared-state cache reuses unchanged task output",
    ],
    ["Runtime updates", "Image-based (reflash / A-B)", "Package feeds or image-based"],
    ["Learning curve", "Weeks for a Linux engineer", "Months to real fluency"],
    [
      "Customization",
      "BR2_EXTERNAL, defconfig fragments, patches",
      "Layers and .bbappend overlays, no forking",
    ],
    [
      "Compliance tooling",
      "License report via make legal-info",
      "License manifests, SPDX/SBOM, CVE check, source archiver",
    ],
    ["Vendor BSPs", "Sometimes, often community-maintained", "First-class (meta-<vendor> layers)"],
    ["Best fit", "Fixed-function device, small team", "Product lines, long lifecycle, compliance"],
  ];

  return (
    <div className="!my-10 overflow-x-auto rounded-sm border border-border">
      <table className="w-full border-collapse text-left text-base">
        <caption className="sr-only">
          Buildroot vs Yocto: technical comparison by dimension
        </caption>
        <thead>
          <tr className="border-b border-border bg-card/40">
            <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-primary">
              Dimension
            </th>
            <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-primary">
              Buildroot
            </th>
            <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-primary">
              Yocto Project
            </th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          {rows.map(([dim, br, yocto]) => (
            <tr key={dim} className="border-b border-border/60 last:border-0 align-top">
              <th
                scope="row"
                className="px-4 py-3 font-medium text-foreground whitespace-nowrap"
              >
                {dim}
              </th>
              <td className="px-4 py-3">{br}</td>
              <td className="px-4 py-3">{yocto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
