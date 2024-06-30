---
title: Metadata
---

# Metadata

## Print file metadata

With ffprobe

```sh
ffprobe -v quiet -print_format json -show_format -show_streams input.mkv
```

With mediainfo

```sh
mediainfo --Output=JSON input.mkv
```

With exiftool

```sh
exiftool input.mkv
```

## Print file metadata to file

With ffprobe

```sh
ffprobe -v quiet -print_format json -show_format -show_streams input.mkv > metadata.json
```

With mediainfo

```sh
mediainfo --Output=JSON input.mkv > metadata.json
```

With exiftool

```sh
exiftool input.mkv > metadata.json
```
