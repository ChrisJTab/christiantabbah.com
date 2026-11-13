// Content for the Release notes tab: experiences versioned like software.
// Voice: first person, warm, a little playful. A release is a stint, a side
// project, or a side hustle, written up as what it added, what it changed,
// what got fixed, and what is still a known issue. Facts only.
//
// Lines marked TODO(christian) wait on details only he has. They are
// comments and never render. A release with `draft: true` never renders
// either: no index entry, no page. Publishing one takes two steps: flip
// the flag, then copy release-notes/armenia/ to release-notes/<slug>/ and
// update its <title>, description, canonical URL, and data-release.

import type { YM } from '../lib/dates'

export type ChangeKind = 'added' | 'changed' | 'fixed' | 'known'

export const CHANGE_LABELS: Record<ChangeKind, string> = {
  added: 'Added',
  changed: 'Changed',
  fixed: 'Fixed',
  known: 'Known issues',
}

/** Diff-style marker in front of each changelog line. */
export const CHANGE_MARKS: Record<ChangeKind, string> = {
  added: '+',
  changed: '~',
  fixed: '*',
  known: '!',
}

export interface ReleasePhoto {
  /** Filename inside public/images/releases/<slug>/ */
  src: string
  alt: string
  caption?: string
  /** Optional CSS object-position for the crop, e.g. '50% 20%'. */
  position?: string
}

export interface Ctf {
  id: string
  title: string
  /** e.g. 'web', 'crypto', 'forensics', 'reversing', 'osint' */
  category: string
  points?: number
  /** The challenge text, one paragraph per string. */
  prompt: string[]
  /** Downloadable artifacts, served from public/ctf/<release slug>/ */
  files?: { label: string; href: string }[]
  hints?: string[]
  /** SHA-256 of the exact flag, lowercase hex: `node scripts/flag-hash.mjs 'flag{...}'` */
  flagSha256: string
  /** The write-up, one paragraph per string. Shown behind a disclosure. */
  solution: string[]
}

export interface ReleaseSection {
  heading: string
  body: string[]
  photos?: ReleasePhoto[]
  /** Playable challenges rendered after the section’s prose and photos. */
  ctfs?: { intro: string; items: Ctf[] }
}

export interface Release {
  /** URL segment (/release-notes/<slug>/) and the photo folder name. */
  slug: string
  /** Month the release shipped; becomes the version, v2026.08-<slug>. */
  date: YM
  title: string
  /** Where it happened, shown in the meta line. */
  place?: string
  /** One line for the index and the page’s meta description. */
  summary: string
  /** Opening paragraph under the title. */
  intro: string
  changelog: { kind: ChangeKind; text: string }[]
  sections: ReleaseSection[]
  links?: { label: string; href: string }[]
  /** Drafts never render. Flip to publish (see the note at the top). */
  draft?: boolean
}

export const versionOf = (r: Release) => `v${r.date.replace('-', '.')}-${r.slug}`

export const index = {
  intro:
    'Work I did somewhere, written up the way I would write up a release: what it added, what it changed, what got fixed, and what is still a known issue. Newest first.',
}

export const releases: Release[] = [
  {
    slug: 'armenia',
    date: '2026-08',
    title: 'A summer in Armenia',
    place: 'Armenia',
    summary:
      'Two and a half months, two jobs at once: a cybersecurity course I built from nothing, CTFs included, and the official DigiTec conference app, built alone from an empty repo.',
    intro:
      'In the summer of 2026 I moved to Armenia for two and a half months and took two jobs at the same time. One was a classroom full of students who had never broken anything on purpose. The other was an empty repository that had to become a conference app before I flew home.',
    changelog: [
      {
        kind: 'added',
        text: 'A cybersecurity course for students, with my own slides, my own CTFs, and certificates on the last day.',
      },
      {
        kind: 'added',
        text: 'The official UATE and DigiTec app: every screen, the data layer, the backend, and push notifications, built alone from an empty repo for 2,400+ attendees.',
      },
      {
        kind: 'added',
        text: 'A handoff the next developer can start from without me: a documentation site, a setup guide, and tests.',
      },
      // TODO(christian): confirm, or say it your way.
      { kind: 'changed', text: 'My Armenian, from rusty to daily use.' },
      {
        kind: 'changed',
        text: 'How I think about handoffs. The documentation is part of the product, not a chore at the end.',
      },
      {
        kind: 'fixed',
        text: 'A rendering-library crash in the app’s styling layer, patched at install time so nobody has to remember it exists.',
      },
      {
        kind: 'fixed',
        text: 'The timezone bug before anyone could file it: session times are Yerevan wall-clock, no matter where the phone thinks it is.',
      },
      {
        kind: 'known',
        text: 'iOS is on hold. The app shipped on Android first, and the iOS build waits on a Mac, Xcode, and Apple developer access.',
      },
      {
        kind: 'known',
        text: 'Chat polls instead of pushing. No websockets yet, on purpose, and the transport can be swapped behind the same interface.',
      },
      // TODO(christian): the honest ups and downs of working there belong
      // here too, one line each, under 'known' or 'fixed'.
    ],
    sections: [
      // TODO(christian): an optional opening section, “Why I went”, in your
      // words, fits before “The classroom”.
      {
        heading: 'The classroom',
        body: [
          'The first job was teaching cybersecurity to students, and there was no course to teach. I built it from nothing: the slides, the exercises, the order things should be learned in, and the part I cared about most, the CTFs.',
          'A CTF is a puzzle with a flag hidden inside it. You get a file, a page, or a scrambled message, and the only way to the flag is to understand how the thing actually works. I wrote one for each idea I wanted to stick, so every lesson ended with something to break. Nobody learns security by being told about it. You learn it by breaking something that someone built for you to break.',
          // TODO(christian): this paragraph is my guess at the feeling; make it yours.
          'It was the most rewarding thing I did all summer. There is a specific moment when a student stops waiting to be told the answer and starts hunting for it, and I got to watch it happen over and over. On the last day I handed out certificates.',
        ],
        photos: [
          {
            src: 'certificates.jpg',
            alt: 'Christian handing a certificate to a student at the end of the cybersecurity course',
            caption: 'Certificate day, the last day of the course.',
          },
        ],
        ctfs: {
          intro:
            'The challenges from the course, playable. Flags are checked in your browser against a hash, so there is nothing to look up in the page source. Solutions are there too, but try first.',
          // TODO(christian): the CTFs go here. See the Ctf type above; hash a
          // flag with `node scripts/flag-hash.mjs 'flag{...}'`.
          items: [],
        },
      },
      {
        heading: 'The app',
        body: [
          'The second job was the official app for UATE, the organization behind DigiTec, Armenia’s largest tech event. The old app was a WebView wrapped around a website, and it had been retired. What they needed was a real native app, in English and Armenian, for the 2,400 people who would use it at the conference. What they had was me, a laptop, and an empty repository.',
          'I built all of it. Every screen, the data layer, the backend configuration, push notifications, the tests, and the documentation. The stack is Expo and React Native in strict TypeScript, with TanStack Query for data, zod validating every response at the boundary, and a Directus backend that organizers publish events from without a developer in the loop. Two pillars: people, where attendees find each other through a graph of 46 interests, send connection requests, chat, and connect by QR code; and the event itself, with the multi-day schedule, session pages, RSVPs that land in your calendar, and a “For you” rail grown from the same interests. By August it was about nine thousand lines of strict TypeScript across eleven feature modules.',
          'The parts I am proudest of are the ones nobody will notice. Refresh tokens are single-use, so the API client funnels every expired session through one in-flight refresh and retries once; get that wrong and users get logged out at random. The route tree doubles as the push-notification map, so a notification about a chat deep-links straight into it with no lookup table to keep in sync. Chat works without websockets: polling with a timestamp cursor and id-dedupe, so no message is lost or doubled across background and foreground, with a websocket transport swappable behind the same interface later. And session times are stored as wall-clock strings with no timezone, so the app treats them as Yerevan time and does pure string math. A visitor from Toronto sees the right room at the right hour.',
        ],
      },
      {
        heading: 'The handoff',
        body: [
          'I was leaving the country, so the last stretch of the summer went into making sure the app did not leave with me. I wrote a documentation site for the next developer: a screen-by-screen tour with twenty-two screenshots, a guide to how the codebase is layered, how to set up a machine from a fresh clone, what the tests cover, how to verify a change on the emulator, and a roadmap with the open questions I did not get to, like paid tiers and per-event entitlements. If the next person never has to message me, I did the job properly.',
        ],
      },
      {
        heading: 'What stayed with me',
        body: [
          // TODO(christian): your closing, in your words. This is a placeholder thought.
          'Teaching and building turned out to be the same job. In both, the thing you make is not the point; the person who uses it after you leave is.',
        ],
      },
    ],
    links: [
      { label: 'the app on the projects page', href: '/projects/#uate-app' },
      { label: 'both jobs on the timeline', href: '/timeline/#uate' },
    ],
  },

  // --- drafts ---------------------------------------------------------------
  // Skeletons for the next releases. Nothing below renders until `draft`
  // is removed. Dates are placeholders.
  {
    slug: 'door',
    date: '2026-01', // TODO(christian): the month it shipped
    title: 'A phone number that opens my building',
    place: 'Toronto',
    summary: '', // TODO(christian): one line
    intro: '',
    changelog: [
      // TODO(christian): what it added (the number, the rules for who gets in),
      // what you would never expose, what it logs.
    ],
    sections: [],
    draft: true,
  },
  {
    slug: 'transcripts',
    date: '2026-01', // TODO(christian): the month it shipped
    title: 'Filtering YouTube transcripts',
    summary: '', // TODO(christian): one line on what “filtering” means here
    intro: '',
    changelog: [],
    sections: [],
    draft: true,
  },
  {
    slug: 'cubes',
    date: '2026-01', // TODO(christian): the month it started
    title: 'The 3D-printed cube side hustle',
    place: 'Toronto',
    summary: '', // TODO(christian): one line
    intro: '',
    changelog: [
      // TODO(christian): units, months running, repeat buyers, failed prints,
      // what customers did with them. This is the customer-facing evidence.
    ],
    sections: [],
    draft: true,
  },
]

/** Shipped releases, newest first. */
export const shipped: Release[] = releases
  .filter((r) => !r.draft)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
