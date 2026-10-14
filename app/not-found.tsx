import Image from "next/image";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      {/* an error page shouldn't be gated behind the brand intro veil */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.dataset.intro="seen"`,
        }}
      />
      <main className={styles.page}>
      <div className={styles.mediaWrap}>
        <Image
          src="/home/golden-hour-courtyard-couple.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.media}
        />
        <div className={styles.scrim} />
      </div>

      <a href="/" className={styles.logo} aria-label="Rhythmic Beat Dance Court home">
        <img src="/logo/rb-dance-court.webp" alt="Rhythmic Beat Dance Court logo" />
      </a>

      <div className={styles.content}>
        <p className={`eyebrow ${styles.eyebrow}`}>Error 404 — Page not found</p>
        <h1 className={styles.title}>
          Let&apos;s get you <em className="serif-i">back in rhythm.</em>
        </h1>
        <p className={styles.sub}>
          The page you&apos;re after has moved. Let&apos;s find your way
          back to the studio and your next step.
        </p>
        <div className={styles.ctaRow}>
          <a href="/" className="btn btn-solid">
            Return home
          </a>
          <a href="/#traditions" className="btn btn-line">
            Explore dance styles
          </a>
        </div>
        <p className={styles.meta}>
          Lost something specific? Call us on{" "}
          <a href="tel:+919655551055">+91 96555 51055</a>.
        </p>
      </div>
      </main>
    </>
  );
}
