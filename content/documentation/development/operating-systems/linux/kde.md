---
title: KDE
description: 'Tips about KDE'
position: 7
category: 'Linux'
---

Install KDE Plasma with some basic apps and redshift for blue light management (you can control with a widget in systray)

```bash
sudo apt install -y kde-standard plasma-applet-redshift-control
```

In **Settings**

Input devices -> Touchpad -> Taps
Mouse Click Emulation
Scrolling
Reverse scrolling "Vertical"

Applications Style -> Window decorations
Add "Arc OSX Black"

Applications -> Default applications
Change if need

Window management -> Window behavior -> Windows actions -> Inner window, titlebar & frame
Left button -> Nothing

Desktop behavior -> Screen locking -> Appearance
Choose Image, "Scale, Keep Proportions"

Startup and  Shutdown -> Login Screen (SDDM) -> Theme
Update Background

Left click on desktop
Configure Desktop
Choose image
"Scale, Keep Proportions"

Account Details -> User Manager
Click on avatar, `Load from file...`

---

GIMP
Windows -> Single window mode

## Remove `snap`

You will see snap here

```bash
lsblk -p
```

```bash
snap list
```

Example:

```bash
sudo snap remove gnome-3-26-1604 gnome-calculator gnome-characters gnome-logs gnome-system-monitor
```

```bash
sudo umount /snap/core/6350
```

```bash
sudo apt purge snapd
```

## Switch HDMI

<https://www.simplified.guide/kde/automatically-run-program-on-startup>

disable sleep ->systemtray->disable power management

KDE Settings
Multimedia->Audio Volume->Advanced

Built-in Audio

- Analog Stereo Output
- Digital Stereo (HDMI) Output
