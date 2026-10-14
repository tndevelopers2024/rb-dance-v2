import styles from "./Traditions.module.css";
import Image from "next/image";
const TRADITIONS = [
  {
    img: "/home/brahmin-traditional-wedding.webp",
    alt: "Brahmin wedding",
    label: "Bharatanatyam",
  },
  {
    img: "/home/christian-wedding-ceremony.webp",
    alt: "Christian wedding",
    label: "Hip Hop",
  },
  {
    img: "/home/muslim-wedding-nikah.webp",
    alt: "Muslim wedding",
    label: "B-Boying",
  },
  {
    img: "/home/telugu-traditional-wedding.webp",
    alt: "Telugu wedding",
    label: "Urdhvam Fusion",
  },
  {
    img: "/home/malayali-wedding-ceremony.webp",
    alt: "Malayali wedding",
    label: "Rhythmic Beat Workout",
  },
  {
    img: "/home/north-indian-wedding.webp",
    alt: "North-Indian wedding",
    label: "International Dance Forms",
  },
];

export default function Traditions() {
  return (
    <section className={`section-pad ${styles.traditions}`} id="traditions">
      <div className="wrap">
        <div className={styles.head}>
          <p className="eyebrow" data-reveal>
            Our dance repertoire
          </p>
          <h2 className={styles.title} data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
            Every style, explored with{" "}
            <em className="serif-i">passion and purpose.</em>
          </h2>
          <p className={styles.sub} data-reveal style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}>
            From classical expression to hip hop and contemporary fusion,
            discover the styles that inspire our training. Contact the studio
            to explore current classes and find your next step.
          </p>
        </div>

        <div className={styles.grid}>
          {TRADITIONS.map((t, i) => (
            <figure
              key={t.label}
              className={styles.cell}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 0.08}s` } as React.CSSProperties}
            >
              <Image src={t.img} alt={t.alt} width={600} height={400} />
              <figcaption className={styles.label}>{t.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
