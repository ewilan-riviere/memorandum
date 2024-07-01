---
title: Notebook
description: Notes on various topics
---

# Notebook

{{ $frontmatter.description }}

## Laravel

### Production rights

```sh
sudo chown -R $USER:www-data laravel-app

sudo chmod -R 775 laravel-app/storage laravel-app/bootstrap/cache

find laravel-app -type d -exec chmod 755 {} \;
find laravel-app -type f -exec chmod 644 {} \;

cd laravel-app
php artisan cache:clear
```

And push to git.

```sh
sudo chown -R $USER:www-data * ; sudo chmod -R ug+rwx storage bootstrap/cache
```

### Reload `.env` in production

```sh
rm bootstrap/cache/config.php
php artisan config:cache
php artisan config:clear
php artisan cache:clear
```
