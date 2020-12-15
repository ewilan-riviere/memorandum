# Memorandum

[![nuxtjs](https://img.shields.io/static/v1?label=NuxtJS&message=v2.14&color=00C58E&style=flat-square&logo=nuxt.js&logoColor=ffffff)](https://nuxtjs.org/)
[![tailwindCSS](https://img.shields.io/static/v1?label=Tailwind%20CSS&message=v1.9&color=38B2AC&style=flat-square&logo=tailwind-css&logoColor=ffffff)](https://tailwindcss.com/)

[![nodejs](https://img.shields.io/static/v1?label=NodeJS&message=v12.16&color=339933&style=flat-square&logo=node.js&logoColor=ffffff)](https://nodejs.org/en)
[![yarn](https://img.shields.io/static/v1?label=Yarn&message=v1.22&color=2C8EBB&style=flat-square&logo=yarn&logoColor=ffffff)](https://classic.yarnpkg.com/lang/en/)

![Memo](static/logo/logo-readme.png)

> Documentation with snippets and boiler plates, built with [NuxtJS](https://nuxtjs.org) and [nuxt/content](https://content.nuxtjs.org). Markdown ❤️ for ever.

## Todo

- [] fix emojis
- [] import components from blog, clean components
- [] fix positions
- [] add img for all guides
- [] md containers fix style
- [] php clockwork
- [x] windows install
- [] what to save before reinstall OS (Keep)
- [] flutter lint
- [] flutter reduce size proguard and obfuscate
- [] php named arguments, pass function as parameter, spread d'arguments
  - <https://www.php.net/releases/8.0/en.php>
  - <https://stitcher.io/blog/new-in-php-8>
- [] dart named arguments
  - <https://stackoverflow.com/questions/13264230/what-is-the-difference-between-named-and-positional-parameters-in-dart>
- [] JS versions: <https://www.w3schools.com/js/js_versions.asp>
- [] Laravel Resources
  - <https://medium.com/@dinotedesco/laravel-api-resources-what-if-you-want-to-manipulate-your-models-before-transformation-8982846ad22c>
  - <https://laravel.com/docs/8.x/eloquent-resources>
- [] TablePlus
  - <https://tableplus.com>
- [] Laravel Sail
  - <https://github.com/mailhog/MailHog>
- [] php the right way <https://eilgin.github.io/php-the-right-way/>
- [] dart flutter
  - <https://pub.dev/packages/logging>
  - <https://medium.com/flutter-community/debugprint-and-the-power-of-hiding-and-customizing-your-logs-in-dart-86881df05929>
  - <https://codeburst.io/top-10-array-utility-methods-you-should-know-dart-feb2648ee3a2>
- [] PowerShell Profiles with custom alias methods
- symfony
  - scoop
  - symfony serve
  - symfony new symfo-test

### Parallax

```html
<style>
.background {
    background-image: url('assets/images/background.png');
}
.parallax {
    /* The image used */
    background-image: url('assets/images/background.png');

    /* Full height */
    height: 100%; 

    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
<div class="fixed w-full h-screen bg-gray-100 bg-center bg-no-repeat bg-cover opacity-10 background"></div>
<div>
    content
</div>
```

- <https://www.digitalocean.com/community/tutorials/css-pure-css-parallax>
- <https://www.w3schools.com/cssref/pr_background-attachment.asp>
- <https://www.w3schools.com/howto/howto_css_parallax.asp>
- <https://stackoverflow.com/questions/9182978/semi-transparent-color-layer-over-background-image>
- <https://www.sitepoint.com/community/t/making-a-parallax-background-image-stay-at-100-width-when-responding/113203>

### Concepts

- php méthodes magiques
  - <https://www.php.net/manual/fr/language.oop5.magic.php>
- <https://www.php.net/manual/en/datetime.format.php>
- <https://www.taniarascia.com/the-simplest-php-router>
- <https://www.php-fig.org/psr/psr-4>
  - <https://code.tutsplus.com/tutorials/how-to-autoload-classes-with-composer-in-php--cms-35649>

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
      cwd: '/home/ubuntu/www/memorandum',
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
yarn && yarn build
pm2 restart memorandum
```

Don't forget the command `sudo chmod 775 .git/hooks/post-merge` to allow system to execute this script.

To learn more, check [NuxtJS documentation](https://nuxtjs.org).
