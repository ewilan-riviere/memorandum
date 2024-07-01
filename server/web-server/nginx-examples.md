---
title: Examples
description: Examples of NGINX configuration
---

# Examples

{{ $frontmatter.description }}

## Redirects

### To another domain

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com;

    # Redirect to another domain
    return 301 http://www.new-example.com$request_uri;
}
```

### To HTTPS

::: info
You need to have an SSL certificate installed on your server to redirect to HTTPS. You should use [Certbot](/server/web-server/ssl-certbot) to install a free SSL certificate.
:::

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com;

    # Redirect to HTTPS
    return 301 https://$host$request_uri;
}
```

### To `www`

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com;

    # Redirect non-www to www
    return 301 http://www.example.com$request_uri;
}

server {
    listen 80;
    listen [::]:80;
    server_name www.example.com;

    root /var/www/example.com;
    index index.html index.htm;

    # Other configurations for www.example.com
}
```

### To new path

::: code-group

```nginx [Permanent]
server {
    listen 80;
    listen [::]:80;
    server_name example.com;

    # Redirect to another URL
    return 301 http://www.new-example.com$request_uri;
}
```

```nginx [Temporary]
server {
    listen 80;
    listen [::]:80;
    server_name example.com;

    # Temporary redirect to another URL
    return 302 http://www.new-example.com$request_uri;
}
```

```nginx [Rewrite]
server {
    listen 80;
    listen [::]:80;
    server_name example.com;

    location /old-path {
        rewrite ^/old-path/(.*)$ /new-path/$1 permanent;
    }
}
```

:::

## Frameworks

### Handle PHP

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com;
    root /srv/example.com;

    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }
}
```

### Laravel

For [Laravel](https://laravel.com) applications, you can use the following configuration:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com;
    root /srv/example.com/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### Laravel / Front-end

If your domain is shared between a Laravel application and a front-end application, you can use the following configuration:

```nginx
server {
  listen 80;
  listen [::]:80;
  server_name example.com;
  root /srv/example.com/public;

  add_header X-Frame-Options "SAMEORIGIN";
  add_header X-Content-Type-Options "nosniff";

  index index.php;

  charset utf-8;

  location / {
    try_files $uri $uri/ /index.php?$query_string;
  }

  location = /favicon.ico { access_log off; log_not_found off; }
  location = /robots.txt  { access_log off; log_not_found off; }

  error_page 404 /index.php;

  location / {
    expires $expires;
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 1m;
    proxy_connect_timeout 1m;
    proxy_pass http://localhost:3000; # set the address of the Node.js instance here
  }

  # Laravel endpoints
  location ~ ^/(api|admin|storage|assets|livewire|filament|vendor|docs|sanctum|build|opds|catalog|webreader|js|css) {
    try_files $uri $uri/ /index.php?$query_string;
  }

  location ~ \.php$ {
    fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
    fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
    include fastcgi_params;
    fastcgi_hide_header X-Powered-By;
  }

  location ~ /\.(?!well-known).* {
    deny all;
  }
}
```

### Nuxt

For [Nuxt](https://nuxt.com/) applications, you can use the following configuration:

```nginx
map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}

server {
    listen          80;             # the port nginx is listening on
    server_name     your-domain;    # setup your domain here

    gzip            on;
    gzip_types      text/plain application/xml text/css application/javascript;
    gzip_min_length 1000;

    location / {
        expires $expires;

        proxy_redirect                      off;
        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                          http://127.0.0.1:3000; # set the address of the Node.js instance here
    }
}
```

### Node.js application

For [Node.js](https://nodejs.org/) applications, you can use the following configuration:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com;  # Replace with your domain

    location / {
        proxy_pass http://localhost:3000;  # Replace with the port your Node.js application is running on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

You have to use a backend server like [PM2](https://pm2.keymetrics.io/) to run your Node.js application, a guide is available [here](/server/web-server/nodejs-pm2).

### Vitepress

For [Vitepress](https://vitepress.dev) applications, you can use the following configuration:

```nginx
server {
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    listen 80;
    listen [::]:80;
    server_name _;
    index index.html;

    location / {
        # content location
        root /app;

        # exact matches -> reverse clean urls -> folders -> not found
        try_files $uri $uri.html $uri/ =404;

        # non existent pages
        error_page 404 /404.html;

        # a folder without index.html raises 403 in this setup
        error_page 403 /404.html;

        # adjust caching headers
        # files in the assets folder have hashes filenames
        location ~* ^/assets/ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### Vue

For [Vue](https://vuejs.org/) applications, you can use the following configuration:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com;  # Replace with your domain

    root /var/www/vueapp/dist;    # Replace with the path to your built files
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

## Services

### Audiobookshelf (Docker)

For the [Audiobookshelf](https://www.audiobookshelf.org/) service, you can use the following configuration:

::: info
You can find a repository with Docker configuration here: <https://gitlab.com/kiwilan/audiobookshelf-docker>
:::

```nginx
server {
  listen 80;
  listen [::]:80;
  http2 on;
  server_name audiobookshelf.domain.com;

  location / {
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $host;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_http_version 1.1;

    proxy_pass http://127.0.0.1:13378;
  }

  access_log /var/log/nginx/audiobookshelf.access.log;
  error_log /var/log/nginx/audiobookshelf.error.log;
}
```

### Matomo (Docker)

For the [Matomo](https://matomo.org/) service, you can use the following configuration:

::: info
You can find a repository with Docker configuration here: <https://gitlab.com/kiwilan/matomo-docker>
:::

```nginx
server {
  if ($host = matomo.domain.com) {
    return 301 https://$host$request_uri;
  }

  listen 80;
  listen [::]:80;
  http2 on;

  server_name matomo.domain.com;

  location / {
    return 301 https://$host$request_uri;
  }
}

server {
  location / {
    proxy_set_header X-Forwarded-Host $host;
    proxy_pass http://localhost:8081;
  }
}
```

### Meilisearch (Docker)

For the [Meilisearch](https://www.meilisearch.com/) service, you can use the following configuration:

::: info
You can find a repository with Docker configuration here: <https://gitlab.com/kiwilan/meilisearch-docker>
:::

```nginx
server {
  listen 80;
  listen [::]:80;
  http2 on;
  server_name meilisearch.domain.com;

  location / {
    proxy_pass http://127.0.0.1:7701;
  }

  access_log /var/log/nginx/meilisearch.access.log;
  error_log /var/log/nginx/meilisearch.error.log;
}
```

### Umami (Docker)

For the [Umami](https://umami.is/) service, you can use the following configuration:

::: info
You can find a repository with Docker configuration here: <https://gitlab.com/kiwilan/umami-docker>
:::

```nginx
server {
  listen 80;
  listen [::]:80;
  server_name umami.domain.com;

  add_header X-Robots-Tag "noindex, nofollow, nosnippet, noarchive";
  add_header X-Frame-Options SAMEORIGIN;
  add_header X-XSS-Protection "1; mode=block";

  charset utf-8;

  error_log /var/log/nginx/umami.domain.com.log warn;
  access_log /var/log/nginx/umami.domain.com.log;

  location / {
    include proxy_params;
    proxy_pass http://localhost:3100;
  }
}
```

## Misc

### Two apps on the same domain

Config to use differents `root` with differents URL. Here, this example display Vue.js SPA at `/` of website and display api from Laravel app at `api/`

```nginx
map $request_uri $app {
    "~api" /var/www/backend-app;
    default /var/www/frontend-app;
}
server {
  listen 80;
  server_name domain.com;
  root $app;
  index index.html index.php;

  error_log /var/log/nginx/domain-error.log warn;
  access_log /var/log/nginx/v-access.log;

  location / {
    try_files $uri $uri/ /index.php?$query_string;
  }

  location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
  }

  location ~ /\.ht {
    deny all;
  }
}
```
