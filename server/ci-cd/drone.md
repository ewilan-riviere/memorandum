---
title: Drone
description: Auto deploy your work from git forge
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

When you push some modifications on your repo, your server not update automatically. If you use **webhooks**, you can send **push event** to your server execute `git pull` on your repo. But we need to receive this push event, it's call a **payload**, we have to configure server to receive it and update repository.

## Install drone

> Drone project is designed by [**adr1enbe4udou1n**](https://github.com/adr1enbe4udou1n), I just clone his project, thanks to him!

To watch **payloads**, we need to have a tool to receive it. It's goal of [**drone project**](https://gitlab.com/ewilan-riviere/drone), just clone it on your server, where you want. It's NodeJS app, so use **PM2** to manage it.

::: warning
If you don't have PM2 or Node.js installed, check [**Node.js**](/server/binaries/nodejs) and [**PM2**](/server/nginx/nodejs-pm2) documentation.
:::

Clone project

```sh
cd ~
git clone https://gitlab.com/ewilan-riviere/drone
```

Create `ecosystem.config.js` file

::: info
Replace `my-user` with your username.
:::

```js:~/ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "drone",
      script: "index.js",
      cwd: "/home/my-user/drone",
      env: {
        PORT: 3000,
      },
    },
  ],
};
```

Then configure `.env` file, just copy `.env.example` to `.env` and fill it with infos:

```yaml [~/drone-manual/.env]
PORT=3000
WEBHOOK_PATH=/deploy
WEBSCRIPT_PATH=
SCRIPT_KEY=
PROJECTS_ROOT=/home/my-user/www/
```

- `PORT`: port to deploy drone, 3000 by default
- `WEBHOOK_PATH`: url where drone listen, when we will configure Nginx, we use `deploy.domain.com`, so listen url will be `deploy.domain.com/deploy`
- `PROJECTS_ROOT`: absolute path where repositories cloned

Then create `repositories.json` into repo. It will useful only if remote have different name of cloned repo. But you need to have this file, even it's empty file.

```json:~/drone/repositories.json
{
  "portfolio": ["portfolio"]
}
```

::: info
Int his example, we use a domain `deploy.domain.com` to receive payloads. You have to buy a domain from any registrar, then configure it to point on your server.
:::

Then configure NGINX like it:

- `server_name`: example url `deploy.domain.com`
- `location /deploy`: like **WEBHOOK_PATH** define in `.env` file
- `proxy_pass`: **3000** is the **PORT** define in `.env` file

Don't forget to enable this config.

::: details NGINX config

```nginx:/etc/nginx/conf.d/deploy.domain.com.conf
server {
    listen 80;

    server_name deploy.domain.com;

    location / {
        try_files $uri $uri/ =404;
    }

    location /deploy {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location ~ ^/(status56|ping56) {
        access_log off;
        allow 127.0.0.1;
        deny all;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_pass unix:/run/php/php5.6-fpm.sock;
    }

    location ~ ^/(status70|ping70) {
        access_log off;
        allow 127.0.0.1;
        deny all;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_pass unix:/run/php/php7.0-fpm.sock;
    }

    location ~ ^/(status71|ping71) {
        access_log off;
        allow 127.0.0.1;
        deny all;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_pass unix:/run/php/php7.1-fpm.sock;
    }

    location ~ ^/(status72|ping72) {
        access_log off;
        allow 127.0.0.1;
        deny all;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_pass unix:/run/php/php7.2-fpm.sock;
    }

    location ~ ^/(status73|ping73) {
        access_log off;
        allow 127.0.0.1;
        deny all;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_pass unix:/run/php/php7.3-fpm.sock;
    }

    location /nginx_status {
        access_log off;
        allow 127.0.0.1;
        deny all;
        stub_status;
    }
}
```

:::

## Git forge payload

GitHub example, webhooks are available into **Settings/Webhooks**. If you haven't configure HTTPS on your Nginx config disable **SSL verification**.

## Deployment

When Drone is activated, it will execute a `git pull` on server's repository when you push anything on this repository. The next step is to configure a Git hook to execute some commands like `npm install` or `composer install` for example.

To know more about this, check [**Git hooks**](/server/ci-cd/git-hooks) documentation.

When your `post-merge` hook is ready, Drone will automatically execute it on each push.
