---
title: NGINX usage
description: How to use NGINX as a web server, reverse proxy, load balancer, and HTTP cache.
---

# NGINX usage

{{ $frontmatter.description }}

## Add new website

To create a new website, you can create a new configuration file.

The place of configuration files is different between default and official repositories.

- Default repository (1.22.4): `/etc/nginx/sites-available/`
- Official repository (1.26.0): `/etc/nginx/conf.d/`

To know your version, you can use this command:

```sh
sudo nginx -v
```

::: info
With the default repository (1.22.4), you need to create a symbolic link to `sites-enabled` to activate the domain.

```sh
sudo ln -s /etc/nginx/sites-available/my-website /etc/nginx/sites-enabled
```

For the official repository, you don't need to create a symbolic link, just create a new file in `conf.d` directory.
:::

Here we will see how to create a new domain with the official repository.

```sh
sudo vim /etc/nginx/conf.d/my-website.conf
```

```nginx:/etc/nginx/conf.d/my-website.conf
server {
  listen 80;
  server_name my-website.com www.my-website.com;

  location / {
    root /var/www/my-website;
    index index.html;
  }
}
```

Create a new directory for the website

```sh
sudo mkdir /var/www/my-website
sudo chown -R $USER:nginx /var/www/my-website
sudo chmod -R 755 /var/www/my-website
```

Create a new HTML file

```sh
echo "<html><body><h1>Hello World</h1></body></html>" | sudo tee /var/www/my-website/index.html
```

Reload NGINX

```sh
sudo nginx -t
sudo service nginx reload
```

If you have this output, everything is fine, otherwise you will have some infos to fix it:

```sh [output]
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

## SSL and HTTPS

To use SSL, you need to have a certificate. You can use Let's Encrypt to have a free certificate, to install it you have a guide here: [SSL Certbot](/server/web-server/ssl-certbot).

You will have some questions to answer, and after that, you will have a certificate. Certbot will update your configuration files to use HTTPS.

::: details Automatic HTTP to HTTPS

```nginx:/etc/nginx/conf.d/my-website.conf
server {
  # ...
  listen [::]:443 ssl ipv6only=on; # managed by Certbot
  listen 443 ssl; # managed by Certbot
  ssl_certificate /etc/letsencrypt/live/bookshelves.ink/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/bookshelves.ink/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
server {
  if ($host = bookshelves.ink) {
    return 301 https://$host$request_uri;
  } # managed by Certbot

  listen 80;
  listen [::]:80;
  server_name bookshelves.ink;
  return 404; # managed by Certbot
}
```

:::

```sh
sudo nginx -t
sudo service nginx reload
```

If you have an error, you can see the logs in `/var/log/nginx/error.log`.

## Host Node.js application

To host PHP application or HTML files, you can use NGINX, but if you want to host a Node.js application, you can use PM2 to manage your application with NGINX as a reverse proxy.

You can see a guide here: [Node.js with PM2](/server/web-server/nodejs-pm2).

## Remove domain

To remove a domain, you can delete the configuration file with official repository and remove the symbolic link with default repository.

```sh
sudo rm /etc/nginx/conf.d/my-website.conf
```

```sh
sudo nginx -t
sudo service nginx reload
```

## PHP and NGINX

If you want to use PHP with NGINX, you can see the guide here: [PHP with NGINX](/server/binaries/php).

Into a NGINX configuration file, you can use PHP with `php-fpm`.

```nginx{3}:/etc/nginx/conf.d/my-website.conf
location ~ \.php$ {
  include fastcgi_params;
  fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
  fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
  fastcgi_param SCRIPT_NAME $fastcgi_script_name;
}
```

Here, PHP 8.2 is used as an example. You can replace it with the version you want. You can have multiple PHP versions on your server and use it with different websites.

Check if the configuration is correct

```sh
sudo nginx -t
sudo service nginx reload
```

::: warning
If you change PHP version, it can be missing some extensions, if your app display an error about extension check [this guide](/server/binaries/php#install-extensions)
:::
