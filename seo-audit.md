# SEO audit — lamill.io

**Date:** 2026-07-31 · **Commit audited:** `5462d44` · **Scope:** every route in `src/routes/`
**Method:** rendered SSR HTML, not source components. `vite dev` served the app inside the
`sites1` container; all 42 routes were fetched over HTTP and parsed from the returned HTML.
Live production (`https://lamill.io`) was spot-checked to confirm dev output matches prod.
No code was changed by this audit.

> ## Status — updated 2026-08-02
>
> Findings below are preserved **as measured on 2026-07-31 at `5462d44`**. They are not rewritten
> when fixed; each item carries its own status instead, so this file stays a record of what was
> true when audited rather than a moving description of the site.
>
> **Resolved since the audit**
>
> - **T-1, T-2, T-3, T-4** — fixed in `08d9cf4`. All 39 served routes now emit a complete Open
>   Graph set (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`),
>   `twitter:card: summary_large_image`, and a self-referencing canonical. Verified against built
>   output: 39/39 complete, `canonical === og:url` on every route, canonical set matches the 39
>   sitemap `<loc>` entries exactly, no duplicate tags. `src/lib/seo.ts` now owns the URL form.
> - **T-11** — `AI_AGENTS.md` and the stale `src/lib/content.ts` schema comment corrected.
> - **T-12** — `docs/growth.md` corrected by appended note (that file is append-only).
> - **Two `[VERIFY]` copy claims on `/`** (2026-08-03) — "40+ Projects delivered" → **"20+"**, and
>   "Available for engagements — Q3 2026" → **"— now"**, which removes the 2026-09-30 expiry.
>   Operator decisions; `docs/prd.md` v3.C updated to match. The `/content` "Stay tuned" placeholder
>   was reviewed and deliberately kept.
>
> **Still open:** T-5 through T-10 and T-13 through T-16, plus everything in §1, §2, and §3.
> The `/work` page set, internal linking, and route structure are deliberately untouched.

---

## How the numbers were produced

- **word_count** — words inside `<main>` only. `<header>`/`<nav>` and `<footer>` are excluded,
  so shared chrome never counts toward a page's total.
- **unique_word_count** — word_count minus every text node that appears verbatim inside `<main>`
  on 3 or more *other* routes. Units are DOM text nodes, so shared template copy
  (`← All work`, `Visit live site ↗`, `// Stack`, `Start a project →`) and repeated chip labels
  (`Astro`, `SaaS`, `Tool`) are stripped, while prose survives. This is the number that matters
  for `/work/$slug`.
- **inbound_links** — dofollow internal links pointing at the route from `<main>` on other routes.
  Nav and footer links are excluded here and reported separately as `nav_linked`.
  No `rel="nofollow"` exists anywhere on the site, so dofollow == all links.
- **outbound_links** — distinct internal targets linked from this route's `<main>`.
- **target_query** — written only where the repo itself evidences the query
  (`lamill.toml [content]` keywords, or `docs/growth.md` with its cited Ahrefs volumes).
  Everything else is `none`. No keywords were invented for this report.

---

## Correction to a claim made earlier today — RESOLVED 2026-08-02

`AI_AGENTS.md` (committed in `53b037b`, an hour before this audit) states that draft work entries
"render a full page today" by direct URL. **That is wrong, and this audit disproves it.**
`/work/airsucks`, `/work/caringbeds`, and `/work/mcpscan` all return **HTTP 404**.
`getWorkBySlug()` delegates to `getAllWork(opts)`, which filters on `status === "published"`
unless `includeDrafts` is passed — the `/work/$slug` loader does not pass it, so the lookup misses
and the route throws `notFound()`. The "still previewable by URL" comment at
`src/lib/content.ts:29` is stale and describes behavior the code does not implement.

That bullet in `AI_AGENTS.md` needs a one-line correction. This audit does not change code, so
it has been left in place — see Technical debt, item T-11.

**Resolved 2026-08-02.** The `AI_AGENTS.md` bullet now states that draft slugs 404 and explains
why, and the `src/lib/content.ts` schema comment no longer claims by-URL preview. Both name the
`includeDrafts` mechanism so the next reader can check the behavior against the code.

---

## Headline findings

1. **37 of 39 served routes have no `<link rel="canonical">`.** Only `/notes` and
   `/notes/yocto-vs-buildroot` set one. Every other page — including the homepage — ships none.
   *(Resolved 2026-08-02 in `08d9cf4` — all 39 now self-canonical.)*
2. **All 28 published case studies are thin.** Unique content ranges 16–117 words; the average is
   **33.5**. Every one is below the 200-word floor. 26 of 28 have a `<main>` body that is
   *verbatim identical* to their own meta description.
3. **Not one `/work/$slug` page has an identifiable target query.** They are case studies about
   other domains, and those domains own their brand terms.
4. **`og:image` exists on exactly one route** (`/`) — 38 served routes have none, so every share
   outside the homepage renders a bare card. Separately, 37 have no `og:url`
   (the two `/notes*` routes set it, `/` does not).
   *(Resolved 2026-08-02 in `08d9cf4` — complete OG set on all 39.)*
5. **The `/aitools` cluster is orphaned** — nothing in nav, footer, or any page body links into it.
   Its only inbound links come from its own two children.
6. **One page carries the entire organic upside**: `/notes/yocto-vs-buildroot`, 2,336 unique words,
   valid `TechArticle` markup, a documented target with cited volume.
7. **The site makes a response-time promise it cannot keep.** `/contact` states "We respond within
   one business day"; the form has no backend and submissions go to local component state only.

---

## Route table

All 42 routes. The last three are drafts and are **not served** — they 404, and are absent from
`sitemap.xml`. `canonical` shows the path portion; `MISSING` means no canonical tag was emitted.

| route | kind | word_count | unique_word_count | h1 | title | meta_desc_len | canonical | og_complete | json_ld_types | inbound_links | nav_linked | outbound_links | in_sitemap | target_query | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | root hub | 282 | 275 | Build.Deploy.Advance. | LaMill — Build. Deploy. Advance. | 99 | MISSING | n | ProfessionalService | 3 | y | 4 | y | engineering studio | REWRITE |
| `/services` | practice hub | 212 | 202 | Service that fits your culture. | Services — LaMill | 132 | MISSING | n | none | 5 | y | 1 | y | engineering studio | MERGE→/ |
| `/web-systems` | practice hub | 191 | 182 | Websites, web apps, and mobile — one team. | LaMill Web Systems — Websites, Web Apps, Mobile | 112 | MISSING | n | none | 1 | y | 2 | y | web systems engineering | REWRITE |
| `/content` | practice hub | 122 | 116 | Content that ships with the product. | Content — LaMill | 104 | MISSING | n | none | 1 | y | 1 | y | none | NOINDEX |
| `/work` | index hub | 416 | 376 | Sites we've built and shipped. | Work — LaMill | 108 | MISSING | n | none | 28 | y | 28 | y | none | KEEP |
| `/notes` | index hub | 58 | 58 | Engineering notes, from the workshop. | Notes — LaMill | 110 | /notes | n | none | 1 | y | 1 | y | none | NOINDEX |
| `/aitools` | index hub | 64 | 61 | Utilities, powered by AI. | AI Tools — LaMill | 91 | MISSING | n | none | 2 | n | 2 | y | none | NOINDEX |
| `/contact` | conversion leaf | 71 | 71 | We're happy to hear from you. | Contact — LaMill | 87 | MISSING | n | none | 34 | y | 0 | y | none | NOINDEX |
| `/notes/yocto-vs-buildroot` | article leaf | 2336 | 2336 | Yocto vs Buildroot: Choosing an Embedded Linux Build System | Yocto vs Buildroot: Choosing an Embedded Linux Build System — LaMill | 178 | /notes/yocto-vs-buildroot | n | TechArticle | 1 | n | 3 | y | yocto vs buildroot | KEEP |
| `/aitools/text-generator` | mock tool leaf | 11 | 11 | Text Generator | Text Generator — LaMill AI Tools | 40 | MISSING | n | none | 1 | n | 1 | y | none | NOINDEX |
| `/aitools/image-analyzer` | mock tool leaf | 13 | 13 | Image Analyzer | Image Analyzer — LaMill AI Tools | 36 | MISSING | n | none | 1 | n | 1 | y | none | NOINDEX |
| `/work/boxchive` | case-study leaf | 34 | 23 | Boxchive | Boxchive — LaMill Work | 106 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/bppvcoach` | case-study leaf | 37 | 26 | BPPV Coach | BPPV Coach — LaMill Work | 109 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/calcengine` | case-study leaf | 43 | 31 | CalcEngine | CalcEngine — LaMill Work | 137 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/civictools` | case-study leaf | 46 | 32 | CivicTools | CivicTools — LaMill Work | 130 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/cottagefoodmap` | case-study leaf | 45 | 34 | Cottage Food Map | Cottage Food Map — LaMill Work | 122 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/cricketfansite` | case-study leaf | 43 | 31 | Cricket Fan Site | Cricket Fan Site — LaMill Work | 137 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/dailyring` | case-study leaf | 39 | 29 | DailyRing | DailyRing — LaMill Work | 104 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/dearreels` | case-study leaf | 40 | 30 | DearReels | DearReels — LaMill Work | 123 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/donready` | case-study leaf | 41 | 30 | DonReady | DonReady — LaMill Work | 96 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/drdebug` | case-study leaf | 41 | 30 | DrDebug | DrDebug — LaMill Work | 122 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/dropaudit` | case-study leaf | 35 | 23 | DropAudit | DropAudit — LaMill Work | 103 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/earnlog` | case-study leaf | 37 | 25 | EarnLog | EarnLog — LaMill Work | 112 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/homeloom` | case-study leaf | 41 | 28 | Homeloom | Homeloom — LaMill Work | 118 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/hybridautopart` | case-study leaf | 129 | 117 | Hybrid Auto Part | Hybrid Auto Part — LaMill Work | 155 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/isitholiday` | case-study leaf | 50 | 38 | Is It Holiday Today | Is It Holiday Today — LaMill Work | 124 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/keralavotemap` | case-study leaf | 45 | 32 | Kerala Vote Map | Kerala Vote Map — LaMill Work | 132 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/lamillrentals` | case-study leaf | 107 | 97 | LaMill Rentals | LaMill Rentals — LaMill Work | 193 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/marginready` | case-study leaf | 41 | 30 | MarginReady | MarginReady — LaMill Work | 112 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/markpdf` | case-study leaf | 32 | 21 | MarkPDF | MarkPDF — LaMill Work | 91 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/mdburst` | case-study leaf | 39 | 27 | MDBurst | MDBurst — LaMill Work | 112 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/meetwhen` | case-study leaf | 24 | 16 | MeetWhen | MeetWhen — LaMill Work | 65 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/mspproof` | case-study leaf | 37 | 25 | MSPProof | MSPProof — LaMill Work | 115 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/permittruck` | case-study leaf | 31 | 19 | PermitTruck | PermitTruck — LaMill Work | 106 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/retouchlint` | case-study leaf | 30 | 18 | RetouchLint | RetouchLint — LaMill Work | 102 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/scopeguard` | case-study leaf | 44 | 33 | ScopeGuard | ScopeGuard — LaMill Work | 124 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/threadradar` | case-study leaf | 46 | 34 | ThreadRadar | ThreadRadar — LaMill Work | 119 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/voltloop` | case-study leaf | 51 | 38 | VoltLoop | VoltLoop — LaMill Work | 124 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/washcalc` | case-study leaf | 36 | 22 | WashCalc | WashCalc — LaMill Work | 109 | MISSING | n | none | 1 | n | 2 | y | none | NOINDEX |
| `/work/airsucks` | case-study leaf | 0 (404) | 0 (404) | — (404) | LaMill — Engineering Studio | 154 | MISSING | n | none | 0 | n | 1 | n | none | DELETE |
| `/work/caringbeds` | case-study leaf | 0 (404) | 0 (404) | — (404) | LaMill — Engineering Studio | 154 | MISSING | n | none | 0 | n | 1 | n | none | DELETE |
| `/work/mcpscan` | case-study leaf | 0 (404) | 0 (404) | — (404) | LaMill — Engineering Studio | 154 | MISSING | n | none | 0 | n | 1 | n | none | DELETE |

**Verdict counts:** KEEP 2 · REWRITE 2 · MERGE 1 · NOINDEX 34 · DELETE 3.

---

## 1. `/work/$slug` analysis

### Shared template

The `/work/$slug` template contributes **9 words** of shared copy inside `<main>`, across 4 text
nodes: `← All work`, `Visit live site ↗`, `// Stack`, `Start a project →`. Everything else in the
chrome is nav/footer and already excluded. The template is *not* the problem — it is lean. The
problem is that there is almost nothing inside it.

Structurally each page renders: a back-link, a date, an `<h1>` (the project name), a one-line
summary, an optional "Visit live site" button, tag chips, stack chips, and a body of **one
paragraph**. 26 of the 28 published entries have exactly one body paragraph; `hybridautopart` has
three and `lamillrentals` has two.

### Unique content per case study

| Metric | Value |
| --- | --- |
| Pages in group | 28 published (3 more are drafts and 404) |
| Mean word_count (`<main>`) | 45.1 |
| **Mean unique_word_count** | **33.5** |
| Range | 16 – 117 |
| Pages with unique_word_count ≥ 200 | **0 of 28** |
| Pages with unique_word_count ≥ 400 | **0 of 28** |
| Pages with an `outcome` field populated | **2 of 28** (`hybridautopart`, `lamillrentals`) |
| Pages whose `<main>` body is verbatim their meta description | **26 of 28** |

**Highest three by unique content**

| Route | unique_word_count | Why it's ahead |
| --- | --- | --- |
| `/work/hybridautopart` | 117 | 3 body paragraphs, populated `outcome`, real stack detail (WordPress + Yoast) |
| `/work/lamillrentals` | 97 | 2 body paragraphs, populated `outcome`, named service geography |
| `/work/voltloop` | 38 | one paragraph, marginally longer than the rest |

**Lowest three by unique content**

| Route | unique_word_count | Content |
| --- | --- | --- |
| `/work/meetwhen` | 16 | one sentence; also now has no outbound link after `5462d44` |
| `/work/retouchlint` | 18 | one sentence |
| `/work/permittruck` | 19 | one sentence |

### Does any of them have a target query?

**No.** Zero of the 28 have an identifiable target query, and this is structural, not fixable by
editing copy. Each page is *about* a third-party domain that already exists and already owns its
brand term — `boxchive.com` will outrank `lamill.io/work/boxchive` for "boxchive" permanently, and
correctly so. The generic terms the pages touch ("digital archive", "compliance evidence") are
commercial-intent queries that a 34-word stub cannot compete for.

The two exceptions are not exceptions to the rule so much as candidates for a different page type:
`hybridautopart` and `lamillrentals` describe work with a documented outcome, which is the raw
material for a genuine case study — but neither is one yet at 117 and 97 words.

### Is this set publishable as-is?

**No.** As it stands, `/work/*` is 28 indexable URLs averaging 33.5 unique words, where 26 of them
duplicate their own meta description as their entire body, and none has a query it can win. This
is the textbook profile of a thin-content cluster: it dilutes crawl budget across 28 near-empty
URLs, it gives the site a bad ratio of thin to substantial pages, and it earns nothing. `/work`
itself is fine — 376 unique words of genuinely distinct project summaries — but it is pointing at
28 pages that should not be indexed.

**Recommendation: collapse 28 → 4 real case studies.**

| Surviving slug | Basis for survival |
| --- | --- |
| `hybridautopart` | Highest unique content (117 w), populated `outcome`, non-trivial stack story (WordPress + React + Yoast), tagged Content site / SEO |
| `lamillrentals` | Populated `outcome`, only route on the site with local geography, tagged Local SEO — the single existing asset for the monterey-bay-local pillar |
| `cottagefoodmap` | Tagged Directory / SEO; a sourced 50-state reference is a real build story with a measurable outcome available |
| `isitholiday` | Tagged Programmatic SEO / Tool; programmatic-SEO buildout is a differentiated engineering narrative |

The first two are chosen on evidence already in the repo (`outcome` populated, highest unique
content). The second two are chosen on the *type* of work their tags describe, which is the
strongest differentiator available — but their current pages are 34 and 38 unique words, so the
case-study content does not exist yet and would have to be written. That is a judgment call about
where the best story is, not a measurement; treat it as a proposal, not a finding.

Each survivor needs to reach **800–1,200 words** with problem, constraints, approach, and a
measured outcome. `[VERIFY]` — no metrics exist in the repo for any project, so every outcome claim
in a rewritten case study has to come from you.

The other 24 published entries should keep their data in `src/content/work/*.ts` and keep rendering
as cards on `/work` — they have real value as a portfolio listing — but their individual URLs
should stop being indexable. The 3 draft entries already 404 and should be deleted outright or
finished.

---

## 2. Orphan report

Strict orphans — served routes with **zero** non-nav, non-footer inbound links: **none.**
Every served route has at least one body link pointing at it.

That clean result is misleading, so here is what the link graph actually looks like:

| Route | Body inbound | Where from | Assessment |
| --- | --- | --- | --- |
| `/aitools` | 2 | **only** `/aitools/text-generator` and `/aitools/image-analyzer` ("← Back to AI Tools") | **Orphan cluster.** Not in nav, not in footer, and no page outside the cluster links in. Reachable only via `sitemap.xml` or a direct URL. |
| `/aitools/text-generator` | 1 | `/aitools` | Inside the orphaned cluster |
| `/aitools/image-analyzer` | 1 | `/aitools` | Inside the orphaned cluster |
| `/` | 3 | **only** the "Go home" link on the three 404 pages | No content page on the site links to the homepage from its body. Nav/footer cover it, so this is cosmetic, but the homepage receives zero editorial internal links. |
| `/notes` | 1 | `/notes/yocto-vs-buildroot` ("← All notes") | Footer-linked, so reachable; but only its own child links in |
| `/notes/yocto-vs-buildroot` | 1 | `/notes` | The site's best page has exactly one internal link pointing at it |
| `/web-systems` | 1 | `/` | Practice hub with a single editorial inbound |
| `/content` | 1 | `/` | Practice hub with a single editorial inbound |
| each `/work/$slug` | 1 | `/work` index card | Minimum viable; no cross-linking between case studies |

**`docs/growth.md` contains an inaccurate claim.** The 2026-07-15 entry states the article is
"linked from the footer (within 2 clicks of home)". The footer links `/notes`, not
`/notes/yocto-vs-buildroot`. The article is 2 clicks from home via `/notes`, so the parenthetical
is right, but the "linked from the footer" part is not — the article itself has one inbound link,
from its own index.

---

## 3. Three-pillar mapping

Mapping the surviving set — the 2 KEEP, 2 REWRITE, and 1 MERGE-survivor routes, plus the 4
recommended case studies from §1. Mapping only the 2 strict-KEEP routes would be uninformative.

### Pillar assignment

| Route | Pillar | Note |
| --- | --- | --- |
| `/notes/yocto-vs-buildroot` | **embedded-linux** | Clean single fit. Yocto/Buildroot, BSP, kernel |
| `/services` | **embedded-linux** | Copy is BSP authoring, kernel, U-Boot, boot optimization, drivers, BLE firmware — the most embedded-heavy page on the site |
| `/web-systems` | **web-product** | Clean single fit. Marketing sites, SaaS, mobile |
| `/work` | **web-product** | Every listed project is a website or web tool |
| `/work/hybridautopart` | **web-product** | Content site + SEO |
| `/work/cottagefoodmap` | **web-product** | Directory + SEO |
| `/work/isitholiday` | **web-product** | Programmatic SEO tool |
| `/work/lamillrentals` | **monterey-bay-local** | Salinas, Monterey, Carmel, Pacific Grove, Marina, Seaside |

### Routes that fit no pillar

| Route | Why |
| --- | --- |
| `/` | Root brand hub. Spans all three by design — it should be the parent of the pillars, not a member of one |
| `/content` | Articles / photography / video / design production. Not embedded, not web-product, not local. It is a fourth practice with no pillar |
| `/contact` | Conversion utility |
| `/aitools` + 2 leaves | Mock tools; no pillar, no function |

### Routes that fit more than one

| Route | Pillars | Resolution |
| --- | --- | --- |
| `/services` | embedded-linux **and** web-product | Current copy claims full stack (Rails/Go/React/D3) *and* hardware/Linux/IoT. This is exactly why it collides with `/` on "engineering studio". Assign it to **embedded-linux** and let `/web-systems` own web-product; strip the full-stack web material from `/services` |
| `/` | all three | Root, exempt |

### The pillar problem, stated plainly

**monterey-bay-local has one asset**, and it is a 97-word case study about LaMill's own sister
business. There is no local service page, no geography in the site's copy outside that one entry,
no `LocalBusiness` markup, and no address anywhere in `lamill.toml` or the JSON-LD. This pillar
does not currently exist as a content surface. `[VERIFY]` — nothing in the repo establishes that
LaMill has a Monterey Bay service address or presence; that has to come from you before any
local-SEO page can be written honestly.

### Proposed hub-and-leaf tree

```
/                                          root hub — brand + entity, Organization JSON-LD
│                                          target: "engineering studio"
│
├── /services                              PILLAR HUB — embedded-linux
│   │                                      target: "embedded Linux engineering"
│   │                                      (rewrite: drop web/full-stack copy)
│   ├── /notes/yocto-vs-buildroot          leaf — "yocto vs buildroot"          [exists, KEEP]
│   ├── /services/hardware-bringup         leaf — "hardware bringup"            [new]
│   └── /services/board-support-package    leaf — BSP/U-Boot/kernel             [new]
│
├── /web-systems                           PILLAR HUB — web-product
│   │                                      target: "web systems engineering"
│   ├── /work                              index hub — portfolio listing        [exists, KEEP]
│   │   ├── /work/hybridautopart           case study                           [rewrite to 800w]
│   │   ├── /work/cottagefoodmap           case study                           [rewrite to 800w]
│   │   └── /work/isitholiday              case study                           [rewrite to 800w]
│   └── /notes/<web-systems articles>      leaves                               [new]
│
├── /monterey-bay                          PILLAR HUB — monterey-bay-local      [new, gated]
│   │                                      target: UNKNOWN — needs a real
│   │                                      service-area claim from the operator
│   └── /work/lamillrentals                case study                           [rewrite to 800w]
│
├── /notes                                 index hub — feeds all three pillars
│                                          noindex until ≥3 articles
└── /contact                               conversion leaf — noindex, nav only
```

Retired from the tree: `/content` (no pillar, 116 unique words, contains a "Stay tuned" stub),
`/aitools` + both tool leaves (mocks), and 24 of the 28 case-study URLs (data retained, cards
retained on `/work`, individual URLs noindexed).

Note that `/notes` sits outside the pillar hubs while feeding all of them — its articles are the
natural leaves for both `/services` and `/web-systems`. The tree above shows the yocto article
under `/services` by topic, not by URL; no URL move is proposed, since the article's canonical is
already correct and it is the one page with organic traction to protect.

---

## 4. Technical debt

Status as of 2026-08-02. Scope and detail columns describe the state measured on 2026-07-31.

| # | Status | Issue | Scope | Detail |
| --- | --- | --- | --- | --- |
| T-1 | ✓ **RESOLVED** `08d9cf4` | **No canonical tag** | 37 of 39 served routes | Only `/notes` and `/notes/yocto-vs-buildroot` emit `<link rel="canonical">`. The homepage has none. Confirmed on live prod, not just dev. **Now:** all 39 self-canonical via `pageSeo()` |
| T-2 | ✓ **RESOLVED** `08d9cf4` | **No `og:image`** | 38 of 39 served routes | Only `/` sets it. `public/og-image.png` exists and serves 200 (33,805 bytes, `image/png`) but is referenced by exactly one route. **Now:** sitewide fallback on all 39; per-entry override still honored |
| T-3 | ✓ **RESOLVED** `08d9cf4` | **No `og:url`** | 37 of 39 served routes | Only the two `/notes*` routes set it. **Now:** on all 39, always equal to that route's canonical |
| T-4 | ✓ **RESOLVED** `08d9cf4` | **`twitter:card` is `summary`** | 37 of 39 served routes | Only `/` was upgraded to `summary_large_image`. **Now:** `summary_large_image` on all 39 |
| T-5 | open | **Titles under 30 chars** | 30 of 39 served routes | Includes `/work` (13), `/notes` (14), `/contact` (16), `/content` (16), `/services` (17), `/aitools` (17), and all 28 `/work/$slug` (21–33). Wasted SERP real estate |
| T-6 | open | **Title over 60 chars** | 1 route | `/notes/yocto-vs-buildroot` at 68 chars — will truncate. Note this is the one page worth optimizing |
| T-7 | open | **Meta description under 70 chars** | 3 routes | `/aitools/image-analyzer` (36), `/aitools/text-generator` (40), `/work/meetwhen` (65) |
| T-8 | open | **Meta description over 160 chars** | 2 routes | `/work/lamillrentals` (193), `/notes/yocto-vs-buildroot` (178) — both will truncate |
| T-9 | open | **Body duplicates meta description** | 26 of 28 case studies | The rendered `<main>` body paragraph is verbatim the `description` meta. The page has no content the SERP snippet doesn't already show |
| T-10 | open — **outside the repo** | **`www` → apex redirect is 307, not 308** | site-wide | `https://www.lamill.io/` returns **307 Temporary**. A permanent redirect (301/308) is the correct signal for a locked canonical host. Single hop, no chain. Fixing it is a Vercel dashboard domain setting, not a repo change |
| T-11 | ✓ **RESOLVED** 2026-08-02 | **`AI_AGENTS.md` documents draft behavior incorrectly** | docs | Claims draft work slugs render by direct URL; they 404. Introduced in `53b037b`. Related: the stale comment at `src/lib/content.ts:29`. **Now:** both corrected, and both name the `includeDrafts` mechanism |
| T-12 | ✓ **RESOLVED** 2026-08-02 | **`docs/growth.md` link claim is wrong** | docs | Says the yocto article is "linked from the footer"; the footer links `/notes`, not the article. **Now:** corrected by an appended dated note inside the 2026-07-15 entry — that file's own rule is append-only, so the original text stands |
| T-13 | open | **Hand-maintained sitemap** | infra | `public/sitemap.xml` is manual. It happens to be correct today, but nothing enforces it. `docs/architecture.md` already tracks this |
| T-14 | open | **Contact form has no backend** | `/contact` | Submissions set local component state only. See the copy claim in §Unverifiable claims |
| T-15 | n/a — clean | **Missing `h1`** | 0 routes | Clean — every served route has exactly one `<h1>` |
| T-16 | n/a — clean | **Structured-data errors** | 0 errors | Both JSON-LD blocks parse as valid JSON and use recognized schema.org types. See below. Re-verified on built output 2026-08-01 after the T-1..T-4 work: still 2 blocks, still valid, still unleaked |

### Checks that came back clean

- **Routes served but absent from `sitemap.xml`:** none.
- **Routes in `sitemap.xml` but not served:** none. All 39 `<loc>` entries resolve 200.
- **Redirect chains:** none. Every redirect tested is a single hop —
  `http://lamill.io/` → 308 → `https://lamill.io/` (200);
  `https://www.lamill.io/` → 307 → `https://lamill.io/` (200);
  `https://lamill.io/services/` → 307 → `/services` (200).
- **Structured data:** 2 blocks, both valid.
  - `/` → `ProfessionalService`. `name`, `url`, `email`, `slogan`, `description`, `logo`,
    `knowsAbout` all populated. `sameAs` has one real entry (`https://github.com/codervijo`) —
    `docs/prd.md` still lists this as an open TODO, so **the PRD is out of date**, though the
    single-entry `sameAs` remains thin.
  - `/notes/yocto-vs-buildroot` → `TechArticle` with Organization author/publisher,
    `datePublished`/`dateModified`, and `mainEntityOfPage`. Correct.
  - No JSON-LD leaked onto any other route — the v3.A verification requirement holds.
- **`rel="nofollow"`:** not present anywhere. All internal links are dofollow.
- **`robots.txt`:** `Allow: /` with the sitemap declared at the apex. Correct.

---

## 5. Contradiction check — trailing slash and www vs apex

**No contradictions found among the signals that exist.** The failure here is absence, not
disagreement.

| Signal | Form used | Verdict |
| --- | --- | --- |
| Internal links (`<Link to=…>`) | Root-relative, no trailing slash: `/services`, `/work/boxchive`. Root is `/` | Consistent across all **652** internal link instances (39 distinct targets). Zero absolute-URL forms, zero non-root trailing slashes |
| `sitemap.xml` `<loc>` | Absolute apex, no trailing slash: `https://lamill.io/services`. Root is `https://lamill.io/` | Consistent |
| `<link rel="canonical">` | Absolute apex, no trailing slash: `https://lamill.io/notes` | Consistent — **but present on only 2 of 39 routes** *(resolved `08d9cf4`: all 39, same form)* |
| `og:url` | Absolute apex, no trailing slash | Consistent — **but present on only 2 of 39 routes** *(resolved `08d9cf4`: all 39, always == canonical)* |
| JSON-LD `url` / `author.url` / `publisher.url` | `https://lamill.io/` **with** trailing slash | Root form, matches the sitemap's root entry |
| JSON-LD `mainEntityOfPage.@id` | `https://lamill.io/notes/yocto-vs-buildroot`, no trailing slash | Consistent |
| Server behavior | `/services/` 307-redirects to `/services` | Enforces the no-slash form |

Every signal that is emitted agrees: **apex host, no trailing slash, except the site root which is
`https://lamill.io/`**. The JSON-LD's trailing-slash root and the sitemap's trailing-slash root
match each other, and the redirect layer enforces the same convention the internal links use.

The one form-level observation worth recording: JSON-LD uses `https://lamill.io/` for the
organization `url` while an internal link to home is `/`. These resolve identically and the
sitemap uses the same trailing-slash root, so this is consistent, not a contradiction.

**The real risk is T-1.** With canonical absent on 37 routes, Google picks a canonical itself. The
signals that would guide that choice — `og:url`, canonical — are also missing on those same routes,
so the only guidance available is the sitemap and the redirect behavior. Those are both correct
today, which is why nothing is currently broken; but the site has no explicit defense if a
parameterized or slashed variant ever gets crawled or linked externally.

> **Closed 2026-08-02 (`08d9cf4`).** Every served route now emits its own canonical and a matching
> `og:url`. The form is unchanged from what this section measured — apex host, no trailing slash,
> root as `https://lamill.io/` — because that was already the form the sitemap, all 652 internal
> hrefs, and the server's 307 agreed on. `src/lib/seo.ts` is now the single place that decides it,
> and `SITE_ORIGIN` has one definition instead of two. Verified on built output: 39 canonicals, 39
> sitemap `<loc>` entries, exact string match both directions. The parameterized/slashed-variant
> exposure described above is closed.

---

## Unverifiable claims in page copy — `[VERIFY]`

Claims that cannot be substantiated from anything in this repo. None of these is necessarily
false; they are simply unverifiable here, and several are load-bearing for credibility.

| Route | Claim | Status |
| --- | --- | --- |
| `/contact` | "We respond within one business day" / "// Response ≤ 1 business day" | **Contradicted by the code.** The form has no backend — submissions set local state and are never delivered. Nobody can respond to a message that was never sent |
| `/` | "12+ Years shipping", "40+ Projects delivered", "6 Domains covered", "100% Senior engineers" | Operator-confirmed in `docs/prd.md` (v3.C, 2026-06-29), so these have repo provenance. Note "40+ projects" against 31 case-study entries — reconcilable if unlisted work exists, but the site shows 28. ✓ **RESOLVED 2026-08-03:** operator revised to **"20+ Projects delivered"**; the other three stand as confirmed |
| `/` | "Available for engagements — Q3 2026" | Accurate as of this audit (Q3 2026 = Jul–Sep). **Expires 2026-09-30** and will read as stale after. ✓ **RESOLVED 2026-08-03:** changed to "Available for engagements — now", which has no expiry |
| `/contact` | "Distributed — US + EU coverage" | `[VERIFY]` — no team or location data in the repo |
| `/content` | Handles `@lamill_content`, `@lamill_pics`, `@lamill_studio`, `@lamill_design` | `[VERIFY]` — presented as live accounts; existence not establishable from the repo. Not in JSON-LD `sameAs` |
| `/content` | "We're currently working on several open source and proprietary content systems. Stay tuned." | Placeholder copy shipped to production on an indexable page |
| `/services` | Rails / Go / Python / React / D3 / BSP / U-Boot / BLE firmware capability list | `[VERIFY]` — capability claims with no supporting evidence in the repo; the portfolio is Astro, React+Vite, TanStack, and WordPress |
| `/web-systems` | "Next.js / Astro / TanStack Start", "Postgres, Redis, queues", "Auth, billing, observability", "React Native / Expo", "Offline-first sync", "App Store + Play release" | `[VERIFY]` — no mobile app, no Next.js project, and no billing/observability work appears anywhere in `src/content/work/*` |
| `/aitools` | "Text Generator — Generate creative text content using AI", "Try now →", "Image Analyzer — Analyze and describe images with AI" | **Describes functionality that does not exist.** Both tools are `setTimeout` mocks. "Coming soon" is at least labeled; these two are not |

---

## Suggested order of work

Ordered by impact per unit of effort, as proposed on 2026-07-31. Items 4 and 9 have since shipped;
the rest are open.

1. **Noindex the thin set** — 34 routes: all 28 `/work/$slug` leaves plus `/content`, `/notes`,
   `/contact`, `/aitools`, and the two mock tool leaves. (4 of the 28 come back out of noindex once
   they are rewritten as real case studies per §1.) Largest single quality-signal improvement.
2. **Fix the `/aitools` copy or pull the pages** — describing mock tools as working functionality is
   the most direct credibility risk on the site.
3. **Fix the `/contact` response promise or wire the form.** Currently the site promises a reply to
   messages it discards.
4. ✓ **DONE (`08d9cf4`)** — **Add canonical + `og:url` + `og:image`** as route-derived defaults.
   Shipped as `src/lib/seo.ts` + a `pageSeo()` call in each route's `head()` rather than in
   `__root.tsx`, because `head()` in the root layout cannot see the current path. 39 routes fixed;
   T-1 exposure closed.
5. **Rewrite `/services`** to own embedded Linux and stop colliding with `/` on "engineering studio".
6. **Write case study #1** — `hybridautopart`, to 800–1,200 words with a real measured outcome.
7. **Publish note #2** — `/notes` is the only proven surface on this site, and it has one article.
8. Change the `www` redirect from 307 to 308. **Blocked in-repo** — Vercel dashboard domain setting.
9. ✓ **DONE (2026-08-02)** — Correct T-11 and T-12 (the two inaccurate doc claims).

---

*Generated from rendered HTML of all 42 routes at commit `5462d44`, 2026-07-31.
`UNKNOWN` appears where a value could not be determined; `[VERIFY]` marks claims requiring
operator confirmation. No numbers in this report were estimated — every count is measured from
the served HTML, `public/sitemap.xml`, or `src/content/`.*

*Status annotations added 2026-08-02. Measurements are never restated to match the current site —
a resolved finding keeps its original numbers and gains a status marker, so this file stays
readable as a record of 2026-07-31. Re-run the audit to get current numbers.*
