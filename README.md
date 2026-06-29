# The Sorting — Hogwarts House Quiz

A Hogwarts house sorting quiz built to be genuinely hard to game: 20 questions
that reveal what you *actually* value rather than letting you pick the house you
want. It's a single self-contained web page — no build step, no dependencies, no
backend.

🦁 Gryffindor · 🦡 Hufflepuff · 🦅 Ravenclaw · 🐍 Slytherin

---

## Features

- **20 questions across 8 types** — scenarios, dilemmas, values, introspection,
  hypotheticals, abstract self-image, social, and sensory — so no single angle
  gives the sorting away.
- **Un-gameable scoring.** Every answer quietly splits its points between two
  houses (2 to one, 1 to another) and describes a behaviour rather than naming a
  trait, so you can't reverse-engineer "the brave option."
- **Randomised answer order** on every render — the strongest answer for a house
  is never in a predictable position.
- **Ceiling-scaled leanings.** Each house's percentage is scored against its own
  theoretical maximum, so a result reads as "how close did you come to the most
  Ravenclaw-ish answer every time" rather than a slice of a pie.
- **The Sorting Hat's choice.** When houses tie for the top, the Hat doesn't pick
  for you — it tells you every tied house wants you and lets you *choose* where
  you belong (an homage to Harry choosing Gryffindor over Slytherin). The choice
  is recorded in the result link.
- **Shareable result links.** Results encode into a short, opaque, checksummed
  URL hash (e.g. `#r/ISswHCM`) that reopens the exact result without re-taking
  the quiz — including a tiebreak choice, if one was made. Tampered or broken
  links land on a friendly error page.
- **Resume support.** In-progress quizzes are saved to `localStorage`. Returning
  to the start prompts you to resume or start over, and progress is shared across
  tabs — advancing in one tab invalidates the others, which reload on refocus.
- **Atmospheric, responsive UI** — animated starfield, drifting house-colour
  aurora, staggered reveals, and a fully mobile-friendly layout with safe-area
  support. All motion respects `prefers-reduced-motion`.
- **Installable.** Ships a web app manifest and full favicon/icon set.

## Running it

It's a static site — open it through any web server (a server, rather than
`file://`, is needed so the favicon, manifest, and SVG assets resolve correctly):

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then visit <http://localhost:8000>.

## Project structure

```
index.html         Markup for the intro, quiz, result, and error views + resume modal
style.css          All styling, theming, animations, and responsive rules
app.js             Routing, quiz flow, scoring, share-link encoding, cross-tab sync
quiz-data.js       The four houses and all 20 questions with their scoring
site.webmanifest   PWA manifest
assets/            House crest SVGs and favicon/app-icon set
QUIZ.md            Full quiz design document — house philosophy, every question,
                   the scoring model, and the rationale behind each answer
```

## How sorting works (short version)

Each answer awards **2 points to a primary house and 1 to a secondary**. Across
the 20 questions every house is a primary exactly 20 times and a secondary
exactly 20 times, so all four houses share an identical theoretical maximum
(**40**) and total pool (**60**) — no house is over-represented. Your leaning for
a house is `round(points / 40 × 100)`, and the highest leaning wins (ties break
Gryffindor → Hufflepuff → Ravenclaw → Slytherin).

Every house can reach 100%, and the random-play winner distribution is even
(~25% each). Open the quiz with the hidden **`?reasoning`** flag (e.g.
`…/index.html?reasoning`) to see, under each answer, the exact leanings it awards
and why.

The full design — including every question, answer, and the reasoning behind the
scoring — lives in **[QUIZ.md](QUIZ.md)**.

## Result link format

A finished quiz produces a hash like `#r/ISswHCM`. The four leanings plus a
checksum byte are packed into a base64url token, so the numbers aren't visible or
trivially editable in the URL — editing the token breaks the checksum and the
link is rejected. This is light obfuscation to discourage faking results, not
security (the app is entirely client-side).

## Tech

Vanilla HTML, CSS, and JavaScript. No frameworks, no build tooling, no runtime
dependencies. Modern browser APIs used: `localStorage`, `BroadcastChannel` (with
a `storage`-event fallback), the History API, and `matchMedia` for reduced-motion
handling.

## Disclaimer

An unofficial, non-commercial fan project. Harry Potter and the Hogwarts houses
are the property of their respective rights holders; this project is not
affiliated with or endorsed by them.
