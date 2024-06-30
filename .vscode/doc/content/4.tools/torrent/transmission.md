---
title: Transmission
description: ""
position: 1
---

# Transmission

## Ubuntu or Debian

```sh
sudo apt install -y python3-transmissionrpc python-transmissionrpc-doc transmission-daemon
```

```sh
sudo systemctl stop transmission-daemon.service
sudo vim /etc/transmission-daemon/settings.json
```

```diff [/etc/transmission-daemon/settings.json"]
-"rpc-authentication-required": true,
+"rpc-authentication-required": false,
```

```sh
sudo systemctl start transmission-daemon.service
```

```sh
transmission-daemon --no-auth
sudo /etc/init.d/transmission-daemon restart
```

## Commands

- `transmission-remote -a any-file.torrent`: add torrent
- `transmission-remote -l`: list torrents
- `transmission-remote -t [ID] -s`: start torrent
- `transmission-remote -t [ID] -S`: stop torrent
