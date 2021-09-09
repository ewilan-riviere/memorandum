---
title: Laravel
description: 'Search directly from Laravel'
position: 2
---

With Laravel you can create a small search engine based on models attributes, it's not a excellent search engine but it can be very useful for small apps

## Embedded

- [**Searching models using...**](https://freek.dev/1182-searching-models-using-a-where-like-query-in-laravel) on freek.dev

### Create Macro in `AppServiceProvider`

```php[app/Providers/AppServiceProvider.php]
<?php

namespace App\Providers;

use Arr;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Builder;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        Builder::macro('whereLike', function ($attributes, string $searchTerm) {
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

### Create controller

Here an example of `SearchController` of a books application

```php[routes/api.php]
Route::get('/search', [SearchController::class, 'index'])->name('api.search.index');
```

```php[app/Http/Controllers/Api/SearchController.php]
<?php

namespace App\Http\Controllers\Api;

use App\Models\Book;
use App\Models\Serie;
use App\Models\Author;
use Illuminate\Http\Request;
use App\Utils\BookshelvesTools;
use App\Http\Controllers\Controller;
use App\Http\Resources\EntityResource;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $searchTermRaw = $request->input('q');
        if ($searchTermRaw) {
            $searchTerm = mb_convert_encoding($searchTermRaw, 'UTF-8', 'UTF-8');
            $authors = Author::whereLike(['name', 'firstname', 'lastname'], $searchTerm)->with('media')->get();
            $series = Serie::whereLike(['title', 'authors.name'], $searchTerm)->with(['authors', 'media'])->get();
            $books = Book::whereLike(['title', 'authors.name', 'serie.title'], $searchTerm)->with(['authors', 'media'])->doesntHave('serie')->orderBy('serie_id')->orderBy('volume')->get();

            $authors = EntityResource::collection($authors);
            $series = EntityResource::collection($series);
            $books = EntityResource::collection($books);
            $collection = collect([]);
            $collection = $collection->merge($authors);
            $collection = $collection->merge($series);
            $collection = $collection->merge($books);

            return response()->json([
                'data' => $collection,
            ]);
        }

        return response()->json(['error' => 'Need to have terms query parameter'], 401);
    }
}
```

```php[app/Http/Resources/EntityResource.php]
<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Author\AuthorUltraLightResource;

class EntityResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        if ($request->relation) {
            $className = $request->relation;
            $className = $this->resource->$className;
            $className = get_class($className);

            $relation = $request->relation;
            $relation = $this->$relation;
        } else {
            $className = $this->resource;
            $className = get_class($className);

            $relation = $this->resource;
        }

        $entity = str_replace('App\Models\\', '', $className);
        $entity = strtolower($entity);

        return [
            'meta' => [
                'entity' => $entity,
                'author' => $relation->meta_author ?? null,
                'slug'   => $relation->slug,
                'show'   => $relation->show_link,
            ],
            'title'    => $relation->title ?? $relation->name,
            'authors'  => $relation->authors ? AuthorUltraLightResource::collection($relation->authors) : null,
            'serie'    => $relation->serie?->title,
            'language' => $relation->language?->slug,
            'volume'   => $relation->volume ?? null,
            'cover'    => [
                'thumbnail'     => $relation->cover_thumbnail,
                'original'      => $relation->cover_original,
                'simple'        => $relation->cover_simple,
                'color'         => $relation->cover_color,
            ],
            'first_char' => $relation->first_char,
        ];
    }
}
```

## `spatie/laravel-searcheable`

Previous guide was written on freek.dev, spatie blog. Spatie create a package for setup search on Laravel: [**github.com/spatie/laravel-searchable**](https://github.com/spatie/laravel-searchable)
