---
title: "Queue: Redis"
description: Asynchronous tasks with Redis
---

# Queue: Redis

Redis is an open-source, in-memory key-value store used for fast caching, databases, and message brokering, supporting various data structures and offering ultra-low latency.

You can use Redis as a queue driver in Laravel, which is particularly useful for handling asynchronous tasks and more efficient job processing.

## Setup Redis

### Choose Redis client

Laravel supports two Redis clients: `phpredis` and `predis`. The `phpredis` extension is a native PHP extension, while `predis` is a pure PHP library (which can be slower).

#### predis/predis (slower)

To install `predis/predis`, you can use `composer`:

```sh
composer require predis/predis
```

#### phpredis (faster)

But you should prefer to use the `phpredis` extension for better performance. To install it, you can use the following command:

```sh
git clone https://github.com/phpredis/phpredis.git
cd phpredis
phpize
./configure
make
sudo make install
```

Then, add the extension to your `php.ini` file:

```ini:php.ini
extension=redis.so
```

Check if the extension is loaded:

```sh
php -m | grep redis
```

### Enable new queue driver

To use Redis as your queue driver, you need to update your `.env` file:

```bash:.env
REDIS_CLIENT=phpredis # `predis` or `phpredis`
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

And set the queue connection to Redis:

```bash:.env
QUEUE_CONNECTION=redis
```

### Create a job

You can create a new job using the Artisan command:

```sh
php artisan make:job TestJob
```

This will create a new job class in the `app/Jobs` directory. You can then implement the `handle` method to define the job's logic.

```php:app/Jobs/TestJob.php
<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class TestJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $message;

    /**
     * Create a new job instance.
     */
    public function __construct(string $message)
    {
        $this->message = $message;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Log dans laravel.log
        Log::info('Queue works! Message: '.$this->message);

        // Affiche dans le terminal si tu run php artisan queue:work
        echo 'Queue works! Message: '.$this->message.PHP_EOL;
    }
}
```

### Dispatch the job

You can dispatch the job using the `dispatch` method:

```bash
php artisan tinker
```

Then in the Tinker shell:

```bash
App\Jobs\TestJob::dispatch('Hello, Redis!');
```

### Process the queue

To process the queue, you can run the following command:

```sh
php artisan queue:work
```

## Laravel Horizon

Laravel Horizon is a dashboard and configuration tool for managing Redis queues in Laravel applications. It provides a beautiful interface to monitor your queues, jobs, and more.

- Official documentation: [Laravel Horizon](https://laravel.com/docs/master/horizon)
- Dashboard URL: `/horizon`

```sh
composer require laravel/horizon
```

Then publish the Horizon assets:

```sh
php artisan horizon:install
```

:::warning Valet
If you are using Laravel Valet, check your Valet configuration use same PHP version with Redis extension installed.

If you just installed the `phpredis` extension, you may need to restart Valet:

```sh
valet restart
```

And check Valet links

```sh
valet links
```
:::

### Error: `Class "Redis" not found`

If you encounter the error `Class "Redis" not found`, it means that the `phpredis` extension is not installed or not enabled in your PHP configuration.

To resolve it temporarily, you can run the following command to install the `predis/predis`:

```sh
composer require predis/predis
```

And enable it in your `.env` file:

```bash:.env
REDIS_CLIENT=predis
```

If Laravel Horizon works with `predis/predis`, you can keep using it, but for better performance, it's recommended to install the `phpredis` extension.

Check now if the `phpredis` extension is installed:

```sh
php -m | grep redis
```

If it works, Laravel Horizon should be able to connect to Redis without any issues, but if you still encounter the error, you may need to restart your web server or PHP-FPM service (or check if service like Valet is using the correct PHP version with the `phpredis` extension installed).
