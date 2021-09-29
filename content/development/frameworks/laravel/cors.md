---
title: CORS errors
description: 'How to manage CORS errors with Laravel.'
position: 7
category: 'Laravel'
---

## Setup CORS

You can use [**github.com/fruitcake/laravel-cors**](https://github.com/fruitcake/laravel-cors)

```bash
composer require fruitcake/laravel-cors
```

**fruitcake** is installed by default on recent installation of Laravel.

## CORS error when dump data

Sometimes even back-end have CORS config package, CORS error can be triggered if data is dump in controller. You can use **Postman** to check data. Don't forget to allow all for CORS:

```php[config/cors.php]
<?php

return [

    /*
     * You can enable CORS for 1 or multiple paths.
     * Example: ['api/*']
     */
    'paths' => ['api/*'],

    /*
    * Matches the request method. `[*]` allows all methods.
    */
    'allowed_methods' => ['*'],

    /*
     * Matches the request origin. `[*]` allows all origins.
     */
    'allowed_origins' => ['*'],

    /*
     * Matches the request origin with, similar to `Request::is()`
     */
    'allowed_origins_patterns' => ['*'],

    /*
     * Sets the Access-Control-Allow-Headers response header. `[*]` allows all headers.
     */
    'allowed_headers' => ['*'],

    /*
     * Sets the Access-Control-Expose-Headers response header.
     */
    'exposed_headers' => false,

    /*
     * Sets the Access-Control-Max-Age response header.
     */
    'max_age' => false,

    /*
     * Sets the Access-Control-Allow-Credentials header.
     */
    'supports_credentials' => false,
];
```
