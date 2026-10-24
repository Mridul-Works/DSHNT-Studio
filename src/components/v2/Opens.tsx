"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { frames, opens } from "@/data/v2/site";

// The gallery as a film gate. Between the words of the headline sits a narrow
// slit of photograph. Scrolling opens it: the slit grows into a near full-screen
// print, the photo changes at each step, the outer words are pushed apart with
// their tracking stretched, and once fully open the middle word flips.

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const GROW_END = 0.8; // share of the scroll spent opening; the rest holds the open state
const FLIP_AT = 0.86;

export default function Opens() {
  const section = useRef<HTMLElement>(null);
  const win = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLSpanElement>(null);
  const mid = useRef<HTMLSpanElement>(null);
  const right = useRef<HTMLSpanElement>(null);
  const stageRef = useRef(0);
  const flipRef = useRef(false);
  const [stage, setStage] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const stages = opens.stages.map((src) => frames.find((f) => f.src === src) ?? { src, title: "" });
  const n = stages.length;

  const update = useCallback(() => {
    const el = section.current;
    const w = win.current;
    if (!el || !w || !left.current || !mid.current || !right.current) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const p = clamp01(-rect.top / (rect.height - vh));
    const g = easeOut(clamp01(p / GROW_END));

    // the gate
    const width = lerp(Math.min(72, vw * 0.14), Math.min(vw * 0.92, 1500), g);
    const height = lerp(Math.min(230, vh * 0.32), vh * 0.78, g);
    w.style.width = `${width}px`;
    w.style.height = `${height}px`;

    // the words: tracking stretches, outer words ride the edges of whichever is
    // wider, the gate or the middle word, and never run into the middle word
    const narrow = vw < 760;
    const ls = 0.02 + g * (narrow ? 0.1 : 0.24);
    [left, mid, right].forEach((r) => (r.current!.style.letterSpacing = `${ls}em`));
    const gap = 18 + g * 28;
    const minGap = 14;
    const gutter = Math.max(16, vw * 0.034);
    const lw = left.current.getBoundingClientRect().width;
    const rw = right.current.getBoundingClientRect().width;
    const mw = mid.current.querySelector<HTMLSpanElement>(".is-on")?.getBoundingClientRect().width ?? 0;
    const half = Math.max(width / 2, mw / 2);
    let lx = Math.max(gutter, vw / 2 - half - gap - lw);
    lx = Math.min(lx, vw / 2 - mw / 2 - minGap - lw);
    let rx = Math.min(vw - gutter - rw, vw / 2 + half + gap);
    rx = Math.max(rx, vw / 2 + mw / 2 + minGap);
    left.current.style.transform = `translateX(${lx}px)`;
    right.current.style.transform = `translateX(${rx}px)`;

    const s = Math.min(n - 1, Math.floor(clamp01(p / GROW_END) * n));
    if (s !== stageRef.current) {
      stageRef.current = s;
      setStage(s);
    }
    const f = p > FLIP_AT;
    if (f !== flipRef.current) {
      flipRef.current = f;
      setFlipped(f);
    }
  }, [n]);

  useLenis(update);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  return (
    <section className="opens" id="work" ref={section} aria-label="Selected work">
      <div className="opens__stage">
        <div className="opens__glow" aria-hidden="true">
          {stages.map((s, i) => (
            <Image key={s.src} src={s.src} alt="" fill sizes="40vw" className={i === stage ? "is-on" : undefined} />
          ))}
        </div>

        <div className="rule rule--light opens__rule">
          <span className="rule__live">
            <i />
            Selected work
          </span>
          <span className="rule__line" />
          <span className="rule__end">
            Scroll to open ·{" "}
            <Link href="/v2/work" className="opens__all">
              All work ↗
            </Link>
          </span>
        </div>

        <div className="opens__window" ref={win}>
          {stages.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt={s.title}
              fill
              sizes="100vw"
              priority={i < 2}
              className={i === stage ? "is-on" : undefined}
            />
          ))}
        </div>

        <h2 className="opens__line" aria-label={`${opens.words[0]} ${opens.words[1]} ${opens.words[2]}`}>
          <span className="opens__word" ref={left} aria-hidden="true">
            {opens.words[0]}
          </span>
          <span className="opens__word opens__word--mid" ref={mid} aria-hidden="true">
            <span className={flipped ? "is-off" : "is-on"}>{opens.words[1]}</span>
            <span className={flipped ? "is-on" : "is-off"}>{opens.flip}</span>
          </span>
          <span className="opens__word" ref={right} aria-hidden="true">
            {opens.words[2]}
          </span>
        </h2>

        <p className="opens__caption mono" aria-live="polite">
          <span>{stages[stage].title}</span>
          <span>
            {String(stage + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
        </p>
      </div>
    </section>
  );
}
