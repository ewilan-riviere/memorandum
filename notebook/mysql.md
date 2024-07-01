---
title: MySQL / MariaDB
description: Notes on MySQL and MariaDB
---

# MySQL / MariaDB

{{ $frontmatter.description }}

## Connection

::: code-group

```sh [MariaDB]
mariadb -u root -p
```

```sh [MySQL]
mysql -u root -p
```

:::

## Change `root` password

```sql
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('super_secret_password');
FLUSH PRIVILEGES;
```

## Create database

::: code-group

```sh [MariaDB]
CREATE DATABASE `my_project_database`;
CREATE USER 'my_project_user'@localhost IDENTIFIED BY 'super_secret_password';
GRANT ALL privileges ON my_project_database.* TO 'my_project_user'@localhost;
FLUSH PRIVILEGES;
```

```sh [MySQL]
CREATE DATABASE my_project_database;
CREATE USER 'my_project_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'secret_password';
GRANT ALL ON my_project_database.* TO 'my_project_user'@'localhost';
```

:::

## List databases

```sql
SHOW DATABASES;
```
