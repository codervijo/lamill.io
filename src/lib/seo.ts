/**
 * Shared SEO head construction.
 *
 * One place that decides the site's canonical URL form and the social-card
 * defaults, so canonical, og:url, the sitemap, and internal hrefs cannot drift
 * apart again (see seo-audit.md §5).
 *
 * URL form — apex host, no trailing slash, except the site root which is
 * `https://lamill.io/`. This is the form the sitemap already uses, the form
 * `<Link to="…">` already emits, and the form the server enforces: the
 * trailing-slash variant 307-redirects to the slash-less one, so the slash-less
 * URL is the 200. Any other choice would put every canonical URL one redirect
 * away from itself.
 */

export const SITE_ORIGIN = "https://lamill.io";

/** Sitewide social-card fallback. Regenerate with `pnpm run og`. */
export const OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;
export const OG_IMAGE_WIDTH = "1200";
export const OG_IMAGE_HEIGHT = "630";

/**
 * Absolute apex URL for a route path, in the site's canonical form.
 * `canonicalUrl("/")` → `https://lamill.io/`
 * `canonicalUrl("/work/boxchive")` → `https://lamill.io/work/boxchive`
 */
export function canonicalUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const trimmed = p.length > 1 ? p.replace(/\/+$/, "") : "/";
  return trimmed === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${trimmed}`;
}

type MetaEntry = Record<string, unknown>;

export interface PageSeoInput {
  /** Route path, e.g. "/work/boxchive". */
  path: string;
  /** <title> — also the og:title default. */
  title: string;
  /** Meta description — also the og:description default. */
  description: string;
  /** og:title override, when the social title should differ from <title>. */
  ogTitle?: string;
  /** og:description override, when the social copy should be shorter. */
  ogDescription?: string;
  /** og:type. "website" everywhere except articles. */
  type?: "website" | "article";
  /** Per-page og:image. Falls back to the sitewide card when omitted. */
  image?: string;
  /** JSON-LD object to render as <script type="application/ld+json">. */
  jsonLd?: unknown;
}

/**
 * Build the `meta` + `links` a route's `head()` returns: a complete Open Graph
 * set, twitter:card, and a self-referencing canonical, all on the same URL.
 */
export function pageSeo(input: PageSeoInput): {
  meta: MetaEntry[];
  links: { rel: string; href: string }[];
} {
  const url = canonicalUrl(input.path);
  const image = input.image ?? OG_IMAGE;

  const meta: MetaEntry[] = [
    { title: input.title },
    { name: "description", content: input.description },
    { property: "og:title", content: input.ogTitle ?? input.title },
    { property: "og:description", content: input.ogDescription ?? input.description },
    { property: "og:type", content: input.type ?? "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
  ];

  // Dimensions describe the sitewide card only — a per-page image would have
  // its own, and asserting 1200x630 for it would be a guess.
  if (image === OG_IMAGE) {
    meta.splice(
      meta.length - 1,
      0,
      { property: "og:image:width", content: OG_IMAGE_WIDTH },
      { property: "og:image:height", content: OG_IMAGE_HEIGHT },
    );
  }

  if (input.jsonLd) meta.push({ "script:ld+json": input.jsonLd });

  return { meta, links: [{ rel: "canonical", href: url }] };
}
