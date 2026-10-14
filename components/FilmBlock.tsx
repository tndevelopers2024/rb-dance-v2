"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FilmBlock.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function FilmBlock() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // media grows from inset card to full-bleed as it enters — Apple's classic move
      gsap.fromTo(
        `.${styles.mediaWrap}`,
        { scale: 0.82, borderRadius: 24 },
        {
          scale: 1,
          borderRadius: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 90%",
            end: "top 15%",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        `.${styles.overlayContent} > *`,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 40%",
            once: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={styles.film} id="films">
      <div className={styles.mediaWrap}>
        <Image
          src="/home/indian-wedding-sindoor-moment.webp"
          alt="Indian wedding sindoor moment photography"
          width={1800}
          height={1200}
        />
        <div className={styles.scrim} />
        <div className={styles.overlayContent}>
          <p className="eyebrow">Performance &amp; expression</p>
          <h2 className={styles.title}>
            Turning a love of movement into{" "}
            <em className="serif-i">creative expression.</em>
          </h2>
          <a
            href="https://www.youtube.com/channel/UCaSrc8LKkd6rAzypRxKM7Zg"
            className={styles.playBtn}
            aria-label="Explore our dance videos"
          >
            <span className={styles.playIcon} aria-hidden="true">
              ▶
            </span>
            Explore our dance videos
          </a>
        </div>
      </div>
    </section>
  );
}
