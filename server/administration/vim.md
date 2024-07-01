---
title: Vim
description: Vim is a powerful text editor, you can install it with some plugins
---

# Vim

{{ $frontmatter.description }}

## Installation

```sh
sudo apt install -y vim
```

## Configuration

Edit system configuration

```sh
sudo vim /etc/vim/vimrc
```

- `nocompatible` to use Vim instead of Vi
- `number` to display line numbers
- `background=dark` to use dark theme
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
set tabstop=4
set smartindent
set autoindent
set backspace=indent,eol,start
set ignorecase
set ruler
set showcmd
set mouse=a
```

## Commands

Vim has two modes.

You can find a cheatsheet on <https://vim.rtorr.com>

- Insert mode (Where you can just type like normal text editor. Press `i` for insert mode)
- Command mode (Where you give commands to the editor to get things done . Press `ESC` for command mode)

### Insert mode

You can write text in this mode.

### Command mode

- `x`: to delete the unwanted character
- `u`: to undo the last the command and U to undo the whole line CTRL-R to redo
- `A`: to append text at the end
- `:x`: to save and exit
- `:q!`: to trash all changes
- `dw`: move the cursor to the beginning of the word to delete that word
- `2w`: to move the cursor two words forward.
- `3e`: to move the cursor to the end of the third word forward.
- `0` (zero): to move to the start of the line.
- `d2w`: which deletes 2 words .. number can be changed for deleting the number of consecutive words like `d3w`
- `dd`: to delete the line and `2dd` to delete to line .number can be changed for deleting the number of consecutive words
- `:1,$d`: to delete all lines from the current line to the end

::: info
If copy/paste don't work in vim, check this link: <https://coderwall.com/p/if9mda/automatically-set-paste-mode-in-vim-when-pasting-in-insert-mode>
:::
