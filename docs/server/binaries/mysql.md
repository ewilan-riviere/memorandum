---
title: MySQL / MariaDB
description: MariaDB was created as a fully open-source fork of MySQL after Oracle’s acquisition, aiming to preserve software freedom and transparency. While MySQL remains stable and well-integrated within Oracle’s ecosystem, MariaDB offers a more community-driven development model, faster performance in complex queries and replication, and greater flexibility through additional storage engines. In short, MariaDB focuses on openness and innovation, whereas MySQL emphasizes enterprise stability and compatibility.
---

# MySQL / MariaDB

{{ $frontmatter.description }}

::: info
If you use MariaDB, you can use the same commands as MySQL.

- **MariaDB**: **open source** software, comprehensive **performance**, community **innovation**
- **MySQL**: **compatibility** with Oracle/AWS ecosystem, enterprise-grade **stability**
  :::

## Installation

Install MySQL or MariaDB (MySQL fork). For Debian, MariaDB is recommended (MySQL is also available).

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

### Change `root` password

When you are connected to MySQL / MariaDB shell, you can change the `root` password with:

::: code-group

```sql [Common]
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('password');
FLUSH PRIVILEGES;
```

```sql [Alternative]
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
```

:::

### Password level troubleshooting

- Choose password level, I advice `LOW` to avoid problems with password.
- Define password
- Select `Yes` for all questions after this.

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

## Cheatsheet

### Connection

::: code-group

```sh [MariaDB]
mariadb -u root -p
```

```sh [MySQL]
mysql -u root -p
```

:::

#### Remote connection

::: code-group

```sh [MariaDB]
mariadb -h IP.ADDRESS.OF.DATABASE -P 3306 -u my_user -p
```

```sh [MySQL]
mysql -h IP.ADDRESS.OF.DATABASE -P 3306 -u my_user -p
```

:::

### List users

In the MySQL / MariaDB shell, you can list users with:

```sql
SELECT User, Host FROM mysql.user;
```

### List databases

In the MySQL / MariaDB shell, you can list databases with:

```sql
SHOW DATABASES;
```

### Create user

::: code-group

```sql [MariaDB]
CREATE USER 'MY_NEW_USER'@localhost IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
```

```sql [MySQL]
CREATE USER 'MY_NEW_USER'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

:::

#### Create user with specific host

You can create user with specific host like this:

::: warning
It's not recommended to use `%` wildcard in production environment. It's better to allow only specific IP addresses, like `user'@'YOUR.IP.ADDRESS'`.
:::

::: code-group

```sql [MariaDB wildcard]
CREATE USER 'MY_NEW_USER'@'%' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
```

```sql [MySQL wildcard]
CREATE USER 'MY_NEW_USER'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
```

```sql [MariaDB]
CREATE USER 'MY_NEW_USER'@'IP.ADDRESS.OF.REMOTE_DEVICE' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
```

```sql [MySQL]
CREATE USER 'MY_NEW_USER'@'IP.ADDRESS.OF.REMOTE_DEVICE' IDENTIFIED WITH mysql_native_password BY 'password';
```

:::

### Create database

Here, it's an example of this solution, `my_project_database` and `my_project_user` can be same.

It's not a good idea to have one user to manage all databases, `root` user is useful to create database and users but only on your server. It's a good idea to create ONE user BY database and give rights about this database only to this NEW user (and `root` of course).

And, the most important, in your application, give new user for credentials. With this solution, your credentials can only manage ONE database, it's more secure if someone find credentials.

::: code-group

```sql [MariaDB]
CREATE DATABASE `MY_NEW_DATABASE`;
CREATE USER 'MY_NEW_USER'@localhost IDENTIFIED BY 'password';
GRANT ALL privileges ON MY_NEW_DATABASE.* TO 'MY_NEW_USER'@localhost;
FLUSH PRIVILEGES;
```

```sql [MySQL]
CREATE DATABASE MY_NEW_DATABASE;
CREATE USER 'MY_NEW_USER'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL ON MY_NEW_DATABASE.* TO 'MY_NEW_USER'@'localhost';
```

:::

### Drop user

::: code-group

```sql [MariaDB]
DROP USER 'MY_NEW_USER'@localhost;
FLUSH PRIVILEGES;
```

```sql [MySQL]
DROP USER 'MY_NEW_USER'@'localhost';
```

:::

### Drop database

```sql
DROP DATABASE MY_NEW_DATABASE;
```

## Remote Access

To allow remote access to your MySQL / MariaDB server, you need to modify the configuration file.

::: code-group

```sh [MariaDB]
sudo vim /etc/mysql/mariadb.conf.d/50-server.cnf
```

```sh [MySQL]
sudo vim /etc/mysql/my.cnf
```

:::

Add or modify the following line to bind the server to all IP addresses:

::: code-group

```sh:/etc/mysql/mariadb.conf.d/50-server.cnf [MariaDB]
[mysqld]
bind-address = 0.0.0.0
```

```sh:/etc/mysql/my.cnf [MySQL]
[mysqld]
bind-address = 0.0.0.0
```

:::

### Create a remote user

And you have to allow the user to connect from any host with `%` wildcard:

::: code-group

```sql [MariaDB]
CREATE USER 'my_user'@'%' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
```

:::

::: warning
This is not recommended for production environments. It's better to allow only specific IP addresses, like `user'@'YOUR.IP.ADDRESS'`.
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

### Allow port with UFW

If you use `ufw`, you need to allow incoming connections to the MySQL / MariaDB port (default is 3306):

```sh
sudo ufw allow 3306
sudo ufw allow from IP.ADDRESS.OF.REMOTE_DEVICE to any port 3306
```

### Test remote access

You can test the connection from another machine:

```sh
mysql -h IP.ADDRESS.OF.DATABASE -P 3306 -u my_user -p
```

### Create a global remote user

You can create a user to avoid to use root for remote access:

```sql
CREATE USER 'global_remote_user'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `my_database_1`.* TO 'global_remote_user'@'%' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON `my_database_2`.* TO 'global_remote_user'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

You have just to use `%` wildcard to allow connection from any host and allow this user to access only specific databases (and not all databases like root user).

## Export/Import

### Exportation

- Replace `USERNAME` with your MySQL / MariaDB username
- Replace `PASSWORD` with your MySQL/ MariaDB password. Note that there's no space between -p and the password
- Replace `DATABASE_NAME` with the name of the database you want to export
- Replace `OUTPUT_FILE.sql` with the path and name of the file where you want to save the exported data
- Replace `TABLE_A`, `TABLE_B`, etc., with the names of the tables you want to export

#### Basic

```sh
mysqldump -u USERNAME -pPASSWORD DATABASE_NAME > OUTPUT_FILE.sql
```

#### With Compression

```sh
mysqldump -u USERNAME -pPASSWORD DATABASE_NAME | gzip > OUTPUT_FILE.sql.gz
```

#### All Databases and more options

- `--all-databases` to export all databases.
- `--single-transaction` for consistent backups without locking the database tables.
- `--add-drop-table` to include DROP TABLE IF EXISTS statements in the dump.
- `--routines` to include stored routines (procedures and functions).
- `--triggers` to include triggers.

```sh
mysqldump -u USERNAME -pPASSWORD --all-databases > OUTPUT_FILE.sql
```

#### Specific Tables

```sh
mysqldump -u USERNAME -pPASSWORD DATABASE_NAME TABLE_A TABLE_B > OUTPUT_FILE.sql
```

### Importation

- Replace `USERNAME` with your MySQL / MariaDB username
- Replace `PASSWORD` with your MySQL/ MariaDB password. Note that there's no space between -p and the password
- Replace `DATABASE_NAME` with the name of the database you want to export
- Replace `INPUT_FILE.sql` with the path and name of the file you want to import

#### Basic

```sh
mysql -u USERNAME -pPASSWORD -e "CREATE DATABASE DATABASE_NAME;"
mysql -u USERNAME -pPASSWORD DATABASE_NAME < INPUT_FILE.sql
```

#### With Compression

```sh
gunzip < INPUT_FILE.sql.gz | mysql -u USERNAME -pPASSWORD DATABASE_NAME
```

#### All Databases

If the dump file contains all databases (created with `--all-databases`), you don't need to specify a database name:

```sh
mysql -u USERNAME -pPASSWORD < INPUT_FILE.sql
```
