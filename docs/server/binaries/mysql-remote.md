---
title: MySQL / MariaDB Remote Access
description: How to enable remote access for MySQL / MariaDB
---

# MySQL / MariaDB Remote Access

{{ $frontmatter.description }}

## Configuration

To allow remote access to your MySQL / MariaDB server, you need to modify the configuration file.

::: code-group

```sh [MariaDB]
sudo vim /etc/mysql/mariadb.conf.d/50-server.cnf
```

```sh [MySQL]
sudo vim /etc/mysql/my.cnf
```

:::

```sh:/etc/mysql/mariadb.conf.d/50-server.cnf
[mysqld]
bind-address = 0.0.0.0
```

## Create a new user

And you have to allow the user to connect from any host:

::: code-group

```sql [MariaDB]
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'super_secret_password' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

:::

::: warning
This is not recommended for production environments. It's better to allow only specific IP addresses.
:::

And restart the MySQL / MariaDB service:

::: code-group

```sh [MariaDB]
sudo systemctl restart mariadb
```

```sh [MySQL]
sudo systemctl restart mysql
```

:::

## UFW

If you use `ufw`, you need to allow incoming connections to the MySQL / MariaDB port (default is 3306):

```sh
sudo ufw allow 3306
sudo ufw allow from IP.ADDRESS.OF.REMOTE_DEVICE to any port 3306
```

## Access to remote MySQL / MariaDB

You can test the connection from another machine:

```sh
mysql -h IP.ADDRESS.OF.DATABASE -P 3306 -u your_username -p
```
