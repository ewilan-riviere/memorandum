---
title: WiFi
---

# Troubles with WiFi

Try to enable `non-free` and `contrib` for `apt` with [this guide](/os-server/linux/setup/sources-list) and install these packages

```sh
sudo apt install -y firmware-atheros initramfs-tools firmware-realtek firmware-iwlwifi
```

And restart your device.

## Check WiFi card

```sh
lspci
```
