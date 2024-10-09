---
title: Production
description: Notes on deploying Laravel applications
---

# Production

{{ $frontmatter.description }}

## User and Group

Add current user to NGINX group

```sh
sudo usermod -a -G nginx $USER
```

## Permissions

Set permissions for Laravel application

```sh
sudo chown -R $USER:nginx /var/www/html # Change to your project path
sudo chgrp -R nginx storage bootstrap/cache
sudo chmod -R ug+rwx storage bootstrap/cache
```

::: info Optional
You can install Composer dependencies with only needed packages for production by running:

```sh
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader
```

This will install only the packages needed for production and will optimize the autoloader.
:::

## Reload `.env` in production

```sh
rm bootstrap/cache/config.php
php artisan config:cache
php artisan config:clear
php artisan cache:clear
```
