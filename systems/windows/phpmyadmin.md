---
title: phpMyAdmin
description: "How to setup phpMyAdmin on Windows"
---

# phpMyAdmin

::: warning Scoop is necessary
This guide use `scoop` to install this binary, if you don't have it, check [this guide](/systems/windows/scoop)
:::

## Download

Download [**phpMyAdmin**](https://www.phpmyadmin.net) last version and extract it to `html` folder in `nginx`. Rename it `phpmyadmin` and check in the below example if you have same file hierarchy.
Full path: `C:\Users\username\scoop\apps\nginx\current\html`

```
📦C:/Users/username/scoop/apps/nginx/current
 ┣ 📂conf
 ┣ 📂conf.original
 ┣ 📂contrib
 ┣ 📂docs
 ┣ 📂html
 ┃ ┣ 📂phpmyadmin
 ┃ ┃ ┣ 📂doc
 ┃ ┃ ┣ 📂...
 ┃ ┣ 📜50x.html
 ┃ ┣ 📜index.html
 ┃ ┗ 📜info.php
 ┣ 📂html.original
 ┣ 📂logs
 ┣ 📂logs.original
 ┣ 📂temp
 ┗ 📜nginx.exe
```

### Configure nginx.conf

::alert{type="warning"}
PHP Service

> Here, I suppose you have installed `php-nts` with **scoop** and create php8.2 Service with **NSSM**.

If you want to use another version of PHP, it's not a problem, just check port `9082` to change it if you use anoter.
::

You will need to add some infos to `nginx.conf` (you will find it where **scoop** install **NGINX** `C:\Users\username\scoop\apps\nginx\current\conf\nginx.conf`) for **phpMyAdmin**.

For default `server` (`server_name  localhost;`) block

- `index.php` to `location /` block
- `location ~ \.php$` block (see example for complete block)

::callout{type="info"}
#summary
NGINX configuration example
#content

```nginx:C:\Users\username\scoop\apps\nginx\current\conf\nginx.conf

# ...

events {
    # ...
}

http {
    # ...

    server {
        listen       80;
        server_name  localhost;

        location / {
            # ...

            # 'index.php' for phpmyadmin
            index  index.php index.html index.htm;
        }

        # ...

        # 'location' block for phpmyadmin (with PHP 8.2)
        location ~ \.php$ {
            fastcgi_pass   127.0.0.1:9082;
            include        fastcgi.conf;
        }
    }

    # ...

}
```

::

You have update **nginx.conf**, so you need to restart NGINX Service:

```ps1
sudo nssm restart nginx
```

In any browser, at <http://localhost/phpmyadmin>, you have to see **phpMyAdmin welcome** page

### Configure phpMyAdmin (optional)

```sh
cp C:/Users/$env:UserName/scoop/apps/nginx/current/html/phpmyadmin/config.sample.inc.php C:/Users/$env:UserName/scoop/apps/nginx/current/html/phpmyadmin/config.inc.php
```

In `C:/Users/$env:UserName/scoop/apps/nginx/current/html/phpmyadmin`

```php title="config.inc.php"
// blowfish_secret is just a token for phpMyAdmin
$cfg['blowfish_secret'] = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

/* Authentication type */
$cfg['Servers'][$i]['auth_type'] = 'cookie';
// Add this line to stay connected during one week
$cfg['LoginCookieValidity'] = 604800;
```

To generate `blowfish_secret`, you can use `pwgen` with **WSL**.

```sh
sudo apt install pwgen ; pwgen -s 32 1
```

If you update `LoginCookieValidity`, you need to update `session.gc_maxlifetime` in current `php.ini`

```php title="php.ini]
// line ~1400
session.gc_maxlifetime = 604800
```
