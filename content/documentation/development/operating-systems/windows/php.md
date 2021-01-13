---
title: PHP
description: 'How to setup PHP on Windows with multiple versions'
position: 3
category: 'Windows'
---

<alert type="warning"> scoop is necessary

You can manage multiple versions of PHP on same machine with **scoop**, if you don't install it, check this guide: [**scoop**](/development/operating-systems/windows/scoop)

</alert>

## Install multiple PHP versions

If you try to install directly PHP with **scoop** you will have the last version, if you want to manage multiple versions, you need to install *php bucket*

```powershell[PowerShell]
scoop bucket add php
```

Try to search `php` with scoop

```powershell[PowerShell]
scoop search php
```

And you will find a lot of PHP versions, you can install any specific PHP version now. But you will **nts** versions and standard versions, if you want to use **NGINX**, I advice you to install **nts** version for each PHP version. In next example, I choose PHP 7.3 and PHP 7.4 with **nts** version.

```powershell[PowerShell]
sudo scoop install php7.4-nts
```

```powershell[PowerShell]
sudo scoop install php7.3-nts
```

### Switch PHP version

By default, the last PHP installed is the current version, here I install PHP 7.3 at the last, so current version with `php -v` will be **7.3**. If I want to use PHP 7.4, I have just to use this command:

```powershell[PowerShell]
scoop reset php/php7.4-nts
```

And `php -v` give me **7.4**, I can back to PHP 7.3 when I want.

## php.ini

You will need to activate some extensions in `php.ini`, you will find it **for each PHP version** in each directory of PHP version installed: `C:/Users/USERNAME/scoop/apps/php*-nts/current/php.ini`. I offer an example of **php.ini** but you will need to update each **php.ini**.

<spoiler label="Example of configuration">

**At around line 400**

```ini[C:/Users/USERNAME/scoop/apps/php*-nts/current/php.ini]
; Maximum amount of memory a script may consume (128MB)
; <http://php.net/memory-limit>
memory_limit = -1
```

**At around line 750**

```ini[C:/Users/USERNAME/scoop/apps/php*-nts/current/php.ini]
; Directory in which the loadable extensions (modules) reside.
; <http://php.net/extension-dir>
; extension_dir = "./"
; On windows:
extension_dir = "ext"
```

**At around line 900**

```ini[C:/Users/USERNAME/scoop/apps/php*-nts/current/php.ini]
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
; See <http://www.php.net/manual/en/snmp.installation.php>
;extension=snmp

extension=soap
extension=sockets
extension=sodium
extension=sqlite3
extension=tidy
extension=xmlrpc
extension=xsl
```

</spoiler>

## Composer

You can install `composer` if you want to use PHP packages:

```powershell[PowerShell]
sudo scoop install composer
```

## Setup Services for PHP

If you want to create VHost with **NGINX** and **specific PHP version for each VHost**, you will need to create **Services**. To do this, you will need **NSSM** (Non-Stucking Service Manager):

```powershell[PowerShell]
sudo scoop install nssm
```

### Create service

And install a new service, here for php7.4

```powershell[PowerShell]
sudo nssm install php7.4
```

You will have a window to create new service, two input will be important: **Path** and **Parameter**

<md-img source="nssm-php.png"></md-img>

For **Path**, get **path** of **current** **php7.4-nts**, in this example, change `USERNAME` and `php7.4-nts` if you set a different PHP version in **Path**

```[path]
C:\Users\USERNAME\scoop\apps\php7.4-nts\current\php-cgi.exe
```

For **Parameter**, you will need to create specific port with path of **current** **php7.4-nts**, in this example change `USERNAME`, `9074` if you want a different port and `php7.4-nts` if you set a different PHP version in **Path**

```[parameter]
-b 127.0.0.1:9074 -c C:\Users\USERNAME\scoop\apps\php7.4-nts\current\php.ini
```

Save the new service and you can install another for PHP 7.3, for example:

```[path]
C:\Users\USERNAME\scoop\apps\php7.3-nts\current\php-cgi.exe
```

For the port, I choose `9073`

```[parameter]
-b 127.0.0.1:9073 -c C:\Users\USERNAME\scoop\apps\php7.3-nts\current\php.ini
```

### Launch service

```powershell[PowerShell]
sudo nssm start php7.4
```

If you change some data, like with **php.ini**, you will need to **restart Service**

```powershell[PowerShell]
sudo nssm restart php7.4
```

And now, you can install **NGINX** and **MySQL**, check here: [**MySQL & NGINX**](/development/operating-systems/windows/mysql-nginx)
