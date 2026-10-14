import styles from "./Blog.module.css";
import Image from "next/image";
const POSTS = [
  {
    "img": "/home/best-pre-wedding-shoot-locations-hyderabad.jpg",
    "title": "Explore Hip Hop, Breaking and International Styles",
    "date": "Dance training",
    "href": "#traditions",
    "alt": "Retained pre-wedding location photograph"
  },
  {
    "img": "/home/top-destination-wedding-venues-india.jpg",
    "title": "Find Your Rhythm with Zumba and Dance Fitness",
    "date": "Fitness & movement",
    "href": "#why-us",
    "alt": "Retained wedding venue photograph"
  },
  {
    "img": "/home/shivapriya-aditya-love-story.jpg",
    "title": "Meet Yuvraaj Jayakumar, Our Artistic Director",
    "date": "People & passion",
    "href": "#stories",
    "alt": "Retained photograph of Shivapriya and Aditya"
  },
  {
    "img": "/home/cinematic-wedding-films-india.jpg",
    "title": "Take Your First Step: Enquire About Classes",
    "date": "Your dance journey",
    "href": "#book",
    "alt": "Retained wedding film photograph"
  }
];

export default function Blog() {
  return (
    <section className={`section-pad ${styles.blog}`} id="blog">
      <div className="wrap">
        <div className={styles.head}>
          <div>
            <p className="eyebrow" data-reveal>
              Explore the studio
            </p>
            <h2 className={styles.title} data-reveal style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
              Discover your <em className="serif-i">next step.</em>
            </h2>
          </div>
          <a href="#book" className="btn btn-line" data-reveal>
            Ask about classes
          </a>
        </div>

        <div className={styles.grid}>
          {POSTS.map((p, i) => (
            <a
              key={p.href}
              href={p.href}
              className={styles.card}
              data-reveal
              style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
            >
              <div className={styles.imgWrap}>
                <Image src={p.img} alt={p.alt} width={600} height={400} />
              </div>
              <span className={styles.date}>{p.date}</span>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <span className={styles.more}>
                Explore <span aria-hidden="true">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
