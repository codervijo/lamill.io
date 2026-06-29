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
