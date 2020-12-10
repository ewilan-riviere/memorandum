---
title: Setup applications
description: 'Add some applications to Ubuntu'
position: 2
category: 'Linux'
---

## 1. NPM: global installations

```bash
npm install -g @vue/cli eslint
```

## 2.  Visual Studio Code

[**Visual Studio Code**](https://code.visualstudio.com/)

```bash
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg && sudo install -o root -g root -m 644 packages.microsoft.gpg /usr/share/keyrings/ && sudo sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list' && sudo apt-get install apt-transport-https && sudo apt-get update && sudo apt-get install code && rm packages.microsoft.gpg
```

Look at this configuration: [**code.visualstudio.com**](https://code.visualstudio.com/docs/setup/linux#_visual-studio-code-is-unable-to-watch-for-file-changes-in-this-large-workspace-error-enospc)

:::tip "Visual Studio Code is unable to watch for file changes in this large workspace"

```bash
cat /proc/sys/fs/inotify/max_user_watches
```

```bash
sudo vim /etc/sysctl.conf
```

Add this line to the end

<vue-code-info ext="conf" path="/etc/sysctl.conf">

```bash
fs.inotify.max_user_watches=524288
```

</vue-code-info>

```bash
sudo sysctl -p
```

:::

## 3. Spotify

[**Spotify**](https://www.spotify.com)

```bash
curl -sS https://download.spotify.com/debian/pubkey_0D811D58.gpg | sudo apt-key add - && echo "deb http://repository.spotify.com stable non-free" | sudo tee /etc/apt/sources.list.d/spotify.list && sudo apt-get update && sudo apt-get install -y spotify-client
```

## 4. Postman

[**Postman**](https://www.postman.com/)

```bash
curl -L  https://dl.pstmn.io/download/latest/linux64 -o postman.tar.gz && tar -xzf postman*.tar.gz && sudo rm -rf /opt/Postman && sudo mv Postman /opt/Postman && sudo ln -s /opt/Postman/Postman /usr/bin/postman
```

Create icon to launch Postman from your apps

```bash
vim postman.desktop
```

Copy these infos into this new file

```bash
[Desktop Entry]
Encoding=UTF-8
Name=Postman
Exec=postman
# Before v6.1.2
# Icon=/opt/Postman/resources/app/assets/icon.png
Icon=/opt/Postman/app/resources/app/assets/icon.png
Terminal=false
Type=Application
Categories=Development;
```

Move icon to apps folder

```bash
mv postman.desktop ~/.local/share/applications/
```

---

:::warning

If you want to install next apps, you need some dependencies

```bash
sudo apt install -y libatomic1 libappindicator1 libc++1 libsecret-1-dev gconf2 && sudo apt --fix-broken install
```

:::

## 5. Mailspring

[**Mailspring**](https://getmailspring.com/)

```bash
curl -L https://updates.getmailspring.com/download\?platform\=linuxDeb -o mailspring.deb && sudo dpkg -i mailspring.deb
```

## 6. Discord

[**Discord**](https://discord.com/new)

```bash
wget -O discord.deb "https://discordapp.com/api/download?platform=linux&format=deb" && sudo dpkg -i discord.deb
```

## 7. GitKraken

[**GitKraken**](https://www.gitkraken.com/)

```bash
curl -L https://www.gitkraken.com/download/linux-deb -o gitkraken.deb && sudo dpkg -i gitkraken.deb
```

## 8. Video player

[**Video players**](https://itsfoss.com/video-players-linux/)

---

## 9. Chromium & Chrome

### Chromium

```bash
sudo apt install -y chromium-browser
```

### Google Chrome

```bash
sudo sh -c 'echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list' && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - && sudo apt-get update
```

```bash
sudo apt install -y google-chrome-stable
```

---

## Remove KDE and Gnome applications

```bash
sudo apt remove -y kontact kmail thunderbird kontact plasma-discover akregator kdepim-themeeditors pim-sieve-editor ktnef ktorrent
```

```
sudo apt remove -y pim-data-exporter gnome-mines gnome-sudoku aisleriot gnome-mahjongg
```

---

## Conky

```bash
sudo apt install -y conky-all lm-sensors
```

```bash
vim ~/.conkyrc
```

<spoiler label="Configuration example for conky">

```lua[~/.conkyrc]
conky.config = {
  background = true,
  own_window = true,
  own_window_class = 'Conky',
  own_window_type = 'desktop',

  own_window_transparent = false,
  own_window_argb_visual = true,
  own_window_argb_value = 100,
  own_window_colour = 'black',

  double_buffer = true,
  no_buffers = true,
  use_spacer = 'none',
  use_xft = true,
  xftalpha = 1,
  font = 'FiraCode:medium:size=10',
  update_interval = 1,
  uppercase = false,
  override_utf8_locale = true,
  stippled_borders = 1,
  border_width = 5,
  times_in_seconds = true,
  draw_borders = false,
  draw_graph_borders = true,
  draw_outline = false,
  draw_shades = false,
  show_graph_scale = true,
  show_graph_range = true,
  alignment = 'top_right',
  gap_x = 0,
  gap_y = 56,
  net_avg_samples = 1,
  cpu_avg_samples = 6,
  short_units = true,
  pad_percents = 2,
  text_buffer_size = 2048,
  out_to_console = false,
  out_to_stderr = false,
  extra_newline = false,
  -- color
  -- default_color = DeepSkyBlue,
  default_color = SteelBlue,
  color1 = DarkOrange1,
  -- color1 = 673828,
  color2 = Green,
  color3 = Red,
  color4 = Yellow,
  color5 = DDDDDD,
  color6 = AAAAAA,
  color7 = Orange,
  color8 = DarkOrange1,
  color9 = White,
}
conky.text = [[
  $alignc ${time %H}:${time %M} $alignc ${time %A} ${time %e} ${time %h} ${time %Y}
  $alignc${exec whoami}@$nodename

  System infos ${hr 2}

  ${texeci 86400 lsb_release -si}: ${texeci 86400 lsb_release -sr} ${texeci 86400 lsb_release -sc}
  $sysname: $kernel $machine
  Uptime: $uptime
  Process: $processes / $running_processes
  Threads: $running_threads

  Battery life: ${format_time $battery_time "\hh \mm"}
  Battery: ${battery} / ${acpiacadapter} $alignr ${acpitemp}°C · ${battery_percent BAT0}%
  ${battery_bar 12}${battery_percent BAT0}%

  RAM ${hr 2}

  ${color7}$memperc% ${color9}$alignr $mem/$memmax
  ${color}${membar 12 /}

  CPU ${hr 2}

  ${execi 1000 cat /proc/cpuinfo | grep 'model name' | sed -e 's/model name.*: //'| uniq | cut -c 1-26}
  ${voffset 10}${color lightgrey}Frequency: ${freq_g} Mhz $alignr${color lightgrey} Usage:$color $cpu%
  ${color lightgrey}Temperature: ${exec sensors | grep 'Core 0' | cut -c17-23} $alignr Fan: ${exec sensors | grep 'fan1' | cut -c14-21}
  ${voffset 10}${color}${cpubar 12 /}
  #---${color lightgrey}Charge: ${loadavg}
  #---${color}${cpugraph 50, 340 5e7b7b d8deeb}

  SSD ${hr 2}
  ${voffset 6}Linux disk:${alignr}$color ${fs_used /}${color lightgrey} /$color ${fs_size /} · ${fs_free /} free
  Speed: ${diskio}/s $alignr${fs_used_perc /}%
  ${voffset 6}${fs_bar 12 /}
  #---${diskiograph 50, 340}
  #---${voffset -40}${alignc}${color #329932}${diskio}/s
  #--- NETWORK
  #---WIFI
  ${if_existing /proc/net/route wlp4s0}${color grey}
  ${color #ffffff}NETWORK ${color #ffcb48}Wi-Fi ${wireless_link_qual wlp4s0}% / ${addr wlp4s0} / ${texeci 3600 wget http://checkip.dyndns.org -O - -o /dev/null | cut -d : -f 2 | cut -d \< -f 1}${color #ffffff}${hr 2}
  ${voffset 10}${wireless_essid wlp4s0}
  ${voffset 10}Download: ${color #fffff}${downspeed wlp4s0}/s ${alignr}${color #ffffff}Upload: ${color #fffff}${upspeed wlp4s0}/s

  ${color #606060}${downspeedgraph wlp4s0 50,250 ffffff 329932} ${upspeedgraph wlp4s0 50,250 ffffff 3232ff}
  ${else}
  #---ETHERNET
  ${if_existing /proc/net/route enp3s0}
  ${color #ffffff}NETWORK ${color #ffcb48}Ethernet / ${addr enp3s0} / ${texeci 3600 wget http://checkip.dyndns.org -O - -o /dev/null | cut -d : -f 2 | cut -d \< -f 1}
  ${color #ffffff}${hr 2}
  ${voffset 10}${wireless_essid enp3s0}
  ${voffset 10}${color lightgrey}Download: $color${downspeedf enp3s0} Kb/s $alignr${color lightgrey}IP: ${addr enp3s0}
  #---
  ${else}\
  ${color #ffffff}NETWORK ${hr 2}
  No network
  ${endif}\
  ${endif}
  #---${color red}Downloaded: $color${totaldown wlp4s0} $alignr ${color green}Uploaded: $color${totalup wlp4s0}

  ${color #fff}System ${hr 2}

  ${color9}Process$alignr${color9}${color9} PID   CPU   MEM${color9}
  ${color #e09495}${top name 1} $alignr${top pid 1} ${top cpu 1} ${top mem 1}
  ${color #e0d094}${top name 2} $alignr${top pid 2} ${top cpu 2} ${top mem 2}
  ${color #A2A2A2}${top name 3} $alignr${top pid 3} ${top cpu 3} ${top mem 3}
  ${color #787878}${top name 4} $alignr${top pid 4} ${top cpu 4} ${top mem 4}

  ${color9}Memory$alignr${color9}${color9} PID   CPU   MEM${color9}
  ${color #e09495}${top_mem name 1} $alignr${top_mem pid 1} ${top_mem cpu 1} ${top_mem mem 1}
  ${color #e0d094}${top_mem name 2} $alignr${top_mem pid 2} ${top_mem cpu 2} ${top_mem mem 2}
  ${color #A2A2A2}${top_mem name 3} $alignr${top_mem pid 3} ${top_mem cpu 3} ${top_mem mem 3}
  ${color #787878}${top_mem name 4} $alignr${top_mem pid 4} ${top_mem cpu 4} ${top_mem mem 4}
]]
```

</spoiler>

### 1.a. Update Network infos

Check network infos

```bash
ip a
```

You will have output like this

```bash
2: enp3s0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state DOWN group default qlen 1000
    link/ether 6c:2b:59:70:38:4d brd ff:ff:ff:ff:ff:ff
3: wlp4s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether ec:5c:68:48:9f:fb brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.25/24 brd 192.168.1.255 scope global dynamic noprefixroute wlp4s0
       valid_lft 83269sec preferred_lft 83269sec
    inet6 fe80::8582:de49:523c:5488/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
```

Here, `enp3s0` is **ethernet** connection and `wlp4s0` is **wifi** connection.

In `.conkyrc`, you have to replace `enp3s0` and `wlp4s0` with your infos.

### Autostart

```bash
vim ~/.config/autostart/conky
```

```bash
#!/bin/bash
conky -b
```

```bash
sudo chmod 775 ~/.config/autostart/conky
```

restart or execute

```bash
conky -b
```
