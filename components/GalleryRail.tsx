"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./GalleryRail.module.css";
import LocalReel from "./LocalReel";

gsap.registerPlugin(ScrollTrigger);

const FRAMES = [
  {
    reel: "https://www.instagram.com/reel/DeUZ6ujqU0E/",
    video: "/media/dance-reel-1.mp4",
    poster: "/media/dance-reel-1-poster.jpg",
    caption: "Find confidence in every step",
    tag: "Expression",
  },
  {
    video: "/media/dance-reel-2.mp4",
    poster: "/media/dance-reel-2-poster.jpg",
    caption: "Move to a rhythm of your own",
    tag: "Rhythm",
  },
  {
    video: "/media/dance-reel-3.mp4",
    poster: "/media/dance-reel-3-poster.jpg",
    caption: "Explore your creative expression",
    tag: "Creativity",
  },
  {
    video: "/media/dance-reel-4.mp4",
    poster: "/media/dance-reel-4-poster.jpg",
    caption: "Make movement part of your day",
    tag: "Movement",
  },
  {
    video: "/media/dance-reel-5.mp4",
    poster: "/media/dance-reel-5-poster.jpg",
    caption: "Celebrate a shared passion",
    tag: "Expression",
  },
  {
    video: "/media/dance-reel-6.mp4",
    poster: "/media/dance-reel-6-poster.jpg",
    caption: "Dance to the beat of your dreams",
    tag: "Inspiration",
  },
];

export default function GalleryRail() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 821px) and (prefers-reduced-motion: no-preference)", () => {
      const getX = () => {
        if (!track.current) return 0;
        return -(track.current.scrollWidth - window.innerWidth);
      };

      const tween = gsap.to(track.current, {
        x: getX,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${Math.abs(getX())}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // subtle parallax inside each frame as the rail moves
      gsap.utils.toArray<HTMLElement>(`.${styles.frame} > .${styles.imgWrap} > img`).forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -6 },
          {
            xPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => `+=${Math.abs(getX())}`,
              scrub: 0.6,
            },
          }
        );
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className={styles.rail} id="gallery">
      <div className={styles.head}>
        <p className="eyebrow">A love of movement</p>
        <h2 className={styles.title}>
          Find your inspiration, <em className="serif-i">step by step.</em>
        </h2>
      </div>

      <div ref={track} className={styles.track}>
        {FRAMES.map((f, i) => (
          <figure key={f.video} className={styles.frame}>
            <div className={styles.imgWrap}>
              {f.video && f.poster ? (
                <LocalReel
                  src={f.video}
                  poster={f.poster}
                  label={`Dance Court reel ${i + 1} — ${f.caption}`}
                />
              ) : null}
            </div>
          </figure>
        ))}

        <div className={styles.railEnd}>
          <a
            href="https://www.instagram.com/rhythmicbeatdancecourt/"
            className="btn btn-line"
          >
            Follow Dance Court
          </a>
        </div>
      </div>
    </section>
  );
}
