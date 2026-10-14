"use client";

import { useEffect } from "react";

/**
 * Adds .is-in to any [data-reveal] element as it enters the viewport.
 * Content stays visible; observation only adds a subtle movement.
 */
export default function ScrollReveals() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length) return;

    document.documentElement.classList.add("has-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px 160px 0px", threshold: 0 }
    );

    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      document.documentElement.classList.remove("has-reveal");
    };
  }, []);

  return null;
}
