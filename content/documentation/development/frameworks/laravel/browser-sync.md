---
title: Browser Sync
description: 'How to use Browser Sync with laravel-mix'
position: 6
category: 'Laravel'
---

When you develop front-end with Blade or Vue.js into Laravel, you have to refresh manually your browser, [**Browser Sync**](https://browsersync.io) is a tool to refresh your browser for you when you develop locally.

## Setup

You have to modify `webpack.mix.js` at the root of new Laravel project, **browser-sycn** will use `APP_URL` variable from `.env` to set sync.

```js[webpack.config.js]
const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .js("resources/js/app.js", "public/css/js")
  // ...

if (mix.inProduction()) {
  mix.version();
} else {
  let appUrl = process.env.APP_URL;
  appUrl = appUrl.replace(/(^\w+:|^)\/\//, "");

  /**
   * Browser sync
   */
  const PATHS = {
    src: "src",
    dist: "resources",
    proxy: appUrl,
  };

  mix
    .disableSuccessNotifications()
    // .setPublicPath(PATHS.dist)
    .options({ processCssUrls: false })
    .browserSync({
      ui: false,
      injectChanges: true,
      notify: true,
      host: "localhost",
      port: 8001,
      proxy: `${PATHS.proxy}`,
      // files: [`${PATHS.dist}/*.*`],
      files: [
        "public/css/app.css",
        "public/js/app.js",
        "app/**/*",
        "routes/**/*",
        "resources/js/**/*",
        "resources/sass/**/*",
        "resources/views/**/*",
        "resources/lang/**/*",
      ],
    });
}
```
