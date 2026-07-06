export interface Project {
  id: string
  name: string
  blurb: string
  tech: string[]
  /** TODO(christian): add repo links where they exist — rows link when set. */
  repo: string | null
}

export const projects: Project[] = [
  {
    id: 'parcube',
    name: 'parcube',
    blurb: 'React Native app for renting out parking spots, with Google Maps integration.',
    tech: ['React Native', 'Google Maps'],
    repo: null,
  },
  {
    id: 'url-shortener-java',
    name: 'url-shortener (v1)',
    blurb: 'Distributed URL shortener in Java + SQL, built around consistent hashing and sharding.',
    tech: ['Java', 'SQL', 'consistent hashing'],
    repo: null,
  },
  {
    id: 'url-shortener-swarm',
    name: 'url-shortener (v2)',
    blurb: 'Round two, distributed harder: Docker Swarm, Cassandra, Redis, and Python glue.',
    tech: ['Docker Swarm', 'Cassandra', 'Redis', 'Python'],
    repo: null,
  },
  {
    id: 'ext2-shell',
    name: 'ext2-fs + shell',
    blurb: 'An ext2 file system implementation and a custom shell, both written in C.',
    tech: ['C', 'ext2'],
    repo: null,
  },
  {
    id: 'udp-reliable',
    name: 'udp-reliable-transfer',
    blurb: 'Reliable file transfer built on top of UDP — acks, retransmits, the whole dance.',
    tech: ['UDP', 'networking'],
    repo: null,
  },
  {
    id: 'survey-classifier',
    name: 'survey-classifier',
    blurb: 'ML classifier for survey responses — 85–90% test accuracy, best in the class.',
    tech: ['machine learning'],
    repo: null,
  },
  {
    id: 'rocksdb-hailstorm',
    name: 'rocksdb × hailstorm',
    blurb: 'Disaggregated storage prototype wiring RocksDB into Hailstorm.',
    tech: ['Scala', 'C++', 'RocksDB'],
    repo: null,
  },
  {
    id: 'gpu-olap-distinct',
    name: 'gpu-olap-distinct',
    blurb: 'Distributed GPU OLAP DISTINCT prototype over RDMA/UCX, with CUB radix sort on the destination GPU.',
    tech: ['CUDA', 'RDMA', 'UCX'],
    repo: null,
  },
]
