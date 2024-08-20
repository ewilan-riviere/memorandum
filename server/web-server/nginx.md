---
title: NGINX
description: NGINX is a web server that can also be used as a reverse proxy, load balancer, mail proxy, and HTTP cache.
---

# NGINX

{{ $frontmatter.description }}

- Official: <http://nginx.org/>

## Installation

::: tip
This guide is for Debian 10/11, if you have another distribution, you can see the official documentation.
:::

### From source v1.26.0

::: info
This method is recommended to have the latest version of NGINX, you will have access to the latest features like new syntax for `http2`.
:::

From <http://nginx.org/en/linux_packages.html>

::: code-group

```sh [Debian]
sudo apt install -y curl gnupg2 ca-certificates lsb-release debian-archive-keyring
```

```sh [Ubuntu]
sudo apt install -y curl gnupg2 ca-certificates lsb-release ubuntu-keyring
```

:::

Import an official nginx signing key so apt could verify the packages authenticity.

```sh
curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor \
  | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
```

Verify that the downloaded file contains the proper key.

```sh
gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
```

To set up the apt repository. Here, you can find **Stable**, doesn’t include all of the latest features, but has critical bug fixes that are always backported to the mainline version. We recommend the stable version for production servers.

::: code-group

```sh [Debian]
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
http://nginx.org/packages/debian `lsb_release -cs` nginx" \
  | sudo tee /etc/apt/sources.list.d/nginx.list
```

```sh [Ubuntu]
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
http://nginx.org/packages/mainline/ubuntu `lsb_release -cs` nginx" \
  | sudo tee /etc/apt/sources.list.d/nginx.list
```

:::

You can find [**Mainline** here](http://nginx.org/en/linux_packages.html#Ubuntu), includes the latest features and bug fixes and is always up to date. It is reliable, but it may include some experimental modules, and it may also have some number of new bugs.

Set up repository pinning to prefer our packages over distribution-provided ones

```sh
echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" \
  | sudo tee /etc/apt/preferences.d/99nginx
```

Now, NGINX repository replace default APT `nginx` package, so you can install NGINX

```sh
sudo apt update -y
sudo apt install -y nginx
```

- The default user of NGINX with this method is `nginx`
- The configuration files are in `/etc/nginx/`
- The logs are in `/var/log/nginx/`
- The default web root is `/usr/share/nginx/html/`
- Web server configuration is in `/etc/nginx/conf.d/`

### From SourcesList v1.22.4 (deprecated)

::: warning
This method will install an old version of NGINX, you should use the official repository.
:::

Install standard version

```sh
sudo apt update -y
sudo apt install -y nginx
```

- The default user of NGINX with this method is `www-data`
- The configuration files are in `/etc/nginx/`
- The logs are in `/var/log/nginx/`
- The default web root is `/var/www/html/`
- Web server configuration is in `/etc/nginx/sites-available/` and `/etc/nginx/sites-enabled/`

## Configuration

### `nginx.conf`

The main configuration file is `/etc/nginx/nginx.conf`, but you can include other files in this file.

```nginx [/etc/nginx/nginx.conf]
user  nginx; # this is the default user, can be www-data too

# ...

http {
  # ...
  include /etc/nginx/conf.d/*.conf; # include all files in this directory
}
```

Examples of configuration files.

::: details Example of 1.26.0

```nginx [/etc/nginx/conf.d/nginx-1.26.0.conf]
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

:::

::: details Example of 1.22.4

```nginx [/etc/nginx/conf.d/nginx-1.22.4.conf]
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

:::

### Permissions

You can add NGINX user to current user group for permissions

- For default repository: `www-data`
- For official repository: `nginx`

::: info
To know NGINX user, you can see the configuration file `/etc/nginx/nginx.conf` and search for `user` directive.

```nginx [/etc/nginx/nginx.conf]
user  nginx; # this is the default user, can be www-data too
```

:::

```sh
sudo usermod -a -G $USER nginx # or www-data
```

Create `/var/www` directory if it doesn't exist

```sh
sudo mkdir /var/www
```

Change the owner of `/var/www` directory

::: warning
If you use the default repository, you need to change the owner to `www-data`.
:::

```sh
sudo chown -R $USER:nginx /var/www
sudo chmod -R 755 /var/www
```

### Big files uploading

NGINX default conf allow 2 Mo files max in upload, you can change this value in `/etc/nginx/nginx.conf`

```nginx{3}:/etc/nginx/nginx.conf
http {
  # ...
  client_max_body_size 100M; # 100 Mo, you can change this value
}
```

::: info Interacts with PHP
PHP has also a limit for file upload, you can change this value in `/etc/php/8.2/fpm/php.ini`

You can find your `php.ini` path with this command: `php -i | grep "php.ini"

```ini:/etc/php/8.2/fpm/php.ini
post_max_size = 100M
upload_max_filesize = 100M
```

Don't forget to restart PHP service after changing the configuration.

```sh
sudo service php8.2-fpm restart
```

:::

You can now restart NGINX

```sh
sudo service nginx reload
```

### Firewall

::: info
If you don't have a firewall, you can skip this step or install firewall with [this guide](/server/administration/server-basics#firewall).
:::

Allow NGINX in firewall

```sh
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 'Nginx HTTPS'
sudo ufw allow 'Nginx Full'
```

See firewall rules

```sh
sudo ufw status
```

You will see something like this

```sh
Status: active

To                         Action      From
--                         ------      ----
80                         ALLOW       Anywhere
443                        ALLOW       Anywhere
80 (v6)                    ALLOW       Anywhere (v6)
443 (v6)                   ALLOW       Anywhere (v6)
```

Ports 80 and 443 are open.

::: warning
You can only open 443 if you have an SSL certificate, but if your certificate is not valid, website will not work, port 80 is used as a fallback.
:::

## Manage websites

To know how to manage websites, you can see the [NGINX usage](/server/web-server/nginx-usage).

## Cheatsheet

### Version

```sh
sudo nginx -V
```

You will see something like this a version like `nginx/1.22.4` for default repository or `nginx/1.26.0` for the official repository.

### Restart service

When you change the configuration, you need to restart the service.

```sh
sudo service nginx reload
```

### Update service

To update NGINX, you can use this command

```sh
sudo apt update
sudo apt upgrade -y nginx
```

### List all domains

To see all domains in NGINX, you can use this command

```sh
sudo nginx -T | grep "server_name "
```

### Authentification

Install package:

::: code-group

```sh [Debian]
sudo apt install apache2-utils -y
```

```ts [CentOS]
sudo yum install httpd-tools
```

:::

Create a new user:

```sh
sudo htpasswd -c /etc/apache2/.htpasswd my-website-admin
```

You can add more users or update the password:

```sh:/etc/apache2/.htpasswd
my-website-admin:my-secret-password
```

Add the following to the location block in the nginx config:

```nginx:my-domain.com.conf
server {
  auth_basic "Administrator’s Area";
  auth_basic_user_file /etc/apache2/.htpasswd;

  # ...
}
```

And reload NGINX:

```sh
sudo nginx -t
sudo service nginx reload
```

You can only protect a part of the website:

```nginx:my-domain.com.conf
server {
  location /admin {
    auth_basic "Administrator’s Area";
    auth_basic_user_file /etc/apache2/.htpasswd;

    # ...
  }
}
```

### Block crawlers

Add the following to the server block in the nginx config:

```nginx:my-domain.com.conf
server {
  add_header X-Robots-Tag "noindex, nofollow, nosnippet, noarchive, noimageindex, noodp, notranslate, noyaca, noydir";
}
```
