// Deterministic OG image generator for lamill.io.
//
// Renders public/og-image.png (1200x630) from typographic HTML/CSS via
// satori (HTML/CSS -> SVG) + @resvg/resvg-js (SVG -> PNG). No AI image
// generation, no network calls — fonts are loaded from local @fontsource
// packages, colors are the site's own theme tokens.
//
// Regenerate with:  npm run og   (or: node scripts/og.mjs)
//
// Brand values are NOT guessed — they are the site's actual tokens:
//   - Colors: converted from the oklch :root values in src/styles.css.
//   - Fonts:  JetBrains Mono (the header wordmark) + Inter (the hero tagline).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "og-image.png");

const WIDTH = 1200;
const HEIGHT = 630;

// Site theme tokens — converted from oklch(...) in src/styles.css :root.
const C = {
  bg: "#07090b", //  --background      oklch(0.14 0.005 240)
  fg: "#f1f3eb", //  --foreground      oklch(0.96 0.01 120)
  green: "#6af05f", // --primary       oklch(0.85 0.22 142)
  muted: "#7c898a", // --muted-foreground oklch(0.62 0.015 200)
  border: "#232a2b", // --border        oklch(0.28 0.01 200)
};

// Resolve a static @fontsource weight file. satori accepts ttf/otf/woff
// (NOT woff2), so prefer the legacy .woff a fontsource package ships.
function loadFont(pkg, weight) {
  const dir = path.join(ROOT, "node_modules", pkg, "files");
  const files = fs.readdirSync(dir);
  const pick =
    files.find((f) => f.includes(`-latin-${weight}-normal.woff`) && f.endsWith(".woff")) ??
    files.find((f) => f.includes(`-${weight}-normal.woff`) && f.endsWith(".woff"));
  if (!pick) {
    throw new Error(
      `No .woff for weight ${weight} in ${pkg}/files (satori cannot read woff2). ` +
        `Available: ${files.filter((f) => f.endsWith(".woff")).join(", ") || "(none)"}`,
    );
  }
  return fs.readFileSync(path.join(dir, pick));
}

const fonts = [
  { name: "Inter", data: loadFont("@fontsource/inter", 700), weight: 700, style: "normal" },
  { name: "JetBrains Mono", data: loadFont("@fontsource/jetbrains-mono", 700), weight: 700, style: "normal" },
  { name: "JetBrains Mono", data: loadFont("@fontsource/jetbrains-mono", 500), weight: 500, style: "normal" },
];

// Tiny hyperscript so we can build satori's element tree without JSX tooling.
const h = (type, style, ...children) => ({
  type,
  props: { style, children: children.length <= 1 ? children[0] : children },
});

const tagline = (text, color) =>
  h(
    "div",
    {
      display: "flex",
      fontFamily: "Inter",
      fontWeight: 700,
      fontSize: 96,
      lineHeight: 1.0,
      letterSpacing: "-0.03em",
      color,
    },
    text,
  );

const tree = h(
  "div",
  {
    width: WIDTH,
    height: HEIGHT,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: C.bg,
    padding: "64px 80px",
    fontFamily: "Inter",
  },
  // Wordmark lockup — mirrors the site header: green dot + LAMILL + green ".io"
  h(
    "div",
    { display: "flex", alignItems: "center", gap: 16 },
    h("div", { width: 14, height: 14, borderRadius: 9999, background: C.green }),
    h(
      "div",
      {
        display: "flex",
        fontFamily: "JetBrains Mono",
        fontWeight: 700,
        fontSize: 40,
        letterSpacing: "-0.02em",
        color: C.fg,
      },
      "LAMILL",
      h("span", { color: C.green }, ".io"),
    ),
  ),
  // Statement block — stacked tagline (as the hero stacks it) + sub-line
  h(
    "div",
    { display: "flex", flexDirection: "column" },
    tagline("Build.", C.fg),
    tagline("Deploy.", C.fg),
    tagline("Advance.", C.green),
    h("div", {
      width: 96,
      height: 2,
      background: C.border,
      marginTop: 36,
      marginBottom: 28,
    }),
    h(
      "div",
      {
        display: "flex",
        fontFamily: "JetBrains Mono",
        fontWeight: 500,
        fontSize: 24,
        letterSpacing: "-0.01em",
        color: C.muted,
      },
      "Engineering studio — full stack, Linux, hardware, IoT, web systems.",
    ),
  ),
);

const svg = await satori(tree, { width: WIDTH, height: HEIGHT, fonts });
const png = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } }).render().asPng();

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, png);
console.log(`✓ wrote ${path.relative(ROOT, OUT)} (${WIDTH}x${HEIGHT}, ${png.length} bytes)`);
