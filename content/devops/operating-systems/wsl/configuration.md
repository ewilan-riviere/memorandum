---
title: Configuration
description: 'Configuration for your new distro'
position: 6
---

## Debian like

For Debian or Ubuntu

### Update

Update packages

```bash
sudo apt update ; sudo apt -y upgrade
```

### Add packages

Install some useful packages

```bash
sudo apt install -y curl git nethogs vim ssh zip unzip php-zip speedtest-cli lsb-release ca-certificates apt-transport-https software-properties-common ; sudo chmod u+s $(which nethogs)
```

#### Vim

Add vim config

```bash
sudo vim /etc/vim/vimrc
```

Copy/paste this config at the end

```bash
set nocompatible
set number
set background=dark
syntax on
set tabstop=4
set smartindent
set autoindent
set backspace=indent,eol,start
set ignorecase
set ruler
set showcmd
set mouse=a
```

#### exa

<content-alert type="info" title="For Debian">

```bash
sudo vim /etc/apt/sources.list
```

```bash[/etc/apt/sources.list]
# ...

deb http://deb.debian.org/debian testing main non-free contrib
deb-src http://deb.debian.org/debian testing main non-free contrib
```

</content-alert>

- [**GitHub**](https://github.com/ogham/exa)

```bash
sudo apt update && sudo apt upgrade -y
```

```bash
sudo apt install exa -y
```

Add to your PATH

```bash
vim ~/.zshrc
```

```bash[~/.zshrc]
alias ls="exa"
alias ll="exa --long --"
```

```bash
source ~/.zshrc
```

### Node.js

Install NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Add to path

```bash
vim ~/.profile
```

Add this configuration at the end

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] ; \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] ; \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

Install Node.js **16.13.0**

```bash
source ~/.profile ; nvm ls-remote ; nvm install 16.13.0 ; nvm use 16.13.0 ; nvm alias default 16.13.0 ; nvm use default ; nvm ls ; node -v
```

Add `.npmrc`

```bash
vim .npmrc at ~/
```

```bash[~/.npmrc]
prefix=~/.npm/bin
cache=~/.npm/cache
```

```bash
nvm use --delete-prefix v16.13.0 --silent
```

Install global packages

```bash
npm install -g yarn pnpm
```

Update npm

```bash
npm install -g npm
```

### ZSH

ZSH is a powerful command interpreter, better than bash. If you use it, you can improve it with [*Oh my ZSH*](https://ohmyz.sh/) which is configuration for ZSH.

```bash
sudo apt install -y zsh
```

#### `oh-my-zsh`

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

Add theme

```bash
vim ~/.zshrc
```

Default theme

```bash[~/.zshrc]
ZSH_THEME="robbyrussell"
```

New theme from [**github.com/ohmyzsh/ohmyzsh/wiki/Themes**](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)

```bash[~/.zshrc]
ZSH_THEME="pmcgee"
```

If you want to have NVM to path, add this configuration at the end... and every other config you have

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] ; \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] ; \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

```bash
source ~/.zshrc
```

### PHP

<content-code-group>
  <content-code-block label="Ubuntu" active>

  ```bash
  sudo add-apt-repository ppa:ondrej/php ; sudo apt update
  ```

  </content-code-block>
  <content-code-block label="Debian">

  ```bash
  echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/sury-php.list ; wget -qO - https://packages.sury.org/php/apt.gpg | sudo apt-key add - ; sudo apt update
  ```

  </content-code-block>
</content-code-group>

#### Install

```bash
sudo apt -y install php8.0-fpm
```

Add PHP extension

```bash
sudo apt install -y php8.0-mbstring php8.0-mysql php8.0-common php8.0-mysql php8.0-xml php8.0-curl php8.0-gd php8.0-imagick php8.0-cli php8.0-dev php8.0-imap php8.0-mbstring php8.0-opcache php8.0-soap php8.0-zip php8.0-intl php8.0-bz2
```
