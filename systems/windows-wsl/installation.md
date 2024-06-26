---
title: Installation
description: WSL install from CLI
---

# Installation

- [**Official doc**](https://docs.microsoft.com/en-us/windows/wsl/install-manual)

## From Microsoft Store

Open Store and search distro like _Ubuntu_ or _Debian_.

<!-- <content-image source="store-search.webp"></content-image> -->

Choose your distro and install it, you will have access from Start menu to define your username and password.

### More

- If you want to use your new WSL with nice terminal, check **Windows terminal**
- If you want to improve your WSL with **WSL 2**

- [**Official doc**](https://docs.microsoft.com/en-us/windows/wsl/install-manual)
- [**blog.eleven-labs.com: french article**](https://blog.eleven-labs.com/fr/le-developpement-sous-linux-depuis-windows-10-avec-wsl-2/)
- [**korben.info: french article**](https://korben.info/installer-wsl2-windows-linux.html)

If don't want to install anything for Store, you can choose some other options.

## Without Microsoft Store

### From CLI

- [**ghacks.net: install from single command**](https://www.ghacks.net/2021/08/01/install-windows-subsystem-for-linux-with-a-single-command/)

Find list of all distros

```sh
wsl --list --online
```

Lists all available Linux distributions that you may install using the wsl command. Currently, these are:

- `Ubuntu`: Ubuntu
- `Debian`: Debian GNU/Linux
- `kali-linux`: Kali Linux Rollin
- `openSUSE-42`: openSUSE Leap 42
- `SLES-12 SUSE`: Linux Enterprise Server v12
- `Ubuntu-16.04`: Ubuntu 16.04 LTS
- `Ubuntu-18.04`: Ubuntu 18.04 LTS
- `Ubuntu-20.04`: Ubuntu 20.04 LTS

Install your distro

```sh
wsl --install -d <DistroName>
```

### With `appx`

You can download any distro in `.appx` format to install it.

#### Manual

You can manually download distros from [**docs.microsoft.com**](https://docs.microsoft.com/en-us/windows/wsl/install-manual#downloading-distributions).

#### CommandLine

To find distro name, check link of each distro on [**docs.microsoft.com**](https://docs.microsoft.com/en-us/windows/wsl/install-manual#downloading-distributions), some examples here:

- wslubuntu2004
- wsl-debian-gnulinux

##### PowerShell

Example with Ubuntu 20.04

```ps1
Invoke-WebRequest -Uri https://aka.ms/wslubuntu2004 -OutFile Ubuntu.appx -UseBasicParsing
```

##### cURL

Example with Ubuntu 20.04

```sh
curl.exe -L -o Ubuntu.appx https://aka.ms/wslubuntu2004
```

#### Install .appx

```ps1
Add-AppxPackage .\Ubuntu.appx
```
