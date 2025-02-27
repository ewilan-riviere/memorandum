---
title: Vite
description: Installation Vite
---

# Installation

{{ $frontmatter.description }}

- <https://laravel.com/docs/9.x/vite>
- <https://github.com/laravel/vite-plugin/blob/main/UPGRADE.md>

## Node.js packages

```sh
pnpm i
```

```sh
pnpm remove axios lodash
```

```sh
pnpm add typescript -D
```

## Views

```php title="app/Providers/AppServiceProvider.php"
<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
  /**
   * Register any application services.
   */
  public function register()
  {
      //
  }

  /**
   * Bootstrap any application services.
   */
  public function boot()
  {
    View::addNamespace('front', resource_path('front'));
  }
}
```

```sh
mkdir resources/front
mkdir resources/front/components
mkdir resources/front/layouts
mkdir resources/front/pages
touch resources/front/global.d.ts

mv resources/css resources/front/css

mv resources/js resources/ts
mv resources/ts resources/front/ts
mv resources/front/ts/app.js resources/front/ts/app.ts

rm resources/front/ts/bootstrap.js
```

## tsconfig.json

```sh
touch tsconfig.json
```

```json title="tsconfig.json"
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "noImplicitAny": false,
    "lib": ["esnext", "dom"],
    "types": ["vite/client"],
    "typeRoots": ["./node_modules/@types", "resources/**/*.d.ts"],
    "paths": {
      "~": ["./resources"],
      "~/*": ["./resources/*"]
    }
  },
  "include": [
    "resources/**/*.ts",
    "resources/**/*.d.ts",
    "resources/**/*.tsx",
    "resources/**/*.vue"
  ],
  "exclude": [
    "resources/views/stubs",
    "resources/webreader/scripts/library",
    "resources/admin/auto-imports.d.ts"
  ]
}
```

## Vite

```sh
mv vite.config.js vite.config.ts
```

```ts title="vite.config.ts"
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/front/css/app.css", "resources/front/ts/app.ts"],
      refresh: ["resources/**"],
    }),
  ],
});
```

## Blade

```sh
mkdir resources/views/components
touch resources/views/components/app.blade.php
```

```html title="resources/views/components/app.blade.php"
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <title>@yield('title', app_name())</title>
    {{-- {!! SEO::generate() !!} --}}

    <link rel="icon" type="image/x+ico" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />

    {{--
    <script src="{{ asset('/color-mode.js') }}"></script>
    --}} @stack('head') @stack('styles') {{-- @livewireStyles --}}
  </head>

  <body
    class="{{ config('app.env') === 'local' ? 'debug-screens' : '' }} color-mode"
  >
    {{ $slot }} @stack('modals') @stack('scripts') {{-- @livewireScripts --}}
  </body>
</html>
```

### Layout

```sh
touch resources/front/layouts/app.blade.php
```

```html title="resources/front/layouts/app.blade.php"
<x-app>
  @push('head') @vite(['resources/front/css/app.css',
  'resources/front/ts/app.ts']) @endpush @yield('default')
</x-app>
```

### Page

```sh
touch resources/front/pages/index.blade.php
```

```html title="resources/front/pages/index.blade.php"
@extends('front::layouts.app') @section('default') Content @endsection
```

## Controller

```sh
php artisan make:controller Front/FrontController
```

```php title="app/Http/Controllers/Front/FrontController.php"
<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;

class FrontController extends Controller
{
  public function index()
  {
    return view('front::pages.index');
  }
}
```

## Routes

```php title="routes/web.php"
Route::get('/', [FrontController::class, 'index'])->name('front.index');
```

### spatie/laravel-route-attributes

```sh
composer require spatie/laravel-route-attributes
```

```sh
php artisan vendor:publish --provider="Spatie\RouteAttributes\RouteAttributesServiceProvider" --tag="config"
```

```php title="config/route-attributes.php"
<?php

return [
  // ...
  'directories' => [
    // app_path('Http/Controllers'),
  ],
  // ...
];
```

```php title="app/Providers/RouteServiceProvider.php"
<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Spatie\RouteAttributes\RouteRegistrar;

class RouteServiceProvider extends ServiceProvider
{
  public const HOME = '/home';

  public function boot()
  {
    $this->configureRateLimiting();

    $this->routes(function () {
        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'))
        ;

        Route::middleware('web')
            ->group(base_path('routes/web.php'))
        ;
    });

    Route::name('front.')
      ->group(
        fn () => (new RouteRegistrar(app(Router::class)))
          ->useRootNamespace(app()->getNamespace())
          ->useMiddleware(['web'])
          ->registerDirectory(app_path('Http/Controllers/Front'))
      )
    ;

    // Route::prefix('api')
    //   ->name('api.')
    //   ->group(
    //     fn () => (new RouteRegistrar(app(Router::class)))
    //       ->useRootNamespace(app()->getNamespace())
    //       ->useMiddleware(['api'])
    //       ->registerDirectory(app_path('Http/Controllers/Api'))
    //   )
    // ;
  }

  // ...
}
```

```php title="app/Http/Controllers/Front/FrontController.php"
<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Spatie\RouteAttributes\Attributes\Get;

class FrontController extends Controller
{
  #[Get('/', name: 'front.index')]
  public function index()
  {
    return view('front::pages.index');
  }
}
```

```diff title="routes/web.php"
<?php

- Route::get('/', [FrontController::class, 'index'])->name('front.index');
```
