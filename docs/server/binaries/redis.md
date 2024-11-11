---
title: Redis
description: Redis is an open-source in-memory data structure store that can be used as a database, cache, and message broker.
---

# Redis

{{ $frontmatter.description }}

## Installation from source

Download `redis-stable`

```sh
wget https://download.redis.io/redis-stable.tar.gz
```

Compile `redis-stable`

```sh
tar -xzvf redis-stable.tar.gz
cd redis-stable
make
```

Install `redis-stable`

```sh
sudo make install
```

Run `redis-server`

```sh
redis-server
```

Create `redis.conf`

```sh
sudo cp ./redis.conf /etc/redis.conf
```

Create service

```sh
sudo vim /etc/systemd/system/redis.service
```

```sh:/etc/systemd/system/redis.service
[Unit]
Description=Redis Server
After=network.target

[Service]
ExecStart=/usr/local/bin/redis-server /etc/redis.conf
ExecStop=/usr/local/bin/redis-server shutdown
Restart=always

[Install]
WantedBy=multi-user.target
```

Reload and start service

```sh
sudo systemctl daemon-reload
sudo systemctl enable redis.service
sudo systemctl start redis.service
```

Check status

```sh
sudo systemctl status redis.service
```

## Debian with APT

```sh
sudo apt install lsb-release curl gpg -y
```

```sh
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
```

```sh
sudo apt update
sudo apt install redis -y
```

```sh
sudo service redis start
```

## macOS with Homebrew

```sh
brew install redis
```

```sh
brew services start redis
```
