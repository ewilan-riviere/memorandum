# Memorandum <!-- omit in toc -->

[![nuxtjs](https://img.shields.io/static/v1?label=NuxtJS&message=v2.15&color=00C58E&style=flat-square&logo=nuxt.js&logoColor=ffffff)](https://nuxtjs.org/)
[![tailwindcss](https://img.shields.io/static/v1?label=Tailwind%20CSS&message=v2.2&color=38B2AC&style=flat-square&logo=tailwind-css&logoColor=ffffff)](https://tailwindcss.com/)
[![nuxtjs](https://img.shields.io/static/v1?label=Designed%20to%20be&message=SSG&color=00C58E&style=flat-square&logo=nuxt.js&logoColor=ffffff)](https://nuxtjs.org/docs/2.x/concepts/static-site-generation)

[![nodejs](https://img.shields.io/static/v1?label=NodeJS&message=v14.16&color=339933&style=flat-square&logo=node.js&logoColor=ffffff)](https://nodejs.org/en)
[![yarn](https://img.shields.io/static/v1?label=Yarn&message=v1.2&color=2C8EBB&style=flat-square&logo=yarn&logoColor=ffffff)](https://classic.yarnpkg.com/lang/en/)

![Memo](static/default.jpg)

> Documentation with snippets and boiler plates, built with [NuxtJS](https://nuxtjs.org) and [nuxt/content](https://content.nuxtjs.org). Markdown ❤️ for ever.  
> [**memorandum.ewilan-riviere.com/in-coming**](https://memorandum.ewilan-riviere.com/in-coming)  
> Based on <https://content.nuxtjs.org> and <https://tailwindcss.nuxtjs.org>

## TODO

- [ ] add redirect pages to crawler
- [ ] new crawler for sitemap
- [ ] search engine: link, add logo

## Setup

```bash
# setup .env
cp .env.example .env

# install dependencies
yarn

# serve with hot reload at localhost:3000
yarn dev
```

### Production

Update `.env` with current website URL like:

```js
BASE_URL='http://memorandum.website.dev'
```

```bash
# build for production
yarn generate
```

Use `.git/hooks/post-merge` like:

```bash
#!/bin/bash
yarn ; yarn generate
```

Don't forget the command `sudo chmod 775 .git/hooks/post-merge` to allow system to execute this script.

Serve app with Web Server like NGINX

```nginx
server {
  listen 80;
  server_name memorandum.ewilan-riviere.com;

  root /var/www/memorandum/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|ico|eot|svg|ttf|woff|woff2)$ {
    access_log off;
    expires max;
  }
}
```

To learn more, check [NuxtJS documentation](https://nuxtjs.org).
