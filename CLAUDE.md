# CLAUDE.md

Guidance for working in this repo.

## What this is
A Hogwarts house sorting quiz: a **static, vanilla HTML/CSS/JS single-page app**
with **no build step and no runtime dependencies**. Open it through any static
web server (not `file://`, or the manifest/assets/service-worker won't resolve):

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Files
- `index.html` — markup for every view: `#view-intro`, `#view-quiz`,
  `#view-suspense`, `#view-result`, `#view-choice` (tie-break), `#view-error`,
  `#view-about` (reached via `#about`), and the resume modal. Views are toggled
  with the `.active` class.
- `style.css` — all styling, theming, and animations.
- `quiz-data.js` — `HOUSES` (display data) and `QUESTIONS` (20 questions, each
  answer carrying `scores` and a `why`). Browser globals (no modules).
- `app.js` — routing, quiz flow, scoring, result-link encoding, sharing,
  cross-tab sync, and service-worker registration. Also a browser global.
- `sw.js` — service worker (offline cache). `site.webmanifest` — PWA manifest.
- `assets/` — house crest SVGs and the favicon/app-icon set.
- `QUIZ.md` — full design doc (every question, the scoring model, rationale).

## Scoring model (see QUIZ.md for the full version)
- Every answer gives **2 points to a primary house + 1 to a secondary**. Each
  question has exactly one primary per house, so every house's ceiling is **40**.
  A house's leaning = `round(raw / 40 * 100)` — scaled to its own max, so the
  four percentages do **not** sum to 100.
- Secondaries are chosen on thematic grounds (`why`) and balanced **7/7/6** per
  house across the quiz (20 isn't divisible by 3, so this is the most even split).
- Ties for the top are **not** auto-broken: the player chooses among the tied
  houses on `#view-choice`. For shared links that encode a tie without a recorded
  choice, `getWinningHouse` breaks it with a deterministic, house-neutral hash of
  the score vector (never a fixed alphabetical order).

## Result links
`encodeResults` packs the four leanings + an optional chosen-winner byte + a
checksum into an opaque base64url token: `#r/<token>` (e.g. `#r/ISswHCM`).
`decodeResults` validates the checksum; tampered/garbage tokens are rejected and
routed to `#view-error`. The token is light obfuscation, not security.

## Hidden flags
- `?reasoning` — reveals, under each answer, its exact leanings and the `why`.

## Theming
House colours live entirely in CSS: `.house-G/.house-H/.house-R/.house-S` set
`--house-primary` (readable shield colour), `--house-secondary` (metal accent),
and `--house-deep` (dark shade). Apply a `.house-*` class to theme a subtree
(the result container and each leanings bar get one). House names use a
primary→secondary gradient text fill.

## Accessibility
Keyboard: `1–4` / `A–D` pick the answer in that displayed position; `←/→`
navigate questions. `:focus-visible` rings on all controls. Focus moves to the
question heading / result house name on view changes. The progress bar updates
`aria-valuenow`/`aria-valuetext`. All motion is gated behind
`prefers-reduced-motion`.

## Offline / PWA
`sw.js` precaches the app shell + assets (stale-while-revalidate for assets,
network-first for navigations). **Bump `CACHE` in `sw.js` on each release** so
clients pick up new code.

## Releases / About page
`APP_VERSION` and `RELEASE_DATE` in `app.js` are the single source of truth for the
build identity shown on the About page (`#about`). **Bump them — and `CACHE` in
`sw.js` — on each release.** The About view (`#view-about`) is static markup in
`index.html`; `populateAbout()` fills the version/date line at load.

## Testing
There is no automated test suite (deliberately kept dependency-free). Verify
changes by serving the app and driving it with the pre-installed headless
Chromium via Playwright (see `PLAYWRIGHT_BROWSERS_PATH`). Pure logic (scoring
balance, link encode/decode, tie handling) can be exercised in Node by loading
`quiz-data.js` and the relevant slice of `app.js` with `new Function(...)` — the
browser globals have no Node exports.

## Conventions
- No frameworks, no build, no dependencies — keep it that way unless asked.
- Commit/push only when asked; develop on `main` for this repo.
