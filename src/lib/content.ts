import { z } from "zod";

/**
 * Typed content collection for portfolio / case-study pages.
 *
 * Add a page = drop a `*.ts` file in `src/content/work/` whose default export
 * satisfies `WorkEntry`. It is validated at load and surfaces at `/work/<slug>`.
 * See `docs/content-authoring.md`.
 */
export const workEntrySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug must be kebab-case"),
  title: z.string(),
  /** Short one-liner shown on cards + listing. */
  summary: z.string(),
  /** Live site this case study points to (optional). */
  url: z.string().url().optional(),
  /** SEO meta description for the detail page. */
  description: z.string(),
  /** Absolute or root-relative OG image (optional). */
  ogImage: z.string().optional(),
  /** ISO date (YYYY-MM-DD) — drives sort order, newest first. */
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  /** Free-form labels (e.g. "Content site", "E-commerce"). */
  tags: z.array(z.string()).default([]),
  /** Tech stack chips. */
  stack: z.array(z.string()).default([]),
  /** One-line result / outcome (optional). */
  outcome: z.string().optional(),
  /**
   * draft = excluded from the public listing, the sitemap, AND `/work/<slug>`,
   * which 404s. `getAllWork()`/`getWorkBySlug()` filter drafts unless
   * `{ includeDrafts: true }` is passed, and the `/work/$slug` loader does not
   * pass it. There is no by-URL preview today.
   */
  status: z.enum(["draft", "published"]).default("draft"),
  /** Case-study body as paragraphs. */
  body: z.array(z.string()).default([]),
});

export type WorkEntry = z.infer<typeof workEntrySchema>;

// Eagerly import every entry at build time (Vite). SSR-safe.
const modules = import.meta.glob("../content/work/*.ts", { eager: true });

function loadAll(): WorkEntry[] {
  const entries: WorkEntry[] = [];
  for (const [path, mod] of Object.entries(modules)) {
    const raw = (mod as { default: unknown }).default;
    const parsed = workEntrySchema.safeParse(raw);
    if (!parsed.success) {
      // Fail loud in dev/build logs, but don't crash the whole site for one bad file.
      console.error(`[content] invalid work entry at ${path}:`, parsed.error.flatten());
      continue;
    }
    entries.push(parsed.data);
  }
  // Newest first.
  return entries.sort((a, b) => (a.date < b.date ? 1 : -1));
}

const ALL = loadAll();

export function getAllWork(opts?: { includeDrafts?: boolean }): WorkEntry[] {
  return ALL.filter((e) => opts?.includeDrafts || e.status === "published");
}

export function getWorkBySlug(
  slug: string,
  opts?: { includeDrafts?: boolean },
): WorkEntry | undefined {
  return getAllWork(opts).find((e) => e.slug === slug);
}
