"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./LocalReel.module.css";

type Props = { src: string; poster: string; label: string };

export default function LocalReel({ src, poster, label }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionAllowed(!preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const player = video.current;
    const container = root.current;
    if (!motionAllowed || !player || !container) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !manuallyPaused.current) {
        player.muted = true;
        void player.play().catch(() => setPlaying(false));
      } else {
        player.pause();
      }
    }, { threshold: 0.15 });
    observer.observe(container);
    return () => {
      observer.disconnect();
      player.pause();
    };
  }, [motionAllowed]);

  const toggle = () => {
    const player = video.current;
    if (!player) return;
    if (player.paused) {
      manuallyPaused.current = false;
      player.muted = true;
      void player.play().catch(() => setPlaying(false));
    } else {
      manuallyPaused.current = true;
      player.pause();
    }
  };

  return (
    <div ref={root} className={styles.media}>
      {motionAllowed ? (
        <>
          <video
            ref={video}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={label}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
          <button className={styles.control} onClick={toggle} aria-label={playing ? `Pause ${label}` : `Play ${label} without sound`}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
              {playing ? (
                <>
                  <rect x="6" y="4" width="4" height="16" rx="1.5" />
                  <rect x="14" y="4" width="4" height="16" rx="1.5" />
                </>
              ) : (
                <path d="M8 4.8c0-.8.9-1.3 1.6-.9l11 7.2c.7.4.7 1.4 0 1.8l-11 7.2c-.7.4-1.6-.1-1.6-.9V4.8Z" />
              )}
            </svg>
          </button>
        </>
      ) : (
        <Image src={poster} alt={label} fill sizes="(max-width: 820px) 78vw, 32vw" />
      )}
    </div>
  );
}
