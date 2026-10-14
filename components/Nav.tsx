"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Nav.module.css";

const MENU = [
  {
    label: "Home",
    href: "/",
    columns: []
  },
  {
    "label": "Dance",
    "href": "#book",
    "columns": [
      {
        "title": "Dance styles",
        "links": [
          {
            "label": "Bharatanatyam",
            "href": "#book"
          },
          {
            "label": "Hip Hop",
            "href": "#book"
          },
          {
            "label": "B-Boying",
            "href": "#book"
          },
          {
            "label": "Urdhvam",
            "href": "#book"
          },
          {
            "label": "International styles",
            "href": "#book"
          }
        ]
      },
      {
        "title": "Your journey",
        "links": [
          {
            "label": "Our approach",
            "href": "#book"
          },
          {
            "label": "Class enquiries",
            "href": "#book"
          }
        ]
      }
    ]
  },
  {
    "label": "Fitness",
    "href": "#book",
    "columns": [
      {
        "title": "Move with us",
        "links": [
          {
            "label": "Zumba & aerobics",
            "href": "#book"
          },
          {
            "label": "Rhythmic Beat Workout",
            "href": "#book"
          },
          {
            "label": "Yoga enquiries",
            "href": "#book"
          }
        ]
      }
    ]
  },
  {
    "label": "Gallery",
    "href": "#gallery",
    "columns": [
      {
        "title": "Explore",
        "links": [
          {
            "label": "Gallery highlights",
            "href": "#gallery"
          },
          {
            "label": "Performance videos",
            "href": "https://www.youtube.com/channel/UCaSrc8LKkd6rAzypRxKM7Zg"
          },
          {
            "label": "Follow on Instagram",
            "href": "#instagram"
          }
        ]
      }
    ]
  },
  {
    "label": "Learning",
    "href": "#book",
    "columns": [
      {
        "title": "Classes",
        "links": [
          {
            "label": "Batch enquiries",
            "href": "#book"
          },
          {
            "label": "Online class enquiries",
            "href": "https://wa.me/919655551055"
          },
          {
            "label": "Workshop enquiries",
            "href": "https://wa.me/919655551055"
          }
        ]
      },
      {
        "title": "Getting started",
        "links": [
          {
            "label": "Talk to the team",
            "href": "#book"
          }
        ]
      }
    ]
  },
  {
    "label": "Locations",
    "href": "#book",
    "columns": [
      {
        "title": "Find us",
        "links": [
          {
            "label": "Chennai · Valasaravakkam",
            "href": "tel:+919655551055"
          },
          {
            "label": "Pondicherry",
            "href": "tel:+917338822355"
          }
        ]
      },
      {
        "title": "Our beginnings",
        "links": [
          {
            "label": "Founded in Trichy",
            "href": "#welcome"
          }
        ]
      }
    ]
  },
  {
    "label": "About",
    "href": "#welcome",
    "columns": [
      {
        "title": "The studio",
        "links": [
          {
            "label": "Our story",
            "href": "#welcome"
          },
        ]
      },
      {
        "title": "Connect",
        "links": [
          {
            "label": "Class enquiries",
            "href": "#book"
          },
          {
            "label": "Email the studio",
            "href": "mailto:rbdancecourt@gmail.com"
          }
        ]
      }
    ]
  }
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  // aceternity's resizable-navbar shrinks the bar into a floating pill once
  // the page has scrolled past 100px — kept distinct from `scrolled` (40px)
  // so the background/ink swap for hero legibility still arrives early
  const [pill, setPill] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setPill(y > 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Animate the flyout to the active panel's height, apple.com-style:
  // duration scales with the distance travelled (~0.2s + 0.1ms per px)
  useEffect(() => {
    const el = megaRef.current;
    if (!el) return;
    const idx = MENU.findIndex((m) => m.label === hoveredLabel);
    const panel = idx >= 0 ? panelRefs.current[idx] : null;
    const target = panel ? panel.offsetHeight : 0;
    const delta = Math.abs(target - el.offsetHeight);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.style.transitionDuration = reduceMotion
      ? "0.01s"
      : `${Math.min(0.34, 0.2 + delta / 10000)}s`;
    el.style.height = `${target}px`;
  }, [hoveredLabel]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setHoveredLabel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setHoveredLabel(null);
    }, 150); // slight delay to allow moving mouse to the dropdown
  };

  return (
    <header
      className={[
        styles.nav,
        scrolled || hoveredLabel ? styles.scrolled : "",
        pill ? styles.pill : "",
      ].join(" ")}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={[styles.curtain, hoveredLabel ? styles.curtainOpen : ""].join(" ")}
        aria-hidden="true"
      />
      <div className={styles.inner}>
        <a
          href="#"
          className={styles.logo}
          aria-label="Rhythmic Beat Dance Court home"
          onMouseEnter={handleMouseLeave}
        >
          <Image src="/logo/rb-dance-court.webp" alt="Rhythmic Beat Dance Court logo" width={384} height={384} />
        </a>

        <nav
          className={styles.links}
          aria-label="Primary"
        >
          {MENU.map((m) => (
            <a
              key={m.label}
              href={m.href}
              className={m.label === hoveredLabel ? styles.linkActive : ""}
            >
              {m.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions} onMouseEnter={handleMouseLeave}>
          <a href="#book" className={styles.cta}>
            Join us
          </a>
          <button
            className={styles.burger}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={open ? styles.x1 : ""} />
            <span className={open ? styles.x2 : ""} />
          </button>
        </div>
      </div>

      <div
        ref={megaRef}
        className={[
          styles.megaMenu,
          hoveredLabel ? styles.megaMenuOpen : "",
        ].join(" ")}
        onMouseEnter={() => {
          if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        }}
      >
        <div className={styles.megaMenuInnerWrapper}>
          {MENU.map((m, i) => {
            const isActive = m.label === hoveredLabel;
            return (
              <div
                key={m.label}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className={[
                  styles.megaMenuInner,
                  isActive ? styles.megaMenuInnerActive : "",
                ].join(" ")}
              >
                {m.columns?.map((col, idx) => (
                  <div
                    key={idx}
                    className={[
                      styles.megaMenuColumn,
                      idx === 0 ? styles.megaMenuColumnElevated : "",
                    ].join(" ")}
                  >
                    <h4 className={styles.megaMenuTitle}>{col.title}</h4>
                    <ul className={styles.megaMenuList}>
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className={styles.megaMenuLink}
                            onClick={() => setHoveredLabel(null)}
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className={[styles.sheet, open ? styles.sheetOpen : ""].join(" ")}>
        {MENU.map((m, i) => (
          <a
            key={m.label}
            href={m.href}
            style={{ transitionDelay: open ? `${0.06 * i + 0.1}s` : "0s" }}
            className={open ? styles.sheetLinkIn : styles.sheetLink}
            onClick={() => setOpen(false)}
          >
            {m.label}
          </a>
        ))}
        <a
          href="#book"
          className={open ? styles.sheetLinkIn : styles.sheetLink}
          style={{ transitionDelay: open ? "0.34s" : "0s" }}
          onClick={() => setOpen(false)}
        >
          Join us
        </a>
      </div>
    </header>
  );
}
