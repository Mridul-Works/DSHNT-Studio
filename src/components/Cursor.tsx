"use client";

import { useEffect, useRef } from "react";

// A focus reticle that replaces the pointer on mouse devices. It lags the
// pointer slightly (like a lens hunting for focus) and snaps wider over
// anything you can press.

export default function Cursor() {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const node = el.current!;
    document.documentElement.classList.add("has-cursor");
    let tx = -100, ty = -100, x = -100, y = -100, raf = 0;

    const classify = (t: Element | null) => {
      const hit = t?.closest?.("a, button, [data-cursor]") as HTMLElement | null;
      node.dataset.state = hit ? (hit.dataset.cursor ?? "press") : "idle";
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      classify(e.target as Element | null);
    };
    // the page can scroll under a still pointer; re-check what's beneath it
    const onScroll = () => {
      if (node.dataset.state === "hidden") return;
      classify(document.elementFromPoint(tx, ty));
    };
    const onLeave = () => (node.dataset.state = "hidden");
    const loop = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      node.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={el} className="cursor" data-state="hidden" aria-hidden="true">
      <i /><i /><i /><i />
      <b />
      <span className="cursor__label" />
    </div>
  );
}
