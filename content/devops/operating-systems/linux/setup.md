---
title: Setup
description: 'How to setup Linux'
position: 1
category: 'Linux'
---

This guide has been set for [**Ubuntu 20.04**](https://ubuntu.com/#download) and Debian 10, if you have another distribution use it carefully.

## 1. Useful packages

Update repo

```bash
sudo apt update ; sudo apt -y upgrade
```

Install packages

```bash
sudo apt install -y exfat-utils exfat-fuse zip unzip curl git nethogs vim ssh net-tools jpegoptim optipng pngquant optipng gifsicle webp lsb-release ca-certificates apt-transport-https software-properties-common
```

- `exfat-utils` and `exfat-fuse` packages allow to use `exFAT` disks ([**see wiki**](https://doc.ubuntu-fr.org/exfat))
- `curl` package allow to get resources with protocol
- `git` package to use git commands
- `nethogs` package allow to check bandswidth usage with `sudo nethogs`
- `vim` is command line editor, very powerful
- `ssh` package to use SSH transfers

Setup `nethogs` to use it without `sudo`

```bash
sudo chmod u+s $(which nethogs)
```

You can check your bandswidth with

```bash
speedtest
```

### Vim

Get basic configuration and copy it to user directory

```bash
sudo vim /etc/vim/vimrc
```

```vim[/etc/vim/vimrc]
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

<content-alert type="info"> To have user's config

```bash
cp /usr/share/vim/vimrc ~/ ; mv ~/vimrc .vimrc
```

Edit `~/.vimrc` and copy the config at the end of file to enable it.

```bash
vim ~/.vimrc
```

</content-alert>

#### set paste

- <https://coderwall.com/p/if9mda/automatically-set-paste-mode-in-vim-when-pasting-in-insert-mode>

## 2. ZSH & Oh my ZSH

ZSH is a powerful command interpreter, better than bash. If you use it, you can improve it with [*Oh my ZSH*](https://ohmyz.sh/) which is configuration for ZSH.

*Install zsh*

```bash
sudo apt install -y zsh
```

*Install oh-my-zsh*

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

<content-alert type="warning">

If you accept to use ZSH, you need to logout to enable it.

</content-alert>

### Customize with theme

With *Oh my ZSH*, you can use themes to have beautiful terminal, check available themes here: [github.com/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes), I use `pmcgee`

To install a new theme, just edit `.zshrc`

```bash
vim ~/.zshrc
```

Search `ZSH_THEME` at the top of file and update value

```diff[~/.zshrc]
-ZSH_THEME="robbyrussell"
+ZSH_THEME="pmcgee"
```

Update new configuration

```bash
source ~/.zshrc
```

## Additional apps

### exa: a replacement for ‘ls’

- [GitHub](https://github.com/ogham/exa)

<content-code-group>
  <content-code-block label="Ubuntu" active>

  ```bash
  sudo add-apt-repository ppa:ondrej/php
  ```

  </content-code-block>
  <content-code-block label="Debian">

  ```bash
  sudo vim /etc/apt/sources.list
  ```

  Add `test` repositories

  ```bash[/etc/apt/sources.list]
  # ...

  deb http://deb.debian.org/debian testing main non-free contrib
  deb-src http://deb.debian.org/debian testing main non-free contrib
  ```

  </content-code-block>
</content-code-group>

Refresh repo

```bash
sudo apt update && sudo apt upgrade -y
```

Install `exa`

```bash
sudo apt install exa -y
```

Make alias in your PATH

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

Now you can use `exa` with `ls`.

### thefuck: corrects your command

Magnificent app which corrects your previous console command.

- [GitHub](https://github.com/nvbn/thefuck#installation)

```bash
sudo apt update
sudo apt install python3-dev python3-pip python3-setuptools
pip3 install thefuck --user
```

```bash
vim ~/.zshrc
```

```bash[~/.zshrc]
export PATH=~/.local/bin:$PATH
eval "$(thefuck --alias)"
```

```bash
source ~/.zshrc
```

## 3. NodeJS: NVM

You can install basic **NPM** package but with **NVM**, you can change NodeJS version when you want. Check last version on [**NVM GitHub**](https://github.com/nvm-sh/nvm) and change it if you want latest. Here, the **NVM** version is **`0.38`** and **NodeJS** version is **`16.13.0`** LTS.

Download NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Add this into `~/.zshrc`

```bash
vim ~/.zshrc
```

```bash[.zshrc]
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

Now you can use `nvm`, install Node.js `v16.13.0` and config `nvm` to use it

```bash
source ~/.zshrc
nvm ls-remote
nvm install 16.13.0
nvm use 16.13.0 
nvm alias default 16.13.0
nvm use default
nvm ls
node -v
```

### 3. A. Global packages

If you want to keep your global `npm` packagesn you can set global path

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
nvm use --delete-prefix v16.13.0 --silent
```

Now you can install additional useful packages

```bash
npm install -g yarn pnpm svgo npm-check-updates
```

Update npm

```bash
npm install -g npm
```

## 4. PHP

To get latest versions of PHP

<content-code-group>
  <content-code-block label="Ubuntu" active>

  ```bash
  sudo add-apt-repository ppa:ondrej/php
  sudo apt update
  ```

  </content-code-block>
  <content-code-block label="Debian">

  ```bash
  echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/sury-php.list
  wget -qO - https://packages.sury.org/php/apt.gpg | sudo apt-key add -
  sudo apt update
  ```

  </content-code-block>
</content-code-group>

Install latest PHP version.

```bash
sudo apt -y install php8.0-fpm
```

Add PHP extension

```bash
sudo apt install -y php8.0-mbstring php8.0-mysql php8.0-common php8.0-mysql php8.0-xml php8.0-curl php8.0-gd php8.0-imagick php8.0-cli php8.0-dev php8.0-imap php8.0-mbstring php8.0-opcache php8.0-soap php8.0-zip php8.0-intl php8.0-bz2
```

### Composer

Use command line instructions of [**Composer website**](https://getcomposer.org/download/) to download and install latest version of Composer

<content-image source="composer-installation-commands.jpg"></content-image>

You have just to copy installation instructions and composer will be download, this is an example:

```bash
sudo mv composer.phar /usr/local/bin/composer
sudo chown -R $USER ~/.config/composer/
composer global require laravel/installer
```

Add this to `.zshrc`

```bash
vim ~/.zshrc
```

```bash[~/.zshrc]
export PATH=~/.config/composer/vendor/bin:$PATH
```

```bash
source ~/.zshrc
```

Now you can use `composer`.

### Stack

Install **NGINX** or **Apache2** to have VHost, check these guides

- [**NGINX: LEMP**](/development/operating-systems/linux/lemp)
- [**Apache2: LAMP**](/development/operating-systems/linux/lamp)

## 5. Graphics drivers

```bash
lspci -vnn | grep -A 12 '\''[030[02]\]' | grep -Ei "vga|3d|display|kernel"
```

```bash
sudo apt install -y xserver-xorg-core xserver-xorg-video-nouveau
```

## Errors

### Paths errors

Add this to /home/$USER/.zshrc

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] ; \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] ; \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
export PATH="$PATH:$(yarn global bin)"
export PATH=~/.config/composer/vendor/bin:$PATH
```

### Locale error

Add this to `.zshrc` or similar

```bash
export LC_ALL="en_US.UTF-8"
export LANG="en_US.UTF-8"
export LANGUAGE="en_US.UTF-8"
```

```bash
source ~/.zshrc
locale
```

---

## Troubles

- Prepare boot useb key with Rufus on Windows, just use windows.iso
- Install Windows

<content-alert type="info">

- In Windows, run Command Prompt as admin
- Invoke a Safe Mode boot with the command: `bcdedit /set {current} safeboot minimal`
- Restart the PC and enter your BIOS during bootup.
- Change from IDE to AHCI mode then Save & Exit.
- Windows 10 will launch in Safe Mode.
- Right click the Window icon and select to run the Command Prompt in Admin mode from among the various options.
- Cancel Safe Mode booting with the command: `bcdedit /deletevalue {current} safeboot`
- Restart your PC once more and this time it will boot up normally but with AHCI mode activated.
</content-alert>

Machine: Dell 15 5584

- Delete any program for Intel Storage Rapid
- Right click on Windows logo, choose execute, type `msconfig`
- Go to Startup tab, select safe boot and accept reboot
- Go to the BIOS, **System Configuration**, **SATA Operation**, select **AHCI**
- Reboot, if system boot on Linux, use Boot-repair to repair boot, if not, boot on LiveUSB and use Boot-repair
- On Windows, you can login with password of Microsoft account (and not with secret code). If you have problems, keep *shift* and select *reboot* at the bottom right to trigger safe mode options
- When you are login, disable safe mode and reboot, your system will be repaired now!

---

With MSI XPG X570 motherboard

- make sure in UEFI settings to select USB key to boot on it
- install linux (keep uefi install on nvme, choose any disk for root)
- restart computer
- if grub not work, got to uefi and select linux disk in priorities boot
- repair grub if not work
- grub have to work now
