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

```bash [/etc/update-motd.d/colors]
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

```bash [/etc/update-motd.d/00-hostname]
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

```bash [/etc/update-motd.d/10-banner]
#!/bin/sh

printf "`date +"%A, %e %B %Y, %r"`"
```

## Add sysinfo

```bash
sudo vim /etc/update-motd.d/20-sysinfo
```

```bash [/etc/update-motd.d/20-sysinfo]
#!/bin/sh

# Simple system performance counter retriever

# current date
date=`date`

# Linux 5.10.0-21-amd64 x86_64 GNU/Linux
linux=`uname -srmo`$(tput setaf 1)

os_architecture=`lscpu | grep Architecture | awk {'print $2'}` # x86_64
os_id=`lsb_release -s -i` # Debian
os_description=`lsb_release -s -d` # Debian GNU/Linux 11 (bullseye)
os_release=`lsb_release -s -r` # 11
os_code=`lsb_release -s -c` # bullseye

host=`hostname`
current_auth="${USER}@${host}"

ram_info=$(free -m | grep Mem)
total_ram=$(echo $ram_info | awk '{print $2}') # 4072
used_ram=$(echo $ram_info | awk '{print $3}') # 3182
available_ram=$(echo $ram_info | awk '{print $7}') # 7767

kernel=`uname -r`
uptime_days=`uptime | awk '{print $3 " " $4}' | sed s'/.$//'`
uptime=`uptime -p`
packages=`dpkg -l | wc -l`
shell_type=`echo $SHELL`
shell_version=`${shell_type} --version | head -n1 | awk {'print $1" "$2'}`
cpu=`lscpu | grep 'Model name' | awk {'print $3" "$4" "$5" "$6" "$7" "$8" "$9'}`
cpu_speed=`lscpu | grep 'CPU MHz' | awk {'print $3'}`
memory=`free -h | awk '/^Mem:/ {print $3 " / " $2}'`

# current cpu load
cpu_load=`cat /proc/loadavg | awk '{print $1*100 "%"}'`

# used memory
memory_usage=`free | awk '/Mem/{printf("%.0f%"), $3/$2*100}'`
memavailable=`cat /proc/meminfo | grep MemAvailable | awk {'print $2'}`
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
LIGHT_GREEN="\033[1;32m"

printf "\n"
printf "\n"
printf "${COLOR_INFO}Host...................${LIGHT_GREEN} %s\n" "${host}"
printf "${COLOR_INFO}OS.....................${LIGHT_GREEN} %s\n" "${os_description} ${os_architecture}"
# printf "${COLOR_INFO}User...................${LIGHT_GREEN} %s\n" "${logname}"
printf "${COLOR_INFO}Kernel.................${LIGHT_GREEN} %s\n" "${kernel}"
printf "${COLOR_INFO}System uptime..........${LIGHT_GREEN} %s\n" "${uptime_days} ($uptime)"
# printf "${COLOR_INFO}Shell..................${LIGHT_GREEN} %s\n" "${shell_version}"
printf "\n"
printf "${COLOR_INFO}CPU usage..............${LIGHT_GREEN} %s\n" "${cpu_load}"
printf "${COLOR_INFO}CPU....................${LIGHT_GREEN} %s\n" "${cpu}@${cpu_speed} MHz"
printf "${COLOR_INFO}Running processes......${LIGHT_GREEN} %s\n" "${running_processes}"
printf "${COLOR_INFO}Packages...............${LIGHT_GREEN} %s\n" "${packages} (dpkg)"
printf "\n"
printf "${COLOR_INFO}Memory usage...........${LIGHT_GREEN} %s\n" "${memory_usage}"
printf "${COLOR_INFO}Memory.................${LIGHT_GREEN} %s\n" "${used_ram} MB / ${total_ram} MB"
# printf "${COLOR_INFO}Memory free............${GREEN} %s\n" "$(($memfree/1024)) MB"
printf "\n"
printf "${COLOR_INFO}Disk usage.............${LIGHT_GREEN} %s\n" "${disk_usage}"
printf "${COLOR_INFO}Disk...................${LIGHT_GREEN} %s\n" "${disk_used} GB / ${disk_total} GB"
printf "\n"
printf "${COLOR_INFO}IP address v4..........${LIGHT_GREEN} %s\n" "${ip_address_v4}"
printf "${COLOR_INFO}IP address v6..........${LIGHT_GREEN} %s\n" "${ip_address_v6}"
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

```bash [/etc/ssh/sshd_config]
PrintMotd yes
```

## Show MOTD

You can disconnect SSH session and reconnect to show your `motd`.

## Errors

Check if your motd is correct

```bash
run-parts /etc/update-motd.d/ > /dev/null
```
