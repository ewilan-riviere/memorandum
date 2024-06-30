---
title: Production
description: How to setup Meilisearch into production
---

# Production

Here an example of how to setup Meilisearch into production on Debian server.

- [docs.meilisearch.com](https://docs.meilisearch.com/learn/cookbooks/running_production.html)

## Install Meilisearch

Install Meilisearch with `curl`

```sh
curl -L https://install.meilisearch.com | sh
```

Launch Meilisearch

```sh
./meilisearch
```

Move it to `/usr/bin`

```sh
sudo mv ./meilisearch /usr/bin/meilisearch
```

Set permissions

```sh
sudo chown root:root /usr/bin/meilisearch
sudo chmod +x /usr/bin/meilisearch
```

## Create Meilisearch user

```sh
sudo useradd -d /var/lib/meilisearch -b /bin/false -m -r meilisearch
```

Add current user to `meilisearch` group

```sh
sudo usermod -a -G meilisearch $USER
```

## Create configuration

Create configuration file

```sh
curl https://raw.githubusercontent.com/meilisearch/meilisearch/latest/config.toml > ~/meilisearch.toml
```

Move it to `/etc/meilisearch.toml`

```sh
sudo mv ~/meilisearch.toml /etc/meilisearch.toml
```

Edit it

```sh
sudo vim /etc/meilisearch.toml
```

You can generate a 16 bytes key with `openssl` for `YOUR_MASTER_KEY_VALUE`

```sh
openssl rand -hex 16
```

Replace `YOUR_MASTER_KEY_VALUE` with your key

```toml title="/etc/meilisearch.toml"
# This file shows configuration of Meilisearch.
# All variables are defined here: https://www.meilisearch.com/docs/learn/configuration/instance_options#environment-variables

db_path = "/var/lib/meilisearch/data" # default "./data.ms"
env = "production" # default "development"
http_addr = "localhost:7700"
master_key = "YOUR_MASTER_KEY_VALUE"
no_analytics = true # default false
http_payload_size_limit = "100 MB"
log_level = "INFO"
# max_indexing_memory = "2 GiB"
# max_indexing_threads = 4

#############
### DUMPS ###
#############

dump_dir = "/var/lib/meilisearch/dumps" # default "dumps/"
# import_dump = "./path/to/my/file.dump"
ignore_missing_dump = false
ignore_dump_if_db_exists = false

#################
### SNAPSHOTS ###
#################

schedule_snapshot = false
snapshot_dir = "/var/lib/meilisearch/snapshots" # default "snapshots/"
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

#############################
### Experimental features ###
#############################

experimental_enable_metrics = false
experimental_reduce_indexing_memory_usage = false
```

## Set permissions

```sh
sudo mkdir /var/lib/meilisearch/data /var/lib/meilisearch/dumps /var/lib/meilisearch/snapshots
sudo chown -R meilisearch:meilisearch /var/lib/meilisearch
sudo chmod 755 /var/lib/meilisearch
```

## Create service

You can create a service locally but it's often on production server.

Create service

```sh
sudo vim /etc/systemd/system/meilisearch.service
```

Add this config to service, here with password `YOUR_MASTER_KEY_VALUE`

```sh title="/etc/systemd/system/meilisearch.service"
[Unit]
Description=Meilisearch
After=systemd-user-sessions.service

[Service]
Type=simple
WorkingDirectory=/var/lib/meilisearch
ExecStart=/usr/bin/meilisearch --config-file-path /etc/meilisearch.toml --env production --master-key YOUR_MASTER_KEY_VALUE
User=meilisearch
Group=meilisearch

[Install]
WantedBy=multi-user.target
```

Enable it

```sh
sudo systemctl enable meilisearch
```

```sh
sudo systemctl start meilisearch
```

Check status

```sh
sudo systemctl status meilisearch
```

## Create domain

For Meilisearch you need to have endpoint, so you have to create VHost for it

```sh
sudo vim /etc/nginx/sites-available/meilisearch.example.com.conf
```

```nginx [/etc/nginx/sites-available/meilisearch.example.com.conf]
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

## Update Meilisearch

```sh
sudo service meilisearch stop
```

```sh
mkdir -p ~/sandbox
cd ~/sandbox
curl -L https://install.meilisearch.com | sh
sudo mv ./meilisearch /usr/bin/
sudo chown root:root /usr/bin/meilisearch
sudo chmod +x /usr/bin/meilisearch
```

```sh
sudo vim /var/lib/meilisearch/update.sh
```

```sh title="/var/lib/meilisearch/update.sh"
#!/bin/bash

sudo rm -rf /var/lib/meilisearch/data
sudo rm -rf /var/lib/meilisearch/dumps
sudo rm -rf /var/lib/meilisearch/snapshots

sudo mkdir -p /var/lib/meilisearch/data
sudo mkdir -p /var/lib/meilisearch/dumps
sudo mkdir -p /var/lib/meilisearch/snapshots

sudo chown -R meilisearch:meilisearch /var/lib/meilisearch
sudo chmod -R 755 /var/lib/meilisearch
```

```sh
sudo chmod +x /var/lib/meilisearch/update.sh
```

```sh
/var/lib/meilisearch/update.sh
```

```sh
sudo service meilisearch start
```

```sh
sudo service meilisearch status
```
