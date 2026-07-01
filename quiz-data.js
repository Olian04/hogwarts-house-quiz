const HOUSES = {
  G: {
    key: 'G',
    name: 'Gryffindor',
    primary: '#7b0000',
    secondary: '#c9a227',
    bg: 'linear-gradient(135deg, #3d0000 0%, #7b0000 50%, #4a1000 100%)',
    textOnDark: '#f9e4b7',
    animal: 'Lion',
    svg: 'assets/Gryffindor.svg',
    founder: 'Godric Gryffindor',
    ghost: 'Nearly Headless Nick',
    element: 'Fire',
    traits: ['Brave', 'Principled', 'Daring', 'Passionate', 'Direct'],
    notable: ['Harry Potter', 'Hermione Granger', 'Albus Dumbledore', 'Minerva McGonagall'],
    tagline: 'Brave at heart',
    description: 'You act when others hesitate — not because you\'re fearless, but because you\'ve decided that something matters more than your fear. Gryffindors hold courage and moral conviction above everything. They speak up, they confront, they refuse to be complicit in silence. Their flaw is impulsiveness: the same fire that drives them to act can drive them to act recklessly. But when things are at their worst, there are few people you\'d rather have beside you.',
    quote: '"It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends." — Albus Dumbledore'
  },
  H: {
    key: 'H',
    name: 'Hufflepuff',
    primary: '#e8a800',
    secondary: '#2e2118',
    bg: 'linear-gradient(135deg, #1a1200 0%, #4a3500 50%, #2e2118 100%)',
    textOnDark: '#fff8e0',
    animal: 'Badger',
    svg: 'assets/Hufflepuff.svg',
    founder: 'Helga Hufflepuff',
    ghost: 'The Fat Friar',
    element: 'Earth',
    traits: ['Loyal', 'Fair', 'Patient', 'Diligent', 'Humble'],
    notable: ['Newt Scamander', 'Nymphadora Tonks', 'Cedric Diggory', 'Pomona Sprout'],
    tagline: 'Loyal and true',
    description: 'You don\'t need applause to show up, and you don\'t need recognition to do the right thing. Hufflepuffs are the most reliably good people in any room — not the most dramatic, not the most vocal, but the ones who are still there when the shine has worn off. Their loyalty is broad and their fairness is genuine. They do the unglamorous work. Their flaw is that they give until it hurts, and sometimes forget they\'re allowed to ask for something back.',
    quote: '"I\'ll teach the lot and treat them just the same." — Helga Hufflepuff'
  },
  R: {
    key: 'R',
    name: 'Ravenclaw',
    primary: '#1a3a6b',
    secondary: '#8c6520',
    bg: 'linear-gradient(135deg, #060d1f 0%, #0e1a40 50%, #1a2a50 100%)',
    textOnDark: '#d8e8ff',
    animal: 'Eagle',
    svg: 'assets/Ravenclaw.svg',
    founder: 'Rowena Ravenclaw',
    ghost: 'The Grey Lady',
    element: 'Air',
    traits: ['Curious', 'Creative', 'Analytical', 'Independent', 'Perceptive'],
    notable: ['Luna Lovegood', 'Cho Chang', 'Filius Flitwick', 'Gilderoy Lockhart'],
    tagline: 'Wisdom beyond measure',
    description: 'You can\'t stop asking why. The defining Ravenclaw trait isn\'t intelligence — it\'s the compulsion to understand. You follow ideas wherever they lead, even into lonely or unpopular territory. You\'re comfortable being different, and you trust your own mind even when it takes you somewhere others won\'t follow. Your flaw is that being right can matter more to you than being kind, and the pursuit of understanding can become its own kind of isolation.',
    quote: '"Wit beyond measure is man\'s greatest treasure." — Rowena Ravenclaw'
  },
  S: {
    key: 'S',
    name: 'Slytherin',
    primary: '#1a5c30',
    secondary: '#8a8a8a',
    bg: 'linear-gradient(135deg, #040f07 0%, #0d2e18 50%, #1a3a20 100%)',
    textOnDark: '#d0f0d8',
    animal: 'Serpent',
    svg: 'assets/Slytherin.svg',
    founder: 'Salazar Slytherin',
    ghost: 'The Bloody Baron',
    element: 'Water',
    traits: ['Ambitious', 'Resourceful', 'Strategic', 'Self-aware', 'Determined'],
    notable: ['Merlin', 'Severus Snape', 'Regulus Black', 'Horace Slughorn'],
    tagline: 'Determined to achieve',
    description: 'You know what you want, and you don\'t apologize for wanting it. Slytherins are the most self-aware of all the houses — they understand how the world actually works, and they position themselves accordingly. They\'re fiercely loyal to the people they\'ve chosen. They play the long game when everyone else is reacting. Their flaw is a tendency toward cynicism and a willingness to justify means by ends — but Slytherin history is full of heroes who chose rightly precisely because they understood exactly what it cost.',
    quote: '"We Slytherins are brave, yes, but not stupid. For instance, given the choice, we will always choose to save our own necks." — Phineas Nigellus Black'
  }
};

// Scoring: every answer awards 2 points to a primary house and 1 to a secondary.
// Each question has exactly one primary per house (so every house has an
// identical theoretical maximum of 40). The secondaries are chosen for each
// answer on genuine thematic grounds — see each answer's `why` — and are balanced
// across the whole quiz so that each house's 20 secondaries are split 7/7/6 among
// the other three (20 isn't divisible by 3, so a perfectly even split is
// impossible; 7/7/6 is the closest, arranged symmetrically so no house is
// favoured). Each house is therefore a secondary exactly 20 times too.
//
// `why` explains the exact point split and is surfaced under each answer when the
// quiz is opened with the hidden ?reasoning flag. Answer order here is irrelevant
// — the app shuffles answers on every render.
const QUESTIONS = [
  {
    id: 1,
    type: 'Scenario',
    text: "You discover that a rule you've followed your whole life was founded on a lie. Your first instinct is to…",
    answers: [
      { text: "Call it out. You can already tell you'll be the one who refuses to let the lie stand.", scores: { G: 2, R: 1 },
        why: "Gryffindor (2): speaking up against a wrong the instant you see it is moral courage. Ravenclaw (1): the drive is also about the truth — you can't let a known falsehood stand." },
      { text: "Think of everyone who built their life around this rule, and what the truth will do to them.", scores: { H: 2, S: 1 },
        why: "Hufflepuff (2): your first concern is the people it will hurt. Slytherin (1): you're also coolly reckoning with the fallout before you react." },
      { text: "Dig in and find out who started the lie, what they gained, and how it lasted so long.", scores: { R: 2, S: 1 },
        why: "Ravenclaw (2): you need to understand the whole mechanism before judging it. Slytherin (1): you're drawn especially to who profited and how the lie held power." },
      { text: "Weigh what the rule has actually been doing before touching it — a false start doesn't make it useless.", scores: { S: 2, H: 1 },
        why: "Slytherin (2): you judge the rule by what it does, not its origin — pragmatic and unsentimental. Hufflepuff (1): you're wary of upending something people quietly depend on." }
    ]
  },
  {
    id: 2,
    type: 'Dilemma',
    text: "You can save your closest friend or five strangers — but not both. You…",
    answers: [
      { text: "Refuse the choice and throw everything you've got at saving all six, right to the last second.", scores: { G: 2, H: 1 },
        why: "Gryffindor (2): refusing an impossible choice and fighting to the last second is raw courage. Hufflepuff (1): you can't accept writing anyone off — every life counts." },
      { text: "Save the five, and quietly carry what it costs you for the rest of your life.", scores: { H: 2, R: 1 },
        why: "Hufflepuff (2): you do the collective right thing and shoulder the private grief without fanfare. Ravenclaw (1): beneath it, you accept the hard arithmetic that five outweigh one." },
      { text: "Do the math you don't want to do: five lives outweigh one, however much it hurts.", scores: { R: 2, G: 1 },
        why: "Ravenclaw (2): you follow the logic to its uncomfortable conclusion. Gryffindor (1): and you have the nerve to act on it despite the pain." },
      { text: "Save your friend — the one person you could never live with yourself for abandoning.", scores: { S: 2, H: 1 },
        why: "Slytherin (2): fierce loyalty to your chosen person over abstract numbers. Hufflepuff (1): it's the bond itself you won't betray." }
    ]
  },
  {
    id: 3,
    type: 'Scenario',
    text: "Three months into a project, you discover a flaw so fundamental it requires starting over. You…",
    answers: [
      { text: "Dig in and grind through it — you don't walk away just because it turned brutal.", scores: { G: 2, S: 1 },
        why: "Gryffindor (2): refusing to walk away when it turns brutal is courage under fire. Slytherin (1): it's also sheer determination to outlast the problem." },
      { text: "Start over without complaint. People are counting on this, and that's reason enough to do it right.", scores: { H: 2, G: 1 },
        why: "Hufflepuff (2): you do the unglamorous work because people are relying on you. Gryffindor (1): and you square up to the setback instead of hiding it." },
      { text: "Refuse to hand over something you know is built wrong, and rebuild it properly — deadline or not.", scores: { R: 2, H: 1 },
        why: "Ravenclaw (2): you won't ship something you know is incorrect. Hufflepuff (1): it's also the integrity you owe whoever receives it." },
      { text: "Step back and look for the angle no one's tried. There's usually a path that isn't brute force.", scores: { S: 2, R: 1 },
        why: "Slytherin (2): you look for the cleverer route instead of brute force. Ravenclaw (1): it's a fundamentally analytical, reframing instinct." }
    ]
  },
  {
    id: 4,
    type: 'Values',
    text: "Which of these would bother you most in a leader?",
    answers: [
      { text: "Bending on the things they swore they'd never bend on, the moment it's convenient.", scores: { G: 2, H: 1 },
        why: "Gryffindor (2): a leader abandoning their convictions is the betrayal you can't stand. Hufflepuff (1): it also breaks faith with everyone who trusted them." },
      { text: "Letting the people who did the work fade into the background while they take the credit.", scores: { H: 2, G: 1 },
        why: "Hufflepuff (2): fairness and due credit are sacred to you. Gryffindor (1): and claiming others' work is a plain dishonesty you'd call out." },
      { text: "Making the big call without ever really grasping what they're deciding on.", scores: { R: 2, S: 1 },
        why: "Ravenclaw (2): deciding from ignorance is unforgivable. Slytherin (1): it's also simply dangerous incompetence." },
      { text: "Leaving their own people exposed when it actually counts.", scores: { S: 2, G: 1 },
        why: "Slytherin (2): you protect your own above all, and a leader who doesn't fails the first duty. Gryffindor (1): abandoning people who counted on you offends your sense of honour." }
    ]
  },
  {
    id: 5,
    type: 'Introspective',
    text: "When you've done something you're not proud of, your first instinct is to…",
    answers: [
      { text: "Own it out loud to whoever you wronged, before you lose the nerve.", scores: { G: 2, H: 1 },
        why: "Gryffindor (2): facing whoever you wronged head-on takes courage. Hufflepuff (1): you feel you owe them that honesty directly." },
      { text: "Skip the apology speech and just start putting it right where it actually landed.", scores: { H: 2, R: 1 },
        why: "Hufflepuff (2): repair through action, not performance. Ravenclaw (1): you focus on the actual effect, not the optics." },
      { text: "Work out why you did it — you can't fix what you don't understand.", scores: { R: 2, S: 1 },
        why: "Ravenclaw (2): you can't fix what you don't understand. Slytherin (1): and understanding the cause is how you keep it from recurring." },
      { text: "Take stock of the whole situation and find the move that actually repairs it.", scores: { S: 2, G: 1 },
        why: "Slytherin (2): you orient pragmatically toward the most effective fix. Gryffindor (1): but the aim is squarely to make it right." }
    ]
  },
  {
    id: 6,
    type: 'Hypothetical',
    text: "If you could be remembered for one thing, what would it be?",
    answers: [
      { text: "The one time you stepped forward when everyone else stepped back.", scores: { G: 2, R: 1 },
        why: "Gryffindor (2): the defining act of courage. Ravenclaw (1): it took clear sight to recognise the moment mattered." },
      { text: "The quiet difference you made to people who'll never make a speech about it.", scores: { H: 2, S: 1 },
        why: "Hufflepuff (2): unsung impact on real people is your measure of a life. Slytherin (1): you value a legacy that endures in the people you touched." },
      { text: "An idea that left the world a little clearer than you found it.", scores: { R: 2, G: 1 },
        why: "Ravenclaw (2): contributing understanding is the highest calling. Gryffindor (1): and changing how people see takes nerve." },
      { text: "Something you built that's still standing long after you're gone.", scores: { S: 2, H: 1 },
        why: "Slytherin (2): a lasting monument to what you achieved. Hufflepuff (1): ideally something that goes on serving others." }
    ]
  },
  {
    id: 7,
    type: 'Introspective',
    text: "Your biggest flaw is probably…",
    answers: [
      { text: "Acting before the rest of the room has finished thinking.", scores: { G: 2, S: 1 },
        why: "Gryffindor (2): impulsiveness is courage's shadow. Slytherin (1): you trust your read and move on it before it's confirmed." },
      { text: "Bleeding yourself dry for other people and calling it normal.", scores: { H: 2, G: 1 },
        why: "Hufflepuff (2): self-neglect through over-giving. Gryffindor (1): you throw yourself in with no thought for the cost to you." },
      { text: "Caring more about being right than being kind — and it's cost you people.", scores: { R: 2, H: 1 },
        why: "Ravenclaw (2): truth over tact, the classic blind spot. Hufflepuff (1): and you feel the relational cost it leaves behind." },
      { text: "Wanting the win badly enough that the 'how' gets a little flexible.", scores: { S: 2, R: 1 },
        why: "Slytherin (2): ends bending the means. Ravenclaw (1): and a clever mind that's good at rationalising it." }
    ]
  },
  {
    id: 8,
    type: 'Scenario',
    text: "A friend tells you a secret. Later, that secret becomes directly relevant to a serious problem affecting others. You…",
    answers: [
      { text: "Give them until tomorrow to come forward themselves — and act if they don't.", scores: { G: 2, H: 1 },
        why: "Gryffindor (2): you'll do the hard right thing, but face them first. Hufflepuff (1): giving them the chance is the fair thing to do." },
      { text: "Look for a way to fix the problem that doesn't make your friend the casualty.", scores: { H: 2, R: 1 },
        why: "Hufflepuff (2): loyalty that refuses to sacrifice your friend. Ravenclaw (1): it takes ingenuity to find the path that spares everyone." },
      { text: "Decide the others' safety wins, say what must be said, and tell your friend exactly why.", scores: { R: 2, S: 1 },
        why: "Ravenclaw (2): the greater good wins, fully reasoned and explained. Slytherin (1): you're clear-eyed about the cost to the friendship." },
      { text: "Keep it. You gave your word, and that isn't something you trade away.", scores: { S: 2, H: 1 },
        why: "Slytherin (2): loyalty to your chosen people is absolute. Hufflepuff (1): a promise is a bond you simply don't break." }
    ]
  },
  {
    id: 9,
    type: 'Sensory',
    text: "Which environment feels most like home?",
    answers: [
      { text: "A high, open ledge with the whole landscape falling away in front of you.", scores: { G: 2, R: 1 },
        why: "Gryffindor (2): the exposed, fearless vantage point. Ravenclaw (1): and the sweeping perspective over everything." },
      { text: "A warm, crowded kitchen where everyone's talking over everyone.", scores: { H: 2, R: 1 },
        why: "Hufflepuff (2): belonging in the warm crush of people. Ravenclaw (1): and the lively crossfire of voices and ideas." },
      { text: "A quiet room and a long, uninterrupted stretch of hours.", scores: { R: 2, S: 1 },
        why: "Ravenclaw (2): deep, undisturbed focus is home. Slytherin (1): private, self-directed work on your own terms." },
      { text: "A space arranged exactly how you like it — nothing loud, nothing out of place.", scores: { S: 2, G: 1 },
        why: "Slytherin (2): control and considered order. Gryffindor (1): a place that is unmistakably, defiantly yours." }
    ]
  },
  {
    id: 10,
    type: 'Values',
    text: "Which is most worth fighting for?",
    answers: [
      { text: "The freedom to choose your own path, even when you choose badly.", scores: { G: 2, R: 1 },
        why: "Gryffindor (2): liberty is the cause worth the fight. Ravenclaw (1): especially the freedom to think for yourself." },
      { text: "A fair shot for the people who never seem to get one.", scores: { H: 2, G: 1 },
        why: "Hufflepuff (2): fairness for the overlooked. Gryffindor (1): standing up for people who can't fight back is courage in its plainest form." },
      { text: "The truth of a thing, whatever it turns out to be.", scores: { R: 2, G: 1 },
        why: "Ravenclaw (2): truth is the fundamental value. Gryffindor (1): and it takes courage to face it unflinching." },
      { text: "A wall around the few people who are truly yours.", scores: { S: 2, H: 1 },
        why: "Slytherin (2): you guard your inner circle above all. Hufflepuff (1): loyalty to your own people, fiercely kept." }
    ]
  },
  {
    id: 11,
    type: 'Scenario',
    text: "You realize you've been hired for a job based on an overestimation of your abilities. You…",
    answers: [
      { text: "Tell them honestly where you stand, before it becomes a problem for anyone.", scores: { G: 2, S: 1 },
        why: "Gryffindor (2): the brave, honest move before it festers. Slytherin (1): it also gets ahead of the story on your own terms." },
      { text: "Put your head down and out-work the gap until you've genuinely earned the seat.", scores: { H: 2, S: 1 },
        why: "Hufflepuff (2): earn it through sheer diligence. Slytherin (1): a determined drive to make yourself genuinely indispensable." },
      { text: "Throw yourself into the material until the gap simply isn't there anymore.", scores: { R: 2, H: 1 },
        why: "Ravenclaw (2): you close the gap by learning, relentlessly. Hufflepuff (1): backed by patient, honest hard work." },
      { text: "Quietly make yourself indispensable using what you're genuinely good at.", scores: { S: 2, R: 1 },
        why: "Slytherin (2): strategic repositioning around your real strengths. Ravenclaw (1): a shrewd read of where your actual value lies." }
    ]
  },
  {
    id: 12,
    type: 'Dilemma',
    text: "A law prevents serious harm in 99% of cases — but you're in the 1% where following it would itself cause harm. You…",
    answers: [
      { text: "Break it in the open and take whatever consequences come.", scores: { G: 2, H: 1 },
        why: "Gryffindor (2): conviction over legality, consequences owned. Hufflepuff (1): and you accept the cost openly and fairly." },
      { text: "Follow it anyway — once you start making exceptions, the whole thing rots.", scores: { H: 2, G: 1 },
        why: "Hufflepuff (2): fairness needs consistency; carve-outs corrode it. Gryffindor (1): holding the line on principle even when it's hard." },
      { text: "Treat your case as proof the law is broken, and go after the law itself.", scores: { R: 2, S: 1 },
        why: "Ravenclaw (2): the exception exposes a systemic flaw to fix. Slytherin (1): you aim at changing the system itself." },
      { text: "Find the reading of the law that lets you do what's needed without breaking it.", scores: { S: 2, R: 1 },
        why: "Slytherin (2): the resourceful workaround. Ravenclaw (1): a precise, lawyerly read of the rule's seams." }
    ]
  },
  {
    id: 13,
    type: 'Hypothetical',
    text: "You find out you have one year to live. You spend it…",
    answers: [
      { text: "Settling your unfinished business out loud — the apology you owed, the wrong you never called out, the truth you never told.", scores: { G: 2, R: 1 },
        why: "Gryffindor (2): spending the year facing the things that took nerve, not the things that took time. Ravenclaw (1): the untold truth still needs telling." },
      { text: "Making sure the people you love will be steady long after you're gone.", scores: { H: 2, R: 1 },
        why: "Hufflepuff (2): their wellbeing comes before your own experience. Ravenclaw (1): and you plan it out carefully." },
      { text: "Getting everything you've figured out down on paper before it's lost.", scores: { R: 2, G: 1 },
        why: "Ravenclaw (2): preserve and pass on what you know. Gryffindor (1): a bid to make your understanding count." },
      { text: "Spending every bit of influence you have on one thing that will outlast you.", scores: { S: 2, G: 1 },
        why: "Slytherin (2): leverage focused for maximum, lasting impact. Gryffindor (1): spent on something that genuinely matters." }
    ]
  },
  {
    id: 14,
    type: 'Social',
    text: "At a party where you know almost no one, you…",
    answers: [
      { text: "Throw yourself in — you usually leave with more people than you came with.", scores: { G: 2, H: 1 },
        why: "Gryffindor (2): bold and outward without hesitation. Hufflepuff (1): a genuine warmth that gathers people in." },
      { text: "Drift toward whatever needs doing: refilling drinks, rescuing the stranded guest.", scores: { H: 2, S: 1 },
        why: "Hufflepuff (2): you find purpose in quietly serving the room. Slytherin (1): making yourself useful and well-placed." },
      { text: "Find the one person worth talking to and stay there most of the night.", scores: { R: 2, G: 1 },
        why: "Ravenclaw (2): depth over breadth, one real conversation. Gryffindor (1): direct, genuine engagement on your own terms." },
      { text: "Hang back and read the room before deciding where to spend your energy.", scores: { S: 2, H: 1 },
        why: "Slytherin (2): strategic assessment before you commit. Hufflepuff (1): quietly working out where you actually fit." }
    ]
  },
  {
    id: 15,
    type: 'Values',
    text: "The world gets better mainly through…",
    answers: [
      { text: "A few people willing to act on what they believe, even when it costs them.", scores: { G: 2, S: 1 },
        why: "Gryffindor (2): courageous individuals acting on conviction. Slytherin (1): it takes real resolve to pay the price for it." },
      { text: "Ordinary people doing small, decent things, over and over.", scores: { H: 2, G: 1 },
        why: "Hufflepuff (2): consistent, humble kindness compounding. Gryffindor (1): doing the right thing daily, even unwatched." },
      { text: "More people coming to know what's actually true.", scores: { R: 2, H: 1 },
        why: "Ravenclaw (2): knowledge and honest information lift the world. Hufflepuff (1): it raises everyone, fairly and broadly." },
      { text: "Capable people getting themselves to where the real decisions are made.", scores: { S: 2, R: 1 },
        why: "Slytherin (2): positioning competence near real power. Ravenclaw (1): it prizes ability and clear thinking in charge." }
    ]
  },
  {
    id: 16,
    type: 'Introspective',
    text: "When someone repeatedly underestimates you, you feel…",
    answers: [
      { text: "An itch to go do the exact thing they say you can't — no speeches, just the doing.", scores: { G: 2, S: 1 },
        why: "Gryffindor (2): defiance answered with action, not argument. Slytherin (1): there's a quiet competitive fire in it all the same." },
      { text: "Unbothered — what they think doesn't touch what you know about yourself.", scores: { H: 2, G: 1 },
        why: "Hufflepuff (2): grounded, quiet self-worth. Gryffindor (1): a steady certainty in who you are." },
      { text: "Curious about what's making them read you that way.", scores: { R: 2, S: 1 },
        why: "Ravenclaw (2): you analyse the misperception itself. Slytherin (1): and quietly study the angle it gives you." },
      { text: "Quietly pleased — being underestimated is a head start.", scores: { S: 2, R: 1 },
        why: "Slytherin (2): being underestimated is an advantage to exploit. Ravenclaw (1): you coolly see the edge it hands you." }
    ]
  },
  {
    id: 17,
    type: 'Abstract',
    text: "You see yourself as…",
    answers: [
      { text: "The spark that gets something moving when it's stuck.", scores: { G: 2, R: 1 },
        why: "Gryffindor (2): the catalyst who ignites action. Ravenclaw (1): the spark is often an idea no one else had." },
      { text: "The foundation that keeps everything from falling down.", scores: { H: 2, R: 1 },
        why: "Hufflepuff (2): the dependable base everything rests on. Ravenclaw (1): the load-bearing structure, quietly holding the design." },
      { text: "The lens that finally brings the blurry thing into focus.", scores: { R: 2, H: 1 },
        why: "Ravenclaw (2): you make things clear. Hufflepuff (1): in service of helping others see, not just yourself." },
      { text: "The current that keeps things moving in a direction.", scores: { S: 2, G: 1 },
        why: "Slytherin (2): the steady force that shapes where things go. Gryffindor (1): the momentum that drives them forward." }
    ]
  },
  {
    id: 18,
    type: 'Social',
    text: "You'd rather be respected by…",
    answers: [
      { text: "People you'll never meet, years from now, because of something you did.", scores: { G: 2, R: 1 },
        why: "Gryffindor (2): legacy as a moral act that outlives you. Ravenclaw (1): a lasting contribution that endures on merit." },
      { text: "The few who were there before any of this, and would be there after.", scores: { H: 2, S: 1 },
        why: "Hufflepuff (2): the enduring bonds that predate any success. Slytherin (1): your loyal, chosen few above the crowd." },
      { text: "The handful of people whose judgment you'd actually defer to.", scores: { R: 2, G: 1 },
        why: "Ravenclaw (2): respect from minds you genuinely respect. Gryffindor (1): regard that's honestly earned, not granted." },
      { text: "Strangers who take you seriously before you've said a word.", scores: { S: 2, H: 1 },
        why: "Slytherin (2): presence and standing that precede you. Hufflepuff (1): being trusted on sight, sincerely." }
    ]
  },
  {
    id: 19,
    type: 'Scenario',
    text: "A beloved mentor asks your honest opinion on their work, which you privately think has serious problems. You…",
    answers: [
      { text: "Give it to them straight. Softening it would be its own kind of disrespect.", scores: { G: 2, S: 1 },
        why: "Gryffindor (2): honest to the point of bluntness, out of respect. Slytherin (1): you read candour as the genuinely useful move." },
      { text: "Lead with what genuinely works, then raise the hard parts with care.", scores: { H: 2, S: 1 },
        why: "Hufflepuff (2): truth delivered kindly, cushioned with care. Slytherin (1): choosing how a hard truth lands is deliberate craft — framing is a tool." },
      { text: "Ask the questions that walk them to the problem themselves.", scores: { R: 2, H: 1 },
        why: "Ravenclaw (2): the Socratic route to the insight. Hufflepuff (1): a gentle path that lets them keep their footing." },
      { text: "Read what they're really after before deciding how much to say.", scores: { S: 2, R: 1 },
        why: "Slytherin (2): you gauge the real need before deciding what to say. Ravenclaw (1): modelling what they actually want from you." }
    ]
  },
  {
    id: 20,
    type: 'Abstract',
    text: "At your core, what matters most to you?",
    answers: [
      { text: "Not letting fear be the thing that decides what you do.", scores: { G: 2, H: 1 },
        why: "Gryffindor (2): the very definition of courage. Hufflepuff (1): a quiet steadiness that just keeps going." },
      { text: "Being the one who keeps showing up when no one's keeping score.", scores: { H: 2, S: 1 },
        why: "Hufflepuff (2): dedication without applause. Slytherin (1): the long game of being the one who's always there." },
      { text: "Seeing things as they truly are, even when it isn't comforting.", scores: { R: 2, G: 1 },
        why: "Ravenclaw (2): unflinching clarity is the core value. Gryffindor (1): it takes courage to look at hard truths without flinching." },
      { text: "Getting where you mean to go, whatever stands in the way.", scores: { S: 2, G: 1 },
        why: "Slytherin (2): determination that won't be deflected. Gryffindor (1): the nerve to push through the obstacles." }
    ]
  }
];
