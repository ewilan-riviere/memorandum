---
title: Improve terminal
---

# Improve terminal

## exa: a replacement for ‘ls’

- [GitHub](https://github.com/ogham/exa)

```bash
sudo vim /etc/apt/sources.list
```

Add `test` repositories

```bash [/etc/apt/sources.list]
# ...

deb http://deb.debian.org/debian testing main non-free contrib
deb-src http://deb.debian.org/debian testing main non-free contrib
```

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

## thefuck: corrects your command

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