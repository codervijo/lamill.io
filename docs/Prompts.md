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
