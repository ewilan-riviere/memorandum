---
title: Useful commands
description: ''
position: 1
category: 'Work in progress'
---

## PHP

Linux change PHP version

```bash
sudo update-alternatives --config php
```

## Laravel

Create `.env`

```bash
cp .env.example .env
```

Download `composer` dependencies

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

Linus setup permissions

```bash
sudo chown -R $USER:www-data * ; sudo chmod -R ug+rwx storage bootstrap/cache
```

Setup `key:generate` & `storage:link`

```bash
php artisan key:generate ; php artisan storage:link
```

Migrate database

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

Clear all

```bash
php artisan cache:clear ; php artisan config:clear ; php artisan route:clear
```

List routes (compact mode)

```bash
php artisan route:list --compact
```

[**laravel-ide-helper**](https://github.com/barryvdh/laravel-ide-helper) generate command

```bash
php artisan ide-helper:generate ; php artisan ide-helper:models ; php artisan ide-helper:meta
```

[**PHP-CS-Fixer**](https://github.com/FriendsOfPHP/PHP-CS-Fixer) fix all PHP files

```bash
./vendor/bin/php-cs-fixer fix
```

## MySQL database

```sql
CREATE DATABASE database_project;
SET GLOBAL validate_password.policy=LOW;
CREATE USER 'user_project'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password_secret';
GRANT ALL ON database_project.* TO 'user_project'@'localhost';
```

## Scoop update

Update common packages

```bash
sudo scoop update 7zip cacert composer curl dark doctl ffmpeg firacode git git-with-openssh glow gmkvextractgui hwmonitor innounp lessmsi make mkvtoolnix ngrok nssm nvm php-nts python rufus sudo symfony-cli touch Victor-Mono vim wget which windows-terminal yarn youtube-dl pandoc
```

Update medium/big and/or sensible packages

```bash
sudo scoop update discord firefox gimp googlechrome postman rust teamviewer vlc vscode mysql nginx
```

Update mobile development packages

```bash
sudo scoop update adb adopt8-hotspot android-sdk android-studio flutter
```
