---
title: Connection & user
description: How to connect to server and create a new user
---

# Connection & user

{{ $frontmatter.description }}

To install a new server, you have to choose a provider. I use [Hetzner](https://www.hetzner.com/) VPS with Debian 12. Of course you can use any other provider and any other OS.

::: info
When I offer to create new user, I call it `jack`, you can use any other username.
:::

## Connect to server

If it's setup of server, you have to disable ssh with root and allow it with a custom user.

```sh
ssh root@xxx.xx.xx.xxx
```

### Get IP address from server

```sh
ip addr show eth0 | grep inet | awk '{ print $2; }' | sed 's/\/.*$//'
```

## Add sudo (Debian)

If `sudo` is not installed, you have to install it. To execute this, you have to be connected with `root`.

```sh
su - root
```

```sh
apt install -y sudo
```

After that, you can add new user and add it to `sudo` group.

```sh
adduser jack
usermod -aG sudo jack
```

Now you can exit SSH session and connect with new user.

::: info
You have to kill current session with `exit` command to reload groups.
:::

```sh
exit
```

You can now connect with new user and use `sudo` command.

## Add new user

Add new user (you can use any other name)

```sh
sudo adduser jack
sudo usermod -aG sudo jack
```

## Fix locales

Fix locales for new user

```sh
sudo vim /etc/default/locale
```

```sh [/etc/default/locale]
LC_CTYPE="en_US.UTF-8"
LC_ALL="en_US.UTF-8"
LANG="en_US.UTF-8"
```

Generate locales

```sh
export LC_ALL="en_US.UTF-8"
export LC_CTYPE="en_US.UTF-8"
dpkg-reconfigure locales
```

## Copy SSH keys from _root_

Copy SSH keys from _root_ to new user

```sh
sudo mkdir /home/jack/.ssh/
sudo cp /root/.ssh/authorized_keys /home/jack/.ssh/
sudo chown -R jack:jack /home/jack/.ssh/
sudo chmod -R 700 /home/jack/.ssh/
```

Exit SSH connection

```sh
exit
```
