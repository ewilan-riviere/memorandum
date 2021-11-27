---
title: Go
description: 'Install Go on Linux'
position: 6
---

## Download and install

```bash
wget -c https://golang.org/dl/go1.17.3.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.17.3.linux-amd64.tar.gz
```

```bash
vim ~/.zshrc
```

```bash[~/.zshrc]
export PATH=$PATH:/usr/local/go/bin
```

```bash
source ~/.zshrc
```
