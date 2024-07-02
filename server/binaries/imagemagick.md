---
title: ImageMagick
description: ImageMagick is a free and open-source software suite for displaying, converting, and editing raster image and vector image files.
---

# ImageMagick

{{ $frontmatter.description }}

## Debian

Requirements

```sh
sudo apt install -y imagemagick ghostscript libmagickwand-dev
```

## macOS

Requirements

```sh
brew install imagemagick ghostscript
```

Add to path

```sh
echo 'export MAGICK_HOME=/opt/homebrew/opt/imagemagick/' >> ~/.zshrc
echo 'export PATH="/opt/homebrew/opt/imagemagick/bin:$PATH"' >> ~/.zshrc
```
