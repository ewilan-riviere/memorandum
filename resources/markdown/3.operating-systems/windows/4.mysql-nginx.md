---
title: MySQL & NGINX
description: 'How to setup MySQL and NGINX on Windows'
position: 4
category: 'Windows'
---

::alert{type="warning"}> scoop is necessary

For this guide, you will need to have **scoop** installed, if you don't install it, check this guide: [**scoop**](/development/operating-systems/windows/scoop)

::

## MySQL

Install MySQL with **scoop**

```powershell[PowerShell]
sudo scoop install mysql
```

You will have some infos in output, but find this line:

```powershell[Output]
mysqld --install MySQL --defaults-file="C:\Users\username\scoop\apps\mysql\current\my.ini"
```

Copy/paste it and execute it with `sudo` (if you take this example, change `username`). This command will install **Service** for MySQL.

```powershell[PowerShell]
sudo mysqld --install MySQL --defaults-file="C:\Users\username\scoop\apps\mysql\current\my.ini"
```

Open **Task Manager** and find **Services** tab, search **MySQL**, click right on it to **start** this **Service**

<content-image source="task-manager.webp"></content-image>

### Create new user

Access to MySQL CLI with `mysql`

```powershell[PowerShell]
mysql
```

*Alter* `root` user (you can change `password` if you want more secure password)

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
```

And *Create* new user, you can change `username` and `password`

```sql
CREATE USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' WITH GRANT OPTION;
exit
```

## NGINX

::alert{type="warning"}> PHP is highly recommanded

For some configurations, you will need to have **PHP** installed, if you don't install it, check this guide: [**PHP**](/development/operating-systems/windows/php)

::

Here you will need to have **NSSM**, I give more details in [**PHP guide**](/development/operating-systems/windows/php).

Install **NGINX** with **scoop**

```powershell[PowerShell]
sudo scoop install nginx
```

### Create Service

And install a new service, here for NGINX

```powershell[PowerShell]
sudo nssm install nginx
```

You will have a window to create new service, two input will be important: **Path**

<content-image source="nssm-nginx.png"></content-image>

For **Path**, get **path** of **current** **nginx**, in this example change `username`

```[path]
C:\Users\username\scoop\apps\nginx\current\nginx.exe
```

Save the new service and start it:

```powershell[PowerShell]
sudo nssm start nginx
```

If you change some data, like with **nginx.conf**, you will need to **restart Service**.

```powershell[PowerShell]
sudo nssm restart nginx
```

In any browser, at <http://localhost>, you have to see **NGINX welcome** page:

<content-image source="nginx-welcome.png"></content-image>

## phpMyAdmin

::alert{type="warning"}> PHP is necessary

For this guide, you will need to have **PHP** installed, if you don't install it, check this guide: [**PHP**](/development/operating-systems/windows/php)

::

### Download

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

::alert{type="warning"}> PHP Service

Here, I suppose you have installed `php7.4-nts` with **scoop** and create php7.4 Service with **NSSM**, like in this guide: [**PHP**](/development/operating-systems/windows/php)

If you want to use another version of PHP, it's not a problem, just check port `9074` to change it if you use anoter.

::

You will need to add some infos to `nginx.conf` (you will find it where **scoop** install **NGINX** `C:\Users\username\scoop\apps\nginx\current\conf\nginx.conf`) for **phpMyAdmin**.

For default `server` (`server_name  localhost;`) block

- `index.php` to `location /` block
- `location ~ \.php$` block (see example for complete block)

<spoiler label="NGINX configuration example">

```nginx[C:\Users\username\scoop\apps\nginx\current\conf\nginx.conf]

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

        # 'location' block for phpmyadmin (with PHP 7.4)
        location ~ \.php$ {
            fastcgi_pass   127.0.0.1:9074;
            include        fastcgi.conf;
        }
    }

    # ...

}
```

</spoiler>

You have update **nginx.conf**, so you need to restart NGINX Service:

```powershell[PowerShell]
sudo nssm restart nginx
```

In any browser, at <http://localhost/phpmyadmin>, you have to see **phpMyAdmin welcome** page:

<content-image source="pma-welcome.png" legend="Welcome page of phpMyAdmin"></content-image>

### Configure phpMyAdmin (optional)

```bash
cp C:/Users/$env:UserName/scoop/apps/nginx/current/html/phpmyadmin/config.sample.inc.php C:/Users/$env:UserName/scoop/apps/nginx/current/html/phpmyadmin/config.inc.php
```

In `C:/Users/$env:UserName/scoop/apps/nginx/current/html/phpmyadmin`

```php[config.inc.php]
// blowfish_secret is just a token for phpMyAdmin
$cfg['blowfish_secret'] = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

/* Authentication type */
$cfg['Servers'][$i]['auth_type'] = 'cookie';
// Add this line to stay connected during one week
$cfg['LoginCookieValidity'] = 604800;
```

To generate `blowfish_secret`, you can use `pwgen` with [**WSL**](/devops/operating-systems/wsl).

```bash
sudo apt install pwgen ; pwgen -s 32 1
```

If you update `LoginCookieValidity`, you need to update `session.gc_maxlifetime` in current `php.ini`

```php[php.ini]
// line ~1400
session.gc_maxlifetime = 604800
```

## Add a new VHost

Add a new VHost to **nginx.conf**: `C:\Users\username\scoop\apps\nginx\current\conf\nginx.conf`

- Add `server_names_hash_bucket_size  64;` to `http` block (just once, not for each VHost)
- If you want a VHost check example `server` block with `server_name laravel.localhost;`

<spoiler label="New VHost with NGINX example">

```nginx[C:\Users\username\scoop\apps\nginx\current\conf\nginx.conf]

# ...

events {
    # ...
}

http {
    # ...

    # 'server_names_hash_bucket_size' for VHost
    server_names_hash_bucket_size  64;

    # default server
    server {
        # ...
    }

    # Example of 'server' block for Laravel (with PHP 7.4)
    server {
        listen 80;
        server_name laravel.localhost;
        root "C:/workspace/laravel/public";
        index index.php index.html index.htm index.nginx-debian.html;

        location / {
            try_files $uri $uri/ /index.php?$query_string;
        }

        location ~ \.php$ {
            fastcgi_pass   127.0.0.1:9074;
            include        fastcgi.conf;
        }
    }

    # ...

}
```

</spoiler>

You have update **nginx.conf**, so you need to restart NGINX Service:

```powershell[PowerShell]
sudo nssm restart nginx
```

### hosts

You will need to update **hosts** to have a new VHost, you will find it here: *C:\Windows\System32\drivers\etc\hosts*. Open it with any IDE and, **at the end**, add two lines for each VHost with same `server_name` of `server` block. In my example, the `server_name` is `server_name laravel.localhost;`

```
127.0.0.1       laravel.localhost
::1             laravel.localhost
```

To save it, you need to be admin, you can use Visual Studio Code if you have any problems.

---

In any browser, at <http://laravel.localhost>, you have to see the app[^1].

[^1]: For some browser, you will need to restart it.
