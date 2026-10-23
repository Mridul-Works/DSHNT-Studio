"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { hero } from "@/data/site";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

const LINE_A = "My first salary bought a camera.";
const LINE_B = "The rest is history.";

function Chars({ text, from }: { text: string; from: number }) {
  return (
    <>
      {text.split(" ").map((word, wi) => (
        <span key={wi}>
          <span className="word">
            {word.split("").map((ch, ci) => (
              <span className="ch" key={ci} style={{ "--i": from + wi * 3 + ci } as React.CSSProperties}>
                {ch}
              </span>
            ))}
          </span>{" "}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(true);
  const scroll = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const startedAt = useRef(0);
  const section = useRef<HTMLElement>(null);

  // Only render the WebGL scene while the hero is on screen.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (window.matchMedia("(pointer: fine)").matches) {
      const onMove = (e: PointerEvent) => {
        pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    }
  }, []);

  useLenis((l) => {
    const v = Math.min(1, Math.max(0, l.scroll / (window.innerHeight * 0.8)));
    scroll.current = v;
    section.current?.style.setProperty("--sc", v.toFixed(3));
  });

  const onLoaded = useCallback(() => {
    startedAt.current = performance.now();
    setReady(true);
  }, []);

  return (
    <section className={ready ? "hero hero--ready" : "hero"} id="top" ref={section}>
      <HeroScene src={hero.src} shared={{ scroll, pointer, startedAt, reduced }} active={active} onLoaded={onLoaded} />

      <div className="hero__boot" aria-hidden="true">
        <span className="hero__boot-mark">DSHNT</span>
        <span className="hero__boot-line">focusing…</span>
      </div>

      <div className="hero__content">
        <p className="eyebrow eyebrow--light">Photography by Dishant</p>
        <h1 className="hero__title" aria-label={`${LINE_A} ${LINE_B}`}>
          <span className="hero__line" aria-hidden="true">
            <Chars text={LINE_A} from={0} />
          </span>
          <span className="hero__line hero__line--amber" aria-hidden="true">
            <Chars text={LINE_B} from={26} />
          </span>
        </h1>
        <div className="hero__actions">
          <a href="#book" className="btn btn--light">
            Book a shoot
          </a>
          <a href="#work" className="btn btn--ghost">
            See the work
          </a>
        </div>
      </div>

      <div className="vf__readout" aria-hidden="true">
        {hero.exif.map((v) => (
          <span key={v}>{v}</span>
        ))}
        <span className="vf__shots">[ 999 ]</span>
      </div>

      <div className="hero__hint" aria-hidden="true">
        <span>Scroll to close the shutter</span>
      </div>
    </section>
  );
}
