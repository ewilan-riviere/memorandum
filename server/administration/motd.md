---
title: MOTD
description: Message of the Day is a message that is displayed when a user logs into a Unix system. It is often used to send important messages to users.
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

A guide is available at [cloriou.fr/2020/04/02/ajouter-motd-dynamique-debian](https://cloriou.fr/2020/04/02/ajouter-motd-dynamique-debian/).

## Installation

`figlet` is a program that creates ASCII art text banners. Install it with:

```sh
sudo apt update
sudo apt install -y figlet
```

Create a directory for MOTD scripts

```sh
sudo mkdir /etc/update-motd.d
sudo chmod 644 /etc/update-motd.d
```

### Add colors

To use different colors in your MOTD, create a file with colors

```sh
sudo vim /etc/update-motd.d/colors
```

```sh:[/etc/update-motd.d/colors
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

### Add hostname

To display the hostname in your MOTD, create a file with the hostname

```sh
sudo vim /etc/update-motd.d/00-hostname
```

```sh:/etc/update-motd.d/00-hostname
#!/bin/sh

. /etc/update-motd.d/colors

printf "\n"$LIGHT_RED
figlet "Server name" # $(hostname -s)
printf $NONE
printf "\n"
```

### Add banner

To display a banner in your MOTD, create a file with the banner

```sh
sudo vim /etc/update-motd.d/10-banner
```

```sh:/etc/update-motd.d/10-banner
#!/bin/sh

apt_upgradable=`apt list --upgradable 2>/dev/null | wc -l` # 0

printf "`date +"%A, %e %B %Y, %r"`"
printf "\n"
printf "${apt_upgradable} packages can be updated"
printf "\n"
```

### Add sysinfo

To display system information in your MOTD, create a file with the system information

```sh
sudo vim /etc/update-motd.d/20-sysinfo
```

```sh:[/etc/update-motd.d/20-sysinfo
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
memory_used=$(free -m | awk 'NR==2 { printf "%.2f GB\n", $3/1024 }')   # 3182
memory_total=$(free -m | awk 'NR==2 { printf "%.2f GB\n", $2/1024 }')  # 4072
available_ram=$(echo $memory_info | awk '{print $7}') # 7767

uptime_days=$(uptime | awk '{print $3 " " $4}' | sed s'/.$//')
uptime=$(uptime -p)
packages=$(dpkg -l | wc -l)
cpu=$(lscpu | grep 'Model name' | awk {'print $3" "$4" "$5" "$6" "$7" "$8" "$9'})
cpu_speed=$(fgrep MHz /proc/cpuinfo | awk '{ print $4 }' | head -1)

# current cpu load
cpu_load=$(cat /proc/loadavg | awk '{print $1*100 "%"}')

disk_usage=$(df -h | awk '{if($(NF) == "/") {print $(NF-1); exit;}}')
disk_available=$(df --output=avail -h "$PWD" | sed '1d;s/[^0-9]//g')
disk_used=$(df --output=used -BM "$PWD" | sed '1d;s/[^0-9]//g' | awk '{ printf "%.0f GB", $1/1024 }')
disk_total=$(df --output=size -BM "$PWD" | sed '1d;s/[^0-9]//g' | awk '{ printf "%.0f GB", $1/1024 }')

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
printf "${COLOR_INFO}Memory.................${LIGHT_GREEN} %s\n" "${memory_used} / ${memory_total}"
# printf "${COLOR_INFO}Memory free............${GREEN} %s\n" "$(($memfree/1024)) MB"
printf "\n"
printf "${COLOR_INFO}Disk usage.............${LIGHT_GREEN} %s\n" "${disk_usage}"
printf "${COLOR_INFO}Disk...................${LIGHT_GREEN} %s\n" "${disk_used} / ${disk_total}"
printf "\n"
printf "${COLOR_INFO}IP address v4..........${LIGHT_GREEN} %s\n" "${ip_address_v4}"
printf "${COLOR_INFO}IP address v6..........${LIGHT_GREEN} %s\n" "${ip_address_v6}"
printf "${COLOR_DEFAULT}"
```

### Enable it

To enable the MOTD, make the scripts executable

```sh
sudo chmod 755 /etc/update-motd.d/00-hostname
sudo chmod 755 /etc/update-motd.d/10-banner
sudo chmod 755 /etc/update-motd.d/20-sysinfo
```

Allow MOTD in SSH

```sh
sudo vim /etc/ssh/sshd_config
```

```sh:/etc/ssh/sshd_config
PrintMotd yes
```

Restart SSH service

```sh
sudo systemctl restart sshd.service
```

## Test MOTD

You can disconnect SSH session and reconnect to show your `motd`, or use command:

```sh
run-parts /etc/update-motd.d
```

## Update original MOTD

You can update original MOTD with:

```sh
sudo vim /etc/motd
```

## Errors

Check if your motd is correct

```sh
run-parts /etc/update-motd.d/ > /dev/null
```
