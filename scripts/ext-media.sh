#!/usr/bin/env bash
# Derive the web assets for an extension landing page from the operator's
# source media in public/extensions/<slug>/, then record every file's pixel
# size in src/content/extension-media.json (the page reads width/height from
# there — nothing is hand-typed, so a re-exported screenshot can't drift).
#
#   bash scripts/ext-media.sh <slug> [og-source.png]
#   POSTER_AT=2 bash scripts/ext-media.sh save-page-pdf-md   # poster frame, seconds
#
# Runs on the HOST, not in the dev container: it needs ffmpeg + ImageMagick
# with AVIF/WebP delegates, which the sites1 image doesn't ship.
#
# Outputs, next to the sources:
#   <video>.web.mp4         every *silent*.mp4 re-encoded for the page: 720p,
#                           H.264, no audio track, faststart (the hero loop)
#   <video>.web.poster.jpg  the hero poster: frame at $POSTER_AT s (default 0)
#   <shot>.avif/.webp       for every shot-*.png, capped at 1600px wide
#   og.png                  og-source fitted into 1200×630, padded with the
#                           source's own corner colour
set -euo pipefail

slug=${1:?usage: scripts/ext-media.sh <slug> [og-source.png]}
og_src=${2:-shot-before-after.png}
root=$(cd "$(dirname "$0")/.." && pwd)
dir="$root/public/extensions/$slug"
manifest="$root/src/content/extension-media.json"

for tool in ffmpeg ffprobe convert identify; do
  command -v "$tool" >/dev/null || { echo "✗ $tool not found (run on the host)"; exit 1; }
done
[ -d "$dir" ] || { echo "✗ $dir missing — drop the source media there first"; exit 1; }

shopt -s nullglob

# Sources are deleted from public/ once encoded (backed up elsewhere), so a
# re-run with only the .web.mp4 present still refreshes the poster.
for v in "$dir"/*silent*.mp4; do
  [[ $v == *.web.mp4 ]] && continue
  w="${v%.mp4}.web.mp4"
  ffmpeg -loglevel error -y -i "$v" -an -vf "scale=-2:720" -c:v libx264 -preset slow -crf 28 \
    -profile:v high -pix_fmt yuv420p -movflags +faststart "$w"
  echo "✓ video  $(basename "$w")"
done
for w in "$dir"/*silent*.web.mp4; do
  ffmpeg -loglevel error -y -ss "${POSTER_AT:-0}" -i "$w" -frames:v 1 -q:v 3 "${w%.mp4}.poster.jpg"
  echo "✓ poster  $(basename "${w%.mp4}.poster.jpg") @ ${POSTER_AT:-0}s"
done

for s in "$dir"/shot-*.png; do
  b=${s%.png}
  convert "$s" -resize '1600x>' -quality 50 "$b.avif"
  convert "$s" -resize '1600x>' -quality 80 "$b.webp"
  echo "✓ avif/webp  $(basename "$b")"
done

if [ -f "$dir/$og_src" ]; then
  bg=$(convert "$dir/$og_src" -format '%[pixel:p{0,0}]' info:)
  convert "$dir/$og_src" -resize 1200x630 -background "$bg" -gravity center -extent 1200x630 "$dir/og.png"
  echo "✓ og.png  ← $og_src (1200×630)"
else
  echo "↷ og.png skipped — $og_src not found"
fi

# Manifest: public path → {width, height}. Merged per slug so other
# extensions' entries survive.
entries=()
for f in "$dir"/*.png "$dir"/*.jpg; do
  read -r w h < <(identify -format '%w %h\n' "$f[0]")
  entries+=("\"/extensions/$slug/$(basename "$f")\": {\"width\": $w, \"height\": $h}")
done
for f in "$dir"/*.mp4; do
  read -r w h < <(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "$f" | tr x ' ')
  entries+=("\"/extensions/$slug/$(basename "$f")\": {\"width\": $w, \"height\": $h}")
done

new=$(printf '{%s}' "$(IFS=,; echo "${entries[*]}")")
old=$( [ -f "$manifest" ] && cat "$manifest" || echo '{}')
node -e '
  const [old, fresh, slug] = process.argv.slice(1);
  const o = JSON.parse(old);
  for (const k of Object.keys(o)) if (k.startsWith(`/extensions/${slug}/`)) delete o[k];
  Object.assign(o, JSON.parse(fresh));
  const sorted = Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b)));
  process.stdout.write(JSON.stringify(sorted, null, 2) + "\n");
' "$old" "$new" "$slug" > "$manifest.tmp" && mv "$manifest.tmp" "$manifest"
echo "✓ manifest  src/content/extension-media.json (${#entries[@]} files for $slug)"

echo
du -h "$dir"/* | sort -h
