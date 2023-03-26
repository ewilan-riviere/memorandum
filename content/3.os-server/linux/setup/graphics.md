---
title: Graphics drivers
---

# Graphics drivers

```bash
lspci -vnn | grep -A 12 '\''[030[02]\]' | grep -Ei "vga|3d|display|kernel"
```

```bash
sudo apt install -y xserver-xorg-core xserver-xorg-video-nouveau
```