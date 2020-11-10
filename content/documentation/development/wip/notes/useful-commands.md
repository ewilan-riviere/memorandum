---
title: Useful commands
description: ''
position: 3
category: 'Work in progress'
---

## PHP / Laravel

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

<code-group>
  <code-block label="Windows" active>

  ```bash
  php artisan key:generate ; php artisan storage:link
  ```

  </code-block>
  <code-block label="Linux">

  ```bash
  php artisan key:generate && php artisan storage:link
  ```

  </code-block>
</code-group>

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

<code-group>
  <code-block label="Windows" active>

  ```bash
  php artisan ide-helper:generate ; php artisan ide-helper:models ; php artisan ide-helper:meta
  ```

  </code-block>
  <code-block label="Linux">

  ```bash
  php artisan ide-helper:generate && php artisan ide-helper:models && php artisan ide-helper:meta
  ```

  </code-block>
</code-group>

```bash
.\vendor\bin\php-cs-fixer fix
```
