---
title: Cheatsheet
description: ''
position: 2
category: 'PHP'
---

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

public function getData : Collection
{
    $data = Data::all();
    return $data;
}
```

It will works only with PHP 7.3, maybe NGINX VHost use a PHP version too old.
