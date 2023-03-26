---
title: Troubles
description: 'Problems with WSL'
position: 5
---

# Troubles

## **Internet connection troubles**

Guide from [**github.com/microsoft/WSL/issues/5336**](https://github.com/microsoft/WSL/issues/5336#issuecomment-653881695)

### ***Reset network***

Open `cmd` as admin

```ps1
sudo wsl --shutdown ; sudo netsh winsock reset ; sudo netsh int ip reset all ; sudo netsh winhttp reset proxy ; sudo ipconfig /flushdns ; sudo netsh winsock reset ; sudo shutdown /r
```

Search `Network Reset` in Windows Search, enable it and restart Windows.

If doesn't work go to next step.

### ***WSL reset network config***

On WSL terminal

```bash
sudo rm /etc/resolv.conf || true
sudo rm /etc/wsl.conf || true
```

Open wsl.conf to edit it:

```bash
sudo vim /etc/wsl.conf
```

```bash
[network]
generateResolvConf = false

[automount]
enabled = true
options = "metadata"
mountFsTab = false
```

Open resolv.conf to edit it:

```bash
sudo vim /etc/resolv.conf
```

```bash
nameserver 8.8.8.8
nameserver 8.8.4.4
```

Exit WSL and in `cmd` admin

```bash
wsl --shutdown
```

If doesn't work go to next step.

### ***Misc***

- Disable Hyper-V feature
