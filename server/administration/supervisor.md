---
title: Supervisor
description: Supervisor is a client/server system that allows its users to monitor and control a number of processes on UNIX-like operating systems.
---

# Supervisor

{{ $frontmatter.description }}

## Installation

```sh
sudo apt install supervisor -y
```

In `/etc/supervisor/supervisord.conf`, check if this exist.

```sh:/etc/supervisor/supervisord.conf
[include]
files = /etc/supervisor/conf.d/*.conf
```

## Add configuration

Create a new configuration file for your application.

```sh
sudo vim /etc/supervisor/conf.d/app-name-worker.conf
```

Here an example for a Laravel application with PHP 8.2.

- Replace `app-name` with the name of your application.
- Replace `php8.2` with the PHP version you are using.
- Replace `/var/www/app-name` with the path to your application.
- Replace `nginx` with the user that runs the application.

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

When you create a new config, use these commands.

```sh
sudo supervisorctl reread
sudo supervisorctl update
```

## Usage

Start the supervisor worker with this command.

```sh
supervisorctl start app-name-worker
```

When you deploy a new app version, restart supervisor worker with this command.

```sh
supervisorctl restart app-name-worker
```

## Restart without sudo

To restart supervisor from CI, you have to allow restart without `sudo`.

```sh
sudo vim /etc/supervisor/supervisord.conf
```

Replace `USER` with your username, and `nginx` with the group that runs the application.

```sh:/etc/supervisor/supervisord.conf
[unix_http_server]
chown = USER:nginx # [!code ++]
```

Restart supervisor.

```sh
sudo service supervisor restart
```

Now `USER` can restart supervisor without `sudo`.

## List all workers

```sh
supervisorctl
```

Example of output.

```sh:output
app-name-worker                 RUNNING   pid 40598, uptime 0:03:30
```

## Global commands

If workers use command with local user, you have to add this user to the global commands. Here, the example is `/home/$USER/.cargo/bin/scout-seeker`, by default supervisor user, `nginx`, can't run this command.

Copy binary to `/usr/local/bin`.

```sh
sudo cp /home/$USER/.cargo/bin/scout-seeker /usr/local/bin
```

Verify that the binary is in the path for the supervisor user.

::: code-group

```sh [One line check]
sudo -u nginx which scout-seeker
```

```sh [Execute bash]
sudo su -l nginx -s /bin/bash
which scout-seeker
```

:::
