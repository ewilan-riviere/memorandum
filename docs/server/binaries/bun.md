---
title: Bun
description: Develop, test, run, and bundle JavaScript & TypeScript projects—all with Bun. Bun is an all-in-one JavaScript runtime & toolkit designed for speed, complete with a bundler, test runner, and Node.js-compatible package manager.
---

# Bun

{{ $frontmatter.description }}

## Install

::: code-group

```sh [Linux]
curl -fsSL https://bun.sh/install | bash
```

```ps1 [Windows]
powershell -c "irm bun.sh/install.ps1 | iex"
```

:::

```bash:~/.zshrc
[ -s "/Users/ewilan/.bun/_bun" ] && source "/Users/ewilan/.bun/_bun"
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
```

Reload shell

```sh
source ~/.zshrc
```

## Usage

To use Bun, run the following command:

```sh
bun
```

To get version information:

```sh
bun --version
```
