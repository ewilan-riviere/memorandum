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

::: warning
If you change SSH port, you need to update the configuration file in the `[sshd]` section.

```sh:/etc/fail2ban/jail.local
[sshd]
port = <port>
```

:::

```sh:/etc/fail2ban/jail.local
[DEFAULT]
maxretry = 5 # maximum number of retries before a host gets banned
bantime = 3600 # in seconds, 1 hour
findtime = 10m # 10 minutes

; destemail = votre.email@example.com
; sender = fail2ban@example.com
; mta = sendmail
; action = %(action_mwl)s

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/fail2ban.log

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
action = iptables[name=HTTPAuth, port=http, protocol=tcp]
logpath = /var/log/nginx/error.log
maxretry = 3

[nginx-botsearch]
enabled = true
filter = nginx-botsearch
action = iptables[name=BotSearch, port=http, protocol=tcp]
logpath = /var/log/nginx/access.log
maxretry = 2
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

### Plex

If you use Plex, you need to add the following configuration.

```sh
sudo vim /etc/fail2ban/filter.d/plex.conf
```

```sh:/etc/fail2ban/filter.d/plex.conf
[Definition]
failregex = Plex Login failed for user .* from <HOST>
ignoreregex =
```

```sh
sudo vim /etc/fail2ban/jail.local
```

```sh:/etc/fail2ban/jail.local
[plex]
enabled = true
port = 32400
filter = plex
logpath = /var/log/plex.log
maxretry = 5
bantime = 600
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

## Uninstall

Stop and disable the service.

```sh
sudo systemctl stop fail2ban
sudo systemctl disable fail2ban
```

Remove the package.

```sh
sudo apt remove --purge fail2ban -y
```

Remove the configuration files.

```sh
sudo rm -rf /etc/fail2ban
sudo rm -rf /var/log/fail2ban.log
```
