---
title: PHP for Windows
description: How to setup PHP on Windows with multiple versions
---

# PHP for Windows

{{ $frontmatter.description }}

::: warning Scoop is necessary
This guide use `scoop` to install this binary, if you don't have it, check [this guide](/systems/windows/scoop)
:::

## Install multiple PHP versions

If you try to install directly PHP with **scoop** you will have the last version, if you want to manage multiple versions, you need to install _php bucket_

```ps1
scoop bucket add php
```

Try to search `php` with scoop

```ps1
scoop search php
```

And you will find a lot of PHP versions, you can install any specific PHP version now. But you will **nts** versions and standard versions, if you want to use **NGINX**, I advice you to install **nts** version for each PHP version.

Install current version.

```ps1
scoop install php-nts
```

Install specific version.

```ps1
scoop install php8.1-nts
```

### Switch PHP version

By default, the last PHP installed is the current version, here I install PHP 8.1 at the last, so current version with `php -v` will be **8.1**. If I want to use PHP 8.2, I have just to use this command:

```ps1
scoop reset php/php-nts
```

And `php -v` give me **8.2**, I can back to PHP 8.1 when I want with `scoop reset php/php8.1-nts`.

## php.ini

You will need to activate some extensions in `php.ini`, you will find it **for each PHP version** in each directory of PHP version installed: `C:/Users/USERNAME/scoop/apps/php*-nts/current/php.ini`. I offer an example of **php.ini** but you will need to update each **php.ini**.

- [**Example for PHP 7.1**](https://gist.github.com/ewilan-riviere/2c3ceca4441fd96fc4a7c320425b6a45)
- [**Example for PHP 7.3**](https://gist.github.com/ewilan-riviere/6b60d0f21e373e0a10d0026a3155cb67)
- [**Example for PHP 7.4**](https://gist.github.com/ewilan-riviere/76387098c93bbdf4409347b05abb5657)
- [**Example for PHP 8.0**](https://gist.github.com/ewilan-riviere/4dc5d283f82c4b5b6e4de97b56eae5fa)
- [**Example for PHP 8.1**](https://gist.github.com/ewilan-riviere/b2c89a7ed5acdc136a354d31349cf865)
- [**Example for PHP 8.2**](https://gist.github.com/ewilan-riviere/9b8014f7a5941e34eda1524ae5d43096)

::: info `php.ini` config tips.
This is a configuration for PHP 8.2, you can have different options with another PHP version.
:::

**At around line 400**

```ini:php.ini
; Maximum amount of memory a script may consume (128MB)
; <http://php.net/memory-limit>
memory_limit = -1
```

**At around line 750**

```ini:php.ini
; Directory in which the loadable extensions (modules) reside.
; <http://php.net/extension-dir>
; extension_dir = "./"
; On windows:
extension_dir = "ext"
```

**At around line 900**

```ini:php.ini
; Notes for Windows environments :
;
; - Many DLL files are located in the extensions/ (PHP 4) or ext/ (PHP 5+)
;   extension folders as well as the separate PECL DLL download (PHP 5+).
;   Be sure to appropriately set the extension_dir directive.
;
extension=bz2
extension=curl
;extension=ffi
extension=ftp
extension=fileinfo
extension=gd2
extension=gettext
extension=gmp
extension=intl
extension=imap
extension=ldap
extension=mbstring
extension=exif      ; Must be after mbstring as it depends on it
extension=mysqli
;extension=oci8_12c  ; Use with Oracle Database 12c Instant Client
extension=odbc
extension=openssl
;extension=pdo_firebird
extension=pdo_mysql
;extension=pdo_oci
extension=pdo_odbc
extension=pdo_pgsql
extension=pdo_sqlite
extension=pgsql
extension=shmop

; The MIBS data available in the PHP distribution must be installed.
; See http://www.php.net/manual/en/snmp.installation.php
;extension=snmp

extension=soap
extension=sockets
extension=sodium
extension=sqlite3
extension=tidy
extension=xmlrpc
extension=xsl
```

Install cacert

```sh
sudo scoop install cacert
```

**At around line 1900**

```ini:php.ini
curl.cainfo = "C:\Users\USERNAME\scoop\apps\cacert\current\cacert.pem"
```

## Composer

You can install `composer` if you want to use PHP packages:

```ps1
scoop install composer
```

You can switch between composer version with

```ps1
composer self-update --1 # composer v1
```

```ps1
composer self-update --2 # composer v2
```

## Setup Services for PHP

If you want to create VHost with **NGINX** and **specific PHP version for each VHost**, you will need to create **Services**. To do this, you will need **NSSM** (Non-Stucking Service Manager):

```ps1
sudo scoop install nssm
```

### Create service

And install a new service, here for PHP 8.2

```ps1
sudo nssm install php8.2
```

You will have a window to create new service, two input will be important: **Path** and **Parameter**

For **Path**, get **path** of **current** **php-nts**, in this example, change `USERNAME` and `php-nts` if you set a different PHP version in **Path**

```
C:\Users\USERNAME\scoop\apps\php-nts\current\php-cgi.exe
```

For **Parameter**, you will need to create specific port with path of **current** **php-nts**, in this example change `USERNAME`, `9082` if you want a different port and `php-nts` if you set a different PHP version in **Path**

```[parameter]
-b 127.0.0.1:9082 -c C:\Users\USERNAME\scoop\apps\php-nts\current\php.ini
```

Save the new service.

::: info
You can install another for PHP 8.1, for example:

```[path]
C:\Users\USERNAME\scoop\apps\php8.1-nts\current\php-cgi.exe
```

For the port, I choose `9081` (for PHP 8.1)

```[parameter]
-b 127.0.0.1:9081 -c C:\Users\USERNAME\scoop\apps\php8.1-nts\current\php.ini
```

:::

### Launch service

```ps1
sudo nssm start php8.2
```

If you change some data, like with **php.ini**, you will need to **restart Service**

```ps1
sudo nssm restart php8.2
```

## Errors

### cURL error 60: SSL certificate problem: unable to get local issuer certificate

If you have this error, you have a problem of certificate. You can [manullay download certificate](https://curl.haxx.se/docs/caextract.html) but I advice to use `scoop`.

```sh
sudo scoop install cacert
```

Open `C:/Users/USERNAME/scoop/apps/php*-nts/current/php.ini` to update this line, at ~1900 line

```ini:php.ini
curl.cainfo = "C:\Users\USERNAME\scoop\apps\cacert\current\cacert.pem"
```

And restart PHP-FPM with NSSM

```sh
sudo nssm restart php[INSERT-HERE-VERSION]
```

::: warning
You have to do this **FOR EACH** PHP version you use with you VHost. If you use `php artisan serve` with PHP 8.2 CLI, you have a VHost with PHP 8.1 and another VHost with PHP 8.0... You have to update all `php.ini` files which used by VHost or live serve with Laravel or Symfony.

And you have to **RESTART EACH** version after `php.ini` file update.
:::

### PHP ini location problem

If Windows don't find `php.ini` assure yourself that this variable is set into **Windows environnement variables** for current user

```
PHP_INI_SCAN_DIR => [
    C:\Users\ewila\scoop\persist\php-nts
    C:\Users\ewila\scoop\apps\php-nts\current\conf.d
]
```

**Note:** theses variables change when you change your current PHP CLI version with `scoop reset php/php-nts` for example
