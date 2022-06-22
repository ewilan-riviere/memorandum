---
title: Cheatsheet
description: ''
---

## Switch between PHP versions

*Source: [**stackexchange.com/how-to-switch-between-php-versions-on-ubuntu-nginx**](https://magento.stackexchange.com/questions/272815/how-to-switch-between-php-versions-on-ubuntu-nginx)*

If you want to switch PHP CLI version, follow these steps

::alert{type="info"}
If you just want to use another PHP version pour a Virtual host, like a old Drupal app, just change PHP version in NGINX conf.
::

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

## Useful links

- <https://www.php.net>
- <https://eilgin.github.io/php-the-right-way>

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

## Errors

Error on function where everything is okay about syntax.

### Type declaration

Check return data like:

```php
<?php

public function getData() : Collection
{
  $data = Data::all();
  
  return $data;
}
```

It will works only with PHP 7.3, maybe NGINX VHost use a PHP version too old.
