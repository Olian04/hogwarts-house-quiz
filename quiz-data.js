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
// Each question has exactly one primary per house, and the secondaries form a
// derangement, so every house has an identical theoretical maximum (40) and an
// identical total pool (60). Answer order in this file is irrelevant — the app
// shuffles answers on every render.
const QUESTIONS = [
  {
    id: 1,
    type: 'Scenario',
    text: "You discover that a rule you've followed your whole life was founded on a lie. Your first instinct is…",
    answers: [
      { text: "Something is wrong here, and you can already feel yourself about to be the one who says it out loud.", scores: { G: 2, H: 1 } },
      { text: "You think first of everyone else who built their life around it, and what this will do to them.", scores: { H: 2, R: 1 } },
      { text: "You want the whole story — who started it, what they gained, and how it held together for so long.", scores: { R: 2, S: 1 } },
      { text: "A false beginning doesn't make it useless. You weigh what it's actually been doing before touching it.", scores: { S: 2, G: 1 } }
    ]
  },
  {
    id: 2,
    type: 'Dilemma',
    text: "You can save your closest friend or five strangers — but not both. You…",
    answers: [
      { text: "Refuse the choice and throw everything you have at saving all six, right up to the final second.", scores: { G: 2, R: 1 } },
      { text: "Choose the five, and quietly carry what it cost you for the rest of your life.", scores: { H: 2, S: 1 } },
      { text: "Do the arithmetic you don't want to do: five lives weigh more than one, however much it hurts.", scores: { R: 2, G: 1 } },
      { text: "Save the one person you'd never be able to face yourself again for abandoning.", scores: { S: 2, H: 1 } }
    ]
  },
  {
    id: 3,
    type: 'Scenario',
    text: "Three months into a project, you discover a flaw so fundamental it requires starting over. You…",
    answers: [
      { text: "When it gets brutal is exactly when you refuse to walk away. You'll outlast the problem.", scores: { G: 2, S: 1 } },
      { text: "You begin again without drama. Someone's relying on this, and that's reason enough to do it right.", scores: { H: 2, G: 1 } },
      { text: "You won't put your name on something you know is built wrong. Rebuild it, deadline or not.", scores: { R: 2, H: 1 } },
      { text: "Step back and look for the angle nobody's tried. There's usually a path that isn't brute force.", scores: { S: 2, R: 1 } }
    ]
  },
  {
    id: 4,
    type: 'Values',
    text: "Which of these would bother you most in a leader?",
    answers: [
      { text: "They bend on the things they swore they'd never bend on, the moment it's inconvenient.", scores: { G: 2, H: 1 } },
      { text: "They let the people who did the work fade into the background while they take the bow.", scores: { H: 2, G: 1 } },
      { text: "They make the big call without ever really grasping what they're deciding about.", scores: { R: 2, S: 1 } },
      { text: "When it actually counts, they leave their own people exposed.", scores: { S: 2, R: 1 } }
    ]
  },
  {
    id: 5,
    type: 'Introspective',
    text: "When you've done something you're not proud of, your first instinct is…",
    answers: [
      { text: "Say it out loud to whoever you wronged, before you lose the nerve.", scores: { G: 2, H: 1 } },
      { text: "Skip the speech and just start putting it right where it actually landed.", scores: { H: 2, R: 1 } },
      { text: "Trace back why you did it — you can't fix what you don't understand.", scores: { R: 2, S: 1 } },
      { text: "Take stock of the whole situation and find the move that actually repairs it.", scores: { S: 2, G: 1 } }
    ]
  },
  {
    id: 6,
    type: 'Hypothetical',
    text: "If you could be remembered for one thing, what would you choose?",
    answers: [
      { text: "The one time you stepped forward when everyone else stepped back.", scores: { G: 2, R: 1 } },
      { text: "The quiet difference you made to people who'll never make a speech about it.", scores: { H: 2, S: 1 } },
      { text: "A single idea that left the world a little clearer than you found it.", scores: { R: 2, G: 1 } },
      { text: "Something you built that's still standing long after you're gone.", scores: { S: 2, H: 1 } }
    ]
  },
  {
    id: 7,
    type: 'Introspective',
    text: "Your biggest flaw is probably…",
    answers: [
      { text: "You're already moving before the rest of the room has finished thinking.", scores: { G: 2, S: 1 } },
      { text: "You'll bleed yourself dry for other people and call it normal.", scores: { H: 2, G: 1 } },
      { text: "You'd rather be correct than gentle, and it's cost you people.", scores: { R: 2, H: 1 } },
      { text: "You want the win enough that the 'how' gets a little flexible.", scores: { S: 2, R: 1 } }
    ]
  },
  {
    id: 8,
    type: 'Scenario',
    text: "A friend tells you a secret. Later, that secret becomes directly relevant to a serious problem affecting others. You…",
    answers: [
      { text: "Tell them they have until tomorrow to come forward themselves — and mean it.", scores: { G: 2, H: 1 } },
      { text: "Look for the path that protects everyone without making your friend the casualty.", scores: { H: 2, G: 1 } },
      { text: "Decide the others' safety wins, say what has to be said, and face your friend with the full why.", scores: { R: 2, S: 1 } },
      { text: "Keep it. You gave your word, and that isn't something you trade away.", scores: { S: 2, R: 1 } }
    ]
  },
  {
    id: 9,
    type: 'Sensory',
    text: "Which environment feels most like home?",
    answers: [
      { text: "A high, open edge with the whole landscape dropping away in front of you.", scores: { G: 2, H: 1 } },
      { text: "A crowded, warm kitchen where everyone's talking over everyone.", scores: { H: 2, R: 1 } },
      { text: "A still room and a long stretch of uninterrupted hours.", scores: { R: 2, S: 1 } },
      { text: "A space that's exactly as you arranged it — nothing loud, nothing out of place.", scores: { S: 2, G: 1 } }
    ]
  },
  {
    id: 10,
    type: 'Values',
    text: "Which is most worth fighting for?",
    answers: [
      { text: "The right to choose your own path, even badly.", scores: { G: 2, R: 1 } },
      { text: "A fair shake for the people who never seem to get one.", scores: { H: 2, S: 1 } },
      { text: "Knowing what's actually true, whatever it turns out to be.", scores: { R: 2, G: 1 } },
      { text: "A wall around the few people who are yours.", scores: { S: 2, H: 1 } }
    ]
  },
  {
    id: 11,
    type: 'Scenario',
    text: "You realize you've been hired for a job based on an overestimation of your abilities. You…",
    answers: [
      { text: "Tell them where you actually stand before it becomes a problem for anyone.", scores: { G: 2, S: 1 } },
      { text: "Put your head down and out-work the gap until you've genuinely earned the seat.", scores: { H: 2, G: 1 } },
      { text: "Disappear into the material until the gap simply isn't there anymore.", scores: { R: 2, H: 1 } },
      { text: "Quietly make yourself impossible to replace using what you're actually good at.", scores: { S: 2, R: 1 } }
    ]
  },
  {
    id: 12,
    type: 'Dilemma',
    text: "A law prevents serious harm in 99% of cases — but you're in the 1% where following it would itself cause harm. You…",
    answers: [
      { text: "Break it in the open and take whatever comes for it.", scores: { G: 2, H: 1 } },
      { text: "Follow it anyway. Once you start carving out exceptions, the whole thing rots.", scores: { H: 2, G: 1 } },
      { text: "Treat your case as proof the rule is broken, and go after the rule itself.", scores: { R: 2, S: 1 } },
      { text: "Find the reading of the rule that lets you do what's needed without breaking it.", scores: { S: 2, R: 1 } }
    ]
  },
  {
    id: 13,
    type: 'Hypothetical',
    text: "You find out you have one year to live. You spend it…",
    answers: [
      { text: "Doing all the things you were too afraid to do while there was still time to regret them.", scores: { G: 2, H: 1 } },
      { text: "Making sure the people you love will be steady long after you're not there.", scores: { H: 2, R: 1 } },
      { text: "Getting everything you've figured out down on paper before it's gone with you.", scores: { R: 2, S: 1 } },
      { text: "Spending every bit of leverage you have on one thing that'll outlast you.", scores: { S: 2, G: 1 } }
    ]
  },
  {
    id: 14,
    type: 'Social',
    text: "At a party where you know almost no one, you…",
    answers: [
      { text: "Throw yourself in — you tend to leave with more people than you arrived with.", scores: { G: 2, R: 1 } },
      { text: "Drift toward whatever needs doing — drinks refilled, the stranded person rescued.", scores: { H: 2, S: 1 } },
      { text: "Find the one person worth talking to and stay there most of the night.", scores: { R: 2, G: 1 } },
      { text: "Hang back and read the room before you decide where to spend your energy.", scores: { S: 2, H: 1 } }
    ]
  },
  {
    id: 15,
    type: 'Values',
    text: "The world gets better primarily through…",
    answers: [
      { text: "A few people willing to act on what they believe when it's costly to do so.", scores: { G: 2, S: 1 } },
      { text: "Ordinary people doing small, decent things, over and over.", scores: { H: 2, G: 1 } },
      { text: "More people knowing more true things.", scores: { R: 2, H: 1 } },
      { text: "Capable people getting themselves to where the real decisions are made.", scores: { S: 2, R: 1 } }
    ]
  },
  {
    id: 16,
    type: 'Introspective',
    text: "When someone repeatedly underestimates you, you feel…",
    answers: [
      { text: "A pull to prove them wrong somewhere everyone can see it.", scores: { G: 2, H: 1 } },
      { text: "Unbothered. What they think doesn't touch what you know about yourself.", scores: { H: 2, G: 1 } },
      { text: "Curious about what's making them read you that way.", scores: { R: 2, S: 1 } },
      { text: "Faintly pleased — being underestimated is a head start.", scores: { S: 2, R: 1 } }
    ]
  },
  {
    id: 17,
    type: 'Abstract',
    text: "You see yourself as…",
    answers: [
      { text: "The push that gets something moving when it's stuck.", scores: { G: 2, H: 1 } },
      { text: "The thing underneath that keeps it all from falling.", scores: { H: 2, R: 1 } },
      { text: "The one who finally makes the blurry thing make sense.", scores: { R: 2, S: 1 } },
      { text: "The steady pull that keeps things heading somewhere.", scores: { S: 2, G: 1 } }
    ]
  },
  {
    id: 18,
    type: 'Social',
    text: "You'd rather be respected by…",
    answers: [
      { text: "People you'll never meet, decades from now, because of something you did.", scores: { G: 2, R: 1 } },
      { text: "The people who were there before any of this, and would be there after.", scores: { H: 2, S: 1 } },
      { text: "The few people whose opinion you'd actually change your mind for.", scores: { R: 2, G: 1 } },
      { text: "Strangers who take you seriously before you've said a word.", scores: { S: 2, H: 1 } }
    ]
  },
  {
    id: 19,
    type: 'Scenario',
    text: "A beloved mentor asks your honest opinion on their work, which you privately think has serious problems. You…",
    answers: [
      { text: "Give it to them straight. Softening it would be its own kind of disrespect.", scores: { G: 2, S: 1 } },
      { text: "Start with what genuinely works, then raise the hard parts with care.", scores: { H: 2, G: 1 } },
      { text: "Ask the questions that'll walk them to the problem themselves.", scores: { R: 2, H: 1 } },
      { text: "Read what they're really after here before you decide how much to say.", scores: { S: 2, R: 1 } }
    ]
  },
  {
    id: 20,
    type: 'Abstract',
    text: "At your core, what matters most to you?",
    answers: [
      { text: "Not letting fear be the thing that decides what you do.", scores: { G: 2, H: 1 } },
      { text: "Being someone who keeps showing up when no one's keeping score.", scores: { H: 2, G: 1 } },
      { text: "Seeing things as they really are, even when it isn't comforting.", scores: { R: 2, S: 1 } },
      { text: "Getting where you mean to go, whatever's standing in the way.", scores: { S: 2, R: 1 } }
    ]
  }
];
