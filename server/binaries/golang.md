---
title: Go (golang)
description: Install Go on Linux
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Install

Check latest version on [**GoLang**](https://golang.org/dl/) and change it if you want latest. Here, the **Go** version is **`1.22.4`**.

You have to know CPU architecture, you can check it with this command:

```sh
uname -m
```

- `x86_64` is AMD
- `aarch64` is ARM
- `arm64` is ARM

```sh:output
x86_64 # In this case, it's AMD
```

You can have another architecture, check it on [**GoLang**](https://golang.org/dl/) website.

::: code-group

```sh [AMD]
wget -c https://golang.org/dl/go1.22.4.linux-amd64.tar.gz -O go.tar.gz
```

```sh [ARM]
wget -c https://golang.org/dl/go1.22.4.linux-arm64.tar.gz -O go.tar.gz
```

:::

Delete old **Go** installation and extract new one.

```sh
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go.tar.gz
```

### Add to PATH

If you haven't ZSH, you can use `~/.bashrc` instead of `~/.zshrc`.

```sh
vim ~/.zshrc
```

```sh [~/.zshrc]
export PATH=$PATH:/usr/local/go/bin
export GOPATH="$HOME/go"
PATH="$GOPATH/bin:$PATH"
```

```sh
source ~/.zshrc
```

Now you can delete **Go** archive.

```sh
rm go.tar.gz
```

## Version

You can check **Go** version with `go version` command.

```sh
go version
```

## Update

Download new version of **Go**.

```sh
wget -c https://golang.org/dl/go1.22.4.linux-amd64.tar.gz -O go.tar.gz
```

Delete old **Go** installation and extract new one.

```sh
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go.tar.gz
```
