"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./Testimonials.module.css";

const QUOTES = [
  {
    "name": "Yuvraaj Jayakumar · Founder",
    "quote": "Dance to the beat of your dreams."
  },
  {
    "name": "Our approach · Rhythmic Beat Dance Court",
    "quote": "Explore different techniques and grow into a versatile dancer, one step at a time."
  },
  {
    "name": "Your expression · Rhythmic Beat Dance Court",
    "quote": "Let rhythm and movement become a way to express your imagination."
  },
  {
    "name": "Our roots · Rhythmic Beat Dance Court",
    "quote": "Celebrate classical heritage while exploring new possibilities in dance."
  },
  {
    "name": "Your journey · Rhythmic Beat Dance Court",
    "quote": "Make space for dance, whether you dream of a profession or simply enjoy moving."
  },
  {
    "name": "Our community · Rhythmic Beat Dance Court",
    "quote": "Share your love of dance with people who live, love and breathe movement."
  },
  {
    "name": "Our vision · Rhythmic Beat Dance Court",
    "quote": "Build confidence, develop technique and discover your artistic potential."
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (dir: number) =>
      setIndex((i) => (i + dir + QUOTES.length) % QUOTES.length),
    []
  );

  useEffect(() => {
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [go, index]);

  const q = QUOTES[index];

  return (
    <section className={`section-pad ${styles.testimonials}`} id="testimonials">
      <div className="wrap">
        <p className="eyebrow eyebrow-plain">Words from the studio</p>

        <blockquote key={index} className={styles.quote}>
          “{q.quote}”
          <cite className={styles.cite}>— {q.name}</cite>
        </blockquote>

        <div className={styles.controls}>
          <button
            className={styles.arrow}
            onClick={() => go(-1)}
            aria-label="Previous studio message"
          >
            ←
          </button>
          <div className={styles.dots} aria-hidden="true">
            {QUOTES.map((_, i) => (
              <span
                key={i}
                className={[styles.dot, i === index ? styles.dotOn : ""].join(
                  " "
                )}
              />
            ))}
          </div>
          <button
            className={styles.arrow}
            onClick={() => go(1)}
            aria-label="Next studio message"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
