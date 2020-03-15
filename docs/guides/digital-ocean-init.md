# 💧 Digital Ocean: droplet init

<img src="/images/digital-ocean-droplet-init.png" class="cover-img" />

[[toc]]

## 1. Server configuration

[Digital Ocean: server setup](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)

```bash
adduser ewilan
usermod -aG sudo ewilan
```

```bash
ufw app list
ufw allow OpenSSH
ufw enable
```

## 2. LAMP: Linux, Apache, MyQL, PHP

[Digital Ocean: LAMP](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-ubuntu-18-04)

### 2. a. Apache and firewall

```bash
sudo apt update
sudo apt install -y apache2
sudo ufw app list
sudo ufw app info "Apache Full"
sudo ufw allow in "Apache Full"
sudo apt install -y curl
```

### 2. b. MySQL

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

### 2. c. PHP

```bash
sudo apt install php libapache2-mod-php php-mysql
sed -i 's/DirectoryIndex index.html index.cgi index.pl index.php index.xhtml index.htm/DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm/g' /etc/apache2/mods-enabled/dir.conf
sudo systemctl restart apache2
sudo apt install php-cli
```

### 2. d. Virtual host

```bash
sudo mkdir /var/www/my-domain.localhost
sudo chown -R $USER:$USER /var/www/my-domain.localhost
sudo chmod -R 755 /var/www/my-domain.localhost
cat > /var/www/my-domain.localhost/index.html << EOF
<html>
    <head>
        <title>Welcome to my-domain.localhost!</title>
    </head>
    <body>
        <h1>Success!  The my-domain.localhost server block is working!</h1>
    </body>
</html>
EOF
sudo cat > /etc/apache2/sites-available/my-domain.localhost.conf << EOF
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName your_domain
    ServerAlias www.your_domain
    DocumentRoot /var/www/your_domain
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
EOF

sudo a2ensite my-domain.localhost.conf
sudo apache2ctl configtest
sudo systemctl restart apache2
```

## 3. LEMP: Linux, Nginx, MySQL, PHP

[Digital Ocean: LEMP](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-ubuntu-18-04)

### 3. a. Nginx and firewall

```bash
sudo apt update
sudo apt install -y nginx

sudo ufw allow 'Nginx HTTP'
```

### 2. b. MySQL

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

### 3. c. PHP

```bash
sudo apt install php-fpm php-mysql
```

::: tip
If not work, add this repository:  
`sudo add-apt-repository universe`
:::

### 4. d. Virtual Host

```bash
sudo cat > /etc/nginx/sites-available/my-domain.localhost << EOF
server {
    listen 80;
    root /var/www/my-domain.localhost;
    index index.php index.html index.htm index.nginx-debian.html;
    server_name my-domain.localhost;

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
EOF
sudo ln -s /etc/nginx/sites-available/my-domain.localhost /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 4. phpMyAdmin <Badge text="nginx"/>

[Digital Ocean: phpMyAdmin with Apache](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-18-04)  
[Digital Ocean: phpMyAdmin with Nginx](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-with-nginx-on-an-ubuntu-18-04-server)

```bash
sudo apt update
sudo apt install phpmyadmin
```

::: danger
Don't select anything because it's Nginx.  
Just press <kbd>&nbsp;&#8633;&nbsp;</kbd> to select `OK`
:::

```bash
sudo ln -s /usr/share/phpmyadmin /var/www/html/phpmyadmin
sudo mv /var/www/html/phpmyadmin /var/www/html/wonderful-unicorn

sudo touch /etc/phpmyadmin/conf.d/pma_secure.php

sudo cat > /etc/phpmyadmin/conf.d/pma_secure.php << EOF
<?php

# PhpMyAdmin Settings
# This should be set to a random string of at least 32 chars
$cfg['blowfish_secret'] = '3!#32@3sa(+=_4?),5XP_:U%%8\34sdfSdg43yH#{o';

$i=0;
$i++;

$cfg['Servers'][$i]['auth_type'] = 'cookie';
$cfg['Servers'][$i]['AllowNoPassword'] = false;
$cfg['Servers'][$i]['AllowRoot'] = false;

?>
EOF
```



