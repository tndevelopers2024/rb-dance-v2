"use client";

import { useState } from "react";
import styles from "./BannerMarquee.module.css";

const ITEMS = ["Dance to your own beat", "Bharatanatyam", "Hip Hop", "B-Boying", "Zumba & fitness", "Rhythmic Beat Dance Court"];

export default function BannerMarquee() {
  const [paused, setPaused] = useState(false);
  return (
    <div className={styles.strip}>
      <div className={styles.viewport}>
        <div className={`${styles.track} ${paused ? styles.paused : ""}`}>
          {[0, 1].map((copy) => (
            <div className={styles.group} key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {Array.from({ length: 4 }, (_, repeat) =>
                ITEMS.map((item) => (
                  <span key={`${repeat}-${item}`} aria-hidden={repeat > 0 ? true : undefined}>
                    {item}<span className={styles.star} aria-hidden="true">✳</span>
                  </span>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
      <button className={styles.control} onClick={() => setPaused(!paused)} aria-label={paused ? "Play banner marquee" : "Pause banner marquee"}>
        <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
      </button>
    </div>
  );
}
