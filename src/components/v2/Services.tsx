"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { extras, frames, serviceGroups, type Category } from "@/data/v2/site";

export const SERVICE_EVENT = "dshnt:service";

// Each service group has a representative photo that floats beside the
// pointer while you hover the list. Groups with no matching frames show none.
const groupCategory: Partial<Record<string, Category>> = {
  people: "Portrait",
  creative: "Creative",
  nature: "Nature",
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
        <p className="section__lede">Pick what you need and the booking form fills itself in.</p>
      </div>

      <div className="groups">
        {serviceGroups.map((g, gi) => (
          <div
            className="group"
            key={g.id}
            onPointerEnter={() => setPeek(groupCategory[g.id] ?? null)}
            onPointerLeave={() => setPeek(null)}
          >
            <h3 className="group__title">
              <span className="mono">0{gi + 1}</span>
              {g.title}
            </h3>
            <ul className="group__list">
              {g.services.map((s) => (
                <li key={s.name}>
                  <button type="button" className="service" onClick={() => enquire(s.name)}>
                    <span className="service__name">{s.name}</span>
                    <span className="service__detail">{s.detail}</span>
                    <span className="service__cta pill">Enquire</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="group">
          <h3 className="group__title">
            <span className="mono">05</span>
            Add-ons
          </h3>
          <ul className="extras__list">
            {extras.map((x) => (
              <li key={x}>
                <button type="button" className="pill" onClick={() => enquire(x)}>
                  {x}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div ref={peekEl} className={peekFrame ? "peek peek--on" : "peek"} aria-hidden="true">
        {peekFrame && <Image src={peekFrame.src} alt="" fill sizes="220px" />}
      </div>
    </section>
  );
}
