// Content for the home page: the recruiter-facing landing. Voice: first
// person, warm, a little playful. Facts only, nothing aspirational.
//
// The top of the page is a README in four parts: who I am (hero), what I'm
// after right now (status), what I work with (skills), and how to reach me.

export const hero = {
  /** Mono keyword line under the name. Recruiters pattern-match on it. */
  title: 'systems engineer · databases · GPUs · MSc CS, UofT 2026',
  intro: [
    'I just finished a master’s at the University of Toronto, where I built a GPU transactional database that keeps running when the data outgrows the GPU.',
    'I like hard systems problems and the people on the other side of them.',
  ],
}

/** The README's "Right now" card: where I am and what I'm open to. */
export const status: {
  heading: string
  summary: string
  /** `live` puts the pulsing "available" dot in front of the value. */
  rows: { key: string; value: string; live?: boolean }[]
} = {
  heading: 'Right now',
  summary: 'Looking for a full-time role.',
  rows: [
    {
      key: 'open to',
      value:
        'systems, database, and GPU infrastructure engineering, plus solutions engineering',
    },
    {
      key: 'where',
      value: 'Toronto, downtown, in person or hybrid · open to relocating',
    },
    { key: 'when', value: 'available now · Canadian citizen', live: true },
  ],
}

/** The README's skills section. `more` links to the timeline, whose
    entries list the skills each job or project added. */
export const stack = {
  heading: 'What I work with',
  more: 'Where I picked these up, on the timeline\u00a0→',
}

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'gpu & systems',
    items: [
      'CUDA',
      'C++',
      'C',
      'profiling with Nsight Systems',
      'PCIe and DMA',
      'RDMA with UCX',
      'operating systems',
      'file systems',
    ],
  },
  {
    group: 'databases & distributed systems',
    items: [
      'transactions and storage engines',
      'SQL',
      'Cassandra',
      'Redis',
      'consistent hashing',
      'Docker Swarm',
      'AWS Lambda, DynamoDB, ElastiCache, CloudFormation',
    ],
  },
  {
    group: 'full-stack & mobile',
    items: [
      'TypeScript',
      'React Native with Expo',
      'Firebase',
      'C# and .NET',
      'Python',
      'Java',
    ],
  },
  {
    group: 'people',
    items: [
      'eleven terms as a teaching assistant, including lecturing',
      'designed and taught a cybersecurity course for kids at THINK in Yerevan, CTFs included',
      'founded and ran a 200-member club',
      'grad-student event logistics',
      'French and English',
    ],
  },
]

/** Project ids (src/data/projects.ts) under “Selected work”, in order. */
export const selectedProjectIds = ['uate-app', 'url-shortener', 'gpu-olap-distinct']

export const contact = {
  heading: 'Say hello',
  note: 'Email is the fastest way to reach me. I answer, and I’m always happy to talk shop.',
}
