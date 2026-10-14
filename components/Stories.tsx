"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Stories.module.css";

gsap.registerPlugin(ScrollTrigger);

const STORIES = [
  {
    "img": "/home/varalakshmi-karthik-wedding.webp",
    "names": "Yuvraaj Jayakumar",
    "title": "A passion for dance. A vision to inspire.",
    "copy": "Our founder and artistic director brings experience across seven dance styles to his work as a performer, celebrity choreographer and teacher. He founded Rhythmic Beat Dance Court in Trichy in 2004.",
    "alt": "Varalakshmi and Karthik in the retained wedding photograph"
  },
  {
    "img": "/home/ashikha-surya-wedding.webp",
    "names": "Your dance journey",
    "title": "From your first step to your own expression",
    "copy": "Explore training that values versatility and creativity. Whether you want to pursue dance professionally or enjoy it for yourself, discover the styles and techniques that speak to you.",
    "alt": "Ashikha and Surya in the retained wedding photograph"
  }
];

export default function Stories() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(`.${styles.story}`).forEach((story) => {
        const imgWrap = story.querySelector(`.${styles.imgWrap}`);
        const img = story.querySelector("img");
        const text = story.querySelectorAll(`.${styles.text} > *`);

        // clip reveal
        gsap.fromTo(
          imgWrap,
          { clipPath: "inset(12% 8% 12% 8%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: story,
              start: "top 85%",
              end: "top 30%",
              scrub: 0.5,
            },
          }
        );

        // inner parallax
        gsap.fromTo(
          img,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: story,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );

        // text rise
        gsap.fromTo(
          text,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: story, start: "top 65%", once: true },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={`section-pad ${styles.stories}`} id="stories">
      <div className="wrap">
        <div className={styles.head}>
          <p className="eyebrow">People &amp; passion</p>
          <h2 className={styles.title}>
            One passion, <em className="serif-i">so many ways to move.</em>
          </h2>
        </div>

        {STORIES.map((s, i) => (
          <article
            key={s.names}
            className={[styles.story, i % 2 ? styles.reverse : ""].join(" ")}
          >
            <div className={styles.imgWrap}>
              <Image
                src={s.img}
                alt={s.alt}
                width={800}
                height={1000}
              />
            </div>
            <div className={styles.text}>
              <p className="eyebrow">{s.names}</p>
              <h3 className={styles.storyTitle}>{s.title}</h3>
              <p className={styles.copy}>{s.copy}</p>
              <a
                href="#book"
                className={styles.link}
              >
                Enquire about dance classes <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
