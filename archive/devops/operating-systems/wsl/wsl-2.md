---
title: WSL 2
description: 'Improve performances'
position: 3
---

<content-alert type="info" title="Required">
You need to have Windows 10 update 2004 before execute below commands.
</content-alert>

- [**Official**](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

WSL 2 improve performances for WSL.

## Enable Virtual Machine feature

```bash
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

## Download the Linux kernel update package

[**Download package**](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi) and install it.

<content-alert type="warning">
Reboot after this.
</content-alert>

## Set WSL 2 as your default version

```bash
wsl --set-default-version 2
```

Check your distro

```bash
wsl --list --verbose
```

If any distro is in version 1, you can force version update

```bash
wsl --set-version Ubuntu 2
```
