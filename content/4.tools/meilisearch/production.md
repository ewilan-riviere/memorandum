---
title: Production
description: How to setup Meilisearch into production
---

# Production

Here an example of how to setup Meilisearch into production on Debian server.

- [docs.meilisearch.com](https://docs.meilisearch.com/learn/cookbooks/running_production.html)

## Install Meilisearch

Add Meilisearch package

```bash
echo "deb [trusted=yes] https://apt.fury.io/meilisearch/ /" | sudo tee /etc/apt/sources.list.d/fury.list
```

Update APT and install Meilisearch

```bash
sudo apt update && sudo apt install meilisearch
```

Launch Meilisearch

```bash
meilisearch
```

## Create Meilisearch user

```bash
sudo useradd -d /var/lib/meilisearch -b /bin/false -m -r meilisearch
```

## Create configuration

Create configuration file

```bash
curl https://raw.githubusercontent.com/meilisearch/meilisearch/latest/config.toml > ~/meilisearch.toml
```

Move it to `/etc/meilisearch.toml`

```bash
sudo mv ~/meilisearch.toml /etc/meilisearch.toml
```

Edit it

```bash
sudo vim /etc/meilisearch.toml
```

You can generate a 16 bytes key with `openssl` for `MASTERKEY`

```bash
openssl rand -hex 16
```

```toml title="/etc/meilisearch.toml"
db_path = "/var/lib/meilisearch/data"
env = "production"
http_addr = "localhost:7700"
master_key = "MASTERKEY"
no_analytics = true
http_payload_size_limit = "100 MB"
log_level = "INFO"
# max_indexing_memory = "2 GiB"
# max_indexing_threads = 4

#############
### DUMPS ###
#############

dump_dir = "/var/lib/meilisearch/dumps"
# import_dump = "./path/to/my/file.dump"
ignore_missing_dump = false
ignore_dump_if_db_exists = false

#################
### SNAPSHOTS ###
#################

schedule_snapshot = false
snapshot_dir = "/var/lib/meilisearch/snapshots"
# import_snapshot = "./path/to/my/snapshot"
ignore_missing_snapshot = false
ignore_snapshot_if_db_exists = false

###########
### SSL ###
###########

# ssl_auth_path = "./path/to/root"
# ssl_cert_path = "./path/to/certfile"
# ssl_key_path = "./path/to/private-key"
# ssl_ocsp_path = "./path/to/ocsp-file"
ssl_require_auth = false
ssl_resumption = false
ssl_tickets = false
```

## Set permissions

```bash
sudo mkdir /var/lib/meilisearch/data /var/lib/meilisearch/dumps /var/lib/meilisearch/snapshots
sudo chown -R meilisearch:meilisearch /var/lib/meilisearch
sudo chmod 750 /var/lib/meilisearch
```

## Create service

You can create a service locally but it's often on production server.

Create service

```bash
sudo vim /etc/systemd/system/meilisearch.service
```

Add this config to service, here with password `MASTERKEY`

```bash title="/etc/systemd/system/meilisearch.service"
[Unit]
Description=Meilisearch
After=systemd-user-sessions.service

[Service]
Type=simple
WorkingDirectory=/var/lib/meilisearch
ExecStart=/usr/bin/meilisearch --config-file-path /etc/meilisearch.toml --env production --master-key MASTERKEY
User=meilisearch
Group=meilisearch

[Install]
WantedBy=multi-user.target
```

Enable it

```bash
sudo systemctl enable meilisearch
```

```bash
sudo systemctl start meilisearch
```

Check status

```bash
sudo systemctl status meilisearch
```

## Create domain

For Meilisearch you need to have endpoint, so you have to create VHost for it

```nginx title="/etc/nginx/sites-available/meilisearch.example.com.conf"
server {
    listen 80;
    listen [::]:80;
    server_name meilisearch.example.com;

    location / {
        proxy_pass  http://127.0.0.1:7700;
    }

    access_log /var/log/nginx/meilisearch.access.log;
    error_log /var/log/nginx/meilisearch.error.log;
}
```

Execute `certbot` to add HTTPS and your endpoint is available on [http://meilisearch.example.com](http://meilisearch.example.com).
