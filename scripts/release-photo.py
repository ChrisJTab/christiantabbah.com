#!/usr/bin/env python3
"""Turn a phone photo into a release photo.

    python3 scripts/release-photo.py IMG_1234.HEIC public/images/releases/<slug>/<name>.jpg [width]

Converts HEIC (via sips, macOS), applies the orientation the phone
recorded, converts Display P3 to sRGB, resizes to `width` pixels wide
(default 1600; 1200 is plenty for a paired photo), and writes a
progressive JPEG with no metadata, so no GPS position or device info
ships with the picture. Needs Pillow (python3 -m pip install Pillow).
"""
import io
import os
import subprocess
import sys
import tempfile

from PIL import Image, ImageCms, ImageOps


def main() -> None:
    if len(sys.argv) not in (3, 4):
        sys.exit(__doc__)
    src, dst = sys.argv[1], sys.argv[2]
    width = int(sys.argv[3]) if len(sys.argv) == 4 else 1600

    with tempfile.TemporaryDirectory() as tmp:
        path = src
        if src.lower().endswith(('.heic', '.heif')):
            path = os.path.join(tmp, 'full.jpg')
            subprocess.run(
                ['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '95', src, '--out', path],
                check=True,
                capture_output=True,
            )
        im = ImageOps.exif_transpose(Image.open(path))
        icc = im.info.get('icc_profile')
        if icc:
            im = ImageCms.profileToProfile(
                im, ImageCms.ImageCmsProfile(io.BytesIO(icc)), ImageCms.createProfile('sRGB'), outputMode='RGB'
            )
        else:
            im = im.convert('RGB')

    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    os.makedirs(os.path.dirname(dst) or '.', exist_ok=True)
    im.save(dst, 'JPEG', quality=82, optimize=True, progressive=True)
    print(f'{dst}: {im.width}x{im.height}, {os.path.getsize(dst) // 1024} KB, no metadata')


if __name__ == '__main__':
    main()
