"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Eases regular wheel/trackpad scrolling so motion-driven sections (reveals,
// scroll-scrubbed animations) have time to actually be seen, instead of
// flying past on a fast native scroll. Mount per-page so it only affects
// the routes that opt in.
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
