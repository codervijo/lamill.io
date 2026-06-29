# Content authoring — how to add a page

The site uses a **typed data collection** for portfolio / case-study pages.
Adding a page = adding one typed file. No MDX, no toolchain.

## Add a Work / portfolio entry

1. Create `src/content/work/<slug>.ts`. The `<slug>` becomes the URL
   (`/work/<slug>`) and must be kebab-case.

2. Default-export an object that satisfies `WorkEntry`
   (schema in `src/lib/content.ts`):

   ```ts
   import type { WorkEntry } from "@/lib/content";

   const entry: WorkEntry = {
     slug: "acme-shop",          // must match the filename + be kebab-case
     title: "Acme Shop",
     summary: "One-line pitch shown on the /work cards.",
     url: "https://acme.example", // live site (optional)
     description: "SEO meta description for the detail page.",
     ogImage: "/og/acme-shop.png", // optional, served from public/
     date: "2026-06-28",          // YYYY-MM-DD, drives sort order (newest first)
     tags: ["Marketing site", "SEO"],
     stack: ["Astro", "Vercel"],
     outcome: "One-line result (optional).",
     status: "published",         // "draft" hides it from /work + sitemap
     body: [
       "First paragraph of the case study.",
       "Second paragraph…",
     ],
   };

   export default entry;
   ```

3. That's it. The entry is validated on load and appears at `/work/<slug>`,
   and on the `/work` index once `status: "published"`. Bad entries are logged
   and skipped (they don't crash the build).

- **Drafts:** `status: "draft"` keeps a page out of the public listing and the
  sitemap, but it's still reachable by URL for preview/sharing.
- **Fields:** see `workEntrySchema` in `src/lib/content.ts` for the source of
  truth (required vs optional, formats).

## Update the sitemap

`public/sitemap.xml` is currently **hand-maintained**. When you publish a new
page, add its `<url>` block (apex domain, `https://lamill.io/...`). Drafts stay
out. Keep `public/robots.txt`'s `Sitemap:` line pointing at the apex domain.

> Backlog: replace the static sitemap with a generated one (driven by
> `getAllWork()` + the route list) so publishing a page updates it automatically.

## Where things live

| Thing | Path |
| --- | --- |
| Schema + loader | `src/lib/content.ts` |
| Entries | `src/content/work/*.ts` |
| Listing route | `src/routes/work/index.tsx` (`/work`) |
| Detail route | `src/routes/work/$slug.tsx` (`/work/<slug>`) |
| Sitemap / robots | `public/sitemap.xml`, `public/robots.txt` |
