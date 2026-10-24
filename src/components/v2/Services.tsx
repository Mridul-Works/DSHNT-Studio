"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { frames, services, type Category } from "@/data/v2/site";

export const SERVICE_EVENT = "dshnt:service";

// One heading, then the flat list: no lede, no groups. Each row pre-fills the booking form,
// and rows with a matching category float one of its photos beside the pointer.

export default function Services() {
  const lenis = useLenis();
  const [peek, setPeek] = useState<Category | null>(null);
  const peekEl = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let x = 0, y = 0, raf = 0;
    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    const loop = () => {
      x += (target.current.x - x) * 0.12;
      y += (target.current.y - y) * 0.12;
      if (peekEl.current) peekEl.current.style.transform = `translate(${x + 28}px, ${y - 150}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const enquire = (name: string) => {
    window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: name }));
    if (lenis) lenis.scrollTo("#book", { offset: -80 });
    else document.getElementById("book")?.scrollIntoView();
  };

  const peekFrame = peek ? frames.find((f) => f.category === peek && f.select) ?? frames.find((f) => f.category === peek) : null;

  return (
    <section className="section services" id="services">
      <div className="section__head">
        <h2 className="h2">
          What Dishant
          <br />
          shoots
        </h2>
      </div>

      <ul className="group__list">
        {services.map((s) => (
          <li key={s.name} onPointerEnter={() => setPeek(s.peek ?? null)} onPointerLeave={() => setPeek(null)}>
            <button type="button" className="service" onClick={() => enquire(s.name)}>
              <span className="service__name">{s.name}</span>
              <span className="service__detail">{s.detail}</span>
              <span className="service__cta pill">Enquire</span>
            </button>
          </li>
        ))}
      </ul>

      <div ref={peekEl} className={peekFrame ? "peek peek--on" : "peek"} aria-hidden="true">
        {peekFrame && <Image src={peekFrame.src} alt="" fill sizes="220px" />}
      </div>
    </section>
  );
}
