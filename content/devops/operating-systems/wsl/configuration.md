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

### Vim

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

### Node.js

Install NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
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

Install Node.js **14.17.5**

```bash
source ~/.profile ; nvm ls-remote ; nvm install 14.17.5 ; nvm use 14.17.5 ; nvm alias default 14.17.5 ; nvm use default ; nvm ls ; node -v
```

Install yarn

```bash
npm install -g yarn
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

```bash
ZSH_THEME="robbyrussell"
```

New theme from [**github.com/ohmyzsh/ohmyzsh/wiki/Themes**](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)

```bash
ZSH_THEME="pmcgee"
```

### PHP

#### Ubuntu

```bash
sudo add-apt-repository ppa:ondrej/php ; sudo apt update
```

#### Debian

```bash
echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/sury-php.list ; wget -qO - https://packages.sury.org/php/apt.gpg | sudo apt-key add - ; sudo apt update
```

#### Install

```bash
sudo apt -y install php8.0-fpm
```

Add PHP extension

```bash
sudo apt install -y php8.0-mbstring php8.0-mysql php8.0-common php8.0-mysql php8.0-xml php8.0-curl php8.0-gd php8.0-imagick php8.0-cli php8.0-dev php8.0-imap php8.0-mbstring php8.0-opcache php8.0-soap php8.0-zip php8.0-intl php8.0-bz2
```
