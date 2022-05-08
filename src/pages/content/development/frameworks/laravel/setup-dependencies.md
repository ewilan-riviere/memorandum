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

## Packages

### PHP CS Fixer

::: info
[**github.com/FriendsOfPHP/PHP-CS-Fixer**](https://github.com/FriendsOfPHP/PHP-CS-Fixer)
:::

Add this dependency to this project.

```bash
composer require --dev friendsofphp/php-cs-fixer
```

Create `.php-cs-fixer.dist.php` at root of repository.

```bash
touch .php-cs-fixer.dist.php
```

Configure `.php-cs-fixer.dist.php`, check [documentation](https://mlocati.github.io/php-cs-fixer-configurator) to get rules.

```php:.php-cs-fixer.dist.php
<?php

/**
 * Rules
 * https://mlocati.github.io/php-cs-fixer-configurator.
 */
$rules = [
  '@PhpCsFixer' => true,
  'no_empty_comment' => false,
  'no_extra_blank_lines' => [
    'tokens' => [
      'extra',
      'throw',
      'use',
    ],
  ],
  'not_operator_with_successor_space' => true,
  'php_unit_method_casing' => false,
  'single_line_comment_style' => false,
  'phpdoc_single_line_var_spacing' => true,
  'php_unit_internal_class' => false,
  'php_unit_test_class_requires_covers' => false,
  'lambda_not_used_import' => false,
  'return_assignment' => true,
  'phpdoc_to_comment' => false,
  'ordered_imports' => [
    'imports_order' => [
      'class', 'function', 'const',
    ],
    'sort_algorithm' => 'alpha',
  ],
  'array_indentation' => true,
  'array_syntax' => true,
  'blank_line_after_opening_tag' => true,
  'blank_line_before_statement' => false,
  'no_unused_imports' => true,
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
.php-cs-fixer.cache
```

Execute this command to fix all files

```bash
./vendor/bin/php-cs-fixer fix
```

### Laravel IDE Helper

::: info
[**github.com/barryvdh/laravel-ide-helper**](https://github.com/barryvdh/laravel-ide-helper)
:::

Add to `composer.json`.

```bash
composer require --dev barryvdh/laravel-ide-helper
```

Generate helpers.

```bash
php artisan ide-helper:generate
php artisan ide-helper:models --nowrite
php artisan ide-helper:meta
php artisan ide-helper:eloquent
```

### Execute with composer

Add this command to `scripts` into `composer.json`

```json:composer.json
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

## Assets

When you use `laravel-mix` to compile assets like `css` and `js`, this will create files into `public`. Add these files to `.gitignore` cause of differences between minified files on local and production.

```.gitignore:.gitignore
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

## ESLint

Useful with ESLint and Vue

```bash
npm i -D eslint eslint-plugin-vue prettier eslint-config-prettier eslint-plugin-prettier babel-eslint
```

### Configuration

Automatic config :

```bash
./node_modules/.bin/eslint --init
```

Manual config :

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

```json[package.json]
{
  "scripts": {
    "lint": "./node_modules/.bin/eslint resources/js/ --ext .js,.vue"
  }
}
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

::: info

Open `settings.json`

Execute <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> to open **Preferences: Open settings (JSON)

:::

To find other settings with Blade formatter, check page extension.
