"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Manifesto.module.css";

gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "Dance is a way to express who you are — through rhythm, movement and imagination. Whether you dream of performing or simply love to move, let your passion lead the way.";

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(`.${styles.word}`);

      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=140%",
            pin: true,
            scrub: 0.4,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={styles.manifesto} id="studio">
      <div className="wrap">
        <p className={`eyebrow ${styles.eyebrow}`}>Our philosophy</p>
        <p className={styles.copy} aria-label={TEXT}>
          {TEXT.split(" ").map((w, i) => (
            <span key={i} className={styles.word} aria-hidden="true">
              {w}&nbsp;
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
