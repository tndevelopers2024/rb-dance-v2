"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Preloader.module.css";

/** A brief brand introduction on full page loads only. */
export default function Preloader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dismiss = () => setGone(true);
    if (motion.matches) {
      setGone(true);
      return;
    }
    // CSS also dismisses the veil if hydration is delayed or unavailable.
    const timer = window.setTimeout(dismiss, 5000);
    const onMotionChange = () => { if (motion.matches) dismiss(); };
    window.addEventListener("keydown", dismiss, { once: true });
    motion.addEventListener("change", onMotionChange);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", dismiss);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  if (gone) return null;

  return (
    <div className={styles.veil} aria-hidden="true">
      <span className={styles.backdropWord}>rhythm</span>
      <div className={styles.stage}>
          <div className={styles.content}>
            <div className={styles.logoFrame}>
              <Image
                src="/logo/rb-dance-court.webp"
                alt="Rhythmic Beat Dance Court logo"
                width={384}
                height={384}
                sizes="(max-width: 560px) 224px, 280px"
                className={styles.logo}
              />
            </div>
            <p className={styles.studio}>Dance Court</p>
            <div className={styles.loading}>
              <span className={styles.rule} />
              <span className={styles.loadingLabel}>Find your rhythm</span>
            </div>
          </div>
      </div>
    </div>
  );
}
