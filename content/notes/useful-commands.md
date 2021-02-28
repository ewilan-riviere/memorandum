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
sudo scoop update 7zip ; sudo scoop update cacert ; sudo scoop update composer ; sudo scoop update curl ; sudo scoop update dark ; sudo scoop update doctl ; sudo scoop update ffmpeg ; sudo scoop update firacode ; sudo scoop update git ; sudo scoop update git-with-openssh ; sudo scoop update glow ; sudo scoop update gmkvextractgui ; sudo scoop update hwmonitor ; sudo scoop update innounp ; sudo scoop update lessmsi ; sudo scoop update make ; sudo scoop update mkvtoolnix ; sudo scoop update ngrok ; sudo scoop update nssm ; sudo scoop update nvm ; sudo scoop update php-nts ; sudo scoop update python ; sudo scoop update rufus ; sudo scoop update sudo ; sudo scoop update symfony-cli ; sudo scoop update touch ; sudo scoop update Victor-Mono ; sudo scoop update vim ; sudo scoop update wget ; sudo scoop update which ; sudo scoop update windows-terminal ; sudo scoop update yarn ; sudo scoop update youtube-dl ; sudo scoop update pandoc
```

Update medium/big and/or sensible packages

```bash
sudo scoop update discord ; sudo scoop update firefox ; sudo scoop update gimp ; sudo scoop update googlechrome ; sudo scoop update postman ; sudo scoop update rust ; sudo scoop update teamviewer ; sudo scoop update vlc ; sudo scoop update vscode ; sudo scoop update mysql ; sudo scoop update nginx
```

Update mobile development packages

```bash
sudo scoop update adb ; sudo scoop update adopt8-hotspot ; sudo scoop update android-sdk ; sudo scoop update android-studio ; sudo scoop update flutter
```
