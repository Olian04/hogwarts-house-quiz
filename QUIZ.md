# The Hogwarts Sorting Quiz — Design Document

## Philosophy

Most sorting quizzes fail because every question is transparently house-coded: four answers, one obviously "brave," one obviously "clever," one obviously "loyal," one obviously "cunning." Players don't discover their house — they choose it.

This quiz is built around three principles:

1. **No obvious mapping.** Questions reveal values through trade-offs, not labels. The Gryffindor answer isn't the one that says "be brave" — it's the one a person driven by moral conviction would actually pick. Answers describe the *behaviour*, never the trait that names the house.
2. **Houses are defined by their flaws, not just their virtues.** A question that asks about your biggest weakness is more revealing than one that asks about your greatest strength.
3. **The split-score system.** Every answer awards 2 points to a primary house and 1 to a secondary. No answer belongs cleanly to a single house, which both reflects that real people aren't pure archetypes and makes the quiz much harder to game.
4. **Randomised answer order.** The four answers are shuffled on every render, so the highest-scoring option for a given house is never in a predictable position. You can't learn the pattern by watching where the "clever" answer keeps appearing.

---

## The Four Houses: What They Actually Value

### Gryffindor
**Core drive:** Acting on moral conviction, even when afraid.

Gryffindors are not people without fear — they're people who refuse to let fear govern them. They value directness, confrontation of wrongdoing, and personal honor. They are impulsive and will sometimes act before thinking. What separates a Gryffindor from a reckless person is that their impulsiveness is rooted in *principle*, not ego. They will almost always speak up; they'd rather be wrong loudly than silent.

**Key tension with other houses:**
- vs. Hufflepuff: Both fight for others, but Gryffindor confronts, Hufflepuff supports
- vs. Slytherin: Both bold and decisive, but Gryffindor acts on principle, Slytherin acts on strategy
- vs. Ravenclaw: Both challenge established thinking, but Gryffindor acts while Ravenclaw analyzes

**What they fear most:** Cowardice; being the person who said nothing when it mattered.

---

### Hufflepuff
**Core drive:** Fairness, loyalty, and doing the unglamorous work.

Hufflepuffs are not the "leftovers." They are the house that values community over glory, consistency over brilliance, and fairness over advantage. They work hard because they believe in the work, not the recognition. They are deeply loyal, but their loyalty is more democratic than Slytherin's — they extend it broadly rather than to a chosen few.

**Key tension with other houses:**
- vs. Gryffindor: Hufflepuffs don't need a dramatic stand — they prefer sustainable, consistent action
- vs. Ravenclaw: Hufflepuffs trust people and relationships; Ravenclaws trust data and logic
- vs. Slytherin: Hufflepuffs reject the idea that some people matter more than others

**What they fear most:** Exclusion; being the person who lets someone down who depended on them.

---

### Ravenclaw
**Core drive:** Understanding the world as it truly is.

Ravenclaws are often reduced to "the smart ones," but that misses the point. The defining quality isn't intelligence — it's curiosity and a compulsion to understand. They follow ideas wherever they lead, even into uncomfortable territory. They value being right over being popular, and truth over comfort. Luna Lovegood is as quintessentially Ravenclaw as Hermione (who is herself arguably a Gryffindor-Ravenclaw hybrid).

**Key tension with other houses:**
- vs. Hufflepuff: Both thoughtful and deliberate, but Ravenclaws prioritize truth while Hufflepuffs prioritize care
- vs. Slytherin: Both analytical and planning-oriented, but Ravenclaws value truth for its own sake while Slytherins value it instrumentally
- vs. Gryffindor: Both challenge convention, but Ravenclaws want to understand while Gryffindors want to act

**What they fear most:** Ignorance; being confidently wrong; never finding the answer.

---

### Slytherin
**Core drive:** Self-determination and protecting what they've chosen to protect.

Slytherins have been unfairly flattened into villains. The defining quality isn't cruelty — it's *self-awareness*. Slytherins know what they want, understand how the world works, and refuse to be naive about either. They play the long game. They are fiercely loyal to their inner circle. Their ambition is not the ambition of the desperate — it's the ambition of people who believe they have something to offer and intend to be in a position to offer it.

**Key tension with other houses:**
- vs. Gryffindor: Both decisive, but Slytherin chooses battles deliberately while Gryffindor charges in
- vs. Hufflepuff: Slytherin's loyalty is selective and deep; Hufflepuff's is broad and inclusive
- vs. Ravenclaw: Both value knowledge, but Slytherin uses it as a tool; Ravenclaw values it as an end

**What they fear most:** Powerlessness; being manipulated by someone who knew the board better.

---

## Question Design Principles

### No single-house answers
Every answer awards 2 points to a primary house and 1 to a secondary — never 3 to one house alone. This serves two purposes: it makes the quiz harder to game (you can't be sure which answer maps to your house), and it reflects reality (a brave choice can also be strategic; a loyal choice can also be analytical). Within each question, every house is the primary of exactly one answer and the secondary of exactly one other, so no house is over- or under-represented.

### Use adversarial question types
The most revealing questions force trade-offs between things all good people value:
- Loyalty vs. truth (Q8)
- Principle vs. pragmatism (Q12)
- Personal vs. collective (Q2)
- Action vs. understanding (Q3, Q11)

### Flaw questions outperform virtue questions
"What is your biggest flaw?" (Q7) tells you far more than "What is your greatest virtue?" People choose idealized virtues; their chosen flaws reveal their actual values.

### Abstract and sensory questions bypass conscious sorting
Questions like Q17 ("You see yourself as...") and Q9 ("Which environment feels like home?") are nearly impossible to consciously house-code. People answer from genuine preference, not strategy.

---

## The Twenty Questions

> Answers below are listed in primary-house order (Gryffindor, Hufflepuff, Ravenclaw, Slytherin) for readability. In the app they are **shuffled on every render**, so this ordering is never visible to the player.

### Q1 — Scenario
**You discover that a rule you've followed your whole life was founded on a lie. Your first instinct is to…**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Call it out. You can already tell you'll be the one who refuses to let the lie stand. | G: 2, H: 1 | Gryffindor moves to confront; Hufflepuff feels the wrong done to people |
| Think of everyone who built their life around this rule, and what the truth will do to them. | H: 2, R: 1 | Hufflepuff feels outward to community; Ravenclaw to the implications |
| Dig in and find out who started the lie, what they gained, and how it lasted so long. | R: 2, S: 1 | Ravenclaw needs to understand; Slytherin reads the power behind it |
| Weigh what the rule has actually been doing before touching it — a false start doesn't make it useless. | S: 2, G: 1 | Slytherin pragmatism; Gryffindor still tests it against principle |

---

### Q2 — Dilemma
**You can save your closest friend or five strangers — but not both. You…**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Refuse the choice and throw everything you've got at saving all six, right to the last second. | G: 2, R: 1 | Gryffindor refuses an impossible choice; Ravenclaw improvises a third option |
| Save the five, and quietly carry what it costs you for the rest of your life. | H: 2, S: 1 | Hufflepuff bears the collective cost; Slytherin accepts the hard call |
| Do the math you don't want to do: five lives outweigh one, however much it hurts. | R: 2, G: 1 | Ravenclaw applies the logic; Gryffindor's morality includes it |
| Save your friend — the one person you could never live with yourself for abandoning. | S: 2, H: 1 | Slytherin's loyalty to chosen people; Hufflepuff's to the bond |

---

### Q3 — Scenario
**Three months into a project, you discover a flaw so fundamental it requires starting over. You…**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Dig in and grind through it — you don't walk away just because it turned brutal. | G: 2, S: 1 | Gryffindor won't surrender; Slytherin's sheer determination |
| Start over without complaint. People are counting on this, and that's reason enough to do it right. | H: 2, G: 1 | Hufflepuff diligence for those who depend on it; Gryffindor's resolve |
| Refuse to hand over something you know is built wrong, and rebuild it properly — deadline or not. | R: 2, H: 1 | Ravenclaw: correctness over speed; Hufflepuff: integrity in the work |
| Step back and look for the angle no one's tried. There's usually a path that isn't brute force. | S: 2, R: 1 | Slytherin strategic optimization; Ravenclaw analytical |

---

### Q4 — Values
**Which of these would bother you most in a leader?**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Bending on the things they swore they'd never bend on, the moment it's convenient. | G: 2, H: 1 | Gryffindor: principled constancy; Hufflepuff: broken faith |
| Letting the people who did the work fade into the background while they take the credit. | H: 2, G: 1 | Hufflepuff: fairness and credit; Gryffindor: honour |
| Making the big call without ever really grasping what they're deciding on. | R: 2, S: 1 | Ravenclaw: ignorance is unconscionable; Slytherin: incompetence is dangerous |
| Leaving their own people exposed when it actually counts. | S: 2, R: 1 | Slytherin: protect your own; Ravenclaw: failure of judgment |

---

### Q5 — Introspective
**When you've done something you're not proud of, your first instinct is to…**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Own it out loud to whoever you wronged, before you lose the nerve. | G: 2, H: 1 | Gryffindor: direct confession; Hufflepuff: owe it to the person |
| Skip the apology speech and just start putting it right where it actually landed. | H: 2, R: 1 | Hufflepuff: repair over performance; Ravenclaw: address the real effect |
| Work out why you did it — you can't fix what you don't understand. | R: 2, S: 1 | Ravenclaw: root-cause first; Slytherin: understand to prevent recurrence |
| Take stock of the whole situation and find the move that actually repairs it. | S: 2, G: 1 | Slytherin: pragmatic repair; Gryffindor: make it right |

---

### Q6 — Hypothetical
**If you could be remembered for one thing, what would it be?**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| The one time you stepped forward when everyone else stepped back. | G: 2, R: 1 | Gryffindor: the decisive act; Ravenclaw: the clarity to see it mattered |
| The quiet difference you made to people who'll never make a speech about it. | H: 2, S: 1 | Hufflepuff: unsung impact; Slytherin: lasting effect on chosen people |
| An idea that left the world a little clearer than you found it. | R: 2, G: 1 | Ravenclaw: intellectual contribution; Gryffindor: changing things |
| Something you built that's still standing long after you're gone. | S: 2, H: 1 | Slytherin: lasting achievement; Hufflepuff: something that serves others |

---

### Q7 — Introspective
**Your biggest flaw is probably…**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Acting before the rest of the room has finished thinking. | G: 2, S: 1 | Gryffindor: impulsiveness; Slytherin: acting on a read before it's confirmed |
| Bleeding yourself dry for other people and calling it normal. | H: 2, G: 1 | Hufflepuff: self-neglect; Gryffindor: throwing yourself in |
| Caring more about being right than being kind — and it's cost you people. | R: 2, H: 1 | Ravenclaw: truth over compassion; Hufflepuff: the relational cost |
| Wanting the win badly enough that the 'how' gets a little flexible. | S: 2, R: 1 | Slytherin: ends-over-means; Ravenclaw: rationalizing it |

---

### Q8 — Scenario
**A friend tells you a secret. Later, that secret becomes directly relevant to a serious problem affecting others. You…**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Give them until tomorrow to come forward themselves — and act if they don't. | G: 2, H: 1 | Gryffindor acts on principle but gives a fair chance; Hufflepuff fairness |
| Look for a way to fix the problem that doesn't make your friend the casualty. | H: 2, G: 1 | Hufflepuff: creative loyalty; Gryffindor: refusing to abandon either duty |
| Decide the others' safety wins, say what must be said, and tell your friend exactly why. | R: 2, S: 1 | Ravenclaw: truth must win, fully reasoned; Slytherin: clear-eyed cost |
| Keep it. You gave your word, and that isn't something you trade away. | S: 2, R: 1 | Slytherin: loyalty to chosen people is absolute; Ravenclaw: a principle held |

---

### Q9 — Sensory
**Which environment feels most like home?**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| A high, open ledge with the whole landscape falling away in front of you. | G: 2, H: 1 | Gryffindor: exposed, fearless; Hufflepuff: grounded in the world |
| A warm, crowded kitchen where everyone's talking over everyone. | H: 2, R: 1 | Hufflepuff: belonging; Ravenclaw: the buzz of minds |
| A quiet room and a long, uninterrupted stretch of hours. | R: 2, S: 1 | Ravenclaw: deep focus; Slytherin: private, self-directed work |
| A space arranged exactly how you like it — nothing loud, nothing out of place. | S: 2, G: 1 | Slytherin: order and intention; Gryffindor: a place that's truly yours |

---

### Q10 — Values
**Which is most worth fighting for?**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| The freedom to choose your own path, even when you choose badly. | G: 2, R: 1 | Gryffindor: freedom from tyranny; Ravenclaw: intellectual freedom |
| A fair shot for the people who never seem to get one. | H: 2, S: 1 | Hufflepuff: fairness; Slytherin: protecting the overlooked |
| The truth of a thing, whatever it turns out to be. | R: 2, G: 1 | Ravenclaw: truth as fundamental; Gryffindor: facing it bravely |
| A wall around the few people who are truly yours. | S: 2, H: 1 | Slytherin: protect the inner circle; Hufflepuff: protect your people |

---

### Q11 — Scenario
**You realize you've been hired for a job based on an overestimation of your abilities. You…**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Tell them honestly where you stand, before it becomes a problem for anyone. | G: 2, S: 1 | Gryffindor: honesty even when costly; Slytherin: control the narrative early |
| Put your head down and out-work the gap until you've genuinely earned the seat. | H: 2, G: 1 | Hufflepuff: work ethic; Gryffindor: refusal to retreat |
| Throw yourself into the material until the gap simply isn't there anymore. | R: 2, H: 1 | Ravenclaw: close the gap by learning; Hufflepuff: diligence |
| Quietly make yourself indispensable using what you're genuinely good at. | S: 2, R: 1 | Slytherin: strategic repositioning; Ravenclaw: leverage real strengths |

---

### Q12 — Dilemma
**A law prevents serious harm in 99% of cases — but you're in the 1% where following it would itself cause harm. You…**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Break it in the open and take whatever consequences come. | G: 2, H: 1 | Gryffindor: conviction over legality; Hufflepuff: accept the consequences fairly |
| Follow it anyway — once you start making exceptions, the whole thing rots. | H: 2, G: 1 | Hufflepuff: fairness requires consistency; Gryffindor: holding the line |
| Treat your case as proof the law is broken, and go after the law itself. | R: 2, S: 1 | Ravenclaw: expose the systemic flaw; Slytherin: change the system |
| Find the reading of the law that lets you do what's needed without breaking it. | S: 2, R: 1 | Slytherin: the creative workaround; Ravenclaw: the precise loophole |

---

### Q13 — Hypothetical
**You find out you have one year to live. You spend it…**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Doing all the things you were always too afraid to do. | G: 2, H: 1 | Gryffindor: face every fear; Hufflepuff: live fully among others |
| Making sure the people you love will be steady long after you're gone. | H: 2, R: 1 | Hufflepuff: their wellbeing first; Ravenclaw: plan it carefully |
| Getting everything you've figured out down on paper before it's lost. | R: 2, S: 1 | Ravenclaw: preserve knowledge; Slytherin: leave something lasting |
| Spending every bit of influence you have on one thing that will outlast you. | S: 2, G: 1 | Slytherin: maximum final impact; Gryffindor: make it count |

---

### Q14 — Social
**At a party where you know almost no one, you…**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Throw yourself in — you usually leave with more people than you came with. | G: 2, R: 1 | Gryffindor: bold, outward; Ravenclaw: drawn to new people and ideas |
| Drift toward whatever needs doing: refilling drinks, rescuing the stranded guest. | H: 2, S: 1 | Hufflepuff: service to the group; Slytherin: quietly making yourself useful |
| Find the one person worth talking to and stay there most of the night. | R: 2, G: 1 | Ravenclaw: depth over breadth; Gryffindor: direct, genuine engagement |
| Hang back and read the room before deciding where to spend your energy. | S: 2, H: 1 | Slytherin: strategic assessment; Hufflepuff: finding where you fit |

---

### Q15 — Values
**The world gets better mainly through…**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| A few people willing to act on what they believe, even when it costs them. | G: 2, S: 1 | Gryffindor: courageous individuals; Slytherin: the willing few who move |
| Ordinary people doing small, decent things, over and over. | H: 2, G: 1 | Hufflepuff: consistent kindness; Gryffindor: doing right daily |
| More people coming to know what's actually true. | R: 2, H: 1 | Ravenclaw: education; Hufflepuff: lifting everyone equally |
| Capable people getting themselves to where the real decisions are made. | S: 2, R: 1 | Slytherin: positioning for change; Ravenclaw: competence in power |

---

### Q16 — Introspective
**When someone repeatedly underestimates you, you feel…**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| A pull to prove them wrong somewhere everyone can see it. | G: 2, H: 1 | Gryffindor: public vindication; Hufflepuff: wanting to be seen truly |
| Unbothered — what they think doesn't touch what you know about yourself. | H: 2, G: 1 | Hufflepuff: grounded self-worth; Gryffindor: quiet certainty |
| Curious about what's making them read you that way. | R: 2, S: 1 | Ravenclaw: analyze the perception; Slytherin: study the misread |
| Quietly pleased — being underestimated is a head start. | S: 2, R: 1 | Slytherin: weaponize low expectations; Ravenclaw: see the advantage |

---

### Q17 — Abstract
**You see yourself as…**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| The spark that gets something moving when it's stuck. | G: 2, H: 1 | Gryffindor: the catalyst; Hufflepuff: the one who helps it along |
| The foundation that keeps everything from falling down. | H: 2, R: 1 | Hufflepuff: the foundation; Ravenclaw: the load-bearing structure |
| The lens that finally brings the blurry thing into focus. | R: 2, S: 1 | Ravenclaw: the clarifier; Slytherin: the one who sees the real shape |
| The current that keeps things moving in a direction. | S: 2, G: 1 | Slytherin: the directional force; Gryffindor: the momentum |

---

### Q18 — Social
**You'd rather be respected by…**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| People you'll never meet, years from now, because of something you did. | G: 2, R: 1 | Gryffindor: legacy as a moral act; Ravenclaw: lasting contribution |
| The few who were there before any of this, and would be there after. | H: 2, S: 1 | Hufflepuff: enduring bonds; Slytherin: the loyal chosen few |
| The handful of people whose judgment you'd actually defer to. | R: 2, G: 1 | Ravenclaw: respect from those you respect; Gryffindor: earned, honest regard |
| Strangers who take you seriously before you've said a word. | S: 2, H: 1 | Slytherin: gravitas and reputation; Hufflepuff: being trusted on sight |

---

### Q19 — Scenario
**A beloved mentor asks your honest opinion on their work, which you privately think has serious problems. You…**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Give it to them straight. Softening it would be its own kind of disrespect. | G: 2, S: 1 | Gryffindor: direct honesty; Slytherin: respect through candor |
| Lead with what genuinely works, then raise the hard parts with care. | H: 2, G: 1 | Hufflepuff: truth with compassion; Gryffindor: still telling it |
| Ask the questions that walk them to the problem themselves. | R: 2, H: 1 | Ravenclaw: the Socratic route; Hufflepuff: a gentle path |
| Read what they're really after before deciding how much to say. | S: 2, R: 1 | Slytherin: situational intelligence; Ravenclaw: model their actual need |

---

### Q20 — Abstract
**At your core, what matters most to you?**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Not letting fear be the thing that decides what you do. | G: 2, H: 1 | The Gryffindor definition of courage; Hufflepuff steadiness |
| Being the one who keeps showing up when no one's keeping score. | H: 2, G: 1 | The Hufflepuff definition of dedication; Gryffindor constancy |
| Seeing things as they truly are, even when it isn't comforting. | R: 2, S: 1 | The Ravenclaw definition of wisdom; Slytherin clear-sightedness |
| Getting where you mean to go, whatever stands in the way. | S: 2, R: 1 | The Slytherin definition of determination; Ravenclaw focus |

---

## Scoring System

### Point Accumulation
Each question has 4 answers. Every answer awards exactly **2 points** to a primary house and **1 point** to a secondary house — there are no pure 3-point answers. Within each question:

- Each of the four houses is the **primary** of exactly one answer.
- Each of the four houses is the **secondary** of exactly one answer (the secondaries form a derangement of the primaries, so primary and secondary never coincide).

Consequences, verified across all 20 questions:

| Metric (per house) | Value |
|--------------------|-------|
| Times primary | 20 |
| Times secondary | 20 |
| Total points in pool | 60 |
| **Theoretical maximum a player can earn** | **40** |

Every house is therefore exactly equally represented.

### Percentage Calculation
Leanings are scaled against each house's **own theoretical maximum**, not against the other houses. A house's ceiling is the sum, over all questions, of the highest score that house can earn in that question (2 every time → **40**):

```
raw_score[house]  = sum of all points awarded to that house
percentage[house] = round(raw_score[house] / theoretical_max[house] * 100)
```

So a player who earns 36 of a possible 40 toward Ravenclaw reads as **90% Ravenclaw**. Each leaning is an independent 0–100% measure of "how close did you come to the most X-aligned answer every time" — the four percentages are **not** a pie chart and do not sum to 100%.

### House Assignment
The house with the highest percentage wins. Because every ceiling is identical (40), the winner is also simply the highest raw score.

**Ties are the player's to settle.** When two, three, or all four houses tie for the top, the Sorting Hat doesn't decide for you — it tells you that more than one house would be proud to claim you and lets you *choose* which one you belong to (an echo of Harry being allowed to choose Gryffindor over Slytherin). The choice is recorded in the shareable result link so it always reproduces.

A fixed alphabetical tiebreak was deliberately *removed*: ties occur in ~11% of random playthroughs, and always awarding them to the earliest house (Gryffindor) measurably skewed results toward it. For the rare case where a result link encodes a tie but no recorded choice, the winner is derived deterministically from the score pattern itself — fairly, without favouring any house.

### Randomised Answer Order
Answers are shuffled with a Fisher–Yates pass on every render. The app tracks each answer's *original* index for scoring, so the shuffle is purely presentational — the highest-scoring answer for any house lands in an unpredictable position each time, and patterns can't be learned across questions.

### Score Calibration
Because primaries and secondaries are perfectly balanced, a player answering entirely at random trends toward equal scores across all four houses. The 2/1 split on every answer intentionally blurs house boundaries, and combined with the randomised order, makes the quiz very hard to game without having read this document.

---

## Question Type Distribution

| Type | Questions | Purpose |
|------|-----------|---------|
| Scenario | 1, 3, 8, 11, 19 | Real-world behavior under pressure |
| Dilemma | 2, 12 | Values revealed by impossible choices |
| Values | 4, 10, 15 | Direct examination of what matters |
| Introspective | 5, 7, 16 | Self-knowledge and shadow sides |
| Hypothetical | 6, 13 | Pure values, stripped of context |
| Abstract | 17, 20 | Self-image and identity |
| Social | 14, 18 | Interpersonal behavior and recognition |
| Sensory | 9 | Gut-level environmental preference |

---

## Source Material

House characterizations draw from:
- J.K. Rowling, *Harry Potter* series (books, primary canon)
- Pottermore / WizardingWorld.com house descriptions and Sorting Hat histories
- The Sorting Hat's songs (Philosopher's Stone, Order of the Phoenix, Goblet of Fire)
- Character analysis of confirmed house members across all seven books
- WizardingWorld.com official quiz design principles (emphasis on non-obvious questions)
