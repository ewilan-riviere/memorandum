# ⛵ phpMyAdmin for NGINX

[Digital Ocean: phpMyAdmin with Apache](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-18-04)
[Digital Ocean: phpMyAdmin with Nginx](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-with-nginx-on-an-ubuntu-18-04-server)

[[toc]]

```bash
mysql -u root -p
```

```sql
UNINSTALL COMPONENT "file://component_validate_password";
exit
```

```bash
sudo apt update
sudo apt install phpmyadmin
```

```bash
mysql -u root -p
```

```sql
INSTALL COMPONENT "file://component_validate_password";
```

::: danger
After installing, you will see dialog with choices about server, don't select anything because it's Nginx.
Just press <kbd>&nbsp;&#8633;&nbsp;</kbd> to select `OK` with <kbd>&nbsp;Enter&nbsp;</kbd>

Select `Yes` for all questions and enter MySQL password you defined.
:::

Link phpMyAdmin from it folder to NGINX folder

```bash
sudo ln -s /usr/share/phpmyadmin /var/www/html/phpmyadmin
```

:::tip Optional
If you want to change phpMyAdmin URL location:

```bash
sudo mv /var/www/html/phpmyadmin /var/www/html/other-location
```

:::

## 1. Configure NGINX

Update NGINX `default` config:

```bash
sudo vim /etc/nginx/sites-available/default
```

Replace content with this config:

- `autoindex on` allow to display phpMyAdmin from `html` folder in `/var/www`
- if you want to use different PHP version for phpMyAdmin, you can change this line `fastcgi_pass unix:/var/run/php/php7.2-fpm.sock`

```nginx
server {
 listen 80 default_server;
 listen [::]:80 default_server;

 root /var/www/html;

 index index.php index.html index.htm index.nginx-debian.html;

 server_name _;

 location / {
  try_files $uri $uri/ =404;
  autoindex on;
 }

 location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
  }
}
```

```bash
sudo service nginx reload
```

And phpMyAdmin is available on [**http://localhost/phpmyadmin**](http://localhost/phpmyadmin) or another URL if you change folder in `html` folder. Now you can fix commons phpMyAdmin errors.

You can connect to phpMyAdmin with MySQL informations, so basically if you follow [**LEMP MySQL**](/guides/linux/lemp/#_2-mysql) steps, you can use `root` as *username* and `password` as *password* if you not setup a high level of security. It's better to use a custom user to connect to phpMyAdmin for security reasons (because `root` have ALL rights and it's better to disable `root` connection).

## 2. Fix phpMyAdmin errors

### 2. a. Configure `blowfish_secret`

```bash
sudo touch /etc/phpmyadmin/conf.d/pma_secure.php
sudo vim /etc/phpmyadmin/conf.d/pma_secure.php
```

```php
<?php

# PhpMyAdmin Settings
# This should be set to a random string of at least 32 chars
$cfg['blowfish_secret'] = '3!#32@3sa(+=_4?),5XP_:U%%8\34sdfSdg43yH#{o';

$i=0;
$i++;

$cfg['Servers'][$i]['auth_type'] = 'cookie';
$cfg['Servers'][$i]['AllowNoPassword'] = false;
$cfg['Servers'][$i]['AllowRoot'] = false;

?>
```

### 2. b. Error on tables

Fix a commin error of phpMyAdmin with this command

```bash
sudo sed -i "s/|\s*\((count(\$analyzed_sql_results\['select_expr'\]\)/| (\1)/g" /usr/share/phpmyadmin/libraries/sql.lib.php
```

## 3. Upgrade phpMyAdmin

It's only optional but if you want to upgrade phpMyAdmin and avoid common errors, it's possible with this commands:

*backup old version, recreate phpmyadmin folder, create tmp directory for phpmyadmin, rights on tmp directory, move to the directory*

```bash
sudo mv /usr/share/phpmyadmin/ /usr/share/phpmyadmin.bak && sudo mkdir /usr/share/phpmyadmin/ && sudo mkdir /usr/share/phpmyadmin/tmp && sudo chown www-data:www-data /usr/share/phpmyadmin/tmp && cd /usr/share/phpmyadmin/
```

An example for **5.0.2** phpMyAdmin version

```bash
sudo wget https://files.phpmyadmin.net/phpMyAdmin/5.0.2/phpMyAdmin-5.0.2-all-languages.tar.gz
```

*extract content of downloded .tar.gz, move files to phpmyadmin directory*

```bash
sudo tar xzf phpMyAdmin-*-all-languages.tar.gz && sudo mv phpMyAdmin-*-all-languages/* /usr/share/phpmyadmin
```

### 3. a. Blowfish secret

Create config file from sample:

```bash
sudo mv /usr/share/phpmyadmin/config.sample.inc.php /usr/share/phpmyadmin/config.inc.php
```

Generate blowfish secret and copy it:

```bash
openssl rand -base64 32
```

Edit config and paste blowfish secret:

```bash
sudo vim /usr/share/phpmyadmin/config.inc.php
```

```php
<?php
// ...
$cfg['blowfish_secret'] = ''; /* YOU MUST FILL IN THIS FOR COOKIE AUTH! */
```

Check phpMyAdmin on [**http://localhost/phpmyadmin**](http://localhost/phpmyadmin) if you have default config. If you can access to it, you can delete save.

```bash
sudo rm -rf /usr/share/phpmyadmin.bak && sudo rm /usr/share/phpMyAdmin*.tar.gz
```

If not exist, you have to configure a new file for this version.

```bash
sudo nano /etc/phpmyadmin/conf.d/pma_secure.php
```

<vue-code-info ext="php" path="/etc/phpmyadmin/conf.d/pma_secure.php"></vue-code-info>

```php
<?php

# PhpMyAdmin Settings
# This should be set to a random string of at least 32 chars
$cfg['blowfish_secret'] = '3!#32@3sa(+=_4?),5XP_:U%%8\34sdfSdg43yH#{o';

$i=0;
$i++;

$cfg['Servers'][$i]['auth_type'] = 'cookie';
$cfg['Servers'][$i]['AllowNoPassword'] = false;
$cfg['Servers'][$i]['AllowRoot'] = false;

?>
```

:::warning
This configuration will disable root login, you have to create user
:::

---

## 4. Change phpMyAdmin PHP version

If you want for some reasons, change PHP version use by phpMyAdmin, you need to update NGINX `default`. Open it:

```bash
sudo vim /etc/nginx/sites-available/default
```

Content of `default` conf (if not, check [*configure NGINX*](/guides/linux/phpmyadmin/#_1-configure-nginx))

```nginx {14}
server {
  listen 80;
  root /var/www/html;
  index index.php index.html index.htm index.nginx-debian.html;
  server_name localhost;

  location / {
    try_files $uri $uri/ =404;
    autoindex on;
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

We can see at line 14, `php7.2-fpm` which is PHP version used by phpMyAdmin cause phpMyAdmin is in `html` folder. You can update PHP version with anoter if you want like `php7.4-fpm`. Save the conf and reload NGINX

```bash
sudo service nginx restart
```

:::warning
If you change PHP version, it can be missing some extensions, if phpMyAdmin display an error about extension check this part : [*missing extension*](/guides/linux/phpmyadmin/#missing-extension)
:::

You can check phpMyAdmin infos on dashboard of phpMyAdmin, just after connection

![phpmyadmin](/images/linux/phpmyadmin-infos.jpg)

You can have more infos about PHP version and configuration of `php.ini` if you create new file in `/var/www/html/` folder

```bash
vim /var/www/html/infos.php
```

Insert these lines

```php
<?php
  phpinfo();
?>
```

Save it and go to [**http://localhost/infos.php**](http://localhost/infos.php)

![phpinfo](/images/linux/phpinfo.jpg)

You can keep it on local server but it represent security risk on production server.

---

## Errors in browser

### Reconfigure phpMyAdmin

```bash
sudo dpkg-reconfigure phpmyadmin
```

### "*Trying to access array offset on value of type bool*"

[**Upgrade phpMyAdmin**](/guides/linux/phpmyadmin/#_2-fix-phpmyadmin-errors) version to the lastest.

### "*Deprecation Notice in...*"

```
Deprecation Notice in ./js/get_image.js.php#72
implode(): Passing glue string after array is deprecated. Swap the parameters
```

[**Upgrade phpMyAdmin**](/guides/linux/phpmyadmin/#_2-fix-phpmyadmin-errors) version with guide.

### "*Missing extension...*"

After an upgrade of PHP, some dependencies can missing. You can install it just with

```bash
sudo apt install php7.4-mbstring php7.4-mysql
```

For some PHP app like Laravel, you will could need other extensions like

```bash
sudo apt install php7.4-common php7.4-mysql php7.4-xml php7.4-xmlrpc php7.4-curl php7.4-gd php7.4-imagick php7.4-cli php7.4-dev php7.4-imap php7.4-mbstring php7.4-opcache php7.4-soap php7.4-zip php7.4-intl -y
```

### Error 403

Cause by an error with php version, just check **default** config in `/etc/nginx/sites-available/default`:

```bash{12,13}
server {
  listen 80;
  root /var/www/html;
  index index.php index.html index.htm index.nginx-debian.html;
  server_name localhost;

  location / {
    try_files $uri $uri/ =404;
  }

  location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
  }

  location ~ /\.ht {
    deny all;
  }
}
```

You have to config **php-fpm version** with **php current version**. Here, the php version is **7.4**, so php-fpm have to be 7.4 too. If your php current version is different, change php-fpm version.

:::tip
Check your php version:

```bash
php -v
```

:::

### Error 404

Link phpMyAdmin from `/usr/share/` to `/var/www/html/` (default VHost) with symbolic link called **phpmyadmin**.

```bash
sudo ln -s /usr/share/phpmyadmin/ /var/www/html/phpmyadmin
```

With this config, you can access to phpMyAdmin with `localhost/phpmyadmin` url into your browser.

### Error 502

Check your PHP version, the PHP-FPM version into /etc/nginx/sites-available/default and check if you have PHP-FPM version installed which is same that your PHP version. For example, if you have PHP 7.4 and PHP-FPM 7.4 into default config, you can install PHP-FPM 7.4 with:

```
sudo apt install php7.4-fpm
```
