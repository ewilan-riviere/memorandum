---
title: "Setup VPS"
description: 'Additional steps to setup a VPS on Linux'
position: 2
category: 'vps'
---

<content-alert type="warning">
When I offer to create new user, I call it `jack`, you can use any other username.

</content-alert>

## SSH

If it's setup of server, you have to disable ssh with root and allow it with a custom user.

**First time connection**

```bash
ssh root@xxx.xx.xx.xxx
```

**Check IP**

```bash
/sbin/ip -4 addr ; /sbin/ip -6 addr
```

**Update Linux and add new user**

```bash
apt update ; apt upgrade ; adduser jack ; usermod -aG sudo jack
```

**Enable firewall**

```bash
sudo apt install -y ufw vim ; sudo ufw app list ; sudo ufw allow OpenSSH ; sudo ufw enable ; sudo ufw status
```

### Copy SSH keys from *root* to *jack*

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
sudo vim /etc/ssh/sshd_config
```

Find `PermitRootLogin` line and replace `yes` to `no` and restart sshd daemon. Disconnect yourself with `exit` and you won't able to connect with `root`, connect with custom user now.

```diff[/etc/ssh/sshd_config]
-PermitRootLogin yes
+PermitRootLogin no
```

```bash
sudo systemctl restart sshd.service
```

### Change root password

```bash
sudo -i
```

```bash
passwd
```

```bash
exit
```

## Add packages

Check [**Linux guide**](/devops/operating-systems/linux/setup).

## MOTD

On Debian [cloriou.fr/2020/04/02/ajouter-motd-dynamique-debian/](https://cloriou.fr/2020/04/02/ajouter-motd-dynamique-debian/)

```bash
sudo apt-get update ; sudo apt-get install -y figlet
```

### Setup `motd`

```bash
sudo mkdir /update-motd.d ; sudo chmod 644 /update-motd.d
```

### Add colors

```bash
sudo vim /etc/update-motd.d/colors
```

```bash[/etc/update-motd.d/colors]
NONE="\033[m"
WHITE="\033[1;37m"
GREEN="\033[1;32m"
RED="\033[0;32;31m"
YELLOW="\033[1;33m"
BLUE="\033[34m"
CYAN="\033[36m"
LIGHT_GREEN="\033[1;32m"
LIGHT_RED="\033[1;31m"
```

### Add hostname

```bash
sudo vim /etc/update-motd.d/00-hostname
```

```bash[/etc/update-motd.d/00-hostname]
#!/bin/sh

. /etc/update-motd.d/colors

printf "\n"$LIGHT_RED
figlet "  "$(hostname -s)
printf $NONE
printf "\n"
```

### Add banner

```bash
sudo vim /etc/update-motd.d/10-banner
```

```bash[/etc/update-motd.d/10-banner]
#!/bin/sh

printf "`date +"%A, %e %B %Y, %r"`"
printf "\n"
printf "`uname -srmo`$(tput setaf 1)"
printf "\n"
printf "`lsb_release -s -d`$(tput setaf 1)"
```

### Add sysinfo

```bash
sudo vim /etc/update-motd.d/20-sysinfo
```

```bash[/etc/update-motd.d/20-sysinfo]
#!/bin/sh

upSeconds="$(/usr/bin/cut -d. -f1 /proc/uptime)"
secs=$((${upSeconds}%60))
mins=$((${upSeconds}/60%60))
hours=$((${upSeconds}/3600%24))
days=$((${upSeconds}/86400))
UPTIME=`printf "%d days, %02dh%02dm%02ds" "$days" "$hours" "$mins" "$secs"`
proc=`(echo $(more /proc/cpuinfo | grep processor | wc -l ) "x" $(more /proc/cpuinfo | grep 'model name' | uniq |awk -F":"  '{print $2}') )`
memfree=`cat /proc/meminfo | grep MemFree | awk {'print $2'}`
memtotal=`cat /proc/meminfo | grep MemTotal | awk {'print $2'}`
uptime=`uptime -p`
addrip=`hostname -I | cut -d " " -f1`
# Récupérer le loadavg
read one five fifteen rest < /proc/loadavg

printf "\n"
printf "\n"
printf "Uptime.............: ${uptime}"
printf "\n"
printf "Memory.............: $(($memfree/1024))MB free / $(($memtotal/1024))MB"
printf "\n"
printf "Load Averages......: ${one}, ${five}, ${fifteen} (1, 5, 15 min)"
printf "\n"
printf "Running Processes..: `ps ax | wc -l | tr -d " "`"
printf "\n"
printf "IP Addresses.......: v4 `ip a | grep glo | awk '{print $2}' | head -1 | cut -f1 -d/`, v6 `wget -q -O - http://icanhazip.com/ | tail`"
```

### Enable it

```bash
sudo chmod 755 /etc/update-motd.d/00-hostname
sudo chmod 755 /etc/update-motd.d/10-banner
sudo chmod 755 /etc/update-motd.d/20-sysinfo
```

```bash
sudo vim /etc/ssh/sshd_config
```

```bash[/etc/ssh/sshd_config]
PrintMotd yes
```

### Show MOTD

You can disconnect SSH sessin and reconnect to show your `motd`

### Errors

Check if your motd is correct

```bash
run-parts /etc/update-motd.d/ > /dev/null
```
