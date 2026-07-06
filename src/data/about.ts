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

export interface HobbyPhoto {
  /** Filename inside public/images/hobbies/ */
  src: string
  alt: string
}

export interface Hobby {
  id: string
  name: string
  /** A couple of sentences, first person. */
  description: string
  /** Optional mono aside, rendered like a code comment. */
  note?: string
  /** 0 photos = text-only entry · 1 = single photo · 4 = 2×2 quadrant. */
  photos: HobbyPhoto[]
}

export const hobbies: Hobby[] = [
  {
    id: 'snowboarding',
    name: 'Snowboarding',
    description:
      'Winter is the good season. The plan every year is the same: more mountains, fewer excuses, and at least one run where nobody saw the fall.',
    photos: [
      { src: 'snowboarding.jpg', alt: 'Me on the hill with my snowboard' },
    ],
  },
  {
    id: 'board-games',
    name: 'Board games',
    description:
      'Rules explanations are my love language. Bring a new box to the table and I will happily walk everyone through setup, strategy, and the rematch nobody asked for.',
    note: 'undocumented. everyone was busy losing',
    photos: [],
  },
  {
    id: 'basketball',
    name: 'Watching basketball',
    description:
      'Watching, analyzing, occasionally yelling at a screen. Also pictured: the greatest defensive play of my career, against a very tall and very patient opponent.',
    photos: [
      { src: 'yao-ming-block.jpg', alt: 'Me jumping to block a shot by Yao Ming' },
    ],
  },
  {
    id: 'rock-climbing',
    name: 'Rock climbing',
    description:
      'Problems worth solving with both hands. Half the sport is standing under the wall, arguing about the right way up it.',
    note: 'chalk everywhere, camera nowhere',
    photos: [],
  },
  {
    id: 'badminton',
    name: 'Badminton',
    description:
      'Deceptively cardio. It looks like a backyard game right up until a smash goes past your ear at highway speed.',
    note: 'too fast for cameras',
    photos: [],
  },
  {
    id: 'cooking',
    name: 'Cooking',
    description:
      'I cook, I plate, I photograph the evidence. Current portfolio: birria tacos, carbonara, beef stir fry, and a cheesecake that did not survive the review.',
    photos: [
      { src: 'food-birria-tacos.jpg', alt: 'Birria tacos I made' },
      { src: 'food-carbonara.jpg', alt: 'Carbonara I made' },
      { src: 'food-beef-stirfry.jpg', alt: 'Beef stir fry I made' },
      { src: 'food-cheesecake.jpg', alt: 'Cheesecake I baked' },
    ],
  },
]
