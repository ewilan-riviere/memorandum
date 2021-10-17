---
title: Setup dependencies
description: 'Setup usefeul dependencies like PHP CS fixer, IDE Helper...'
position: 1
category: 'Laravel'
---

!> Here is a tip.

?> And a warning.

x> Or an error.

## Laravel permissions

At root of Laravel's repository

```bash
sudo chgrp -R www-data storage bootstrap/cache ; sudo chmod -R ug+rwx storage bootstrap/cache
```

**OR**

<content-code-group>
  <content-code-block label="Simple" active>

  ```bash
  sudo chown -R $USER:www-data * ; sudo chmod -R ug+rwx storage bootstrap/cache
  ```

  </content-code-block>
  <content-code-block label="Remove Git changements">

  ```bash
  sudo chown -R $USER:www-data * ; sudo chmod -R ug+rwx storage bootstrap/cache ; git checkout .
  ```

  </content-code-block>
</content-code-group>

## Helpers

### PHP CS Fixer

<content-alert type="info"> GitHub
[**github.com/FriendsOfPHP/PHP-CS-Fixer**](https://github.com/FriendsOfPHP/PHP-CS-Fixer)
</content-alert>

Add this dependency to this project

```bash
composer require --dev friendsofphp/php-cs-fixer
```

```bash
touch .php-cs-fixer.dist.php
```

```php
<?php

$rules = [
    '@PhpCsFixer' => true,
    'no_empty_comment' => false,
    'no_extra_blank_lines' => [
        'tokens' => [
            'extra',
            'throw',
            'use',
            'use_trait',
        ],
    ],
    'not_operator_with_successor_space' => true,
    'php_unit_method_casing' => false,
    'single_line_comment_style' => false,
    'php_unit_internal_class' => false,
    'php_unit_test_class_requires_covers' => false,
];

$finder = PhpCsFixer\Finder::create()
    ->in([
        __DIR__.'/app',
        __DIR__.'/config',
        __DIR__.'/database',
        __DIR__.'/resources',
        __DIR__.'/tests',
    ])
    ->name('*.php')
    ->notName('*.blade.php')
    ->ignoreDotFiles(true)
    ->ignoreVCS(true)
;

$config = new PhpCsFixer\Config();

return $config->setFinder($finder)
    ->setRules($rules)
    ->setRiskyAllowed(true)
    ->setUsingCache(true)
;
```

Add this to `.gitignore`

```.gitignore[.gitignore]
# ...
.php-cs-fixer.cache
```

Execute this command to fix all files

```bash
./vendor/bin/php-cs-fixer fix
```

### Laravel IDE Helper

<content-alert type="info"> GitHub
[**github.com/barryvdh/laravel-ide-helper**](https://github.com/barryvdh/laravel-ide-helper)
</content-alert>

```bash
composer require --dev barryvdh/laravel-ide-helper
```

```bash
php artisan ide-helper:generate ; php artisan ide-helper:models --nowrite; php artisan ide-helper:meta ; php artisan ide-helper:eloquent
```

### Execute with composer

Add this command to `scripts` into `composer.json`

```json
{
  "scripts": {
    "helper": [
      "./vendor/bin/php-cs-fixer fix",
      "php artisan ide-helper:generate",
      "php artisan ide-helper:models --nowrite",
      "php artisan ide-helper:meta",
      "php artisan ide-helper:eloquent"
    ]
  }
}
```

And execute `composer helper`

## Assets

When you use `laravel-mix` to compile assets like `css` and `js`, this will create files into `public`. Add these files to `.gitignore` cause of differences between minified files on local and production.

```.gitignore[.gitignore]
/public/css
/public/js
/public/mix-manifest.json
```

## jsconfig.json

If you want to use Vue.js into Laravel with Visual Studio Code, you have to setup `jsconfig.json`

```bash
touch jsconfig.json
```

```json[jsconfig.json]
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "resources/js/*"
      ],
      "@Components/*": [
        "resources/js/Components/*"
      ]
    }
  },
  "exclude": [
    "node_modules",
    "public"
  ]
}
```

## API doc

## knuckleswtf/scribe

>Scribe helps you generate API documentation for humans from your Laravel/Lumen/Dingo codebase. See a live example at demo.scribe.knuckles.wtf. There's a Node.js version, too!

[**Official documentation**](https://scribe.knuckles.wtf/laravel/)

```bash
composer require --dev knuckleswtf/scribe
```

```bash
php artisan vendor:publish --tag=scribe-config
```

```bash
php artisan scribe:generate
```

## Laravel Swagger

<content-alert type="info"> GitHub
[**github.com/DarkaOnLine/L5-Swagger**](https://github.com/DarkaOnLine/L5-Swagger)
</content-alert>

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

```php[config/l5-swagger.php]
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
    'docs' => public_path('docs'), // generate doc into 'public'
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
npm i -D eslint eslint-plugin-vue prettier eslint-config-prettier eslint-plugin-prettier babel-eslint
```

<content-alert type="info"> Automatic config

```bash
./node_modules/.bin/eslint --init
```

</content-alert>

**OR**

<content-alert type="info"> Manual config

Create these files at the root of repository

```bash
touch .eslintrc.js
```

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

```bash
touch .prettierrc
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

</content-alert>

```json[package.json]
{
  "scripts": {
    "lint": "./node_modules/.bin/eslint resources/js/ --ext .js,.vue"
  }
}
```

## Tailwind CSS v2.0

### Vanilla

```bash
yarn add -D postcss postcss-import tailwindcss @tailwindcss/forms @tailwindcss/typography
```

```json[package.json]
{
  "devDependencies": {
    "@tailwindcss/forms": "^0.2.1",
    "@tailwindcss/typography": "^0.3.0",
    "laravel-mix": "^6.0.6",
    "postcss": "^8.1.14",
    "postcss-import": "^12.0.1",
    "tailwindcss": "^2.0.1"
  }
}
```

```js[webpack.mix.js]
const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js').vue()
  .postCss('resources/css/app.css', 'public/css', [
    require('postcss-import'),
    require('tailwindcss'),
  ])
  .webpackConfig(require('./webpack.config'));

if (mix.inProduction()) {
  mix.version();
}
```

```js[tailwind.config.js]
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './vendor/laravel/jetstream/**/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.vue',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
```

```css[resources/css/app.css]
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

```html[app.blade.php]
<!DOCTYPE html>
<html>
  <head>
    <!-- ... -->
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
  </head>
  <!-- ... -->
</html>
```

### Starter kit

First install a starter kit like [github.com/laravel/breeze](https://github.com/laravel/breeze) or [github.com/laravel/jetstream](https://github.com/laravel/jetstream), this will install Tailwind.

### Tailwind JIT

From [dyrynda.com.au/blog/using-tailwind-jit-with-laravel-mix](https://dyrynda.com.au/blog/using-tailwind-jit-with-laravel-mix)

```bash
yarn add -D @tailwindcss/jit tailwindcss postcss
```

```js[webpack.mix.js]
mix.postCss("resources/css/app.css", "public/css", [
    require("@tailwindcss/jit"),
    require("postcss-import"),
  ]);
```

```bash
yarn watch
```

## Blade Formatter

From [**Laravel Blade formatter**](https://marketplace.visualstudio.com/items?itemName=shufo.vscode-blade-formatter), install Extension from Vieusla Studio Code

In `settings.json`, add this

```json[settings.json]
{
  // ...
  "bladeFormatter.format.indentSize": 2,
  "bladeFormatter.format.enabled": true,
  "bladeFormatter.format.wrapAttributes": "auto",
  "bladeFormatter.format.wrapLineLength": 120,
}
```

<content-alert type="info"> Open `settings.json`

Execute <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> to open **Preferences: Open settings (JSON)

</content-alert>

To find other settings with Blade formatter, check page extension.
