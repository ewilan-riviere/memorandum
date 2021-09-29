---
title: Node.js
description: 'Install Node.js and NPM on Windows'
position: 1
---

## Setup

<alert type="warning"> scoop is necessary

For this guide, you will need to have **scoop** installed, if you don't install it, check this guide: [**scoop**](/development/operating-systems/windows/scoop)

</alert>

Install [**NVM**](https://github.com/coreybutler/nvm-windows)

```bash
scoop install nvm
```

Check all versions

```bash
nvm list available
```

Install the last LTS

```bash
nvm install 14.17.5
```

Use new version

```bash
nvm use 14.17.5
```

## Install your CLI

Now you can install your CLI like `yarn`

```bash
npm i -g yarn
```

## Error npm update

When you try to update npm

```bash
npm i -g npm
```

You will have this error

```bash
npm ERR! code EEXIST
npm ERR! path C:\Users\user\scoop\apps\nvm\current\nodejs\nodejs\npm.cmd
npm ERR! Refusing to delete C:\Users\user\scoop\apps\nvm\current\nodejs\nodejs\npm.cmd: is outside C:\Users\user\scoop\apps\nvm\current\nodejs\nodejs\node_modules\npm and not a link
npm ERR! File exists: C:\Users\user\scoop\apps\nvm\current\nodejs\nodejs\npm.cmd
npm ERR! Remove the existing file and try again, or run npm
npm ERR! with --force to overwrite files recklessly.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\user\AppData\Roaming\npm-cache\_logs\2021-08-16T07_54_44_449Z-debug.log
```
