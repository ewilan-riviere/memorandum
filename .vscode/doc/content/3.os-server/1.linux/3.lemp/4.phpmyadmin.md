---
title: phpMyAdmin
description: 'How to setup phpMyAdmin with NGINX'
---

# phpMyAdmin

[Digital Ocean: phpMyAdmin with Apache](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-18-04)
[Digital Ocean: phpMyAdmin with NGINX](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-with-nginx-on-an-ubuntu-18-04-server)

On Ubuntu 20.04, you can have some problems with validate password on MySQL. Before install phpMyAdmin, disable it and enable it after installation.

```bash
mysql -u root -p
```

Disable validate password

```sql
UNINSTALL COMPONENT "file://component_validate_password";
exit
```

Install phpMyAdmin

```bash
sudo apt update
sudo apt install phpmyadmin
```

```bash
mysql -u root -p
```

Enable valdiate password

```sql
INSTALL COMPONENT "file://component_validate_password";
exit
```

::alert{type="danger"}
After installing, you will see dialog with choices about server, **don't select anything** because it's NGINX.
Just press <kbd>&nbsp;&#8633;&nbsp;</kbd> to select `OK` with <kbd>&nbsp;Enter&nbsp;</kbd>

Select **`Yes` for all questions** and **enter MySQL password** you defined for MySQL.
::

Link phpMyAdmin from it folder to NGINX folder

```bash
sudo ln -s /usr/share/phpmyadmin /var/www/html/phpmyadmin
```

::alert{type="info"}
If you want to change phpMyAdmin URL location:

```bash
sudo mv /var/www/html/phpmyadmin /var/www/html/other-location
```
::

## Configure NGINX

Update NGINX `default` config:

```bash
sudo vim /etc/nginx/sites-available/default
```

Replace content with this config:

- `autoindex on` allow to display phpMyAdmin from `html` folder in `/var/www`
- if you want to use different PHP version for phpMyAdmin, you can change this line `fastcgi_pass unix:/var/run/php/php8.2-fpm.sock`

```nginx [/etc/nginx/sites-available/default]
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
    fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
  }
}
```

```bash
sudo service nginx reload
```

And phpMyAdmin is available on [**http://localhost/phpmyadmin**](http://localhost/phpmyadmin) or another URL if you change folder in `html` folder. Now you can fix commons phpMyAdmin errors.

You can connect to phpMyAdmin with MySQL informations, so basically if you follow **LEMP MySQL** steps, you can use `root` as *username* and `password` as *password* if you not setup a high level of security. It's better to use a custom user to connect to phpMyAdmin for security reasons (because `root` have ALL rights and it's better to disable `root` connection).

## Disable `root` for phpMyAdmin

Open phpMyAdmin config

```bash
sudo vim /usr/share/phpmyadmin/config.inc.php
```

Find `$cfg['Servers'][$i]['auth_type'] = 'cookie';` line and add this line `$cfg['Servers'][$i]['AllowRoot'] = FALSE;`

```php [/usr/share/phpmyadmin/config.inc.php]
if (!empty($dbname)) {
  /* Authentication type */
  $cfg['Servers'][$i]['auth_type'] = 'cookie';
  $cfg['Servers'][$i]['AllowRoot'] = FALSE; // add this line
  // ...
}
```

Now `root` user is forbidden with phpMyadmin but allowed with MySQL CLI.

## Fix phpMyAdmin errors

You can have some errors when you use phpMyAdmin, search here if your error exist below.

### Configure `blowfish_secret`

```bash
sudo touch /etc/phpmyadmin/conf.d/pma_secure.php
sudo vim /etc/phpmyadmin/conf.d/pma_secure.php
```

```php [/etc/phpmyadmin/conf.d/pma_secure.php]
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

### Error on tables

Fix a commin error of phpMyAdmin with this command

```bash
sudo sed -i "s/|\s*\((count(\$analyzed_sql_results\['select_expr'\]\)/| (\1)/g" /usr/share/phpmyadmin/libraries/sql.lib.php
```

## Upgrade phpMyAdmin

It's only optional but if you want to upgrade phpMyAdmin and avoid common errors, it's possible with this commands:

*backup old version, recreate phpmyadmin folder, create tmp directory for phpmyadmin, rights on tmp directory, move to the directory*

```bash
sudo mv /usr/share/phpmyadmin/ /usr/share/phpmyadmin.bak
sudo mkdir /usr/share/phpmyadmin/
sudo mkdir /usr/share/phpmyadmin/tmp
sudo chown www-data:www-data /usr/share/phpmyadmin/tmp
cd /usr/share/phpmyadmin/
```

An example for **5.0.2** phpMyAdmin version

```bash
sudo wget https://files.phpmyadmin.net/phpMyAdmin/5.0.2/phpMyAdmin-5.0.2-all-languages.tar.gz
```

*extract content of downloded .tar.gz, move files to phpmyadmin directory*

```bash
sudo tar xzf phpMyAdmin-*-all-languages.tar.gz
sudo mv phpMyAdmin-*-all-languages/* /usr/share/phpmyadmin
```

### Blowfish secret

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

```php [/usr/share/phpmyadmin/config.inc.php]
<?php
// ...
$cfg['blowfish_secret'] = ''; /* YOU MUST FILL IN THIS FOR COOKIE AUTH! */
```

Check phpMyAdmin on [**http://localhost/phpmyadmin**](http://localhost/phpmyadmin) if you have default config. If you can access to it, you can delete save.

```bash
sudo rm -rf /usr/share/phpmyadmin.bak ; sudo rm /usr/share/phpMyAdmin*.tar.gz
```

If not exist, you have to configure a new file for this version.

```bash
sudo nano /etc/phpmyadmin/conf.d/pma_secure.php
```

```php [/etc/phpmyadmin/conf.d/pma_secure.php]
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

::alert{type="warning"}
This configuration will disable root login, you have to create user
::

---

## Change phpMyAdmin PHP version

If you want for some reasons, change PHP version use by phpMyAdmin, you need to update NGINX `default`. Open it:

```bash
sudo vim /etc/nginx/sites-available/default
```

Content of `default` conf (if not, check *configure NGINX*)

```nginx
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
    fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
  }

  location ~ /\.ht {
    deny all;
  }
}
```

We can see at line 14, `php8.2-fpm` which is PHP version used by phpMyAdmin cause phpMyAdmin is in `html` folder. You can update PHP version with anoter if you want. Save the conf and reload NGINX

```bash
sudo service nginx restart
```

::alert{type="warning"}
If you change PHP version, it can be missing some extensions, if phpMyAdmin display an error about extension check this part : *missing extension*
::

You can check phpMyAdmin infos on dashboard of phpMyAdmin, just after connection

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

You can keep it on local server but it represent security risk on production server.

---

## Errors in browser

### Reconfigure phpMyAdmin

```bash
sudo dpkg-reconfigure phpmyadmin
```

### "*Trying to access array offset on value of type bool*"

**Upgrade phpMyAdmin** version to the lastest.

### "*Deprecation Notice in...*"

```
Deprecation Notice in ./js/get_image.js.php#72
implode(): Passing glue string after array is deprecated. Swap the parameters
```

**Upgrade phpMyAdmin** version with guide.

### "*Missing extension...*"

After an upgrade of PHP, some dependencies can missing. You can install it just with

```bash
sudo apt install php8.2-mbstring php8.2-mysql
```

For some PHP app like Laravel, you will could need other extensions like

```bash
sudo apt install php8.2-common php8.2-mysql php8.2-xml php8.2-xmlrpc php8.2-curl php8.2-gd php8.2-imagick php8.2-cli php8.2-dev php8.2-imap php8.2-mbstring php8.2-opcache php8.2-soap php8.2-zip php8.2-intl -y
```

### Error 403

Cause by an error with php version, just check **default** config in `/etc/nginx/sites-available/default`:

```bash
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
    fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
  }

  location ~ /\.ht {
    deny all;
  }
}
```

You have to config **php-fpm version** with **php current version**. Here, the php version is **8.2**, so php-fpm have to be 8.2 too. If your php current version is different, change php-fpm version.

Check your php version

```bash
php -v
```

### Error 404

Link phpMyAdmin from `/usr/share/` to `/var/www/html/` (default VHost) with symbolic link called **phpmyadmin**.

```bash
sudo ln -s /usr/share/phpmyadmin/ /var/www/html/phpmyadmin
```

With this config, you can access to phpMyAdmin with `localhost/phpmyadmin` url into your browser.

### Error 502

Check your PHP version, the PHP-FPM version into /etc/nginx/sites-available/default and check if you have PHP-FPM version installed which is same that your PHP version. For example, if you have PHP 8.2 and PHP-FPM 8.2 into default config, you can install PHP-FPM 8.2 with:

```bash
sudo apt install php8.2-fpm
```

---

## Debian 10 from source

[**digitalocean.com**](https://www.digitalocean.com/community/tutorials/how-to-install-phpmyadmin-from-source-debian-10)

```bash
sudo apt install -y php-mbstring php-zip php-gd ; wget https://files.phpmyadmin.net/phpMyAdmin/4.9.7/phpMyAdmin-4.9.7-all-languages.tar.gz ; tar xvf phpMyAdmin-4.9.7-all-languages.tar.gz ; sudo mv phpMyAdmin-4.9.7-all-languages/ /usr/share/phpmyadmin ; sudo mkdir -p /var/lib/phpmyadmin/tmp ; sudo chown -R www-data:www-data /var/lib/phpmyadmin ; sudo cp /usr/share/phpmyadmin/config.sample.inc.php /usr/share/phpmyadmin/config.inc.php
```

```bash
sudo vim /usr/share/phpmyadmin/config.inc.php
```

```bash
sudo apt install -y pwgen ; pwgen -s 32 1
```

```php title="/usr/share/phpmyadmin/config.inc.php"
// ...

$cfg['blowfish_secret'] = 'STRINGOFTHIRTYTWORANDOMCHARACTERS'; /* YOU MUST FILL IN THIS FOR COOKIE AUTH! */

// ...

$cfg['Servers'][$i]['controluser'] = 'root';
$cfg['Servers'][$i]['controlpass'] = 'password';

// ...

/* Storage database and tables */
$cfg['Servers'][$i]['pmadb'] = 'phpmyadmin';
$cfg['Servers'][$i]['bookmarktable'] = 'pma__bookmark';
$cfg['Servers'][$i]['relation'] = 'pma__relation';
$cfg['Servers'][$i]['table_info'] = 'pma__table_info';
$cfg['Servers'][$i]['table_coords'] = 'pma__table_coords';
$cfg['Servers'][$i]['pdf_pages'] = 'pma__pdf_pages';
$cfg['Servers'][$i]['column_info'] = 'pma__column_info';
$cfg['Servers'][$i]['history'] = 'pma__history';
$cfg['Servers'][$i]['table_uiprefs'] = 'pma__table_uiprefs';
$cfg['Servers'][$i]['tracking'] = 'pma__tracking';
$cfg['Servers'][$i]['userconfig'] = 'pma__userconfig';
$cfg['Servers'][$i]['recent'] = 'pma__recent';
$cfg['Servers'][$i]['favorite'] = 'pma__favorite';
$cfg['Servers'][$i]['users'] = 'pma__users';
$cfg['Servers'][$i]['usergroups'] = 'pma__usergroups';
$cfg['Servers'][$i]['navigationhiding'] = 'pma__navigationhiding';
$cfg['Servers'][$i]['savedsearches'] = 'pma__savedsearches';
$cfg['Servers'][$i]['central_columns'] = 'pma__central_columns';
$cfg['Servers'][$i]['designer_settings'] = 'pma__designer_settings';
$cfg['Servers'][$i]['export_templates'] = 'pma__export_templates';

// AT THE END OF FILE, add this line
$cfg['TempDir'] = '/var/lib/phpmyadmin/tmp';
```
