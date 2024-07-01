---
title: ZSH & Oh my ZSH
description: ZSH is a powerful command interpreter, better than bash. If you use it, you can improve it with Oh my ZSH which is configuration for ZSH.
---

# ZSH & Oh my ZSH

ZSH is a powerful command interpreter, better than bash. If you use it, you can improve it with [_Oh my ZSH_](https://ohmyz.sh/) which is configuration for ZSH.

## Install `zsh`

```sh
sudo apt install -y zsh
```

## Install `oh-my-zsh`

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

### Change theme

With _Oh my ZSH_, you can use themes to have beautiful terminal, check available themes here: [github.com/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes), I use `pmcgee`.

You can find other themes on <https://github.com/ohmyzsh/ohmyzsh/wiki/Themes>

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
