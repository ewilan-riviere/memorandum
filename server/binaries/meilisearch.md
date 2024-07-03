---
title: Meilisearch
description: MeiliSearch is a powerful, fast, open-source, easy to use and deploy search engine. Both searching and indexing are highly customizable. Features such as typo-tolerance, filters, and synonyms are provided out-of-the-box.
---

# Meilisearch

{{ $frontmatter.description }}

Here, the installation wil use GNU/Linux but it can be deploy on macOS too. For Windows, Windows Subsytem for Linux or Docker are some solutions.

- [**meilisearch.com**](https://www.meilisearch.com/)
- [**github.com/meilisearch/meilisearch**](https://github.com/meilisearch/meilisearch)
- [**installation guide**](https://www.meilisearch.com/docs/learn/getting_started/installation)

## Installation

- On Debian-based systems, use `curl` to install Meilisearch, then move the binary to `/usr/local/bin/` to use it globally.
- On macOS, use `brew` to install Meilisearch.

::: code-group

```sh [Debian]
sudo apt install curl -y
curl -L https://install.meilisearch.com | sh
sudo mv ./meilisearch /usr/local/bin/
```

```sh [macOS]
brew update && brew install meilisearch
```

```sh [Windows]
docker pull getmeili/meilisearch:latest
docker run -it --rm \
    -p 7700:7700 \
    -e MEILI_ENV='development' \
    -v $(pwd)/meili_data:/meili_data \
    getmeili/meilisearch:latest
```

:::

### Update

- With `curl`, just override existing binaries
- With `homebrew`, just update
- With Docker, just pull the new image

You will have to delete `data.ms` in meilisearch directory to update the database.

## Production

Two ways to deploy Meilisearch in production:

- As a [Docker container](#docker)
- As a [service](#service)

### Docker

You can use the official Docker image to deploy Meilisearch.

Create a `.env` file with the following content.

```sh
# https://www.meilisearch.com/docs/learn/configuration/instance_options#environment
# production, development
MEILI_ENV=production
# https://www.meilisearch.com/docs/learn/configuration/instance_options#master-key
# openssl rand -hex 16
MEILI_MASTER_KEY=MASTER_KEY
APP_PORT=7700 # change port if needed
```

Replace `MASTER_KEY` with a 16-byte string, you can generate one with `openssl`.

```sh
openssl rand -hex 16
```

Create a `docker-compose.yml` file with the following content.

```yml
services:
  meilisearch:
    container_name: meilisearch
    image: getmeili/meilisearch:latest
    ports:
      - "${APP_PORT}:7700"
    env_file: .env
    restart: always
volumes:
  meilisearch_data:
```

You can define a different port in the `.env` with `APP_PORT` variable.

::: info
You can find a repository with all this configuration on [kiwilan/meilisearch-docker](https://gitlab.com/kiwilan/meilisearch-docker).
:::

Now you can create an [NGINX VHost for Meilisearch](#nginx-meilisearch).

### Service

How to setup Meilisearch into production on Debian server.

- [docs.meilisearch.com](https://www.meilisearch.com/docs/guides/deployment/running_production)

::: info Requirements
You have download the binary and move it to `/usr/local/bin/`, see [installation](#installation).
:::

#### Create user

Create a user for Meilisearch.

```sh
sudo useradd -d /var/lib/meilisearch -s /bin/false -m -r meilisearch
```

#### Create configuration

Create directories for data, dumps and snapshots.

```sh
sudo mkdir /var/lib/meilisearch/data /var/lib/meilisearch/dumps /var/lib/meilisearch/snapshots
sudo chown -R meilisearch:meilisearch /var/lib/meilisearch
sudo chmod 750 /var/lib/meilisearch
```

Create configuration file.

```sh
sudo curl https://raw.githubusercontent.com/meilisearch/meilisearch/latest/config.toml > /etc/meilisearch.toml
```

Finally, update the following lines in the `/etc/meilisearch.toml` file so Meilisearch uses the directories you created earlier to store its data:

```sh
sudo vim /etc/meilisearch.toml
```

Replacing `MASTER_KEY` with a 16-byte string, you can generate one with `openssl`.

```sh
openssl rand -hex 16
```

```toml:/etc/meilisearch.toml
db_path = "/var/lib/meilisearch/data"
env = "production"
http_addr = "localhost:7700" # we will create a domain for it
master_key = "MASTER_KEY"
# ...
dump_dir = "/var/lib/meilisearch/dumps"
# ...
snapshot_dir = "/var/lib/meilisearch/snapshots"
```

#### Create service

Create a service file for Meilisearch.

```sh
cat << EOF > /etc/systemd/system/meilisearch.service
[Unit]
Description=Meilisearch
After=systemd-user-sessions.service

[Service]
Type=simple
WorkingDirectory=/var/lib/meilisearch
ExecStart=/usr/local/bin/meilisearch --config-file-path /etc/meilisearch.toml
User=meilisearch
Group=meilisearch

[Install]
WantedBy=multi-user.target
EOF
```

Enable and start the service.

```sh
sudo systemctl enable meilisearch
sudo systemctl start meilisearch
```

Check the status of the service.

```sh
sudo systemctl status meilisearch
```

You have to see `Active: active (running)`. Now you can create an [NGINX VHost for Meilisearch](#nginx-meilisearch).

#### Update Meilisearch

To update Meilisearch, you can create a script to remove the data, dumps and snapshots directories and recreate them.

Stop the service.

```sh
sudo service meilisearch stop
```

Download new binaries.

```sh
mkdir -p ~/sandbox
cd ~/sandbox
curl -L https://install.meilisearch.com | sh
sudo mv ./meilisearch /usr/local/bin/
sudo chown meilisearch:meilisearch /usr/local/bin/meilisearch
sudo chmod +x /usr/local/bin/meilisearch
```

Create a script to update Meilisearch.

```sh
sudo vim /var/lib/meilisearch/update
```

```sh:/var/lib/meilisearch/update
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

Make it executable.

```sh
sudo chmod +x /var/lib/meilisearch/update
```

Execute the script.

```sh
/var/lib/meilisearch/update
```

Start the service.

```sh
sudo service meilisearch start
```

Check the status.

```sh
sudo service meilisearch status
```

### NGINX & Meilisearch

::: info NGINX
You can use NGINX as a reverse proxy for Meilisearch. You have to install it and create a VHost for it, check [this guide](/server/web-server/nginx)
:::

For Meilisearch you need to have endpoint, so you have to create VHost for it.

```sh
sudo vim /etc/nginx/conf.d/domain.com.conf
```

```nginx:/etc/nginx/conf.d/domain.com.conf
server {
  listen 80;
  listen [::]:80;
  http2 on;
  server_name domain.com;

  access_log /var/log/nginx/meilisearch.access.log;
  error_log /var/log/nginx/meilisearch.error.log;

  location / {
    proxy_pass http://127.0.0.1:7700; # change port if needed
  }
}
```

You can now enable HTTPS with `certbot`, check [this guide](/server/web-server/ssl-certbot). After that, restart NGINX.

```sh
sudo service nginx reload
```
