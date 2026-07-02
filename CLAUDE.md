# CLAUDE.md — Project Context for AI Assistants

> Drop-in context file so any AI coding tool (Claude Code, Cursor, Copilot, etc.) can understand this
> project immediately on a fresh machine. If your tool reads `AGENTS.md` instead, copy this file to that name.

---

## 1. TL;DR

**porti** is the source for **Gregory Peter Yanoc's personal developer portfolio** — a **static, build-less
website** (plain HTML + CSS + vanilla JS) based on the BootstrapMade **iPortfolio** template.

- **Live site:** https://gdyportfolio.vercel.app/
- **Repo:** https://github.com/crougheinman/gdyportfolio.git (local folder name is `porti`)
- **Hosting:** Vercel (static deploy from the repo root — no build/CI step) at `gdyportfolio.vercel.app`
- **No package.json, no bundler, no framework.** You edit HTML/CSS/JS and push; Vercel publishes.
- **Owner contact in-page:** gregorypeteryanoc.gpy@gmail.com · LinkedIn `gregory-peter-yanoc` · GitHub `crougheinman`

### Most important thing to know
The homepage is **data-driven by inline JavaScript arrays** inside `index.html`. Skills, the hero tech-icon
strip, and the portfolio grid are **not** hand-written HTML — they are rendered at runtime from JS arrays
(`skills`, `skillBrands`, `portfolioItems`). **To add/change a project or skill, edit those arrays**, not markup.

---

## 2. How to run it locally

The site uses `fetch("header.html")` to inject the shared sidebar/nav. `fetch` is blocked under the
`file://` protocol (CORS), **so opening `index.html` directly in a browser will load with no header/nav.**
You must serve over HTTP:

```bash
# pick any one (run from the project root)
python -m http.server 8000        # Python 3 (Python is installed on this machine)
npx serve .                       # Node (Node/npx are installed on this machine)
# or: VS Code "Live Server" extension → "Go Live"
```

Then open http://localhost:8000 . There is **no test suite, linter, or build command** — verification is visual/manual in the browser.

---

## 3. Tech stack

| Layer        | What's used |
|--------------|-------------|
| Markup       | Static HTML5 (one page per project + `index.html`) |
| Styling      | `assets/css/style.css` (customized iPortfolio) + Bootstrap 5.3 + large inline `<style>` block in `index.html` `<head>` |
| JS (app)     | Vanilla JS. Template behaviors in `assets/js/main.js`; **all dynamic data + rendering is inline in `index.html`** |
| UI libraries | Bootstrap 5.3, Bootstrap Icons, Boxicons, AOS (scroll anim), Swiper (sliders), Isotope (portfolio filter), GLightbox (lightbox), Typed.js (hero typing), Waypoints, PureCounter |
| CDN runtime  | particles.js (mobile-only hero background, jsDelivr), SweetAlert (form alerts, unpkg), Google Fonts, `cdn.simpleicons.org` (tech/skill logos, fetched per-icon at runtime) |
| Backend      | **None.** The contact form POSTs to a **Google Apps Script** web app that appends rows to a Google Sheet. |
| Hosting      | Vercel (static) — `gdyportfolio.vercel.app` |

---

## 4. Directory / file map

```
porti/
├── index.html                     # Homepage. Contains ALL dynamic data arrays + inline <style> + inline scripts. ~1850 lines.
├── header.html                    # Shared sidebar: profile, social links, nav. Injected via fetch() into #header-placeholder on every page.
├── CLAUDE.md                      # ← this file
│
├── <project>-portfolio*.html      # One standalone "portfolio details" page per project (see §6). Each has breadcrumbs + a Swiper image slider.
│   ├── m2g-portfolio.html             # Mattres2Go (React e-commerce)
│   ├── copa-portfolio.html            # Copa Mattress & Furniture (React e-commerce)
│   ├── rd-webflow-portfolio.html      # Remarkable Destinations (Webflow)
│   ├── gs-webflow-portfolio.html      # Get Sendy (Webflow)
│   ├── cb-portfolio-details.html      # Carbnb (Vue/Quasar)
│   ├── cb-admin-portfolio-details.html# Carbnb Admin (CodeIgniter/PHP)
│   ├── cb-loansys-portfolio-details.html # YL Loan System (CodeIgniter/PHP)
│   ├── peb-portfolio-details.html     # Personal Expense Budgeting (Angular/Firebase)
│   ├── watchy-portfolio-details.html  # Watchy streaming app (React/TS/Vite/Capacitor/Supabase)
│   └── entity-portfolio-details.html  # Entity Duel / LeafWar — React trading card game (React/Vite/Zustand/Supabase)
│
├── about.html, inner-page.html, sample-page.html  # UNUSED template leftovers (marked noindex)
├── ac-portfolio-details.html, cb-tradmin-portfolio-details.html  # ORPHANED: commented out of portfolioItems, not linked (noindex)
│
├── robots.txt                     # SEO: allows crawl, points to sitemap
├── sitemap.xml                    # SEO: lists all indexable pages
│
└── assets/
    ├── css/style.css              # the real stylesheet used by every page
    ├── js/main.js                 # iPortfolio template JS (nav scroll-spy, sliders init, AOS, etc.)
    ├── img/                        # images (web screenshots compressed; see §9). NOTE: also contains large source .psd files
    │   ├── portfolio/             # project thumbnails + detail-slider screenshots (portfolio-*.png/jpg)
    │   ├── skills/                # local skill logos (oracle.svg, flask.svg)
    │   └── testimonials/
    └── vendor/                    # all UI libraries listed above, served locally
```

> **Path convention:** every page references assets via the `assets/...` prefix. (Root-level `css/`, `js/`,
> `vendor/`, `forms/`, `scss/`, and `img/` duplicate dirs from the template were **removed** — they were dead/unused.)

---

## 5. How the homepage renders (architecture)

`index.html` is split into three concerns, all in one file:

1. **`<head>`** — meta tags (SEO, OG/Twitter), favicons, Google Fonts, vendor CSS, `assets/css/style.css`,
   then a **large inline `<style>`** that redesigns the Skills and Contact sections.
2. **`<body>`** — section shells (`#hero`, `#about`, `#facts`, `#portfolio`, `#services`, `#skills`,
   `#resume`, `#testimonials`, `#contact`). Several sections (`about`, `facts`, `resume`, `testimonials`,
   and the header `profile` block) carry a **`hide` class** and are intentionally not shown.
   The portfolio grid (`.portfolio-container`), filter list (`#portfolio-flters`), skills list (`#skills-list`),
   and hero icon strip (`#skills-brands`) are **empty containers** filled by JS.
3. **Inline `<script>` blocks (bottom of file)** do the real work:
   - `skillBrands[]` → renders the hero tech-logo strip.
   - `skills[]` (categorized, each with `percent`) + `skillBrandMap{}` → renders animated skill cards
     (bars animate via `IntersectionObserver`).
   - `portfolioItems[]` + `techIconMap{}` → renders portfolio cards, and **auto-generates the filter chips**
     from the union of every item's `techStack`. Isotope handles filtering.
   - Contact form handler → `fetch(scriptURL, {method:"POST", body:FormData})` to the Google Apps Script,
     then SweetAlert feedback.
   - Birthday easter egg (hardcoded DOB 1991-07-08), `document.referrer` capture, mobile-only particles.js.
   - Hero green smoke (**desktop only**, last `<script>`): a WebGL fbm shader renders drifting green/teal smoke
     (matches the site's `#008184` accent) on `#smoke-canvas` at 0.4 opacity over the hero background; **GSAP**
     (CDN, SRI-pinned) drives the loop/fade/breathing. Gated to `(min-width: 769px)` so the mobile hero
     (particles.js + photo) is untouched; static frame under `prefers-reduced-motion`.
   - `fetch("header.html")` → injects shared header, then re-executes its `<script>` tags manually.

Detail pages are simpler: shared `<head>`, `#header-placeholder` (same fetch in `header.html`'s consumer),
breadcrumbs, then a case-study layout — a **full-width hero carousel** (`.pd-hero` > `.portfolio-details-slider`
Swiper) followed by a `.pd-body` row: `.pd-main` (col-lg-8, the `.portfolio-description` blocks) + `.pd-side`
(col-lg-4, the sticky `.portfolio-info` card). Each is **hand-maintained standalone HTML**.

---

## 6. Common edit recipes

**Add / edit a portfolio project**
1. Add an entry to `portfolioItems[]` in `index.html` (`filter`, `imgSrc`, `lightboxHref`, `lightboxTitle`,
   `detailsHref`, `techStack`). New `techStack` values auto-create filter chips — add the logo URL to
   `techIconMap{}` if the tech is new.
2. Add the thumbnail/screenshots under `assets/img/portfolio/`.
3. Create the matching `*-portfolio*.html` details page (copy an existing one as a template).
4. Add the new page to `sitemap.xml` and give it unique SEO `<head>` tags (see §8).

**Add / edit a skill** → edit `skills[]` (category + `percent`) and `skillBrandMap{}` (logo URL) in `index.html`.

**Change the nav or profile/social links** → edit `header.html` (shared across all pages).

**Change the contact form destination** → `scriptURL` constant in `index.html`'s bottom inline script
(Google Apps Script web-app URL).

---

## 7. External dependencies & integrations (don't break these)

- **Google Apps Script endpoint** (`scriptURL` in `index.html`) — receives contact-form POSTs. Form field
  `name` attributes (`name`, `email`, `subject`, `message`, `referrer`) must match the Sheet columns.
- **`cdn.simpleicons.org`** — most tech/skill logos are hot-linked by color (e.g. `/react/61DAFB`).
  Offline → missing logos. Local fallbacks live in `assets/img/skills/`.
- **CDN scripts** (SweetAlert, particles.js) are pinned with **SRI `integrity` hashes** — if you bump a
  version, recompute the hash or the browser will refuse to load the script.
- **Google Fonts** — Open Sans / Raleway / Poppins.

---

## 8. SEO setup (already wired)

- Per-page unique `<title>`, `<meta name="description">`, canonical, OG/Twitter tags.
- `robots.txt` + `sitemap.xml` at root (base URL `https://gdyportfolio.vercel.app/`).
- JSON-LD structured data in `index.html`: `Person` (+ `sameAs` socials, `knowsAbout` skills) and `WebSite`.
- Unused/orphan pages (`about`, `inner-page`, `sample-page`, `ac-portfolio-details`, `cb-tradmin-…`) carry
  `<meta name="robots" content="noindex,follow">` to keep thin/duplicate pages out of the index.
- When adding a page: set a unique title + description + canonical, add it to `sitemap.xml`.

---

## 9. Known issues, gotchas & tech debt

- **Repo is heavy (~100 MB+ of git history).** Large **Photoshop sources** (`assets/img/*.psd`,
  ~97 MB total: `Intro.psd`, `pogi.psd`, `DSCF9279.psd`, `DSCF92792.psd`) are committed. They are **not used
  by the site** and bloat clones. Consider removing them from the working tree and history (git-lfs or
  `git filter-repo`). Left in place for now (out of scope of the last cleanup pass). The **web images**
  under `assets/img/` were already compressed (~49% smaller, capped at 1600px); the PSDs are what remain heavy.
- **Accidentally committed file:** `assets/img/Meta Tags — Preview, Edit and Generate.html` + its `_files/`
  folder — a saved webpage. Safe to delete.
- **`file://` won't show the header** (fetch/CORS) — always serve over HTTP locally.
- **No build/test/lint.** Verify changes by eye in the browser.
- **Inline data in `index.html`** (~600 lines of JS data) would be cleaner extracted to a `data.js`/JSON file.
- **Detail pages are duplicated boilerplate** — a single data-driven template would reduce maintenance.
- **Contact form** has no captcha/rate-limit (open POST sink); acceptable for a personal site but spammable.

---

## 10. Conventions

- 2-space indentation in HTML/JS; double quotes in JS.
- Reference assets with the `assets/...` prefix.
- Keep shared chrome (nav, profile, social) in `header.html` only — never duplicate per page.
- Image filenames in `assets/img/portfolio/` follow `portfolio-<n>.<ext>` (cards) and
  `portfolio-details-<n>-<project>.<ext>` (detail sliders).
