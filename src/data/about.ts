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
  /**
   * Set when there's deliberately no photo; the tile shows this line instead.
   * To switch a hobby to a real photo later, delete this field and add the file.
   */
  noPhoto?: string
}

export const hobbies: Hobby[] = [
  {
    id: 'board-games',
    name: 'Board games',
    img: 'board-games.jpg',
    alt: 'A board game mid-play',
    caption: 'Rules explanations are my love language.',
    noPhoto: 'undocumented. everyone was busy losing',
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
    noPhoto: 'chalk everywhere, camera nowhere',
  },
  {
    id: 'badminton',
    name: 'Badminton',
    img: 'badminton.jpg',
    alt: 'Badminton racquet and shuttlecock',
    caption: 'Deceptively cardio.',
    noPhoto: 'too fast for cameras',
  },
  {
    id: 'basketball',
    name: 'Watching basketball',
    img: 'basketball.jpg',
    alt: 'Me jumping to block a shot by Yao Ming',
    caption: 'That’s me blocking Yao Ming. No further questions.',
  },
  {
    id: 'cooking',
    name: 'Cooking',
    img: 'cooking.jpg',
    alt: 'A dish I cooked, plated and ready',
    caption: 'I cook, I plate, I photograph the evidence.',
  },
]
