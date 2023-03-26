---
title: Cheatsheet
description: 'Commands cheatsheet'
position: 4
---

# Cheatsheet

```bash
wsl --help
```

Displays general information about the status of the Windows Subsystem for Linux installation.

```bash
wsl --status
```

## List distro

List distro available

```bash
wsl --list --online
```

List installed distro

```bash
wsl --list --verbose
```

## Update

Update WSL

```bash
wsl --update
```

Rolls back to the previous WSL kernel version.

```bash
wsl --update rollback
```

## Delete distribution

Here for example to delete `Ubuntu` distribution

```bash
wsl --unregister Ubuntu
```

## Tips

To open file explorer of distro files

```bash
explorer.exe .
```
