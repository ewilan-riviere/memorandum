---
title: Meilisearch
description: 'How to setup Meilisearch'
position: 1
---

>MeiliSearch is a powerful, fast, open-source, easy to use and deploy search engine. Both searching and indexing are highly customizable. Features such as typo-tolerance, filters, and synonyms are provided out-of-the-box.

Here, the installation wil use GNU/Linux but it can be deploy on macOS too. For Windows, Windows Subsytem for Linux is a excellent solution.

- [**website**](https://www.meilisearch.com/)
- [**github**](https://github.com/meilisearch/MeiliSearch)

## Setup

- [**Installation**](https://docs.meilisearch.com/learn/getting_started/installation.html#download-and-launch)

The simple way to setup Meilisearch is `curl`

```bash
curl -L https://install.meilisearch.com | sh
```

Now you can launch Meilisearch

```bash
./meilisearch
```

But the best solution is to add to binaries

```bash
sudo mv ./meilisearch /usr/bin/
```

Now you can launch it

```bash
meilisearch
```

## Create service

You can create a service locally but it's often on production server.

Create service

```bash
sudo vim /etc/systemd/system/meilisearch.service
```

Add this config to service

```bash[/etc/systemd/system/meilisearch.service]
[Unit]
Description=MeiliSearch
After=systemd-user-sessions.service

[Service]
Type=simple
ExecStart=/usr/bin/meilisearch --http-addr 127.0.0.1:7700 --env production --master-key Y0urVery-S3cureAp1K3y

[Install]
WantedBy=default.target
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

### Add domain

For Meilisearch you need to have endpoint, so you have to create VHost for it

```nginx[/etc/nginx/sites-available/meilisearch.example.com.conf]
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

Execute `certbot` to add HTTPS and your endpoint is available on <http://meilisearch.example.com>.
