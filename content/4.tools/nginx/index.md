---
title: NGINX
description: How to use NGINX
---

# NGINX

- Official: <http://nginx.org/>

## Install latest

### Debian

From <http://nginx.org/en/linux_packages.html#Debian>

```bash
sudo apt install curl gnupg2 ca-certificates lsb-release debian-archive-keyring
```

Import an official nginx signing key so apt could verify the packages authenticity.

```bash
curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor \
| sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
```

Verify that the downloaded file contains the proper key.

```bash
gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
```

To set up the apt repository.

::code-group
  ```bash [Stable]
  echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
  http://nginx.org/packages/debian `lsb_release -cs` nginx" \
    | sudo tee /etc/apt/sources.list.d/nginx.list
  ```
  ```bash [Mainline]
  echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
  http://nginx.org/packages/mainline/debian `lsb_release -cs` nginx" \
    | sudo tee /etc/apt/sources.list.d/nginx.list
  ```
::

Set up repository pinning to prefer our packages over distribution-provided ones

```bash
echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" \
| sudo tee /etc/apt/preferences.d/99nginx
```

Install NGINX

```bash
sudo apt update
sudo apt install nginx
```

Check config

```bash
sudo nginx -T | grep "server_name "
```

If you see yours domains, then all is ok. If not, then you need to check your config.

```nginx [/etc/nginx/nginx.conf]
user www-data;
worker_processes auto;

error_log /var/log/nginx/error.log notice;
pid /var/run/nginx.pid;

events {
  worker_connections 1024;
}

http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  log_format main '$remote_addr - $remote_user [$time_local] "$request" '
  '$status $body_bytes_sent "$http_referer" '
  '"$http_user_agent" "$http_x_forwarded_for"';

  access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;

  sendfile on;
  #tcp_nopush     on;

  keepalive_timeout 65;

  gzip  on;

  gzip_vary on;
	gzip_proxied any;
	gzip_comp_level 6;
	gzip_buffers 16 8k;
	gzip_http_version 1.1;
	gzip_min_length 256;
	gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript application/vnd.ms-fontobject application/x-font-ttf font/opentype image/svg+xml image/x-icon;

  include /etc/nginx/conf.d/*.conf;
  include /etc/nginx/sites-enabled/*;
}
```

And restart NGINX

```bash
sudo service nginx restart
```

::alert{type="warning"}
Your old `/etc/nginx/site-available/default.conf` could be override by new `/etc/nginx/conf.d/default.conf`.
::
