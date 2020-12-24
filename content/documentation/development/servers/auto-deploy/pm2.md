---
title: PM2
description: ''
position: 2
category: 'Auto-deploy'
---

Unlike PHP app, which just need to have Nginx/Apache configuration, a NodeJS app can have two production options : **generate static project** or **launch server**. With the first, you compile your project into *html*, *js* and *css* files, and you can host it with a basic Nginx/Apache config like PHP app. It's easy but if you want to update infos of your app with a back-office via an API, infos won't update on your app because it's static app (you will have to re generate your app each time...). The solution is the second option, build a server, it will update infos of your app if you change it with a back-office. To manage a NodeJS app like this, you need a manager to keep live your app and **PM2** is here for it.

> **In this example, we take a repository called `portfolio-front`, a NuxtJS app**
> You can find it here [GitHub](https://github.com/ewilan-riviere/portfolio-front)
> I choose to define Nginx directory to /home/user/www/
> The domain used is `ewilan-riviere.com` with some differents subdomains

:::tip Links

- [monitoring](https://pm2.keymetrics.io/docs/usage/monitoring/)
- [ecosystem](https://pm2.keymetrics.io/docs/usage/application-declaration/)
  - [startup](https://pm2.keymetrics.io/docs/usage/startup/)

:::

## 1. Create Nginx configuration

You need to have a **domain** and **Nginx**. The configuration of Nginx is light but necessary to allow **PM2** to serve it on this domain.

```nginx{2,6}[/etc/nginx/sites-available/portfolio]
server {
  server_name ewilan-riviere.com;

  location / {
    include proxy_params;
    proxy_pass http://localhost:3001;
  }
}
```

With this config, `server_name` is the domain to host project and `proxy_pass` have a specific port will be used by PM2 (use one specific port by app like *3001*, *3002*...).

:::tip

```bash
# activate new nginx config
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled
```

```bash
# check nginx config
sudo nginx -t
```

If you have this output, everything is fine, otherwise you will have some infos to fix it:

> nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
> nginx: configuration file /etc/nginx/nginx.conf test is successful

```bash
# reload nginx
sudo service nginx reload
```

:::

## 2. Install and config PM2

Use NPM globally:

```bash
npm install pm2@latest -g
```

### 2. a. PM2 ecosystem

PM2 is now available on your server, you can use it on different ways but here, we use *ecosystem* solution. With this, it's easy to maintain a lot of NodeJS app with just JSON. You have just to create `ecosystem.config.js` anywhere on your server:

```bash
vim ~/ecosystem.config.js
```

```js
module.exports = {
  apps : [
    {
      name: 'portfolio',
      script: 'npm',
      cwd: '/home/user/www/portfolio-front',
      args: 'start',
      env: {
        PORT: 3001
      },
    }
  ]
};
```

- `name` is PM2 id for this app
- `script` is the package manager used by PM2 to serve this app
- `cwd` is the absolute path of your project
- `args` is the action of script from *package.json* for classic app and `env` define port for this app (you can't serve multiple app on same port).

In this example, portfolio-front is a NuxtJS app with theses scripts into package.json:

<vue-code-info ext="json" path="/home/user/www/portfolio-front/package.json"></vue-code-info>

```json
{
  //...
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start",
    "generate": "nuxt generate"
  },
  // ...
}
```

### 2. b. Link PM2 with ecosystem

```bash
# in the directory where you create ecosystem.config.js
pm2 start ecosystem.config.js
# save this config to restart automatically apps when server reboot
pm2 save
# list apps with this command
pm2 ls
```

You have to see this output:

```bash
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ portfolio          │ fork     │ 7    │ online    │ 0.3%     │ 47.2mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

If everything is fine, your app is online and you can access to it via server_name define in Nginx config.

### 2. c. PM2 Cheatsheet

- [PM2 doc](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)
- [PM2 doc: ecosytem file](https://pm2.keymetrics.io/docs/usage/application-declaration/)

```bash
# list pm2 apps with status
pm2 ls
# pm2 start ecosytem.config.js
pm2 start ecosystem.config.js
# pm2 save config to launch it after reboot
pm2 save
# start pm2 app
pm2 start {id}
pm2 start all
# stop pm2 app
pm2 stop {id}
pm2 stop all
```
