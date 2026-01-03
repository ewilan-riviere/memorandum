---
title: fail2ban
description: Protect SSH with fail2ban on Debian
---

{{ $frontmatter.description }}

::: info

- Official: <https://www.fail2ban.org/wiki/index.php/Main_Page>

:::

## Installation

Install `fail2ban` via `apt`:

```sh
sudo apt update
sudo apt install fail2ban -y
```

## Configuration

Create local configuration for `fail2ban`:

```sh
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

Create log files:

```sh
sudo rm /var/log/fail2ban.log && \
  sudo touch /var/log/fail2ban.log && \
  sudo mkdir -p /var/log/fail2ban && \
  sudo touch /var/log/fail2ban/sshd.log && \
  sudo touch /var/log/fail2ban/nginx-http-auth.log && \
  sudo touch /var/log/fail2ban/nginx-botsearch.log && \
  sudo touch /var/log/fail2ban/plex.log
```

Edit `fail2ban` config:

```sh
sudo vim /etc/fail2ban/jail.local
```

```ini:/etc/fail2ban/jail.local
[DEFAULT] # l.41
# Add any IP address to whitelist it
ignoreip = 127.0.0.1/8 ::1 PUBLIC_IP_ADDRESS # l.92
bantime  = 1h # l.101
findtime  = 10m # l.105
maxretry = 5 # l.108

# --- SSH PROTECTION ---
[sshd] # l.274
enabled = true
# Here change your SSH port if you custom it like `2222`
port    = 22 # l.280
filter  = sshd
logpath  = /var/log/fail2ban/sshd.log
backend = systemd

# --- NGINX PROTECTION (HTPASSWD) ---
[nginx-http-auth] # l.376
enabled  = true
port     = http,https # l.378
# %(nginx_error_log)s is variable to /var/log/nginx/error.log
logpath  = /var/log/fail2ban/nginx-http-auth.log

# --- BOT PROTECTION ---
[nginx-botsearch] # l.389
enabled  = true
port     = http,https # l.395
logpath  = /var/log/fail2ban/nginx-botsearch.log
maxretry = 2

# Add this if useful
# --- PLEX PROTECTION ---
[plex]
enabled  = true
filter   = plex
port     = 32400
logpath  = /var/log/fail2ban/plex.log
maxretry = 3
```

If you add `[plex]` section, add Plex filter:

```sh
sudo vim /etc/fail2ban/filter.d/plex.conf
```

```ini:/etc/fail2ban/filter.d/plex.conf
[Definition]
# Détection des échecs de connexion dans les logs Plex
failregex = ^.*WARN - (?:.*) IP:<HOST>.*auth\.failed.*$
ignoreregex =
```

Reset `fail2ban` and check status:

```sh
sudo service fail2ban stop && sudo service fail2ban start && sudo service fail2ban status
```

You have to get an output like this:

```sh:output
● fail2ban.service - Fail2Ban Service
     Loaded: loaded (/lib/systemd/system/fail2ban.service; enabled; preset: enabled)
     Active: active (running) since DATETIME CET; ms ago
       Docs: man:fail2ban(1)
   Main PID: X (fail2ban-server)
      Tasks: 1 (limit: X)
     Memory: 4.5M
        CPU: 21ms
     CGroup: /system.slice/fail2ban.service
             X /usr/bin/python3 /usr/bin/fail2ban-server -xf start

DATETIME HOSTNAME systemd[1]: Started fail2ban.service - Fail2Ban Service.
```

## Commands

### Enable

Enable and start the service.

```sh
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## Disable

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

### Status

Check the status from `systemctl`:

```sh
sudo systemctl status fail2ban
```

Check status from `fail2ban` to get jails:

```sh
sudo fail2ban-client status
```

### Restart

```sh
sudo systemctl restart fail2ban
```

### Logs

```sh
sudo tail -f /var/log/fail2ban.log
```

### Unban

Unban specific IP

```sh
sudo fail2ban-client set sshd unbanip IP_ADDRESS
```

Unban all IP

```sh
sudo fail2ban-client unban --all
```

### Check banned IPs

Replace `JAIL` with `nginx-botsearch`, `nginx-http-auth`, `plex`, `sshd`

```sh
sudo fail2ban-client status JAIL
```

## Test

### Configuration

Test configuration:

```sh
sudo fail2ban-server -t
```

Check whether your Regex (regular expressions) correctly detect the lines in your logs:

```sh
echo '2026/01/03 10:05:00 [error] 1234#0: *5 user "admin": password mismatch, client: 1.2.3.4, server: localhost, request: "GET /admin HTTP/1.1"' | sudo tee /var/log/fail2ban/nginx-http-auth.log
sudo fail2ban-regex /var/log/fail2ban/nginx-http-auth.log /etc/fail2ban/filter.d/nginx-http-auth.conf
```

### Simulate ban

Simulate ban of `1.2.3.4`

```sh
sudo fail2ban-client set nginx-http-auth banip 1.2.3.4
```

IP should be in prison:

```sh
sudo fail2ban-client status nginx-http-auth
```

And reject by firewall:

```sh
sudo iptables -L -n | grep 1.2.3.4
```

You can now unban IP:

```sh
sudo fail2ban-client set nginx-http-auth unbanip 1.2.3.4
```

### Real ban

If you really want to test under real conditions (for example, for NGINX `htpasswd` authentication):

- Use another device (smartphone with 4G, not Wi-Fi on the same network)
- Go to your protected page
- Enter incorrect credentials several times (depending on your maxretry)
- Your smartphone should eventually receive a “Timeout” or “Connection refused” error

You can now unban all IP:

```sh
sudo fail2ban-client unban --all
```
