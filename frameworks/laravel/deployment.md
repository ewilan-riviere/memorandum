---
title: Deployment
description: Deploy Laravel
---

# Deployment

{{ $frontmatter.description }}

- <https://stackoverflow.com/questions/30639174/how-to-set-up-file-permissions-for-laravel>
- <https://www.tutsmake.com/laravel-8-how-to-set-up-file-permissions>
- <https://laravel.com/docs/9.x/deployment>

```sh
sudo chown -R www-data:www-data vendor
sudo chown -R www-data:www-data storage
sudo usermod -a -G www-data userName
sudo chmod -R 775 repository
```

```sh
php artisan cache:clear
php artisan config:clear
sudo service php7.4-fpm stop
sudo service nginx stop

sudo chown -R $USER:www-data storage
sudo chown -R $USER:www-data bootstrap/cache
chmod -R 775 storage
chmod -R 755 bootstrap/cache
sudo service php7.4-fpm start && sudo service nginx start
```
