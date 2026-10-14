import styles from "./Instagram.module.css";
import Image from "next/image";
const SHOTS = [
  {
    "src": "/images/instagram-stage-presentation.jpg",
    "alt": "Dance Court performers in silver jackets with guests at a stage presentation"
  },
  {
    "src": "/images/instagram-partner-dance.jpg",
    "alt": "Two dancers smiling in a partner pose inside the studio"
  },
  {
    "src": "/images/instagram-student-certificate.jpg",
    "alt": "A young student holding a certificate beside two adults"
  },
  {
    "src": "/images/instagram-krishna-portrait.jpg",
    "alt": "A woman in pink holding a child dressed as Krishna"
  },
  {
    "src": "/images/instagram-stage-performance.jpg",
    "alt": "Dancers in black costumes and flower garlands performing on stage"
  },
  {
    "src": "/images/instagram-dance-poster.jpg",
    "alt": "Four women posing with raised arms in a colourful dance poster"
  }
];

const IG = "https://www.instagram.com/rhythmicbeatdancecourt/";

export default function Instagram() {
  return (
    <section className={`section-pad ${styles.insta}`} id="instagram">
      <div className="wrap">
        <div className={styles.head}>
          <p className="eyebrow eyebrow-plain" data-reveal>
            Follow along
          </p>
          <h2 className={styles.title} data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
            <a href={IG}>
              @rhythmicbeat<em className="serif-i">dancecourt</em>
            </a>
          </h2>
        </div>
      </div>

      {/* two copies of the strip = seamless loop */}
      <div className={styles.marquee} data-reveal>
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className={styles.strip}
              aria-hidden={copy === 1 || undefined}
            >
              {SHOTS.map((shot) => (
                <a
                  key={shot.src}
                  href={IG}
                  className={styles.cell}
                  tabIndex={copy === 1 ? -1 : undefined}
                  aria-label={`View Dance Court on Instagram: ${shot.alt}`}
                >
                  <Image
                    src={shot.src}
                    alt={copy === 0 ? shot.alt : ""}
                    aria-hidden={copy === 1 || undefined}
                    width={400}
                    height={400}
                    sizes="(max-width: 818px) 180px, (max-width: 1364px) 22vw, 300px"
                  />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
