# Manage NodeJS apps with PM2

<div class="word-wraping" lang="en">

Unlike PHP app, which just need to have Nginx/Apache configuration, a NodeJS app can have two production options : **generate static project** or **launch server**. With the first, you compile your project into *html*, *js* and *css* files, and you can host it with a basic Nginx/Apache config like PHP app. It's easy but if you want to update infos of your app with a back-office via an API, infos won't update on your app because it's static app (you will have to re generate your app each time...). The solution is the second option, build a server, it will update infos of your app if you change it with a back-office. To manage a NodeJS app like this, you need a manager to keep live your app and **PM2** is here for it.

</div>

> **In this example, we take a repository called `portfolio-front`, a NuxtJS app**  
> You can find it here [GitHub](https://github.com/ewilan-riviere/portfolio-front)  
> I choose to define Nginx directory to /home/user/www/

## 1. Create Nginx configuration

You need to have a **domain** and **Nginx**. The configuration of Nginx is light but necessary to allow **PM2** to serve it on this domain.

```nginx{3,7}
# /etc/nginx/sites-available/portfolio
server {
    server_name portfolio.ewilan-riviere.com;

    location / {
        include proxy_params;
        proxy_pass http://localhost:3001;
    }
}
```

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

With this config, `server_name` is the domain to host project and `proxy_pass` have a specific port will be used by PM2.

## 2. Install and config PM2

Use NPM globally:

```bash
npm install pm2@latest -g
```

### 2. a. PM2 ecosystem

PM2 is now available on your server, you can use it on different ways but here, we use *ecosystem* solution. With this, it's easy to maintain a lot of NodeJS app with just JSON. You have just to create `ecosystem.config.js` anywhere on your server:

```js{9,10,11,12,14}
// /home/ewilan/ecosystem.config.js
module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
0   */
  apps : [
    {
      name: 'portfolio',
      script: 'npm',
      cwd: '/home/ewilan/www/portfolio-front',
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

```json
// /home/ewilan/www/portfolio-front/package.json
{
    "scripts": {
        "dev": "nuxt",
        "build": "nuxt build",
        "start": "nuxt start",
        "generate": "nuxt generate"
    },
}
```

### 2. b. Link PM2 with ecosystem

In the directory where you create *ecosystem.config.js*, execute this command:

```bash
pm2 start ecosystem.config.js
```

You can save this config to restart automatically apps with `pm2 save` when server reboot.

Now you can list apps with this command:

```bash
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

TODO: add basic PM2 commands

# Server: auto-deploy

[Drone](https://gitlab.com/EwieFairy/drone)

TODO: auto deploy