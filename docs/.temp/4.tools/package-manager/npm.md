---
title: NPM
description: Useful commands for NPM
---

# NPM

## Upgrade dependencies

Install globally `npm-check-updates`

```sh
npm i -g npm-check-updates
```

Check updates

```sh
ncu -u
```

Execute updates

```sh
npm update
```

## Global packages

If you want to keep your global `npm` packages you can set global path

```sh
vim ~/.npmrc
```

```sh[~/.npmrc]
prefix=~/.npm/bin
cache=~/.npm/cache
```

Add to `~/.zshrc`

```sh
vim ~/.zshrc
```

```sh[~/.zshrc]
export PATH=~/.npm/bin:$PATH
```

```sh
source ~/.zshrc
```

```sh
nvm use --delete-prefix v18.17.0 --silent
```

Now you can install additional useful packages

## Self update

Update npm

```sh
npm install -g npm
```
