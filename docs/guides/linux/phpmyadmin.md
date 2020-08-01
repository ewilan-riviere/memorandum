# phpMyAdmin

[Digital Ocean: phpMyAdmin with Apache](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-18-04)  
[Digital Ocean: phpMyAdmin with Nginx](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-with-nginx-on-an-ubuntu-18-04-server)

[[toc]]

```bash
sudo apt update
sudo apt install phpmyadmin
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

## 1. Fix phpMyAdmin errors

### 1. a. Configure `blowfish_secret`

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

### 1. b. Error on tables

```bash
sudo sed -i "s/|\s*\((count(\$analyzed_sql_results\['select_expr'\]\)/| (\1)/g" /usr/share/phpmyadmin/libraries/sql.lib.php
```

## 2. Configure NGINX

Update NGINX `default` config:

```bash
sudo vim /etc/nginx/sites-availables/default
```

Replace content with this config:
- `autoindex on` allow to display phpMyAdmin from `html` folder in `/var/www`
- if you want to use different PHP version for phpMyAdmin, you can change this line `fastcgi_pass unix:/var/run/php/php7.2-fpm.sock`

```nginx {9,14}
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

## 3. Update phpMyAdmin

It's only optional but if you want to update phpMyAdmin, it's possible with this commands:

```bash
# backup old version
sudo mv /usr/share/phpmyadmin/ /usr/share/phpmyadmin.bak
# recreate phpmyadmin folder
sudo mkdir /usr/share/phpmyadmin/
# create tmp directory for phpmyadmin
sudo mkdir /usr/share/phpmyadmin/tmp
# rights on tmp directory
sudo chown www-data:www-data /usr/share/phpmyadmin/tmp
# move to the directory
cd /usr/share/phpmyadmin/
```

An example for **5.0.2** phpMyAdmin version

```bash
# download phpmyadmin
sudo wget https://files.phpmyadmin.net/phpMyAdmin/5.0.2/phpMyAdmin-5.0.2-all-languages.tar.gz
```

```bash
# extract content of downloded .tar.gz
sudo tar xzf phpMyAdmin-*-all-languages.tar.gz
# move files to phpmyadmin directory
sudo mv phpMyAdmin-*-all-languages/* /usr/share/phpmyadmin
```

**Blowfish secret**

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

Check phpMyAdmin on `localhost/phpmyadmin` if you have default config. If you can access to it, you can delete save.

```bash
sudo rm -rf /usr/share/phpmyadmin.bak
```

You have to configure a new file for this version.

```bash
sudo nano /etc/phpmyadmin/conf.d/pma_secure.php
```

<code-heading type="php" path="/etc/phpmyadmin/conf.d/pma_secure.php"></code-heading>

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

## Errors in browser

### Reconfigure phpMyAdmin

```bash
sudo dpkg-reconfigure phpmyadmin
```

### "*Trying to access array offset on value of type bool*"

Update phpMyAdmin version to the lastest.

### "*Deprecation Notice in ./js/get_image.js.php#72*"

```
Deprecation Notice in ./js/get_image.js.php#72
implode(): Passing glue string after array is deprecated. Swap the parameters
```

Upgrade your **phpMyAdmin** version with guide. *TODO link*

### Error 403

Cause by an error with php version, just check **default** config in `/etc/nginx/sites-availables/default`:

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


