---
title: API documentation
description: Laravel API documentation
---

# API documentation

{{ $frontmatter.description }}

## API doc: knuckleswtf/scribe

> Scribe helps you generate API documentation for humans from your Laravel/Lumen/Dingo codebase. See a live example at demo.scribe.knuckles.wtf. There's a Node.js version, too!

[**Official documentation**](https://scribe.knuckles.wtf/laravel/)

```sh
composer require --dev knuckleswtf/scribe
```

```sh
php artisan vendor:publish --tag=scribe-config
```

```sh
php artisan scribe:generate
```
