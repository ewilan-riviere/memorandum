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
#!/bin/sh

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

apt_upgradable=`apt list --upgradable 2>/dev/null | wc -l` # 0

printf "`date +"%A, %e %B %Y, %r"`"
printf "\n"
printf "${apt_upgradable} packages can be updated"
printf "\n"
```

## Add sysinfo

```bash
sudo vim /etc/update-motd.d/20-sysinfo
```

```bash [/etc/update-motd.d/20-sysinfo]
#!/bin/sh

# Simple system performance counter retriever

kernel_name=$(uname -s)             # Linux
operating_system=$(uname -o)        # GNU/Linux
os_id=$(lsb_release -s -i)          # Debian
os_description=$(lsb_release -s -d) # Debian GNU/Linux 11 (bullseye)
os_release=$(lsb_release -s -r)     # 11
os_code=$(lsb_release -s -c)        # bullseye

kernel=$(uname -r)          # 5.10.0-21-amd64
os_architecture=$(uname -m) # x86_64 can be x86, i686, i386, x86_64, x64

bits=$(getconf LONG_BIT) # 64
cpu_vendor_id=$(cat /proc/cpuinfo | grep 'vendor_id' | uniq | awk {'print $3'})

host=$(hostname)
current_auth="${USER}@${host}"

memory_usage=$(free | awk '/Mem/{printf("%.0f%"), $3/$2*100}')
memory_info=$(free -m | grep Mem)
memory_total=$(echo $memory_info | awk '{print $2}')  # 4072
memory_used=$(echo $memory_info | awk '{print $3}')   # 3182
available_ram=$(echo $memory_info | awk '{print $7}') # 7767

uptime_days=$(uptime | awk '{print $3 " " $4}' | sed s'/.$//')
uptime=$(uptime -p)
packages=$(dpkg -l | wc -l)
cpu=$(lscpu | grep 'Model name' | awk {'print $3" "$4" "$5" "$6" "$7" "$8" "$9'})
cpu_speed=$(lscpu | grep 'CPU MHz' | awk {'print $3'})

# current cpu load
cpu_load=$(cat /proc/loadavg | awk '{print $1*100 "%"}')

disk_usage=$(df -h | awk '{if($(NF) == "/") {print $(NF-1); exit;}}')
disk_available=$(df --output=avail -h "$PWD" | sed '1d;s/[^0-9]//g')
disk_used=$(df --output=used -h "$PWD" | sed '1d;s/[^0-9]//g')
disk_total=$(df --output=size -h "$PWD" | sed '1d;s/[^0-9]//g')

# number of open user sessions
user_sessions=$(users | wc -l)

# running processes
running_processes=$(ps aux | wc -l)

ip_address_v4=$(ip a | grep glo | awk '{print $2}' | head -1 | cut -f1 -d/)
ip_address_v6=$(wget -q -O - http://icanhazip.com/ | tail)

COLOR_DEFAULT="\033[0m"
COLOR_INFO="\033[0;37m"
LIGHT_RED="\033[1;31m"
LIGHT_GREEN="\033[1;32m"

printf "\n"
printf "${COLOR_INFO}System uptime..........${LIGHT_GREEN} %s\n" "${uptime_days} ($uptime)"
printf "${COLOR_INFO}Host...................${LIGHT_GREEN} %s\n" "${host}"
printf "${COLOR_INFO}Running processes......${LIGHT_GREEN} %s\n" "${running_processes}"
printf "${COLOR_INFO}Packages...............${LIGHT_GREEN} %s\n" "${packages} (dpkg)"
printf "\n"
printf "${COLOR_INFO}Kernel.................${LIGHT_GREEN} %s\n" "${kernel_name} (${operating_system})"
printf "${COLOR_INFO}Kernel version.........${LIGHT_GREEN} %s\n" "${kernel}"
printf "\n"
printf "${COLOR_INFO}OS distribution........${LIGHT_GREEN} %s\n" "${os_id} ${os_release} (${os_code})"
printf "${COLOR_INFO}OS architecture........${LIGHT_GREEN} %s\n" "${bits}-bit (${os_architecture}) ${cpu_vendor_id}"
printf "\n"
printf "${COLOR_INFO}CPU usage..............${LIGHT_GREEN} %s\n" "${cpu_load}"
printf "${COLOR_INFO}CPU type...............${LIGHT_GREEN} %s\n" "${cpu}"
printf "${COLOR_INFO}CPU speed..............${LIGHT_GREEN} %s\n" "${cpu_speed} MHz"
printf "\n"
printf "${COLOR_INFO}Memory usage...........${LIGHT_GREEN} %s\n" "${memory_usage}"
printf "${COLOR_INFO}Memory.................${LIGHT_GREEN} %s\n" "${memory_used} MB / ${memory_total} MB"
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

You can disconnect SSH session and reconnect to show your `motd`, or use command:

```bash
run-parts /etc/update-motd.d
```

## Errors

Check if your motd is correct

```bash
run-parts /etc/update-motd.d/ > /dev/null
```
