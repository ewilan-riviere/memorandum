---
title: Screen
description: Processes running in Screen will continue to run when their window is not visible even if you get disconnected
---

# Screen

{{ $frontmatter.description }}

::: info
Original article: [linuxize.com/post/how-to-use-linux-screen](https://linuxize.com/post/how-to-use-linux-screen)
:::

## Installation

::: code-group

```js [Ubuntu/Debian]
sudo apt update -y ; sudo apt -y install screen
```

```ts [CentOS/Fedora]
sudo yum install screen
```

:::

## Usage

Execute a new screen.

```sh
screen
```

Valid screen with `Enter` key and you are into a screen, you can execute any command with a really long time of execution. After this, you can `detach` screen with `Ctrl`+`A` `D`. You will be back into SSH session, you can get back your screen with `screen -r` to `reattach` it if you have one screen.

Now you can check yours screens with `screen -ls` and `reattach` any with ID like `10835.pts-0.linuxize-desktop (Detached)` with `screen -r 10835`.

Of course you can exit SSH session and screen will continue to execute command in background.

### Commands

- `Ctrl+a` `c` Create a new window (with shell).
- `Ctrl+a` `"` List all windows.
- `Ctrl+a` `0` Switch to window 0 (by number).
- `Ctrl+a` `A` Rename the current window.
- `Ctrl+a` `S` Split current region horizontally into two regions.
- `Ctrl+a` `|` Split current region vertically into two regions.
- `Ctrl+a` `tab` Switch the input focus to the next region.
- `Ctrl+a` `Ctrl+a` Toggle between the current and previous windows
- `Ctrl+a` `Q` Close all regions but the current one.
- `Ctrl+a` `X` Close the current region.
- `Ctrl+a` `d` Detach from the screen session, the program running in the screen session will continue to run after detach.

## Cheatsheet

### Version

```sh
screen --version
```

### List

```sh
screen -ls
```

```sh
There are screens on:
10835.pts-0.linuxize-desktop (Detached)
10366.pts-0.linuxize-desktop (Detached)
2 Sockets in /run/screens/S-linuxize.
```

Connect to a screen:

```sh
screen -r 10835
```

### Reattach

If you have only one screen session you can reattach it by typing:

```sh
screen -r
```

### Kill

To delete all detached screens:

```sh
pkill screen
```
