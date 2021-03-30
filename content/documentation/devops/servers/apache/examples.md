---
title: Examples
description: Examples of Apache2 configurations
position: 1
category: 'Apache2'
---

## 1. Basic configuration

<vue-code-info ext="apache" path="/etc/nginx/sites-available/my-domain.conf"></vue-code-info>

```apacheconf
<VirtualHost *:80>
    ServerAdmin webmaster@my-domain.com
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
