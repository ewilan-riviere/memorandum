---
title: Graphic User Interface
description: 'Add GUI'
position: 7
---

- [**korben.info**](https://korben.info/linux-wsl-gui-interface-graphique-windows-10.html)

::alert{type="info"}
All this article was from korben.info
::

## Install VcXsrv

[**Download VcXsrv**](https://sourceforge.net/projects/vcxsrv/).

Now you can setup it, when you have to choose *Display settings*, you can choose *One large windows* to have a Linux desktop in window.

Add `vim-gtk` on your distro to have *vim* with GUI

```bash
sudo apt-get install vim-gtk
```

Launch it

```bash
gvim
```

If this not work, you have to update WSL

```bash
wsl --update
```

But you can add this to your `.profile`

```bash
export DISPLAY=:0
```

## Install desktop environment

Here with XFCE

```bash
sudo apt-get install xfce4
```

When is installed

```bash
xfce4-session
```
