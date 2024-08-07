---
title: Octane
description: Server on steroids
---

# Octane

{{ $frontmatter.description }}

From [https://laravel.com/docs/9.x/octane](https://laravel.com/docs/9.x/octane)

After [`swoole`](/server/binaries/swoole) and [`supervisor`](/frameworks/laravel/queue-jobs-schedule) installation on your server.

```sh
composer require laravel/octane
```

Choose `swoole` with install command

```sh
php artisan octane:install
```

Update octane config file

```php
'server' => env('OCTANE_SERVER', 'swoole'),

// ...

'swoole' => [
    'options' => [
        'log_file' => storage_path('logs/swoole_http.log'),
        'package_max_length' => 10 * 1024 * 1024,
    ],
],
```

Update NGINX config for this project

```sh
map $http_upgrade $connection_upgrade {
  default upgrade;
  '' close;
}

server {
  listen 80;
  listen [::]:80;
  server_name domain.com;
  server_tokens off;
  root /path/to/project/public

  index index.php;

  charset utf-8;

  location /index.php {
    try_files /not_exists @octane;
  }

  location / {
    try_files $uri $uri/ @octane;
  }

  location = /favicon.ico {
    access_log off; log_not_found off;
  }
  location = /robots.txt {
    access_log off; log_not_found off;
  }

  access_log off;
  error_log /var/log/nginx/kogu.log error;
  access_log /var/log/nginx/kogu.log;

  location ~ \.php$ {
    fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
    fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
    include fastcgi_params;
  }

  location @octane {
    set $suffix "";

    if ($uri = /index.php) {
      set $suffix ?$query_string;
    }

    proxy_http_version 1.1;
    proxy_set_header Host $http_host;
    proxy_set_header Scheme $scheme;
    proxy_set_header SERVER_PORT $server_port;
    proxy_set_header REMOTE_ADDR $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;

    proxy_pass http://127.0.0.1:8090$suffix;
  }
}
```

Update PHP version: `fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;`

Select an empty port: `proxy_pass http://127.0.0.1:8090$suffix;`

```sh
[program:project-octane-worker]

process_name=%(program_name)s_%(process_num)02d
command=php /path/to/project/artisan octane:start --server=swoole --max-requests=1000 --port=8090
autostart=true
autorestart=true
user=www-data
redirect_stderr=true
stdout_logfile=/var/log/supervisor/project-octane-worker.log
stopwaitsecs=3600
```

Update port: `--port=8090`

Refresh supervisor

```sh
sudo supervisorctl reread
sudo supervisorctl update
```

Start worker

```sh
supervisorctl start project-octane-worker:project-octane-worker_00
```

Add to CI

```sh
supervisorctl restart project-octane-worker:project-octane-worker_00
```

Update `.env` from project

```sh
OCTANE_HTTPS=true
```

Clear Laravel cache

```sh
php artisan config:cache
php artisan config:clear
php artisan cache:clear
```

Octane is ready.
