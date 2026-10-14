import styles from "./WhyUs.module.css";
import Image from "next/image";
const REASONS = [
  {
    "img": "/home/authentic-wedding-storytelling.webp",
    "title": "Training that builds confidence",
    "copy": "Develop technique and explore your potential, whether dance is your ambition or your favourite way to unwind.",
    "alt": "Wedding storytelling photograph"
  },
  {
    "img": "/home/candid-wedding-emotions.webp",
    "title": "Expression in every movement",
    "copy": "Bring your imagination to the floor and discover how rhythm, movement and performance can tell your story.",
    "alt": "Candid wedding celebration"
  },
  {
    "img": "/home/premium-wedding-photography.webp",
    "title": "Dance meets fitness",
    "copy": "Explore Zumba, aerobics and Rhythmic Beat workouts for an energetic way to enjoy movement.",
    "alt": "Wedding portrait photograph"
  },
  {
    "img": "/home/destination-cultural-weddings.webp",
    "title": "Tradition meets new possibilities",
    "copy": "From Bharatanatyam to hip hop and Urdhvam fusion, explore the beauty of different dance styles.",
    "alt": "Traditional wedding celebration"
  }
];

export default function WhyUs() {
  return (
    <section className={`section-pad ${styles.why}`} id="why-us">
      <div className="wrap">
        <div className={styles.head}>
          <p className="eyebrow" data-reveal>
            Why choose us
          </p>
          <h2 className={styles.title} data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
            More than just a class — a world of{" "}
            <em className="serif-i">possibilities.</em>
          </h2>
          <p className={styles.sub} data-reveal style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}>
            Find your rhythm, develop your technique and enjoy the journey.
            Here&apos;s what inspires our approach to dance and fitness.
          </p>
        </div>

        <div className={styles.grid}>
          {REASONS.map((r, i) => (
            <article
              key={r.title}
              className={styles.card}
              data-reveal
              style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
            >
              <div className={styles.imgWrap}>
                <Image src={r.img} alt={r.alt} width={600} height={750} />
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.cardNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.cardRule} />
              </div>
              <h3 className={styles.cardTitle}>{r.title}</h3>
              <p className={styles.cardCopy}>{r.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
