---
title: Install
description: 'How to setup Matomo'
position: 3
category: 'SEO'
---

# Install Matomo

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

```nginx title="matomo.example.com.conf"
server {
    listen 80;
    server_name matomo.domain; # list all domains Matomo should be reachable from
    access_log /var/log/nginx/matomo.access.log;
    error_log /var/log/nginx/matomo.error.log;

    add_header Referrer-Policy origin always; # make sure outgoing links don't show the URL to the Matomo instance
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    root /home/ewilan/www/matomo/; # replace with path to your matomo instance

    index index.php;

    ## only allow accessing the following php files
    location ~ ^/(index|matomo|piwik|js/index|plugins/HeatmapSessionRecording/configs)\.php$ {
        include snippets/fastcgi-php.conf; # if your Nginx setup doesn't come with a default fastcgi-php config, you can fetch it from https://github.com/nginx/nginx/blob/master/conf/fastcgi.conf
        try_files $fastcgi_script_name =404; # protects against CVE-2019-11043. If this line is already included in your snippets/fastcgi-php.conf you can comment it here.
        fastcgi_param HTTP_PROXY ""; # prohibit httpoxy: https://httpoxy.org/
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock; #replace with the path to your PHP socket file
        #fastcgi_pass 127.0.0.1:9000; # uncomment if you are using PHP via TCP sockets (e.g. Docker container)
    }

    ## deny access to all other .php files
    location ~* ^.+\.php$ {
        deny all;
        return 403;
    }

    ## serve all other files normally
    location / {
        try_files $uri $uri/ =404;
    }

    ## disable all access to the following directories
    location ~ ^/(config|tmp|core|lang) {
        deny all;
        return 403; # replace with 404 to not show these directories exist
    }

    location ~ /\.ht {
        deny  all;
        return 403;
    }

    location ~ js/container_.*_preview\.js$ {
        expires off;
        add_header Cache-Control 'private, no-cache, no-store';
    }

    location ~ \.(gif|ico|jpg|png|svg|js|css|htm|html|mp3|mp4|wav|ogg|avi|ttf|eot|woff|woff2)$ {
        allow all;
        ## Cache images,CSS,JS and webfonts for an hour
        ## Increasing the duration may improve the load-time, but may cause old files to show after an Matomo upgrade
        expires 1h;
        add_header Pragma public;
        add_header Cache-Control "public";
    }

    location ~ ^/(libs|vendor|plugins|misc|node_modules) {
        deny all;
        return 403;
    }

    ## properly display textfiles in root directory
    location ~/(.*\.md|LEGALNOTICE|LICENSE) {
        default_type text/plain;
    }
}
# vim: filetype=nginx

```

```bash
sudo ln -s /etc/nginx/sites-available/matomo.example.com.conf /etc/nginx/sites-enabled
sudo certbot --nginx
```

Now you have to create a MySQL matomo user and database. Go to **matomo.example.com** and setup Matomo with guide.

## Update

```bash
sudo chmod 777 /home/user/www/matomo
```
