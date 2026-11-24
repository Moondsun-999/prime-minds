// Reader-facing text of the "Pick One" lead magnet (single source; brief in ops/docs/primeminds/lead-magnet).
// Ratings in `models` are Abdallah's judgement, to be reviewed by him before launch.

export interface BusinessModel {
  name: string;
  what: string;
  hours: string;
  money: string;
  firstMoney: string;
  hardPart: string;
  outsideBigCities: string;
  triedByAbdallah: boolean;
}

export interface Check {
  title: string;
  body: string;
}

export const guide = {
  title: "Pick One",
  subtitle:
    "Choose the one business that fits your job, your hours and your budget. In one evening.",
  readTime: "About 45 minutes with a pen",
  promise:
    "By the end you will have chosen one business to work on for the next 90 days, written down why, and ruled out the rest. This guide does not promise income. It gets you unstuck.",

  why: [
    "You already know people make money online. You have watched the videos. Maybe you tried something: a store, trading, a course you never finished.",
    "The problem is rarely laziness. It is that every week someone tells you a different business is the one, and someone else tells you it is dead. So you keep collecting ideas and never give one of them 90 days.",
    "I did this for years. Since 2022 I started nine businesses beside my sales job: trading, local e-commerce, dropshipping, a marketing agency. They all failed, and most failed for the same reason: I picked them because of a video, not because they fit my hours or my money.",
    "So this guide does one thing. It makes you choose, using your own numbers.",
  ],

  numbers: [
    {
      label: "Hours",
      question: "How many hours a week can you give this, every week, after work?",
      help: "Count real evenings, not the ones you wish you had. If your job ends at 6 and you are home at 7, two focused hours on four nights is 8 hours. Most people with a job land between 5 and 10.",
    },
    {
      label: "Money",
      question: "How much money can you lose without it hurting your month?",
      help: "Not a loan and not your rent. If the honest answer is zero, write zero. That removes some options, and that is useful.",
    },
    {
      label: "Months",
      question: "How many months can you wait before the first dirham comes in?",
      help: "You have a salary, so you can wait longer than someone who needs money this week. Three to six months is a normal answer.",
    },
  ],

  models: [
    {
      name: "Sell a skill you already have",
      what: "Freelance the thing you do at work or studied: design, accounting, translation, code, video editing.",
      hours: "5–10 a week",
      money: "Close to zero",
      firstMoney: "Weeks to a few months",
      hardPart: "Finding the first client. The work is the easy half.",
      outsideBigCities: "Yes, clients can be anywhere",
      triedByAbdallah: false,
    },
    {
      name: "A service for local businesses",
      what: "Do one job for businesses near you: their social media, their ads, their booking system, simple AI automations.",
      hours: "6–10 a week",
      money: "Low: tools and a phone",
      firstMoney: "One to three months",
      hardPart: "Selling to owners who have never bought this, and delivering after work hours.",
      outsideBigCities: "Yes, but fewer businesses to call",
      triedByAbdallah: true,
    },
    {
      name: "E-commerce with cash on delivery",
      what: "Buy or source a product, run ads, deliver it and collect cash.",
      hours: "10+ a week, and it interrupts your day",
      money: "Real money: stock, ads, returns",
      firstMoney: "Fast sales, slow profit",
      hardPart: "Returns, ad costs and thin margins. Customers call during your working hours.",
      outsideBigCities: "Yes, delivery covers most cities",
      triedByAbdallah: true,
    },
    {
      name: "Digital products",
      what: "Sell a template, a guide or a small course you made once.",
      hours: "5–8 a week",
      money: "Low",
      firstMoney: "Slow, unless you already have an audience",
      hardPart: "Nobody knows you exist. Without an audience you are back to ads or content.",
      outsideBigCities: "Yes",
      triedByAbdallah: false,
    },
    {
      name: "Content (YouTube, TikTok, Instagram)",
      what: "Build an audience first and earn later from ads, sponsors or your own offer.",
      hours: "8–12 a week, every week",
      money: "Low: a phone is enough to start",
      firstMoney: "Many months, sometimes more than a year",
      hardPart: "Publishing for a long time with no money and few views.",
      outsideBigCities: "Yes",
      triedByAbdallah: true,
    },
    {
      name: "Trading",
      what: "Buying and selling currencies, stocks or crypto.",
      hours: "Any",
      money: "Whatever you put in, and you can lose all of it",
      firstMoney: "Unknowable",
      hardPart: "It is not a business. There is no customer, and most beginners lose money. I did.",
      outsideBigCities: "Yes",
      triedByAbdallah: true,
    },
  ] satisfies BusinessModel[],

  scoreIntro:
    "Take a sheet of paper. Write the six options down the side. For each one, answer these six questions with 1 (yes) or 0 (no).",
  scoreQuestions: [
    "Do the hours it needs fit inside the hours you wrote?",
    "Does the money it needs fit inside the money you can lose?",
    "Can you wait as long as it takes to pay?",
    "Can you do the work today, or learn it in a month?",
    "Can you name three people or businesses who might pay for it?",
    "Would you still do it in week six, when it is boring?",
  ],
  scoreRules: [
    "Cross out anything that scored 0 on hours or money. Wanting it more does not create hours.",
    "Of what is left, the highest total wins.",
    "If two are tied, pick the one where you could name the three possible buyers fastest. Selling is the hard part of every one of these, so start where buyers are easiest to find.",
    "Write the winner at the top of the page with one sentence: “I am doing this for 90 days because…”. Then write the others underneath and cross them out. They are not gone forever. They are gone for 90 days.",
  ],

  example: {
    label: "A worked example (invented, to show the method)",
    person:
      "Yassine is an accountant in Rabat. He wrote: 7 hours a week, 1,000 dirhams he can lose, 4 months he can wait.",
    steps: [
      "E-commerce scored 0 on money and on hours (customers call while he is at work). Crossed out.",
      "Trading scored 0 on “three people who might pay”. Crossed out.",
      "Content scored 0 on months: he cannot wait a year. Crossed out for now.",
      "Selling his accounting skill scored 6. A local-business service scored 4. Digital products scored 3.",
      "He wrote: “I am doing bookkeeping for small businesses for 90 days because I can do the work today and I already know three shop owners.”",
    ],
  },

  checksIntro:
    "At some point you may want help: a course, a community, a coach. Including me. Before you pay anyone, ask these five things.",
  checks: [
    {
      title: "Do they do the thing, or only teach it?",
      body: "Ask what they are building right now and what it earned last month. “I teach because I failed at doing” is a real pattern.",
    },
    {
      title: "Do the numbers survive a recount?",
      body: "When someone says “15,000 dirhams a month”, subtract stock, ads, transport, tools and tax yourself. If they never mention costs, that is your answer.",
    },
    {
      title: "Has anyone they taught got a result?",
      body: "Not screenshots of the teacher’s income. Someone like you, reachable, who will tell you what it really took.",
    },
    {
      title: "Do they tell you what it costs and how long it takes?",
      body: "Money, hours per week, months. If the answer is “fast” and “easy”, walk away.",
    },
    {
      title: "Can you see exactly what you get?",
      body: "Sections, calls, how often, for how long. “Motivation” is not a deliverable.",
    },
  ] satisfies Check[],
  checksNote:
    "Hold me to the same five. Today my honest answers are: I am building an AI agency beside a 9-to-5 sales job; I coach two people 1:1; neither has finished yet, so I have no results of theirs to show you.",

  firstWeek: [
    "Tonight: write the three people or businesses you named. Next to each, write how you will reach them.",
    "This week: contact one of them. Not to sell. Ask what they struggle with in the thing you chose.",
    "Sunday: write what you learned in three lines. That is your first week done.",
  ],

  invite: {
    heading: "If you are torn between two",
    body: [
      "If the scorecard gave you a clear winner, you do not need me. Start your first week.",
      "If two options tied, or you scored everything 0 and do not know why, I do a free 30-minute Business Fit Call. We go through your three numbers and your scorecard, and you leave with a short written note of what fits and what does not. You keep the note whether or not we ever work together.",
      "I also coach a few people 1:1 through the first 90 days. If that might be useful, we can talk about it on the call. If not, we will not.",
    ],
    cta: "Book a Business Fit Call",
  },
};
