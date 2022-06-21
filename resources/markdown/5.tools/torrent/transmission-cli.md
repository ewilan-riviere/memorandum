---
title: transmission-cli
description: ''
position: 1
---

## Ubuntu or Debian

```bash
sudo apt install -y python3-transmissionrpc python-transmissionrpc-doc transmission-daemon
```

```bash
sudo systemctl stop transmission-daemon.service
sudo vim /etc/transmission-daemon/settings.json
```

```diff[/etc/transmission-daemon/settings.json]
-"rpc-authentication-required": true,
+"rpc-authentication-required": false,
```

```bash
sudo systemctl start transmission-daemon.service
```

```bash
transmission-daemon --no-auth
sudo /etc/init.d/transmission-daemon restart
```

- `transmission-remote -a any-file.torrent`: add torrent
- `transmission-remote -l`: list torrents
- `transmission-remote -t [ID] -s`: start torrent
- `transmission-remote -t [ID] -S`: stop torrent
