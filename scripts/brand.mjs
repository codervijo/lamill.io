// Deterministic brand-asset generator for lamill.io.
//
// Source artwork: the geometric L symbol from the operator-supplied
// `lamill-astro-brand.zip` (2026-10-17) — its two paths are copied verbatim
// below. What this script changes, per PRD v5.A:
//   - the wordmark reads "LaMill" (the zip says "Lamill") and is set in Inter
//     700 rendered to outlines by satori, so it never depends on the viewer's
//     fonts (the zip used live Arial <text>);
//   - a dark-background variant recolors the navy L-foot, which otherwise
//     vanishes on the site's near-black background.
//
// Writes into public/:
//   brand/symbol.svg, brand/symbol-dark.svg     — the L mark alone
//   brand/logo.svg, brand/logo-dark.svg         — symbol + wordmark lockup
//   brand/logo.png                              — raster lockup (light bg)
//   favicon.svg (adapts to light/dark tab UI), favicon.ico (16/32/48),
//   apple-touch-icon.png (180), brand/icon-192.png, brand/icon-512.png
//   lamill.svg — same lockup at the long-standing JSON-LD logo URL
//
// Regenerate with:  pnpm run brand

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUB = path.join(ROOT, "public");
const BRAND = path.join(PUB, "brand");
fs.mkdirSync(BRAND, { recursive: true });

export const BRAND_COLORS = {
  blue: "#1678F9", // L upright (zip)
  navy: "#102239", // L foot on light backgrounds (zip)
  footOnDark: "#E8EEF7", // L foot on dark backgrounds (recolor, v5.A)
};

// The symbol's two paths, verbatim from the zip. Their extent is x 13–103,
// y 0–99; SYMBOL_VIEWBOX centers that in a square with a little air.
const UPRIGHT = "M13 53 L13 21 Q13 16 18 13 L49 0 L49 53 Q49 58 45 62 L13 82 Z";
const FOOT =
  "M18 88 L54 57 Q58 54 63 54 L92 54 Q99 54 103 60 L64 96 Q61 99 55 99 L22 99 Q15 99 18 88 Z";
const SYMBOL_VIEWBOX = "6 -4 104 104";

const symbolPaths = (foot) =>
  `<path fill="${BRAND_COLORS.blue}" d="${UPRIGHT}"/><path fill="${foot}" d="${FOOT}"/>`;

export function symbolSvg(variant = "light") {
  const foot = variant === "dark" ? BRAND_COLORS.footOnDark : BRAND_COLORS.navy;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${SYMBOL_VIEWBOX}" role="img" aria-label="LaMill">${symbolPaths(foot)}</svg>`;
}

function loadFont(pkg, weight) {
  const dir = path.join(ROOT, "node_modules", pkg, "files");
  const pick = fs
    .readdirSync(dir)
    .find((f) => f.includes(`-latin-${weight}-normal.woff`) && f.endsWith(".woff"));
  if (!pick) throw new Error(`No latin ${weight} .woff in ${pkg}/files (satori cannot read woff2)`);
  return fs.readFileSync(path.join(dir, pick));
}

// Wordmark as outlined paths: satori lays the text out, resvg measures it.
async function wordmark(color) {
  const fontSize = 100;
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          fontFamily: "Inter",
          fontWeight: 700,
          fontSize,
          letterSpacing: "-0.04em",
          color,
          lineHeight: 1,
        },
        children: "LaMill",
      },
    },
    {
      width: 1000,
      height: 140,
      fonts: [
        { name: "Inter", data: loadFont("@fontsource/inter", 700), weight: 700, style: "normal" },
      ],
    },
  );
  const bbox = new Resvg(svg).getBBox();
  const inner = svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  return { inner, bbox };
}

// Lockup: symbol at the cap height of the wordmark, fixed gap, tight viewBox.
async function lockupSvg(variant) {
  const ink = variant === "dark" ? "#F1F3EB" : BRAND_COLORS.navy;
  const foot = variant === "dark" ? BRAND_COLORS.footOnDark : BRAND_COLORS.navy;
  const { inner, bbox } = await wordmark(ink);
  const h = bbox.height; // cap/ascender height of "LaMill"
  const symScale = (h * 1.15) / 104; // symbol slightly taller than the caps
  const symW = 104 * symScale;
  const gap = h * 0.28;
  const symY = bbox.y + h - 104 * symScale; // bottoms aligned to the baseline
  const width = symW + gap + bbox.width;
  const top = Math.min(symY, bbox.y);
  const height = Math.max(symY + 104 * symScale, bbox.y + h) - top;
  const f = (n) => Number(n.toFixed(2));
  const body =
    `<g transform="translate(0 ${f(symY - top)}) scale(${f(symScale)}) translate(-6 4)">${symbolPaths(foot)}</g>` +
    `<g transform="translate(${f(symW + gap - bbox.x)} ${f(-top)})">${inner}</g>`;
  const draft = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(width)} ${f(height)}">${body}</svg>`;
  // Crop to the ink actually drawn, plus even padding on every side.
  const drawn = new Resvg(draft).getBBox();
  const pad = drawn.height * 0.04;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${f(drawn.x - pad)} ${f(drawn.y - pad)} ${f(drawn.width + 2 * pad)} ${f(drawn.height + 2 * pad)}" role="img" aria-label="LaMill">` +
    body +
    `</svg>`
  );
}

const png = (svg, width) =>
  new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng();

// App icons: symbol on a rounded white tile (the zip's app-icon treatment).
function tileSvg(size, rounded = true) {
  const pad = size * 0.16;
  const s = (size - pad * 2) / 104;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
    `<rect width="${size}" height="${size}" rx="${rounded ? size * 0.215 : 0}" fill="#ffffff"/>` +
    `<g transform="translate(${pad} ${pad}) scale(${s}) translate(-6 4)">${symbolPaths(BRAND_COLORS.navy)}</g></svg>`
  );
}

// ICO container holding PNG images (supported by every current browser).
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = 6 + 16 * pngs.length;
  const dir = pngs.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });
  return Buffer.concat([header, ...dir, ...pngs.map((p) => p.data)]);
}

// Favicon: navy foot in light browser UI, light foot in dark browser UI.
const faviconSvg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${SYMBOL_VIEWBOX}">` +
  `<style>.f{fill:${BRAND_COLORS.navy}}@media (prefers-color-scheme:dark){.f{fill:${BRAND_COLORS.footOnDark}}}</style>` +
  `<path fill="${BRAND_COLORS.blue}" d="${UPRIGHT}"/><path class="f" d="${FOOT}"/></svg>`;

const write = (rel, data) => {
  fs.writeFileSync(path.join(PUB, rel), data);
  console.log(`✓ public/${rel}`);
};

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const logoLight = await lockupSvg("light");
  const logoDark = await lockupSvg("dark");
  write("brand/symbol.svg", symbolSvg("light"));
  write("brand/symbol-dark.svg", symbolSvg("dark"));
  write("brand/logo.svg", logoLight);
  write("brand/logo-dark.svg", logoDark);
  write("brand/logo.png", png(logoLight, 1200));
  write("lamill.svg", logoLight);
  write("favicon.svg", faviconSvg);
  write(
    "favicon.ico",
    ico([16, 32, 48].map((size) => ({ size, data: png(symbolSvg("light"), size) }))),
  );
  write("apple-touch-icon.png", png(tileSvg(180, false), 180));
  write("brand/icon-192.png", png(tileSvg(192), 192));
  write("brand/icon-512.png", png(tileSvg(512), 512));
}
