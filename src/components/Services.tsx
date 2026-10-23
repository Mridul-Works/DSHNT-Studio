"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { extras, frames, serviceGroups, type Category } from "@/data/site";

export const SERVICE_EVENT = "dshnt:service";

// Each service group has a representative photo that floats beside the
// pointer while you hover the list, like holding a print up to the light.
const groupCategory: Record<string, Category> = {
  people: "Portrait",
  creative: "Creative",
  nature: "Nature",
  commercial: "Commercial",
};

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
      if (peekEl.current) peekEl.current.style.transform = `translate(${x + 28}px, ${y - 140}px) rotate(${(target.current.x - x) * 0.05}deg)`;
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
    if (lenis) lenis.scrollTo("#book", { offset: -64 });
    else document.getElementById("book")?.scrollIntoView();
  };

  const peekFrame = peek ? frames.find((f) => f.category === peek && f.select) ?? frames.find((f) => f.category === peek) : null;

  return (
    <section className="section services" id="services" data-tone="light">
      <div className="section__head">
        <div>
          <p className="eyebrow">Services</p>
          <h2 className="h2">What Dishant shoots</h2>
        </div>
        <p className="section__lede">Pick what you need and the booking form fills itself in.</p>
      </div>

      <div className="groups">
        {serviceGroups.map((g) => (
          <div
            className="group"
            key={g.id}
            onPointerEnter={() => setPeek(groupCategory[g.id])}
            onPointerLeave={() => setPeek(null)}
          >
            <h3 className="group__title">{g.title}</h3>
            <ul className="group__list">
              {g.services.map((s) => (
                <li key={s.name}>
                  <button type="button" className="service" onClick={() => enquire(s.name)}>
                    <span className="service__name">{s.name}</span>
                    <span className="service__detail">{s.detail}</span>
                    <span className="service__cta">Enquire</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="extras">
        <h3 className="group__title">Add-ons</h3>
        <ul className="extras__list">
          {extras.map((x) => (
            <li key={x}>
              <button type="button" className="chip" onClick={() => enquire(x)}>
                {x}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div ref={peekEl} className={peekFrame ? "peek peek--on" : "peek"} aria-hidden="true">
        {peekFrame && <Image src={peekFrame.src} alt="" fill sizes="220px" />}
        {peek && <span className="peek__label mono">{peek}</span>}
      </div>
    </section>
  );
}
