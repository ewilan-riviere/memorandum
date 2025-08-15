---
title: MySQL / MariaDB
description: MySQL is an open-source relational database management system. MariaDB is a community-developed, commercially supported fork of the MySQL relational database management system.
---

# MySQL / MariaDB

{{ $frontmatter.description }}

::: info
If you use MariaDB, you can use the same commands as MySQL.
:::

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

## Create a new database

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

## List databases

```sql
SHOW DATABASES;
```

## Exportation

- Replace `USERNAME` with your MySQL / MariaDB username
- Replace `PASSWORD` with your MySQL/ MariaDB password. Note that there's no space between -p and the password
- Replace `DATABASE_NAME` with the name of the database you want to export
- Replace `OUTPUT_FILE.sql` with the path and name of the file where you want to save the exported data
- Replace `TABLE_A`, `TABLE_B`, etc., with the names of the tables you want to export

### Basic

```sh
mysqldump -u USERNAME -pPASSWORD DATABASE_NAME > OUTPUT_FILE.sql
```

### With Compression

```sh
mysqldump -u USERNAME -pPASSWORD DATABASE_NAME | gzip > OUTPUT_FILE.sql.gz
```

### All Databases and more options

- `--all-databases` to export all databases.
- `--single-transaction` for consistent backups without locking the database tables.
- `--add-drop-table` to include DROP TABLE IF EXISTS statements in the dump.
- `--routines` to include stored routines (procedures and functions).
- `--triggers` to include triggers.

```sh
mysqldump -u USERNAME -pPASSWORD --all-databases > OUTPUT_FILE.sql
```

### Specific Tables

```sh
mysqldump -u USERNAME -pPASSWORD DATABASE_NAME TABLE_A TABLE_B > OUTPUT_FILE.sql
```

## Importation

- Replace `USERNAME` with your MySQL / MariaDB username
- Replace `PASSWORD` with your MySQL/ MariaDB password. Note that there's no space between -p and the password
- Replace `DATABASE_NAME` with the name of the database you want to export
- Replace `INPUT_FILE.sql` with the path and name of the file you want to import

### Basic

```sh
mysql -u USERNAME -pPASSWORD -e "CREATE DATABASE DATABASE_NAME;"
mysql -u USERNAME -pPASSWORD DATABASE_NAME < INPUT_FILE.sql
```

### With Compression

```sh
gunzip < INPUT_FILE.sql.gz | mysql -u USERNAME -pPASSWORD DATABASE_NAME
```

### All Databases

If the dump file contains all databases (created with `--all-databases`), you don't need to specify a database name:

```sh
mysql -u USERNAME -pPASSWORD < INPUT_FILE.sql
```
