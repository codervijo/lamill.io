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
- [x] Seeded 28 real projects from the fleet (sourced from `portfolio.json` +
      each site's own meta/hero copy; personal + dark/parked sites excluded)
- [x] Cross-linked from nav + footer
- [ ] Add OG screenshots per project (`public/og/*`, then set `ogImage`)
- [ ] Backfill the 4 deferred sites once read (agesdk, disclosur, linkedcsi,
      streamsgalaxy); optionally surface a teaser on `/web-systems`

## v3 — Homepage SEO & entity recognition (next)

Goal: make the homepage (the site's hub/entity page) more machine-readable for
search engines and LLM entity recognition — structured data, social cards, and
indexable prose. Scope is constrained: no routing, styling, or component
structure changes beyond what each item specifies. Several items are gated on
operator-supplied facts (profile URLs, an OG asset, stat accuracy) — those are
flagged, not invented.

**v3.A — Structured data + social meta**
- [ ] Organization JSON-LD (`ProfessionalService`) injected into the **home
      route `<head>` only** (not duplicated on child pages — those get their own
      appropriate type later). `name`, `url`, `email`, `description`, `logo`,
      `knowsAbout` populated from the page; `sameAs` left as a TODO placeholder
      (real GitHub/LinkedIn/etc. URLs supplied by operator — do not invent).
- [ ] `og:image` meta (`https://lamill.io/og-image.png`, apex, 1200×630) + upgrade
      `twitter:card` from `summary` to `summary_large_image`.
- [x] `public/og-image.png` (1200×630) generated deterministically via
      `pnpm run og` (`scripts/og.mjs`, satori + `@resvg/resvg-js`; no AI/network).
      Colors from `styles.css` oklch tokens; JetBrains Mono wordmark + Inter tagline.

**v3.B — Indexable "How we work" prose**
- [ ] New ~120–180-word prose section between the "Three practices" block and the
      Contact CTA. Terse, declarative voice ("Build. Deploy. Advance."). Only
      capabilities already stated on the page (full stack, Linux, hardware
      bringup, IoT, web systems, content) — no invented clients, tech, certs, or
      specifics. Generic-but-true over specific-but-fabricated.

**v3.C — Operator review gates (no code change)**
- [x] Hero stats confirmed accurate by operator (2026-06-29), unchanged in code:
      "12+ years", "40+ projects", "6 domains", "100% senior engineers".
- [ ] Supply real `sameAs` profile URLs for the JSON-LD.
- [x] `public/og-image.png` (1200×630) — generated via `pnpm run og` (see v3.A).

Verification for v3.A/B: JSON-LD must lint as valid JSON; confirm no JSON-LD
leaked onto non-home routes.

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
