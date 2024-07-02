---
title: WinRAR
description: WinRAR is a trialware file archiver utility.
---

# WinRAR

{{ $frontmatter.description }}

## Debian

You have to add `non-free` into your `sources.list` file, like `deb http://... <distrib> main non-free` and execute `apt update`.

```sh
sudo apt install -y rar
```

## macOS

Install with Homebrew.

```sh
brew install rar unrar
```
