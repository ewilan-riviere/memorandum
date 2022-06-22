---
title: Matomo
description: 'How to setup Matomo'
position: 3
category: 'SEO'
---

## Linux like Digital Ocean droplet

Matomo is an alternative to collect website data: [**Matomo website**](https://matomo.org/)

- [**Installation guide**](https://matomo.org/docs/installation/)

Connect on your server

```bash
cd /home/user/www/
wget https://builds.matomo.org/matomo.zip && unzip matomo.zip
rm How\ to\ install\ Matomo.html && rm matomo.zip
sudo chown -R www-data:www-data /home/user/www/matomo
sudo find /home/user/www/matomo/tmp -type f -exec chmod 644 {} \; && sudo find /home/user/www/matomo/tmp -type d -exec chmod 755 {} \;
```

```bash
cd /etc/nginx/sites-available
sudo vim matomo.example.com.conf
```

For NGINX config, refer to [matomo-org/matomo-nginx](https://github.com/matomo-org/matomo-nginx)

```nginx
server {
    listen 80;
    root /home/user/www/matomo;
    index index.php index.html index.htm;
    server_name matomo.example.com;

    error_log /var/log/nginx/matomo.log warn;
    access_log /var/log/nginx/matomo.log;

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

```bash
sudo ln -s /etc/nginx/sites-available/matomo.example.com.conf /etc/nginx/sites-enabled
sudo certbot --nginx
```

Now you have to create a MySQL matomo user and database. Go to **matomo.example.com** and setup Matomo with guide.
