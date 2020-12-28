# Memorandum

drone try4, update 2

[![Build Status](https://drone.ewilan-riviere.com/api/badges/ewilan-riviere/memorandum/status.svg)](https://drone.ewilan-riviere.com/ewilan-riviere/memorandum)

[![nuxtjs](https://img.shields.io/static/v1?label=NuxtJS&message=v2.14&color=00C58E&style=flat-square&logo=nuxt.js&logoColor=ffffff)](https://nuxtjs.org/)
[![tailwindCSS](https://img.shields.io/static/v1?label=Tailwind%20CSS&message=v2.0&color=38B2AC&style=flat-square&logo=tailwind-css&logoColor=ffffff)](https://tailwindcss.com/)

[![nodejs](https://img.shields.io/static/v1?label=NodeJS&message=v14.15&color=339933&style=flat-square&logo=node.js&logoColor=ffffff)](https://nodejs.org/en)
[![yarn](https://img.shields.io/static/v1?label=Yarn&message=v1.2&color=2C8EBB&style=flat-square&logo=yarn&logoColor=ffffff)](https://classic.yarnpkg.com/lang/en/)

![Memo](static/logo/logo-readme.png)

> Documentation with snippets and boiler plates, built with [NuxtJS](https://nuxtjs.org) and [nuxt/content](https://content.nuxtjs.org). Markdown ❤️ for ever.

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

> In SSR mode

Update `.env` with current website URL like:

```js
APP_URL='http://memorandum.website.dev'
```

```bash
# build for production
yarn build
```

Use a process manager like [pm2](https://pm2.keymetrics.io) to `start` NuxtJS app if you want SSR.

```js
// example of ~/ecosystem.config.js for pm2
module.exports = {
  apps : [
    // ...
    {
      name: 'memorandum',
      script: 'npm',
      cwd: '/home/ewilan/www/memorandum',
      args: 'start',
      env: {
        PORT: 3001
      },
    },
    // ...
  ]
}
```

Use `.git/hooks/post-merge` like:

```bash
#!/bin/bash
yarn ; yarn build
pm2 restart memorandum
```

Don't forget the command `sudo chmod 775 .git/hooks/post-merge` to allow system to execute this script.

To learn more, check [NuxtJS documentation](https://nuxtjs.org).

## Todo website

- [ ] improve responsive mode for menu
- [ ] use new content view for all guides
- [x] fix emojis
- [ ] import components from blog, clean components
- [x] fix positions
- [ ] add img for all guides
- [ ] md containers fix style

## Todo content

[**memorandum.ewilan-riviere.com/in-coming**](https://memorandum.ewilan-riviere.com/in-coming)
