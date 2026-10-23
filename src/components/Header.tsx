"use client";

import { useState } from "react";
import { useLenis } from "lenis/react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useLenis(({ scroll }) => setScrolled(scroll > 24));

  return (
    <header className={scrolled ? "header header--scrolled" : "header"}>
      <a href="#top" className="wordmark" aria-label="DSHNT Studio, back to top">
        <span className="wordmark__dot" aria-hidden="true" />
        DSHNT<span>studio</span>
      </a>
      <nav aria-label="Main" className="header__nav">
        <a href="#work" className="header__link">
          Work
        </a>
        <a href="#services" className="header__link">
          Services
        </a>
        <a href="#book" className="pill">
          Book a shoot
        </a>
        <a href="#book" className="pill pill--icon" aria-label="Go to the booking form">
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
            <path d="M5 15 15 5M7 5h8v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </nav>
    </header>
  );
}
