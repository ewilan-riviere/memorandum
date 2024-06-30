---
title: Graphic User Interface
description: "Add GUI"
position: 7
---

# Graphic User Interface

- [**korben.info**](https://korben.info/linux-wsl-gui-interface-graphique-windows-10.html)

::alert{type="info"}
All this article was from korben.info
::

## Install VcXsrv

[**Download VcXsrv**](https://sourceforge.net/projects/vcxsrv/).

Now you can setup it, when you have to choose _Display settings_, you can choose _One large windows_ to have a Linux desktop in window.

Add `vim-gtk` on your distro to have _vim_ with GUI

```sh
sudo apt-get install vim-gtk
```

Launch it

```sh
gvim
```

If this not work, you have to update WSL

```sh
wsl --update
```

But you can add this to your `.profile`

```sh
export DISPLAY=:0
```

## Install desktop environment

Here with XFCE

```sh
sudo apt-get install xfce4
```

When is installed

```sh
xfce4-session
```
