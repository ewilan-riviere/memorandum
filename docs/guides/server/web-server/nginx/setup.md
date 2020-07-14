# Setup

Nginx is a powerful web server, it's really fastest if we compare it to Apache. To use it with PHP, we need to install `php-fpm`, to enable communication between Nginx and PHP. Check [LEMP configuration](/guides/digital-ocean-init.html#_3-lemp-linux-nginx-mysql-php) to know how install NGINX and PHP-FPM.

## 1. Basic configuration

&nbsp;

<code-heading type="nginx" path="/etc/nginx/sites-available/my-domain"></code-heading>
```nginx{3,5,7}
server {
    listen 80;
    root /var/www/my-repository-name;
    index index.php index.html index.htm index.nginx-debian.html;
    server_name my-domain.com;
    
    error_log logs/my-repository-name.log warn;

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

### 1. b. Laravel configuration

Configuration for [Laravel](https://laravel.com/) application, this app need a specific configuration for `storage` directory if you use it.

<code-heading type="nginx" path="/etc/nginx/sites-available/my-laravel-domain"></code-heading>
```nginx{3,5,7,10,13}
server {
    listen 80;
    root /var/www/repository-name/public;
    index index.php index.html index.htm index.nginx-debian.html;
    server_name domain.localhost;
    
    error_log /var/log/nginx/repository-name.log warn;

    location / {
        try_files $uri $uri/ /index.php$is_args$args;
    }
    location /.* {
        root /var/www/repository-name/storage/app/public;
        autoindex on;
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

## 2. Activate configuration

Create symlink like this:

```bash
sudo ln -s /etc/nginx/sites-available/my-domain /etc/nginx/sites-enabled/
```

And test nginx configuration with this command:

```bash
sudo nginx -t
```

You have to see an output like this:

> nginx: the configuration file /etc/nginx/nginx.conf syntax is ok  
> nginx: configuration file /etc/nginx/nginx.conf test is successful

NGINX can print **warning** about some configurations but if this output is print at the end, it will work. If you have any **error**, this command will give you infos to fix. If config is OK, execute this command to reload NGINX:

```bash
sudo service nginx reload
```

Your **subdomain is now available** and **your project is deploy** !

## 3. Add HTTPS

Today, it's really important to have HTTPS website, it's a trust mark, and it's now really easy to obtain it thanksful to [Let's Encrypt](https://letsencrypt.org/) which provides TLS certificate freely. You have some other projects like [SSL For Free](https://www.sslforfree.com/).  
With Shell access, you can use [Certbot](https://certbot.eff.org/) to install Certbot on your server to create and renew certificates. Just follow [steps](https://certbot.eff.org/instructions), enter software and sytem and you will obtain some commands to install this amazing tool. When it's installed on your server, you can create or renew certificates with this command (for NGINX):

```bash
sudo certbot --nginx
```

You have to select websites and you will can choose if you want an automatic redirection to HTTPS (it's a good idea). If you add any website after this, just execute command again. Certificates have a lifetime, you have to renew it after some weeks with just same command.  
Certbot will update NGINX configuration for all selected websites, it will add HTTPS management, careful if you modify it after. But if you broke HTTPS config, remove all which Certbot add and re execute certbot command.

## 4. Cheatsheet

List virtual hosts with Nginx

```bash
grep server_name /etc/nginx/sites-enabled/* -RiI
```

Uninstall NGINX

```bash
sudo apt-get purge nginx nginx-common
sudo apt-get autoremove
```
