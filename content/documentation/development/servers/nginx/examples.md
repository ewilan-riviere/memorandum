---
title: Examples
description: Examples of boiler plates NGINX configurations
position: 1
category: 'NGINX'
---

## Laravel

```nginx
server {
  listen 80;
  root /home/user/www/my-project/public;
  index index.php index.html index.htm index.nginx-debian.html;
  server_name my-project.com;

  error_log /var/log/nginx/my-project-error.log warn;
  access_log /var/log/nginx/my-project-access.log;

  location / {
    try_files $uri $uri/ =404;
  }

  location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
  }

  location ~ /\.ht {
    deny all;
  }
}
```

## PM2 app

```nginx
server {
  listen 80;
  server_name my-project.com;

  location / {
    include proxy_params;
    proxy_pass http://localhost:3001;
  }
}
```

## Vue CLI App

```nginx
server {
  listen 80;
  server_name my-project.com;
  root /home/user/www/my-project/dist;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|ico|eot|svg|ttf|woff|woff2)$ {
    access_log off;
    expires max;
  }
}
```

## Two apps on same domain

*Config to use differents `root` with differents URL. Here, this example display Vue.js SPA at `/` of website and display api from Laravel app at `api/`*

```nginx
map $request_uri $rot {
    "~api" /home/user/www/my-project-back/public/;
    default /home/user/www/my-project-front/dist/;
}
server {
  listen 80;
  server_name my-domain.com;
  root $rot;
  index index.html index.php;

  error_log /var/log/nginx/my-project-error.log warn;
  access_log /var/log/nginx/my-project-access.log;

  location / {
    try_files $uri $uri/ /index.php$is_args$args;
  }

  location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
  }

  location ~ /\.ht {
    deny all;
  }
}
```

## Two apps on same domains (PM2 edition)

*Config to use Nuxt.js SSR app on same domain with PHP app*

```nginx
server {
  listen 80;
  server_name my-domain.com;
  root /home/user/www/my-project-back/public;
  index index.php;

  error_log /var/log/nginx/my-project-back-error.log warn;
  access_log /var/log/nginx/my-project-back-access.log;

  location / {
    include proxy_params;
    proxy_pass http://localhost:3001;
  }

  location ~ ^/(admin|api|css|media|uploads|storage|docs|packages|cache) {
    try_files $uri $uri/ /index.php?$query_string;
  }

  location ~ \.php$ {
    include         snippets/fastcgi-php.conf;
    fastcgi_pass    unix:/var/run/php/php7.4-fpm.sock;
  }
}
```

With `ecosystem.config.js`

```js
// ecosystem.config.js
module.exports = {
  apps : [
    // ...
    {
      name: 'my-project',
      script: 'npm',
      cwd: '/home/ewilan/www/my-project-front',
      args: 'start',
      env: {
        PORT: 3001
      },
    }
  ]
};
```
