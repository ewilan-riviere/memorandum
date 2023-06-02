---
title: Laravel
---

# Laravel

```bash
composer create-project laravel/laravel example-app
```

## Dependencies

```bash
pnpm i
```

[https://github.com/kiwilan/steward-laravel](https://github.com/kiwilan/steward-laravel)

```bash
composer require kiwilan/steward-laravel:dev-main
php artisan vendor:publish --tag="steward-config"
mkdir .vscode
cat > .vscode/settings.json << EOF
{
  "laravel-pint.configPath": "vendor/kiwilan/steward-laravel/pint.json"
}
EOF
```

[https://github.com/barryvdh/laravel-ide-helper](https://github.com/barryvdh/laravel-ide-helper)

```bash
composer require --dev barryvdh/laravel-ide-helper
php artisan vendor:publish --provider="Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider" --tag=config
```

[laravel/telescope](https://laravel.com/docs/10.x/telescope)
[fruitcake/laravel-telescope-toolbar](https://github.com/fruitcake/laravel-telescope-toolbar)

```bash
composer require laravel/telescope
php artisan telescope:install
php artisan migrate
composer require fruitcake/laravel-telescope-toolbar --dev
```

[opcodesio/log-viewer](https://github.com/opcodesio/log-viewer)

```bash
composer require opcodesio/log-viewer
php artisan vendor:publish --tag="log-viewer-config"
```

[spatie/laravel-route-attributes](https://github.com/spatie/laravel-route-attributes)

```bash
composer require spatie/laravel-route-attributes
php artisan vendor:publish --provider="Spatie\RouteAttributes\RouteAttributesServiceProvider" --tag="config"
```

[spatie/laravel-ray](https://spatie.be/docs/ray)

```bash
composer require spatie/laravel-ray
```

[nunomaduro/larastan](https://github.com/nunomaduro/larastan)

```bash
composer require nunomaduro/larastan:^2.0 --dev
cat > phpstan.neon << EOF
includes:
  - ./vendor/nunomaduro/larastan/extension.neon

parameters:
  tmpDir: public/build/.phpstan

  paths:
    - app

  # The level 9 is the highest level
  level: 5

  checkMissingIterableValueType: false
EOF
```

## Scout

[laravel/scout](https://laravel.com/docs/10.x/scout)

```bash
composer require laravel/scout
php artisan vendor:publish --provider="Laravel\Scout\ScoutServiceProvider"
composer require meilisearch/meilisearch-php http-interop/http-factory-guzzle
echo "" >> .env
echo "SCOUT_DRIVER=collection # meilisearch/collection" >> .env
echo "MEILISEARCH_HOST=http://127.0.0.1:7700 # meilisearch/collection" >> .env
echo "MEILISEARCH_KEY=" >> .env
```

## Livewire

[livewire/livewire](https://laravel-livewire.com/)

```bash
composer require livewire/livewire
php artisan livewire:publish --config
pnpm i
```

[laravel/jetstream](https://jetstream.laravel.com/3.x/introduction.html)

```bash
composer require laravel/jetstream
php artisan jetstream:install livewire --dark
```

[artesaos/seotools](https://github.com/artesaos/seotools)

```bash
composer require artesaos/seotools
php artisan vendor:publish --provider="Artesaos\SEOTools\Providers\SEOToolsServiceProvider"
```

## Inertia

[inertiajs/inertia-laravel](https://inertiajs.com)
[laravel/jetstream](https://jetstream.laravel.com/3.x/introduction.html)

```bash
composer require laravel/jetstream
php artisan jetstream:install inertia --ssr --dark
pnpm i
```

[kiwilan/typescriptable-laravel](https://github.com/kiwilan/typescriptable-laravel)

```bash
composer require kiwilan/typescriptable-laravel
php artisan vendor:publish --tag="typescriptable-config"
pnpm add @kiwilan/typescriptable-laravel -D
```

## Tailwind CSS

```bash
mv postcss.config.js postcss.config.cjs
mv tailwind.config.js tailwind.config.cjs
```

```js [postcss.config.cjs]
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

```js [tailwind.config.cjs]
const defaultTheme = require('tailwindcss/defaultTheme')
const forms = require('@tailwindcss/forms')
const typography = require('@tailwindcss/typography')

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
}
```

## Filament

[filament/filament](https://filamentphp.com/)

```bash
composer require filament/filament:"^2.0"
php artisan vendor:publish --tag=filament-config
cat > database/seeders/EmptySeeder.php << EOF
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EmptySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => config('app.admin.email'),
            'password' => config('app.admin.password'),
        ]);
    }
}
EOF
php artisan db:seed --class=EmptySeeder
```

```php [database/seeders/DatabaseSeeder.php]
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            EmptySeeder::class
        ]);
    }
}
```


```php [app/Models/User.php]
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

```bash
mkdir -p app/Filament/Pages/Auth
cat > app/Filament/Pages/Auth/Login.php << EOF
<?php

namespace App\Filament\Pages\Auth;

use Filament\Http\Livewire\Auth\Login as BasePage;

class Login extends BasePage
{
    public function mount(): void
    {
        parent::mount();

        if ('local' === config('app.env')) {
            $this->form->fill([
                'email' => config('app.admin.email'),
                'password' => config('app.admin.password'),
                'remember' => true,
            ]);
        }
    }
}
EOF
```

```php [config/filament.php]
return [
    'auth' => [
        'guard' => env('FILAMENT_AUTH_GUARD', 'web'),
        'pages' => [
            'login' => \App\Filament\Pages\Auth\Login::class,
            // 'login' => \Filament\Http\Livewire\Auth\Login::class,
        ],
    ],
];
```

```php [config/app.php]
return [
  'admin' => [
      'email' => env('APP_ADMIN_EMAIL', 'superadmin@example.com'),
      'password' => env('APP_ADMIN_PASSWORD', 'password'),
  ],
];
```

## Front

```bash
pnpm add -D tailwindcss @tailwindcss/forms @tailwindcss/typography @tailwindcss/aspect-ratio postcss autoprefixer
npx tailwindcss init -p
pnpm add -D eslint typescript @antfu/eslint-config
cat > .eslintrc << EOF
{
    "extends": "@antfu",
    "rules": {
        "no-console": "warn"
    }
}
EOF
cat > .eslintignore << EOF
node_modules
public/build
public/dist
vendor
*.svg
*.html
EOF
echo "[*.{json,js,ts,vue,blade}]" >> .editorconfig
echo "indent_size = 2" >> .editorconfig
```

```bash
cat > tsconfig.json << EOF
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
            "@/*": ["./resources/js/*"],
            "@": ["./resources/js"]
        }
    },
    "include": [
        "resources/**/*.ts",
        "resources/**/*.{js,jsx,ts,tsx,vue}",
        "components.d.ts",
        "auto-imports.d.ts"
    ]
}
EOF
```

## Vite

```bash
mv vite.config.js vite.config.ts
```

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin/dist'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.js',
      ssr: 'resources/js/ssr.js',
      refresh: true,
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
  ],
})
```

-   replace `app.js` with `app.ts`
-   tasks
-   typescriptable
    -   "route" => "$route"
    -   page.props.auth.user => page.props.user

`package.json`

```json [package.json]
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## Backup

From [spatie/laravel-backup](https://spatie.be/docs/laravel-backup)

```bash
composer require spatie/laravel-backup
```

```bash
php artisan vendor:publish --provider="Spatie\Backup\BackupServiceProvider"
```

```php [config/app.php]
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

## Health

From [spatie/laravel-health](https://spatie.be/docs/laravel-health)

```bash
composer require spatie/laravel-health
```

```bash
php artisan vendor:publish --tag="health-config"
```

```bash
php artisan vendor:publish --tag="health-migrations"
php artisan migrate
```

```php [app/Console/Kernel.php]
protected function schedule(Schedule $schedule)
{
  $schedule->command(RunHealthChecksCommand::class)->everyMinute();
  $schedule->command(ScheduleCheckHeartbeatCommand::class)->everyMinute();
  $schedule->command(DispatchQueueCheckJobsCommand::class)->everyMinute();
}
```

```php [app/Providers/AppServiceProvider.php]
use Health;
use Illuminate\Support\ServiceProvider;
use Spatie\Health\Checks\Checks\CacheCheck;
use Spatie\Health\Checks\Checks\DatabaseCheck;
use Spatie\Health\Checks\Checks\DebugModeCheck;
use Spatie\Health\Checks\Checks\EnvironmentCheck;
use Spatie\Health\Checks\Checks\MeiliSearchCheck;
use Spatie\Health\Checks\Checks\OptimizedAppCheck;
use Spatie\Health\Checks\Checks\PingCheck;
use Spatie\Health\Checks\Checks\QueueCheck;
use Spatie\Health\Checks\Checks\ScheduleCheck;
use Spatie\Health\Checks\Checks\UsedDiskSpaceCheck;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Health::checks([
            OptimizedAppCheck::new(),
            DebugModeCheck::new(),
            EnvironmentCheck::new(),
            CacheCheck::new(),
            DatabaseCheck::new(),
            MeiliSearchCheck::new(),
            PingCheck::new()->url(config('app.url')),
            QueueCheck::new(),
            // RedisCheck::new(),
            ScheduleCheck::new(),
            UsedDiskSpaceCheck::new(),
            // HorizonCheck::new(),
            // SecurityAdvisoriesCheck::new(), // composer require spatie/security-advisories-health-check
            // CpuLoadCheck::new() // composer require spatie/cpu-load-health-check
            //     ->failWhenLoadIsHigherInTheLast5Minutes(2.0)
            //     ->failWhenLoadIsHigherInTheLast15Minutes(1.5),
            // DatabaseConnectionCountCheck::new() // composer require doctrine/dbal
            //     ->failWhenMoreConnectionsThan(100)
            // DatabaseTableSizeCheck::new() // composer require doctrine/dbal
            //     ->table('your_table_name', maxSizeInMb: 1_000)
            //     ->table('another_table_name', maxSizeInMb: 2_000),
        ]);
    }
}
```

## Production config

```php [app/Providers/AppServiceProvider.php]
<?php

namespace App\Providers;

use Filament\Facades\Filament;
use Filament\Navigation\NavigationItem;
use Health;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Opcodes\LogViewer\Facades\LogViewer;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // https://laravel.com/docs/10.x/eloquent-relationships#preventing-lazy-loading
        Model::preventLazyLoading(! $this->app->environment('production'));

        LogViewer::auth(function (Request $request) {
            if (! $this->app->environment('production')) {
                return true;
            }

            $user = Auth::user();

            if (! $user) {
                return false;
            }

            return $user->is_admin || $user->is_super_admin;
        });

        Health::checks([

        ]);

        Filament::serving(function () {
            Filament::registerViteTheme('resources/css/filament.css');
            Filament::registerNavigationItems([
                NavigationItem::make('Analytics')
                    ->url('https://matomo.git-projects.xyz', shouldOpenInNewTab: true)
                    ->icon('heroicon-o-presentation-chart-line')
                    ->activeIcon('heroicon-s-presentation-chart-line')
                    ->group('Settings')
                    ->sort(1),
                NavigationItem::make('Documentation')
                    ->url('/docs', shouldOpenInNewTab: true)
                    ->icon('heroicon-o-information-circle')
                    ->activeIcon('heroicon-s-information-circle')
                    ->group('Settings')
                    ->sort(1),
                NavigationItem::make('Log viewer')
                    ->url('/log-viewer', shouldOpenInNewTab: true)
                    ->icon('heroicon-o-chat')
                    ->activeIcon('heroicon-s-chat')
                    ->group('Settings')
                    ->sort(1),
            ]);
        });
    }
}
```


## After install

```bash
pnpm i
pnpm build
php artisan migrate:fresh --seed
./vendor/bin/pint --config vendor/kiwilan/steward-laravel/pint.json
php artisan ide-helper:generate
php artisan ide-helper:models --nowrite --reset
php artisan ide-helper:meta
php artisan ide-helper:eloquent
```

## Scripts

```json [composer.json]
{
  "scripts": {
    "post-update-cmd": [
      "@php artisan vendor:publish --tag=laravel-assets --ansi --force",
      "@php artisan filament:upgrade",
      "@php artisan optimize:clear",
      "./vendor/bin/pint --config vendor/kiwilan/steward-laravel/pint.json",
      "@php artisan ide-helper:generate",
      "@php artisan ide-helper:models --nowrite --reset",
      "php artisan ide-helper:meta",
      "@php artisan ide-helper:eloquent"
    ],
    "helper": [
      "./vendor/bin/pint --config vendor/kiwilan/steward-laravel/pint.json",
      "@php artisan ide-helper:generate",
      "@php artisan ide-helper:models --nowrite --reset",
      "php artisan ide-helper:meta",
      "@php artisan ide-helper:eloquent"
    ],
    "format": [
      "./vendor/bin/pint --config vendor/kiwilan/steward-laravel/pint.json"
    ],
    "analyse": ["phpstan analyse --ansi --memory-limit=4G"],
    "insights": ["php artisan insights --ansi --no-interaction"],
    "serve": [
      "Composer\\Config::disableProcessTimeout",
      "php artisan serve"
    ],
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
    "queue:listen": [
      "Composer\\Config::disableProcessTimeout",
      "php artisan queue:listen --tries=3 --timeout=3600"
    ]
  }
}
```
