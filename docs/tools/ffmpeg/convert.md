---
title: Convert video
---

# Convert video

## MP4 to MKV

```sh
ffmpeg -i input.mp4 -c:v copy -c:a copy output.mkv
```

## ISO to MKV

```sh
ffmpeg -fflags +genpts -i input.iso -c:v copy -c:a copy output.mkv
```

To get a better quality, you can use the MakeMKV tool, available on <https://www.makemkv.com/>.
