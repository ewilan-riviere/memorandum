# 🚂 LEMP: Nginx, MySQL, PHP

[Digital Ocean: LEMP](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-ubuntu-18-04)

[[toc]]

## 1. NGINX & firewall

```bash
sudo apt update
sudo apt install -y nginx

sudo ufw allow 'Nginx HTTP'
```

## 2. MySQL

```bash
sudo apt install -y mysql-server
sudo mysql_secure_installation
```

:::tip
Choose password level:
- If you setup server, select **STRONG level**
- If you setup just local desktop, select **LOW level**

And define password, select `Yes` for all questions after this.
:::

```bash
sudo mysql
```

:::tip
If you have set password, you can use:  
`mysql -u root -p`
:::

Now redefine `root` `password` (change it, if you want strong password) and create new `user` (choose a custom username if you want).

```sql {3,4}
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' WITH GRANT OPTION;
exit
```

## 3. PHP

When Apache use standard PHP version, NGINX use FPM version.

```bash
sudo apt install -y php-fpm php-mysql
```

::: tip
If not work, add this repository:  
`sudo add-apt-repository universe`
:::

It's will install latest **stable** version of PHP-fpm, so you will maybe need a better version. You can upgrade PHP version now and you will be able to switch between different versions.

### 3. a. Upgrade PHP

You can check PHP version with `php -v`, if you want to upgrade this version follow next steps. You have to add new source for `apt`

```bash
sudo add-apt-repository -y ppa:ondrej/php && sudo apt update
```

Now you can download new PHP version

```bash
sudo apt install php7.3-fpm
```

This will automatically update PHP CLI version, it's this version that you use when you execute `php` command into your terminal. You can check it with `php -v`. But yours VHosts can always use old version of PHP, you will have to update NGINX conf for each VHost if you want to change their version of PHP (it's optional). You can keep VHost with old version of PHP, if you let this version on your system, it's useful to update version if you use modern syntax in your PHP app, for example type of parameters is available with latests PHP versions.

:::warning
Following steps talks about VHost, if you don't know how it's works, read [*4. Virtual Host*](/guides/linux/lemp/#_4-virtual-host) before.
:::

If you want to update a VHost NGINX conf, check it in `/etc/nginx/sites-available/` and edit it, like:

```bash
sudo vim my-domain
```

You will have some infos but search this line

```nginx {5}
server {
  # ...
  location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
  }
  #...
}
```

In this example, this VHost use PHP 7.2 version but if you installed PHP 7.4, you can update it

```nginx {5}
server {
  # ...
  location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
  }
  #...
}
```

And your app will use new PHP version.

:::warning
If you change PHP version, it can be missing some extensions, if your app display an error about extension check this part : [*missing extension*](/guides/linux/phpmyadmin/#missing-extension)
:::

### 3. b. Switch between PHP versions

*Source: [**stackexchange.com/how-to-switch-between-php-versions-on-ubuntu-nginx**](https://magento.stackexchange.com/questions/272815/how-to-switch-between-php-versions-on-ubuntu-nginx)*

If you want to switch PHP CLI version, follow these steps

:::tip
If you just want to use another PHP version pour a Virtual host, like a old Drupal app, just change PHP version in NGINX conf.
:::

```bash
sudo update-alternatives --config php
```

You will have a menu to choose PHP CLI version

```bash
  Selection    Path             Priority   Status
------------------------------------------------------------
* 0            /usr/bin/php7.4   74        auto mode
  1            /usr/bin/php7.2   72        manual mode
  2            /usr/bin/php7.3   73        manual mode
  3            /usr/bin/php7.4   74        manual mode
```

After change PHP version restart NGINX and restart PHP version you choose

```bash
sudo service nginx restart
# example if you choose php7.2
sudo service php7.2-fpm restart
```

### 3. c. Allow big files uploading

NGINX default conf allow 2 Mo files max in upload, if you want to change it follow these steps

- For NGINX

```bash
sudo vim /etc/nginx/nginx.conf
```

Change or add this line

```nginx {3}
http {
  # ...
  client_max_body_size 500M;
}
```

- For PHP

Check PHP version used by your application, `php -v` give you just PHP CLI version, if don't setup VHost, it's PHP version of your app but if you have a VHost you have to check PHP version of conf. And update current `php.ini`

```bash
# for example if current version is 7.4
sudo vim /etc/php/7.4/fpm/php.ini
```

Search and change these lines

```ini
post_max_size = 500M
# ...
upload_max_filesize = 500M
```

Restart NGINX and PHP

```bash
sudo service nginx restart
sudo service php7.4-fpm restart
```

You can check with `phpinfo()`, if you don't setup it, check it here: [*Change phpMyAdmin PHP version*](/guides/linux/phpmyadmin/#_4-change-phpmyadmin-php-version)

---

## 4. Virtual Host

NGINX is setup but now, we have to setup Virtual hosts (or VHost). We take a basic example with just PHP 7.2 and an `index.php`, but it's same concept for any PHP app like Laravel or Symfony.

Create NGINX conf for this app

```bash
sudo vim /etc/nginx/sites-available/my-domain
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
sudo chown -R $USER:www-data /var/www
sudo mkdir /var/www/my-domain && sudo touch /var/www/my-domain/index.php
sudo vim /var/www/my-domain/index.php
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
sudo ln -s /etc/nginx/sites-available/my-domain /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

And now, you can access to you domain to [**http://my-domain.localhost**](http://my-domain.localhost)

**Next step: [install and configure phpMyAdmin](/guides/linux/phpmyadmin)**
