---
title: MOTD
---

# MOTD

On Debian [cloriou.fr/2020/04/02/ajouter-motd-dynamique-debian/](https://cloriou.fr/2020/04/02/ajouter-motd-dynamique-debian/)

```bash
sudo apt-get update
sudo apt-get install -y figlet
```

## Setup `motd`

```bash
sudo mkdir /update-motd.d
sudo chmod 644 /update-motd.d
```

## Add colors

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

## Add hostname

```bash
sudo vim /etc/update-motd.d/00-hostname
```

```bash[/etc/update-motd.d/00-hostname]
#!/bin/sh

. /etc/update-motd.d/colors

printf "\n"$LIGHT_RED
figlet "  "$(hostname -s)
# figlet "server name"
printf $NONE
printf "\n"
```

## Add banner

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

## Add sysinfo

```bash
sudo vim /etc/update-motd.d/20-sysinfo
```

```bash[/etc/update-motd.d/20-sysinfo]
#!/bin/sh

# Simple system performance counter retriever

# current date
date=`date`

# current cpu load
cpu_load=`cat /proc/loadavg | awk '{print $1*100 "%"}'`

# used memory
memory_usage=`free | awk '/Mem/{printf("%.2f%"), $3/$2*100}'`
memfree=`cat /proc/meminfo | grep MemFree | awk {'print $2'}`
memtotal=`cat /proc/meminfo | grep MemTotal | awk {'print $2'}`

# used swap memory
# swap_usage=`free -m | awk '($1=="Swap:"){swapTotal=$2; swapUsed=$3} END{printf "%.1f%%", swapUsed/swapTotal * 100}'`

# used disk space
disk_usage=`df -h | awk '{if($(NF) == "/") {print $(NF-1); exit;}}'`
disk_available=`df --output=avail -h "$PWD" | sed '1d;s/[^0-9]//g'`
disk_used=`df --output=used -h "$PWD" | sed '1d;s/[^0-9]//g'`
disk_total=`df --output=size -h "$PWD" | sed '1d;s/[^0-9]//g'`

# number of open user sessions
user_sessions=`users | wc -l`

# system uptime
sys_uptime=`uptime | awk '{print $3 " " $4}' | sed s'/.$//'`

# running processes
running_processes=`ps aux | wc -l`

ip_address_v4=`ip a | grep glo | awk '{print $2}' | head -1 | cut -f1 -d/`
ip_address_v6=`wget -q -O - http://icanhazip.com/ | tail`

COLOR_DEFAULT="\033[0m"
COLOR_INFO="\033[0;37m"
LIGHT_RED="\033[1;31m"

printf "\n"
printf "\n"
printf "${COLOR_INFO}System Uptime     ${LIGHT_RED} %s\n" "${sys_uptime}"
printf "\n"
printf "${COLOR_INFO}CPU Usage         ${LIGHT_RED} %s\n" "${cpu_load}"
printf "${COLOR_INFO}Running Processes ${LIGHT_RED} %s\n" "${running_processes}"
printf "\n"
printf "${COLOR_INFO}Memory Usage      ${LIGHT_RED} %s\n" "${memory_usage}"
printf "${COLOR_INFO}Memory info       ${LIGHT_RED} %s\n" "$(($memfree/1024)) / $(($memtotal/1024)) MB"
printf "\n"
printf "${COLOR_INFO}Total Disk Usage  ${LIGHT_RED} %s\n" "${disk_usage}"
printf "${COLOR_INFO}Disk info         ${LIGHT_RED} %s\n" "${disk_used} / ${disk_total} GB"
printf "\n"
printf "${COLOR_INFO}IP address v4     ${LIGHT_RED} %s\n" "${ip_address_v4}"
printf "${COLOR_INFO}IP address v6     ${LIGHT_RED} %s\n" "${ip_address_v6}"
printf "${COLOR_DEFAULT}"
```

## Enable it

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

## Show MOTD

You can disconnect SSH sessin and reconnect to show your `motd`

## Errors

Check if your motd is correct

```bash
run-parts /etc/update-motd.d/ > /dev/null
```
