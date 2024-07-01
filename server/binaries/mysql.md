---
title: MySQL / MariaDB
description: MySQL is an open-source relational database management system. MariaDB is a community-developed, commercially supported fork of the MySQL relational database management system.
---

# MySQL / MariaDB

{{ $frontmatter.description }}

## Installation

Install MySQL or MariaDB (MySQL fork)

- For Debian, you can install MySQL but MariaDB is recommended
- For Ubuntu, you can install MySQL

::: code-group

```sh [Debian]
sudo apt install -y mariadb-server
sudo mysql_secure_installation
```

```sh [Ubuntu]
sudo apt install -y mysql-server
sudo mysql_secure_installation
```

:::

::: info About installation

- Choose password level, I advice `LOW` to avoid problems with password.
- Define password
- Select `Yes` for all questions after this.

:::

## Connect to MySQL

::: code-group

```sh [MariaDB]
mariadb -u root -p
```

```sh [MySQL]
mysql -u root -p
```

:::

Redefine `validate_password.policy` if necessary and `root` password if necessary

::: code-group

```sql [MariaDB]
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('password');
FLUSH PRIVILEGES;
```

```sql [MySQL]
SET GLOBAL validate_password.policy=LOW;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'super_secret_password';
FLUSH PRIVILEGES;
```

:::

### Create a new database

Here, it's an example of this solution, `my_project_database` and `my_project_user` can be same.

It's not a good idea to have one user to manage all databases, `root` user is useful to create database and users but only with MySQL CLI and not with phpMyAdmin because phpMyAdmin have online access. It's a good idea to create ONE user BY database and give rights about this database only to this NEW user (and `root` of course).

And, the most important, in your application, give new user for credentials. With this solution, your credentials can only manage ONE database, it's more secure if someone find credentials.

::: code-group

```sql [MariaDB]
CREATE DATABASE `my_project_database`;
CREATE USER 'my_project_user'@localhost IDENTIFIED BY 'super_secret_password';
GRANT ALL privileges ON my_project_database.* TO 'my_project_user'@localhost;
FLUSH PRIVILEGES;
```

```sql [MySQL]
CREATE DATABASE my_project_database;
CREATE USER 'my_project_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'secret_password';
GRANT ALL ON my_project_database.* TO 'my_project_user'@'localhost';
```

:::
