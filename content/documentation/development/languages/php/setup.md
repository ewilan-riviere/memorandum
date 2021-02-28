---
title: Setup
description: ''
position: 1
category: 'PHP'
---

PHP: *Hypertext Preprocessor*

## PHP (for apache2)

This will install LTS version of PHP

```bash
sudo apt install php libapache2-mod-php php-mysql
sed -i 's/DirectoryIndex index.html index.cgi index.pl index.php index.xhtml index.htm/DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm/g' /etc/apache2/mods-enabled/dir.conf
sudo systemctl restart apache2
sudo apt install php-cli
```

## PHP FPM (for NGINX)

When Apache use standard PHP version, NGINX use FPM version.

```bash
sudo apt install -y php-fpm php-mysql
```

<alert>
If not work, add this repository:  
`sudo add-apt-repository universe`
</alert>

It's will install latest **stable** version of PHP-fpm, so you will maybe need a better version. You can upgrade PHP version now and you will be able to switch between different versions.

### 3. a. Upgrade PHP

You can check PHP version with `php -v`, if you want to upgrade this version follow next steps. You have to add new source for `apt`

```bash
sudo add-apt-repository -y ppa:ondrej/php ; sudo apt update
```

Now you can download new PHP version

```bash
sudo apt install php7.3-fpm
```

This will automatically update PHP CLI version, it's this version that you use when you execute `php` command into your terminal. You can check it with `php -v`. But yours VHosts can always use old version of PHP, you will have to update NGINX conf for each VHost if you want to change their version of PHP (it's optional). You can keep VHost with old version of PHP, if you let this version on your system, it's useful to update version if you use modern syntax in your PHP app, for example type of parameters is available with latests PHP versions.

<alert type="warning">
Following steps talks about VHost, if you don't know how it's works, read [*4. Virtual Host*](/guides/linux/lemp/#_4-virtual-host) before.
</alert>

If you want to update a VHost NGINX conf, check it in `/etc/nginx/sites-available/` and edit it, like:

```bash
sudo vim /etc/nginx/sites-available/my-domain
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

<alert type="warning">
If you change PHP version, it can be missing some extensions, if your app display an error about extension check this part : [*missing extension*](/guides/linux/phpmyadmin/#missing-extension)
</alert>

### 3. b. Switch between PHP versions

*Source: [**stackexchange.com/how-to-switch-between-php-versions-on-ubuntu-nginx**](https://magento.stackexchange.com/questions/272815/how-to-switch-between-php-versions-on-ubuntu-nginx)*

If you want to switch PHP CLI version, follow these steps

<alert type="info">
If you just want to use another PHP version pour a Virtual host, like a old Drupal app, just change PHP version in NGINX conf.
</alert>

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

*FastCGI Process Manager*

With apt source `universe`, you will have LTS version of PHP, for example (in august 2020), I have PHP 7.2

Install PHP FPM 7.2 with extensions

```bash
sudo apt install -y php7.2-fpm
```

```bash
sudo apt install -y php7.2-mbstring php7.2-common php7.2-mysql php7.2-xml php7.2-xmlrpc php7.2-curl php7.2-gd php7.2-imagick php7.2-cli php7.2-dev php7.2-imap php7.2-mbstring php7.2-opcache php7.2-soap php7.2-zip php7.2-intl -y
```

With PPA `ondrej/php`, we can install all PHP versions

Add PPA to `apt`

```bash
sudo add-apt-repository -y ppa:ondrej/php ; sudo apt update
```

Install PHP FPM 7.4 with extensions

```bash
sudo apt install -y php7.4-fpm
```

```bash
sudo apt install -y php7.4-mbstring php7.4-common php7.4-mysql php7.4-xml php7.4-xmlrpc php7.4-curl php7.4-gd php7.4-imagick php7.4-cli php7.4-dev php7.4-imap php7.4-mbstring php7.4-opcache php7.4-soap php7.4-zip php7.4-intl -y
```
