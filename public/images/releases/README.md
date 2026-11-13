# Release photos

One folder per release, named after its `slug` in `src/data/releases.ts`,
holding the photos that release's sections list:

- `armenia/certificates.jpg` is already listed (certificate day, the last
  day of the course). Drop the file in and it appears; until then the
  production build hides it and `npm run dev` shows a dashed placeholder.

To add a photo: put the file here, then add `{ src, alt, caption }` to the
section's `photos` list. One photo renders 3:2, two render side by side at
4:3, three or more wrap. Use `position` ('50% 20%') to move the crop.

Convert HEIC and resize before adding (browsers can't show HEIC, and
phone originals are 5 MB):

```sh
sips -s format jpeg -s formatOptions 80 --resampleWidth 1600 IMG_1234.HEIC --out armenia/certificates.jpg
```
