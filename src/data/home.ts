// Content for the home page: the recruiter-facing landing. Voice: first
// person, warm, a little playful. Facts only, nothing aspirational.

export const hero = {
  /** Mono keyword line under the name. Recruiters pattern-match on it. */
  title: 'systems engineer · databases · GPUs · MSc CS, UofT 2026',
  intro: [
    'I just finished a master’s at the University of Toronto, where I built a GPU transactional database that keeps running when the data outgrows the GPU.',
    'I like hard systems problems and the people on the other side of them.',
  ],
}

/** The `$ git status` block: where I am and what I’m open to. */
export const status = {
  summary: 'On branch main. MSc merged October 2026.',
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
    { key: 'when', value: 'available now · Canadian citizen' },
  ],
}

/** Project ids (src/data/projects.ts) under “Selected work”, in order. */
export const selectedProjectIds = ['uate-app', 'url-shortener', 'gpu-olap-distinct']

/** Timeline ids (src/data/timeline.ts) in the `git log --oneline` strip. */
export const logIds = ['gsu', 'gpu-txn-db', 'msc', 'ta', 'poker-club', 'veritablesoft']

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
      'founded and ran a 200-member club',
      'grad-student event logistics',
      'French and English',
    ],
  },
]

export const contact = {
  heading: 'Say hello',
  note: 'Email is the fastest way to reach me. I answer, and I’m always happy to talk shop.',
}
