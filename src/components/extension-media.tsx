import { useEffect, useRef, useState } from "react";
import { posterPath, youtubeWatchUrl, type ExtensionPage } from "@/lib/extension-pages";

type HeroVideo = NonNullable<ExtensionPage["heroVideo"]>;
type Shot = ExtensionPage["gallery"][number];

/**
 * Silent demo loop. Playback starts from JS, not `autoPlay`, so a
 * prefers-reduced-motion visitor never downloads or plays it — they see the
 * poster (the first frame). `preload="none"` keeps the MP4 off the critical
 * path; the 16:9 box reserves the space, so nothing shifts when it loads.
 */
export function HeroVideo({ video }: { video: HeroVideo }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // React doesn't reliably serialize `muted`; autoplay policy requires it.
    v.muted = true;
    if (reduced || paused) v.pause();
    else v.play().catch(() => setPaused(true));
  }, [reduced, paused]);

  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-sm border border-border bg-card">
        <video
          ref={ref}
          src={video.src}
          poster={posterPath(video.src)}
          width={video.size.width}
          height={video.size.height}
          muted
          loop
          playsInline
          preload="none"
          aria-label={video.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {!reduced ? (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="absolute bottom-3 right-3 rounded-sm border border-border bg-background/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-foreground backdrop-blur transition hover:border-primary hover:text-primary"
          >
            {paused ? "Play" : "Pause"}
          </button>
        ) : null}
      </div>
      <figcaption className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <a
          href={youtubeWatchUrl(video.youtube.id)}
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-primary"
        >
          ▶ Watch with sound ↗
        </a>
      </figcaption>
    </figure>
  );
}

/** Screenshot with AVIF/WebP sources (from scripts/ext-media.sh) and the PNG as fallback. */
function Screenshot({ shot }: { shot: Shot }) {
  const base = shot.src.replace(/\.png$/, "");
  return (
    <picture>
      <source type="image/avif" srcSet={`${base}.avif`} />
      <source type="image/webp" srcSet={`${base}.webp`} />
      <img
        src={shot.src}
        alt={shot.alt}
        width={shot.size.width}
        height={shot.size.height}
        loading="lazy"
        decoding="async"
        className="h-auto w-full rounded-sm border border-border bg-card"
      />
    </picture>
  );
}

export function Gallery({ shots }: { shots: Shot[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {shots.map((s) => (
        <figure key={s.src}>
          <Screenshot shot={s} />
          <figcaption className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {s.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
