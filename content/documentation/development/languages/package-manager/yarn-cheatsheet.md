---
title: Yarn cheatsheet
description: 'Useful commands for Yarn'
position: 2
category: 'Package manager'
---

## Upgrade dependencies

```bash
yarn upgrade --lastest
```

## Clean cache

Yarn cache can take disk space on prod

```bash
yarn cache clean
```

## Errors with prod

If you works on **Windows** on *local* and you've a **Linux** *prod*, when you execute `yarn`, `yarn.lock` will change on *prod*. It's cause by differences between **Windows** and **Linux**. You can copy `yarn.lock` from *prod* with `scp` command to your *local* and you won't have any other problems with **yarn**.
