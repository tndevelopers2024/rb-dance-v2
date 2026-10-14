"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Closing.module.css";

const COLLAPSE_AT = "(max-width: 699px)";

/* Footer link group. Renders open — so the links are in the server HTML for
   crawlers and still work with JS off — and only collapses into an accordion
   once we know we're on a narrow screen, where 43 stacked links is 3 screens
   of scrolling. Above 700px the summary is inert and the group stays open. */
function FootGroup({
  label,
  collapsed,
  children,
}: {
  label: string;
  collapsed: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      className={styles.footGroup}
      open={!collapsed}
      onToggle={(e) => {
        // A desktop column must never end up collapsed — its label reads as
        // static text, so a stray click shouldn't hide the links. Reopening
        // here (rather than blocking the click) keeps the links reachable
        // even if the group somehow starts closed at desktop width.
        const el = e.currentTarget as HTMLDetailsElement;
        if (!collapsed && !el.open) el.open = true;
      }}
    >
      {/* out of the tab order on desktop, so keyboard users don't land on a
          control that looks like a static column label */}
      <summary className={styles.colTitle} tabIndex={collapsed ? 0 : -1}>
        {label}
      </summary>
      <div className={styles.colLinks}>{children}</div>
    </details>
  );
}

export default function Closing() {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(COLLAPSE_AT);
    const sync = () => setCollapsed(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);


  return (
    <section id="book">
      <div className={styles.testimonial} hidden>
        <div className="wrap">
          <p className="eyebrow">From our founder</p>
          <blockquote className={styles.quote}>
            Dance to the beat of your dreams. Discover your expression,
            explore your creativity and share our love of movement.
            <cite>
              <a href="#stories">
                Yuvraaj Jayakumar · Founder →
              </a>
            </cite>
          </blockquote>
        </div>
      </div>

      <div className={styles.cta}>
        <div className={`wrap ${styles.ctaGrid}`}>
          <div className={styles.invitation}>
            <p className="eyebrow">Your next step</p>
            <h2 className={`display ${styles.bigWord}`}>
              Let&apos;s <em className="serif-i">talk.</em>
            </h2>
            <p className={styles.ctaSub}>
              A little curiosity. A first conversation. Tell us what you love
              to dance — we&apos;ll help you find your rhythm.
            </p>
            <div className={styles.ctaRow}>
              <a href="https://wa.me/919655551055" className="btn btn-solid">
                Enquire on WhatsApp <span aria-hidden="true">↗</span>
              </a>
              <a href="tel:+919655551055" className="u-link">
                Call 96555 51055 <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className={styles.danceCard}>
            <div className={styles.danceArt}>
              <Image
                src="/images/dance-court-footer-group.webp"
                alt="Children and adults posing together inside the Rhythmic Beat Dance Court studio"
                width={1217}
                height={1406}
                sizes="(max-width: 767px) 90vw, 42vw"
                className={styles.cardPhoto}
              />
            </div>

          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={`wrap ${styles.footerTop}`}>
          <div className={styles.footerBrand}>
            <a href="#" className={styles.footLogoLockup} aria-label="Rhythmic Beat Dance Court home">
              <Image src="/logo/rb-dance-court.webp" alt="Rhythmic Beat Dance Court logo" width={384} height={384} className={styles.footLogo} />
            </a>
            <p className={styles.footBlurb}>
              Founded in Trichy in 2004. Dance and fitness in Chennai, with a shared passion for rhythm, expression and performance.
            </p>
          </div>

          <div className={styles.footReach}>
            <div className={styles.footPhone}>
              <a href="tel:+919655551055">+91 9655551055</a>
            </div>
            <div className={styles.socialIcons}>
              <a href="https://www.facebook.com/Rhythmicbeatdancecourt/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.9h2.6l.4-3.1h-3V8c0-.9.2-1.5 1.6-1.5h1.5V3.7c-.3 0-1.3-.1-2.4-.1-2.3 0-3.9 1.4-3.9 4v2.4H7.7v3.1h2.6V21h3.2Z"/></svg>
              </a>
              <a href="https://www.instagram.com/rhythmicbeatdancecourt/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://www.youtube.com/channel/UCaSrc8LKkd6rAzypRxKM7Zg" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10.4 9.2v5.6l4.9-2.8-4.9-2.8Z" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://twitter.com/rbdancecourt" target="_blank" rel="noopener noreferrer" aria-label="X">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M13.6 10.4 20.3 3h-2l-5.8 6.4L7.9 3H3l7 9.8L3 21h2l6.2-6.8 5 6.8H21l-7.4-10.6Z"/></svg>
              </a>
              <a href="mailto:rbdancecourt@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email Dance Court">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 3C7.3 3 4.3 6.2 4.3 10c0 2.2 1.2 4.6 3 5.4.2.1.4 0 .4-.3l.4-1.4c.1-.2 0-.3-.1-.5-.5-.7-.8-1.6-.8-2.8 0-2.8 2.1-5.4 5.5-5.4 3 0 5 1.8 5 4.5 0 3-1.5 5.2-3.6 5.2-1.1 0-2-1-1.7-2 .3-1.4.9-2.9.9-3.9 0-.9-.5-1.6-1.5-1.6-1.2 0-2.1 1.2-2.1 2.9 0 1 .3 1.7.3 1.7l-1.4 5.9c-.4 1.7-.1 3.9-.1 4.1.1.1.2.1.3 0 .1-.1 1.2-1.6 1.6-3.1l.6-2.4c.4.7 1.5 1.3 2.6 1.3 3.5 0 5.9-3.1 5.9-7.3C19.5 6.1 16.3 3 12 3Z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className={`wrap ${styles.footerGrid}`}>
          <nav aria-label="Footer — About">
            <FootGroup label="About" collapsed={collapsed}>
              <a href="#welcome">Our studio story</a>
              <a href="#book">Explore our dance classes</a>
              <a href="#gallery">Life at Dance Court</a>
              <a href="#instagram">Follow our studio journey</a>
              <a href="https://wa.me/919655551055?text=Hi%20Dance%20Court%2C%20I%20have%20a%20question%20about%20your%20classes.">Ask a class question</a>
            </FootGroup>
          </nav>
          <nav aria-label="Footer — Learning">
            <FootGroup label="Learning" collapsed={collapsed}>
              <a href="#book">Batch enquiries</a>
              <a href="https://wa.me/919655551055">Online classes</a>
              <a href="https://wa.me/919655551055">Workshop enquiries</a>
              <a href="https://wa.me/919655551055?text=Hi%20Dance%20Court%2C%20please%20help%20me%20choose%20a%20class.">Help choosing a class</a>
              <a href="https://wa.me/919655551055?text=Hi%20Dance%20Court%2C%20could%20you%20share%20class%20timings%20and%20fees%3F">Class timings & fees</a>
            </FootGroup>
          </nav>
          <nav aria-label="Footer — Locations">
            <FootGroup label="Locations" collapsed={collapsed}>
              <a href="tel:+919655551055">Chennai · Valasaravakkam</a>
              <a href="tel:+917338822355">Pondicherry</a>
              <a href="#welcome">Founded in Trichy</a>
              <a href="https://wa.me/919655551055?text=Hi%20Dance%20Court%2C%20could%20you%20share%20directions%20to%20your%20Chennai%20studio%3F">Chennai studio directions</a>
              <a href="tel:+917338822355">Pondicherry class enquiries</a>
            </FootGroup>
          </nav>
          <nav aria-label="Footer — Connect">
            <FootGroup label="Connect" collapsed={collapsed}>
              <a href="#book">Zumba & fitness</a>
              <a href="https://wa.me/919655551055">Yoga enquiries</a>
              <a href="mailto:rbdancecourt@gmail.com">Email the studio</a>
              <a href="tel:+919655551055">Call our Chennai team</a>
              <a href="https://wa.me/919655551055">Chat with us on WhatsApp</a>
            </FootGroup>
          </nav>
          <nav aria-label="Footer — Follow us">
            <FootGroup label="Follow us" collapsed={collapsed}>
              <a href="https://www.instagram.com/rhythmicbeatdancecourt/">Instagram</a>
              <a href="https://www.facebook.com/Rhythmicbeatdancecourt/">Facebook</a>
              <a href="https://www.youtube.com/channel/UCaSrc8LKkd6rAzypRxKM7Zg">YouTube</a>
              <a href="https://twitter.com/rbdancecourt">X updates</a>
              <a href="#instagram">Latest from the studio</a>
            </FootGroup>
          </nav>
        </div>
        <div className={`wrap ${styles.footBottom}`}>
          <div className={styles.footCopyright}>
            <span>Copyrights © 2026. Rhythmic Beat Dance Court. All Rights Reserved</span>
          </div>
          <span>Developed by Mohan</span>
        </div>
        <div className={styles.bigMark} aria-hidden="true">
          <div className={styles.markTrack}>
            <span>rhythmicbeat</span>
            <span>rhythmicbeat</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
