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

## v2 — Web portfolio & content pages (v2.A done; v2.B open items)

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
- [x] Published `montereybayevents` (2026-10-03): copy sourced from the site's live
      meta + its own `AI_AGENTS.md`/`prd.md`; added to `sitemap.xml`. `anglicanpath`
      excluded — non-profit effort, not studio portfolio work

## v3 — Homepage SEO & entity recognition (built 2026-06-29; v3.C operator gate open)

Goal: make the homepage (the site's hub/entity page) more machine-readable for
search engines and LLM entity recognition — structured data, social cards, and
indexable prose. Scope is constrained: no routing, styling, or component
structure changes beyond what each item specifies. Several items are gated on
operator-supplied facts (profile URLs, an OG asset, stat accuracy) — those are
flagged, not invented.

**v3.A — Structured data + social meta**
- [x] Organization JSON-LD (`ProfessionalService`) injected into the **home
      route `<head>` only** (not duplicated on child pages — those get their own
      appropriate type later). `name`, `url`, `email`, `description`, `logo`,
      `knowsAbout` populated from the page. `sameAs` holds only the confirmed
      GitHub profile (added 2026-07-01); further URLs are operator-supplied — see v3.C.
- [x] `og:image` meta (`https://lamill.io/og-image.png`, apex, 1200×630) + upgrade
      `twitter:card` from `summary` to `summary_large_image`. Generalized
      2026-08-02: `src/lib/seo.ts` `pageSeo()` now emits the full OG set,
      `summary_large_image`, and a self-canonical on every route.
- [x] `public/og-image.png` (1200×630) generated deterministically via
      `pnpm run og` (`scripts/og.mjs`, satori + `@resvg/resvg-js`; no AI/network).
      Colors from `styles.css` oklch tokens; JetBrains Mono wordmark + Inter tagline.

**v3.B — Indexable "How we work" prose**
- [x] New ~120–180-word prose section between the "Three practices" block and the
      Contact CTA. Terse, declarative voice ("Build. Deploy. Advance."). Only
      capabilities already stated on the page (full stack, Linux, hardware
      bringup, IoT, web systems, content) — no invented clients, tech, certs, or
      specifics. Generic-but-true over specific-but-fabricated.

**v3.C — Operator review gates (no code change)**
- [x] Hero stats confirmed accurate by operator (2026-06-29):
      "12+ years", "40+ projects", "6 domains", "100% senior engineers".
      **Revised 2026-08-03:** operator changed "40+ projects" → "20+ projects"
      after `seo-audit.md` flagged the gap against the 28 case studies shown on
      `/work`. The other three stand as confirmed. The availability kicker moved
      from "Q3 2026" to "now" in the same pass, removing its 2026-09-30 expiry.
- [ ] Supply further real `sameAs` profile URLs for the JSON-LD (GitHub is in;
      LinkedIn etc. pending operator).
- [x] `public/og-image.png` (1200×630) — generated via `pnpm run og` (see v3.A).

Verification for v3.A/B: JSON-LD must lint as valid JSON; confirm no JSON-LD
leaked onto non-home routes.

## v4 — Chrome extensions hub (built 2026-10-03; save-page-pdf-md published 2026-10-14)

Goal: a small hub for LaMill's Chrome extensions — directory, per-extension
page, per-extension privacy policy (the store listing links here), and one
support page. Pages render from an `extensions.json` that Tabmill generates.
Rules: hub pages must not compete with the portfolio-site tool pages (short,
no keyword-targeted copy, prominent link out to the tool page); privacy text
is generated from `data_collected` + `analytics`, defaulting to "all
processing is local, nothing is collected"; faceless brand — "Built by
LaMill" only, no personal names. (The "must not compete" rule is partially
superseded by v6 — extension pages get scoped keyword copy.)

**v4.A — Kickoff / decisions lock (no code) — DONE 2026-10-14**
- [x] `extensions.json` contract: `slug`, `name`, `pitch`, `store_url`,
      `tool_page_url`, `permissions[{name, reason}]`, `data_collected`,
      `analytics` (bool), `changelog[{version, date, notes}]`, `status`
      — locked: `status` = published|unlisted|draft (default draft; `unlisted` added
      2026-10-11 — page live with noindex, off `/extensions` + sitemap, so the store's
      privacy-URL review can pass pre-publish; Tabmill D-035); `data_collected` =
      string[] (empty = nothing collected); changelog `YYYY-MM-DD`, newest first
- [x] Where Tabmill writes the file in this repo — `src/content/extensions.json`
- [x] Which site hosts the full tool pages — per-extension, from the tabmill recipe's
      `portfolio_site` (save-page-pdf-md → markpdf.dev; its `landing_page_url` is still empty)
- [x] Real values for `save-page-pdf-md` — name, pitch, permissions + reasons,
      analytics from tabmill's `recipes/save-page-pdf-md/extension.yaml`; `tool_page_url`
      = `https://markpdf.dev/save-webpage-as-pdf/`, `store_url` = its Chrome Web Store
      listing (both filled 2026-10-14); `changelog` still empty
- [x] Deploy path: Vercel push-to-`main` auto-deploy. `lamill new deploy` on a
      Vercel site only shells `vercel deploy --prod` — it never reaches the IndexNow
      step — so IndexNow is pinged separately (portfolio `_deploy_step10_indexnow`)

**v4.B — Data contract — DONE 2026-10-03**
- [x] zod schema + typed loader for `extensions.json`, following the
      `src/lib/content.ts` pattern
- [x] Sample `extensions.json` with one extension (`save-page-pdf-md`) — one ‹FILL›
      URL remains (see v4.A), so the entry is `status: "draft"` (404s, out of the
      sitemap) until it's filled; the loader warns at build time while any remain

**v4.C — Pages — DONE 2026-10-03 (renders from placeholder sample)**
- [x] `/extensions` — directory: name, pitch, store link, tool-page link
- [x] `/extensions/$slug` — what it does, install button, permissions + why,
      changelog, tool-page link
- [x] `/extensions/$slug/privacy` — generated from `data_collected` + `analytics`.
      **Superseded 2026-10-12:** one shared `/extensions/privacy` rendered from
      `src/content/privacy.json` ("Policy version N", checked by Tabmill's release lint;
      Tabmill D-036); per-slug URLs 301 there; `privacy` is a reserved slug
- [x] `/extensions/support` — single contact/support page
- [x] Sitemap entries + footer link; `pageSeo()` head on every route

**v4.D — Contract docs + deploy**
- [x] Document the JSON contract in `README.md` so Tabmill can target it
- [x] Deployed 2026-10-04 (`4eb0eff`, after the TanStack Start XSS patch unblocked
      Vercel); IndexNow pinged for all 42 sitemap URLs
- [x] Publish `save-page-pdf-md` (2026-10-14): flipped to `published`, added
      `/extensions/save-page-pdf-md` to `sitemap.xml` (only 1 URL — its privacy URL
      301s to the shared page, already listed)
- [x] Deployed 2026-10-14 (`4dad234`); IndexNow pinged for `/extensions/save-page-pdf-md`

## v5 — LaMill rebrand & products (deployed 2026-10-17)

Goal: new LaMill brand identity (geometric blue/navy L symbol, tagline "Useful
Tools for Real Work", YouTube channel) and a clear split between **LaMill
Studio** (engineering services — "Build. Deploy. Advance.") and **LaMill
Products** (the tools, extensions and sites — "Useful Tools for Real Work").
Source assets: `lamill-astro-brand.zip` (operator-supplied, 2026-10-17).
Constraints: preserve every existing URL, canonical and indexed page; no new
dependencies; no invented products or capabilities; no deploy without approval.
Inserted ahead of the extension landing pages (now v6) so v6 is built on the new
brand. The contact form (backlog) is still blocked on the operator's fleet-wide
solution; v5 does not wait on it.

**v5.A — Kickoff / decisions lock (no code) — DONE 2026-10-17**
- [x] Spelling — **"LaMill"**, consistent everywhere (site, assets, JSON-LD). The
      zip's "Lamill" wordmark/OG text is not used as-is.
- [x] Project count — hero stays **"20+ projects"** (the zip brief's "50+" is not
      published; nothing in the repo backs it).
- [x] Dark-background logo — the zip's `logo-dark.svg` keeps the navy (`#102239`)
      L-foot, which vanishes on the site's near-black background; **recolor** the
      foot for dark backgrounds.
- [x] Products home — new **`/products`** index built from the existing
      `src/content/work` entries plus a category field; `/work` unchanged.
- [x] Numbering — rebrand is v5; extension landing pages renumbered v5 → v6.

**v5.B — Brand assets — BUILT 2026-10-17**
- [x] `scripts/brand.mjs` (`pnpm run brand`, no new deps — satori + resvg): symbol
      (light + dark-recolored foot `#E8EEF7`), "LaMill" lockups with the wordmark
      outlined from Inter 700 → `public/brand/`; header + footer use the dark lockup
- [x] Favicon (svg adapts to light/dark browser UI; ico 16/32/48), apple-touch-icon,
      192/512 icons + `site.webmanifest`; `public/lamill.svg` (JSON-LD logo URL) now
      holds the new lockup
- [x] OG image regenerated (`pnpm run og`): L symbol + "LaMill", "Useful tools for
      real work.", "Engineering studio — Build. Deploy. Advance." in the site palette
- [x] `<Brand />` keeps "LaMill" cased inside `uppercase` labels (footer ©, kickers,
      "Built by LaMill") — verified: no "LAMILL" rendered on any of the 45 pages

**v5.C — Homepage — BUILT 2026-10-17**
- [x] "Build. Deploy. Advance." hero kept; practices section labelled "LaMill Studio";
      new "LaMill Products — Useful Tools for Real Work." section
- [x] Featured products (6, all live 200 on 2026-10-17): Cottage Food Map, MarkPDF,
      MDBurst, CivicTools, CalcEngine, VoltLoop — existing summaries, nothing new

**v5.D — Products — BUILT 2026-10-17**
- [x] `category` (+ optional `featured`) on work entries; 28 of 29 published entries
      categorized from their own summaries (7 categories); `lamillrentals` left
      uncategorized as client work; drafts untouched — **operator to review the
      category + featured picks**
- [x] `/products` index grouped by category (featured first, then A–Z), each card →
      product site + case study; published extensions section; nav, footer, sitemap

**v5.E — SEO — BUILT 2026-10-17**
- [x] Homepage JSON-LD `ProfessionalService` → `Organization`: slogan "Useful Tools
      for Real Work", logo, `sameAs` GitHub + `https://www.youtube.com/@Lamillhq`
      (verified 200, channel title "LaMill"); footer YouTube link
- [x] Existing URLs, titles, descriptions, canonicals unchanged; `/products` via
      `pageSeo()`; asset URLs `/favicon.svg`, `/og-image.png`, `/lamill.svg` kept

**v5.F — Quality + deploy gate**
- [x] `pnpm build` exit 0; `tsc --noEmit` exit 0; touched files lint-clean except
      pre-existing prettier errors (see backlog)
- [x] Before (live site) / after (dev build) screenshots, desktop 1440 + mobile 390,
      `/`, `/work`, `/extensions` (+ `/products` after); no horizontal overflow at 390px
- [ ] Operator review: logo/OG look, category + featured picks, the five `.xyz`
      product sites that failed TLS from the dev box (see backlog)
- [x] Deployed `7daae88` on operator approval (2026-10-17); live smoke 200 on `/`,
      `/products`, assets; `Organization` JSON-LD live; IndexNow pinged (1 new URL:
      `/products` — ledger-gated, already-known URLs not resent)

## v6 — Extension landing pages (deployed 2026-10-23; off-machine media backup open)

Goal: turn `/extensions/$slug` from a thin stub into a landing page that ranks,
earns directory/blog links, and converts to installs — built as a reusable
template driven by per-extension data, so the next extension is one data entry.
First consumer: `save-page-pdf-md`. Originally sequenced after the 🔴 contact-form
item; **pulled ahead of it 2026-10-23** (operator) — the contact form stays blocked on
the fleet-wide solution either way.

Partially supersedes the v4 rule "hub pages must not compete with the
portfolio-site tool pages": extension pages now carry keyword-targeted copy,
scoped so they don't cannibalize the portfolio site (see v6.A).

**v6.A — Kickoff / decisions lock (no code) — DONE 2026-10-17**
- [x] SEO split with the portfolio site — lamill.io targets the **Markdown**
      searches ("save webpage as markdown", clipping, Markdown for LLMs); PDF depth
      stays on `markpdf.dev/save-webpage-as-pdf/`, which the page links to
      descriptively. Title still names both formats (operator spec).
- [x] Copy ownership — Tabmill keeps owning `extensions.json` (facts, store URL,
      permissions, status). Page copy lives in a **lamill-owned per-extension file**
      joined by slug, so Tabmill exports never overwrite it.
- [x] Brand spelling — **"LaMill"** sitewide (no change to the existing spelling).
- [x] Facts source — only the operator-supplied facts list (2026-10-17 prompt in
      `docs/Prompts.md`); nothing beyond it.
- [x] Media spec (2026-10-23) — hero autoplays a silent MP4 (muted, loop, playsinline,
      poster = first frame; poster only under `prefers-reduced-motion`) + "Watch with
      sound" → YouTube `h2GWC_BamQQ` (uploaded 2026-10-23); assets in
      `public/extensions/save-page-pdf-md/`
- [x] FAQ (2026-10-23) — operator's 5 Qs merged with the 2026-10-17 six: Is it free?
      Does it upload anything? Why doesn't it work on some pages? Why did it save the
      whole page instead of the article? How do I get pages into Obsidian? Markdown or PDF?
- [x] No ad claims (2026-10-23) — copy never says it blocks/removes ads; the facts
      list's "without menus, ads and sidebars" becomes "without menus and sidebars"

**v6.B — Template + data contract — BUILT 2026-10-23**
- [x] Lamill-owned page-copy schema (zod) + loader, joined to `extensions.json` by
      slug: value prop, demo media `{src, alt, kind}`, `og_image`, body sections,
      "great for" list, how-to steps, `faq[]`, version, size, price
- [x] Generic `/extensions/$slug` template rendering it (falls back to today's thin
      page when an extension has no copy file); visible breadcrumbs
- [x] JSON-LD builder: `SoftwareApplication` (price 0 USD, OS Chrome, install/download
      → store link, publisher LaMill), `FAQPage` generated from the same `faq[]` as the
      visible FAQ, `BreadcrumbList` (Home → Extensions → page), `VideoObject` for the
      YouTube demo when the copy file has one. No ratings/reviews
      (none exist — no star rich result expected)
- [x] Media components: hero video (silent MP4 + poster, reduced-motion → poster,
      "Watch with sound" link) and a "How it works" screenshot gallery (captions,
      lazy, explicit width/height, AVIF/WebP + PNG fallback via `<picture>`)
- [x] One UTM helper for every store link (`utm_source=lamill.io&utm_medium=landing&utm_campaign=<slug>`),
      used on the detail page and the `/extensions` hub
- [x] README: "add the next extension" — one data entry + one copy file

**v6.C — save-page-pdf-md content — BUILT 2026-10-23** (media renders once v6.D assets land)
- [x] Title "Save Webpage as Markdown or PDF – Free Chrome Extension | LaMill"; H1
      close to it; meta description ≤ ~155 chars, "runs locally" angle
- [x] Hero value prop, Add to Chrome button, silent demo video + "Watch with sound"
- [x] "How it works" gallery: "Before → After", "One click: Markdown or PDF",
      "Save as PDF from Chrome's print dialog" (`shot-before-after/popup/pdf.png`)
- [x] Body 300–500 words: what you get, great for, how to use (3 steps), privacy &
      permissions (existing block kept)
- [x] FAQ (the merged 6 Qs, see v6.A)
- [x] Replace "Full tool page ↗" with "Guide: how to save a webpage as a clean PDF"
      → markpdf.dev guide and "Need branded PDFs from Markdown? Try MarkPDF" →
      markpdf.dev (`utm_source=lamill.io`)
- [x] `/extensions` card: store link now carries the UTM; card description is Tabmill's
      `pitch`, already accurate — unchanged

**v6.D — Assets, verification, deploy**
- [x] Media in `public/extensions/save-page-pdf-md/` (2026-10-23): shots from tabmill's
      `extensions/save-page-pdf-md/assets/screenshot{1,3,2}.png` → `shot-before-after`,
      `shot-popup`, `shot-pdf`; silent MP4 from `~/Downloads`. The with-sound MP4 and the
      GIF aren't used on the page (sound is on YouTube)
- [x] Derived assets (`scripts/ext-media.sh`): 720p web MP4 (5.4 MB → 2.1 MB, no audio
      track), poster (first frame), AVIF/WebP per screenshot (11–16 KB AVIF), OG image =
      `shot-before-after.png` fitted to 1200×630 on its own background
- [x] Poster = the 2s title card ("as Markdown or PDF in one click."), not the blank
      frame 0 — `POSTER_AT=2 bash scripts/ext-media.sh save-page-pdf-md` (operator, 2026-10-23)
- [x] Source MP4 dropped from `public/`; only the `.web.mp4` ships. Backup copy in tabmill's
      `extensions/save-page-pdf-md/assets/` (untracked there, same disk as `~/Downloads`)
- [ ] Operator: off-machine backup of `save-page-silent-16x9.mp4` (cloud storage)
- [ ] Checks: page weight, no layout shift (CLS), mobile 390px
      — verified 2026-10-23 against **synthetic** test media (since removed): media adds
      0 CLS (only the pre-existing sitewide header shift, 0.0004), no x-overflow at 390px,
      reduced-motion never fetches the MP4; MP4 `preload="none"`. Re-run with the real
      files for real weights
- [x] Screenshot `alt` text rewritten against the real images (2026-10-23)
- [x] Re-checked with the real media (2026-10-23): 0 CLS from media, no x-overflow at
      390px, first-load media = poster 11 KB + AVIFs 38 KB; MP4 streams only after play
      starts (plays + loops in WebKit; Playwright's Chromium has no H.264)
- [ ] Build clean; rendered JSON-LD shown and validated; every link checked (store
      links carry UTM); mobile screenshot via the playwright image
- [x] Deployed `8e3b014` (2026-10-23); live: new title, `og:image` = page OG, 2 UTM store
      links, video + 3 `<picture>`s in SSR HTML, all 4 JSON-LD types, every asset 200
- [x] IndexNow ran — ledger current, nothing sent (the URL was pinged 2026-10-14; the
      ledger only sends new URLs, not updated ones)

## Backlog / follow-ups (open)
- [ ] Five published product sites failed the TLS handshake from the dev box on
      2026-10-17 (`SSL routines::wrong version number`): dailyring.xyz, donready.xyz,
      earnlog.xyz, permittruck.xyz, scopeguard.xyz — check from another network; if
      really down, drop their links (or the entries) from `/work` + `/products`
- [ ] Lint debt: `pnpm lint` (`eslint .`) ran >15 min without finishing in the dev
      container; `eslint src scripts` reports ~150 pre-existing prettier errors
      (`--fix`-able) — one formatting pass, separate commit
- [ ] 🔴 **URGENT — wire the contact form to a real backend / email delivery.**
      `/contact` is the site's only conversion path and it currently drops every
      submission: `handleSubmit` sets local component state and nothing is sent or
      stored, so an inbound lead is lost with no trace and no way to recover it.
      The same page promises "We respond within one business day", which makes this
      a broken promise rather than just a missing feature. Until it ships, treat
      `hello@lamill.io` as the only working contact channel. `seo-audit.md` T-14 /
      unverifiable-claims row 1.
      **Status 2026-10-14:** operator is building a generic (fleet-wide) contact-form
      solution; pick up next session by wiring `/contact` to it — don't build a
      lamill-only backend in the meantime.
- [ ] Confirm the markpdf.dev tool page (`/save-webpage-as-pdf/`) no longer shows its
      "coming soon" notice — `/extensions/save-page-pdf-md` links out to it as live.
      Fix lives in the markpdf.dev repo (operator, 2026-10-14).
- [ ] Verify the SSR-on-Vercel deploy against a live build (not yet validated)
- [ ] Wire `/aitools` Text Generator + Image Analyzer to real Claude calls —
      until then both are marked "Coming soon" on `/aitools` (2026-08-03)
- [ ] Fill `lamill.toml [content]` (site_type, primary/secondary keywords, icp,
      tone) — feeds rankmill; log baseline GSC numbers in `docs/growth.md` first
- [ ] (Optional) De-Lovable-ify: replace `@lovable.dev/vite-tanstack-config`
      with a plain TanStack Start Vite config; drop the Lovable error reporter
- [ ] **DUE (deferred to 2026-08-17, now past) — verify the four `@lamill_*` social handles.**
      `/content` presents `@lamill_content`, `@lamill_pics`, `@lamill_studio`,
      and `@lamill_design` as live accounts; nothing in the repo establishes that
      any exist, and none is in the homepage JSON-LD `sameAs` (which holds only
      the GitHub profile). Operator deferred on 2026-08-03 — do not re-raise
      before 2026-08-17. On pickup: confirmed accounts go into `sameAs` in
      `src/routes/index.tsx` (that file's comment already forbids unverified
      handles); unconfirmed ones come off `/content`. `seo-audit.md` claim 4.

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
