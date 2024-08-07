---
title: Search
description: Enable search
---

# Search

{{ $frontmatter.description }}

## `whereLike` with `AppServiceProvider`

From [freek.dev](https://freek.dev/1182-searching-models-using-a-where-like-query-in-laravel)

```php title="app/Providers/AppServiceProvider.php"
<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Builder;
// use Illuminate\Support\Arr;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
  /**
   * Register any application services.
   */
  public function register()
  {
    Builder::macro('whereLike', function (array $attributes, string $searchTerm) {
      // @phpstan-ignore-next-line
      $this->where(function (Builder $query) use ($attributes, $searchTerm) {
        foreach (Arr::wrap($attributes) as $attribute) {
          $query->when(
            str_contains($attribute, '.'),
            function (Builder $query) use ($attribute, $searchTerm) {
              [$relationName, $relationAttribute] = explode('.', $attribute);

              $query->orWhereHas($relationName, function (Builder $query) use ($relationAttribute, $searchTerm) {
                $query->where($relationAttribute, 'LIKE', "%{$searchTerm}%");
              });
            },
            function (Builder $query) use ($attribute, $searchTerm) {
              $query->orWhere($attribute, 'LIKE', "%{$searchTerm}%");
            }
          );
        }
      });

      return $this;
    });
  }
}
```

```php title="app/Http/Controllers/SearchController.php"
<?php

namespace App\Http\Controllers;

use App\Models\ContentDocument;
use Illuminate\Http\Request;

class SearchController extends Controller
{
  public function index(Request $request)
  {
    $results = ContentDocument::whereLike([
      'title',
      'category',
      'parent',
    ], $request->search)
      ->get()
    ;
  }
}
```

## Meilisearch with Laravel Scout

From [laravel.com/docs/9.x/scout](https://laravel.com/docs/9.x/scout) and [meilisearch.com](https://www.meilisearch.com)

```sh
composer require laravel/scout
```

```sh
php artisan vendor:publish --provider="Laravel\Scout\ScoutServiceProvider"
```

```sh
composer require meilisearch/meilisearch-php http-interop/http-factory-guzzle
```

```yaml [.env]
SCOUT_DRIVER=collection # collection/meilisearch
MEILISEARCH_HOST=http://127.0.0.1:7700
MEILISEARCH_KEY=
```

```php title="app/Models/Example.php"
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Example extends Model
{
  use HasFactory;
  use Searchable;

  protected $fillable = [
    'title',
    'category',
    'description',
  ];

  public function searchableAs()
  {
      return Str::slug(config('app.name').'_example', '_');
  }

  public function toSearchableArray()
  {
    return [
      'title' => $this->title,
      'category' => $this->category,
      'description' => $this->description,
    ];
  }
}
```

## `spatie/searchable`

From [github.com/spatie/laravel-searchable](https://github.com/spatie/laravel-searchable)
