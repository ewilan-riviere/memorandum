---
title: WiFi and Bluetooth
description: Handle WiFi and Bluetooth
---

# WiFi and Bluetooth

{{ $frontmatter.description }}

## Disable WiFi and Bluetooth

```sh
sudo vim /boot/firmware/config.txt
```

```diff:/boot/firmware/config.txt
[all]
+ dtoverlay=disable-wifi
+ dtoverlay=disable-bt
```

```sh
sudo reboot now
```
