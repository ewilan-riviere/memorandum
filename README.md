# Memorandum

drone try2

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
      cwd: '/home/username/www/memorandum',
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

## Todo project

- [ ] improve responsive mode for menu
- [ ] use new content view for all guides
- [x] fix emojis
- [ ] import components from blog, clean components
- [x] fix positions
- [ ] add img for all guides
- [ ] md containers fix style

## Todo content

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
- [] php cheatsheet <https://front-line-php.com/cheat-sheet>
- [] dart flutter
  - <https://pub.dev/packages/logging>
  - <https://medium.com/flutter-community/debugprint-and-the-power-of-hiding-and-customizing-your-logs-in-dart-86881df05929>
  - <https://codeburst.io/top-10-array-utility-methods-you-should-know-dart-feb2648ee3a2>
- [] PowerShell Profiles with custom alias methods
- symfony
  - scoop
  - symfony serve
  - symfony new symfo-test
- terminal
  - <https://github.com/nvbn/thefuck>
  - <https://github.com/junegunn/fzf#installation>
- js
  - <https://medium.com/javascript-in-plain-english/15-hacks-in-javascript-6e3f88c90d00>

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
- [terryz.github.io](https://terryz.github.io/vue/#/dialog)
- [**medium.com/setting-up-laravel-8-x-with-jetstream-auth**](https://medium.com/dev-genius/setting-up-laravel-8-x-with-jetstream-auth-84bbeafc0cd3)
- [**medium.com/how-to-use-svg-icons-in-your-vue-app**](https://medium.com/javascript-in-plain-english/how-to-use-svg-icons-in-your-vue-app-6e2c30865d7c)
- css link border expand: <https://stackoverflow.com/questions/28623446/hover-effect-expand-bottom-border>
- php big files

```
## Setup to upload big files

For NGINX: `/etc/nginx/nginx.conf`

```nginxconfig
http {
    # ...
    client_max_body_size 500M;
}
```

For current PHP FPM version `/etc/php/7.4/fpm/php.ini`  
*Check current version with `php -v`*

```ini
post_max_size = 500M
# ...
upload_max_filesize = 500M
```

Restart NGINX and PHP FPM :

```bash
sudo service nginx restart
sudo service php7.4-fpm restart
```

Check on phpinfo() if your config is correct. You can add this to `/var/www/html`, give it `phpinfo.php` name and acces to [**localhost/phpinfo.php**](localhost/phpinfo.php)

```bash
<?php
phpinfo();
?>
```

```
## Video games

- [**polygon.com/botw-shrine-map-location**](https://www.polygon.com/zelda-breath-of-the-wild-guide-walkthrough/2017/6/1/15723316/botw-shrine-map-location)
- [**zelda.fandom.com/Armor**](https://zelda.fandom.com/wiki/Armor)
- [**rankedboost.com/shrines-dungeons**](https://rankedboost.com/zelda-breath-of-the-wild/shrines-dungeons/#hateno)
- [**rankedboost.com/armor-upgrades**](https://rankedboost.com/zelda-breath-of-the-wild/armor-upgrades/#armor)
- [**pinterest.fr/pin/717831628097592945**](https://www.pinterest.fr/pin/717831628097592945/)

## stackoverflow

- [**stackoverflow.com/how-do-i-revert-a-git-repository-to-a-previous-commit**](https://stackoverflow.com/questions/4114095/how-do-i-revert-a-git-repository-to-a-previous-commit)
- [**stackoverflow.com/how-can-i-move-head-back-to-a-previous-location-detached-head-undo-commits**](https://stackoverflow.com/questions/34519665/how-can-i-move-head-back-to-a-previous-location-detached-head-undo-commits/34519716#34519716)
- [**stackoverflow.com/how-can-i-reconcile-detached-head-with-master-origin**](https://stackoverflow.com/questions/5772192/how-can-i-reconcile-detached-head-with-master-origin)
- [**stackoverflow.com/how-do-i-discard-unstaged-changes-in-git**](https://stackoverflow.com/questions/52704/how-do-i-discard-unstaged-changes-in-git)
- [**stackoverflow.com/how-do-i-use-git-reset-hard-head-to-revert-to-a-previous-commit**](https://stackoverflow.com/questions/9529078/how-do-i-use-git-reset-hard-head-to-revert-to-a-previous-commit)
- [**stackoverflow.com/how-do-i-use-git-reset-hard-head-to-revert-to-a-previous-commit**](https://stackoverflow.com/questions/9529078/how-do-i-use-git-reset-hard-head-to-revert-to-a-previous-commit)
- [**askubuntu.com/what-is-the-best-way-to-uninstall-nginx**](https://askubuntu.com/questions/235347/what-is-the-best-way-to-uninstall-nginx)
- [**stackoverflow.com/uninstall-php-fpm-7-0-ubuntu-or-reset-configuration**](https://stackoverflow.com/questions/40794047/uninstall-php-fpm-7-0-ubuntu-or-reset-configuration)
- [**askubuntu.com/permanently-removing-apache2**](https://askubuntu.com/questions/176964/permanently-removing-apache2)
- [**askubuntu.com/how-to-completely-remove-php**](https://askubuntu.com/questions/59886/how-to-completely-remove-php)
- [**stackoverflow.com/completely-removing-phpmyadmin**](https://stackoverflow.com/questions/5050296/completely-removing-phpmyadmin)
- [**stackoverflow.com/your-password-does-not-satisfy-the-current-policy-requirements**](https://stackoverflow.com/questions/43094726/your-password-does-not-satisfy-the-current-policy-requirements)

## ffmpeg

- [**stackoverflow.com/how-do-you-convert-an-entire-directory-with-ffmpeg**](https://stackoverflow.com/questions/5784661/how-do-you-convert-an-entire-directory-with-ffmpeg)

```cmd
FOR /F "tokens=*" %G IN ('dir /b *') DO ffmpeg -i "%G" "%~nG.webp"
```

## youtube-dl

- <https://youtube-dl.org>
- <https://github.com/l1ving/youtube-dl>
- <https://korben.info/comment-utiliser-et-maitriser-youtube-dl-pour-telecharger-des-videos-comme-un-champion.html>

```bash
youtube-dl -x --audio-format mp3 URL
```
