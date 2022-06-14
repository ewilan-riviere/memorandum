---
title: Screen
description: Processes running in Screen will continue to run when their window is not visible even if you get disconnected
---

::info
Original article: [linuxize.com/post/how-to-use-linux-screen](https://linuxize.com/post/how-to-use-linux-screen)
::

## Cheatsheet

### Installation

```bash [Ubuntu/Debian]
sudo apt update ; sudo apt install screen
```

```bash [CentOS/Fedora]
sudo yum install screen
```

### Version

```bash
screen --version
```

### List

```bash
screen -ls
```

```output
There are screens on:
10835.pts-0.linuxize-desktop (Detached)
10366.pts-0.linuxize-desktop (Detached)
2 Sockets in /run/screens/S-linuxize.
```

```bash
screen -r 10835
```

### Reattach

```bash
screen -r
```

### Kill

```bash
pkill screen
```

## Guide

To start a screen session.

```bash
screen
```

## Commands

* `Ctrl+a` `c` Create a new window (with shell).
* `Ctrl+a` `"` List all windows.
* `Ctrl+a` `0` Switch to window 0 (by number).
* `Ctrl+a` `A` Rename the current window.
* `Ctrl+a` `S` Split current region horizontally into two regions.
* `Ctrl+a` `|` Split current region vertically into two regions.
* `Ctrl+a` `tab` Switch the input focus to the next region.
* `Ctrl+a` `Ctrl+a` Toggle between the current and previous windows
* `Ctrl+a` `Q` Close all regions but the current one.
* `Ctrl+a` `X` Close the current region.
* `Ctrl+a` `d` Detach from the screen session, the program running in the screen session will continue to run after detach.
