# CLAUDE.md — lamill.io

Per-project orientation for Claude. Read this first when picking up
work on this site. Index of conventions, deferred decisions, and
non-features that aren't obvious from the code or git history.

## Project

Marketing / landing site for **LaMill**, an engineering studio (full stack,
Linux, hardware, IoT, web systems), plus a small "AI Tools" sub-app at
`/aitools`. **Stack: TanStack Start (SSR) + React 19 + TypeScript + Tailwind v4
+ shadcn/ui, on Vite with nitro; pnpm; deployed to Vercel.** Runs on the
sites/* shared infra with the Makefile forwarding to the central builder. Live
at https://lamill.io.

The current design was generated in Lovable and absorbed into this repo on
2026-06-28, replacing the prior React 18 + Vite + React Router SPA. The Lovable
git sync is severed; this repo is canonical. Full agent context in `AI_AGENTS.md`.

## Commands

```bash
# Build / dev (forwards to the parent Makefile)
make deps                    # install deps via the central builder
make run proj=lamill.io      # pnpm install + pnpm dev (vite dev → TanStack Start)
make test proj=lamill.io     # pnpm install + pnpm build

# Deploy
git push            # Vercel auto-builds on push to main → lamill.io
```

## Conventions

  - Build path: this project's `Makefile` → `../Makefile` (parent
    workspace) → `~/work/projects/builder/` (central builder).
  - Stack: pnpm-only. No `package-lock.json` / `bun.lock` / `yarn.lock`.
  - `pnpm-workspace.yaml` in this dir makes lamill.io its own pnpm workspace
    root (else `pnpm install` defers to `sites/` and no-ops here). Native
    install scripts (esbuild, `@tailwindcss/oxide`) are allow-listed there.
  - Deploy: Vercel (SSR via nitro Build Output API, `NITRO_PRESET=vercel`).
    No `wrangler.jsonc` / Cloudflare — that earlier experiment is gone.
  - Routing: file-based under `src/routes/`; `routeTree.gen.ts` is generated,
    don't hand-edit. `__root.tsx` is the only root layout.

## Heading hygiene

**Before adding any section, subsection, or heading to a Markdown
file, output the file's current heading outline first:**

```bash
grep -nE '^#+ ' path/to/file.md
```

Then confirm — in the chat — that the planned new heading's:

1. **Depth** (`#`, `##`, `###`, …) is the intended depth, not
   accidentally one level too shallow.
2. **Label** doesn't collide with existing headings — no duplicate
   `## 1. <title>`, no `### N.X` subsection labels that look like
   `vN.X` phase identifiers.

Only after that confirmation, write.

Applies especially to long-lived docs: `docs/prd.md`, `AI_AGENTS.md`,
`docs/architecture.md`, `docs/CLAUDE.md`.

**Why:** structural drift is invisible in any single editing session
— it only becomes obvious in the aggregate, by which time the doc is
hard to fix. The pre-edit outline ritual catches collisions and depth
mistakes at the point of writing, not at quarterly cleanup time.

## Deferred decisions

<Things deliberately *not* shipped. Append entries with rationale so
future Claude sessions don't re-propose them.>
