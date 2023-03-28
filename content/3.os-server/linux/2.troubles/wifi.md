---
title: WiFi
---

# Troubles with WiFi

Try to enable `non-free` and `contrib` for `apt` with [this guide](/os-server/linux/setup/sources-list) and install these packages

```bash
sudo apt install -y firmware-atheros initramfs-tools firmware-realtek firmware-iwlwifi
```

## Check WiFi card

```bash
lspci
```
