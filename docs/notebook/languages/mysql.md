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

## Create new database

### localhost

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

## Network

::: code-group

```sql [MariaDB]
CREATE DATABASE `my_project_database`;
CREATE USER 'my_project_user'@'%' IDENTIFIED BY 'super_secret_password';
GRANT ALL privileges ON my_project_database.* TO 'my_project_user'@'%';
FLUSH PRIVILEGES;
```

```sql [MySQL]
CREATE DATABASE my_project_database;
CREATE USER 'my_project_user'@'%' IDENTIFIED WITH mysql_native_password BY 'secret_password';
GRANT ALL ON my_project_database.* TO 'my_project_user'@'%';
```

:::
