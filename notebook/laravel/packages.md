---
title: Packages
---

# Packages

## spatie/laravel-backup

From [spatie/laravel-backup](https://spatie.be/docs/laravel-backup)

```sh
composer require spatie/laravel-backup
php artisan vendor:publish --provider="Spatie\Backup\BackupServiceProvider"
```

```php:config/app.php
return [
    'debug' => (bool) env('APP_DEBUG', false),
    'backup' => (bool) env('APP_BACKUP', false),
];
```

```php [app/Console/Kernel.php]
protected function schedule(Schedule $schedule)
{
  if (config('app.backup')) {
    $schedule->command('backup:clean')->daily()->at('01:00');
    $schedule->command('backup:run')->daily()->at('01:30')
        ->onFailure(function () {
            $name = config('app.name');
            NotifyService::make()
                ->message("[{$name}] The backup failed to run. Please check the logs.")
                ->send()
            ;
        })
        ->onSuccess(function () {
            $name = config('app.name');
            NotifyService::make()
                ->message("[{$name}] The backup successfully ran.")
                ->send()
            ;
        })
    ;
  }
}
```

## blade-ui-kit/blade-icons

[blade-ui-kit/blade-icons](https://github.com/blade-ui-kit/blade-icons)

```sh
composer require blade-ui-kit/blade-icons
php artisan vendor:publish --tag=blade-icons
```

```php:config/blade-icons.php
<?php

[
  'sets' => [
    'default' => [
      'path' => 'resources/svg',
    ],
  ],
];
```

## itsgoingd/clockwork

[itsgoingd/clockwork](https://github.com/itsgoingd/clockwork)

```sh
composer require itsgoingd/clockwork
php artisan vendor:publish --provider="Clockwork\Support\Laravel\ClockworkServiceProvider"
```

## barryvdh/laravel-ide-helper

[https://github.com/barryvdh/laravel-ide-helper](https://github.com/barryvdh/laravel-ide-helper)

```sh
composer require --dev barryvdh/laravel-ide-helper
php artisan vendor:publish --provider="Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider" --tag=config
php artisan ide-helper:generate
php artisan ide-helper:models --nowrite --reset
php artisan ide-helper:meta
php artisan ide-helper:eloquent
```

## nunomaduro/larastan

[larastan/larastan](https://github.com/larastan/larastan)

```sh
composer require larastan/larastan:^2.0 --dev
cat > phpstan.neon << EOF
includes:
  - ./vendor/larastan/larastan/extension.neon

parameters:
  tmpDir: public/build/.phpstan

  paths:
    - app

  # The level 9 is the highest level
  level: 5

  checkMissingIterableValueType: false
EOF
```

## opcodesio/log-viewer

[opcodesio/log-viewer](https://github.com/opcodesio/log-viewer)

```sh
composer require opcodesio/log-viewer
php artisan vendor:publish --tag="log-viewer-config"
```

## laravel/pulse

```sh
composer require laravel/pulse
php artisan vendor:publish --provider="Laravel\Pulse\PulseServiceProvider"
php artisan migrate
php artisan vendor:publish --tag=pulse-config
```

## laravel/scout

[laravel/scout](https://laravel.com/docs/10.x/scout)

```sh
composer require laravel/scout
php artisan vendor:publish --provider="Laravel\Scout\ScoutServiceProvider"
composer require meilisearch/meilisearch-php http-interop/http-factory-guzzle
echo "" >> .env
echo "SCOUT_DRIVER=collection # meilisearch/collection" >> .env
echo "MEILISEARCH_HOST=http://127.0.0.1:7700 # meilisearch/collection" >> .env
echo "MEILISEARCH_KEY=" >> .env
```

## kiwilan/steward

[https://github.com/kiwilan/steward-laravel](https://github.com/kiwilan/steward-laravel)

```sh
composer require kiwilan/steward-laravel:dev-main
php artisan vendor:publish --tag="steward-config"
mkdir .vscode
cat > .vscode/settings.json << EOF
{
  "laravel-pint.configPath": "vendor/kiwilan/steward-laravel/pint.json"
}
EOF
```

## artesaos/seotools

[artesaos/seotools](https://github.com/artesaos/seotools)

```sh
composer require artesaos/seotools
php artisan vendor:publish --provider="Artesaos\SEOTools\Providers\SEOToolsServiceProvider"
```

## spatie/laravel-ray

[spatie/laravel-ray](https://spatie.be/docs/ray)

```sh
composer require spatie/laravel-ray
```

## spatie/route-attributes

[spatie/laravel-route-attributes](https://github.com/spatie/laravel-route-attributes)

```sh
composer require spatie/laravel-route-attributes
php artisan vendor:publish --provider="Spatie\RouteAttributes\RouteAttributesServiceProvider" --tag="config"
```

## laravel/telescope

[laravel/telescope](https://laravel.com/docs/10.x/telescope)
[fruitcake/laravel-telescope-toolbar](https://github.com/fruitcake/laravel-telescope-toolbar)

```sh
composer require laravel/telescope
php artisan telescope:install
php artisan migrate
composer require fruitcake/laravel-telescope-toolbar --dev
```

## kiwilan/typescriptable-laravel

[kiwilan/typescriptable-laravel](https://github.com/kiwilan/typescriptable-laravel)

```sh
composer require kiwilan/typescriptable-laravel
php artisan vendor:publish --tag="typescriptable-config"
pnpm add @kiwilan/typescriptable-laravel -D
```

```ts [vite.config.ts]
import { defineConfig } from "vite";
import typescriptable from "@kiwilan/typescriptable-laravel/vite";

export default defineConfig({
  plugins: [
    typescriptable({
      // Options
    }),
  ],
});
```
