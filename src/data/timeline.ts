import type { YM } from '../lib/dates'

export type Category = 'work' | 'education' | 'research' | 'leadership'

export interface TimelineEntry {
  id: string
  category: Category
  /** Full title, shown in the commit panel. */
  role: string
  org: string
  /** Short label for the log row next to the graph (keep under ~38 chars). */
  short: string
  start: YM
  end: YM | 'ongoing'
  /** Branch ref shown as a pill on open branches, e.g. "research/gpu-txn-db". */
  refName?: string
  /** The one branch HEAD points at (the flagship ongoing thing). */
  head?: boolean
  bullets: string[]
  /** Rendered as the "files changed" diffstat in the commit panel. */
  skills: string[]
  /** Optional pointers rendered at the bottom of the commit panel. */
  links?: { label: string; href: string }[]
}

/** Upper bound of the graph; bump this when adding new ongoing months. */
export const TIMELINE_NOW: YM = '2026-11'

export const timeline: TimelineEntry[] = [
  // TODO(christian): confirm the months for both summer jobs (June to
  // August is assumed) and the name of the organization you taught for.
  {
    id: 'uate',
    category: 'work',
    role: 'Software Developer, UATE',
    org: 'UATE, Yerevan',
    short: 'Built the UATE app · Yerevan',
    start: '2026-06',
    end: '2026-08',
    bullets: [
      'The official UATE and DigiTec app, built alone from an empty repo: every screen, the data layer, the Directus backend, push notifications, tests, and docs.',
      'Bilingual English and Armenian. Interest-based people matching and chat, the full multi-day schedule, and RSVPs that land in your calendar.',
      'Left a documentation site and a setup guide so the next developer never needs me.',
    ],
    skills: ['TypeScript', 'React Native', 'Expo', 'Directus', 'Firebase'],
    links: [
      { label: 'release notes', href: '/release-notes/armenia/' },
      { label: 'project', href: '/projects/#uate-app' },
    ],
  },
  {
    id: 'cyber-course',
    category: 'work',
    role: 'Cybersecurity Instructor',
    org: 'Summer course, Armenia',
    short: 'Taught cybersecurity · Armenia',
    start: '2026-06',
    end: '2026-08',
    bullets: [
      'Designed and taught a cybersecurity course from scratch: slides, exercises, and a CTF for every lesson, so each idea ended with something to break.',
      'The most rewarding thing I did all summer. Certificates on the last day.',
    ],
    skills: ['security', 'teaching', 'CTF design'],
    links: [{ label: 'release notes', href: '/release-notes/armenia/' }],
  },
  {
    id: 'gpu-txn-db',
    category: 'research',
    role: "Master's Research: GPU-Accelerated Transactional Database",
    org: 'University of Toronto',
    short: 'MSc research: GPU transactional DB',
    start: '2024-09',
    end: '2026-10',
    bullets: [
      'Supervised by Dr. Angela Demke Brown & Dr. Ashvin Goel.',
      'Built a GPU transactional database that operates beyond VRAM limits.',
      'GPU staging & eviction layer: device free-list ring, epoch-aware hot cache, selective dirty write-back, scatter-gather DMA.',
      'The goal: multi-million-key OLTP batches as a predictable, low-latency pipeline.',
    ],
    skills: ['CUDA', 'C++', 'profiling', 'systems design'],
    links: [
      { label: 'write-up', href: '/research/' },
      { label: 'paper (PDF)', href: '/EGAD-paper.pdf' },
      { label: 'code', href: 'https://github.com/ChrisJTab/EGAD_Code' },
    ],
  },
  {
    id: 'gsu',
    category: 'leadership',
    role: 'VP Social Coordination, CS Graduate Student Union',
    org: 'University of Toronto',
    short: 'VP social · CS grad union',
    start: '2025-09',
    end: 'ongoing',
    refName: 'leadership/gsu',
    bullets: [
      'Organize large-scale events for grad students.',
      'Coordinate logistics across the exec team.',
    ],
    skills: ['event planning', 'logistics'],
  },
  {
    id: 'msc',
    category: 'education',
    role: 'MSc Computer Science',
    org: 'University of Toronto',
    short: 'MSc CS · UofT',
    start: '2024-09',
    end: '2026-10',
    bullets: [
      'Graduated October 26, 2026.',
      'Systems group. See research/gpu-txn-db for what I actually did all day.',
    ],
    skills: [],
  },
  {
    id: 'ta',
    category: 'education',
    role: 'Teaching Assistant',
    org: 'University of Toronto',
    short: 'Teaching assistant · UofT',
    start: '2023-01',
    end: '2026-04',
    bullets: [
      'Operating Systems (CSC369) ×4 · Intro to Information Security (CSC347) ×2, including lecturing while the professor was away.',
      'Intro to CS (CSC148) ×2 · Computer Security (CSC427) · Computability & Complexity (CSC363) · Intro to Databases (CSC343).',
      'Tutorials, office hours, marking, and building student resources.',
    ],
    skills: ['teaching', 'operating systems', 'security', 'databases'],
  },
  {
    id: 'poker-club',
    category: 'leadership',
    role: 'President, UofT Mississauga Poker Club',
    org: 'UofT Mississauga',
    short: 'President · UTM Poker Club',
    start: '2023-08',
    end: '2024-09',
    bullets: [
      'Founded the club and grew it past 200 active members.',
      'Ran biweekly tournaments and workshops on probability, EV, combinatorics, and decision-making under uncertainty.',
    ],
    skills: ['leadership', 'probability', 'organizing'],
  },
  {
    id: 'hbsc',
    category: 'education',
    role: 'HBSc Computer Science',
    org: 'University of Toronto',
    short: 'HBSc CS · UofT',
    start: '2020-09',
    end: '2024-04',
    bullets: [
      'Information Security Specialist + Mathematics minor.',
      'CGPA 3.74. Dean’s List Scholar four years running.',
    ],
    skills: ['information security', 'mathematics'],
  },
  {
    id: 'forensics',
    category: 'research',
    role: 'Computer Forensics Research Project',
    org: 'University of Toronto',
    short: 'Forensics research · UofT',
    start: '2023-04',
    end: '2023-08',
    bullets: [
      'Supervised by Dr. Andi Bergen.',
      'Researched data loss and recovery at the lowest levels of software and hardware.',
      'Tested recovery methods across operating systems and file system architectures.',
    ],
    skills: ['file systems', 'data recovery', 'OS internals'],
    links: [
      {
        label: 'paper and code',
        href: 'https://github.com/ChrisJTab/ComputerForensicsResearchProject',
      },
    ],
  },
  {
    id: 'veritablesoft',
    category: 'work',
    role: 'Full Stack Software Developer, VeritableSoft',
    org: 'VeritableSoft',
    short: 'Full-stack dev · VeritableSoft',
    start: '2021-01',
    end: '2023-08',
    bullets: [
      'Built and improved pages across the company site: front end, back end, and the database underneath.',
      'Migrated the app from Bootstrap 2 to 4 (two major versions of fun).',
    ],
    skills: ['C#', '.NET', 'SQL', 'Bootstrap'],
  },
  {
    id: 'kids4kids',
    category: 'work',
    role: 'Summer Camp Counselor, Kids4Kids',
    org: 'Kids4Kids',
    short: 'Camp counselor · Kids4Kids',
    start: '2018-06',
    end: '2022-08',
    bullets: [
      'Supervised and guided groups of kids, running activities for 250+ campers at a time.',
      'Worked 1-on-1 with special-needs campers to create a safe space within the larger camp.',
    ],
    skills: ['leadership', 'patience', 'improvisation'],
  },
]

export const branchLabels: Record<Category, string> = {
  work: 'work',
  education: 'education',
  research: 'research',
  leadership: 'leadership',
}
