---
title: "Setup"
description: "Additional steps to setup a VPS on Linux"
position: 2
category: "vps"
---

# Setup

::alert{type="info"}
I use Hetzner VPS with Debian 12.
::

::alert{type="warning"}
When I offer to create new user, I call it `jack`, you can use any other username.
::

## First connection

If it's setup of server, you have to disable ssh with root and allow it with a custom user.

```bash
ssh root@xxx.xx.xx.xxx
```

**Check IP**

```bash
ip addr show eth0 | grep inet | awk '{ print $2; }' | sed 's/\/.*$//'
```

## Update Linux and add new user

```bash
apt update
apt upgrade -y
apt install vim -y
adduser jack
usermod -aG sudo jack
```

## Locales

```bash
vim /etc/default/locale
```

```bash [/etc/default/locale]
LC_CTYPE="en_US.UTF-8"
LC_ALL="en_US.UTF-8"
LANG="en_US.UTF-8"
```

Generate locales

```bash
export LC_ALL="en_US.UTF-8"
export LC_CTYPE="en_US.UTF-8"
dpkg-reconfigure locales
```

## Copy SSH keys from _root_ to _jack_

```bash
mkdir /home/jack/.ssh/
cp /root/.ssh/authorized_keys /home/jack/.ssh/
chown -R jack:jack /home/jack/.ssh/
chmod -R 700 /home/jack/.ssh/
```

Exit SSH connection

```bash
exit
```

Connect to server with new user

```bash
ssh jack@xxx.xx.xx.xxx
```

Than now you can reboot server

```bash
sudo reboot
```

## Firewall

Install firewall

```bash
sudo apt install ufw
```

Set default rules

```bash
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
```

Show rules

```bash
sudo ufw show added
sudo ufw status
```

**If works**, disallow ssh connection with root.

```bash
sudo vim /etc/ssh/sshd_config
```

Find `PermitRootLogin` line and replace `yes` to `no` and restart sshd daemon. Disconnect yourself with `exit` and you won't able to connect with `root`, connect with custom user now.

```diff[/etc/ssh/sshd_config]
-PermitRootLogin yes
+PermitRootLogin no

-ChallengeResponseAuthentication yes
+ChallengeResponseAuthentication no

-PasswordAuthentication yes
+PasswordAuthentication no
```

```bash
sudo systemctl restart sshd.service
sudo ufw enable
```

## Change root password

```bash
sudo -i
```

```bash
passwd
```

```bash
exit
```

## Change SSH port

Change port in sshd config

```bash
sudo vim /etc/ssh/sshd_config
```

```bash [/etc/ssh/sshd_config]
Port 22
```

```bash [/etc/ssh/sshd_config]
Port 1234
```

Allow new port in firewall

```bash
sudo ufw allow 1234/tcp
```

Remove old port

```bash
sudo ufw delete allow 22/tcp
```

Check new rules

```bash
sudo ufw status
```

Restart sshd daemon

```bash
sudo systemctl restart sshd.service
```

## Fail2ban

Check this guide: [Fail2ban](/os-server/server/fail2ban).

## Useful packages

You can install with [this guide](/os-server/linux/setup/basics).

## NGINX

You can install NGINX with [this guide](/os-server/server/hosting/nginx).
