# Setup

::: tip Basics To Begin

- [**raspberrypi.org**](https://www.raspberrypi.org/downloads/raspberry-pi-os/) download Raspberry PI OS (here, we will install *Raspberry Pi OS (32-bit) Lite* without desktop)
- A Raspberry PI (I have Raspberry PI 3 B+) with power supply
- SD Card (I have 32 Go but 8 Go is enough)
- Ethernet cable (this guide setup Raspberry with ethernet, it's possible with WiFi too, check links at the end)
- A computer with Linux (it's also possible with Windows or MacOS, check links at the end)
- Terminal knowledge: basic to medium level (manage relative and absolute paths, know how to locate the name of a disk)

:::

## Installation

Download *Raspberry Pi OS (32-bit) Lite* to have OS without desktop, just for server and SSH access. Unzip it like this (need to have `pzip` package)

```bash
7z x 2020-05-27-raspios-buster-lite-armhf.zip
```

You will get an `img` file: `2020-05-27-raspios-buster-lite-armhf.img`

:::warning
Note I have a file with `2020-05-27` in it name, you will have certainly a different file name.
:::

Connect your SD Card to your computer and list disks with

```bash
lsblk -p
```

For example I have this output.

![alt](/images/raspberry/lsblk.jpg)

:::tip Explanation

My SD Card has 32 Go disk space, `lsblk` list three disks: `sda`, `sdb`, `nvme0n1` with partitions. `sdb` have **29,7 Go** in **SIZE** column, so it's my SD Card.

:::

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
cd /media/$USER/boot/ && touch ssh
```
```bash
cd /media/$USER/rootfs/boot/ && touch ssh
```

Now, SSH is enabled and you can unmount SD Card (with **Nautilus** for example). And insert SD Card to Raspberry PI, insert ethernet cable and power on. Wait some seconds and try to connect with terminal.

```bash
ssh pi@raspberrypi.local
```

The default password is `raspberry`. If everything works, you will connect to your Raspberry and you can setup it.

---

## Links

- [Install OS on Windows](https://www.raspberrypi.org/documentation/installation/installing-images/windows.md)
- [Install OS on Mac](https://www.raspberrypi.org/documentation/installation/installing-images/mac.md)
- [instructables.com guide: enable WiFi with Raspberry Lite](https://www.instructables.com/id/Install-and-Setup-Raspbian-Lite-on-Raspberry-Pi-3/)
- [randomnerdtutorials.com guide](https://randomnerdtutorials.com/installing-raspbian-lite-enabling-and-connecting-with-ssh/)
