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
  /** Optional CSS object-position for the crop, e.g. '50% 12%'. */
  position?: string
}

export interface Hobby {
  id: string
  name: string
  /** A couple of sentences, first person. */
  description: string
  /** 0 photos = text-only entry · 1 = single photo · 4 = 2×2 quadrant. */
  photos: HobbyPhoto[]
}

export const hobbies: Hobby[] = [
  {
    id: 'snowboarding',
    name: 'Snowboarding',
    description:
      'Look closely at the photo: my board is wearing a tiny replica of itself as a keychain. That should tell you roughly how much I love this sport.',
    photos: [
      { src: 'snowboarding.jpg', alt: 'Me on the hill with my snowboard' },
    ],
  },
  {
    id: 'board-games',
    name: 'Board games',
    description:
      'Board games are my love language. Coming up with optimal strategies always gets me excited.',
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
    name: 'Bouldering',
    description:
      'My favourite part is the puzzle solving: reading a problem from the ground, then testing the solution hold by hold. That and the chats between attempts, which somehow last longer than the actual climbing.',
    photos: [],
  },
  {
    id: 'badminton',
    name: 'Badminton',
    description:
      'I picked up badminton in high school and at my peak was playing 15 hours a week. Career highlight: almost taking a game off a Singaporean national champion. The word almost is doing a lot of heavy lifting there, and I’ve made my peace with it.',
    photos: [],
  },
  {
    id: 'cooking',
    name: 'Cooking',
    description:
      'I love cooking new things, and the photos are a small sample of the experiments. Also, not to brag, but I make a killer cheesecake.',
    photos: [
      { src: 'food-birria-tacos.jpg', alt: 'Birria tacos I made' },
      { src: 'food-carbonara.jpg', alt: 'Carbonara I made' },
      { src: 'food-beef-stirfry.jpg', alt: 'Beef stir fry I made' },
      { src: 'food-cheesecake.jpg', alt: 'Cheesecake I baked', position: '50% 12%' },
    ],
  },
]
