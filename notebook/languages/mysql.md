---
title: MySQL / MariaDB
description: Notes on MySQL and MariaDB
---

# MySQL / MariaDB

{{ $frontmatter.description }}

::: info
If you use MariaDB, you can use the same commands as MySQL.
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
