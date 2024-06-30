---
title: Cheatsheet
description: "Commands cheatsheet"
position: 4
---

# Cheatsheet

```sh
wsl --help
```

Displays general information about the status of the Windows Subsystem for Linux installation.

```sh
wsl --status
```

## List distro

List distro available

```sh
wsl --list --online
```

List installed distro

```sh
wsl --list --verbose
```

## Update

Update WSL

```sh
wsl --update
```

Rolls back to the previous WSL kernel version.

```sh
wsl --update rollback
```

## Delete distribution

Here for example to delete `Ubuntu` distribution

```sh
wsl --unregister Ubuntu
```

## Tips

To open file explorer of distro files

```sh
explorer.exe .
```
