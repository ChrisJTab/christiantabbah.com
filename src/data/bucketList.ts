// The bucket list. One item per line — set done: true and it gets its
// strikethrough + commit-hash flourish automatically.

export interface BucketItem {
  id: string
  text: string
  done: boolean
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
  // TODO(christian): 5–8 more items — copy a block above, give it a unique id.
]
