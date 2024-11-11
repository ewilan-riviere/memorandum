---
title: Fresh project
description: Fresh Laravel project
---

# Fresh project

{{ $frontmatter.description }}

```sh
composer create-project laravel/laravel example-app
```

```sh
pnpm i
```

## AppServiceProvider

```php [app/Providers/AppServiceProvider.php]
<?php

namespace App\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
  public function boot(): void
  {
    \Illuminate\Support\Facades\Blade::directive('loop', fn ($expression) => "<?php foreach ($expression): ?>");
    \Illuminate\Support\Facades\Blade::directive('endloop', fn ($expression) => '<?php endforeach; ?>');

    \Illuminate\Database\Eloquent\Model::preventLazyLoading(! $this->app->environment('production'));

    // for `opcodesio/log-viewer`
    \Opcodes\LogViewer\Facades\LogViewer::auth(function (Request $request) {
      if (! $this->app->environment('production')) {
        return true;
      }

      $user = Auth::user();

      if (! $user) {
        return false;
      }

      return $user->is_admin || $user->is_super_admin;
    });
  }
}
```

## composer.json

```json:composer.json
{
  "scripts": {
    "post-update-cmd": [
      "@php artisan vendor:publish --tag=laravel-assets --ansi --force",
      "@php artisan filament:upgrade",
      "@php artisan optimize:clear",
      "./vendor/bin/pint",
      "@php artisan ide-helper:generate",
      "@php artisan ide-helper:models --nowrite --reset",
      "php artisan ide-helper:meta",
      "@php artisan ide-helper:eloquent"
    ],
    "helper": [
      "./vendor/bin/pint",
      "@php artisan ide-helper:generate",
      "@php artisan ide-helper:models --nowrite --reset",
      "php artisan ide-helper:meta",
      "@php artisan ide-helper:eloquent"
    ],
    "format": ["./vendor/bin/pint"],
    "analyse": ["phpstan analyse --ansi --memory-limit=4G"],
    "serve": ["Composer\\Config::disableProcessTimeout", "php artisan serve"],
    "test": ["@php artisan test"],
    "test:filter": ["@php artisan test --filter"],
    "test:watch": [
      "Composer\\Config::disableProcessTimeout",
      "phpunit-watcher watch"
    ],
    "test:filter:watch": [
      "Composer\\Config::disableProcessTimeout",
      "phpunit-watcher watch --filter"
    ],
    "queue": [
      "Composer\\Config::disableProcessTimeout",
      "php artisan queue:listen --tries=3 --timeout=3600"
    ]
  }
}
```
