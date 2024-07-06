---
title: Tools
description: Setup useful dependencies like PHP CS fixer, IDE Helper...
---

# Tools

{{ $frontmatter.description }}

## .editorconfig

```sh title=".editorconfig"
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 4
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false

[*.{yml,yaml,js,ts,vue,json}]
indent_size = 2

[docker-compose.yml]
indent_size = 4
```

## PHP linter

### Pint

From <https://github.com/laravel/pint>

```sh
composer require laravel/pint --dev
```

```sh
./vendor/bin/pint
```

To execute command global add to system composer

```sh
composer global require laravel/pint --dev
```

```json
{
  "scripts": {
    "format": ["pint"]
  }
}
```

```sh
touch pint.json
```

Update this with your rules from <https://mlocati.github.io/php-cs-fixer-configurator>, you can check [Configs](/notebook/linters/configs) for example.

### PHP CS Fixer

::alert{type=info}
[**github.com/FriendsOfPHP/PHP-CS-Fixer**](https://github.com/FriendsOfPHP/PHP-CS-Fixer)
::

Add this dependency to this project

```sh
composer require --dev friendsofphp/php-cs-fixer
```

Create `.php-cs-fixer.dist.php`

```sh
touch .php-cs-fixer.dist.php
```

You can check [Configs](/notebook/linters/configs) for example.

Add this to `.gitignore`

```sh title=".gitignore"
.php-cs-fixer.cache
```

Execute this command to fix all files

```sh
./vendor/bin/php-cs-fixer fix
```

Check [Config](/notebook/linters/configs/#composer-scripts) to add this to `composer.json` for automation.

## Laravel IDE Helper

::alert{type=info}
From [**github.com/barryvdh/laravel-ide-helper**](https://github.com/barryvdh/laravel-ide-helper)
::

```sh
composer require --dev barryvdh/laravel-ide-helper
```

```sh
php artisan vendor:publish --provider="Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider" --tag=config
```

```sh
php artisan ide-helper:generate
php artisan ide-helper:models --nowrite
php artisan ide-helper:meta
php artisan ide-helper:eloquent
```

Check [Config](/notebook/linters/configs/#composer-scripts) to add this to `composer.json` for automation.

## artesaos/seotools

From <https://github.com/artesaos/seotools>

```sh
composer require artesaos/seotools
```

```sh
php artisan vendor:publish --provider="Artesaos\SEOTools\Providers\SEOToolsServiceProvider"
```

## beyondcode/laravel-dump-server

From <https://github.com/beyondcode/laravel-dump-server>

```sh
composer require --dev beyondcode/laravel-dump-server
```

```sh
php artisan vendor:publish --provider="BeyondCode\DumpServer\DumpServerServiceProvider"
```

## nunomaduro/larastan

From <https://github.com/nunomaduro/larastan>

```sh
composer require nunomaduro/larastan --dev
```

```sh
touch phpstan.neon
```

```sh [phpstan.neon]
includes:
  - ./vendor/nunomaduro/larastan/extension.neon

parameters:
  tmpDir: .phpstan

  paths:
    - app

  # The level 9 is the highest level
  level: 5

  checkMissingIterableValueType: false
```

```sh [.gitignore]
.phpstan
```

## pestphp/pest

From <https://github.com/pestphp/pest>

```sh
composer require pestphp/pest --dev --with-all-dependencies
```

```sh
composer require pestphp/pest-plugin-laravel --dev
php artisan pest:install
```

```sh
./vendor/bin/pest
```

### spatie/phpunit-watcher

From <https://github.com/spatie/phpunit-watcher>

```sh
composer global require spatie/phpunit-watcher
```

```sh
touch .phpunit-watcher.yml
```

```yaml title=".phpunit-watcher.yml"
watch:
  directories:
    - app
    - config
    - tests
  fileMask: "*.php"
notifications:
  passingTests: false
  failingTests: false
phpunit:
  binaryPath: ./vendor/bin/pest
  arguments: --stop-on-failure
  timeout: 180
```

```sh
phpunit-watcher watch
```

## Log viewer

From <https://github.com/opcodesio/log-viewer>

```sh
composer require opcodesio/log-viewer
```

```sh
php artisan vendor:publish --tag="log-viewer-config"
```

To update route check `'route_path' => 'log-viewer'`

## composer.json scripts

You can check [Configs](/notebook/linters/configs) for example.

## Blade Formatter

From [**Laravel Blade formatter**](https://marketplace.visualstudio.com/items?itemName=shufo.vscode-blade-formatter), install Extension from Visual Studio Code.

```json title="settings.json"
{
  "[blade]": {
    "editor.defaultFormatter": "shufo.vscode-blade-formatter",
    "editor.tabSize": 4,
    "editor.formatOnSave": true
  }
}
```

::alert{type=info}
Open `settings.json`. Execute <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> to open \*\*Preferences: Open settings (JSON).
::

To find other settings with Blade formatter, check page extension.
