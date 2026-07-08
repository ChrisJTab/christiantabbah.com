// The bucket list. One item per line; set done: true and it gets its
// strikethrough + commit-hash flourish automatically.

export interface BucketItem {
  id: string
  text: string
  done: boolean
  /** Optional vanity commit hash (hex chars only); defaults to a generated one. */
  hash?: string
}

export const bucketList: BucketItem[] = [
  {
    id: 'second-degree-black-belt',
    text: 'Earn my second-degree black belt in Taekwondo',
    done: false,
  },
  {
    id: 'club-200-members',
    text: 'Found a club and grow it past 200 members',
    done: true,
  },
  {
    id: 'file-system-from-scratch',
    text: 'Build a file system from scratch',
    done: true,
  },
  {
    id: 'ace-up-sleeve',
    text: 'Ace, up my sleeve',
    done: true,
    hash: 'ace5afe',
  },
  {
    id: 'horses-held',
    text: 'Horses, held',
    done: true,
  },
  {
    id: 'elephant-addressed',
    text: 'Elephant in the room, addressed',
    done: true,
  },
  {
    id: 'eggs-distributed',
    text: 'Eggs, distributed across several baskets (no single point of failure)',
    done: true,
  },
  // TODO(christian): more real items. Copy a block above, give it a unique id.
]
