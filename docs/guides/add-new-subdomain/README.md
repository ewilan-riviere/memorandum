# Add new subdomain

## 1. Create subdomain

On your domain host, like [**Hostinger**](https://www.hostinger.fr/), select the domain you want to manage. Choose `DNS Zone`. In `CNAME (Alias)` zone add just new entry with `subdomain` for host and `ewilan-riviere.com` for main domain to have new subdomain like `subdomain.ewilan-riviere.com`.

| Host      | Point to           | TTL         |
|-----------|--------------------|-------------|
| subdomain | ewilan-riviere.com | Don't touch |

## 2. Server configuration

On your server, add your repository where you want to stock it, like `/var/www`. And move to `/etc/nginx/sites-available` to create new configuration file for your subdomain:

```nginx
server {
    # Http
    listen 80;
    # Resources website
    root /var/www/ewilan-riviere.com/vuepress/docs/.vuepress/dist;
    
    # Index to follow
    index index.php index.html index.htm index.nginx-debian.html;

    # Domain
    server_name vuepress.ewilan-riviere.com;

    # Root behaviour
    location / {
        try_files $uri $uri/ /index.php$is_args$args;
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

Here we have resources into `/var/www/ewilan-riviere.com/vuepress` and index is in the directory `vuepress/docs/.vuepress/dist`, so `root` have to link to `/var/www/ewilan-riviere.com/vuepress/docs/.vuepress/dist`.  
Check `server_name` to add url of your subdomain, here we have `̀vuepress.ewilan-riviere.com`.

## 3. Subdomain validation

Create symlink like this:

```bash
sudo ln -s /etc/nginx/sites-available/vuepress.ewilan-riviere.com /etc/nginx/sites-enabled/
```

And test nginx configuration with this command:

```bash
sudo nginx -t
```

You will have output like this:

```bash
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

If you have any error, this command will give you infos to fix. But if all is OK, reload nginx with this command:

```bash
sudo service nginx reload
```

Your subdomain is now available and your project is deploy !

## 4. Add HTTPS

Visit [**Cerbot**](https://certbot.eff.org/instructions) and choose your web server and your distribution. Follow instruction for installation if it's first time and just use this command to generate certificates for all your websites:

```bash
# For NGINX web server
sudo certbot --nginx
```

You can select websites for HTTPS and generate or renew certificate.