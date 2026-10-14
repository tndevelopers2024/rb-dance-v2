<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Zero Gravity Photography — Agent Instructions

> **Source:** [`zerogravity-photography-site-audit.md`](file:///Users/mohan/Developer/Projects/zerogravity.photography-next.js/zerogravity-photography-site-audit.md)
> **Project:** Next.js (App Router) rebuild of https://zerogravity.photography/

---

## 1 · Project Context

| Key | Value |
|---|---|
| **Industry** | Wedding & event photography — South Asian diaspora market |
| **Target audience** | Engaged couples (Tamil / broader Indian diaspora), planning weddings in India (Chennai, Bangalore, Coimbatore, Hyderabad, etc.) and abroad (London, UK, US) |
| **Brand personality** | Warm, emotional, aspirational — "premium candid storytelling studio" with a personal touch |
| **Tone of voice** | Informal-warm, second person ("your wedding day"), emotionally rich — never corporate or generic |
| **Primary CTA** | "Book Us Now" / phone / WhatsApp — must be persistent and unambiguous on every page |
| **Brand name asset** | "Zero Gravity" is distinctive — lean into a floating / weightless visual motif wherever design allows |

---

## 2 · Design System & Tokens

The design system lives in `app/globals.css` using CSS custom properties. Always use these tokens — never introduce ad-hoc hex values, font stacks, or spacing magic numbers.

### 2.1 Color Tokens (already defined)
- Light & dark themes exist via `[data-theme]` and `prefers-color-scheme`.
- Brand palette drawn from `Palette.txt`: pinks/magentas (`#e92e96`, `#c8418a`, `#cd679c`, etc.) on warm ivory (`#fbf8f5`).
- Primary accent: `--accent` / `--accent-strong`.
- Text: `--ink`, `--ink-muted`, `--ink-faint`.
- Surfaces: `--bg`, `--bg-raised`.
- Borders: `--hairline`.
- **Rule:** Every color MUST pass WCAG AA contrast against its intended background. Verify contrast when adding or changing any color token.

### 2.2 Typography
- **Sans:** Manrope (`--font-sans`) — body copy, buttons, eyebrows, nav.
- **Serif:** Fraunces (`--font-serif`) — display headings (`.display`), italic accent text (`.serif-i`).
- **Rule:** No other font families. No raw `font-family` declarations — use the CSS variables.

### 2.3 Spacing & Layout
- Max-width container: `--maxw: 1360px` with responsive pad `--pad`.
- Section rhythm: `.section-pad` = `clamp(100px, 15vh, 190px)`.
- **Rule:** Use 4/8/16/24/32/48/64px spacing scale (multiples of 8 preferred). Use `clamp()` for responsive values.

### 2.4 Component Patterns
- **Buttons:** `.btn` (base) → `.btn-solid` (primary) / `.btn-line` (secondary). Pill-shaped (`border-radius: 999px`).
- **Links:** `.u-link` with animated underline.
- **Eyebrow labels:** `.eyebrow` with leading rule; `.eyebrow-plain` without.
- **Scroll reveals:** `data-reveal` attribute + `.is-in` class (IntersectionObserver). Gated on `html.has-reveal` so content is never hidden without JS.
- **Rule:** Reuse these existing utility classes. Do not create one-off button or heading styles.

---

## 3 · Component Architecture

All components live in `/components/` as `.tsx` + `.module.css` pairs. Follow the existing pattern.

### 3.1 Current Component Inventory
| Component | File | Purpose |
|---|---|---|
| Nav | `Nav.tsx` | Sticky header with logo, mega-menu, phone CTA, Book Us Now button |
| Hero | `Hero.tsx` | Full-bleed video hero with overlay text + primary CTA |
| Welcome | `Welcome.tsx` | Studio introduction / brand story |
| Manifesto | `Manifesto.tsx` | Brand philosophy statement |
| Stats | `Stats.tsx` | Animated stat counters (locations, weddings, etc.) |
| WhyUs | `WhyUs.tsx` | 4-card value proposition grid |
| FilmBlock | `FilmBlock.tsx` | Cinematic film/video showcase |
| Stories | `Stories.tsx` | Named couple story spotlight cards |
| Testimonials | `Testimonials.tsx` | Testimonial carousel with named reviews |
| Instagram | `Instagram.tsx` | Instagram feed grid |
| Faq | `Faq.tsx` | FAQ accordion |
| GalleryRail | `GalleryRail.tsx` | Horizontal scrolling gallery |
| Traditions | `Traditions.tsx` | Ceremony type showcase |
| Blog | `Blog.tsx` | Recent blog posts |
| Closing | `Closing.tsx` | Mega-footer with contact, nav columns, social links |
| Preloader | `Preloader.tsx` | Page load animation |
| SmoothScroll | `SmoothScroll.tsx` | Lenis smooth scroll wrapper |
| ScrollReveals | `ScrollReveals.tsx` | IntersectionObserver for `data-reveal` elements |
| ThemeToggle | `ThemeToggle.tsx` | Dark/light mode toggle |

### 3.2 Rules for Components
1. **One component = one concern.** Don't merge unrelated sections.
2. **CSS Modules only** — no inline styles, no Tailwind, no global class leakage (except shared utilities from `globals.css`).
3. **Server Components by default.** Only add `"use client"` when the component needs browser APIs, event handlers, or React hooks.
4. **All images use `next/image`** with descriptive `alt` text. Photography is the core product — empty or missing alt text is unacceptable.
5. **All videos** must have: a static `poster` image, `muted` + `playsInline` attributes, and the component must honor `prefers-reduced-motion` (show poster only).

---

## 4 · Accessibility (WCAG 2.2 — Mandatory)

These are non-negotiable. Every PR must satisfy:

### 4.1 Headings
- Strict hierarchy: `H1` → `H2` → `H3`. **No skipped levels** (the old site jumped H2→H4 — don't repeat this).
- Only one `H1` per page.
- Footer nav labels should NOT be headings — use `<strong>` or `<nav aria-label="...">`.

### 4.2 Images & Media
- **Every** `<img>` / `next/image` must have meaningful `alt` text. For portfolio photos: describe the scene (e.g., "Bride and groom during the Haldi ceremony at a Chennai outdoor wedding").
- Decorative images: `alt=""` + `aria-hidden="true"`.
- Hero video: provide a pause/stop button. Show static poster when `prefers-reduced-motion: reduce`.

### 4.3 Interactive Elements
- All icon-only buttons (e.g., menu toggles, close icons, social links) must have `aria-label`.
- No duplicate link text — each link must have a unique, descriptive accessible name. The old Instagram section had 7 identical "Click Here" links — never do this.
- All interactive elements must have visible `:focus-visible` styles.
- Keyboard navigation must work for the mega-menu, carousel, accordion, and modal/popups.

### 4.4 Motion
- `prefers-reduced-motion: reduce` is handled globally in `globals.css`. Ensure all new animations are inside standard CSS transitions/animations (not JS `requestAnimationFrame` loops that bypass the media query).
- The grain animation is already gated. Keep it that way.

### 4.5 Forms (for future pages like Book Us Now)
- Every input must have a visible `<label>`.
- Required fields must be indicated both visually and with `aria-required="true"`.
- Error messages must be programmatically associated with their field (`aria-describedby`).

### 4.6 Language
- `<html lang="en">` is correctly set — preserve this.

---

## 5 · SEO Requirements

### 5.1 Critical Fix (from Audit §14 — highest priority)
- **Canonical domain:** The live site had canonical tags pointing to `zerogravity.group` instead of `zerogravity.photography`. In this rebuild, all canonical URLs must point to the correct production domain. Never mix domains.

### 5.2 Metadata (per-page)
- Every page must export a `metadata` object with:
  - `title` — descriptive, under 60 characters (the old About page was 90+ chars — don't repeat this).
  - `description` — compelling, under 155 characters.
  - `openGraph` — title, description, image (with dimensions), type, url.
  - `twitter` — card type `summary_large_image`.
- Use Next.js `generateMetadata()` for dynamic routes.

### 5.3 Structured Data
Add JSON-LD structured data where applicable:
- `Organization` — sitewide (in layout).
- `LocalBusiness` — on each city/location page (9+ cities).
- `FAQPage` — on the FAQ section/page.
- `Review` / `AggregateRating` — only if backed by a verifiable review platform (Google Business Profile, etc.). **Do not fabricate ratings.**

### 5.4 Heading Hierarchy
- Already covered in §4.1 above — this is both an accessibility AND SEO requirement.

### 5.5 Internal Linking
- The old site's strength was dense internal linking via the mega-menu and footer. Preserve this in the rebuild — every ceremony type, city, and content category should be linked from nav and footer.

---

## 6 · Performance Standards

### 6.1 Targets
| Metric | Budget |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |

### 6.2 Rules
1. **Server-render all proof content.** The stat counters (`Stats.tsx`) must render real numbers in the initial HTML. Animate as progressive enhancement only — a user with JS disabled or slow connection must never see "0 Weddings".
2. **No duplicate DOM.** The old site shipped two copies of the entire mega-menu (desktop + mobile). This rebuild must use a single nav structure with CSS-only responsive behavior, or a client-side toggle — never duplicate markup.
3. **Lazy-load below-the-fold images** — `next/image` handles this by default with `loading="lazy"`. Only the hero/above-fold images should be `priority`.
4. **Video optimization:**
   - Compress and re-encode hero videos to a sensible bitrate.
   - Always provide a `poster` image so the browser can paint the hero immediately.
   - Consider `IntersectionObserver` for off-screen video sections — don't auto-load video the user hasn't scrolled to.
5. **No heavy third-party bloat.** The old site required NitroPack to paper over WordPress/Elementor weight. This Next.js rebuild should be lean by default. Keep the bundle small.

---

## 7 · Content Quality Rules

1. **No placeholder text.** The old site had literal "Accordion Content" visible in the FAQ — audit all rendered content for CMS artifacts, Lorem Ipsum, or default strings.
2. **Consistent tone.** Warm, emotional, second-person. Avoid sudden shifts to casual ("Yeah, we also provide…") or overly corporate ("high level of professionalism… reliable, punctual, and organised").
3. **Fix grammar.** Watch for comma-splices and subject–complement mismatches (the old copy had "our techniques… let you be completely yourself" — techniques don't let people "be themselves").
4. **Scannable copy.** Break dense paragraphs into 2–3 short value pillars with headings or visual separators. No wall-of-text introductions.
5. **Asset naming.** Use correct, descriptive filenames. Fix typos like "thumnail1.webp" → "thumbnail1.webp" on any asset refresh.

---

## 8 · Navigation & Information Architecture

### 8.1 Mega-Menu Structure
The old nav was overloaded: 6 flat top-level items with 70+ links. The rebuild should:
- **Group links visually** into 2–3 columns per dropdown: "By Tradition" / "By Location" / "By Content Type".
- **Rename "Others"** to meaningful labels (e.g., split into "Company" and "Resources").
- **Limit top-level items** to 5–6 max, each with a clear label.

### 8.2 Footer
- Mega-footer is good for SEO internal linking — keep it rich.
- Footer nav labels should use `<strong>` or styled `<span>`, NOT heading tags (the old site used `H2` for footer column labels, diluting page topical signal).

### 8.3 Mobile Navigation
- Single off-canvas/accordion drawer (not a second copy of the entire menu DOM).
- Touch targets ≥ 44×44px.

---

## 9 · Prioritized Task Roadmap

Derived from audit §25. Items are ordered by impact. When working on this project, prioritize in this order:

### 🔴 High Priority
1. Ensure all canonical URLs point to the correct domain — never cross-reference `zerogravity.group` or `zgstudios.com`.
2. Server-render real stat counter values — no JS-dependent "0" fallbacks.
3. Add meaningful `alt` text to every portfolio image.
4. Add `aria-label` to all icon-only interactive elements (menu toggle, social links, popup triggers).
5. Ensure no duplicate link text (especially Instagram grid links).
6. Fix heading hierarchy — strict H1→H2→H3, no skipped levels, no heading tags in the footer nav.
7. Add structured data: `Organization` (sitewide), `FAQPage` (FAQ), `LocalBusiness` (city pages).
8. Hero video must have pause control + `prefers-reduced-motion` fallback with poster image.
9. Add a cookie/consent mechanism if the site will serve UK/US traffic with tracking scripts.
10. Compress hero videos; add static poster images for LCP.

### 🟡 Medium Priority
11. Reorganize mega-menu into visually grouped columns.
12. Replace "Others" nav label with meaningful names.
13. Add inline enquiry form on high-intent pages (gallery, location pages).
14. Break dense intro copy into scannable value-pillar blocks.
15. Standardize copy tone — remove casual register inconsistencies.
16. Add a "Team" section/page beyond the founder alone.
17. Add breadcrumb navigation for deep city/ceremony URL structures.
18. Add `Review`/`AggregateRating` schema (only from verifiable review platform).
19. Introduce the "zero gravity" floating visual motif to leverage the brand name.
20. OG images: standardize dimensions/quality across all pages.

### 🟢 Low Priority
21. Add subtle scroll-reveal micro-animations (already partially implemented via `data-reveal`).
22. Add "back to top" button on long pages.
23. Add social-share buttons on blog posts.
24. Explore Pinterest-optimized image integration.
25. Add a print/PDF-friendly pricing overview page.

---

## 10 · File & Folder Conventions

```
app/
  (marketing)/           → Route group for public marketing pages
    page.tsx             → Homepage
    about/page.tsx       → About page
    weddings/[type]/     → Dynamic ceremony-type pages
    locations/[city]/    → Dynamic city pages
    gallery/[category]/  → Dynamic gallery category pages
    destination-weddings/[country]/
    blog/[slug]/
    book-us-now/page.tsx → Booking form (primary conversion endpoint)
  layout.tsx             → Root layout (fonts, theme, analytics)
  globals.css            → Design tokens, resets, shared utilities

components/
  *.tsx + *.module.css    → Component pairs

public/
  logo/                  → Brand logo assets
  video/                 → Compressed hero videos + poster images
  images/                → Portfolio and editorial photography
```

### Rules
- **No files in root** that aren't config. Content goes in `app/`, components in `components/`, assets in `public/`.
- **Dynamic routes** use `generateStaticParams()` for static generation where possible.
- **Route groups** `(marketing)` keep the URL structure clean without adding path segments.

---

## 11 · Testing & Verification

Before any PR is considered complete:

1. **Build succeeds:** `npm run build` with zero errors.
2. **Accessibility:** Run axe DevTools or WAVE against the dev server — zero critical/serious violations.
3. **Performance:** Run Lighthouse in CI or locally — must meet the budgets in §6.1.
4. **Visual check:** Dark mode and light mode both render correctly.
5. **Responsive:** Check at 375px, 768px, 1024px, and 1440px breakpoints.
6. **Content:** No placeholder text, no "0" stat counters, no broken images.
