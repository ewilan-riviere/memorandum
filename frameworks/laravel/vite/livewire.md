---
title: Livewire
description: Add Livewire
---

# Livewire

{{ $frontmatter.description }}

From [laravel-livewire.com](https://laravel-livewire.com/)

## Install

Install `livewire/livewire`.

```sh
composer require livewire/livewire
```

Create an example component

```sh
php artisan make:livewire counter
```

Add blade directives into `app.blade.php`.

```html title="resources/views/components/app.blade.php"
<!DOCTYPE html>
<html>
  <head>
    @livewireStyles
  </head>

  <body>
    {{ $slot }} @livewireScripts
  </body>
</html>
```

## Configuration

Restart `pnpm dev`.

```sh
php artisan livewire:publish --config
```

## filamentphp/filament

```sh
composer require filament/filament:"^2.0"
```

```json title="composer.json"
"post-update-cmd": [
    // ...
    "@php artisan filament:upgrade"
],
```

```php title="app/Models/User.php"
<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements FilamentUser
{
    // ...

    public function canAccessFilament(): bool
    {
        return str_ends_with($this->email, '@yourdomain.com') && $this->hasVerifiedEmail();
    }
}
```

```sh
php artisan vendor:publish --tag=filament-config
```
