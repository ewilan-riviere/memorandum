---
title: Yarn
description: "Useful commands for Yarn"
position: 2
category: "Package manager"
---

# Yarn

## Upgrade dependencies

```sh
yarn upgrade --lastest
```

## Clean cache

Yarn cache can take disk space on prod

```sh
yarn cache clean
```

## Errors with prod

If you works on **Windows** on _local_ and you've a **Linux** _prod_, when you execute `yarn`, `yarn.lock` will change on _prod_. It's cause by differences between **Windows** and **Linux**. You can copy `yarn.lock` from _prod_ with `scp` command to your _local_ and you won't have any other problems with **yarn**.
