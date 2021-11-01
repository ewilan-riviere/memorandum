---
title: Setup
description: 'How to setup Linux'
position: 1
category: 'Linux'
---

This guide has been set for [**Ubuntu 20.04**](https://ubuntu.com/#download) and Debian 10, if you have another distribution use it carefully.

## 1. Useful packages

```bash
sudo apt install -y exfat-utils exfat-fuse zip unzip curl git gimp nethogs vim ssh vlc fonts-firacode net-tools florence speedtest-cli jpegoptim optipng pngquant optipng gifsicle webp
```

<content-alert type="info">

- `exfat-utils` and `exfat-fuse` packages allow to use `exFAT` disks ([**see wiki**](https://doc.ubuntu-fr.org/exfat))
- `curl` package allow to get resources with protocol
- `git` package to use git commands
- `gimp` package to edit images
- `chromium-browser` package, if `firefox-esr` is installed by default on Ubuntu, you will need Chrome or Chromium if you develop website to check webkit
- `nethogs` package allow to check bandswidth usage with `sudo nethogs`
- `vim` is command line editor, very powerful
- `ssh` package to use SSH transfers
- `fonts-firacode` package to install [**fira code fonts**](https://github.com/tonsky/FiraCode)

Setup `nethogs` to use it without `sudo`

```bash
sudo chmod u+s $(which nethogs)
```

You can check your bandswidth with

```bash
speedtest
```

</content-alert>

### 1. a. Vim

Get basic configuration and copy it to user directory

```bash
sudo vim /etc/vim/vimrc
```

```vim
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

#### `set paste`

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

<content-alert type="info">

**Customize with theme**

With *Oh my ZSH*, you can use themes to have beautiful terminal, check available themes here: [github.com/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes), I use `pmcgee`

To install a new theme, just edit `.zshrc`

```bash
vim ~/.zshrc
```

Search `ZSH_THEME` at the top of file and update value

```bash[.zshrc]
ZSH_THEME="pmcgee"
```

Update new configuration

```bash
source ~/.zshrc
```

</content-alert>

## 3. NodeJS: NVM

You can install basic **NPM** package but with **NVM**, you can change NodeJS version when you want. Check last version on [**NVM GitHub**](https://github.com/nvm-sh/nvm) and change it if you want latest. Here, the **NVM** version is **`0.38`** and **NodeJS** version is **`16.13.0`** LTS.

Download NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Add this into ~/.zshrc

```bash[.zshrc]
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

Install Node.js v16.13.0 and config NVM to use it

<content-code-group>
  <content-code-block label="One command" active>

  ```bash
  source ~/.zshrc ; nvm ls-remote ; nvm install 16.13.0 ; nvm use 16.13.0 ; nvm alias default 16.13.0 ; nvm use default ; nvm ls ; node -v
  ```

  </content-code-block>
  <content-code-block label="With more details">

  Update `.zshrc` for **PATH**

  ```bash
  source ~/.zshrc
  ```

  List all Node.js  available versions with NVM

  ```bash
  nvm ls-remote
  ```

  Install specific version

  ```bash
  nvm install 16.13.0
  ```

  Use specific version

  ```bash
  nvm use 16.13.0
  ```

  Assign a version to **default**

  ```bash
  nvm alias default 16.13.0
  ```

  Use default version

  ```bash
  nvm use default
  ```

  List installed versions

  ```bash
  nvm ls
  ```

  Get current version

  ```bash
  node -v
  ```

  </content-code-block>
</content-code-group>

### 3. A. Node alt package manager

Yarn is package manager which use NodeJS packages like NPM but it's really more powerful and it's a excellent alternative to NPM. You can use it like NPM, just type `yarn` and the command.

```bash
npm install -g yarn pnpm
```

## 4. PHP

### A. Installation

Install **NGINX** or **Apache2** to have VHost, check these guides

- [**NGINX: LEMP**](/development/operating-systems/linux/lemp)
- [**Apache2: LAMP**](/development/operating-systems/linux/lamp)

### B. Composer

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
export PATH=~/.config/composer/vendor/bin:$PATH
```

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
source .zshrc ; locale
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
