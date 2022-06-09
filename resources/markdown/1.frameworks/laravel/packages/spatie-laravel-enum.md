---
title: spatie/laravel-enum
description: Laravel support for spatie/enum
---


## array_key_exists(): Argument #1 ($key) must be a valid array offset type

From [github.com/spatie/laravel-enum/issues/78](https://github.com/spatie/laravel-enum/issues/78)

```php
$testModels->groupBy(fn(TestModel $m): string => $m->status->value));
```
