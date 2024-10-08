---
title: Basics & UFW
description: Install basic packages and UFW on server
---

# Basics & UFW

{{ $frontmatter.description }}

## Update system

Execute some updates and install `vim` editor

```sh
sudo apt update && sudo apt upgrade -y && sudo apt autoremove -y
```

## Packages

### Common

- `zip` and `unzip` to compress and decompress files
- `curl` to download files
- `git` to manage repositories
- `vim` to edit files
- `ssh` to connect to server
- `lsb-release` to get information about distribution
- `ca-certificates` to manage certificates
- `apt-transport-https` to use https in apt
- `software-properties-common` to manage software

```sh
sudo apt install -y \
  zip \
  unzip \
  curl \
  git \
  vim \
  ssh \
  lsb-release \
  ca-certificates \
  apt-transport-https \
  software-properties-common \
  htop \
  p7zip-full \
  neofetch
```

### Handle images

These tools are used to optimize images.

::: info
If your server is not used to host images, you can skip this step.
:::

```sh
sudo apt install -y \
  jpegoptim \
  optipng \
  pngquant \
  optipng \
  gifsicle \
  webp
```

### Conversion

These tools are used to convert images and videos.

- `ffmpeg` to convert videos
- `imagemagick` to convert images

```sh
sudo apt install -y \
  ffmpeg \
  imagemagick
```

### Server monitoring

::: info
You can install all packages or only some of them.
:::

Base packages

- `procps` : provides `ps`, `vmstat`, `uptime`, `top` for basic stats
- `util-linux` : `dmesg`, `lsblk`, `lscpu` for system logs and hardware info
- `sysstat` : `iostat`, `mpstat`, `pidstat`, `sar` for disk/CPU stats
- `iproute2` : `ip`, `ss`, `nstat`, `tc`, recommended network tools
- `numactl` : `numastat` for NUMA stats

```sh
sudo apt install -y procps util-linux sysstat iproute2 numactl
```

Network tools

- `tcpdump` : network sniffer
- `nicstat` : network interface stats
- `ethtool` : interface info

```sh
sudo apt install -y tcpdump nicstat ethtool
```

Profiling and tracing tools

- `linux-tools-common` et `linux-tools-$(uname -r)` : perf, turbostat
- `bpfcc-tools` (ou `bcc`) : a suite of powerful eBPF tools
- `bpftrace` : a dynamic eBPF scripting tool
- `trace-cmd` : command line tool for `ftrace`

```sh
sudo apt install -y linux-tools-common linux-tools-$(uname -r) bpfcc-tools bpftrace trace-cmd
```

Equipment-specific tools

- GPU Intel : `intel-gpu-tools`
- GPU NVIDIA : `nvidia-smi`

## UFW (Firewall)

Install firewall

```sh
sudo apt install ufw -y
```

Set default rules

```sh
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
```

Enable firewall

```sh
sudo ufw enable
```

Show rules

```sh
sudo ufw show added
sudo ufw status
```

**If works**, disallow ssh connection with root.

```sh
sudo vim /etc/ssh/sshd_config
```

Find `PermitRootLogin` line and replace `yes` to `no` and restart sshd daemon. Disconnect yourself with `exit` and you won't able to connect with `root`, connect with custom user now.

```diff[/etc/ssh/sshd_config]
-#Port 22
+Port 22 # l. 14 to change port

-PermitRootLogin yes
+PermitRootLogin no # l. 33 to disable root login

-PasswordAuthentication yes
+PasswordAuthentication no # l. 57 to disable password auth

-KbdInteractiveAuthentication yes
+KbdInteractiveAuthentication no # l. 62 to disable password auth
```

```sh
sudo systemctl restart sshd.service
```

### Change SSH port

Change port in sshd config

```sh
sudo vim /etc/ssh/sshd_config
```

```sh [/etc/ssh/sshd_config]
Port 22
```

```sh [/etc/ssh/sshd_config]
Port 1234
```

Allow new port in firewall

```sh
sudo ufw allow 1234/tcp
```

Remove old port

```sh
sudo ufw delete allow 22/tcp
```

Check new rules

```sh
sudo ufw status
```

Restart sshd daemon

```sh
sudo systemctl restart sshd.service
```
