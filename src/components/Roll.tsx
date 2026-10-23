"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { categories, frames } from "@/data/site";
import { shutterClick } from "@/lib/shutter";

const FilmRoll = dynamic(() => import("./three/FilmRoll"), { ssr: false });

const VH_PER_FRAME = 55;

export default function Roll() {
  const section = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeFrame, setActiveFrame] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);
  const [active, setActive] = useState(true);
  const lenis = useLenis();

  // Only render the WebGL scene while the roll is on screen.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const current = frames[Math.min(Math.max(activeFrame, 0), frames.length - 1)];

  // The pointer can leave the roll by scrolling, with no pointerout event.
  useLenis(() => {
    if (!hovering || !section.current) return;
    const r = section.current.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) setHovering(false);
  });

  const jumpTo = (index: number) => {
    const el = section.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const p = index / (frames.length - 1);
    const target = top + p * (rect.height - window.innerHeight);
    if (lenis) lenis.scrollTo(target, { duration: 1.4 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  const onOpen = useCallback((i: number) => {
    shutterClick();
    setOpen(i);
  }, []);

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
    <>
      <section
        className="roll"
        id="work"
        ref={section}
        style={{ height: `${frames.length * VH_PER_FRAME}vh` }}
        aria-label="Selected work"
      >
        <div className="roll__sticky" data-cursor={hovering ? "open" : undefined}>
          <FilmRoll
            frames={frames}
            active={active}
            sectionRef={section}
            onActive={setActiveFrame}
            onOpen={onOpen}
            onHover={setHovering}
          />

          <div className="roll__hud">
            <div className="roll__hud-top">
              <div>
                <p className="eyebrow eyebrow--light">Selected work</p>
                <h2 className="h2 h2--light">The roll</h2>
              </div>
              <p className="roll__counter mono" aria-live="polite">
                Frame <b>{String(activeFrame + 1).padStart(2, "0")}</b> / {String(frames.length).padStart(2, "0")}
              </p>
            </div>

            <div className="roll__hud-bottom">
              <div className="roll__caption" aria-live="polite">
                <span className="roll__title">{current.title}</span>
                <span className="mono">
                  {current.category} · {current.exif}
                  {current.select ? " · Dishant’s pick" : ""}
                </span>
              </div>
              <div className="roll__jumps" role="group" aria-label="Jump to a category">
                {categories.map((c) => {
                  const idx = frames.findIndex((f) => f.category === c);
                  return (
                    <button
                      key={c}
                      type="button"
                      className="filter filter--light"
                      aria-pressed={current.category === c}
                      onClick={() => jumpTo(idx)}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="roll__hint mono" aria-hidden="true">
              Keep scrolling to advance the roll · click a frame to open it
            </p>
          </div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="lightbox"
        data-lenis-prevent
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
      >
        {shot && (
          <figure className="lightbox__figure">
            <div className="lightbox__img">
              <Image src={shot.src} alt={shot.title} fill sizes="90vw" />
            </div>
            <figcaption>
              <span className="lightbox__title">{shot.title}</span>
              <span className="mono">
                Frame {open! + 1} · {shot.category} · {shot.exif}
              </span>
            </figcaption>
            <div className="lightbox__actions">
              <button type="button" className="lightbox__close" onClick={() => setOpen(null)}>
                Close
              </button>
              <a href="#book" className="lightbox__close" onClick={() => setOpen(null)}>
                Book a shoot like this
              </a>
            </div>
          </figure>
        )}
      </dialog>
    </>
  );
}
