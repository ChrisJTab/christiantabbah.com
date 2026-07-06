// Content for the About page. Voice: first person, warm, a little playful.

export const heroIntro: string[] = [
  'I’m a master’s student at the University of Toronto, where I’m teaching a GPU to run a transactional database bigger than its own memory.',
  'Before that: four years of security-and-systems undergrad, a couple of years of full-stack work, and more TA office hours than I can count.',
]

export const heroChips: string[] = [
  'toronto',
  'msc @ uoft',
  'lang: fr, en (hy: rusty)',
  'taekwondo: black belt',
]

export interface Accolade {
  id: string
  /** Styled like a git tag name. */
  tag: string
  title: string
  detail: string
}

export const accolades: Accolade[] = [
  {
    id: 'deans-list',
    tag: 'deans-list-x4',
    title: 'Dean’s List Scholar',
    detail: 'Four times during undergrad · CGPA 3.74',
  },
  {
    id: 'hbsc',
    tag: 'hbsc-2024',
    title: 'HBSc Computer Science',
    detail: 'Information Security Specialist + Math minor · UofT · 2020–2024',
  },
  {
    id: 'msc',
    tag: 'msc-in-progress',
    title: 'MSc Computer Science',
    detail: 'UofT · in progress, expected April 2026',
  },
  {
    id: 'black-belt',
    tag: 'black-belt',
    title: 'Black Belt, Taekwondo',
    detail: '7 years of training · second degree in progress',
  },
]

export interface Hobby {
  id: string
  name: string
  /** Drop a photo at public/images/hobbies/<img> and it appears automatically. */
  img: string
  alt: string
  caption: string
}

export const hobbies: Hobby[] = [
  {
    id: 'board-games',
    name: 'Board games',
    img: 'board-games.jpg',
    alt: 'A board game mid-play',
    caption: 'Rules explanations are my love language.',
  },
  {
    id: 'snowboarding',
    name: 'Snowboarding',
    img: 'snowboarding.jpg',
    alt: 'Snowboarding on a mountain',
    caption: 'Winter is the good season.',
  },
  {
    id: 'rock-climbing',
    name: 'Rock climbing',
    img: 'rock-climbing.jpg',
    alt: 'Climbing an indoor bouldering wall',
    caption: 'Problems worth solving with both hands.',
  },
  {
    id: 'badminton',
    name: 'Badminton',
    img: 'badminton.jpg',
    alt: 'Badminton racquet and shuttlecock',
    caption: 'Deceptively cardio.',
  },
  {
    id: 'basketball',
    name: 'Watching basketball',
    img: 'basketball.jpg',
    alt: 'A basketball game in progress',
    caption: 'Watching, analyzing, occasionally yelling.',
  },
  {
    id: 'food',
    name: 'Comparing food',
    img: 'food.jpg',
    alt: 'Two dishes side by side',
    // TODO(christian): your one-liner explaining the food-comparison hobby.
    caption: 'Full explanation pending.',
  },
]
