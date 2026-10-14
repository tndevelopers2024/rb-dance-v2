"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Stats.module.css";

const STATS = [
  {
    "value": 2004,
    "prefix": "",
    "suffix": "",
    "label": "Founded in Trichy"
  },
  {
    "value": 7000,
    "prefix": "",
    "suffix": "+",
    "label": "Students trained"
  },
  {
    "value": 1000,
    "prefix": "",
    "suffix": "+",
    "label": "Shows performed"
  },
  {
    "value": 1,
    "prefix": "",
    "suffix": "",
    "label": "Shared passion"
  }
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const finish = () => {
      clearInterval(timer);
      setProgress(1);
    };
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      if (motion.matches) return;
      const start = performance.now();
      setProgress(0);
      timer = setInterval(() => {
        const elapsed = Math.min((performance.now() - start) / 1600, 1);
        setProgress(1 - Math.pow(1 - elapsed, 3));
        if (elapsed === 1) finish();
      }, 32);
    }, { threshold: 0.35 });
    const onMotionChange = () => {
      if (motion.matches) {
        observer.disconnect();
        finish();
      }
    };
    motion.addEventListener("change", onMotionChange);
    observer.observe(section);
    return () => {
      observer.disconnect();
      clearInterval(timer);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <section ref={sectionRef} className={`section-pad ${styles.stats}`}>
      <div className="wrap">
        <div className={styles.grid}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.item}>
              <div className={styles.value} aria-label={`${s.prefix}${s.value.toLocaleString("en-IN")}${s.suffix}`}>
                {s.prefix && <span className={styles.prefix}>{s.prefix}</span>}
                <span className={styles.num} aria-hidden="true">
                  {Math.max(1, Math.round(s.value * progress)).toLocaleString("en-IN")}
                </span>
                <span className={styles.suffix} aria-hidden="true">{s.suffix}</span>
              </div>
              <div className={styles.label}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
