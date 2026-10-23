"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { categories, frames, type Category } from "@/data/site";
import { shutterClick } from "@/lib/shutter";

// The portfolio as a wall of prints. Mixed aspect ratios flow into columns;
// each print carries a mono caption and opens full-size on click.

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
    <section className="wall" id="work" aria-label="Selected work">
      <div className="rule">
        <span className="rule__live">
          <i />
          Now booking
        </span>
        <span className="rule__line" />
        <span className="rule__end">From the roll ↗</span>
      </div>

      <div className="wall__head">
        <h2 className="h2">
          Selected
          <br />
          work
        </h2>
        <div className="tabs" role="group" aria-label="Filter by category">
          {(["All", ...categories] as const).map((c) => (
            <button key={c} type="button" className="pill pill--tab" aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>
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
              <Image src={f.src} alt={f.title} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
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
              <span className="mono">
                {shot.category} · {shot.exif}
              </span>
            </figcaption>
            <div className="lightbox__actions">
              <button type="button" className="pill" onClick={() => setOpen(null)}>
                Close
              </button>
              <a href="#book" className="pill pill--dark" onClick={() => setOpen(null)}>
                Book a shoot like this
              </a>
            </div>
          </figure>
        )}
      </dialog>
    </section>
  );
}
