---
title: Node.js
description: Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
---

# Node.js

{{ $frontmatter.description }}

::: info
Here we will install `nvm` to use multiple Node.js version.
:::

You can install basic **Node.js** package but with **NVM**, you can change Node.js version when you want. Check last version on [**NVM GitHub**](https://github.com/nvm-sh/nvm) and change it if you want latest.

Here, the **NVM** version is **`0.39`** and **Node.js** version is **`20.15.0`** LTS.

## Installation

Download NVM

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Add this into `~/.zshrc`

::: info
If NVM is already in `~/.zshrc`, you can skip this step.
:::

```sh
vim ~/.zshrc
```

```sh[.zshrc]
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

Reload `~/.zshrc`

```sh
source ~/.zshrc
```

## Usage

Now you can use `nvm`, install Node.js `v20.15.0` and config `nvm` to use it.

List all Node.js versions

```sh
nvm ls-remote
```

Install Node.js `v20.15.0`

```sh
nvm install 20.15.0
```

Use Node.js `v20.15.0`

```sh
nvm use 20.15.0
```

Set `v20.15.0` as default

```sh
nvm alias default 20.15.0
```

Use default Node.js version

```sh
nvm use default
```

Check Node.js version

```sh
nvm ls
node -v
```

## Install another version

If you want to install another version, you can use `nvm install` command.

```sh
nvm install 14.17.0
```

And to use it

```sh
nvm use 14.17.0
```

## Usage with absolute path

If you want to use Node.js with absolute path, you can use `nvm which` command.

```sh
nvm which 20.15.0
```

You can use this path to run Node.js.

```sh
/home/user/.nvm/versions/node/v20.15.0/bin/node ./index.js
```

## Errors

If you have an error like `nvm: command not found`, you can check if `nvm` is in `~/.zshrc`.

```sh
cat ~/.zshrc
```

If it's not there, you can add it.

```sh
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```
