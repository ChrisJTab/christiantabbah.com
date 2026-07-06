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
      'If you look closely at the photo, you’ll see that beside my snowboard is its mini replica. That should tell you how much I love the sport :)',
    photos: [
      { src: 'snowboarding.jpg', alt: 'Me on the hill with my snowboard' },
    ],
  },
  {
    id: 'board-games',
    name: 'Board games',
    description:
      'Board games are my love language. I love the feeling of a game finally clicking enough to come up with new strategies, and the feeling of ganging up on the player with the most resources at the table.',
    photos: [],
  },
  {
    id: 'basketball',
    name: 'Watching basketball',
    description:
      'I enjoy watching, analyzing and occasionally yelling at my screen. The picture also highlights the greatest defensive play of my career, blocking a very tall wax figure of Yao Ming.',
    photos: [
      {
        src: 'yao-ming-block.jpg',
        alt: 'Me jumping to block a shot by a wax figure of Yao Ming',
      },
    ],
  },
  {
    id: 'rock-climbing',
    name: 'Bouldering',
    description:
      'I really enjoy the puzzle solving aspect of bouldering. That, and the chats between attempts, which somehow last longer than the climbing.',
    photos: [],
  },
  {
    id: 'badminton',
    name: 'Badminton',
    description:
      'I picked up badminton in high school and fell in love with the sport. At my peak I was playing 15 hours a week, and at one point even scored 12 points (out of 21) against a Singaporean national player. That may not sound like much, but trust me, it was.',
    photos: [],
  },
  {
    id: 'cooking',
    name: 'Cooking',
    description:
      'I absolutely love cooking new recipes with friends, and I enjoy reviewing the result afterwards even more. Here are some of the dishes I’m most proud of!',
    photos: [
      { src: 'food-birria-tacos.jpg', alt: 'Birria tacos I made' },
      { src: 'food-carbonara.jpg', alt: 'Carbonara I made' },
      { src: 'food-beef-stirfry.jpg', alt: 'Beef stir fry I made' },
      { src: 'food-cheesecake.jpg', alt: 'Cheesecake I baked', position: '50% 12%' },
    ],
  },
]
