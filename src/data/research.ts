// Content for the research page and the home page’s featured block.
// Voice: first person, plain English first, numbers second. Every number
// below is a headline figure from the paper’s plot index
// (EGAD_Code/EGAD_plotting/PLOTS.md); keep them in sync with the paper.

export interface ResultRow {
  setting: string
  /** The short figure, rendered in mono. */
  value: string
  /** One line of context under the value. */
  note: string
}

export const research = {
  id: 'egad',
  name: 'EGAD',
  /** Headline of the home page block. */
  hook: 'What happens when the database outgrows the GPU',
  /** Research page title. */
  title: 'A transactional database that outgrows its GPU',
  meta: 'EGAD · MSc research paper · University of Toronto, 2024 to 2026 · with Angela Demke Brown and Ashvin Goel',
  pitch:
    'GPU databases are fast until the data stops fitting in GPU memory. EGAD keeps the primary store in CPU memory and stages each batch’s working set onto the GPU, so the database can be bigger than the card that runs it. Two years of CUDA and C++, a benchmark harness that reproduces every figure, and a full-length write-up.',
  intro:
    'GPU transaction engines are fast while the whole database fits in device memory. Real databases don’t. EGAD keeps the primary store in CPU memory, treats the GPU as an execution cache, and keeps the two close enough that a GPU crash costs at most two batches of replay.',
  paperPath: '/EGAD-paper.pdf',
  repo: 'https://github.com/ChrisJTab/EGAD_Code',
  upstream: {
    label: 'Epic (OSDI ’24)',
    href: 'https://github.com/ShujianQian/epic-artifact',
  },
  /** The three numbers on the home page. */
  headline: [
    { label: 'TPC-C, 128 warehouses, vs CPU-only', value: '1.41×' },
    { label: 'TPC-C beyond GPU memory, vs CPU-only', value: '1.26× to 1.32×' },
    { label: 'YCSB, high skew, vs CPU-only', value: 'up to 3.1×' },
  ],
  schematicCaption:
    'The stager admits each batch’s records onto the GPU and writes back what changed; the CPU store is never more than two batches behind.',

  problem: [
    'Epic, the engine EGAD extends, plans concurrency control for a whole batch of transactions up front and then executes the batch deterministically on the GPU. It is very fast, and it has one hard limit: every record has to live in device memory. A 32 GB card caps the database at 32 GB.',
    'CPU memory is bigger and cheaper, but shipping records across PCIe for every batch would eat the speedup. The question was whether the GPU could act as a cache for a database that lives on the host, without giving back the performance that made the GPU worth using.',
  ],
  built: [
    'A staging layer between the two memories. Before a batch runs, the stager admits the records the batch will touch into a GPU-side cache: a device free-list ring hands out slots, and an epoch-aware hot cache keeps the records that recent batches used.',
    'Selective write-back. Epic keeps two versions of every record and a batch’s writes only touch one of them, so EGAD ships half the bytes per modified record that a naive design would, moved with scatter-gather DMA.',
    'Writeback runs on worker threads while the next batch is already executing. The CPU-side primary store trails the GPU by at most two batches.',
    'Recovery with a fixed cost. Everything older than two batches already lives in CPU memory, so recovering from a GPU crash means replaying at most two batches of transaction inputs, no matter how long the system has been up.',
    'A fork of Epic in CUDA and C++, a harness that reproduces every figure in the paper on YCSB and TPC-C, and a validation suite that kills the process mid-run with a real GPU fault and checks the recovered state against a no-crash run.',
  ],
  architecture: {
    src: '/images/projects/egad-architecture.png',
    alt: 'EGAD architecture figure: a per-epoch stager admits records from the CPU primary store into the GPU execution cache and flushes writeback',
    caption:
      'From the paper: the stager sits between the CPU primary store and the GPU execution cache, admitting before each batch and flushing after it.',
  },
  hardware:
    'Measured on one NVIDIA RTX 5000 Ada with 32 GB over PCIe Gen4, against unmodified Epic running CPU-only and GPU-only. YCSB rows use 20 million records with the cache sized to a third of the database. The 216 to 240 warehouse row uses the NewOrder and Payment mix from the Epic paper; the other TPC-C rows use EGAD’s full mix.',
  results: [
    { setting: 'TPC-C, 128 warehouses', value: '1.41×', note: 'over CPU-only Epic' },
    {
      setting: 'TPC-C, 216 to 240 warehouses',
      value: '1.26× to 1.32×',
      note: 'over CPU-only, past the point where GPU-only exhausts the card and cannot run',
    },
    {
      setting: 'YCSB-B, high skew',
      value: '3.10×',
      note: 'over CPU-only; 95% reads',
    },
    {
      setting: 'YCSB-C, high skew',
      value: '40 MTxn/s',
      note: '3.02× over CPU-only; read-only',
    },
    {
      setting: 'Async writeback, TPC-C, 128 warehouses',
      value: '25.6 ms → 11.3 ms',
      note: 'time per batch, sync vs async; writeback on the critical path shrinks 9.4×',
    },
    {
      setting: 'Crash recovery switched on',
      value: '−13% to −18%',
      note: 'throughput cost at 8 warehouses and up; still ahead of CPU-only',
    },
  ] satisfies ResultRow[],
  resultsNote:
    'The second row is the regime the design exists for: the database no longer fits on the card, Epic’s GPU-only mode cannot run at all, and EGAD keeps going faster than the CPU. When the data does fit, GPU-only is faster than EGAD. That is the honest cost of the staging layer.',
  writeback: {
    src: '/images/projects/egad-timeline.png',
    alt: 'Epoch timeline figure from the EGAD paper comparing asynchronous and synchronous writeback',
    caption:
      'From the paper: asynchronous writeback overlaps the next batch’s execution. On YCSB-F that is 10.29 vs 12.49 ms per batch.',
  },
  hardParts: [
    {
      title: 'Overlapping writeback with execution without breaking anything.',
      body: 'The writeback worker shares the host-side CUDA runtime with the main thread’s submissions, and that contention shows up as a measurable tax on the next batch’s index transfer. Finding it, measuring it, and keeping the overlap worth it was its own project.',
    },
    {
      title: 'Bounding recovery.',
      body: 'Keeping the CPU store at most two batches behind means the recovery cost never grows with uptime, unlike a write-ahead log whose replay grows with the checkpoint interval. Making that bound hold while writeback runs asynchronously is where the ordering guarantees live.',
    },
    {
      title: 'Being honest about the regime.',
      body: 'Staging costs throughput when the database would have fit on the GPU anyway, and the CPU baseline wins at low skew. A lot of the evaluation maps exactly where the design pays off: at medium skew the cache has to hold about half the records to beat the CPU fallback, and three quarters to reach the plateau.',
    },
  ],
  limits: [
    'If the database fits in GPU memory, don’t use it. The staging machinery costs between 9% and 48% of GPU-only throughput, depending on how write-heavy the workload is.',
    'At low skew the CPU-only baseline is as fast or faster. EGAD wins once contention rises, from a Zipf skew of about 0.8 upward on every YCSB workload.',
    'Full-record reads over field-split storage amplify reads about tenfold and lose to the CPU at every skew.',
    'Workloads whose working set grows without bound eventually overflow the cache. The spec TPC-C mix does this: its throughput declines over a long run and crosses under the CPU baseline.',
  ],
  open: [
    'Cut the host-side contention between the writeback worker and the main thread’s CUDA submissions, which inflates index transfer up to three and a half times in async mode.',
    'Handle unbounded working sets, most likely by partitioning, so the spec TPC-C mix stops degrading over long runs.',
    'Bring the field-split read path up to parity with the headline configuration.',
  ],
  status: [
    'This is my MSc research paper at the University of Toronto, supervised by Angela Demke Brown and Ashvin Goel. The PDF above is the full-length version. A shorter conference version is in preparation.',
    'The code is public and forked from the Epic artifact, with the benchmark harness, a plot index that maps every figure to its claim and its caveats, and the crash-recovery validation scripts.',
  ],
}
