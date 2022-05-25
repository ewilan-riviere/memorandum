---
title: PHP 8
description: 'New features for PHP 8.0'
position: 5
category: 'PHP'
---

- <https://www.php.net/releases/8.0/en.php>
- <https://www.youtube.com/watch?v=zQbeSRylyHU>

```php
<?php

class Product
{
    private float|int $price;
    
    /**
     *  @param int|float $price
     */
    public function setPrice(int|float $price)
    {
        $this->price = $price
    }
}
```

```php
<?php

class Product
{
    public function __construct(
        private float $price = 0.0,
    ) {}
}
```

```php
<?php

class PostsController
{
    #[Route("/api/posts/{id}", methods: ["GET"])]
    public function get($id) { /* ... */ }
}
```

```php
<?php

function my_method($text, $another_specific_option = true, $specific_option = true)
{
    // ...
}

my_method('specific text', specific_option: false);
```

```php
<?php

$fn1 = fn($x) => $x + $y;
// equivalent to using $y by value:
$fn2 = function ($x) use ($y) {
    return $x + $y;
};
```

```php
<?php

$country = $session?->user?->getAddress()?->country;

```

```php
<?php

echo match (8.0) {
  '8.0' => "Oh no!",
  8.0 => "This is what I expected",
};
//> This is what I expected
```
