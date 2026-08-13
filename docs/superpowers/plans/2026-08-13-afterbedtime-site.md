# After Bedtime Projects Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the 10-page bilingual (Italian root / English `/en/`) static arcade-themed studio website for After Bedtime Projects, per the approved design spec.

**Architecture:** Plain static HTML/CSS/JS, no framework, no build step, no backend. One shared stylesheet and one small splash-screen script; every page is a hand-written, self-contained HTML file (nav/footer markup duplicated per file by design — no templating).

**Tech Stack:** HTML5, CSS3 (custom properties, CSS Grid/Flexbox), vanilla JS (ES5-safe), Google Fonts CDN (Press Start 2P). Verification uses `npx html-validate` (HTML) and `python3 -c "import xml.dom.minidom"` (sitemap XML well-formedness) — both invoked on demand, no installed devDependency.

**Spec:** `docs/superpowers/specs/2026-08-13-afterbedtime-site-design.md`

## Global Constraints

These apply to every task and every file below. Exact values — copy verbatim, do not improvise new ones.

- **Palette:** `--c-black: #050505`, `--c-black-soft: #131313`, `--c-white: #f4f1e8`, `--c-gold: #ffb703`, `--c-gold-dim: #cf9100`, `--c-red: #ff3b3b`.
- **Fonts:** headings/buttons/badges/nav use `--font-pixel: "Press Start 2P", monospace` (Google Fonts CDN, loaded on every page). Body copy uses `--font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`. Never apply `--font-pixel` to paragraph-length text — it is reserved for short strings (headings, labels, nav, buttons, badges).
- **Placeholder domain:** `https://afterbedtimeprojects.com` — used in every `canonical`/`hreflang`/sitemap URL, each tagged with `<!-- TODO: replace with real domain once chosen -->` once per file. Domain is an intentionally deferred open item per the spec, not a content placeholder.
- **Contact email:** `gianpaolo.dinino@gmail.com` (real, working address — swap later if a dedicated studio address is set up).
- **Social links:** GitHub / Instagram / X are rendered as non-clickable `.social-placeholder` chips (not dead `href="#"` links), each with `title="Presto disponibile"` (IT) / `title="Coming soon"` (EN), and a single `<!-- TODO: replace placeholders with real profile links once accounts exist -->` comment above the list.
- **Footer line (every page):** IT: `© 2026 After Bedtime Projects. Fatto con orgoglio usando solo puro HTML.` — EN: `© 2026 After Bedtime Projects. Proudly made with just pure HTML.`
- **Nav link set — IT (root pages), in order:** Home (`index.html`) · Vita da DS (`vita-da-ds.html`) · Broodle (`broodle.html`) · Chi sono (`chi-sono.html`) · Contatti (`contatti.html`).
- **Nav link set — EN (`/en/` pages), in order:** Home (`index.html`) · Vita da DS (`vita-da-ds.html`) · Broodle (`broodle.html`) · About (`about.html`) · Contact (`contact.html`).
- **Page pairing (IT ↔ EN, for hreflang and the footer language switch link):**
  - `index.html` ↔ `en/index.html`
  - `chi-sono.html` ↔ `en/about.html`
  - `vita-da-ds.html` ↔ `en/vita-da-ds.html`
  - `broodle.html` ↔ `en/broodle.html`
  - `contatti.html` ↔ `en/contact.html`
- **Image assets (destination filenames under `assets/img/`):** `after-bedtime-logo.png`, `vita-da-ds-logo.png`, `broodle-logo.png` — sourced per Task 1.
- **No inline `<style>` or `<script>` blocks in page files** — all CSS in `assets/css/style.css`, all JS in `assets/js/splash.js` (splash.js is loaded only by the two Home pages).
- **Every external link** (i.e. to `broodle.it`) uses `target="_blank" rel="noopener"`.
- **Accessibility floor:** every `<img>` has descriptive `alt` text; the CRT overlay div has `aria-hidden="true"` and `pointer-events: none` so it never blocks interaction; color pairs used for text must meet WCAG AA (checked in Task 8).

---

## File Structure

```
/
  index.html              (IT home)
  chi-sono.html           (IT about)
  vita-da-ds.html         (IT project page)
  broodle.html            (IT project page)
  contatti.html           (IT contact)
  robots.txt
  sitemap.xml
  .gitignore
  .htmlvalidate.json
  en/
    index.html            (EN home)
    about.html
    vita-da-ds.html
    broodle.html
    contact.html
  assets/
    css/style.css
    js/splash.js
    img/
      after-bedtime-logo.png
      vita-da-ds-logo.png
      broodle-logo.png
```

---

### Task 1: Scaffold, assets, robots.txt

**Files:**
- Create: `.gitignore`
- Create: `.htmlvalidate.json`
- Create: `robots.txt`
- Create: `assets/img/after-bedtime-logo.png` (copied)
- Create: `assets/img/vita-da-ds-logo.png` (copied)
- Create: `assets/img/broodle-logo.png` (copied)

**Interfaces:**
- Produces: the three image paths listed above, referenced by every later page task; `.htmlvalidate.json` config consumed by every validation step in Tasks 3–8.

- [ ] **Step 1: Create the directory structure**

```bash
mkdir -p assets/css assets/js assets/img en
```

- [ ] **Step 2: Verify directories exist**

Run: `find . -maxdepth 2 -type d -not -path './.git*'`
Expected output includes: `./assets/css`, `./assets/js`, `./assets/img`, `./en`

- [ ] **Step 3: Copy the three logo images from the source projects**

```bash
cp /home/geppo/Projects/direttore-sportivo/assets/illustrations/after_bedtime_projects_logo.png assets/img/after-bedtime-logo.png
cp /home/geppo/Projects/direttore-sportivo/assets/illustrations/game_logo.png assets/img/vita-da-ds-logo.png
cp /home/geppo/Projects/doodle-bro/public/broodle-logo.png assets/img/broodle-logo.png
```

- [ ] **Step 4: Verify all three copied files are valid PNGs**

Run: `file assets/img/*.png`
Expected: three lines, each reading `PNG image data`, no errors.

- [ ] **Step 5: Create `.gitignore`**

```
.DS_Store
Thumbs.db
```

- [ ] **Step 6: Create `.htmlvalidate.json`**

```json
{
  "extends": ["html-validate:recommended"]
}
```

- [ ] **Step 7: Create `robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://afterbedtimeprojects.com/sitemap.xml
```

- [ ] **Step 8: Commit**

```bash
git add .gitignore .htmlvalidate.json robots.txt assets/img
git commit -m "Scaffold project structure and copy brand assets"
```

---

### Task 2: Global CSS design system

**Files:**
- Create: `assets/css/style.css`

**Interfaces:**
- Consumes: palette/font tokens from Global Constraints.
- Produces: CSS custom properties (`--c-black`, `--c-black-soft`, `--c-white`, `--c-gold`, `--c-gold-dim`, `--c-red`, `--font-pixel`, `--font-body`) and classes (`.wrap`, `.crt-overlay`, `.site-nav`, `.nav-inner`, `.brand-logo`, `.btn`, `.btn--red`, `.badge`, `.badge--dev`, `.badge--live`, `.project-grid`, `.card`, `.card-logo`, `.hero`, `.hero-logo`, `.tagline`, `.site-footer`, `.footer-inner`, `.lang-switch`, `.social-list`, `.social-placeholder`, `.splash-screen`, `.splash-hidden`, `.splash-inner`, `.splash-logo`, `.splash-blink`, `.splash-hint`) consumed by every page task below.

- [ ] **Step 1: Write `assets/css/style.css`**

```css
/* After Bedtime Projects - arcade cabinet design system */

:root {
  --c-black: #050505;
  --c-black-soft: #131313;
  --c-white: #f4f1e8;
  --c-gold: #ffb703;
  --c-gold-dim: #cf9100;
  --c-red: #ff3b3b;
  --font-pixel: "Press Start 2P", monospace;
  --font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: var(--c-black);
  color: var(--c-white);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
}

img { max-width: 100%; display: block; }

.wrap {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
}

h1, h2, h3 {
  font-family: var(--font-pixel);
  line-height: 1.5;
  color: var(--c-gold);
}

h1 { font-size: 1.6rem; margin: 0 0 20px; }
h2 { font-size: 1.1rem; margin: 40px 0 20px; }
h3 { font-size: 0.9rem; margin: 0 0 12px; }

p { max-width: 65ch; }

a { color: var(--c-gold); }

ul.feature-list {
  padding-left: 1.2em;
  max-width: 65ch;
}
ul.feature-list li { margin-bottom: 10px; }

/* CRT overlay */
.crt-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 900;
  background:
    repeating-linear-gradient(to bottom, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px),
    radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%);
}

/* Nav */
.site-nav {
  border-bottom: 3px solid var(--c-gold);
  padding: 16px 0;
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}
.brand-logo { width: 56px; height: 56px; }
.site-nav nav ul {
  display: flex;
  gap: 18px;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  font-family: var(--font-pixel);
  font-size: 0.6rem;
}
.site-nav nav a {
  color: var(--c-white);
  text-decoration: none;
  padding: 6px 4px;
}
.site-nav nav a:hover, .site-nav nav a:focus {
  color: var(--c-gold);
}
.site-nav nav a[aria-current="page"] {
  color: var(--c-gold);
}
.site-nav nav a[aria-current="page"]::before {
  content: "\25B6";
  margin-right: 6px;
  display: inline-block;
  animation: blink 1s steps(2, start) infinite;
}
@keyframes blink { 50% { opacity: 0; } }

/* Buttons */
.btn {
  display: inline-block;
  font-family: var(--font-pixel);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 14px 18px;
  background: var(--c-gold);
  color: var(--c-black);
  text-decoration: none;
  border: 3px solid var(--c-black);
  box-shadow: 4px 4px 0 var(--c-black), 7px 7px 0 var(--c-white);
  margin: 6px 6px 6px 0;
}
.btn:hover, .btn:focus {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0 var(--c-black), 4px 4px 0 var(--c-white);
}
.btn--red { background: var(--c-red); color: var(--c-white); }

/* Badges */
.badge {
  display: inline-block;
  font-family: var(--font-pixel);
  font-size: 0.55rem;
  padding: 6px 10px;
  margin-bottom: 16px;
  letter-spacing: 1px;
}
.badge--dev { background: var(--c-red); color: var(--c-white); }
.badge--live { background: var(--c-gold); color: var(--c-black); }

/* Cards / project grid */
.project-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin: 32px 0;
}
.card {
  background: var(--c-black-soft);
  border: 3px solid var(--c-gold);
  padding: 24px;
  box-shadow: 6px 6px 0 var(--c-black);
}
.card-logo { width: 96px; height: 96px; margin-bottom: 16px; }

/* Hero */
.hero {
  padding: 60px 0 20px;
  text-align: center;
}
.hero-logo { width: 160px; height: 160px; margin: 0 auto 24px; }
.tagline {
  font-family: var(--font-pixel);
  color: var(--c-white);
  font-size: 0.8rem;
  margin-bottom: 24px;
}

/* Footer */
.site-footer {
  border-top: 3px solid var(--c-gold);
  margin-top: 60px;
  padding: 24px 0 40px;
  font-size: 0.8rem;
  color: #b8b8b0;
}
.footer-inner {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.lang-switch a { color: var(--c-gold); text-decoration: none; }

/* Social placeholders (Contact page) */
.social-list {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.social-placeholder {
  display: inline-block;
  font-family: var(--font-pixel);
  font-size: 0.6rem;
  padding: 10px 14px;
  border: 3px dashed #555;
  color: #777;
  cursor: default;
}

/* Splash screen (home only) */
.splash-screen {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: var(--c-black);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}
.splash-screen.splash-hidden { opacity: 0; pointer-events: none; }
.splash-inner { text-align: center; padding: 20px; }
.splash-logo { width: 140px; height: 140px; margin: 0 auto 24px; }
.splash-blink {
  font-family: var(--font-pixel);
  color: var(--c-gold);
  font-size: 1rem;
  animation: blink 1s steps(2, start) infinite;
}
.splash-hint {
  font-family: var(--font-body);
  color: #999;
  font-size: 0.85rem;
  margin-top: 12px;
}

/* Responsive */
@media (max-width: 640px) {
  .project-grid { grid-template-columns: 1fr; }
  h1 { font-size: 1.2rem; }
  .hero-logo { width: 110px; height: 110px; }
  .footer-inner { flex-direction: column; }
}
```

- [ ] **Step 2: Verify required tokens and classes are all present**

Run:
```bash
grep -c -- "--c-gold:" assets/css/style.css
grep -c "\.btn " assets/css/style.css
grep -c "\.card " assets/css/style.css
grep -c "\.site-nav " assets/css/style.css
grep -c "\.splash-screen " assets/css/style.css
grep -c "@media" assets/css/style.css
```
Expected: every command outputs `1` or greater (no zero counts).

- [ ] **Step 3: Commit**

```bash
git add assets/css/style.css
git commit -m "Add arcade-cabinet CSS design system"
```

---

### Task 3: Home pages (IT + EN) and splash screen

**Files:**
- Create: `assets/js/splash.js`
- Create: `index.html`
- Create: `en/index.html`

**Interfaces:**
- Consumes: CSS classes from Task 2; image paths from Task 1.
- Produces: `#splash` element id and `abt-splash-seen` localStorage key, referenced only within this task (splash.js and both index.html files together form one feature — no other page loads splash.js).

- [ ] **Step 1: Write `assets/js/splash.js`**

```javascript
(function () {
  "use strict";
  var splash = document.getElementById("splash");
  if (!splash) {
    return;
  }
  if (window.localStorage && window.localStorage.getItem("abt-splash-seen")) {
    splash.parentNode.removeChild(splash);
    return;
  }
  var dismissed = false;
  function dismiss() {
    if (dismissed) {
      return;
    }
    dismissed = true;
    if (window.localStorage) {
      window.localStorage.setItem("abt-splash-seen", "1");
    }
    splash.classList.add("splash-hidden");
    window.setTimeout(function () {
      if (splash.parentNode) {
        splash.parentNode.removeChild(splash);
      }
    }, 300);
    document.removeEventListener("keydown", dismiss);
    document.removeEventListener("click", dismiss);
  }
  document.addEventListener("keydown", dismiss);
  document.addEventListener("click", dismiss);
  window.setTimeout(dismiss, 4000);
})();
```

- [ ] **Step 2: Write `index.html`**

```html
<!doctype html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>After Bedtime Projects — giochi e app fatti dopo la nanna</title>
<meta name="description" content="After Bedtime Projects è lo studio indie di uno sviluppatore e papà. Scopri Vita da DS, gestionale narrativo di calcio, e Broodle, l'app per organizzare serate di gioco.">
<!-- TODO: replace with real domain once chosen -->
<link rel="canonical" href="https://afterbedtimeprojects.com/">
<link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/">
<link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/">
<link rel="alternate" hreflang="x-default" href="https://afterbedtimeprojects.com/">
<link rel="icon" href="assets/img/after-bedtime-logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<div class="crt-overlay" aria-hidden="true"></div>

<div id="splash" class="splash-screen">
  <div class="splash-inner">
    <img src="assets/img/after-bedtime-logo.png" alt="After Bedtime Projects" class="splash-logo">
    <p class="splash-blink">PREMI START</p>
    <p class="splash-hint">tocca lo schermo o premi un tasto</p>
  </div>
</div>

<header class="site-nav">
  <div class="wrap nav-inner">
    <a href="index.html" class="brand"><img src="assets/img/after-bedtime-logo.png" alt="After Bedtime Projects" class="brand-logo"></a>
    <nav aria-label="Principale">
      <ul>
        <li><a href="index.html" aria-current="page">Home</a></li>
        <li><a href="vita-da-ds.html">Vita da DS</a></li>
        <li><a href="broodle.html">Broodle</a></li>
        <li><a href="chi-sono.html">Chi sono</a></li>
        <li><a href="contatti.html">Contatti</a></li>
      </ul>
    </nav>
  </div>
</header>

<main>
  <section class="hero wrap">
    <img src="assets/img/after-bedtime-logo.png" alt="Logo di After Bedtime Projects" class="hero-logo">
    <h1>AFTER BEDTIME PROJECTS</h1>
    <p class="tagline">Giochi e app nati dopo la nanna.</p>
    <p>Sono uno sviluppatore indie, e soprattutto il papà di una bambina di 3 anni. Ogni progetto qui dentro nasce nelle ore serali, quando la casa è silenziosa e il laptop diventa una sala giochi personale. Benvenuto ad After Bedtime Projects.</p>
  </section>

  <section class="wrap">
    <h2>Progetti</h2>
    <div class="project-grid">
      <div class="card">
        <img src="assets/img/vita-da-ds-logo.png" alt="Logo di Vita da DS" class="card-logo">
        <h3>Vita da DS</h3>
        <span class="badge badge--dev">IN SVILUPPO</span>
        <p>Un gestionale narrativo di calcio. Vesti i panni del Direttore Sportivo di una squadra: le tue scelte plasmano morale, reputazione e risultati, partita dopo partita.</p>
        <a href="vita-da-ds.html" class="btn">Scopri di più</a>
      </div>
      <div class="card">
        <img src="assets/img/broodle-logo.png" alt="Logo di Broodle" class="card-logo">
        <h3>Broodle</h3>
        <span class="badge badge--live">LIVE</span>
        <p>Un sondaggio in stile Doodle per organizzare le prossime serate di gioco con gli amici: scegli le date, vota, gioca.</p>
        <a href="broodle.html" class="btn">Scopri di più</a>
      </div>
    </div>
  </section>

  <section class="wrap">
    <h2>Chi c'è dietro</h2>
    <p>Nessun team, nessun ufficio: solo un paio d'ore libere a sera, dopo che la casa si è finalmente addormentata.</p>
    <p><a href="chi-sono.html">La mia storia →</a></p>
  </section>
</main>

<footer class="site-footer">
  <div class="wrap footer-inner">
    <p>© 2026 After Bedtime Projects. Fatto con orgoglio usando solo puro HTML.</p>
    <p class="lang-switch"><a href="en/index.html">EN</a></p>
  </div>
</footer>

<script src="assets/js/splash.js" defer></script>
</body>
</html>
```

- [ ] **Step 3: Write `en/index.html`**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>After Bedtime Projects — games &amp; apps made after bedtime</title>
<meta name="description" content="After Bedtime Projects is the indie studio of a developer and dad. Discover Vita da DS, a narrative football management game, and Broodle, the app for planning game nights.">
<!-- TODO: replace with real domain once chosen -->
<link rel="canonical" href="https://afterbedtimeprojects.com/en/">
<link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/">
<link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/">
<link rel="alternate" hreflang="x-default" href="https://afterbedtimeprojects.com/">
<link rel="icon" href="../assets/img/after-bedtime-logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
<div class="crt-overlay" aria-hidden="true"></div>

<div id="splash" class="splash-screen">
  <div class="splash-inner">
    <img src="../assets/img/after-bedtime-logo.png" alt="After Bedtime Projects" class="splash-logo">
    <p class="splash-blink">PRESS START</p>
    <p class="splash-hint">tap the screen or press any key</p>
  </div>
</div>

<header class="site-nav">
  <div class="wrap nav-inner">
    <a href="index.html" class="brand"><img src="../assets/img/after-bedtime-logo.png" alt="After Bedtime Projects" class="brand-logo"></a>
    <nav aria-label="Main">
      <ul>
        <li><a href="index.html" aria-current="page">Home</a></li>
        <li><a href="vita-da-ds.html">Vita da DS</a></li>
        <li><a href="broodle.html">Broodle</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>

<main>
  <section class="hero wrap">
    <img src="../assets/img/after-bedtime-logo.png" alt="After Bedtime Projects logo" class="hero-logo">
    <h1>AFTER BEDTIME PROJECTS</h1>
    <p class="tagline">Games and apps, made late at night.</p>
    <p>I'm an indie developer — and above all, dad to a 3-year-old. Every project here is born in the evening hours, once the house goes quiet and the laptop becomes a personal arcade. Welcome to After Bedtime Projects.</p>
  </section>

  <section class="wrap">
    <h2>Projects</h2>
    <div class="project-grid">
      <div class="card">
        <img src="../assets/img/vita-da-ds-logo.png" alt="Vita da DS logo" class="card-logo">
        <h3>Vita da DS</h3>
        <span class="badge badge--dev">IN DEVELOPMENT</span>
        <p>A narrative football management game. Step into the shoes of a club's Direttore Sportivo (Sporting Director): your choices shape morale, reputation, and results, match after match.</p>
        <a href="vita-da-ds.html" class="btn">Learn more</a>
      </div>
      <div class="card">
        <img src="../assets/img/broodle-logo.png" alt="Broodle logo" class="card-logo">
        <h3>Broodle</h3>
        <span class="badge badge--live">LIVE</span>
        <p>A Doodle-style poll for planning your next game night with friends: pick dates, vote, play.</p>
        <a href="broodle.html" class="btn">Learn more</a>
      </div>
    </div>
  </section>

  <section class="wrap">
    <h2>Who's behind it</h2>
    <p>No team, no office: just a couple of free hours a night, once the house has finally fallen asleep.</p>
    <p><a href="about.html">My story →</a></p>
  </section>
</main>

<footer class="site-footer">
  <div class="wrap footer-inner">
    <p>© 2026 After Bedtime Projects. Proudly made with just pure HTML.</p>
    <p class="lang-switch"><a href="../index.html">IT</a></p>
  </div>
</footer>

<script src="../assets/js/splash.js" defer></script>
</body>
</html>
```

- [ ] **Step 4: Validate both HTML files**

Run: `npx --yes html-validate index.html en/index.html`
Expected: `0 problems`. If rule violations appear, fix the markup (or, only if a rule is a deliberate, justified choice — e.g. a rule that conflicts with an intentional decision above — add a scoped override to `.htmlvalidate.json` with a comment explaining why).

- [ ] **Step 5: Verify the splash script only loads on Home pages**

Run: `grep -rl "splash.js" *.html en/*.html`
Expected output: exactly `index.html` and `en/index.html`.

- [ ] **Step 6: Commit**

```bash
git add assets/js/splash.js index.html en/index.html
git commit -m "Add home pages (IT/EN) with insert-coin splash screen"
```

---

### Task 4: About pages (IT + EN)

**Files:**
- Create: `chi-sono.html`
- Create: `en/about.html`

**Interfaces:**
- Consumes: CSS classes and nav/footer pattern from Tasks 2–3.

- [ ] **Step 1: Write `chi-sono.html`**

```html
<!doctype html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Chi sono — After Bedtime Projects</title>
<meta name="description" content="La storia di Gianpaolo: sviluppatore indie, papà, e creatore di After Bedtime Projects.">
<!-- TODO: replace with real domain once chosen -->
<link rel="canonical" href="https://afterbedtimeprojects.com/chi-sono.html">
<link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/chi-sono.html">
<link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/about.html">
<link rel="alternate" hreflang="x-default" href="https://afterbedtimeprojects.com/chi-sono.html">
<link rel="icon" href="assets/img/after-bedtime-logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<div class="crt-overlay" aria-hidden="true"></div>

<header class="site-nav">
  <div class="wrap nav-inner">
    <a href="index.html" class="brand"><img src="assets/img/after-bedtime-logo.png" alt="After Bedtime Projects" class="brand-logo"></a>
    <nav aria-label="Principale">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="vita-da-ds.html">Vita da DS</a></li>
        <li><a href="broodle.html">Broodle</a></li>
        <li><a href="chi-sono.html" aria-current="page">Chi sono</a></li>
        <li><a href="contatti.html">Contatti</a></li>
      </ul>
    </nav>
  </div>
</header>

<main class="wrap">
  <h1>Chi sono</h1>
  <p>Ciao, sono Gianpaolo. Di giorno faccio lo sviluppatore, di sera faccio il papà di una bambina di 3 anni — e più tardi ancora, quando la casa finalmente si addormenta, faccio quello che mi piace di più: costruire giochi e piccole app.</p>
  <p>Da qui il nome: After Bedtime Projects. Non ho un team, non ho un ufficio: ho un paio d'ore libere a sera e la voglia di finire quello che inizio.</p>
  <p>In questa sala giochi trovi "Vita da DS", un gestionale narrativo di calcio a cui lavoro nel tempo libero, e "Broodle", un'app per organizzare serate di gioco che uso io stesso con i miei amici.</p>
  <p>Se vuoi scrivermi, la porta è qui: <a href="contatti.html">Contatti</a>.</p>
</main>

<footer class="site-footer">
  <div class="wrap footer-inner">
    <p>© 2026 After Bedtime Projects. Fatto con orgoglio usando solo puro HTML.</p>
    <p class="lang-switch"><a href="en/about.html">EN</a></p>
  </div>
</footer>
</body>
</html>
```

- [ ] **Step 2: Write `en/about.html`**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>About — After Bedtime Projects</title>
<meta name="description" content="The story behind After Bedtime Projects: an indie developer, a dad, and the games he builds after bedtime.">
<!-- TODO: replace with real domain once chosen -->
<link rel="canonical" href="https://afterbedtimeprojects.com/en/about.html">
<link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/chi-sono.html">
<link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/about.html">
<link rel="alternate" hreflang="x-default" href="https://afterbedtimeprojects.com/chi-sono.html">
<link rel="icon" href="../assets/img/after-bedtime-logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
<div class="crt-overlay" aria-hidden="true"></div>

<header class="site-nav">
  <div class="wrap nav-inner">
    <a href="index.html" class="brand"><img src="../assets/img/after-bedtime-logo.png" alt="After Bedtime Projects" class="brand-logo"></a>
    <nav aria-label="Main">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="vita-da-ds.html">Vita da DS</a></li>
        <li><a href="broodle.html">Broodle</a></li>
        <li><a href="about.html" aria-current="page">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>

<main class="wrap">
  <h1>About</h1>
  <p>Hi, I'm Gianpaolo. By day I'm a developer, in the evening I'm dad to a 3-year-old — and later still, once the house finally falls asleep, I do what I like best: building games and small apps.</p>
  <p>Hence the name: After Bedtime Projects. No team, no office — just a couple of free hours a night and the will to actually finish what I start.</p>
  <p>In this arcade you'll find "Vita da DS", a narrative football management game I work on in my spare time, and "Broodle", an app for planning game nights that I use myself with my own friends.</p>
  <p>Want to write to me? The door's right here: <a href="contact.html">Contact</a>.</p>
</main>

<footer class="site-footer">
  <div class="wrap footer-inner">
    <p>© 2026 After Bedtime Projects. Proudly made with just pure HTML.</p>
    <p class="lang-switch"><a href="../chi-sono.html">IT</a></p>
  </div>
</footer>
</body>
</html>
```

- [ ] **Step 3: Validate both HTML files**

Run: `npx --yes html-validate chi-sono.html en/about.html`
Expected: `0 problems`.

- [ ] **Step 4: Commit**

```bash
git add chi-sono.html en/about.html
git commit -m "Add about pages (IT/EN)"
```

---

### Task 5: Vita da DS project pages (IT + EN)

**Files:**
- Create: `vita-da-ds.html`
- Create: `en/vita-da-ds.html`

**Interfaces:**
- Consumes: CSS classes and nav/footer pattern from Tasks 2–3.

- [ ] **Step 1: Write `vita-da-ds.html`**

```html
<!doctype html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vita da DS — un gestionale narrativo di calcio | After Bedtime Projects</title>
<meta name="description" content="Vita da DS è un gestionale narrativo di calcio in sviluppo: vesti i panni del Direttore Sportivo e guida la tua squadra attraverso scelte, mercato e stagioni.">
<!-- TODO: replace with real domain once chosen -->
<link rel="canonical" href="https://afterbedtimeprojects.com/vita-da-ds.html">
<link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/vita-da-ds.html">
<link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/vita-da-ds.html">
<link rel="alternate" hreflang="x-default" href="https://afterbedtimeprojects.com/vita-da-ds.html">
<link rel="icon" href="assets/img/after-bedtime-logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<div class="crt-overlay" aria-hidden="true"></div>

<header class="site-nav">
  <div class="wrap nav-inner">
    <a href="index.html" class="brand"><img src="assets/img/after-bedtime-logo.png" alt="After Bedtime Projects" class="brand-logo"></a>
    <nav aria-label="Principale">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="vita-da-ds.html" aria-current="page">Vita da DS</a></li>
        <li><a href="broodle.html">Broodle</a></li>
        <li><a href="chi-sono.html">Chi sono</a></li>
        <li><a href="contatti.html">Contatti</a></li>
      </ul>
    </nav>
  </div>
</header>

<main class="wrap">
  <img src="assets/img/vita-da-ds-logo.png" alt="Logo di Vita da DS" class="card-logo">
  <h1>Vita da DS</h1>
  <span class="badge badge--dev">IN SVILUPPO</span>
  <p>"Vita da DS" è un gioco gestionale narrativo di calcio: vesti i panni del Direttore Sportivo (DS) di una squadra e vivi la stagione dall'interno, tra scelte, pressioni e soddisfazioni.</p>
  <p>Non è un clone di Football Manager: è un'esperienza più leggera e narrativa, dove le decisioni che prendi — su rosa, mercato, staff e interviste — influenzano morale, reputazione e risultati stagionali.</p>

  <h2>Cosa puoi fare</h2>
  <ul class="feature-list">
    <li>Gestisci rosa, contratti e tratti caratteriali dei giocatori</li>
    <li>Naviga le finestre di mercato tra acquisti, cessioni e prestiti</li>
    <li>Assumi scout e staff, e leggi i loro report settimanali</li>
    <li>Vivi ogni partita con eventi, interviste e conseguenze reali sul morale</li>
  </ul>

  <h2>Stato del progetto</h2>
  <p>Il gioco è ancora in cantiere — torna a trovarci per gli aggiornamenti. Vuoi essere avvisato al lancio? <a href="contatti.html">Scrivimi</a>.</p>
</main>

<footer class="site-footer">
  <div class="wrap footer-inner">
    <p>© 2026 After Bedtime Projects. Fatto con orgoglio usando solo puro HTML.</p>
    <p class="lang-switch"><a href="en/vita-da-ds.html">EN</a></p>
  </div>
</footer>
</body>
</html>
```

- [ ] **Step 2: Write `en/vita-da-ds.html`**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vita da DS — a narrative football management game | After Bedtime Projects</title>
<meta name="description" content="Vita da DS is a narrative football management game in development: step into the role of a Direttore Sportivo and guide your club through choices, transfers, and seasons.">
<!-- TODO: replace with real domain once chosen -->
<link rel="canonical" href="https://afterbedtimeprojects.com/en/vita-da-ds.html">
<link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/vita-da-ds.html">
<link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/vita-da-ds.html">
<link rel="alternate" hreflang="x-default" href="https://afterbedtimeprojects.com/vita-da-ds.html">
<link rel="icon" href="../assets/img/after-bedtime-logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
<div class="crt-overlay" aria-hidden="true"></div>

<header class="site-nav">
  <div class="wrap nav-inner">
    <a href="index.html" class="brand"><img src="../assets/img/after-bedtime-logo.png" alt="After Bedtime Projects" class="brand-logo"></a>
    <nav aria-label="Main">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="vita-da-ds.html" aria-current="page">Vita da DS</a></li>
        <li><a href="broodle.html">Broodle</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>

<main class="wrap">
  <img src="../assets/img/vita-da-ds-logo.png" alt="Vita da DS logo" class="card-logo">
  <h1>Vita da DS</h1>
  <span class="badge badge--dev">IN DEVELOPMENT</span>
  <p>"Vita da DS" ("Life as a Sporting Director") is a narrative football management game: you step into the role of a club's Direttore Sportivo (DS) and live the season from the inside, through choices, pressure, and small victories.</p>
  <p>It's not a Football Manager clone: it's a lighter, more narrative experience, where the decisions you make — on the roster, the transfer market, staff, and interviews — shape morale, reputation, and how the season plays out.</p>

  <h2>What you can do</h2>
  <ul class="feature-list">
    <li>Manage the roster, contracts, and personality traits of your players</li>
    <li>Navigate transfer windows: signings, sales, and loans</li>
    <li>Hire scouts and staff, and read their weekly reports</li>
    <li>Live every match through events, interviews, and real consequences for morale</li>
  </ul>

  <h2>Project status</h2>
  <p>Still cooking in the workshop — check back for updates. Want to hear when it launches? <a href="contact.html">Get in touch</a>.</p>
</main>

<footer class="site-footer">
  <div class="wrap footer-inner">
    <p>© 2026 After Bedtime Projects. Proudly made with just pure HTML.</p>
    <p class="lang-switch"><a href="../vita-da-ds.html">IT</a></p>
  </div>
</footer>
</body>
</html>
```

- [ ] **Step 3: Validate both HTML files**

Run: `npx --yes html-validate vita-da-ds.html en/vita-da-ds.html`
Expected: `0 problems`.

- [ ] **Step 4: Commit**

```bash
git add vita-da-ds.html en/vita-da-ds.html
git commit -m "Add Vita da DS project pages (IT/EN)"
```

---

### Task 6: Broodle project pages (IT + EN)

**Files:**
- Create: `broodle.html`
- Create: `en/broodle.html`

**Interfaces:**
- Consumes: CSS classes and nav/footer pattern from Tasks 2–3.

- [ ] **Step 1: Write `broodle.html`**

```html
<!doctype html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Broodle — organizza le tue serate di gioco | After Bedtime Projects</title>
<meta name="description" content="Broodle è un sondaggio in stile Doodle per organizzare le serate di gioco con gli amici. Crea un sondaggio, vota, e trova la data migliore.">
<!-- TODO: replace with real domain once chosen -->
<link rel="canonical" href="https://afterbedtimeprojects.com/broodle.html">
<link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/broodle.html">
<link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/broodle.html">
<link rel="alternate" hreflang="x-default" href="https://afterbedtimeprojects.com/broodle.html">
<link rel="icon" href="assets/img/after-bedtime-logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<div class="crt-overlay" aria-hidden="true"></div>

<header class="site-nav">
  <div class="wrap nav-inner">
    <a href="index.html" class="brand"><img src="assets/img/after-bedtime-logo.png" alt="After Bedtime Projects" class="brand-logo"></a>
    <nav aria-label="Principale">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="vita-da-ds.html">Vita da DS</a></li>
        <li><a href="broodle.html" aria-current="page">Broodle</a></li>
        <li><a href="chi-sono.html">Chi sono</a></li>
        <li><a href="contatti.html">Contatti</a></li>
      </ul>
    </nav>
  </div>
</header>

<main class="wrap">
  <img src="assets/img/broodle-logo.png" alt="Logo di Broodle" class="card-logo">
  <h1>Broodle</h1>
  <span class="badge badge--live">LIVE</span>
  <p>Broodle è un sondaggio di disponibilità in stile Doodle, pensato per organizzare serate di gioco con gli amici senza le solite venti chat incrociate.</p>

  <h2>Cosa puoi fare</h2>
  <ul class="feature-list">
    <li>Crea un sondaggio scegliendo un intervallo di date</li>
    <li>Condividilo con un link breve</li>
    <li>Vota ogni giorno: sì, forse, o disponibile a un orario preciso</li>
    <li>Guarda la classifica dei tre giorni migliori appena arrivano i primi voti</li>
  </ul>

  <p>Broodle è open source, bilingue (italiano e inglese) ed è pensato mobile-first.</p>

  <p><a href="https://broodle.it" class="btn btn--red" target="_blank" rel="noopener">Prova Broodle</a></p>
</main>

<footer class="site-footer">
  <div class="wrap footer-inner">
    <p>© 2026 After Bedtime Projects. Fatto con orgoglio usando solo puro HTML.</p>
    <p class="lang-switch"><a href="en/broodle.html">EN</a></p>
  </div>
</footer>
</body>
</html>
```

- [ ] **Step 2: Write `en/broodle.html`**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Broodle — plan your game nights | After Bedtime Projects</title>
<meta name="description" content="Broodle is a Doodle-style poll for planning game nights with friends. Create a poll, vote, and find the best date.">
<!-- TODO: replace with real domain once chosen -->
<link rel="canonical" href="https://afterbedtimeprojects.com/en/broodle.html">
<link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/broodle.html">
<link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/broodle.html">
<link rel="alternate" hreflang="x-default" href="https://afterbedtimeprojects.com/broodle.html">
<link rel="icon" href="../assets/img/after-bedtime-logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
<div class="crt-overlay" aria-hidden="true"></div>

<header class="site-nav">
  <div class="wrap nav-inner">
    <a href="index.html" class="brand"><img src="../assets/img/after-bedtime-logo.png" alt="After Bedtime Projects" class="brand-logo"></a>
    <nav aria-label="Main">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="vita-da-ds.html">Vita da DS</a></li>
        <li><a href="broodle.html" aria-current="page">Broodle</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>

<main class="wrap">
  <img src="../assets/img/broodle-logo.png" alt="Broodle logo" class="card-logo">
  <h1>Broodle</h1>
  <span class="badge badge--live">LIVE</span>
  <p>Broodle is a Doodle-style availability poll built for planning game nights with friends, without the usual twenty crossed messages.</p>

  <h2>What you can do</h2>
  <ul class="feature-list">
    <li>Create a poll by picking a date range</li>
    <li>Share it with a short link</li>
    <li>Vote per day: yes, maybe, or available at a specific time</li>
    <li>See the top 3 best days as soon as the first votes come in</li>
  </ul>

  <p>Broodle is open source, bilingual (Italian and English), and built mobile-first.</p>

  <p><a href="https://broodle.it" class="btn btn--red" target="_blank" rel="noopener">Try Broodle</a></p>
</main>

<footer class="site-footer">
  <div class="wrap footer-inner">
    <p>© 2026 After Bedtime Projects. Proudly made with just pure HTML.</p>
    <p class="lang-switch"><a href="../broodle.html">IT</a></p>
  </div>
</footer>
</body>
</html>
```

- [ ] **Step 3: Validate both HTML files**

Run: `npx --yes html-validate broodle.html en/broodle.html`
Expected: `0 problems`.

- [ ] **Step 4: Commit**

```bash
git add broodle.html en/broodle.html
git commit -m "Add Broodle project pages (IT/EN)"
```

---

### Task 7: Contact pages (IT + EN)

**Files:**
- Create: `contatti.html`
- Create: `en/contact.html`

**Interfaces:**
- Consumes: CSS classes and nav/footer pattern from Tasks 2–3.

- [ ] **Step 1: Write `contatti.html`**

```html
<!doctype html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Contatti — After Bedtime Projects</title>
<meta name="description" content="Scrivi a After Bedtime Projects per feedback, bug o solo per salutare.">
<!-- TODO: replace with real domain once chosen -->
<link rel="canonical" href="https://afterbedtimeprojects.com/contatti.html">
<link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/contatti.html">
<link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/contact.html">
<link rel="alternate" hreflang="x-default" href="https://afterbedtimeprojects.com/contatti.html">
<link rel="icon" href="assets/img/after-bedtime-logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<div class="crt-overlay" aria-hidden="true"></div>

<header class="site-nav">
  <div class="wrap nav-inner">
    <a href="index.html" class="brand"><img src="assets/img/after-bedtime-logo.png" alt="After Bedtime Projects" class="brand-logo"></a>
    <nav aria-label="Principale">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="vita-da-ds.html">Vita da DS</a></li>
        <li><a href="broodle.html">Broodle</a></li>
        <li><a href="chi-sono.html">Chi sono</a></li>
        <li><a href="contatti.html" aria-current="page">Contatti</a></li>
      </ul>
    </nav>
  </div>
</header>

<main class="wrap">
  <h1>Contatti</h1>
  <p>Hai un feedback, un bug da segnalare o vuoi solo salutare? Scrivimi.</p>
  <p><a href="mailto:gianpaolo.dinino@gmail.com" class="btn">gianpaolo.dinino@gmail.com</a></p>

  <h2>Altrove</h2>
  <!-- TODO: replace placeholders with real profile links once accounts exist -->
  <ul class="social-list">
    <li><span class="social-placeholder" title="Presto disponibile">GitHub</span></li>
    <li><span class="social-placeholder" title="Presto disponibile">Instagram</span></li>
    <li><span class="social-placeholder" title="Presto disponibile">X / Twitter</span></li>
  </ul>
</main>

<footer class="site-footer">
  <div class="wrap footer-inner">
    <p>© 2026 After Bedtime Projects. Fatto con orgoglio usando solo puro HTML.</p>
    <p class="lang-switch"><a href="en/contact.html">EN</a></p>
  </div>
</footer>
</body>
</html>
```

- [ ] **Step 2: Write `en/contact.html`**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Contact — After Bedtime Projects</title>
<meta name="description" content="Get in touch with After Bedtime Projects for feedback, bugs, or just to say hi.">
<!-- TODO: replace with real domain once chosen -->
<link rel="canonical" href="https://afterbedtimeprojects.com/en/contact.html">
<link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/contatti.html">
<link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/contact.html">
<link rel="alternate" hreflang="x-default" href="https://afterbedtimeprojects.com/contatti.html">
<link rel="icon" href="../assets/img/after-bedtime-logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
<div class="crt-overlay" aria-hidden="true"></div>

<header class="site-nav">
  <div class="wrap nav-inner">
    <a href="index.html" class="brand"><img src="../assets/img/after-bedtime-logo.png" alt="After Bedtime Projects" class="brand-logo"></a>
    <nav aria-label="Main">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="vita-da-ds.html">Vita da DS</a></li>
        <li><a href="broodle.html">Broodle</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html" aria-current="page">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>

<main class="wrap">
  <h1>Contact</h1>
  <p>Got feedback, a bug to report, or just want to say hi? Write to me.</p>
  <p><a href="mailto:gianpaolo.dinino@gmail.com" class="btn">gianpaolo.dinino@gmail.com</a></p>

  <h2>Elsewhere</h2>
  <!-- TODO: replace placeholders with real profile links once accounts exist -->
  <ul class="social-list">
    <li><span class="social-placeholder" title="Coming soon">GitHub</span></li>
    <li><span class="social-placeholder" title="Coming soon">Instagram</span></li>
    <li><span class="social-placeholder" title="Coming soon">X / Twitter</span></li>
  </ul>
</main>

<footer class="site-footer">
  <div class="wrap footer-inner">
    <p>© 2026 After Bedtime Projects. Proudly made with just pure HTML.</p>
    <p class="lang-switch"><a href="../contatti.html">IT</a></p>
  </div>
</footer>
</body>
</html>
```

- [ ] **Step 3: Validate both HTML files**

Run: `npx --yes html-validate contatti.html en/contact.html`
Expected: `0 problems`.

- [ ] **Step 4: Commit**

```bash
git add contatti.html en/contact.html
git commit -m "Add contact pages (IT/EN)"
```

---

### Task 8: Sitemap, full-site validation, and QA pass

**Files:**
- Create: `sitemap.xml`

**Interfaces:**
- Consumes: all 10 HTML files from Tasks 3–7.

- [ ] **Step 1: Write `sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://afterbedtimeprojects.com/</loc>
    <xhtml:link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/"/>
  </url>
  <url>
    <loc>https://afterbedtimeprojects.com/en/</loc>
    <xhtml:link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/"/>
  </url>
  <url>
    <loc>https://afterbedtimeprojects.com/chi-sono.html</loc>
    <xhtml:link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/chi-sono.html"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/about.html"/>
  </url>
  <url>
    <loc>https://afterbedtimeprojects.com/en/about.html</loc>
    <xhtml:link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/chi-sono.html"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/about.html"/>
  </url>
  <url>
    <loc>https://afterbedtimeprojects.com/vita-da-ds.html</loc>
    <xhtml:link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/vita-da-ds.html"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/vita-da-ds.html"/>
  </url>
  <url>
    <loc>https://afterbedtimeprojects.com/en/vita-da-ds.html</loc>
    <xhtml:link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/vita-da-ds.html"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/vita-da-ds.html"/>
  </url>
  <url>
    <loc>https://afterbedtimeprojects.com/broodle.html</loc>
    <xhtml:link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/broodle.html"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/broodle.html"/>
  </url>
  <url>
    <loc>https://afterbedtimeprojects.com/en/broodle.html</loc>
    <xhtml:link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/broodle.html"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/broodle.html"/>
  </url>
  <url>
    <loc>https://afterbedtimeprojects.com/contatti.html</loc>
    <xhtml:link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/contatti.html"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/contact.html"/>
  </url>
  <url>
    <loc>https://afterbedtimeprojects.com/en/contact.html</loc>
    <xhtml:link rel="alternate" hreflang="it" href="https://afterbedtimeprojects.com/contatti.html"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://afterbedtimeprojects.com/en/contact.html"/>
  </url>
</urlset>
```

- [ ] **Step 2: Verify sitemap.xml is well-formed**

Run: `python3 -c "import xml.dom.minidom as m; m.parse('sitemap.xml'); print('OK')"`
Expected: `OK`

- [ ] **Step 3: Validate every HTML file at once**

Run: `npx --yes html-validate *.html en/*.html`
Expected: `0 problems`.

- [ ] **Step 4: Cross-check every hreflang pair resolves both ways**

Run:
```bash
for pair in "index.html:en/index.html" "chi-sono.html:en/about.html" "vita-da-ds.html:en/vita-da-ds.html" "broodle.html:en/broodle.html" "contatti.html:en/contact.html"; do
  it="${pair%%:*}"; en="${pair##*:}"
  echo "== $it <-> $en =="
  grep -o 'hreflang="en" href="[^"]*"' "$it"
  grep -o 'hreflang="it" href="[^"]*"' "$en"
done
```
Expected: for each pair, the `it` file's `hreflang="en"` URL ends with the `en` file's path, and the `en` file's `hreflang="it"` URL ends with the `it` file's path.

- [ ] **Step 5: Confirm every internal nav/footer link resolves to a real file**

Run:
```bash
for f in *.html en/*.html; do
  dir=$(dirname "$f")
  grep -oE 'href="[a-zA-Z0-9_./-]+\.html"' "$f" | sed 's/href="//;s/"$//' | while read -r link; do
    target="$dir/$link"
    [ -f "$target" ] || echo "BROKEN in $f: $link"
  done
done
```
Expected: no output (no `BROKEN` lines).

- [ ] **Step 6: Check text/background color contrast ratios meet WCAG AA**

Run:
```bash
python3 - <<'EOF'
def lum(hex_color):
    hex_color = hex_color.lstrip('#')
    r, g, b = (int(hex_color[i:i+2], 16) / 255 for i in (0, 2, 4))
    def chan(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = chan(r), chan(g), chan(b)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def ratio(c1, c2):
    l1, l2 = lum(c1) + 0.05, lum(c2) + 0.05
    return max(l1, l2) / min(l1, l2)

pairs = [
    ("white on black (body text)", "#f4f1e8", "#050505"),
    ("gold on black (headings/links)", "#ffb703", "#050505"),
    ("black on gold (buttons)", "#050505", "#ffb703"),
    ("white on red (red buttons)", "#f4f1e8", "#ff3b3b"),
]
for name, fg, bg in pairs:
    r = ratio(fg, bg)
    print(f"{name}: {r:.2f}:1 -> {'PASS' if r >= 4.5 else 'FAIL'} (AA normal text)")
EOF
```
Expected: every pair reports `PASS`. If any pair reports `FAIL`, darken/lighten that token in `assets/css/style.css` (Task 2) until it passes, then re-run this check.

- [ ] **Step 7: Manual visual QA**

Serve the site locally and check each of the 10 pages at three widths (375px, 768px, 1280px):
```bash
python3 -m http.server 8000
```
Open `http://localhost:8000/`, `http://localhost:8000/en/`, and the other 8 pages. For each, confirm: nav shows the correct page highlighted with the blinking cursor, CRT scanline overlay is visible but doesn't obscure text, cards/buttons don't overflow at 375px, and (on the two Home pages only) the insert-coin splash appears once, dismisses on click/keypress, and does not reappear on reload. Stop the server with Ctrl+C when done.

- [ ] **Step 8: Commit**

```bash
git add sitemap.xml
git commit -m "Add sitemap.xml and complete full-site QA pass"
```

---

## Self-Review Notes

- **Spec coverage:** every spec section maps to a task — brand/visual system → Task 2, home + splash → Task 3, about → Task 4, Vita da DS → Task 5, Broodle → Task 6, contact → Task 7, sitemap/robots/hreflang/testing → Tasks 1 and 8.
- **Type/interface consistency:** the `#splash` id, `abt-splash-seen` localStorage key, and every CSS class name are used identically across Task 2 (definition) and Tasks 3–7 (consumption) — checked by hand against the CSS in Task 2.
- **No placeholders** except the two *intentionally deferred* items called out explicitly in Global Constraints (domain name, social accounts) — both flagged in-code with `TODO` comments per the spec's own "Open items deferred on purpose" section, not left implicit.
