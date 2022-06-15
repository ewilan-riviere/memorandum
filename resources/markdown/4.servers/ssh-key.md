---
title: SSH Key
description: Generate and manage SSH keys
---

## Generate

::info
From [tutox.fr/2020/04/16/generer-des-cles-ssh-qui-tiennent-la-route](https://tutox.fr/2020/04/16/generer-des-cles-ssh-qui-tiennent-la-route/)

### Old way

```bash
ssh-keygen -t rsa -b 2048
```

### New way

```bash
ssh-keygen -t ed25519
```

## Add to server

Open `~/.ssh/known_hosts`

```bash
vim ~/.ssh/known_hosts
```

And add your `id_ed25519.pub` or `id_rsa.pub`.
