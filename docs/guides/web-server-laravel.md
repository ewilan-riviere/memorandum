# Nginx

List virtual hosts with Nginx

```bash
grep server_name /etc/nginx/sites-enabled/* -RiI
```

Configuration for [Laravel](https://laravel.com/) application.

## 1. Nginx

```nginx
server {
    # Http
    listen 80;
    # Resources website
    root /var/www/laravel-app/public;
    
    # Index to follow
    index index.php index.html index.htm index.nginx-debian.html;

    # Domain
    server_name www.laravel-app.localhost;

    error_log logs/laravel-app.log warn;

    # Root behaviour
    location / {
        try_files $uri $uri/ /index.php$is_args$args;
    }
    location /.* {
        root /var/www/laravel-app/storage/app/public;
        autoindex on;
    }

    # PHP fpm
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
    }
    location ~ /\.ht {
        deny all;
    }
}
```

## 2. Apache

```apacheconf
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName laravel-app.localhost

    # Optional
    ServerAlias www.laravel-app.localhost
    # Path to the project
    DocumentRoot /var/www/laravel-app/public

    # On linux only
    ErrorLog ${APACHE_LOG_DIR}/laravel-app-error.log
    CustomLog ${APACHE_LOG_DIR}/laravel-app-access.log combined
    
    <Directory /var/www/laravel-app>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Require all granted
    </Directory>
    <Directory /var/www/laravel-app/public>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```