---
title: SSL & Certbot
description: Secure your website with HTTPS
---

# SSL & Certbot

{{ $frontmatter.description }}

- [**Guide from digitalocean.com**](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-debian-10): install Certbot without snap

Today, it's really important to have HTTPS website, it's a trust mark, and it's now really easy to obtain it thanksful to [Let's Encrypt](https://letsencrypt.org/) which provides TLS certificate freely. You have some other projects like [SSL For Free](https://www.sslforfree.com/).
With Shell access, you can use [Certbot](https://certbot.eff.org/) to install Certbot on your server to create and renew certificates. Just follow [steps](https://certbot.eff.org/instructions), enter software and sytem and you will obtain some commands to install this amazing tool.

You have to select websites and you will can choose if you want an automatic redirection to HTTPS (it's a good idea). If you add any website after this, just execute command again. Certificates have a lifetime, you have to renew it after some weeks with just same command.
Certbot will update NGINX configuration for all selected websites, it will add HTTPS management, careful if you modify it after. But if you broke HTTPS config, remove all which Certbot add and re execute certbot command.

You can install **snap** or use **Python** (personaly I dislike snap, so I install with Python).

## Install certbot

::: tip Install `snap` on Debian

```sh
sudo apt update
sudo apt install snapd
sudo snap install core
```

:::

::: code-group

```sh [snap]
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

```sh [python]
sudo apt install python3-acme python3-certbot python3-mock python3-openssl python3-pkg-resources python3-pyparsing python3-zope.interface
sudo apt install python3-certbot-nginx
sudo ufw status
```

:::

## Execute `certbot` for NGINX

```sh
sudo certbot --nginx
```

You will see this message

```sh:output
Saving debug log to /var/log/letsencrypt/letsencrypt.log

Which names would you like to activate HTTPS for?
We recommend selecting either all domains, or all domains in a VirtualHost/server block.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: mywebsite.com
2: www.mywebsite.com
3: mywebsite2.com
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate numbers separated by commas and/or spaces, or leave input
blank to select all options shown (Enter 'c' to cancel):
```

I advice to create certificated one by one if they don't exist yet. After that, you can select all.

## Tips

### Automatic renewal

Certificated have a lifetime, you have to renew it after some weeks. You can add a cron job to renew it automatically.

```sh
sudo crontab -e
```

Add this line to execute it every day at 3am

```sh
0 3 * * * /usr/bin/certbot renew --quiet
```

### Clean script

Create a script to clean logs, docker images, journalctl logs and snap cache.

```sh
sudo vim /usr/local/bin/clean
```

- Remove logs with `rm -rf /var/log/*.gz`
- Remove docker images with `docker system prune -af`
- Remove journalctl logs with `journalctl --vacuum-size=30M`
- Remove snap cache with `rm -rf /var/lib/snapd/cache/*`

```sh
#!/bin/bash

sudo rm -rf /var/log/*.gz
sudo rm -rf /var/log/nginx/*.gz
docker system prune -af
sudo journalctl --vacuum-size=30M
sudo sh -c 'rm -rf /var/lib/snapd/cache/*'
```

Make it executable

```sh
sudo chmod +x /usr/local/bin/clean
```

Add to cron

```sh
sudo crontab -e
```

Add this line to execute it every day at 1am

```sh
0 1 * * * sh /usr/local/bin/clean
```

### HTTP/2

HTTP/2 is a new version of HTTP protocol, it's faster than HTTP/1.1. You can enable it with NGINX.

Some differences exist between v1.22.4 and v1.26.0.

::: code-group

```nginx:website.com.conf [v1.26.0]
server {
  listen [::]:80;
  listen 80;
  http2 on;
}
```

```nginx:website.com.conf [v1.22.4]
server {
  listen [::]:80 http2;
  listen 80 http2;
}
```

:::

Check if a website use HTTP/2

```sh
curl -I -L https://github.com
```

You will see this message

```sh:output
HTTP/2 200
server: GitHub.com
date: Sun, 30 Jun 2024 08:47:20 GMT
content-type: text/html; charset=utf-8
```
