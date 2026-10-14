"use client";

import { useState, useEffect } from "react";
import styles from "./Welcome.module.css";
import Image from "next/image";

const IMAGES = [
  {
    src: "/images/dance-stage-celebration.jpg",
    alt: "A smiling man embracing a garlanded performer on a brightly lit stage",
    tag: "Shared moments",
    caption: "Celebrating a love of performance",
  },
  {
    src: "/images/dance-court-community.jpg",
    alt: "A man in a Dance Court tracksuit posing with a boy in yellow and two adults at an event",
    tag: "Our community",
    caption: "A shared love of dance",
  },
];

export default function Welcome() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`section-pad ${styles.welcome}`} id="welcome">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.text}>
          <p className="eyebrow" data-reveal>
            Hello, we are glad you found us
          </p>
          <h2 className={styles.title} data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
            Welcome to <em className="serif-i">Rhythmic Beat.</em>
          </h2>
          <p className={`${styles.copy} ${styles.lede}`} data-reveal style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}>
            Founded in Trichy in 2004 by artistic director and celebrity
            choreographer Yuvraaj Jayakumar, Rhythmic Beat Dance Court brings
            people together through a shared love of dance. Our Chennai
            studio opened in September 2017.
          </p>
          <p className={styles.copy} data-reveal style={{ "--reveal-delay": "0.22s" } as React.CSSProperties}>
            Whether you dream of the stage or simply love to move, we help
            you explore your creativity and develop your technique. From
            classical traditions to international styles, our training
            encourages you to grow in confidence and bring your own
            expression to every performance.
          </p>
          <a href="#stories" className="u-link" data-reveal style={{ "--reveal-delay": "0.28s" } as React.CSSProperties}>
            Meet our artistic director <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className={styles.figureWrapper} data-reveal>
          <figure className={styles.media}>
            {IMAGES.map((img, index) => (
              <Image
                key={img.src}
                src={img.src}
                alt={img.alt}
                width={800}
                height={1000}
                sizes="(min-width: 900px) 45vw, 90vw"
                className={index === currentIndex ? styles.active : ""}
                priority={index === 0}
              />
            ))}
          </figure>
        </div>
      </div>
    </section>
  );
}
