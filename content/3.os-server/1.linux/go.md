---
title: Go
description: 'Install Go on Linux'
position: 6
---

## Install Go

Check latest version on [**GoLang**](https://golang.org/dl/) and change it if you want latest. Here, the **Go** version is **`1.20.7`**.

```bash
wget -c https://golang.org/dl/go1.21.3.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.21.3.linux-amd64.tar.gz
```

```bash
vim ~/.zshrc
```

```bash[~/.zshrc]
export PATH=$PATH:/usr/local/go/bin
export GOPATH="$HOME/go"
PATH="$GOPATH/bin:$PATH"
```

```bash
source ~/.zshrc
```

## Update Go

```bash
wget -c https://golang.org/dl/go1.21.3.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.21.3.linux-amd64.tar.gz
```
