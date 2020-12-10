---
title: "LAMP: Apache"
description: 'How to install Apache2 on Ubuntu'
position: 3
category: 'Linux'
---

[Digital Ocean: LAMP](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-ubuntu-18-04)

## 1. Apache and firewall

```bash
sudo apt update
sudo apt install -y apache2
sudo ufw app list
sudo ufw app info "Apache Full"
sudo ufw allow in "Apache Full"
sudo apt install -y curl
```

## 2. MySQL

```bash
sudo apt install -y mysql-server
sudo mysql_secure_installation
```

:::tip
Choose **STRONG level** password for public server and define it.
:::

```bash
sudo mysql
```

:::tip
If you have set password, you can use:  
`mysql -u root -p`
:::

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
exit
```

## 3. PHP

```bash
sudo apt install php libapache2-mod-php php-mysql
sed -i 's/DirectoryIndex index.html index.cgi index.pl index.php index.xhtml index.htm/DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm/g' /etc/apache2/mods-enabled/dir.conf
sudo systemctl restart apache2
sudo apt install php-cli
```

## 4. Virtual host

```bash
sudo mkdir /var/www/my-domain
sudo chown -R $USER:www-data /var/www/my-domain
sudo chmod -R 755 /var/www/my-domain
vim /var/www/my-domain/index.html
```

```html
<html>
    <head>
        <title>Welcome to my-domain.localhost!</title>
    </head>
    <body>
        <h1>Success!  The my-domain.localhost server block is working!</h1>
    </body>
</html>
```

```bash
sudo vim /etc/apache2/sites-available/my-domain.conf
```

```apacheconf
<VirtualHost *:80>
  ServerName my-domain.localhost
  DocumentRoot /var/www/my-domain
  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

```bash
sudo a2ensite my-domain.conf
sudo apache2ctl configtest
sudo systemctl restart apache2
```
