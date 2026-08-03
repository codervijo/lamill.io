# Growth Log — lamill.io

> **What this file is for:** an honest, append-only log of growth experiments
> on this site — what was tried, what was measured, what happened. The data
> source is GSC; this file narrates *why*. Future-you (or future-Claude)
> reads this when deciding what to try next, both on this site and on
> related sister sites.

## How to use this (workflow — re-read this when you forget)

**Add an entry whenever you do something growth-relevant.** That includes:
shipping new content, structural SEO changes (sitemap, schema, redirects,
internal linking), tech changes that affect crawl/indexing, marketing
pushes, backlink campaigns. *Not* every code commit — just things you'd
want to point at when GSC numbers move (or fail to).

**Each entry is a hypothesis you can be wrong about.** Commit to a
measurable KPI and an observation window before acting — otherwise "did
this work?" is just a feeling.

### Lifecycle of one entry

1. **Day of action** — append a new dated H2 with `Status: active`, the
   hypothesis, the KPI you'll watch, current baseline numbers, what you
   did, and the date to review (default: today + 28 days, matching GSC's
   reporting window).
2. **Review day** — pull current GSC numbers, compute delta vs baseline.
   Fill in **Result** and **Learning**. Set **Status** to `shipped` (worked,
   keep going), `failed` (didn't pay off, abandon), or extend the review
   another window if results are ambiguous.
3. **Never rewrite older entries.** Wrong hypotheses are the most valuable
   data — they tell you what NOT to repeat on the next site. Append, don't
   edit.

### Where to get the numbers

```bash
cd ~/work/projects/sites/portfolio && make run ARGS="gsc sync"
```

Then read the row for `lamill.io`. Or pull from
https://search.google.com/search-console directly.

### Format

```
## YYYY-MM-DD — <one-line hypothesis or action>
- **Status:** active | testing | shipped | failed | abandoned
- **KPI:** <what GSC metric / query / page>
- **Baseline:** <numbers at start>
- **Action:** <what was done; 1-2 lines>
- **Result:** <numbers after window; "TBD — review YYYY-MM-DD" until then>
- **Learning:** <why it worked / didn't; what to try next; "TBD" until reviewed>
```

---

## 2026-05-09 — site scaffolded; growth log started
- **Status:** active
- **KPI:** any GSC traffic — clicks, impressions, indexed-page count
- **Baseline:** 0 clicks / 0 impressions (just deployed)
- **Action:** project scaffolded via `portfolio new bootstrap`; first deploy
  pending. After deploy: verify in GSC as `sc-domain:lamill.io` and submit
  the sitemap.
- **Result:** TBD — review 2026-06-06
- **Learning:** TBD

## 2026-07-15 — flagship "Yocto vs Buildroot" article live at /notes/
- **Status:** active
- **KPI:** GSC impressions / clicks / avg position for "yocto vs buildroot" and
  "buildroot vs yocto"; indexation of `/notes/yocto-vs-buildroot` and `/notes`
- **Baseline:** 0 impressions / 0 clicks (published today, not yet indexed)
- **Action:** Launched a new `/notes` namespace (LaMill's own technical writing,
  distinct from the `/content` service) and published a ~2,000-word TechArticle at
  `/notes/yocto-vs-buildroot` targeting "yocto vs buildroot" (Ahrefs KD 0, SV 200)
  and "buildroot vs yocto" (KD 0, SV 150) — one page, both terms. Expert-depth
  comparison with a situation-keyed decision table and side-by-side BR2_EXTERNAL vs
  `.bbappend` config; TechArticle JSON-LD (Org author/publisher), self-canonical
  (apex), answer-first question H2s + an extractable answer paragraph for featured
  snippets. In sitemap.xml; linked from the footer (within 2 clicks of home).
- **Correction (2026-08-02):** the Action above overstates the internal linking.
  The footer links `/notes`, **not** `/notes/yocto-vs-buildroot`. The article has
  exactly one internal inbound link — from the `/notes` index — so "within 2 clicks
  of home" holds, but "linked from the footer" does not. Appended rather than
  edited, per this file's append-only rule. Source: `seo-audit.md` §2.
- **Result:** TBD — review 2026-08-12
- **Learning:** TBD
