---
title: Basic Linux packages
description: Basic Linux packages to install on a server
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

Update `apt` and `upgrade` packages

```sh
sudo apt update ; sudo apt -y upgrade
```

## Basics

Install useful packages

- `zip` and `unzip` to compress and decompress files
- `curl` to download files
- `git` to manage repositories
- `vim` to edit files
- `ssh` to connect to server
- `lsb-release` to get information about distribution
- `ca-certificates` to manage certificates
- `apt-transport-https` to use https in apt
- `software-properties-common` to manage software

```sh
sudo apt install -y zip unzip curl git vim ssh lsb-release ca-certificates apt-transport-https software-properties-common
```

Install picture usage packages (if your server will handle pictures, like a website with images)

```sh
sudo apt install -y jpegoptim optipng pngquant optipng gifsicle webp
```

## vim

`vim` is a powerful text editor, you can install it with some plugins.

Edit system configuration

```sh
sudo vim /etc/vim/vimrc
```

- `nocompatible` to use Vim instead of Vi
- `number` to display line numbers
- `background=dark` to use dark theme
- `syntax on` to enable syntax highlighting
- `tabstop=4` to use 4 spaces for tab
- `smartindent` to use smart indentation
- `autoindent` to use auto indentation
- `backspace=indent,eol,start` to use backspace
- `ignorecase` to ignore case
- `ruler` to display cursor position
- `showcmd` to display command in bottom
- `mouse=a` to enable mouse

```sh:/etc/vim/vimrc
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

::: info
If copy/paste don't work in vim, check this link: <https://coderwall.com/p/if9mda/automatically-set-paste-mode-in-vim-when-pasting-in-insert-mode>
:::

Some `vim` commands (use `escape` to enter in command mode):

- `:q` to quit
- `:q!` to quit without saving
- `:w` to save
- `:wq` to save and quit
- `:x` to save and quit

## ZSH & Oh my ZSH

ZSH is a powerful command interpreter, better than bash. If you use it, you can improve it with [_Oh my ZSH_](https://ohmyz.sh/) which is configuration for ZSH.

_Install zsh_

```sh
sudo apt install -y zsh
```

_Install oh-my-zsh_

::: info
If you want to use ZSH, you need to logout to enable it, you can exit SSH session and reconnect if you are on a server.
:::

```sh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

::: info
If your shell don't persist you can add this line to `~/.bashrc` to enable it.

```sh
echo 'exec zsh' >> ~/.bashrc
```

:::

### Add theme

With _Oh my ZSH_, you can use themes to have beautiful terminal, check available themes here: [github.com/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes), I use `pmcgee`

To install a new theme, just edit `~/.zshrc`

```sh
vim ~/.zshrc
```

Search `ZSH_THEME` at the top of file and update value

```sh:~/.zshrc
ZSH_THEME="robbyrussell" # [!code --]
ZSH_THEME="pmcgee" # [!code ++]
```

Update new configuration

```sh
source ~/.zshrc
```

## eza

`eza` is a modern, maintained replacement for ls.

- [GitHub](https://github.com/eza-community/eza)

Add `gpg` to handle keys

```sh
sudo apt update
sudo apt install -y gpg
```

Add `eza` repository

```sh
sudo mkdir -p /etc/apt/keyrings
wget -qO- https://raw.githubusercontent.com/eza-community/eza/main/deb.asc | sudo gpg --dearmor -o /etc/apt/keyrings/gierens.gpg
echo "deb [signed-by=/etc/apt/keyrings/gierens.gpg] http://deb.gierens.de stable main" | sudo tee /etc/apt/sources.list.d/gierens.list
sudo chmod 644 /etc/apt/keyrings/gierens.gpg /etc/apt/sources.list.d/gierens.list
```

Install `eza`

```sh
sudo apt update
sudo apt install -y eza
```

Override `ls` with `eza`

```sh
vim ~/.zshrc
```

Add this line at the end of file

```sh:~/.zshrc
alias ls="eza"
alias ll="eza -al"
alias la="eza --long --all"
```

Update new configuration

```sh
source ~/.zshrc
```

Now you can use `eza` with `ls`.
