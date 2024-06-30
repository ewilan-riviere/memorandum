---
title: fail2ban
description: Protect SSH with fail2ban on Debian
---

# fail2ban

{{ $frontmatter.description }}

::: info

- Official: <https://www.fail2ban.org/wiki/index.php/Main_Page>
- Digital Ocean: <https://www.digitalocean.com/community/tutorials/how-to-protect-ssh-with-fail2ban-on-debian-11>
- LinuxCapable: <https://www.linuxcapable.com/how-to-install-fail2ban-on-debian-linux/>

:::

## Installation

Install the package.

```sh
sudo apt update
sudo apt install -y fail2ban
```

## Configuration

Create a copy of the default configuration file.

```sh
sudo vim /etc/fail2ban/jail.local
```

```sh:/etc/fail2ban/jail.local
[DEFAULT]
# Set the ban time in seconds (e.g., 3600 seconds = 1 hour)
bantime = 3600
findtime = 10m
maxretry = 5

# Enable email notifications for bans
#destemail = your_email@example.com
#action = %(action_mw)s

# Choose the backend (auto, polling, gamin, systemd, or more)
backend = auto

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/fail2ban.log
maxretry = 3
bantime = 3600

[apache]
enabled = false
port = http,https
filter = apache-auth
logpath = /var/log/apache2/*error.log
maxretry = 5
bantime = 7200

[nginx-http-auth]
enabled = true
```

Check if `/var/log/fail2ban.log` exists.

```sh
sudo rm /var/log/fail2ban.log
sudo touch /var/log/fail2ban.log
```

Remove optional IPv6 support.

```sh
sudo vim /etc/fail2ban/fail2ban.local
```

```sh [/etc/fail2ban/fail2ban.local]
[Definition]
allowipv6 = no
```

## Enable

Enable and start the service.

```sh
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

Check the status.

```sh
sudo systemctl status fail2ban
```

## Commands

### Restart

```sh
sudo systemctl restart fail2ban
```

### Status

```sh
sudo systemctl status fail2ban
```

### Check

```sh
sudo fail2ban-client status
```

### Logs

```sh
sudo tail -f /var/log/fail2ban.log
```

### Unban

```sh
sudo fail2ban-client set sshd unbanip
```

### Check banned IPs

```sh
sudo fail2ban-client status sshd
```
