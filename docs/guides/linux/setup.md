# 💻 Setup

This guide has been set for [**Ubuntu 18.04**](https://ubuntu.com/#download), if you have another distribution use it carefully.

:::tip SSH
If it's setup of server, you have to disable ssh with root and allow it with a custom user.

First time connection

```bash
ssh root@ip-address
```

```bash
apt update && apt upgrade && adduser ewilan && usermod -aG sudo ewilan
```

```bash
mkdir /home/ewilan/.ssh/ && cp /root/.ssh/authorized_keys /home/ewilan/.ssh/ && chown -R ewilan:ewilan /home/ewilan/.ssh/ && chmod -R 700 /home/ewilan/.ssh/
```

Check if ssh works with new user and disallow ssh connection with root.

```bash
vim /etc/ssh/sshd_config
```

Find `PermitRootLogin` line and replace `yes` to `no` and restart sshd daemon. Disconnect yourself with `exit` and you won't able to connect with `root`, connect with custom user now.

```bash
systemctl restart sshd.service
```

:::

```bash
sudo apt install -y ufw && sudo ufw app list && sudo ufw allow OpenSSH && sudo ufw enable && sudo ufw status
```

```bash
sudo adduser ewilan
sudo usermod -aG sudo ewilan
```

```bash
sudo ufw app list
sudo ufw allow OpenSSH
sudo ufw enable
```

## 1. Useful packages

```bash
sudo apt install -y exfat-utils exfat-fuse curl git gimp nethogs vim ssh vlc fonts-firacode net-tools florence speedtest-cli
```

:::tip

- `exfat-utils` and `exfat-fuse` packages allow to use `exFAT` disks ([**see wiki**](https://doc.ubuntu-fr.org/exfat))
- `curl` package allow to get resources with protocol
- `git` package to use git commands
- `gimp` package to edit images
- `chromium-browser` package, if `firefox-esr` is installed by default on Ubuntu, you will need Chrome or Chromium if you develop website to check webkit
- `nethogs` package allow to check bandswidth usage with `sudo nethogs`
- `vim` is command line editor, very powerful
- `ssh` package to use SSH transfers
- `fonts-firacode` package to install [**fira code fonts**](https://github.com/tonsky/FiraCode)
:::

Setup `nethogs` to use it without `sudo`

```bash
sudo setcap "cap_net_admin,cap_net_raw=ep" /usr/sbin/nethogs\n
```

You can check your bandswidth with

```bash
speedtest
```

### 1. a. Vim

Get basic configuration and copy it to user directory

```bash
sudo vim /etc/vim/vimrc
```

:::tip

For custom config for user

```bash
sudo apt install -y vim
cp /usr/share/vim/vimrc ~/
mv ~/vimrc .vimrc
```

Edit `~/.vimrc` and copy this at the end of file to enable basics features.

```bash
vim ~/.vimrc
```

:::

<code-info path="/home/user/.vimrc"></code-info>

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

:::warning
If you accept to use ZSH, you need to logout to enable it.
:::

:::tip
**Customize with theme**

With *Oh my ZSH*, you can use themes to have beautiful terminal. I advice you to use [**Spaceship prompt**](https://github.com/denysdovhan/spaceship-prompt).

*Clone theme*

```bash
git clone https://github.com/denysdovhan/spaceship-prompt.git "$ZSH_CUSTOM/themes/spaceship-prompt"
```

*Symbolic link for theme*

```bash
ln -s "$ZSH_CUSTOM/themes/spaceship-prompt/spaceship.zsh-theme" "$ZSH_CUSTOM/themes/spaceship.zsh-theme"
```

Edit this line of `~/.zshrc`

```
ZSH_THEME="spaceship"
```

:::

## 3. NodeJS: NVM

You can install basic **NPM** package but with **NVM**, you can change NodeJS version when you want. Check last version on [**NVM GitHub**](https://github.com/nvm-sh/nvm) and change it if you want latest. Here, the **NVM** version is **`0.35.3`** and **NodeJS** version is **`12.16.3`** LTS.

Download NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Add this into ~/.zshrc

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

Install Node.js v12.18.3 and config NVM to use it

```bash
source ~/.zshrc && nvm ls-remote && nvm install 12.18.3 && nvm use 12.18.3 && nvm alias default 12.18.3 && nvm use default && nvm ls && node -v
```

### 3. A. Yarn

Yarn is package manager which use NodeJS packages like NPM but it's really more powerful and it's a excellent alternative to NPM. You can use it like NPM, just type `yarn` and the command.

```bash
npm install -g yarn
```

## 4. PHP

### A. Installation

Install **NGINX** or **Apache2** to have VHost, check these guides
- [**NGINX: LEMP**](/guides/linux/lemp/)
- [**Apache2: LAMP**](/guides/linux/lamp/)

### B. Composer

Use command line instructions of [**Composer website**](https://getcomposer.org/download/) to download and install latest version of Composer

<img src="/images/linux/composer-installation-commands.jpg" class="" />

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
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
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
source .zshrc && locale
```
