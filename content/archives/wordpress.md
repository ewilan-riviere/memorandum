---
title: Wordpress
description: 'Install Wordpress'
position: 1
category: 'Wordpress'
---

## Download Wordpress

- [**Download**](https://wordpress.org/download/)

### Unzip archive

Choose any directory of your computer, like me: `C:/workspace`.

### Setup VHost

Create VHost with NGINX

```nginx
server {
    server_name wordpress.localhost;
    root "C:/workspace/wordpress";
    index index.php;

    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }

    location = /robots.txt {
        allow all;
        log_not_found off;
        access_log off;
    }

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        # For Windows with scoop PHP
        # fastcgi_pass   127.0.0.1:9074;
        # include        fastcgi.conf;
        # For Linux
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
        expires max;
        log_not_found off;
    }
}
```

Restart NGINX and go to your new VHost.

### Setup Wordpress

Follow Wordpress install guide:

- Create database
- Give MySQL credentials to Wordpress form
- Set all required fields

Your wordpress website will be ready!
