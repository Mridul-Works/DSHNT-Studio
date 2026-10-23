"use client";

import { useState } from "react";
import { useLenis } from "lenis/react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#story", label: "Story" },
];

export default function Header() {
  const [onLight, setOnLight] = useState(false);

  // Sections declare their tone; the header turns to paper over light ones
  // and stays a thin dark gradient over the photos.
  useLenis(() => {
    const y = 64;
    let light = false;
    document.querySelectorAll<HTMLElement>("[data-tone]").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top <= y && r.bottom > y) light = el.dataset.tone === "light";
    });
    setOnLight(light);
  });

  return (
    <header className={onLight ? "header header--on-light" : "header"}>
      <a href="#top" className="wordmark" aria-label="DSHNT Studio, back to top">
        DSHNT<span>Studio</span>
      </a>
      <nav aria-label="Main">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="header__link">
            {l.label}
          </a>
        ))}
        <a href="#book" className="header__cta">
          Book a shoot
        </a>
      </nav>
    </header>
  );
}
