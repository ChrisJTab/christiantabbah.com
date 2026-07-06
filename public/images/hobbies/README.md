# Hobby photos

These files are referenced from `src/data/about.ts` (each hobby's `photos`
list). Currently in use:

- `snowboarding.jpg`
- `yao-ming-block.jpg`
- `food-birria-tacos.jpg`, `food-carbonara.jpg`, `food-beef-stirfry.jpg`,
  `food-cheesecake.jpg` (the cooking quadrant, shown 2×2 in data order)

To add or swap a photo: drop the file here, then point the hobby's `photos`
entry at it in `src/data/about.ts`. One photo renders as a single 4:5 card;
exactly four render as a quadrant. Hobbies with an empty `photos` list are
text-only on purpose.

Convert HEIC before adding (browsers can't show it):
`sips -s format jpeg -s formatOptions 80 --resampleWidth 1400 in.HEIC --out out.jpg`
