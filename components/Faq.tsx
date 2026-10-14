"use client";

import { useState } from "react";
import styles from "./Faq.module.css";

const FAQS = [
  {
    "q": "Which dance styles do you teach?",
    "a": "Our repertoire includes Bharatanatyam, hip hop, B-Boying, Urdhvam fusion and international dance forms. Contact us to find out which styles are available in current batches."
  },
  {
    "q": "Can I join if I’m new to dance?",
    "a": "Our approach welcomes people who enjoy dance as well as those with professional ambitions. Tell us about your experience and interests so we can help you choose suitable training."
  },
  {
    "q": "Do you offer fitness classes?",
    "a": "The studio offers Zumba, aerobics and Rhythmic Beat workouts. You can also enquire about yoga and current class availability."
  },
  {
    "q": "How do I find batch timings and fees?",
    "a": "Call +91 9655551055 or message us on WhatsApp for current schedules, age groups and fees. Ask our team about online classes and workshop availability too."
  },
  {
    "q": "Where can I visit the studio?",
    "a": "Our contact details list locations in Valasaravakkam, Chennai, and Pondicherry. Call Chennai on +91 9655551055 or Pondicherry on +91 7338822355 before visiting to confirm the address and a suitable time."
  }
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={`section-pad ${styles.faq}`} id="faq">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.head}>
          <p className="eyebrow">FAQs</p>
          <h2 className={styles.title}>
            Asked <em className="serif-i">often.</em>
          </h2>
        </div>

        <div className={styles.list}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={styles.item}>
                <button
                  className={styles.q}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {f.q}
                  <span
                    className={[styles.chev, isOpen ? styles.chevOpen : ""].join(
                      " "
                    )}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  className={[styles.a, isOpen ? styles.aOpen : ""].join(" ")}
                >
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
