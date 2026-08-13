# After Bedtime Projects — studio website design spec

Date: 2026-08-13

## Summary

A static, bilingual (Italian primary / English secondary) marketing/portfolio
site for "After Bedtime Projects" — a solo indie dev studio run by a dad who
codes after his 3-year-old goes to bed. The site introduces the studio and
showcases its two projects: **Vita da DS** (Direttore Sportivo, a narrative
football-manager mobile game, in development) and **Broodle** (a Doodle-style
group scheduling app, live at broodle.it).

Visual direction: a literal old-school arcade cabinet — CRT scanlines, pixel
font headings, blocky 8-bit borders, classic 4-color arcade palette
(black/white/gold/red) — layered on top of the studio's existing gold/black
brand identity (from the After Bedtime Projects logo) rather than replacing
it.

## Goals

- Give the studio and its two projects a single coherent home online.
- Read as distinctly "retro arcade," not a generic template with a pixel font
  slapped on.
- Be bilingual with proper per-language crawlable URLs (SEO matters — this
  drove the choice of multi-page over a single scrolling page).
- Ship as plain static HTML/CSS/JS: no framework, no build step, no backend.
- Stay honest about project status: Broodle is live and linked out to;
  Vita da DS is in development and says so.

## Non-goals (v1)

- No blog/devlog page yet.
- No working email signup / newsletter form (would require a backend or
  third-party service; hosting isn't decided yet, so this is deferred).
- No real social links yet — contact page ships with clearly marked
  placeholders.
- No gameplay screenshots — none exist yet for either project. Project pages
  lean on existing logo art + copy + CSS/SVG decoration, with an easy slot to
  drop in screenshots later.
- No hosting/deployment decision yet — this spec covers the site itself only.

## Brand & visual system

- **Existing brand assets to reuse** (copy into `/assets/img/`):
  - `after_bedtime_projects_logo.png` — studio logo (game-controller-as-beer-mug
    + two D20 dice), from
    `direttore-sportivo/assets/illustrations/after_bedtime_projects_logo.png`
  - `game_logo.png` — "Vita da DS" crest logo, same directory
  - `broodle-logo.png` / `broodle-mark.png` — Broodle's D20-dice "bro" logo,
    from `doodle-bro/public/`
- **Palette** — classic 4-color arcade board:
  - Black — dominant background
  - White — body text / high contrast elements
  - Gold — primary accent, matches the studio's existing brand color
  - Arcade red — secondary accent: CTAs, alerts, "insert coin" energy
- **Typography**:
  - Headings: a pixel/arcade font (Press Start 2P or Silkscreen) via Google
    Fonts CDN
  - Body copy: a clean sans or monospace font — pixel fonts are illegible at
    paragraph size, so they're reserved for headings/labels/UI chrome
- **Texture**: CRT scanline overlay + subtle screen-glow vignette across
  pages; blocky 8-bit borders and button styles for interactive elements.
  Effects must not reduce text contrast/readability below comfortable
  reading levels — this is checked explicitly during testing, not left to
  chance.
- **Signature moment**: Home page opens on a brief "INSERT COIN" / blinking
  "PRESS START" boot screen with a CRT power-on flicker, then reveals the
  real Home content.
  - Gated by `localStorage` so repeat visitors skip it instantly.
  - Purely a decorative overlay on first paint — the real Home markup exists
    and is crawlable in the DOM immediately; nothing is hidden behind JS for
    SEO purposes.
- **Footer easter egg**: every page's footer includes a line along the lines
  of "proudly made with just pure HTML" — sets the tone, honest about the
  no-framework build.

## Site structure

Plain static HTML/CSS/JS. No build step, no JS framework, no backend.

**URL structure**: Italian at root (primary language), English under `/en/`,
mirrored file trees. Every page pair cross-links via
`<link rel="alternate" hreflang="it">` / `hreflang="en"` tags. Each page has
its own language-appropriate `<title>` and meta description. Site ships a
`sitemap.xml` (listing both language versions of every page) and a
`robots.txt`.

**Pages (5 × 2 languages = 10 HTML files)**:

| Italian (root) | English (`/en/`) | Content |
|---|---|---|
| `/index.html` | `/en/index.html` | Home: insert-coin splash → hero → project teasers → brief about blurb → footer |
| `/chi-sono.html` | `/en/about.html` | About: the dad-dev story |
| `/vita-da-ds.html` | `/en/vita-da-ds.html` | Vita da DS project page — "in development" badge, no external store link yet |
| `/broodle.html` | `/en/broodle.html` | Broodle project page — CTA links out to https://broodle.it |
| `/contatti.html` | `/en/contact.html` | Contact: mailto email link + social links as clearly marked placeholders |

**Shared assets**: `/assets/css/`, `/assets/js/`, `/assets/img/`. Nav and
footer markup is duplicated per file (no includes/templating — that would
mean either a build step or client-side JS-rendered chrome, both of which
cut against "pure HTML" and against SEO-crawlable content). Kept short and
simple by design so duplication stays cheap to maintain across 10 files.

## Content notes per page

- **Home**: sets up the arcade framing immediately (splash, then hero using
  the After Bedtime Projects logo), teases both projects with a card/tile
  each linking to their project page, short pull-quote-style intro to the
  "dad who codes after bedtime" story linking through to the full About page.
- **About / Chi sono**: first-person(ish) story — indie developer, dad of a
  3-year-old, builds games and small tools in spare evening hours. This is
  where the "After Bedtime" name gets explained.
- **Vita da DS**: game logo + crest, description drawn from the existing
  Direttore Sportivo README framing (narrative football-manager game, you
  play as the DS, choices affect morale/reputation/results), "in sviluppo /
  in development" badge, no store link.
  - Reference source: `direttore-sportivo/README.md`
- **Broodle**: Broodle logo, description drawn from its README (Doodle-style
  group availability polls for planning game nights), CTA button out to
  https://broodle.it.
  - Reference source: `doodle-bro/README.md`
- **Contact / Contatti**: mailto link (address TBD by user — placeholder in
  code), social icons/links present in markup but pointing to clearly
  commented placeholder hrefs (e.g. `href="#"` with an HTML comment) since no
  real accounts exist yet.

## Testing / verification (no framework, no backend — scope accordingly)

- View every one of the 10 pages at mobile / tablet / desktop widths.
- Confirm every hreflang pair resolves to its counterpart correctly.
- Validate HTML (no unclosed tags, correct doctype/lang attributes per
  language).
- Confirm CRT scanline/glow effects don't drop text contrast below
  comfortable reading levels (spot-check with browser dev tools contrast
  checker).
- Confirm the insert-coin splash only shows once per browser (localStorage)
  and that Home page content is present in the DOM even if JS is disabled.

## Open items deferred on purpose

- Hosting/domain (Netlify vs GitHub Pages vs other) — not decided, out of
  scope for this spec.
- Real contact email address and social accounts — placeholders for now.
- Screenshots for project pages — none exist yet.
- Email signup / newsletter — needs a backend decision first.
