---
title: Setup dependencies
description: ''
position: 1
category: 'Laravel'
---

# Setup dependencies

## PHP CS Fixer

:::tip GitHub
[**github.com/FriendsOfPHP/PHP-CS-Fixer**](https://github.com/FriendsOfPHP/PHP-CS-Fixer)
:::

Add this dependency to this project

```bash
composer require --dev friendsofphp/php-cs-fixer
```

Create the file `.php_cs.dist`

```php
<?php

$finder = PhpCsFixer\Finder::create()
    ->exclude('bootstrap/cache')
    ->exclude('node_modules')
    ->exclude('storage')
    ->in(__DIR__)
    ->notName('*.blade.php')
    ->notName('.phpstorm.meta.php')
    ->notName('_ide_*.php')
;

return PhpCsFixer\Config::create()
    ->setRiskyAllowed(true)
    ->setRules([
        '@Symfony' => true,
        'array_syntax' => ['syntax' => 'short'],
        'array_indentation' => true,
        'binary_operator_spaces' => ['operators' => ['=>' => 'align']],
        'increment_style' => ['style' => 'post'],
        'linebreak_after_opening_tag' => true,
        'no_useless_else' => true,
        'no_useless_return' => true,
        'not_operator_with_successor_space' => true,
        'ordered_imports' => ['sortAlgorithm' => 'length'],
        'phpdoc_order' => true,
        'simplified_null_return' => true,
        'no_superfluous_phpdoc_tags' => false,
    ])
    ->setFinder($finder)
;
```

Execute this command fix all files

```bash
./vendor/bin/php-cs-fixer fix
```

## Laravel IDE Helper

:::tip GitHub
[**github.com/barryvdh/laravel-ide-helper**](https://github.com/barryvdh/laravel-ide-helper)
:::

```bash
composer require --dev barryvdh/laravel-ide-helper
```

```bash
php artisan ide-helper:generate && php artisan ide-helper:models && php artisan ide-helper:meta && php artisan ide-helper:eloquent
```

## Laravel Swagger

:::tip GitHub
[**github.com/DarkaOnLine/L5-Swagger**](https://github.com/DarkaOnLine/L5-Swagger)
:::

```bash
composer require "darkaonline/l5-swagger"
```

```bash
L5_SWAGGER_GENERATE_ALWAYS=true
```

```bash
php artisan l5-swagger:generate
```

## Laravel Auth

:::tip Official doc
[**laravel.com/docs/7.x/authentication**](https://laravel.com/docs/7.x/authentication)
:::

```bash
composer require laravel/ui
```

## Vue.js

:::tip
[**laravel.com/docs/7.x/frontend**](https://laravel.com/docs/7.x/frontend)
:::
:::warning
The UI package offer to install Bootstrap, Vue.js or React.js.
:::

Get UI for Laravel to publish Vue.js

```bash
composer require laravel/ui
```

Publish Vue.js basic

```bash
php artisan ui vue
```

:::tip Publish with Auth views

```bash
php artisan ui vue --auth
```

:::

```bash
yarn && yarn dev
```

## Laravel Tailwind CSS

:::tip GitHub
[**github.com/laravel-frontend-presets/tailwindcss**](https://github.com/laravel-frontend-presets/tailwindcss)
:::

```bash
composer require laravel-frontend-presets/tailwindcss --dev
```

```bash
php artisan ui tailwindcss
```

:::tip with Auth

```bash
php artisan ui tailwindcss --auth
```

:::

```bash
yarn && yarn dev
```
