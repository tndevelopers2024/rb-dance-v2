import styles from "./Services.module.css";

const SERVICES = [
  {
    number: "01",
    title: "Dance your way.",
    category: "Dance training",
    copy: "Find your groove in hip hop, B-Boying and international styles. Explore technique, musicality and your own expression.",
    tags: ["Hip Hop", "B-Boying", "International styles"],
    style: "dance",
    action: "Explore dance classes",
    message: "Hi Dance Court, I'd like to enquire about dance classes.",
  },
  {
    number: "02",
    title: "Rooted in rhythm.",
    category: "Classical & fusion",
    copy: "Discover the expression of Bharatanatyam and the creative possibilities of Urdhvam fusion. Let tradition inspire your next step.",
    tags: ["Bharatanatyam", "Urdhvam fusion"],
    style: "classical",
    action: "Explore classical training",
    message: "Hi Dance Court, I'd like to enquire about Bharatanatyam and Urdhvam fusion training.",
  },
  {
    number: "03",
    title: "Feel the energy.",
    category: "Dance & fitness",
    copy: "Make movement the best part of your day with Zumba, aerobics and Rhythmic Beat workouts. Bring your energy. Find your rhythm.",
    tags: ["Zumba", "Aerobics", "Rhythmic Beat Workout"],
    style: "fitness",
    action: "Explore fitness classes",
    message: "Hi Dance Court, I'd like to enquire about Zumba, aerobics and Rhythmic Beat workouts.",
  },
  {
    number: "04",
    title: "Keep discovering.",
    category: "Workshops & online learning",
    copy: "Give your curiosity room to move. Ask our team about upcoming workshops and online classes that fit your dance journey.",
    tags: ["Workshop enquiries", "Online class enquiries"],
    style: "learning",
    action: "Ask about learning options",
    message: "Hi Dance Court, I'd like to enquire about upcoming workshops and online classes.",
  },
];

function MovementArt({ kind }: { kind: string }) {
  return (
    <div className={`${styles.art} ${styles[`${kind}Art`]}`} aria-hidden="true">
      <span /><span /><span /><span /><span />
    </div>
  );
}

export default function Services() {
  return (
    <section className={`section-pad ${styles.services}`} id="services" aria-labelledby="services-title">
      <div className="wrap">
        <div className={styles.header}>
          <div>
            <p className="eyebrow">Our services</p>
            <h2 className={`display ${styles.title}`} id="services-title">
              Different moves.<br />Same <em className="serif-i">passion.</em>
            </h2>
          </div>
          <div className={styles.intro}>
            <span className={styles.introMark} aria-hidden="true">✳</span>
            <p>For the stage, for yourself, for the joy of it. Find a way to move that feels like you.</p>
          </div>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((service) => (
            <article className={`${styles.card} ${styles[service.style]}`} key={service.number}>
              <div className={styles.cardTop}>
                <span className={styles.category}>{service.category}</span>
                <span className={styles.number} aria-hidden="true">/{service.number}</span>
              </div>
              <MovementArt kind={service.style} />
              <div className={styles.content}>
                <h3 className={`display ${styles.cardTitle}`}>{service.title}</h3>
                <p className={styles.copy}>{service.copy}</p>
                <ul className={styles.tags} aria-label={`${service.category} options`}>
                  {service.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <a className={`u-link ${styles.link}`} href={`https://wa.me/919655551055?text=${encodeURIComponent(service.message)}`}>
                  {service.action}<span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.footer}>
          <p>Your next chapter starts with a first step.</p>
          <a className="btn btn-solid" href="#book">Find your class <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}
