---
title: Setup dependencies
description: 'Setup usefeul dependencies like PHP CS fixer, IDE Helper...'
position: 1
category: 'Laravel'
---

## Laravel permissions

At root of Laravel's repository

```bash
sudo chgrp -R www-data storage bootstrap/cache ; sudo chmod -R ug+rwx storage bootstrap/cache
```

**OR**

<code-group>
  <code-block label="Simple" active>

  ```bash
  sudo chown -R $USER:www-data * ; sudo chmod -R ug+rwx storage bootstrap/cache
  ```

  </code-block>
  <code-block label="Remove Git changements">

  ```bash
  sudo chown -R $USER:www-data * ; sudo chmod -R ug+rwx storage bootstrap/cache ; git checkout .
  ```

  </code-block>
</code-group>

## PHP CS Fixer

:::tip GitHub
[**github.com/FriendsOfPHP/PHP-CS-Fixer**](https://github.com/FriendsOfPHP/PHP-CS-Fixer)
:::

Add this dependency to this project

```bash
composer require --dev friendsofphp/php-cs-fixer
```

```bash
vim .php_cs.dist
```

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

Add this to `.gitignore`

```.gitignore[.gitignore]
# ...
.php_cs.cache
```

Execute this command to fix all files

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
php artisan ide-helper:generate ; php artisan ide-helper:models ; php artisan ide-helper:meta ; php artisan ide-helper:eloquent
```

## Laravel Swagger

:::tip GitHub
[**github.com/DarkaOnLine/L5-Swagger**](https://github.com/DarkaOnLine/L5-Swagger)
:::

Add `l5-swagger`

```bash
composer require "darkaonline/l5-swagger"
```

Publish config

```bash
php artisan vendor:publish --provider "L5Swagger\L5SwaggerServiceProvider"
```

Add this to `.env`

```js[.env]
L5_SWAGGER_GENERATE_ALWAYS=true
```

You can update `config/l5-swagger.php`

```bash
php artisan storage:link
```

```php [config/l5-swagger.php]
<?php

return [
  // ...
  'documentations' => [
    'default' => [
      'api' => [
        'title' => 'My beautiful API documentation', // Update title
      ],
      // ...
    ],
  ],
  'defaults' => [
    // ...
    'group_options' => [
      'api' // Add this to add api/ routes
    ],
  ],

  'paths' => [
    'docs' => public_path('docs'), // generate doc into 'public' dir with storage linking
    // ...
  ],
];
```

Into main API Controller

```php[app/Http/Controllers/Api/ApiController.php]
<?php

namespace App\Http\Controllers\Api;

use App\Models\Formation;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="API",
 *     description="My Documentation"
 * ),
 * @OA\Tag(
 *     name="global",
 *     description="Global requests"
 * ),
 */
class ApiController extends Controller
{
  // ...
}
```

In any controller

```php[app/Http/Controllers/Api/AnyController.php]
<?php

// ...

class AnyController extends Controller
{
  /**
    * @OA\Get(
    *     path="/products",
    *     tags={"global"},
    *     summary="List of products",
    *     description="Products",
    *     @OA\Response(
    *         response=200,
    *         description="Successful operation"
    *     )
    * )
    */
  public function index()
  {
    // ...
  }
}
```

Generate documentation

```bash
php artisan l5-swagger:generate
```

## ESLint

Useful with ESLint and Vue

```bash
yarn add -D eslint eslint-plugin-vue prettier eslint-config-prettier eslint-plugin-prettier babel-eslint
```

:::tip Automatic config

```bash
./node_modules/.bin/eslint --init
```

:::

**OR**

:::tip Manual config

Create these files at the root of repository

```js[.eslintrc.js]
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    // es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  rules: {},
  parserOptions: {
    parser: 'babel-eslint',
  },
}
```

```prettierrc[.prettierrc]
{
  "semi": false,
  "singleQuote": true
}
```

```.editorconfig[.editorconfig]
# ...
[*.{vue,js}]
indent_style = space
indent_size = 2
```

:::

## Laravel & Tailwind CSS v2.0

### Vanilla

```bash
yarn add -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 vue-template-compiler ; npx tailwindcss init
```

Add this into `tailwind.config.js`

```js[tailwind.config.js]
module.exports = {
  purge: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

Remove all in `webpack.mix.js`

```js[webpack.mix.js]
const mix = require('laravel-mix')

mix
  .js('resources/js/app.js', 'public/js')
  .postCss('resources/css/app.css', 'public/css', [require('tailwindcss')])
```

### Example with Breeze

:::tip GitHub

[**github.com/laravel/breeze**](https://github.com/laravel/breeze)

:::

Install Breeze

```bash
composer require laravel/breeze --dev ; php artisan breeze:install
```

Remove default version Tailwind in Breeze

```bash
yarn remove @tailwindcss/forms postcss-import tailwindcss autoprefixer ; rm tailwind.config.js
```

Install new Tailwind version

```bash
yarn add -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 vue-template-compiler ; npx tailwindcss init
```

Add this into `tailwind.config.js`

```js[tailwind.config.js]
module.exports = {
  purge: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

Remove all in `webpack.mix.js`

```js[webpack.mix.js]
const mix = require('laravel-mix')

mix
  .js('resources/js/app.js', 'public/js')
  .postCss('resources/css/app.css', 'public/css', [require('tailwindcss')])
```
