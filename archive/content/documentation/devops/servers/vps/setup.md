---
title: "Setup VPS"
description: 'Additional steps to setup a VPS on Linux'
position: 2
category: 'vps'
---

<alert type="warning">
When I offer to create new user, I call it `jack`, you can use any other username.

</alert>

<update-username></update-username>

## SSH

If it's setup of server, you have to disable ssh with root and allow it with a custom user.

**First time connection**

```bash
ssh root@xxx.xx.xx.xxx
```

**Update Linux and add new user**

```bash
apt update ; apt upgrade ; adduser jack ; usermod -aG sudo jack
```

**Enable firewall**

```bash
sudo apt install -y ufw ; sudo ufw app list ; sudo ufw allow OpenSSH ; sudo ufw enable ; sudo ufw status
```

<alert type="info"> If server

**Copy SSH keys from *root* to *jack***

```bash
mkdir /home/jack/.ssh/ ; cp /root/.ssh/authorized_keys /home/jack/.ssh/ ; chown -R jack:jack /home/jack/.ssh/ ; chmod -R 700 /home/jack/.ssh/
```

Exit SSH connection

```bash
exit
```

Connect to server with new user

```bash
ssh jack@xxx.xx.xx.xxx
```

**If works**, disallow ssh connection with root.

```bash
vim /etc/ssh/sshd_config
```

Find `PermitRootLogin` line and replace `yes` to `no` and restart sshd daemon. Disconnect yourself with `exit` and you won't able to connect with `root`, connect with custom user now.

```bash
systemctl restart sshd.service
```

</alert>

<alert type="info"> Optional: change root password

```bash
sudo -i
```

```bash
passwd
```

```bash
exit
```

</alert>

## Basic packages

```bash
sudo apt install -y exfat-utils exfat-fuse zip unzip curl git nethogs vim ssh net-tools
```
