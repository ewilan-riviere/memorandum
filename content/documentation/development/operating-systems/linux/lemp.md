---
title: "LEMP: NGINX"
description: 'How to install NGINX on Ubuntu'
position: 5
category: 'Linux'
---

[Digital Ocean: LEMP](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-ubuntu-18-04)

:::tip
When I offer to create new user, I call it `ubuntu`, you can use any other username.
:::

## 1. NGINX & firewall

```bash
sudo apt update && sudo apt install -y nginx && sudo ufw allow 'Nginx HTTP'
```

## 2. MySQL

```bash
sudo apt install -y mysql-server && sudo mysql_secure_installation
```

:::tip
Choose password level, I advice `LOW` to avoid problems with password.
And define password, select `Yes` for all questions after this.
:::

```bash
sudo mysql
```

:::tip
If you have set password, you can use:  
`mysql -u root -p`
:::

Now redefine `root` `password` (change it, if you want strong password) and create new `ubuntu` (choose a custom username if you want).

```sql {3,4}
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
CREATE USER 'ubuntu'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'ubuntu'@'localhost' WITH GRANT OPTION;
exit
```

:::tip If any problems

```bash
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
CREATE USER 'ubuntu'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'ubuntu'@'localhost' WITH GRANT OPTION;
exit
```

:::

## 3. PHP

This will install LTS version of PHP, if you want to upgrade it, check [**this guide**](/guides/linux/php/setup/)

```bash
sudo apt install -y php-fpm php-mysql
```

---

## 4. Virtual Host

```bash
sudo usermod -a -G www-data $USER
```

NGINX is setup but now, we have to setup Virtual hosts (or VHost). We take a basic example with just PHP 7.2 and an `index.php`, but it's same concept for any PHP app like Laravel or Symfony.

Create NGINX conf for this app

```bash
sudo vim /etc/nginx/sites-available/my-domain.localhost
```

Insert these infos and save file

```nginx
server {
  listen 80;
  root /var/www/my-domain;
  index index.php index.html index.htm index.nginx-debian.html;
  server_name my-domain.localhost;

  location / {
    try_files $uri $uri/ =404;
  }

  location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
  }

  location ~ /\.ht {
    deny all;
  }
}
```

Setup rights on web server folder `/var/www`, create root folder for the app and `index.php`

```bash
sudo chown -R $USER:www-data /var/www && sudo mkdir /var/www/my-domain && sudo touch /var/www/my-domain/index.php && sudo vim /var/www/my-domain/index.php
```

Fill `index.php` with basic infos

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Domain</title>
</head>
<body>
  <div style="text-align: center; font-weight: bold; font-family: sans-serif; margin: 5rem 0">
    This is my new domain!
    <br/>
    <?php
      echo $_SERVER['SERVER_SOFTWARE'];
    ?>
  </div>
</body>
</html>
```

Make symbolic link with NGINX conf and `sites-enabled` to enable this conf, check NGINX configuration and reload NGINX to refresh web server

```bash
sudo ln -s /etc/nginx/sites-available/my-domain.localhost /etc/nginx/sites-enabled && sudo nginx -t && sudo service nginx reload
```

And now, you can access to you domain to [**http://my-domain.localhost**](http://my-domain.localhost)

**Next step: [install and configure phpMyAdmin](/guides/linux/phpmyadmin)**
