---
name: AI Agent Context — lamill.io
description: Stack, structure, and build/run workflow for the lamill.io marketing site
---

# AI Agent Context — lamill.io

## What this project is
Marketing / landing site for LaMill (a software services brand) plus a small "AI Tools" sub-app (Text Generator, Image Analyzer placeholders) under `/aitools`.

## Stack
- React 18 + Vite 6 (ESM, `"type": "module"`) — Vite ≥6 is required for Cloudflare Pages auto-config
- React Router v7 (`react-router-dom`)
- Animation / scroll: `framer-motion`, `react-awesome-reveal`, `react-waypoint`
- Icons: `react-icons` (used in Header) and legacy `ion-*` font-icon classes (NOT currently wired up — see Known issues)
- Package manager: `pnpm` (lockfile: `pnpm-lock.yaml`)
- Lint config exists (`eslint.config.js`) but ESLint and its plugins are NOT in `package.json`.

## Project structure
- `index.html` — Vite entry, loads `/src/main.jsx`
- `src/main.jsx` — real entry, mounts `<App />` into `#root`
- `src/App.jsx` — `<Router>` with routes `/`, `/about`, `/aitools`, `/aitools/text-generator`, `/aitools/image-analyzer`
- `src/components/` — section components for the home page (`Header`, `Footer`, `ServicesSection`, `PicturesSection`, `ContentSection`, `SoftwareSection`, `TestimonialsSection`, `FormSection`, `SectionList`) plus vendor CSS/JS in `vendors/` and images in `img/`
- `src/pages/` — `Home.jsx` (composes `SectionList`), `About.jsx`, and `aitools/` (sub-app)
- `src/pages/aitools/tools/` — `TextGenerator.jsx`, `ImageAnalyzer.jsx` (both currently mock with `setTimeout`)
- `public/` — `lamill.svg`, `vite.svg`
- `docs/` — `prd.md`, `Prompts.md`

Stale CRA-era files still present (unused by Vite entry but should be removed):
- `src/index.js` (uses deprecated `ReactDOM.render`, mounts to `#react-root` which doesn't exist)
- `src/components/App.js` (class component referencing `Header.js` / `Footer.js` / `SectionList.js` that don't exist)
- `src/components/index.js` (duplicate of `src/index.js`)

## How to run
Builds and dev runs go through the **parent Makefile** at `../Makefile` (i.e. `sites/Makefile`), which expects to run inside the project's Docker dev container. From `sites/`:

```sh
make buildsh                 # enter docker dev container
make run proj=lamill.io      # cd into lamill.io, pnpm install, pnpm dev (Vite)
make test proj=lamill.io     # pnpm install + pnpm build + pnpm test (must be inside docker)
```

Direct (host) equivalents are `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm preview` per `package.json`, but the project-standard path is the parent Makefile.

There is no `pnpm test` script defined; `make test` will fall through `|| true`.

## Key conventions
- Mixed component styles: `Header`, `Footer`, and most home-page sections are React class components; the AI-tools pages and `TestimonialsSection` are functional components with hooks. New code should be functional components.
- Routing: in `App.jsx`, the global `<Header>` and `<Footer>` are hidden on any `/aitools*` route — AI-tools pages render their own chrome.
- Images for home-page sections live in `src/components/img/` and are imported as ES modules so Vite fingerprints them.
- Section anchor links use plain `<a href="#services">` etc. inside the home page; cross-route navigation uses `<Link>`.

## Known issues to be aware of (see plan in chat for full list)
- `TestimonialsSection.jsx` uses dynamic `import("./img/customer-N.jpg")` as `imageSrc`, which passes a Promise to `<img src>`. Should be top-level static `import`.
- Ionicons font (`<i class="ion-*">` in Footer, ServicesSection, ContentSection) is never loaded — `vendors/css/ionicons.min.css` exists but is not imported. Icons render blank.
- `vendors/css/normalize.css`, `animate.css`, and the `jquery.waypoints.min.js` vendor file are unused — Waypoint comes from the React `react-waypoint` package.
- Stale CRA files listed under "Project structure" can be deleted.
- `eslint.config.js` references plugins that aren't installed — `pnpm lint` would fail (and there's no `lint` script).
- Footer links are all `href="#"` placeholders.
- AI Tools pages are pure mocks (`setTimeout`) — no real LLM/vision integration.

## Out of scope / don't touch
- <leave blank for user to fill>
