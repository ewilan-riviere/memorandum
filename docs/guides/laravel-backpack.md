# Laravel: Backpack

## Create new Model

- Create **migration** (in case you're starting from scratch)
```bash
php artisan make:migration:schema create_tags_table --model=0 --schema="name:string:unique"
php artisan migrate
```

- Create a **Model** with **Request** and **Controller** for the admin panel
```bash
php artisan backpack:crud tag
```

- Add a **route** for this admin panel to `routes/backpack/custom.php`
```bash
php artisan backpack:add-custom-route "Route::crud('tag', 'TagCrudController');"
```

## Backpack errors

When you install **Backpack** with **Laravel elfinder***.

:::tip
Laravel elfinder is a file manager you can use in Backpack and it's heavy. If you want it, just answer `yes` to this question: `Install barryvdh/laravel-elfinder to provide an admin interface for File Management? (yes/no) [no]:` when you execute the below command.
:::

```bash
php artisan backpack:install
```

You can have this output error:

<code-heading type="sh-output"></code-heading>

```bash
Symfony\Component\Process\Exception\ProcessTimedOutException  : The process "composer require barryvdh/laravel-elfinder" exceeded the timeout of 300 seconds.
```

It's just composer error because installation take too time (cause of **elfinder**), you can up max tim for composer installation to avoid this error.

```bash
composer config --global process-timeout 2000
```

### **Backpack & NGINX**

With **Nuxt** and **Laravel** on same url, **Nuxt** crush `public` directory of **Laravel**. If you want to load *CSS* and *JS* from public directory off **Laravel**, you can add it to `location` into first configuration (here, l.10), like this, here *CSS* is present and `public/css/app.css` can be loaded into back-office. Check **Network** in your dev tools if you can't find any error, *404 is the proof of problems with NGINX config*!

<code-heading type="nginx"></code-heading>

```nginx{10}
server {
    listen 80;
    server_name secob-v2.useweb.net;

    location / {
        include proxy_params;
        proxy_pass http://localhost:3011;
    }

    location ~ ^/(admin|api|css|media|uploads|storage|docs|packages|cache) {
        include proxy_params;
        proxy_pass http://secob-v2.useweb.net:8000;
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
    }
}
server {
    listen 8000;
    listen [::]:8000;

    server_name secob-v2.useweb.net;

    access_log /var/log/nginx/secob.access.log;
    error_log /var/log/nginx/secob.error.log;

    root /home/ubuntu/www/secob-backend/public;
    index index.php;

    location / {
            try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ ^/docs/ {
            try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php7.3-fpm.sock;
        fastcgi_buffer_size 128k;
        fastcgi_buffers 4 256k;
        fastcgi_busy_buffers_size 256k;
    }


    location ~ ^/cache/resolve {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|eot|svg|ttf|woff|woff2)$ {
        expires max;
        log_not_found off;
    }
}
```