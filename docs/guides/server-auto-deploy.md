# Auto-deploy

When you push some modifications on your repo, your server not update automatically. If you use **webhooks**, you can send **push event** to your server execute `git pull` on your repo. But we need to receive this push event, it's call a **payload**, we have to configure server to receive it and update repository.

## 1. Setup drone to watch push events

To watch **payloads**, we need to have a tool to receive it. It's goal of [**drone project**](https://gitlab.com/EwieFairy/drone), just clone it on your server, where you want, here I choose to clone it to `/home/user/deploy`. It's NodeJS app, so use [PM2](/guides/server-nodejs-pm2.html) to manage it, just define config like it:

<code-heading type="js" path="/home/user/ecosystem.config.js"></code-heading>
```js
module.exports = {
  apps : [
    {
      name: 'deploy',
      script: 'index.js',
      cwd: '/home/user/deploy'
    },
    {
      // some project
    }
  ]
};
```

Then configure `.env` file, just copy `.env.example` to `.env` and fill it with infos:

<code-heading type="env" path="/home/user/deploy/.env"></code-heading>
```env
PORT=3000
WEBHOOK_PATH=/deploy
WEBSCRIPT_PATH=
SCRIPT_KEY=
PROJECTS_ROOT=/home/user/www/
```

- `PORT`: port to deploy drone, 3000 by default
- `WEBHOOK_PATH`: url where drone listen, when we will configure Nginx, we use `dev.ewilan-riviere.com`, so listen url will be `dev.ewilan-riviere.com/deploy`
- `PROJECTS_ROOT`: absolute path where repositories cloned

Then create `repositories.json` into repo. It will useful only if remote have different name of cloned repo. But you need to have this file, even it's empty file.

<code-heading type="json" path="/home/user/deploy/repositories.json"></code-heading>
```json
{
    "remote-repo": [
            "local-repo"
    ]
}
```

Then configure Nginx like it:

- `root`: default root with just `index.php`
- `server_name`: example url `dev.ewilan-riviere.com`
- `location /deploy`: like **WEBHOOK_PATH** define in `.env` file
- `proxy_pass`: **3000** is the **PORT** define in `.env` file

Don't forget to enable this config.  
TODO link to Nginx

<code-heading type="nginx" path="/etc/nginx/sites-available/default"></code-heading>
```nginx{2,6,17,18}
server {
    root /home/user/www/html;

    index index.html index.htm index.nginx-debian.html index.php;

    server_name dev.ewilan-riviere.com;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php7.1-fpm.sock;
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

## 2. Setup repository webhook

GitHub example, webhooks are available into **Settings/Webhooks**. If you haven't configure HTTPS on your Nginx config disable **SSL verification**.

<img src="/images/webhook-config.jpg" class="covver-img" />

## 3. Git hooks

When repo is updated, you need to execute some commands like `npm install` or `npm build` for example. To do this, you can use **git hooks**, it's script that you can configure when git event triggered. Check `repo/.git/hooks/` directory, it's available on all repositories and not gittable. If you want to execute commands after `git pull`, create a new script and name it `post-merge`.

<code-heading type="sh" path="/home/user/www/portfolio-front/.git/hooks/post-merge"></code-heading>
```sh
#!/bin/bash
npm install && npm run build
```

All commands in this scripts will be executed after *git pull*.