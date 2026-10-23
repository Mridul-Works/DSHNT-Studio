"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { story } from "@/data/site";

// The story develops like a print in the tray: words come up from grey to
// ink as you scroll. Beside it, the receipt for the camera.

const receipt = [
  ["FIRST SALARY", "1"],
  ["DSLR BODY", "1"],
  ["KIT LENS 18–55", "1"],
  ["MEMORY CARD 32GB", "1"],
  ["SAVINGS", "0"],
  ["REGRETS", "0"],
];

export default function Story() {
  const section = useRef<HTMLElement>(null);
  const words = useRef<HTMLSpanElement[]>([]);
  words.current = [];

  useLenis(() => {
    const el = section.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (rect.height * 0.9)));
    const n = words.current.length;
    words.current.forEach((w, i) => {
      w.style.opacity = p * n > i ? "1" : "0.16";
    });
  });

  let k = 0;
  const text = story.paragraphs.map((para, pi) => (
    <p key={pi}>
      {para.split(" ").map((word, wi) => (
        <span
          key={wi}
          className="dev"
          ref={(el) => {
            if (el) words.current[k++] = el;
          }}
        >
          {word}{" "}
        </span>
      ))}
    </p>
  ));

  return (
    <section className="section story" id="story" ref={section} data-tone="light">
      <div className="story__grid">
        <div>
          <p className="eyebrow">The story</p>
          <blockquote className="story__quote">“{story.quote}”</blockquote>
          <p className="pencil story__sign">— Dishant</p>
          <div className="story__text">{text}</div>
          <a href="#book" className="text-link">
            Work with Dishant
          </a>
        </div>

        <aside className="receipt" aria-label="The receipt for the first camera">
          <p className="receipt__head">
            DSHNT STUDIO
            <br />
            RECEIPT № 0001
          </p>
          <p className="receipt__meta">DAY 1 OF THE FIRST SALARY</p>
          <ul>
            {receipt.map(([item, qty]) => (
              <li key={item}>
                <span>{item}</span>
                <span className="receipt__dots" />
                <span>{qty}</span>
              </li>
            ))}
          </ul>
          <p className="receipt__total">
            <span>TOTAL</span>
            <span>EVERYTHING</span>
          </p>
          <p className="receipt__foot">*** NO REFUNDS. NONE WANTED. ***</p>
          <span className="receipt__stamp pencil">PAID</span>
        </aside>
      </div>
    </section>
  );
}
