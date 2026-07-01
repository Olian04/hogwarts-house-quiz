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
Every answer awards 2 points to a primary house and 1 to a secondary — never 3 to one house alone. This serves two purposes: it makes the quiz harder to game (you can't be sure which answer maps to your house), and it reflects reality (a brave choice can also be strategic; a loyal choice can also be analytical).

Within each question, every house is the primary of exactly one answer (so every house can reach the same theoretical maximum). The secondary on each answer is chosen on **genuine thematic grounds** — documented in the answer's *Why* — not assigned to hit a quota. Across the whole quiz those secondaries are nonetheless balanced: each house's 20 secondaries are spread **7 / 7 / 6** among the other three houses (20 isn't divisible by 3, so a perfectly even split is impossible; 7/7/6 is the closest, arranged symmetrically so no house is favoured). The result is that "answer entirely as house X" yields **X: 100%** with the other three at a near-even **≈18 / 18 / 15%**, rather than a lopsided split.

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

> Answers are listed in primary-house order (Gryffindor, Hufflepuff, Ravenclaw, Slytherin) for readability; the app shuffles them on every render. The **Why** column is the same text shown under each answer when the quiz is opened with `?reasoning`.

### Q1 — Scenario
**You discover that a rule you've followed your whole life was founded on a lie. Your first instinct is to…**

| Answer | Points | Why |
|--------|--------|-----|
| Call it out. You can already tell you'll be the one who refuses to let the lie stand. | G: 2, R: 1 | Gryffindor (2): speaking up against a wrong the instant you see it is moral courage. Ravenclaw (1): the drive is also about the truth — you can't let a known falsehood stand. |
| Think of everyone who built their life around this rule, and what the truth will do to them. | H: 2, S: 1 | Hufflepuff (2): your first concern is the people it will hurt. Slytherin (1): you're also coolly reckoning with the fallout before you react. |
| Dig in and find out who started the lie, what they gained, and how it lasted so long. | R: 2, S: 1 | Ravenclaw (2): you need to understand the whole mechanism before judging it. Slytherin (1): you're drawn especially to who profited and how the lie held power. |
| Weigh what the rule has actually been doing before touching it — a false start doesn't make it useless. | S: 2, H: 1 | Slytherin (2): you judge the rule by what it does, not its origin — pragmatic and unsentimental. Hufflepuff (1): you're wary of upending something people quietly depend on. |

---

### Q2 — Dilemma
**You can save your closest friend or five strangers — but not both. You…**

| Answer | Points | Why |
|--------|--------|-----|
| Refuse the choice and throw everything you've got at saving all six, right to the last second. | G: 2, H: 1 | Gryffindor (2): refusing an impossible choice and fighting to the last second is raw courage. Hufflepuff (1): you can't accept writing anyone off — every life counts. |
| Save the five, and quietly carry what it costs you for the rest of your life. | H: 2, R: 1 | Hufflepuff (2): you do the collective right thing and shoulder the private grief without fanfare. Ravenclaw (1): beneath it, you accept the hard arithmetic that five outweigh one. |
| Do the math you don't want to do: five lives outweigh one, however much it hurts. | R: 2, G: 1 | Ravenclaw (2): you follow the logic to its uncomfortable conclusion. Gryffindor (1): and you have the nerve to act on it despite the pain. |
| Save your friend — the one person you could never live with yourself for abandoning. | S: 2, H: 1 | Slytherin (2): fierce loyalty to your chosen person over abstract numbers. Hufflepuff (1): it's the bond itself you won't betray. |

---

### Q3 — Scenario
**Three months into a project, you discover a flaw so fundamental it requires starting over. You…**

| Answer | Points | Why |
|--------|--------|-----|
| Dig in and grind through it — you don't walk away just because it turned brutal. | G: 2, S: 1 | Gryffindor (2): refusing to walk away when it turns brutal is courage under fire. Slytherin (1): it's also sheer determination to outlast the problem. |
| Start over without complaint. People are counting on this, and that's reason enough to do it right. | H: 2, G: 1 | Hufflepuff (2): you do the unglamorous work because people are relying on you. Gryffindor (1): and you square up to the setback instead of hiding it. |
| Refuse to hand over something you know is built wrong, and rebuild it properly — deadline or not. | R: 2, H: 1 | Ravenclaw (2): you won't ship something you know is incorrect. Hufflepuff (1): it's also the integrity you owe whoever receives it. |
| Step back and look for the angle no one's tried. There's usually a path that isn't brute force. | S: 2, R: 1 | Slytherin (2): you look for the cleverer route instead of brute force. Ravenclaw (1): it's a fundamentally analytical, reframing instinct. |

---

### Q4 — Values
**Which of these would bother you most in a leader?**

| Answer | Points | Why |
|--------|--------|-----|
| Bending on the things they swore they'd never bend on, the moment it's convenient. | G: 2, H: 1 | Gryffindor (2): a leader abandoning their convictions is the betrayal you can't stand. Hufflepuff (1): it also breaks faith with everyone who trusted them. |
| Letting the people who did the work fade into the background while they take the credit. | H: 2, G: 1 | Hufflepuff (2): fairness and due credit are sacred to you. Gryffindor (1): and claiming others' work is a plain dishonesty you'd call out. |
| Making the big call without ever really grasping what they're deciding on. | R: 2, S: 1 | Ravenclaw (2): deciding from ignorance is unforgivable. Slytherin (1): it's also simply dangerous incompetence. |
| Leaving their own people exposed when it actually counts. | S: 2, G: 1 | Slytherin (2): you protect your own above all, and a leader who doesn't fails the first duty. Gryffindor (1): abandoning people who counted on you offends your sense of honour. |

---

### Q5 — Introspective
**When you've done something you're not proud of, your first instinct is to…**

| Answer | Points | Why |
|--------|--------|-----|
| Own it out loud to whoever you wronged, before you lose the nerve. | G: 2, H: 1 | Gryffindor (2): facing whoever you wronged head-on takes courage. Hufflepuff (1): you feel you owe them that honesty directly. |
| Skip the apology speech and just start putting it right where it actually landed. | H: 2, R: 1 | Hufflepuff (2): repair through action, not performance. Ravenclaw (1): you focus on the actual effect, not the optics. |
| Work out why you did it — you can't fix what you don't understand. | R: 2, S: 1 | Ravenclaw (2): you can't fix what you don't understand. Slytherin (1): and understanding the cause is how you keep it from recurring. |
| Take stock of the whole situation and find the move that actually repairs it. | S: 2, G: 1 | Slytherin (2): you orient pragmatically toward the most effective fix. Gryffindor (1): but the aim is squarely to make it right. |

---

### Q6 — Hypothetical
**If you could be remembered for one thing, what would it be?**

| Answer | Points | Why |
|--------|--------|-----|
| The one time you stepped forward when everyone else stepped back. | G: 2, R: 1 | Gryffindor (2): the defining act of courage. Ravenclaw (1): it took clear sight to recognise the moment mattered. |
| The quiet difference you made to people who'll never make a speech about it. | H: 2, S: 1 | Hufflepuff (2): unsung impact on real people is your measure of a life. Slytherin (1): you value a legacy that endures in the people you touched. |
| An idea that left the world a little clearer than you found it. | R: 2, G: 1 | Ravenclaw (2): contributing understanding is the highest calling. Gryffindor (1): and changing how people see takes nerve. |
| Something you built that's still standing long after you're gone. | S: 2, H: 1 | Slytherin (2): a lasting monument to what you achieved. Hufflepuff (1): ideally something that goes on serving others. |

---

### Q7 — Introspective
**Your biggest flaw is probably…**

| Answer | Points | Why |
|--------|--------|-----|
| Acting before the rest of the room has finished thinking. | G: 2, S: 1 | Gryffindor (2): impulsiveness is courage's shadow. Slytherin (1): you trust your read and move on it before it's confirmed. |
| Bleeding yourself dry for other people and calling it normal. | H: 2, G: 1 | Hufflepuff (2): self-neglect through over-giving. Gryffindor (1): you throw yourself in with no thought for the cost to you. |
| Caring more about being right than being kind — and it's cost you people. | R: 2, H: 1 | Ravenclaw (2): truth over tact, the classic blind spot. Hufflepuff (1): and you feel the relational cost it leaves behind. |
| Wanting the win badly enough that the 'how' gets a little flexible. | S: 2, R: 1 | Slytherin (2): ends bending the means. Ravenclaw (1): and a clever mind that's good at rationalising it. |

---

### Q8 — Scenario
**A friend tells you a secret. Later, that secret becomes directly relevant to a serious problem affecting others. You…**

| Answer | Points | Why |
|--------|--------|-----|
| Give them until tomorrow to come forward themselves — and act if they don't. | G: 2, H: 1 | Gryffindor (2): you'll do the hard right thing, but face them first. Hufflepuff (1): giving them the chance is the fair thing to do. |
| Look for a way to fix the problem that doesn't make your friend the casualty. | H: 2, R: 1 | Hufflepuff (2): loyalty that refuses to sacrifice your friend. Ravenclaw (1): it takes ingenuity to find the path that spares everyone. |
| Decide the others' safety wins, say what must be said, and tell your friend exactly why. | R: 2, S: 1 | Ravenclaw (2): the greater good wins, fully reasoned and explained. Slytherin (1): you're clear-eyed about the cost to the friendship. |
| Keep it. You gave your word, and that isn't something you trade away. | S: 2, H: 1 | Slytherin (2): loyalty to your chosen people is absolute. Hufflepuff (1): a promise is a bond you simply don't break. |

---

### Q9 — Sensory
**Which environment feels most like home?**

| Answer | Points | Why |
|--------|--------|-----|
| A high, open ledge with the whole landscape falling away in front of you. | G: 2, R: 1 | Gryffindor (2): the exposed, fearless vantage point. Ravenclaw (1): and the sweeping perspective over everything. |
| A warm, crowded kitchen where everyone's talking over everyone. | H: 2, R: 1 | Hufflepuff (2): belonging in the warm crush of people. Ravenclaw (1): and the lively crossfire of voices and ideas. |
| A quiet room and a long, uninterrupted stretch of hours. | R: 2, S: 1 | Ravenclaw (2): deep, undisturbed focus is home. Slytherin (1): private, self-directed work on your own terms. |
| A space arranged exactly how you like it — nothing loud, nothing out of place. | S: 2, G: 1 | Slytherin (2): control and considered order. Gryffindor (1): a place that is unmistakably, defiantly yours. |

---

### Q10 — Values
**Which is most worth fighting for?**

| Answer | Points | Why |
|--------|--------|-----|
| The freedom to choose your own path, even when you choose badly. | G: 2, R: 1 | Gryffindor (2): liberty is the cause worth the fight. Ravenclaw (1): especially the freedom to think for yourself. |
| A fair shot for the people who never seem to get one. | H: 2, G: 1 | Hufflepuff (2): fairness for the overlooked. Gryffindor (1): standing up for people who can't fight back is courage in its plainest form. |
| The truth of a thing, whatever it turns out to be. | R: 2, G: 1 | Ravenclaw (2): truth is the fundamental value. Gryffindor (1): and it takes courage to face it unflinching. |
| A wall around the few people who are truly yours. | S: 2, H: 1 | Slytherin (2): you guard your inner circle above all. Hufflepuff (1): loyalty to your own people, fiercely kept. |

---

### Q11 — Scenario
**You realize you've been hired for a job based on an overestimation of your abilities. You…**

| Answer | Points | Why |
|--------|--------|-----|
| Tell them honestly where you stand, before it becomes a problem for anyone. | G: 2, S: 1 | Gryffindor (2): the brave, honest move before it festers. Slytherin (1): it also gets ahead of the story on your own terms. |
| Put your head down and out-work the gap until you've genuinely earned the seat. | H: 2, S: 1 | Hufflepuff (2): earn it through sheer diligence. Slytherin (1): a determined drive to make yourself genuinely indispensable. |
| Throw yourself into the material until the gap simply isn't there anymore. | R: 2, H: 1 | Ravenclaw (2): you close the gap by learning, relentlessly. Hufflepuff (1): backed by patient, honest hard work. |
| Quietly make yourself indispensable using what you're genuinely good at. | S: 2, R: 1 | Slytherin (2): strategic repositioning around your real strengths. Ravenclaw (1): a shrewd read of where your actual value lies. |

---

### Q12 — Dilemma
**A law prevents serious harm in 99% of cases — but you're in the 1% where following it would itself cause harm. You…**

| Answer | Points | Why |
|--------|--------|-----|
| Break it in the open and take whatever consequences come. | G: 2, H: 1 | Gryffindor (2): conviction over legality, consequences owned. Hufflepuff (1): and you accept the cost openly and fairly. |
| Follow it anyway — once you start making exceptions, the whole thing rots. | H: 2, G: 1 | Hufflepuff (2): fairness needs consistency; carve-outs corrode it. Gryffindor (1): holding the line on principle even when it's hard. |
| Treat your case as proof the law is broken, and go after the law itself. | R: 2, S: 1 | Ravenclaw (2): the exception exposes a systemic flaw to fix. Slytherin (1): you aim at changing the system itself. |
| Find the reading of the law that lets you do what's needed without breaking it. | S: 2, R: 1 | Slytherin (2): the resourceful workaround. Ravenclaw (1): a precise, lawyerly read of the rule's seams. |

---

### Q13 — Hypothetical
**You find out you have one year to live. You spend it…**

| Answer | Points | Why |
|--------|--------|-----|
| Settling your unfinished business out loud — the apology you owed, the wrong you never called out, the truth you never told. | G: 2, R: 1 | Gryffindor (2): spending the year facing the things that took nerve, not the things that took time. Ravenclaw (1): the untold truth still needs telling. |
| Making sure the people you love will be steady long after you're gone. | H: 2, R: 1 | Hufflepuff (2): their wellbeing comes before your own experience. Ravenclaw (1): and you plan it out carefully. |
| Getting everything you've figured out down on paper before it's lost. | R: 2, G: 1 | Ravenclaw (2): preserve and pass on what you know. Gryffindor (1): a bid to make your understanding count. |
| Spending every bit of influence you have on one thing that will outlast you. | S: 2, G: 1 | Slytherin (2): leverage focused for maximum, lasting impact. Gryffindor (1): spent on something that genuinely matters. |

---

### Q14 — Social
**At a party where you know almost no one, you…**

| Answer | Points | Why |
|--------|--------|-----|
| Throw yourself in — you usually leave with more people than you came with. | G: 2, H: 1 | Gryffindor (2): bold and outward without hesitation. Hufflepuff (1): a genuine warmth that gathers people in. |
| Drift toward whatever needs doing: refilling drinks, rescuing the stranded guest. | H: 2, S: 1 | Hufflepuff (2): you find purpose in quietly serving the room. Slytherin (1): making yourself useful and well-placed. |
| Find the one person worth talking to and stay there most of the night. | R: 2, G: 1 | Ravenclaw (2): depth over breadth, one real conversation. Gryffindor (1): direct, genuine engagement on your own terms. |
| Hang back and read the room before deciding where to spend your energy. | S: 2, H: 1 | Slytherin (2): strategic assessment before you commit. Hufflepuff (1): quietly working out where you actually fit. |

---

### Q15 — Values
**The world gets better mainly through…**

| Answer | Points | Why |
|--------|--------|-----|
| A few people willing to act on what they believe, even when it costs them. | G: 2, S: 1 | Gryffindor (2): courageous individuals acting on conviction. Slytherin (1): it takes real resolve to pay the price for it. |
| Ordinary people doing small, decent things, over and over. | H: 2, G: 1 | Hufflepuff (2): consistent, humble kindness compounding. Gryffindor (1): doing the right thing daily, even unwatched. |
| More people coming to know what's actually true. | R: 2, H: 1 | Ravenclaw (2): knowledge and honest information lift the world. Hufflepuff (1): it raises everyone, fairly and broadly. |
| Capable people getting themselves to where the real decisions are made. | S: 2, R: 1 | Slytherin (2): positioning competence near real power. Ravenclaw (1): it prizes ability and clear thinking in charge. |

---

### Q16 — Introspective
**When someone repeatedly underestimates you, you feel…**

| Answer | Points | Why |
|--------|--------|-----|
| An itch to go do the exact thing they say you can't — no speeches, just the doing. | G: 2, S: 1 | Gryffindor (2): defiance answered with action, not argument. Slytherin (1): there's a quiet competitive fire in it all the same. |
| Unbothered — what they think doesn't touch what you know about yourself. | H: 2, G: 1 | Hufflepuff (2): grounded, quiet self-worth. Gryffindor (1): a steady certainty in who you are. |
| Curious about what's making them read you that way. | R: 2, S: 1 | Ravenclaw (2): you analyse the misperception itself. Slytherin (1): and quietly study the angle it gives you. |
| Quietly pleased — being underestimated is a head start. | S: 2, R: 1 | Slytherin (2): being underestimated is an advantage to exploit. Ravenclaw (1): you coolly see the edge it hands you. |

---

### Q17 — Abstract
**You see yourself as…**

| Answer | Points | Why |
|--------|--------|-----|
| The spark that gets something moving when it's stuck. | G: 2, R: 1 | Gryffindor (2): the catalyst who ignites action. Ravenclaw (1): the spark is often an idea no one else had. |
| The foundation that keeps everything from falling down. | H: 2, R: 1 | Hufflepuff (2): the dependable base everything rests on. Ravenclaw (1): the load-bearing structure, quietly holding the design. |
| The lens that finally brings the blurry thing into focus. | R: 2, H: 1 | Ravenclaw (2): you make things clear. Hufflepuff (1): in service of helping others see, not just yourself. |
| The current that keeps things moving in a direction. | S: 2, G: 1 | Slytherin (2): the steady force that shapes where things go. Gryffindor (1): the momentum that drives them forward. |

---

### Q18 — Social
**You'd rather be respected by…**

| Answer | Points | Why |
|--------|--------|-----|
| People you'll never meet, years from now, because of something you did. | G: 2, R: 1 | Gryffindor (2): legacy as a moral act that outlives you. Ravenclaw (1): a lasting contribution that endures on merit. |
| The few who were there before any of this, and would be there after. | H: 2, S: 1 | Hufflepuff (2): the enduring bonds that predate any success. Slytherin (1): your loyal, chosen few above the crowd. |
| The handful of people whose judgment you'd actually defer to. | R: 2, G: 1 | Ravenclaw (2): respect from minds you genuinely respect. Gryffindor (1): regard that's honestly earned, not granted. |
| Strangers who take you seriously before you've said a word. | S: 2, H: 1 | Slytherin (2): presence and standing that precede you. Hufflepuff (1): being trusted on sight, sincerely. |

---

### Q19 — Scenario
**A beloved mentor asks your honest opinion on their work, which you privately think has serious problems. You…**

| Answer | Points | Why |
|--------|--------|-----|
| Give it to them straight. Softening it would be its own kind of disrespect. | G: 2, S: 1 | Gryffindor (2): honest to the point of bluntness, out of respect. Slytherin (1): you read candour as the genuinely useful move. |
| Lead with what genuinely works, then raise the hard parts with care. | H: 2, S: 1 | Hufflepuff (2): truth delivered kindly, cushioned with care. Slytherin (1): choosing how a hard truth lands is deliberate craft — framing is a tool. |
| Ask the questions that walk them to the problem themselves. | R: 2, H: 1 | Ravenclaw (2): the Socratic route to the insight. Hufflepuff (1): a gentle path that lets them keep their footing. |
| Read what they're really after before deciding how much to say. | S: 2, R: 1 | Slytherin (2): you gauge the real need before deciding what to say. Ravenclaw (1): modelling what they actually want from you. |

---

### Q20 — Abstract
**At your core, what matters most to you?**

| Answer | Points | Why |
|--------|--------|-----|
| Not letting fear be the thing that decides what you do. | G: 2, H: 1 | Gryffindor (2): the very definition of courage. Hufflepuff (1): a quiet steadiness that just keeps going. |
| Being the one who keeps showing up when no one's keeping score. | H: 2, S: 1 | Hufflepuff (2): dedication without applause. Slytherin (1): the long game of being the one who's always there. |
| Seeing things as they truly are, even when it isn't comforting. | R: 2, G: 1 | Ravenclaw (2): unflinching clarity is the core value. Gryffindor (1): it takes courage to look at hard truths without flinching. |
| Getting where you mean to go, whatever stands in the way. | S: 2, G: 1 | Slytherin (2): determination that won't be deflected. Gryffindor (1): the nerve to push through the obstacles. |

---

## Scoring System

### Point Accumulation
Each question has 4 answers. Every answer awards exactly **2 points** to a primary house and **1 point** to a secondary house — there are no pure 3-point answers.

- Within each question, each of the four houses is the **primary** of exactly one answer.
- Each answer's **secondary** is the house it second-most expresses, chosen on thematic grounds (see the *Why* column above) and never equal to its primary.
- Across all 20 questions, each house's 20 secondaries are distributed **7 / 7 / 6** among the other three houses — the most even split possible (see *No single-house answers*), arranged so every house's profile is symmetric.

Consequences, verified across all 20 questions:

| Metric (per house) | Value |
|--------------------|-------|
| Times primary | 20 |
| Times secondary | 20 |
| Total points in pool | 60 |
| **Theoretical maximum a player can earn** | **40** |

Every house is therefore equally represented, and "answer entirely as one house" gives that house 100% with the others at ≈18 / 18 / 15%.

### Inspecting the scoring (`?reasoning`)
Open the quiz with the hidden `?reasoning` query flag (e.g. `…/index.html?reasoning`) to reveal, beneath every answer, the exact leanings it awards and the rationale for them — the same text as the *Why* column above. It's an audit view for verifying that each allocation is genuinely motivated.

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
