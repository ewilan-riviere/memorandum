---
title: Notebook
description: Notes on various topics
---

# Notebook

{{ $frontmatter.description }}

## MySQL / MariaDB

::: code-group

```sh [mysql]
CREATE DATABASE my_project_database;
CREATE USER 'my_project_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'secret_password';
GRANT ALL ON my_project_database.* TO 'my_project_user'@'localhost';
```

```sh [mariadb]
CREATE DATABASE `my_project_database`;
CREATE USER 'my_project_user'@localhost IDENTIFIED BY 'super_secret_password';
GRANT ALL privileges ON my_project_database.* TO 'my_project_user'@localhost;
FLUSH PRIVILEGES;
```

:::

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
