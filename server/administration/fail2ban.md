---
title: Fail2ban
---

# Fail2ban

- Official: <https://www.fail2ban.org/wiki/index.php/Main_Page>
- Digital Ocean: <https://www.digitalocean.com/community/tutorials/how-to-protect-ssh-with-fail2ban-on-debian-11>
- LinuxCapable: <https://www.linuxcapable.com/how-to-install-fail2ban-on-debian-linux/>

```bash
sudo apt update
sudo apt install -y fail2ban
```

## Configuration

```bash
sudo vim /etc/fail2ban/jail.local
```

```bash [/etc/fail2ban/jail.local]
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

```bash
sudo rm /var/log/fail2ban.log
sudo touch /var/log/fail2ban.log
```

```bash
sudo vim /etc/fail2ban/fail2ban.local
```

```bash [/etc/fail2ban/fail2ban.local]
[Definition]
allowipv6 = no
```

## Enable

```bash
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

You can restart it with:

```bash
sudo systemctl restart fail2ban
```

And check status with:

```bash
sudo systemctl status fail2ban
```

## Commands

### Check

```bash
sudo fail2ban-client status
```

### Logs

```bash
sudo tail -f /var/log/fail2ban.log
```

### Unban

```bash
sudo fail2ban-client set sshd unbanip
```

### Check banned IPs

```bash
sudo fail2ban-client status sshd
```
