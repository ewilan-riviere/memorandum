---
title: WiFi
---

# Troubles with WiFi

Try to enable `non-free` and `contrib` for `apt`

```sh: /etc/apt/sources.list
deb http://http.us.debian.org/debian stable main contrib non-free
deb-src http://http.us.debian.org/debian stable main contrib non-free
```

Install these packages

```sh
sudo apt install -y firmware-atheros initramfs-tools firmware-realtek firmware-iwlwifi
```

And restart your device.

## Check WiFi card

```sh
lspci
```
