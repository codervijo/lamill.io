import { z } from "zod";

/**
 * Typed registry for /notes — LaMill's own technical writing.
 *
 * This is NOT the same as `/content` (a service we sell) nor `/work` (portfolio
 * case studies). Notes are in-house engineering articles.
 *
 * Metadata only. Each note's *body* lives in its own route under
 * `src/routes/notes/<slug>.tsx` (rich prose, tables, inline links don't fit a
 * flat `string[]`). The registry is the single source of truth for the /notes
 * index, per-article <head> meta, canonical URL, and JSON-LD — so they can't
 * drift apart. When you add a note route, add its entry here.
 *
 * Voice: company voice only. Author/publisher is always the LaMill
 * Organization — never a Person. No bylines.
 */
export const noteMetaSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug must be kebab-case"),
  title: z.string(),
  /** Short one-liner shown on the /notes index cards. */
  summary: z.string(),
  /** SEO meta description for the article <head>. Includes the target term. */
  description: z.string(),
  /** ISO date (YYYY-MM-DD) — first publish; drives sort order, newest first. */
  datePublished: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  /** ISO date (YYYY-MM-DD) — last substantive edit. */
  dateModified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  /** Free-form labels shown on the card. */
  tags: z.array(z.string()).default([]),
  /** draft = hidden from the /notes index + sitemap; still reachable by URL. */
  status: z.enum(["draft", "published"]).default("draft"),
});

export type NoteMeta = z.infer<typeof noteMetaSchema>;

/** Apex canonical host — fleet-wide locked invariant (never www). */
export const SITE_ORIGIN = "https://lamill.io";

/** Canonical URL for a note. */
export function noteUrl(slug: string): string {
  return `${SITE_ORIGIN}/notes/${slug}`;
}

const RAW: NoteMeta[] = [
  {
    slug: "yocto-vs-buildroot",
    title: "Yocto vs Buildroot: Choosing an Embedded Linux Build System",
    summary:
      "Two build systems, two fundamentally different models. A working engineer's comparison — and clear criteria for when each one wins.",
    description:
      "Yocto vs Buildroot compared by engineers who ship embedded Linux: build model, iteration speed, learning curve, updates, licensing, and concrete criteria for when to choose each.",
    datePublished: "2026-07-15",
    dateModified: "2026-07-15",
    tags: ["Embedded Linux", "Yocto", "Buildroot"],
    status: "published",
  },
];

const ALL: NoteMeta[] = RAW.map((n) => noteMetaSchema.parse(n)).sort((a, b) =>
  a.datePublished < b.datePublished ? 1 : -1,
);

export function getAllNotes(opts?: { includeDrafts?: boolean }): NoteMeta[] {
  return ALL.filter((n) => opts?.includeDrafts || n.status === "published");
}

export function getNoteBySlug(
  slug: string,
  opts?: { includeDrafts?: boolean },
): NoteMeta | undefined {
  return getAllNotes(opts).find((n) => n.slug === slug);
}
