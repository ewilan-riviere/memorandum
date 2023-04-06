---
title: Notebook
description: ''
---

# Notebook

Welcome on Notebook.

## MySQL

### New database

::code-group
  ```bash [mysql]
  CREATE DATABASE my_project_database;
  CREATE USER 'my_project_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'secret_password';
  GRANT ALL ON my_project_database.* TO 'my_project_user'@'localhost';
  ```
  ```bash [mariadb]
  CREATE DATABASE `my_project_database`;
  CREATE USER 'my_project_user'@localhost IDENTIFIED BY 'super_secret_password';
  GRANT ALL privileges ON my_project_database.* TO 'my_project_user'@localhost;
  FLUSH PRIVILEGES;
  ```
::

## Laravel

### Production rights

```bash
sudo chown -R $USER:www-data * ; sudo chmod -R ug+rwx storage bootstrap/cache
```

### Reload `.env`

```bash
rm bootstrap/cache/config.php
php artisan config:cache
php artisan config:clear
php artisan cache:clear
```
