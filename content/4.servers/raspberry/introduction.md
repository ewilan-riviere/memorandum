---
title: Introduction
description: ''
position: 1
category: 'Raspberry'
---

# Get Started

::alert{type="info"}
Basics To Begin

- [**raspberrypi.org**](https://www.raspberrypi.org/downloads/raspberry-pi-os/) download Raspberry PI OS (here, we will install *Raspberry Pi OS (32-bit) Lite* without desktop)
- A Raspberry PI (I have Raspberry PI 3 B+) with power supply
- SD Card (I have 32 Go but 8 Go is enough)
- Ethernet cable (this guide setup Raspberry with ethernet, it's possible with WiFi too, check links at the end)
- A computer with Linux (it's also possible with Windows or MacOS, check links at the end)
- Terminal knowledge: basic to medium level (manage relative and absolute paths, know how to locate the name of a disk)
::

## Installation

Download *Raspberry Pi OS (32-bit) Lite* to have OS without desktop, just for server and SSH access. Unzip it like this (need to have `pzip` package)

```bash
7z x 2020-05-27-raspios-buster-lite-armhf.zip
```

You will get an `img` file: `2020-05-27-raspios-buster-lite-armhf.img`

::alert{type="warning"}
Note I have a file with `2020-05-27` in it name, you will have certainly a different file name.
::

Connect your SD Card to your computer and list disks with

```bash
lsblk -p
```

::alert{type="info"}
Erase SD Card and create new partition with any package like with `gnome-disks`
::

For example I have this output.

![alt](/documentation/raspberry/lsblk.jpg)

::alert{type="info"} Explanation

My SD Card has 32 Go disk space, `lsblk` list three disks: `sda`, `sdb`, `nvme0n1` with partitions. `sdb` have **29,7 Go** in **SIZE** column, so it's my SD Card.

::

Write OS image on SD Card with `dd`, **don't copy paste** this command, you have certainly to modify `raspios-buster-lite-armhf.img` path, like `~/2020-05-27-raspios-buster-lite-armhf.img` and modify `/dev/sdX`, like `/dev/sdb` for me.

```bash
sudo dd bs=1M if=raspios-buster-lite-armhf.img of=/dev/sdX status=progress conv=fsync
```

## Enable SSH and connection

It's will take some time. When it's finish `mount` the SD Card to access to it (you can do this with any file manager on Linux, like **Nautilus**).

In terminal, you will have access like this

```bash
cd /media/$USER/
```

You will have two partitions `boot` & `rootfs`, you have to enable SSH.

```bash
cd /media/$USER/boot/ ; touch ssh
```

```bash
cd /media/$USER/rootfs/boot/ ; touch ssh
```

Now, SSH is enabled and you can unmount SD Card (with **Nautilus** for example). And insert SD Card to Raspberry PI, insert ethernet cable and power on. Wait some seconds and try to connect with terminal.

```bash
ssh pi@raspberrypi.local
```

The default password is `raspberry`. If everything works, you will connect to your Raspberry and you can setup it.

```bash
sudo raspi-config
```

---

## Links

- [Install OS on Windows](https://www.raspberrypi.org/documentation/installation/installing-images/windows.md)
- [Install OS on Mac](https://www.raspberrypi.org/documentation/installation/installing-images/mac.md)
- [instructables.com guide: enable WiFi with Raspberry Lite](https://www.instructables.com/id/Install-and-Setup-Raspbian-Lite-on-Raspberry-Pi-3/)
- [randomnerdtutorials.com guide](https://randomnerdtutorials.com/installing-raspbian-lite-enabling-and-connecting-with-ssh/)

---

## More infos

<https://raspberrypihq.com/how-to-connect-your-raspberry-pi-to-wifi/>

```bash
sudo apt install -y exfat-utils exfat-fuse curl git nethogs vim net-tools
```

### Locales

```bash
sudo dpkg-reconfigure locales
```

Choose `en_US.UTF-8` in the list and validate

```bash
locale
```

Any error ?  
Add this to `.zshrc`

```bash
export LC_ALL="en_US.UTF-8"
export LANG="en_US.UTF-8"
export LANGUAGE="en_US.UTF-8"
```

### Setup

Define password for root

```bash
passwd
```

Edit sshd daemon config

```bash
sudo vim /etc/ssh/sshd_config
```

Add `PermitRootLogin yes`

```bash
sudo /etc/init.d/ssh restart
```

Logout SSH and SSH with `root`

```bash
ssh root@raspberrypi.local
```

Delete `pi` and create new user

```bash
userdel pi ; useradd -m newuser ; passwd newuser ; usermod -aG sudo newuser
```

Logout SSH and SSH with `newuser`

```bash
ssh newuser@raspberrypi.local
```

Remove `PermitRootLogin yes` from `/etc/ssh/sshd_config`
