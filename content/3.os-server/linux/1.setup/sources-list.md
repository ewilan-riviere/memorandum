---
title: sources.list
---

# sources.list

```bash
sudo apt update ; sudo apt upgrade -y
```

Edit `/etc/apt/sources.list` and add `contrib` and `non-free` to the end of each line.

```bash
sudo vim /etc/apt/sources.list
```

```yaml [/etc/apt/sources.list]
deb http://deb.debian.org/debian bullseye main contrib non-free
deb-src http://deb.debian.org/debian bullseye main contrib non-free

deb http://deb.debian.org/debian-security/ bullseye-security main contrib non-free
deb-src http://deb.debian.org/debian-security/ bullseye-security main contrib non-free

deb http://deb.debian.org/debian bullseye-updates main contrib non-free
deb-src http://deb.debian.org/debian bullseye-updates main contrib non-free
```

```bash
sudo apt update ; sudo apt upgrade -y
```
