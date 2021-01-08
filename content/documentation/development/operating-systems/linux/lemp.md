---
title: "LEMP: NGINX"
description: 'How to install NGINX on Ubuntu'
position: 4
category: 'Linux'
---

- [Digital Ocean: LEMP - Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-ubuntu-18-04)
- [Digital Ocean: LEMP - Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-ubuntu-20-04)
- [**LEMP - Ubuntu 20.04**](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)

<alert type="info">
When I offer to create new user, I call it `jack`, you can use any other username.
</alert>

## 1. NGINX & firewall

<alert type="warning">

If you don't allow NGINX on firewall, your domain cannot be loaded.

</alert>

```bash
sudo apt update ; sudo apt install -y nginx ; sudo ufw allow 'Nginx HTTP' ; sudo ufw allow 'Nginx HTTPS' ; sudo ufw allow 'Nginx Full'
```

## 2. MySQL

Install MySQL

```bash
sudo apt install -y mysql-server ; sudo mysql_secure_installation
```

<alert type="info"> About installation

- Choose password level, I advice `LOW` to avoid problems with password.
- Define password
- Select `Yes` for all questions after this.
</alert>

Connect to MySQL CLI

```bash
sudo mysql -u root -p
```

Redefine `validate_password.policy` if necessary and `root` password if necessary

```mysql[mysql]
SET GLOBAL validate_password.policy=LOW;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'super_secret_password';
FLUSH PRIVILEGES;
```

It's not a good idea to have one user to manage all databases, `root` user is useful to create database and users but only with MySQL CLI and not with phpMyAdmin because phpMyAdmin have online access. It's a good idea to create ONE user BY database and give rights about this database only to this NEW user (and `root` of course). And, the most important, in your application, give new user for credentials. With this solution, your credentials can only manage ONE database, it's more secure if someone find credentials.

Here, it's an example of this solution, `my_project_database` and `my_project_user` can be same.

```mysql[mysql]
CREATE DATABASE my_project_database;
CREATE USER 'my_project_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'secret_password';
GRANT ALL ON my_project_database.* TO 'my_project_user'@'localhost';
```

<alert type="danger"> Bad practice

```bash
CREATE USER 'my_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'my_user'@'localhost' WITH GRANT OPTION;
exit
```

</alert>

### Disable `root` for phpMyAdmin

Open phpMyAdmin config

```bash
sudo vim /etc/phpmyadmin/config.inc.php
```

Find `$cfg['Servers'][$i]['auth_type'] = 'cookie';` line and add this line `$cfg['Servers'][$i]['AllowRoot'] = FALSE;`

```php[/etc/phpmyadmin/config.inc.php]
if (!empty($dbname)) {
  /* Authentication type */
  $cfg['Servers'][$i]['auth_type'] = 'cookie';
  $cfg['Servers'][$i]['AllowRoot'] = FALSE; // add this line
  // ...
}
```

Now `root` user is forbidden with phpMyadmin but allowed with MySQL CLI.

## 3. PHP

This will install LTS version of PHP, if you want to upgrade it, check [**this guide**](/guides/linux/php/setup/)

```bash
sudo apt install -y php-fpm php-mysql
```

### 3. a. PHP 8.0+

From [**linuxize.com**](https://linuxize.com/post/how-to-install-php-8-on-ubuntu-20-04)

Install PPA for PHP

```bash
sudo apt install software-properties-common ; sudo add-apt-repository ppa:ondrej/php
```

Press <kbd>Enter</kbd> to add repository to APT source list.

Install PHP 8.0 FPM for NGINX.

```bash
sudo apt update ; sudo apt -y install php8.0-fpm
```

Check PHP 8.0 status.

```bash
systemctl status php8.0-fpm
```

Install extension for PHP 8.0

```bash
sudo apt install -y php8.0-mbstring php8.0-mysql php8.0-common php8.0-mysql php8.0-xml php8.0-curl php8.0-gd php8.0-imagick php8.0-cli php8.0-dev php8.0-imap php8.0-mbstring php8.0-opcache php8.0-soap php8.0-zip php8.0-intl
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
sudo chown -R $USER:www-data /var/www ; sudo mkdir /var/www/my-domain ; sudo touch /var/www/my-domain/index.php ; sudo vim /var/www/my-domain/index.php
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
sudo ln -s /etc/nginx/sites-available/my-domain.localhost /etc/nginx/sites-enabled ; sudo nginx -t ; sudo service nginx reload
```

And now, you can access to you domain to [**http://my-domain.localhost**](http://my-domain.localhost)

**Next step: [install and configure phpMyAdmin](/guides/linux/phpmyadmin)**
