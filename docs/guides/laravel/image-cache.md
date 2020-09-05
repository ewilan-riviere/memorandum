# Image cache

## Setup files

`app/Http/Controllers/ImageController.php`

:::details
<<< @/docs/guides/laravel/image-cache/ImageController.php
:::

`app/helpers.php`

:::details
<<< @/docs/guides/laravel/image-cache/helpers.php
:::

`composer.json`

:::details
```json
"autoload": {
  // ...
  "files": [
    "app/helpers.php"
  ]
},
```
:::

`config/image.php`

:::details
<<< @/docs/guides/laravel/image-cache/image.php
:::

`routes/web.php`

:::details
<<< @/docs/guides/laravel/image-cache/web.php
:::

## Create `cache`

Make sure to link storage

```bash
php artisan storage:link
```

Create a folder into `public/storage`

```bash
public
- storage
-- cache
```

## Setup rights

```bash
sudo chown -R $USER:www-data
```

```bash
sudo chmod ug+rwx storage bootstrap/cache
```
