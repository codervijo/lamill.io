# Architecture — lamill.io

Structural map of the site: what pages exist, what role each plays, and how
content clusters hang together. This is the **content plan of record** — when a
page is added, moved, or promoted from leaf to hub, update the inventory below.

For *how* to author a page, see `docs/content-authoring.md`. For stack/build
mechanics, see `AI_AGENTS.md`. For phase tracking, see `docs/prd.md`.

## Content plan / site map

### Hubs vs. leaves

Two kinds of page:

- **Hub** — an entity/aggregation page that anchors a content cluster: it carries
  its own indexable prose *and* links out to related leaves or sibling hubs.
  Search/LLM entity recognition keys off these. The **homepage is the root hub**
  (docs call it "the site's hub/entity page"); each top-level section is a
  **content hub** for its practice.
- **Leaf** — a single-purpose page that lives under a hub: a case study, a tool,
  the contact form. Leaves link *up* to their hub, not sideways.

### Page inventory

| Page | Route | Kind | Content role | Links to |
| --- | --- | --- | --- | --- |
| Home | `/` | **Root hub** | Brand + "three practices" + hero stats; Organization JSON-LD (`ProfessionalService`) | all section hubs, `/work`, `/contact` |
| Services | `/services` | **Content hub** | The build/deploy/advance offering | `/contact`, `/work` |
| Web Systems | `/web-systems` | **Content hub** | Web-systems practice | `/work`, `/contact` |
| Content | `/content` | **Content hub** | Content-production practice | `/work`, `/contact` |
| Work | `/work` | **Content hub (index)** | Portfolio listing of published entries | 31 work leaves |
| AI Tools | `/aitools` | **Content hub (index)** | Sub-app landing | 2 tool leaves |
| Contact | `/contact` | Leaf (conversion) | Local-state inquiry form (no backend yet) | — |
| Work case study | `/work/$slug` | Leaf ×31 | One typed case-study per file in `src/content/work/*.ts` | `/work` |
| Text Generator | `/aitools/text-generator` | Leaf (mock) | Placeholder tool — not wired to an LLM | `/aitools` |
| Image Analyzer | `/aitools/image-analyzer` | Leaf (mock) | Placeholder tool — not wired to vision | `/aitools` |

**Counts:** 1 root hub · 5 content hubs (`/services`, `/web-systems`, `/content`,
`/work`, `/aitools`) · 34 leaves (31 work case studies + contact + 2 AI tools).
Work-leaf count = `src/content/work/*.ts` — the current authority; keep this line
in sync when entries land.

### Content hubs — what each should hold and link

Every content hub should carry enough standalone prose to be indexable on its own
(not just a list of links), then link down to its leaves and across to sibling
hubs. Target shape per hub:

- **`/services`, `/web-systems`, `/content`** — the three practice hubs. Each
  states the practice in declarative prose, then links to relevant `/work`
  case studies as proof and to `/contact` as the CTA. These should eventually
  cross-link to each other (a practice mentions the adjacent practice).
- **`/work`** — portfolio index. Aggregates every `status: "published"` entry;
  drafts and the leaf-only fields stay out of the listing. This is the hub the
  practice pages point at for proof.
- **`/aitools`** — sub-app hub. Currently fronts two mock tool leaves.
- **`/` (root)** — links to all of the above and is the only page carrying
  Organization markup; child hubs get their own appropriate `@type` when added
  (don't hoist org markup up to `__root.tsx`).

### Gaps / planned content

Content the plan implies but that isn't shipped yet — pull into `docs/prd.md`
when scheduled, don't treat as done:

- **Hub prose depth.** The three practice hubs and `/work` need the indexable,
  standalone prose described above; today they lean list-first.
- **Cross-hub linking.** Practice hubs → `/work` proof links and practice ↔
  practice cross-links are not systematically in place.
- **Per-hub structured data.** Only `/` has JSON-LD. Content hubs should get their
  own appropriate `@type` (e.g. `Service`/`CollectionPage`) — tracked, not built.
- **Contact as a true endpoint.** `/contact` posts to local state only; it's a
  leaf conversion page with no backend/email delivery yet.
- **Generated sitemap.** `public/sitemap.xml` is hand-maintained; a generated map
  driven by `getAllWork()` + the route list would keep hub/leaf coverage honest.
