---
title: Go
description: 'Install Go on Linux'
position: 6
---

## Install Go

Check latest version on [**GoLang**](https://golang.org/dl/) and change it if you want latest. Here, the **Go** version is **`1.21.4`**.

You have to know CPU architecture, you can check it with `uname -m` command.

- `x86_64` is AMD
- `aarch64` is ARM
- `arm64` is ARM

You can have another architecture, check it on [**GoLang**](https://golang.org/dl/) website.

::code-group
  ```bash [AMD]
  wget -c https://golang.org/dl/go1.21.4.linux-amd64.tar.gz -O go.tar.gz
  ```
  ```bash [ARM]
  wget -c https://golang.org/dl/go1.21.4.linux-arm64.tar.gz -O go.tar.gz
  ```
::

Delete old **Go** installation and extract new one.

```bash
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go.tar.gz
```

Add to PATH, if you haven't ZSH, you can use `~/.bashrc` instead of `~/.zshrc`.

```bash
vim ~/.zshrc
```

```bash [~/.zshrc]
export PATH=$PATH:/usr/local/go/bin
export GOPATH="$HOME/go"
PATH="$GOPATH/bin:$PATH"
```

```bash
source ~/.zshrc
```

You can check **Go** version with `go version` command.

```bash
go version
```

Now you can delete **Go** archive.

```bash
rm go.tar.gz
```

## Update Go

Download new version of **Go**.

```bash
wget -c https://golang.org/dl/go1.21.4.linux-amd64.tar.gz -O go.tar.gz
```

Delete old **Go** installation and extract new one.

```bash
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go.tar.gz
```
