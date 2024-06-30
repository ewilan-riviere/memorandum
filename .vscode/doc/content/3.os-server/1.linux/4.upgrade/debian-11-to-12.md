---
title: Debian 11 to Debian 12
---

From <https://www.tecmint.com/upgrade-debian-11-to-12/>

## Migrate

Upgrade to latest packages.

```sh
sudo apt update && sudo apt upgrade -y
```

Purge old packages.

```sh
sudo apt --purge autoremove
```

Update APT

```sh
sudo vim /etc/apt/sources.list
```

```sh [/etc/apt/sources.list]
deb https://deb.debian.org/debian/ bookworm contrib main non-free non-free-firmware
# deb-src https://deb.debian.org/debian/ bookworm contrib main non-free non-free-firmware

deb https://deb.debian.org/debian/ bookworm-updates contrib main non-free non-free-firmware
# deb-src https://deb.debian.org/debian/ bookworm-updates contrib main non-free non-free-firmware

deb https://deb.debian.org/debian/ bookworm-proposed-updates contrib main non-free non-free-firmware
# deb-src https://deb.debian.org/debian/ bookworm-proposed-updates contrib main non-free non-free-firmware

deb https://deb.debian.org/debian/ bookworm-backports contrib main non-free non-free-firmware
# deb-src https://deb.debian.org/debian/ bookworm-backports contrib main non-free non-free-firmware

deb https://security.debian.org/debian-security/ bookworm-security contrib main non-free non-free-firmware
# deb-src https://security.debian.org/debian-security/ bookworm-security contrib main non-free non-free-firmware
```

Check if you have some extra sources in `/etc/apt/sources.list.d/`

```sh
ls /etc/apt/sources.list.d/
```

Remove all `sources.list` files into `/etc/apt/sources.list.d/`

```sh
sudo rm /etc/apt/sources.list.d/*
```

Upgrade to Debian 12

```sh
sudo apt update
```

Upgrade packages

```sh
sudo apt upgrade --without-new-pkgs
```

Upgrade distribution

```sh
sudo apt full-upgrade
```

Now you can reinstall all extra `sources.list` files into `/etc/apt/sources.list.d/`.

## Troubles

### Unmet dependencies

```sh
sudo dpkg --purge --force-depends libpcre2-posix3
```

```sh
$ sudo apt install libpcre2-posix3                                                                               [10:01:27]
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
You might want to run 'apt --fix-broken install' to correct these.
The following packages have unmet dependencies:
 libglib2.0-dev : Depends: libpcre2-dev but it is not going to be installed
 libselinux1-dev : Depends: libpcre2-dev but it is not going to be installed
 php7.4-dev : Depends: libpcre2-dev (>= 10.30) but it is not going to be installed
 php8.0-dev : Depends: libpcre2-dev (>= 10.30) but it is not going to be installed
 php8.1-dev : Depends: libpcre2-dev (>= 10.30) but it is not going to be installed
 php8.2-dev : Depends: libpcre2-dev (>= 10.30) but it is not going to be installed
E: Unmet dependencies. Try 'apt --fix-broken install' with no packages (or specify a solution).
```

```sh
sudo apt download libpcre2-posix3
sudo dpkg -i --force-overwrite libpcre2-posix3_10.42-1_amd64.deb
sudo apt install libpcre2-dev
sudo apt --fix-broken install
```
