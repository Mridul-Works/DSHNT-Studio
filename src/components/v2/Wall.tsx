"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { categories, frames, type Category } from "@/data/v2/site";
import { shutterClick } from "@/lib/shutter";

// The full index: every frame on the site as a wall of prints, with category
// tabs and a lightbox. /v2 shows a selection in the scroll gallery; this is all of it.

export default function Wall() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const visible = frames
    .map((f, i) => ({ ...f, i }))
    .filter((f) => filter === "All" || f.category === filter);

  // Prints rise in as they enter the viewport.
  useEffect(() => {
    const el = wallRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("print--in")),
      { rootMargin: "0px 0px -8% 0px" },
    );
    el.querySelectorAll(".print").forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, [filter]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open !== null && !d.open) {
      d.showModal();
      lenis?.stop();
    } else if (open === null && d.open) {
      d.close();
    }
    if (open === null) lenis?.start();
  }, [open, lenis]);

  const shot = open !== null ? frames[open] : null;

  return (
    <section className="workpage" aria-labelledby="work-title">
      <div className="rule">
        <span className="rule__live">
          <i />
          All work
        </span>
        <span className="rule__line" />
        <span className="rule__end">
          {visible.length === frames.length ? `${frames.length} frames` : `${visible.length} of ${frames.length} frames`}
        </span>
      </div>

      <div className="workpage__head">
        <h1 className="workpage__title" id="work-title">
          Work
        </h1>
        <p className="section__lede">Every frame on the site, in one place. Tap a print to open it.</p>
      </div>

      <div className="tabs" role="group" aria-label="Filter by category">
        {(["All", ...categories] as const).map((c) => (
          <button key={c} type="button" className="pill pill--tab" aria-pressed={filter === c} onClick={() => setFilter(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="wall__grid" ref={wallRef} key={filter}>
        {visible.map((f, n) => (
          <button
            key={f.src}
            type="button"
            className="print"
            style={{ "--d": `${(n % 6) * 60}ms` } as React.CSSProperties}
            onClick={() => {
              shutterClick();
              setOpen(f.i);
            }}
            aria-label={`Open ${f.title}`}
          >
            <span className="print__img" style={{ aspectRatio: String(f.ratio) }}>
              <Image src={f.src} alt={f.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw" />
            </span>
            <span className="print__meta mono">
              <span>{f.title}</span>
              <span>{f.select ? "Pick" : f.category}</span>
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        data-lenis-prevent
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
      >
        {shot && (
          <figure className="lightbox__figure">
            <div className="lightbox__img" style={{ aspectRatio: String(shot.ratio) }}>
              <Image src={shot.src} alt={shot.title} fill sizes="90vw" />
            </div>
            <figcaption>
              <span className="lightbox__title">{shot.title}</span>
              <span className="mono">{shot.exif ? `${shot.category} · ${shot.exif}` : shot.category}</span>
            </figcaption>
            <div className="lightbox__actions">
              <button type="button" className="pill" onClick={() => setOpen(null)}>
                Close
              </button>
              <Link href="/v2#book" className="pill pill--dark" onClick={() => setOpen(null)}>
                Book a shoot like this
              </Link>
            </div>
          </figure>
        )}
      </dialog>
    </section>
  );
}
