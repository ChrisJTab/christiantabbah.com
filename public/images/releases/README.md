# Release photos

One folder per release, named after its `slug` in `src/data/releases.ts`,
holding the photos that release's sections list. `armenia/` has the three
certificate-day photos from THINK.

To add a photo: put the file here, then add `{ src, alt, caption }` to the
section's `photos` list. One photo renders 3:2. Two render side by side at
4:3. Three or more: the first leads at full width, the rest pair up below
it. On phones everything stacks. Use `position` ('50% 20%') to move the
crop.

Convert phone photos before adding them (browsers can't show HEIC, and
originals are 2 to 5 MB with the GPS position inside):

```sh
python3 scripts/release-photo.py ~/Desktop/IMG_1234.HEIC public/images/releases/armenia/name.jpg
```

That handles HEIC, orientation, Display P3 to sRGB, resizing to 1600 px
(pass a third argument for another width; 1200 is enough for a paired
photo), and strips every bit of metadata. Originals can live in
`photos-originals/`, which git ignores.
