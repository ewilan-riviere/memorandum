---
title: Starter Kits
---

# Starter Kits

## Jetstream Livewire

[laravel/jetstream](https://jetstream.laravel.com/3.x/introduction.html)

```sh
composer require laravel/jetstream
php artisan jetstream:install livewire --dark --pest
pnpm i
pnpm build
php artisan migrate
```

## Jetstream Inertia

[inertiajs/inertia-laravel](https://inertiajs.com)
[laravel/jetstream](https://jetstream.laravel.com/3.x/introduction.html)

```sh
composer require laravel/jetstream
php artisan jetstream:install inertia --dark --ssr --pest
pnpm i
pnpm build
php artisan migrate
```

## Livewire only

[livewire/livewire](https://livewire.laravel.com/)

```sh
composer require livewire/livewire
php artisan livewire:publish --config
pnpm i
```
