"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";
import BannerMarquee from "./BannerMarquee";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ---- load sequence (waits for the intro veil on first view) ----
      const introPlaying =
        document.documentElement.dataset.intro !== "seen" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: introPlaying ? 1.45 : 0.15,
      });

      tl.fromTo(
        `.${styles.media}`,
        { scale: 1.18, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.2, ease: "power3.out" }
      )
        .fromTo(
          `.${styles.line} > span`,
          { yPercent: 110 },
          { yPercent: 0, duration: 1.2, stagger: 0.12 },
          "-=1.6"
        )
        .fromTo(
          `.${styles.sub}, .${styles.ctaRow}`,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
          "-=0.7"
        )
        ;

      // ---- scroll-out: content drifts up & fades, media zooms slightly ----
      gsap.to(`.${styles.content}`, {
        yPercent: -30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom 40%",
          scrub: true,
        },
      });

      gsap.to(`.${styles.media}`, {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={styles.hero}>
      <div className={styles.mediaWrap}>
        <Image
          className={styles.media}
          src="/images/dance-court-banner.jpg"
          alt="Rhythmic Beat Dance Court students celebrating on stage with certificates and event guests"
          fill
          sizes="100vw"
          preload
        />
        <div className={styles.scrim} />
      </div>

      <div className={styles.content}>
        <h1 className={styles.title} aria-label="Dance, to your own beat">
          <span className={styles.line} aria-hidden="true">
            <span>Dance,</span>
          </span>
          <span className={styles.line} aria-hidden="true">
            <span>
              to your <em className="serif-i">own beat.</em>
            </span>
          </span>
        </h1>
        <p className={styles.sub}>
          Your first step can become a lifelong passion. Explore dance,
          classical traditions and fitness with Rhythmic Beat Dance Court —
          a space to express yourself, build confidence and enjoy every move.
        </p>
        <div className={styles.ctaRow}>
          <a href="#book" className="btn btn-solid">
            Explore dance styles
          </a>
          <a href="#gallery" className="btn btn-line">
            Explore performances
          </a>
        </div>

      </div>


      <div className={styles.marquee}>
        <BannerMarquee />
      </div>
    </section>
  );
}
