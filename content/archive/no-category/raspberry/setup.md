---
title: Setup
description: ''
position: 1
category: 'Raspberry'
---

# 🍇 Raspberry: media center

<img src="/images/raspberry.jpg" class="cover-img" />

## 1. Download and install OSMC

- [**Download OSMC**](https://osmc.tv/download/) (just Windows or MacOS)
- Format SD and launch osmc.exe
- Follow installation steps
  - If you have an error when OSMC download selected release, just change version, take oldest
- Insert SD into Raspberry and connect it to monitor
- To configure it, use a mouse and a keyboard, not just portable keyboard
- Choose language, timezone...
- For wifi configuration, if you have azerty layout, use visual keyboard

## 2. Configure AZERTY Keyboard layout (optional)

### 2.A. Option #1

Layout for azerty keyboard is not available just after installation. You have to go into console mode. Select `Power` into menu and choose `Sortir` (`Quitter` into french). OS rebooting and when screen show OSMC logo with blue wallpaper, just press on <kbd>escape</kbd> and you will access to TTY1.  
Now login with `osmc` and the password is `osmc`, you will change it later. Check updates and install additional layouts with:

```bash
sudo apt -y udpate

sudo apt-get install console-common
```

A dialog box will appear, select `Keymap from full list` and, in the newest list, choose `AZERTY / French / Same As X11 (latin 9) / Standard`. Your new layout will be installed and configured.

### 2.B. Option #2

Select `Settings` from main menun `Interface`, `Region` and select `Keyboard layout`to choose French AZERTY. You have no choices, update OSMC with [**2.A. Option #1**](#2a-option-#1).

## 3. Connect to OSMC with SSH

After configuring wifi or connect an ethernet cable, use your personal machine to connect to OSMC with SSH. Just check IP address into `Settings/System infos`, for example, `192.168.1.19`:

```bash
ssh osmc@192.168.1.19
```

The default user and default password are `osmc`. If you want to change password, type this:

```bash
# For root
sudo passwd

# For osmc user
sudo passwd osmc
```
