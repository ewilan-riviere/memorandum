---
title: Node.js
---

# NodeJS

::alert{type="info"}
Here we will install `nvm` to use multiple NodeJS version.
::

You can install basic **Node.js** package but with **NVM**, you can change NodeJS version when you want. Check last version on [**NVM GitHub**](https://github.com/nvm-sh/nvm) and change it if you want latest. Here, the **NVM** version is **`0.39`** and **NodeJS** version is **`18.15.0`** LTS.

Download NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

Add this into `~/.zshrc`

```bash
vim ~/.zshrc
```

```bash[.zshrc]
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

```bash
source ~/.zshrc
```

Now you can use `nvm`, install Node.js `v18.15.0` and config `nvm` to use it

```bash
nvm ls-remote
nvm install 18.15.0
nvm use 18.15.0
nvm alias default 18.15.0
nvm use default
nvm ls
node -v
```
