# Prompt History

<!-- Append new prompts at the bottom, newest last. Format:
## YYYY-MM-DD
> <prompt text>
-->

## 2026-06-28
> got lovable to design a new site in genai/ move that to our main site implementation
>
> update all docs
>
> add a Readme to point to live site to point to our site from github

## 2026-06-28 — v2 web portfolio + content system (composite)
> Plan the next version and write it into docs/prd.md: mark v1 (the new site)
> done. For v2, add our website projects as a web portfolio and create a
> repeatable way to add content pages.
>
> Build a typed content-collection system (zod schema + import.meta.glob loader)
> with a `/work` listing and `/work/$slug` case-study route, per-page SEO meta
> from the schema, and an authoring guide in docs/. Link "Work" from nav + footer.
>
> Seed the portfolio from our real projects under ../ (using the lamill fleet /
> portfolio.json registry to pick live ones). Ignore personal sites and any/all
> dark (unbuilt/parked) sites; let me select the final list. Source each entry's
> blurb from the site's own meta/hero copy. Drop the "AI-assisted" framing on the
> HybridAutoPart entry.
>
> Then update sitemap.xml (and robots.txt) for all the new /work URLs, apex
> domain, drafts excluded.

## 2026-06-29 — v3 homepage SEO/entity + OG image (consolidated)
> Record this version in docs/prd.md (v3) before coding, and persist the
> session's learnings into the agent/rules docs + memory once done.
>
> SEO / entity-recognition pass on the homepage hub (src/routes/index.tsx,
> scoped to "/" only): add Organization JSON-LD (ProfessionalService) via the
> route head with sameAs left as a TODO (don't invent URLs); add og:image
> (1200×630) and upgrade twitter:card to summary_large_image; insert an
> indexable ~150-word "How we work" prose section between the practices block
> and the contact CTA, using only capabilities already stated on the page (no
> invented clients/tech/certs). Leave the hero stats unchanged but list them
> back for confirmation. Use the apex domain (lamill.io, never www) per the
> portfolio's locked canonical convention — not the www values I first wrote.
> Verify: JSON-LD parses, no ld+json leaks to non-home routes.
>
> Add a deterministic OG image generator: scripts/og.mjs (satori +
> @resvg/resvg-js, no AI/network) → public/og-image.png at 1200×630, wired as
> `npm run og`. Pull colors from the styles.css oklch tokens and bundle real
> fonts (JetBrains Mono wordmark + Inter tagline) from @fontsource. Show the
> script and the rendered image before finalizing.

## 2026-09-17
> check prd - whats next
>
> ok update all docs

## 2026-10-03 — v4 Chrome extensions hub (planned)
> Add a Chrome extensions hub to lamill.io: /extensions directory,
> /extensions/<slug>, /extensions/<slug>/privacy, /extensions/support, all
> rendered from a Tabmill-generated extensions.json (typed contract + one-entry
> sample, save-page-pdf-md). Hub pages short and non-competing with the
> portfolio-site tool pages; privacy generated from data_collected + analytics;
> faceless "Built by LaMill" brand; deploy via the lamill CLI (IndexNow);
> document the JSON contract in README.
>
> approved — placed as v4 (v4.A decisions lock → v4.D deploy).

## 2026-10-11 — extensions: `unlisted` status (from a tabmill session)
> "write the markpdf.dev and lamill.io landing page for save-page-pdf-md" → the Chrome Web Store
> needs `/extensions/<slug>/privacy` live before review, but `draft` 404s. Added `status: "unlisted"`
> (pages live with noindex, hidden from `/extensions` + sitemap); `pageSeo({ noindex })`; README
> contract updated. Tabmill D-035 exports not-yet-published extensions as `unlisted`.

## 2026-10-12 — extensions: one shared privacy page (from a tabmill session)
> "can i use one shared privacy page in lamill.io?" → "A but add a check in release … if the new
> extensions privacy meets our privacy page". New `/extensions/privacy` rendered from
> `src/content/privacy.json` (Tabmill-generated; zod in `src/lib/privacy.ts`); shows
> "Policy version N", which Tabmill's release lint checks on the live page. `/extensions/<slug>/privacy`
> → 301 there; `privacy` reserved slug; sitemap + README contract updated. Tabmill D-036.

## 2026-10-14 — v4.D: publish save-page-pdf-md
> whats next? → update sitemap with extensions page - check latest screenshot for details
> → update the docs and reping using lamill CLI tool → i will fix markpdf.dev but you go
> ahead with lamill, dont wait anylonger → commit and push → commit and push the prd update
> - i am working on a generic solution for contact form, will pick it up next session, so
> save any undone things to PRD → update the docs and prompts.md with this session

Filled `store_url` + `tool_page_url` and flipped `save-page-pdf-md` to `published`; added
`/extensions/save-page-pdf-md` to `sitemap.xml` (its privacy URL 301s to the shared page).
Docs synced to 44 public pages, shared `/extensions/privacy`, `unlisted` status, `lamill`
work draft. Deployed `4dad234`; IndexNow pinged via portfolio `_deploy_step10_indexnow`
(no lamill CLI command for it — recipe now in `AI_AGENTS.md`). v4 closed. PRD backlog:
contact form waits on the operator's fleet-wide solution; markpdf.dev "coming soon" notice
to clear (markpdf.dev repo).
