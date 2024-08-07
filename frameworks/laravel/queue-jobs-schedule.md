---
title: "Queue: jobs & schedule"
description: Asynchronous tasks
---

# Queue: jobs & schedule

{{ $frontmatter.description }}

Laravel queue docs: <https://laravel.com/docs/master/queues>

## Jobs

In this guide, the queue driver will be database, you have to config your application to use database.

```sh
php artisan queue:table
```

```yaml title=".env"
QUEUE_CONNECTION=database
```

```sh
php artisan migrate
```

### Usage

Create a new Job

```sh
php artisan make:job ProcessHeavyServerTask
```

```php title="app/Jobs/ProcessHeavyServerTask.php"
<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Log;

class ProcessHeavyServerTask implements ShouldQueue
{
  use Dispatchable;
  use InteractsWithQueue;
  use Queueable;
  use SerializesModels;

  /**
   * Create a new job instance.
   */
  public function __construct(
    public mixed $param,
    public mixed $param_alt,
  ) {
  }

  /**
   * Execute the job.
   */
  public function handle()
  {
    // Very heavy server task...

    Log::debug('Success on job '.now());
  }

  public function failed(\Throwable $exception)
  {
    Log::error('Error on job');
  }
}
```

Call job

```php title="app/Http/Controller/MainController.php"
<?php

class MainController extends Controller
{
  public function index()
  {
    $param = [];
    $param_alt = true;

    ProcessHeavyServerTask::dispatch($param, $param_alt);
  }
}
```

### Execute

If you change anything into your job, you have to re-run the command. And for EVERY deployment, you have to restart `supervisor`.

#### Local

```sh
php artisan queue:work --queue
```

#### Server

Install `supervisor`.

:::tip

Replace `app-name` with the name of your application.

:::

```sh
sudo apt install supervisor -y
```

```sh
cd /etc/supervisor/conf.d
```

```sh
sudo vim /etc/supervisor/conf.d/app-name-worker.conf
```

```sh [/etc/supervisor/conf.d/app-name-worker.conf]
[program:app-name-worker]
process_name=%(program_name)s
command=php8.2 /var/www/app-name/artisan queue:work database --sleep=3 --tries=3
autostart=true
autorestart=true
user=nginx
numprocs=1
redirect_stderr=true
stdout_logfile=/var/www/app-name/storage/logs/worker.log
stopwaitsecs=3600
```

In `/etc/supervisor/supervisord.conf`, check if this exist.

```sh:/etc/supervisor/supervisord.conf
[include]
files = /etc/supervisor/conf.d/*.conf
```

When you create a new config, use these commands.

```sh
sudo supervisorctl reread
sudo supervisorctl update
```

::: info
**Manage restart without sudo**

To restart supervisor from CI, you have to allow restart without `sudo`.

```sh
sudo vim /etc/supervisor/supervisord.conf
```

Replace `USER` with your username.

```sh:/etc/supervisor/supervisord.conf
[unix_http_server]
chown = USER:nginx # [!code ++]
```

Restart supervisor.

```sh
sudo service supervisor restart
```

Now `USER` can restart supervisor without `sudo`.
:::

```sh
supervisorctl start app-name-worker
```

When you deploy a new app version, restart supervisor worker with this command.

```sh
supervisorctl restart app-name-worker
```

Example with `bookshelves` app.

```sh
supervisorctl start bookshelves-worker
```

##### List all workers

```sh
supervisorctl
```

Example of output.

```sh:output
app-name-worker                 RUNNING   pid 40598, uptime 0:03:30
```

Restart it.

```sh
supervisorctl start app-name-worker
```

### Add it to CI

Add to your CI config or `post-merge` Git hook.

```yaml [.gitlab-ci.yml]
deploy-job:
  stage: deploy
  script:
    - supervisorctl restart app-name-worker
  only:
    - main
```

## Schedule

```php [app/Console/Kernel.php]
<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Console\Commands\AnyCommand;

class Kernel extends ConsoleKernel
{
  protected function schedule(Schedule $schedule)
  {
    $schedule->command(AnyCommand::class, ['argument', '--option'])->daily();
  }
}
```

### Shell commands

```php [app/Console/Kernel.php]
protected function schedule(Schedule $schedule)
{
  $schedule->exec('node /home/forge/script.js')->daily();
}
```

### Cheatsheet

List schedule

```sh
php artisan schedule:list
```

Run schedule

```sh
php artisan schedule:run
```

Keep schedule running

```sh
php artisan schedule:work
```

### Run in production

Set `php` version into cron with `php8.1`. Just use `crontab`.

```sh
crontab -e
```

```sh
* * * * * cd /path/to/project && php8.1 artisan schedule:run >> /dev/null 2>&1
```
