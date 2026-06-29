# PRD — lamill.io

Live: https://lamill.io · Stack: TanStack Start (SSR) + React 19 + TS +
Tailwind v4 + shadcn/ui · Deploy: Vercel. See `AI_AGENTS.md` for full context.

## v1 — Site (DONE 2026-06-28)
- [x] Lovable-designed marketing site absorbed into the repo (replaces the old
      React 18 + Vite + React Router SPA); Lovable git sync severed
- [x] Pages: Home `/`, Services, Web Systems, Content, Contact
- [x] `/aitools` sub-app ported onto TanStack (landing + Text Generator +
      Image Analyzer — still `setTimeout` mocks)
- [x] Vercel SSR deploy configured (`NITRO_PRESET=vercel`)

## v2 — Web portfolio & content pages (next)

Goal: showcase LaMill's website projects as a real web portfolio, and build a
repeatable way to author content / case-study pages. The content system is the
shared foundation; the portfolio is its first consumer. This is also the SEO
surface (each page targets a keyword and feeds `lamill.toml [content]`).

**v2.A — Content-page system (foundation) — DONE**
- Content model — **DECIDED: typed data collection.** Entries live in
  `src/content/*` (zod-validated typed objects), rendered by a shared template
  route. No MDX toolchain; SSR `head()` meta stays trivial; schema enforced.
- [x] zod content schema in `src/lib/content.ts` (`slug`, `title`, `summary`,
      `url`, `description`, `ogImage`, `date`, `tags`, `stack`, `outcome`, `status`, `body`)
- [x] Collection loader (`import.meta.glob` → validate → sort newest-first; drafts filtered)
- [x] Routes: `/work` index + `/work/$slug` detail (loader + notFound)
- [x] Per-page SEO from the schema: `<title>`, meta description, `og:*`
- [x] `docs/content-authoring.md` — how to add a page

**v2.B — Web portfolio (first consumer of v2.A)**
- [x] Project fields covered by the `WorkEntry` schema
- [x] Portfolio listing (`/work`) + per-project case-study pages on the v2.A system
- [x] Seeded real projects: hybridautopart.com, lamillrentals.com (sourced from
      the fleet; personal + dark sites excluded)
- [x] Cross-linked from nav + footer
- [ ] Add OG screenshots per project (`public/og/*`, then set `ogImage`)
- [ ] Add more projects as they go live; optionally surface a teaser on `/web-systems`

## Backlog / follow-ups (open)
- [ ] Verify the SSR-on-Vercel deploy against a live build (not yet validated)
- [ ] Wire `/aitools` Text Generator + Image Analyzer to real Claude calls
- [ ] Wire the contact form to a real backend / email delivery
- [ ] Fill `lamill.toml [content]` (site_type, primary/secondary keywords, icp,
      tone) — feeds rankmill; log baseline GSC numbers in `docs/growth.md` first
- [ ] (Optional) De-Lovable-ify: replace `@lovable.dev/vite-tanstack-config`
      with a plain TanStack Start Vite config; drop the Lovable error reporter

## Problem

LaMill needs a credible, modern marketing presence that signals senior
engineering depth (full stack, Linux, hardware, IoT, web systems) and converts
visitors into project inquiries. Prospects evaluating a studio want proof —
real shipped work they can click through to.

## Users

Founders and engineering leaders at startups/scaleups evaluating an outside
engineering studio for build/deploy/advance work. They care about proof of
senior depth (a browsable portfolio of real sites) and a low-friction way to
start a project (the contact flow).
