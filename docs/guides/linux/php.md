# 🐘 PHP

## Multiple versions

> With Ubuntu 18.04
> [**www.ostechnix.com**](https://www.ostechnix.com/how-to-switch-between-multiple-php-versions-in-ubuntu/)

Check php version like this:

```bash
php -v
```

For example, if I have PHP 7.2 and I want PHP 7.3, I install new PHP version with apt repository:

```bash
sudo add-apt-repository -y ppa:ondrej/php
sudo apt update
sudo apt install php7.3
```

If I have some problems of dependencies, I can install these for this PHP version:

```bash
sudo apt install php7.3-mbstring
sudo apt install php7.3-xml
```

[**Upgrade PHP version to PHP 7.4 on Ubuntu**](https://www.cloudbooklet.com/upgrade-php-version-to-php-7-4-on-ubuntu/)

```bash
sudo apt install php7.4-common php7.4-mysql php7.4-xml php7.4-xmlrpc php7.4-curl php7.4-gd php7.4-imagick php7.4-cli php7.4-dev php7.4-imap php7.4-mbstring php7.4-opcache php7.4-soap php7.4-zip php7.4-intl -y
```

## Syntax

Concat variable into string:

```php
<?php

$basic = "lists/".$list_test_id."/contacts"
```

```php
<?php

$improved = "lists/${list_test_id}/contacts"
```
