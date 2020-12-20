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
    root /var/www/laravel/public;
    index index.php index.html index.htm index.nginx-debian.html;
    server_name laravel.localhost;

    error_log /var/log/nginx/laravel.log warn;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
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
  server_name memorandum.ewilan-riviere.com;

  location / {
    include proxy_params;
    proxy_pass http://localhost:3001;
  }
}
```

## Vue CLI App

```nginx
 location / {
    # rewrite ^/(.*)/$ /$1 permanent;
    # try_files $uri $uri/index.html;
        # root   /path/to/your/project/html;
    # index  index.html index.htm;
    # include  /etc/nginx/mime.types;
    try_files $uri $uri/ /index.html;
  }
```

```nginx
server {
  listen 80;
  server_name my-app.localhost;
  root /var/www/vue-cli/dist;

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
    "~api" /home/ewilan/www/ac-market-back/public/;
    default /home/ewilan/www/ac-market-front/dist/;
}
server {
    listen 80;
    server_name ac-market.git-projects.xyz;
    root $rot;
    index index.html index.php;

    error_log /var/log/nginx/todo-list.log warn;

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

*Config to use Nuxt.js SSR app on same domain with Laravel app*

```nginx
server {
    listen 80;
    server_name portfolio.ewilan-riviere.com;
    root /home/ewilan/www/portfolio-back/public;
    index index.php;

    location / {
        include proxy_params;
        proxy_pass http://localhost:3001;
    }

    # location ~ ^/(api|docs|storage|media|files|admin|ckeditor|elfinder|packages|build|brand|_ignition) {
    #     try_files $uri $uri/ /index.php?$query_string;
    # }
    location ~ ^/(admin|api|css|media|uploads|storage|docs|packages|cache) {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include         snippets/fastcgi-php.conf;
        fastcgi_pass    unix:/var/run/php/php7.4-fpm.sock;
    }
}
```
