---
title: SSL & Certbot
---

# SSL with Certbot

- [**Guide from digitalocean.com**](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-debian-10): install Certbot without snap

Today, it's really important to have HTTPS website, it's a trust mark, and it's now really easy to obtain it thanksful to [Let's Encrypt](https://letsencrypt.org/) which provides TLS certificate freely. You have some other projects like [SSL For Free](https://www.sslforfree.com/).
With Shell access, you can use [Certbot](https://certbot.eff.org/) to install Certbot on your server to create and renew certificates. Just follow [steps](https://certbot.eff.org/instructions), enter software and sytem and you will obtain some commands to install this amazing tool.

You have to select websites and you will can choose if you want an automatic redirection to HTTPS (it's a good idea). If you add any website after this, just execute command again. Certificates have a lifetime, you have to renew it after some weeks with just same command.
Certbot will update NGINX configuration for all selected websites, it will add HTTPS management, careful if you modify it after. But if you broke HTTPS config, remove all which Certbot add and re execute certbot command.

You can install **snap** or use **Python** (personaly I dislike snap, so I install with Python).

## Optional: install `snap` on Debian

```bash
sudo apt update
sudo apt install snapd
sudo snap install core
```

## Install certbot

::code-group

```bash [snap]
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

```bash [python]
sudo apt install python3-acme python3-certbot python3-mock python3-openssl python3-pkg-resources python3-pyparsing python3-zope.interface
sudo apt install python3-certbot-nginx
sudo ufw status
```

::

## Execute `certbot`

```bash
sudo certbot --nginx
```

## Automatic renewal

```bash
sudo crontab -e
```

Add this line

```bash
0 3 * * * /usr/bin/certbot renew --quiet
```

### Clean script

```bash
sudo vim /usr/local/bin/clean
```

```bash
#!/bin/bash

sudo rm -rf /var/log/*.gz
sudo rm -rf /var/log/nginx/*.gz
docker system prune -af
sudo journalctl --vacuum-size=30M
sudo sh -c 'rm -rf /var/lib/snapd/cache/*'
```

```bash
sudo chmod +x /usr/local/bin/clean
```

Add to cron

```bash
sudo crontab -e
```

```bash
0 1 * * * sh /usr/local/bin/clean
```

## Misc

And follow the guide, I advice to choose **Redirect** when `certbot` ask about it, it's more secure.

::alert{type="info"}
If you want to keep `/etc/nginx/sites-available/default`, update `server_name _` to `server_name your-domain.com`. It can generate some errors if you keep original config and `certbot` will skill this config.

```diff[/etc/nginx/sites-available/default]
server {
  listen 80 default_server;

  root /var/www/html;

  index index.html index.htm index.nginx-debian.html;

- server_name _;
+ server_name dev.ewilan-riviere.com;

  # ...
}
```

::

### HTTP/2

- <https://www.tecmint.com/enable-http-2-in-nginx/>
- <https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-with-http-2-support-on-ubuntu-18-04>

```nginx
server {
  listen [::]:80 http2;
  listen 80 http2;
  # ...
}
```

If you use Certbot to enable HTTPS, you have to add manually `htpp2`

```nginx
server {
  listen [::]:443 ssl http2;
  listen 443 ssl http2;
  # ...
}
```

Check if a website use HTTP/2

```bash
curl -I -L https://bookshelves.ink
```

If you use NGINX version 1.22.0 or higher.

```nginx
server {
  listen [::]:80;
  listen 80;

  http2 on;
  # ...
}
```
