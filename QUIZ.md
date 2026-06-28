# The Hogwarts Sorting Quiz — Design Document

## Philosophy

Most sorting quizzes fail because every question is transparently house-coded: four answers, one obviously "brave," one obviously "clever," one obviously "loyal," one obviously "cunning." Players don't discover their house — they choose it.

This quiz is built around three principles:

1. **No obvious mapping.** Questions reveal values through trade-offs, not labels. The Gryffindor answer isn't the one that says "be brave" — it's the one a person driven by moral conviction would actually pick.
2. **Houses are defined by their flaws, not just their virtues.** A question that asks about your biggest weakness is more revealing than one that asks about your greatest strength.
3. **The split-score system.** Many answers award partial points to two houses. This reflects that real people are not pure archetypes — and it makes the quiz much harder to game.

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

### Avoid single-house answers
Whenever possible, answers should award partial points to two houses. This serves two purposes: it makes the quiz harder to game (you can't be sure which answer maps to your house), and it reflects reality (a brave choice can also be strategic; a loyal choice can also be analytical).

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

### Q1 — Scenario
**You discover that a rule you've followed your whole life was founded on a lie. Your first instinct is...**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Anger — you feel betrayed and want to expose it, immediately. | G: 3 | Gryffindors act on moral outrage; the lie is a wrong to be righted |
| Curiosity — you want to understand how and why the lie was created. | R: 3 | Ravenclaws lead with analysis; understanding comes before action |
| Caution — even a false origin doesn't automatically invalidate the rule. | S: 2, H: 1 | Slytherin pragmatism (rules have value regardless of origin); Hufflepuff deference to stability |
| Grief — you mourn the loss and think about all the others who believed it too. | H: 3 | Hufflepuffs feel outward, toward community impact first |

---

### Q2 — Dilemma
**You can save your closest friend or five strangers — but not both. You...**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Save your friend. You can't betray someone who trusts you completely. | S: 2, H: 1 | Slytherin's fierce loyalty to chosen people; some Hufflepuff resonance |
| Save the five. Greater suffering outweighs personal connection. | R: 2, G: 1 | Ravenclaw applies utilitarian logic; Gryffindor's moral framework includes it |
| Exhaust every possibility of saving everyone, right up to the last second. | G: 3 | Pure Gryffindor: refuse to accept an impossible choice; act despite |
| Save the five — and carry the grief of that choice for the rest of your life. | H: 3 | Hufflepuff does what's collectively right while absorbing the personal cost |

---

### Q3 — Scenario
**Three months into a project, you discover a flaw so fundamental it requires starting over. You...**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Submit what you have and flag the flaw transparently. Done is better than perfect. | S: 2, G: 1 | Slytherin pragmatism; Gryffindor honesty about the flaw |
| Start over, even if it means missing the deadline. You won't submit something broken. | R: 2, H: 1 | Ravenclaw: accuracy over speed; Hufflepuff: diligence over convenience |
| Pull an all-nighter. You're not walking away when it gets hard. | G: 2, H: 1 | Gryffindor refuses to surrender; Hufflepuff hard work ethic |
| Step back and look for a smarter angle. There's usually a better path than brute force. | R: 2, S: 1 | Ravenclaw analytical; Slytherin strategic optimization |

---

### Q4 — Values
**Which of these would bother you most in a leader?**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Taking credit for the team's work. | H: 3 | Hufflepuff: fairness and recognition are core values |
| Making major decisions without fully understanding the situation. | R: 3 | Ravenclaw: ignorance-driven decisions are unconscionable |
| Sacrificing their principles whenever it's convenient to do so. | G: 3 | Gryffindor: principled constancy is non-negotiable |
| Failing to protect their people when it actually counts. | S: 3 | Slytherin: protecting your own is a primary obligation |

---

### Q5 — Introspective
**When you've done something you're not proud of, your first instinct is...**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Confess and apologize, immediately — even when it's uncomfortable. | G: 3 | Gryffindor: direct confrontation of wrongdoing, even your own |
| Quietly make it right through actions rather than words. | H: 3 | Hufflepuff: repair over performance; deed over declaration |
| Understand why you did it before deciding how to address it. | R: 3 | Ravenclaw: root-cause analysis before response |
| Assess the full situation and find the most effective path forward. | S: 3 | Slytherin: pragmatic forward-orientation |

---

### Q6 — Hypothetical
**If you could be remembered for one thing, it would be...**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| A moment of extraordinary courage when everything was at stake. | G: 3 | Gryffindor legacy is the heroic act |
| The number of lives you made genuinely better. | H: 3 | Hufflepuff legacy is collective impact |
| A discovery or idea that changed how people understand the world. | R: 3 | Ravenclaw legacy is intellectual contribution |
| Something you built or created that outlasted you. | S: 3 | Slytherin legacy is lasting achievement |

---

### Q7 — Introspective
**Your biggest flaw is probably...**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| You act before you think. | G: 3 | Gryffindor's known shadow side: impulsiveness |
| Being right matters so much to you that you sometimes forget to be kind. | R: 3 | Ravenclaw's shadow: truth over compassion |
| You want success badly enough that you sometimes cut corners. | S: 3 | Slytherin's shadow: ends-justify-means thinking |
| You put others' needs so far above your own that you hurt yourself. | H: 3 | Hufflepuff's shadow: self-neglect through over-giving |

---

### Q8 — Scenario
**A friend tells you a secret. Later, that secret becomes directly relevant to a serious problem affecting others. You...**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Give them 24 hours to come forward themselves — then you act. | G: 2, H: 1 | Gryffindor acts on principle but gives the friend a chance; Hufflepuff fairness |
| Keep the secret. You gave your word, and trust is not conditional. | S: 2, H: 1 | Slytherin: loyalty to chosen people is absolute; Hufflepuff values the bond |
| Share it, and explain your full reasoning to your friend afterward. | R: 2, G: 1 | Ravenclaw: truth must win; Gryffindor: moral conviction backs it |
| Help your friend find a way to address the problem without breaking the confidence. | H: 2, R: 1 | Hufflepuff creative loyalty; Ravenclaw problem-solving |

---

### Q9 — Sensory
**Which environment feels most like home?**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Somewhere high and open — a cliff edge, a rooftop, an expanse of sky. | G: 2, R: 1 | Gryffindor: exposed, brave; Ravenclaw: perspective, overview |
| A warm, busy space full of people who know and love you. | H: 3 | Hufflepuff: community and belonging are home |
| A quiet library, workshop, or studio where you can lose yourself in focused work. | R: 2, S: 1 | Ravenclaw: deep focus; Slytherin: private ambition |
| Somewhere refined and considered — beautiful craftsmanship, everything in its place. | S: 3 | Slytherin: values excellence, order, aesthetic intentionality |

---

### Q10 — Values
**Which is most worth fighting for?**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Freedom. | G: 2, R: 1 | Gryffindor fights for freedom from tyranny; Ravenclaw for intellectual freedom |
| Justice. | H: 2, G: 1 | Hufflepuff: fairness as a core value; Gryffindor: fighting wrongs |
| Truth. | R: 3 | Ravenclaw: truth is the fundamental value |
| Safety for those you love. | S: 2, H: 1 | Slytherin: protecting inner circle; Hufflepuff: protecting community |

---

### Q11 — Scenario
**You realize you've been hired for a job based on an overestimation of your abilities. You...**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Work twice as hard to genuinely earn what they assumed you had. | H: 2, G: 1 | Hufflepuff work ethic; Gryffindor refusal to retreat |
| Come clean before it becomes a serious problem. | G: 2, R: 1 | Gryffindor honesty; Ravenclaw prefers truth over comfortable fiction |
| Find a way to become indispensable using your actual strengths. | S: 3 | Slytherin: resourceful, strategic repositioning |
| Study relentlessly until you've genuinely closed the gap. | R: 3 | Ravenclaw: close the knowledge gap through learning |

---

### Q12 — Dilemma
**A law prevents serious harm in 99% of cases — but you're in the 1% where following it would itself cause harm. You...**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Follow it. Exceptions corrupt the rule and open the door to worse ones. | H: 2, S: 1 | Hufflepuff: fairness requires consistency; Slytherin: systems have value |
| Break it and accept the consequences openly. | G: 3 | Gryffindor: moral conviction overrides legal constraint |
| Find a way to technically comply while still achieving what you need. | S: 2, R: 1 | Slytherin: find the creative workaround; Ravenclaw: find the loophole |
| Challenge it publicly. The 1% case reveals a deeper flaw that needs fixing. | R: 2, G: 1 | Ravenclaw: expose the systemic flaw; Gryffindor: fight it openly |

---

### Q13 — Hypothetical
**You find out you have one year to live. You spend it...**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Doing every terrifying thing you've been putting off. | G: 3 | Gryffindor: remove every remaining obstacle between you and courage |
| Making sure the people you love are okay without you. | H: 3 | Hufflepuff: their wellbeing supersedes personal experience |
| Writing, creating, or documenting everything you've learned and thought. | R: 3 | Ravenclaw: preserve and transmit knowledge |
| Using whatever influence you have to change something that actually matters. | S: 3 | Slytherin: position your final year for maximum impact |

---

### Q14 — Social
**At a party where you know almost no one, you...**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Find one genuinely interesting person and have a real conversation. | R: 2, G: 1 | Ravenclaw: depth over breadth; Gryffindor: direct engagement |
| Work the room — meeting new people gives you energy. | G: 2, S: 1 | Gryffindor: bold, outward; Slytherin: network-building |
| Look for ways to be useful — refilling drinks, making introductions. | H: 3 | Hufflepuff: purpose through service to the group |
| Observe the room for a while before deciding where to invest your attention. | S: 2, R: 1 | Slytherin: strategic assessment; Ravenclaw: read the situation first |

---

### Q15 — Values
**The world gets better primarily through...**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Individuals who act with courage on their convictions. | G: 3 | Gryffindor's theory of change |
| People doing small, consistent acts of genuine kindness. | H: 3 | Hufflepuff's theory of change |
| The spread of education and honest information. | R: 3 | Ravenclaw's theory of change |
| Capable people positioning themselves to actually drive real change. | S: 3 | Slytherin's theory of change |

---

### Q16 — Introspective
**When someone repeatedly underestimates you, you feel...**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Motivated to prove them wrong — publicly. | G: 2, S: 1 | Gryffindor: public vindication; some Slytherin strategic drive |
| Quietly certain of your own worth. Their opinion changes nothing. | H: 2, R: 1 | Hufflepuff: grounded self-worth; Ravenclaw: independent of others' judgments |
| Curious about what's shaping their perception of you. | R: 2, H: 1 | Ravenclaw: analyze the situation; Hufflepuff: empathetic inquiry |
| Like you've been handed a useful strategic advantage. | S: 3 | Slytherin: weaponize low expectations |

---

### Q17 — Abstract
**You see yourself as...**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| A spark — you ignite things. | G: 3 | Gryffindor: the catalyst, the initiator |
| A foundation — you hold things up. | H: 3 | Hufflepuff: the stabilizer, the sustainer |
| A lens — you help people see more clearly. | R: 3 | Ravenclaw: the clarifier, the illuminator |
| A current — you move things in a direction. | S: 3 | Slytherin: the force that shapes outcomes |

---

### Q18 — Social
**You'd rather be respected by...**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Strangers who sense your presence before knowing your story. | S: 2, G: 1 | Slytherin: gravitas and reputation; Gryffindor: presence and bearing |
| Your closest friends, who know everything about you. | H: 3 | Hufflepuff: authentic connection over surface impression |
| People whose minds you genuinely admire. | R: 3 | Ravenclaw: peer recognition from intellectual equals |
| People who haven't been born yet — through what you leave behind. | G: 2, R: 1 | Gryffindor: legacy as moral act; Ravenclaw: legacy as intellectual contribution |

---

### Q19 — Scenario
**A beloved mentor asks for your honest opinion on their work, which you privately think has serious problems. You...**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Give your full, honest assessment. They deserve the truth. | G: 2, R: 1 | Gryffindor: direct honesty even when difficult; Ravenclaw: truth serves them better |
| Lead with genuine strengths, then address the concerns with real care. | H: 3 | Hufflepuff: truth delivered with compassion |
| Ask questions that might lead them to see the issues themselves. | R: 2, S: 1 | Ravenclaw: Socratic method; Slytherin: indirect approach |
| Consider what they actually need from this conversation versus what's technically true. | S: 2, H: 1 | Slytherin: situationally intelligent response; Hufflepuff: attunement to need |

---

### Q20 — Abstract
**At your core, what matters most to you?**

| Answer | House Points | Rationale |
|--------|-------------|-----------|
| Being someone who acts, even when you're afraid. | G: 3 | The Gryffindor definition of courage |
| Being someone who shows up, even when it's thankless. | H: 3 | The Hufflepuff definition of dedication |
| Being someone who understands, even when the truth is hard. | R: 3 | The Ravenclaw definition of wisdom |
| Being someone who achieves, regardless of what stands in the way. | S: 3 | The Slytherin definition of determination |

---

## Scoring System

### Point Accumulation
Each question has 4 answers. Each answer awards either:
- **3 points** to one house (pure answer), or
- **2 points** to one house + **1 point** to a second (mixed answer)

Every question answered adds exactly **3 points** to the total pool.

### Percentage Calculation
After all 20 questions are answered (60 total points distributed):

```
raw_score[house] = sum of all points awarded to that house
percentage[house] = round(raw_score[house] / total_points * 100)
```

Rounding is applied, and any 1-point sum discrepancy is corrected against the highest-scoring house.

### House Assignment
The house with the highest percentage wins. Ties are broken by the order Gryffindor > Hufflepuff > Ravenclaw > Slytherin (canonical Pottermore tiebreaker direction).

### Score Calibration
The 20 questions are calibrated so that a person answering entirely randomly (equal probability across all answers) yields approximately equal scores across all four houses. Questions with mixed-point answers intentionally blur house boundaries, making the quiz nearly impossible to game without having read this document.

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
