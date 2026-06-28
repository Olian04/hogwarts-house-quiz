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

const QUESTIONS = [
  {
    id: 1,
    type: 'Scenario',
    text: "You discover that a rule you've followed your whole life was founded on a lie. Your first instinct is…",
    answers: [
      { text: "Anger. You feel betrayed and want to expose it, immediately.", scores: { G: 3 } },
      { text: "Curiosity. You want to understand how and why the lie was created.", scores: { R: 3 } },
      { text: "Caution. Even a false origin doesn't automatically invalidate the rule.", scores: { S: 2, H: 1 } },
      { text: "Grief. You mourn the loss and think about all the others who believed it too.", scores: { H: 3 } }
    ]
  },
  {
    id: 2,
    type: 'Dilemma',
    text: "You can save your closest friend or five strangers — but not both. You…",
    answers: [
      { text: "Save your friend. You can't betray someone who trusts you completely.", scores: { S: 2, H: 1 } },
      { text: "Save the five. Greater suffering outweighs personal connection.", scores: { R: 2, G: 1 } },
      { text: "Exhaust every possibility of saving everyone, right up to the last second.", scores: { G: 3 } },
      { text: "Save the five — and carry the grief of that choice for the rest of your life.", scores: { H: 3 } }
    ]
  },
  {
    id: 3,
    type: 'Scenario',
    text: "Three months into a project, you discover a flaw so fundamental it requires starting over. You…",
    answers: [
      { text: "Submit what you have and flag the flaw openly. Done is better than perfect.", scores: { S: 2, G: 1 } },
      { text: "Start over, even if it means missing the deadline. You won't submit something broken.", scores: { R: 2, H: 1 } },
      { text: "Pull an all-nighter. You're not walking away when it gets hard.", scores: { G: 2, H: 1 } },
      { text: "Step back and look for a smarter angle. There's usually a better path than brute force.", scores: { R: 2, S: 1 } }
    ]
  },
  {
    id: 4,
    type: 'Values',
    text: "Which of these would bother you most in a leader?",
    answers: [
      { text: "Taking credit for the team's work.", scores: { H: 3 } },
      { text: "Making major decisions without fully understanding the situation.", scores: { R: 3 } },
      { text: "Sacrificing their principles whenever it's convenient.", scores: { G: 3 } },
      { text: "Failing to protect their people when it actually counts.", scores: { S: 3 } }
    ]
  },
  {
    id: 5,
    type: 'Introspective',
    text: "When you've done something you're not proud of, your first instinct is…",
    answers: [
      { text: "Confess and apologize immediately — even when it's deeply uncomfortable.", scores: { G: 3 } },
      { text: "Quietly make it right through actions rather than words.", scores: { H: 3 } },
      { text: "Understand why you did it before deciding how to address it.", scores: { R: 3 } },
      { text: "Assess the full situation and find the most effective path forward.", scores: { S: 3 } }
    ]
  },
  {
    id: 6,
    type: 'Hypothetical',
    text: "If you could be remembered for one thing, what would you choose?",
    answers: [
      { text: "A moment of extraordinary courage when everything was at stake.", scores: { G: 3 } },
      { text: "The number of lives you made genuinely better.", scores: { H: 3 } },
      { text: "A discovery or idea that changed how people understand the world.", scores: { R: 3 } },
      { text: "Something you built that outlasted you.", scores: { S: 3 } }
    ]
  },
  {
    id: 7,
    type: 'Introspective',
    text: "Your biggest flaw is probably…",
    answers: [
      { text: "You act before you think.", scores: { G: 3 } },
      { text: "Being right matters so much to you that you sometimes forget to be kind.", scores: { R: 3 } },
      { text: "You want success badly enough that you sometimes cut corners.", scores: { S: 3 } },
      { text: "You put others' needs so far above your own that you hurt yourself.", scores: { H: 3 } }
    ]
  },
  {
    id: 8,
    type: 'Scenario',
    text: "A friend tells you a secret. Later, that secret becomes directly relevant to a serious problem affecting others. You…",
    answers: [
      { text: "Give them 24 hours to come forward themselves — then you act.", scores: { G: 2, H: 1 } },
      { text: "Keep the secret. You gave your word, and trust is not conditional.", scores: { S: 2, H: 1 } },
      { text: "Share it, and explain your full reasoning to your friend afterward.", scores: { R: 2, G: 1 } },
      { text: "Help your friend find a way to address the problem without breaking the confidence.", scores: { H: 2, R: 1 } }
    ]
  },
  {
    id: 9,
    type: 'Sensory',
    text: "Which environment feels most like home?",
    answers: [
      { text: "Somewhere high and open — a cliff edge, a rooftop, an expanse of sky.", scores: { G: 2, R: 1 } },
      { text: "A warm, busy space full of people who know and love you.", scores: { H: 3 } },
      { text: "A quiet library, workshop, or studio where you can lose yourself in focused work.", scores: { R: 2, S: 1 } },
      { text: "Somewhere refined and considered — beautiful craftsmanship, everything in its place.", scores: { S: 3 } }
    ]
  },
  {
    id: 10,
    type: 'Values',
    text: "Which is most worth fighting for?",
    answers: [
      { text: "Freedom.", scores: { G: 2, R: 1 } },
      { text: "Justice.", scores: { H: 2, G: 1 } },
      { text: "Truth.", scores: { R: 3 } },
      { text: "Safety for those you love.", scores: { S: 2, H: 1 } }
    ]
  },
  {
    id: 11,
    type: 'Scenario',
    text: "You realize you've been hired for a job based on an overestimation of your abilities. You…",
    answers: [
      { text: "Work twice as hard to genuinely earn what they assumed you had.", scores: { H: 2, G: 1 } },
      { text: "Come clean before it becomes a serious problem.", scores: { G: 2, R: 1 } },
      { text: "Find a way to become indispensable using your actual strengths.", scores: { S: 3 } },
      { text: "Study relentlessly until you've genuinely closed the gap.", scores: { R: 3 } }
    ]
  },
  {
    id: 12,
    type: 'Dilemma',
    text: "A law prevents serious harm in 99% of cases — but you're in the 1% where following it would itself cause harm. You…",
    answers: [
      { text: "Follow it. Exceptions corrupt the rule and open the door to worse ones.", scores: { H: 2, S: 1 } },
      { text: "Break it and accept the consequences openly.", scores: { G: 3 } },
      { text: "Find a way to technically comply while still achieving what you need.", scores: { S: 2, R: 1 } },
      { text: "Challenge it publicly. The 1% case reveals a deeper flaw that needs fixing.", scores: { R: 2, G: 1 } }
    ]
  },
  {
    id: 13,
    type: 'Hypothetical',
    text: "You find out you have one year to live. You spend it…",
    answers: [
      { text: "Doing every terrifying thing you've been putting off.", scores: { G: 3 } },
      { text: "Making sure the people you love will be okay without you.", scores: { H: 3 } },
      { text: "Writing, creating, or documenting everything you've learned.", scores: { R: 3 } },
      { text: "Using whatever influence you have to change something that actually matters.", scores: { S: 3 } }
    ]
  },
  {
    id: 14,
    type: 'Social',
    text: "At a party where you know almost no one, you…",
    answers: [
      { text: "Find one genuinely interesting person and have a real conversation.", scores: { R: 2, G: 1 } },
      { text: "Work the room — meeting new people gives you energy.", scores: { G: 2, S: 1 } },
      { text: "Look for ways to be useful — refilling drinks, making introductions.", scores: { H: 3 } },
      { text: "Observe the room for a while before deciding where to invest your energy.", scores: { S: 2, R: 1 } }
    ]
  },
  {
    id: 15,
    type: 'Values',
    text: "The world gets better primarily through…",
    answers: [
      { text: "Individuals who act with courage on their convictions.", scores: { G: 3 } },
      { text: "People doing small, consistent acts of genuine kindness.", scores: { H: 3 } },
      { text: "The spread of education and honest information.", scores: { R: 3 } },
      { text: "Capable people positioning themselves to actually drive real change.", scores: { S: 3 } }
    ]
  },
  {
    id: 16,
    type: 'Introspective',
    text: "When someone repeatedly underestimates you, you feel…",
    answers: [
      { text: "Motivated to prove them wrong — publicly.", scores: { G: 2, S: 1 } },
      { text: "Quietly certain of your own worth. Their opinion changes nothing.", scores: { H: 2, R: 1 } },
      { text: "Curious about what's shaping their perception of you.", scores: { R: 2, H: 1 } },
      { text: "Like you've been handed a useful strategic advantage.", scores: { S: 3 } }
    ]
  },
  {
    id: 17,
    type: 'Abstract',
    text: "You see yourself as…",
    answers: [
      { text: "A spark — you ignite things.", scores: { G: 3 } },
      { text: "A foundation — you hold things up.", scores: { H: 3 } },
      { text: "A lens — you help people see more clearly.", scores: { R: 3 } },
      { text: "A current — you move things in a direction.", scores: { S: 3 } }
    ]
  },
  {
    id: 18,
    type: 'Social',
    text: "You'd rather be respected by…",
    answers: [
      { text: "Strangers who sense your presence before they know your story.", scores: { S: 2, G: 1 } },
      { text: "Your closest friends, who know everything about you.", scores: { H: 3 } },
      { text: "People whose minds you genuinely admire.", scores: { R: 3 } },
      { text: "People who haven't been born yet — through what you leave behind.", scores: { G: 2, R: 1 } }
    ]
  },
  {
    id: 19,
    type: 'Scenario',
    text: "A beloved mentor asks your honest opinion on their work, which you privately think has serious problems. You…",
    answers: [
      { text: "Give your full, honest assessment. They deserve the truth.", scores: { G: 2, R: 1 } },
      { text: "Lead with genuine strengths, then address the concerns with real care.", scores: { H: 3 } },
      { text: "Ask questions that might lead them to see the issues themselves.", scores: { R: 2, S: 1 } },
      { text: "Think carefully about what they actually need from this conversation.", scores: { S: 2, H: 1 } }
    ]
  },
  {
    id: 20,
    type: 'Abstract',
    text: "At your core, what matters most to you?",
    answers: [
      { text: "Being someone who acts, even when you're afraid.", scores: { G: 3 } },
      { text: "Being someone who shows up, even when it's thankless.", scores: { H: 3 } },
      { text: "Being someone who understands, even when the truth is hard.", scores: { R: 3 } },
      { text: "Being someone who achieves, regardless of what stands in the way.", scores: { S: 3 } }
    ]
  }
];
