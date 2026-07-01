# Simulated users — quiz accuracy panel

A reusable panel of ten fictional people used to test whether the quiz sorts
the way it should. Four align with a single house; six blend two houses (one
for every pair). Each has a **profile** — the only text a simulated
test-taker is ever shown — and an **expected alignment**, which is kept out
of the simulation entirely.

## Protocol (how a simulation run works)

1. Question and answer text is extracted from `quiz-data.js` **without** the
   `scores` or `why` fields, so nothing about the scoring model can leak.
2. Answer order is shuffled per question with a per-user seeded PRNG (the
   letters A–D mean different answers for different users), cancelling any
   position bias.
3. One isolated sub-agent per user receives only: the profile below and the
   sanitized, shuffled questionnaire, framed as a generic personality
   questionnaire — no Hogwarts framing, no access to the repository. It
   answers as that person honestly would and returns a letter per question.
4. The answer sheets are scored with the app's real scoring code
   (`calculateScores`), and the winning house / ties are compared against the
   expected alignment.

## Single-house users

### Jonas — expected: Gryffindor
Jonas, 34, is a rescue diver and volunteer firefighter. When something feels
wrong he says so, to anyone — he has openly contradicted his chief twice and
accepted the fallout both times. He is the first through the door when
someone is in trouble, and can't stand people who watch bad things happen and
call it "not my problem". He'd rather be disliked for doing what he believes
is right than liked for staying quiet. His friends tease him about the number
of times "one quick question of principle" has turned into a shouting match.
He acts fast, apologises rarely, and sleeps well.

### Maria — expected: Hufflepuff
Maria, 41, is a palliative-care nurse. She remembers every colleague's
birthday, covers shifts without being asked, and has held the hands of dying
strangers on her days off. She treats the hospital director and the cleaner
exactly the same, and it genuinely puzzles her that anyone wouldn't. She's
been on the same weekly potluck rota for eleven years. She never claims
credit, keeps every promise even when it costs her, and thinks the world is
mostly held together by people quietly doing unglamorous things properly.

### Priya — expected: Ravenclaw
Priya, 27, is a PhD student in astrophysics. She reads the footnotes of the
footnotes. She has followed a stray question into three-day rabbit holes so
often her office has a betting pool about it. Being the only person in the
room who disagrees doesn't bother her at all — being wrong and not knowing
why does. She'd rather understand a thing deeply than be admired for it,
loses track of meals when a problem gets interesting, and privately suspects
that most social rituals are just poorly documented protocols.

### Viktor — expected: Slytherin
Viktor, 30, founded his second company last year; the five-year plan for it
was written before the first company sold. He chooses his allies with the
same care other people choose their words, reads a room before he says
anything in it, and sees rules as the current state of a negotiation. He is
unembarrassed about wanting to win and thinks people who claim not to care
about status are usually just losing. To his small inner circle he is
ferociously protective; everyone else earns their way in.

## Dual-house users

### Sofia — expected: Gryffindor + Hufflepuff
Sofia, 38, is a human-rights caseworker. Half her job is confronting
officials who could make her life very difficult, and she does it without
flinching; the other half is years of patient, invisible paperwork for
families nobody else will help, and she does that without complaint. She'll
take a personal risk for a stranger and then quietly drive them home
afterwards. Fierce in the hearing room, gentle in the waiting room.

### David — expected: Gryffindor + Ravenclaw
David, 45, is an investigative journalist. He'll spend eight months in
archives untangling a paper trail purely because the numbers don't add up —
and then publish what he found even after the threatening phone calls start.
He believes a true thing is worth very little until someone is willing to
say it out loud, and that saying it out loud is worth very little unless
you've done the work to be sure it's true.

### Amara — expected: Gryffindor + Slytherin
Amara, 29, is a political organiser. She has been dragged out of two city
council meetings and regrets neither — but both scenes were planned weeks in
advance, for maximum effect, with the follow-up press release already
drafted. She picks fights she can win, wins them loudly, and banks the
momentum for the next one. She finds pointless martyrdom as distasteful as
cowardice: courage, to her, is a resource you spend where it moves the
needle.

### Henrik — expected: Hufflepuff + Ravenclaw
Henrik, 52, is a school librarian. He has infinite patience for the slowest
reader in the building and treats every child's question as worth a real
answer. His own reading is omnivorous to the point of comedy — beekeeping,
Byzantine history, the physics of coffee foam — knowledge for its own sake,
shared freely with anyone who wanders close. Steady, kind, endlessly curious,
entirely without ambition to be anywhere else.

### Linnea — expected: Hufflepuff + Slytherin
Linnea, 33, runs her family's restaurant. She works dawn to close beside her
staff, knows their kids' names, and has quietly paid more than one of their
emergency bills. She is also the reason the restaurant survived when three
neighbours closed: she renegotiated every supplier contract, sat on the
expansion plan for two years until the corner lot came up cheap, and never
shows her hand early. The softness is real and so is the steel; both are for
her people.

### Oskar — expected: Ravenclaw + Slytherin
Oskar, 26, is a quantitative trader and a tournament chess player. He fell in
love with the game for the beauty of it and stayed for the winning. He'll
study a single endgame for a week because it's elegant — and because next
month he'll use it to take someone apart. Understanding a system deeply and
then using that understanding to come out on top aren't two impulses for him;
they're one.

## Facet probes (Gryffindor)

Two extra users built to isolate the two faces of Gryffindor after run 1
showed its signal was diffuse. Same blind protocol.

### Ruben — expected: Gryffindor (daring/adventure facet)
Ruben, 31, is a BASE jumper and mountain guide. He says yes first and figures
the rest out on the way down. He chases the edge of fear on purpose — the
exposed ridge, the cold-water swim, the dare nobody else will take — because a
life with all the safety rails on doesn't feel like living. He walks into
parties full of strangers and leaves with new friends, blurts out exactly what
he thinks, and would rather have a scar and a story than a quiet evening.
Grand gestures, first one in, last one to flinch. He's not reckless with other
people — just entirely unafraid of his own skin.

### Ingrid — expected: Gryffindor (moral-courage facet)
Ingrid, 47, was a compliance officer until she found the fraud. She reported
it knowing exactly what it would cost her — the career, the friendships, the
quiet life — and testified alone, in hostile rooms, because it was true and
someone had to say it. She is private and reserved; she doesn't join clubs,
doesn't crave excitement, doesn't much care about being liked or remembered,
and has no ambitions beyond a clear conscience. What she cannot do is stay
silent while something wrong happens in front of her. She'd do it all again
tomorrow, alone if she had to.

## Run log

### Run 1 — 2026-07-01 (quiz v14) — 10/10 inside expected alignment

| User   | Expected | Result           |  G% |  H% |  R% |  S% | Verdict |
|--------|----------|------------------|----:|----:|----:|----:|---------|
| Jonas  | G        | Gryffindor       |  63 |  35 |  30 |  23 | HIT     |
| Maria  | H        | Hufflepuff       |  25 |  90 |  13 |  23 | HIT     |
| Priya  | R        | Ravenclaw        |  23 |  15 |  88 |  25 | HIT     |
| Viktor | S        | Slytherin        |  18 |  18 |  28 |  88 | HIT     |
| Sofia  | G+H      | Hufflepuff       |  30 |  73 |  25 |  23 | HIT     |
| David  | G+R      | Ravenclaw        |  43 |  28 |  60 |  20 | HIT     |
| Amara  | G+S      | Slytherin        |  25 |  20 |  33 |  73 | HIT     |
| Henrik | H+R      | Hufflepuff       |  20 |  63 |  43 |  25 | HIT     |
| Linnea | H+S      | Hufflepuff       |  13 |  73 |  20 |  45 | HIT     |
| Oskar  | R+S      | Ravenclaw        |  20 |  13 |  70 |  48 | HIT     |

Notes: every dual-house user landed in one of their two houses, and in 5 of 6
cases the other expected house was the clear runner-up (the exception is Amara,
whose Gryffindor leaning came third behind Ravenclaw). One pattern to watch:
**Gryffindor's signal is the most diffuse** — the pure-Gryffindor user peaked at
63% where the other three pure users hit 88–90%, and Gryffindor lost the top
spot in all three of its dual matchups. Not a miss, but the house whose answers
are hardest to "hit" consistently.

### Run 1 addendum — Gryffindor facet probes

| User   | Expected  | Result     |  G% |  H% |  R% |  S% | G-primaries picked |
|--------|-----------|------------|----:|----:|----:|----:|--------------------|
| Ruben  | G (daring)| Gryffindor |  83 |  20 |  20 |  28 | 16/20              |
| Ingrid | G (moral) | Gryffindor |  53 |  38 |  43 |  18 | 9/20               |

Diagnosis: the 20 Gryffindor-primary answers split into two facets — roughly 11
express **moral courage** (speak up, own it, take the consequences: Q1, 2, 4, 5,
6, 8, 11, 12, 15, 19, 20) and 9 express **daring / boldness / spotlight**
(thrill, extroversion, public vindication, legacy, liberty: Q3, 7, 9, 10, 13,
14, 16, 17, 18). A pure-daring player hits 83% (comparable to the other pure
houses); a pure-moral-courage player hits only 53%, with Ravenclaw (43) and
Hufflepuff (38) close behind — their missed questions leak to the H "care/fair"
and R "truth" options. Every house's answers cohere around one value except
Gryffindor's, which encode two — that's why G loses its dual matchups and why
the morally-brave sort weakest. Both probes still sorted Gryffindor, so this is
a calibration note, not a failure: 12/12 across the full panel.
