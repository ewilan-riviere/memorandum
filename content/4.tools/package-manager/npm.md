---
title: NPM
description: Useful commands for NPM
---

# NPM

## Upgrade dependencies

Install globally `npm-check-updates`

```bash
npm i -g npm-check-updates
```

Check updates

```bash
ncu -u
```

Execute updates

```bash
npm update
```

## Global packages

If you want to keep your global `npm` packages you can set global path

```bash
vim ~/.npmrc
```

```bash[~/.npmrc]
prefix=~/.npm/bin
cache=~/.npm/cache
```

Add to `~/.zshrc`

```bash
vim ~/.zshrc
```

```bash[~/.zshrc]
export PATH=~/.npm/bin:$PATH
```

```bash
source ~/.zshrc
```

```bash
nvm use --delete-prefix v18.15.0 --silent
```

Now you can install additional useful packages

## Self update

Update npm

```bash
npm install -g npm
```