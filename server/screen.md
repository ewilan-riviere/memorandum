---
title: Screen
description: Processes running in Screen will continue to run when their window is not visible even if you get disconnected
---

# Screen

::info
Original article: [linuxize.com/post/how-to-use-linux-screen](https://linuxize.com/post/how-to-use-linux-screen)
::

## Installation

```bash [Ubuntu/Debian]
sudo apt update ; sudo apt install screen
```

```bash [CentOS/Fedora]
sudo yum install screen
```

## Usage

Execute a new screen.

```bash
screen
```

Valid screen with `Enter` key and you are into a screen, you can execute any command with a really long time of execution. After this, you can `detach` screen with `Ctrl`+`A` `D`. You will be back into SSH session, you can get back your screen with `screen -r` to `reattach` it if you have one screen.

Now you can check yours screens with `screen -ls` and `reattach` any with ID like `10835.pts-0.linuxize-desktop (Detached)` with `screen -r 10835`.

Of course you can exit SSH session and screen will continue to execute command in background.

## Cheatsheet

### Version

```bash
screen --version
```

### List

```bash
screen -ls
```

```bash
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
