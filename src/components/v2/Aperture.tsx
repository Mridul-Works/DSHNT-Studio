"use client";

import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { aperture } from "@/data/v2/site";

// The signature: a giant flat aperture, nine blades, driven by scroll. It
// starts shut at f/16 and opens to f/1.8 over the section, revealing a
// photograph. The readout ticks through real stops as it goes.

const BLADES = 9;
const R = 400; // ring radius in SVG units (viewBox is ±520)
const HOLE = R * 0.8;
const THETA_MAX = 64; // degrees each blade swings when fully open

const L = R * 1.18;
const BLADE = `M0 0 Q ${L / 2} ${-R * 0.8} ${L} 0 Q ${L / 2} ${R * 0.36} 0 0 Z`;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export default function Aperture() {
  const section = useRef<HTMLElement>(null);
  const blades = useRef<(SVGGElement | null)[]>([]);
  const disc = useRef<SVGCircleElement>(null);
  const [stopIndex, setStopIndex] = useState(0);
  const last = useRef(-1);

  useLenis(() => {
    const el = section.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = clamp01(-rect.top / (rect.height - vh));
    const eased = 1 - Math.pow(1 - p, 2);
    const theta = eased * THETA_MAX;
    blades.current.forEach((g, i) => {
      if (!g) return;
      const phi = (i * 360) / BLADES;
      const px = Math.cos((phi * Math.PI) / 180) * R;
      const py = Math.sin((phi * Math.PI) / 180) * R;
      g.setAttribute("transform", `translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${(phi + 180 + theta).toFixed(2)})`);
    });
    if (disc.current) disc.current.style.opacity = String(1 - clamp01(eased / 0.14));
    const idx = Math.round(eased * (aperture.stops.length - 1));
    if (idx !== last.current) {
      last.current = idx;
      setStopIndex(idx);
    }
  });

  const stop = aperture.stops[stopIndex];

  return (
    <section className="aperture" ref={section} aria-labelledby="aperture-title">
      <div className="aperture__sticky">
        <div className="aperture__text">
          <p className="eyebrow">{aperture.eyebrow}</p>
          <h2 className="h2" id="aperture-title">
            {aperture.headline[0]}
            <br />
            {aperture.headline[1]}
          </h2>
          <p className="aperture__body">{aperture.body}</p>
          <div className="aperture__readout" aria-live="polite">
            <span className="aperture__f">f/{stop}</span>
            <span className="aperture__stops mono" aria-hidden="true">
              {aperture.stops.map((s, i) => (
                <span key={s} className={i === stopIndex ? "is-on" : undefined}>
                  {s}
                </span>
              ))}
            </span>
          </div>
          <a href="#process" className="pill pill--dark">
            How a shoot works
          </a>
        </div>

        <div className="aperture__stage">
        <svg className="aperture__svg" viewBox="-520 -520 1040 1040" aria-hidden="true">
          <defs>
            <clipPath id="ap-hole">
              <circle r={HOLE} />
            </clipPath>
          </defs>
          <image
            href={aperture.src}
            x={-HOLE}
            y={-HOLE}
            width={HOLE * 2}
            height={HOLE * 2}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#ap-hole)"
          />
          <g clipPath="url(#ap-hole)">
            <circle ref={disc} r={HOLE} className="aperture__disc" />
            {Array.from({ length: BLADES }, (_, i) => {
              const phi = (i * 360) / BLADES;
              const px = Math.cos((phi * Math.PI) / 180) * R;
              const py = Math.sin((phi * Math.PI) / 180) * R;
              return (
                <g
                  key={i}
                  ref={(el) => {
                    blades.current[i] = el;
                  }}
                  transform={`translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${(phi + 180).toFixed(2)})`}
                >
                  <path d={BLADE} className="aperture__blade" />
                </g>
              );
            })}
          </g>
          {/* barrel: inner edge sits 4 units inside the clip so no seam shows */}
          <circle r={(HOLE - 4 + R * 1.3) / 2} className="aperture__barrel" strokeWidth={R * 1.3 - HOLE + 4} />
        </svg>
        </div>
      </div>
    </section>
  );
}
