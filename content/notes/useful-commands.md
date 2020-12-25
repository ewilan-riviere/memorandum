---
title: Useful commands
description: ''
position: 1
category: 'Work in progress'
---

## PHP

```bash
sudo update-alternatives --config php
```

## Laravel

```bash
cp .env.example .env
```

<code-group>
  <code-block label="Composer" active>

  ```bash
  composer install
  ```

  </code-block>
  <code-block label="Ignore">

  ```bash
  composer install --ignore-platform-reqs
  ```

  </code-block>
</code-group>

```bash
sudo chgrp -R www-data storage bootstrap/cache ; sudo chmod -R ug+rwx storage bootstrap/cache
```

```bash
php artisan key:generate ; php artisan storage:link
```

<code-group>
  <code-block label="Migrate" active>

  ```bash
  php artisan migrate:fresh
  ```

  </code-block>
  <code-block label="Seeding">

  ```bash
  php artisan migrate:fresh --seed
  ```

  </code-block>
</code-group>

```bash
php artisan route:list --compact
```

```bash
php artisan ide-helper:generate ; php artisan ide-helper:models ; php artisan ide-helper:meta
```

```bash
.\vendor\bin\php-cs-fixer fix
```

```bash
php artisan cache:clear ; php artisan config:clear ; php artisan route:clear
```
