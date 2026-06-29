# PRD — lamill.io

Live: https://lamill.io · Stack: TanStack Start (SSR) + React 19 + TS +
Tailwind v4 + shadcn/ui · Deploy: Vercel. See `AI_AGENTS.md` for full context.

## Phase 1 — v1 site (shipped 2026-06-28)
- [x] Lovable-designed marketing site absorbed into the repo (replaces the old
      React 18 + Vite + React Router SPA); Lovable git sync severed
- [x] Pages: Home `/`, Services, Web Systems, Content, Contact
- [x] `/aitools` sub-app ported onto TanStack (landing + Text Generator +
      Image Analyzer — still `setTimeout` mocks)
- [x] Vercel SSR deploy configured (`NITRO_PRESET=vercel`)

## Phase 2 — follow-ups (open)
- [ ] Verify the SSR-on-Vercel deploy against a live build (not yet validated)
- [ ] Wire `/aitools` Text Generator + Image Analyzer to real Claude calls
- [ ] Wire the contact form to a real backend / email delivery
- [ ] (Optional) De-Lovable-ify: replace `@lovable.dev/vite-tanstack-config`
      with a plain TanStack Start Vite config; drop the Lovable error reporter

## Problem

LaMill needs a credible, modern marketing presence that signals senior
engineering depth (full stack, Linux, hardware, IoT, web systems) and converts
visitors into project inquiries.

## Users

Founders and engineering leaders at startups/scaleups evaluating an outside
engineering studio for build/deploy/advance work. They care about proof of
senior depth and a low-friction way to start a project (the contact flow).
