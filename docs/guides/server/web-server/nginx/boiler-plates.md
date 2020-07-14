# *Boiler plates*

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
