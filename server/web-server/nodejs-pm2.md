---
title: Node.js & PM2
description: How to manage Node.js applications
---

# Node.js & PM2

{{ $frontmatter.description }}

When you have a Node.js app, you need to manage it on your server.

Unlike PHP app, which just need to have NGINX/Apache configuration, a Node.js app can have two production options : **generate static project** or **launch server**. With the first, you compile your project into _html_, _js_ and _css_ files, and you can host it with a basic NGINX/Apache config like PHP app.

It's easy but if you want to update infos of your app with a back-office via an API, infos won't update on your app because it's static app (you will have to re generate your app each time...). The solution is the second option, **host a server**, it will update infos of your app if you change it with a back-office. To manage a Node.js app like this, you need a manager to keep live your app and [**PM2**](https://pm2.keymetrics.io/) is here for it.

::: info

> **In this example, we take a project works [Express](https://github.com/expressjs/express), an old but still used Node.js framework.**
> You can find it here [ewilan-riviere/express-starter](https://gitlab.com/ewilan-riviere/express-starter).

```sh
git clone https://gitlab.com/ewilan-riviere/express-starter /var/www/express-starter
```

- [pm2 monitoring](https://pm2.keymetrics.io/docs/usage/monitoring/)
- [pm2 ecosystem](https://pm2.keymetrics.io/docs/usage/application-declaration/)
- [pm2 startup](https://pm2.keymetrics.io/docs/usage/startup/)

:::

## Create NGINX configuration

You need to have a **domain** and [**NGINX**](/server/web-server/nginx). The configuration of Nginx is light but necessary to allow **PM2** to serve it on this domain with reverse proxy.

```nginx{2,6}:/etc/nginx/conf.d/domain.com.conf
server {
  server_name domain.com;

  location / {
    include proxy_params;
    proxy_pass http://localhost:3000;
  }
}
```

With this config, `server_name` is the domain to host project and `proxy_pass` have a specific port will be used by PM2 (use one specific port by app like _3000_, _3001_, _3002_...).

```sh:output
sudo nginx -t
```

If you have this output, everything is fine, otherwise you will have some infos to fix it:

```sh:output
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

And reload NGINX to apply changes:

```sh
sudo service nginx reload
```

## Install PM2

::: info
You have to install Node.js before PM2, you can find a guide here: [Node.js](/server/binaries/Node.js)
:::

Use NPM globally:

```sh
npm install pm2@latest -g
```

### Ecosystem

PM2 is now available on your server, you can use it on different ways but here, we use _ecosystem_ solution. With this, it's easy to maintain a lot of Node.js app with just JSON. You have just to create `ecosystem.config.js` anywhere on your server:

```sh
vim ~/ecosystem.config.js
```

```js:~/ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "express-starter",
      script: "npm",
      cwd: "/var/www/express-starter",
      args: "start",
      env: {
        PORT: 3000, // same port as in Nginx config
      },
    },
  ],
};
```

- `name` is PM2 id for this app
- `script` is the package manager used by PM2 to serve this app
- `cwd` is the absolute path of your project
- `args` is the action of script from _package.json_ for classic app and `env` define port for this app (you can't serve multiple app on same port).
- `PORT` is the port used by your app

::: info

`start` script is `"start": "node app.js"` in example of express-starter app.

:::

In this example, express-starter is a Node.js app with theses scripts into package.json:

```json:/var/www/express-starter/package.json
{
  // ...
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  // ...
}
```

### Start PM2

Now, you can start your app with PM2:

```sh
pm2 start ~/ecosystem.config.js
```

Save this config to restart automatically apps when server reboot:

```sh
pm2 save
```

And list apps with this command:

```sh
pm2 ls
```

You have to see this output:

```sh
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ express-starter    │ fork     │ 7    │ online    │ 0.3%     │ 47.2mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

If everything is fine, your app is online and you can access to it via `server_name` define in Nginx config.

## Cheatsheet

- [PM2 doc](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)
- [PM2 doc: ecosytem file](https://pm2.keymetrics.io/docs/usage/application-declaration/)

### List apps with status

```sh
pm2 ls
```

### Save config

```sh
pm2 save
```

### Start ecosystem

```sh
pm2 start ~/ecosystem.config.js
```

### Kill all apps

```sh
pm2 kill
```

### Start app

```sh
pm2 start {id}
```

### Start all apps

```sh
pm2 start all
```

### Stop app

```sh
pm2 stop {id}
```

### Stop all apps

```sh
pm2 stop all
```
