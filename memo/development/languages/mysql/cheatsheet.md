---
title: Cheatsheet
description: ''
position: 1
category: 'MySQL'
---

## Database importation

<content-alert type="info"> About Windows
Don't use `PowerShell` to execute below commands, use `cmd` if you want to import database with correct encoding.
</content-alert>

`-u` specify user and `-p` specify connection with password, this one will be asked when command is executed.

In this example, prompt is in same directory of `file.sql`, of course it's necessary to give the relative path of SQL file with this command.

```bash
mysql -u username -p db_name < file.sql
```

### With more details

```bash
mysql -u user -p
```

**Create database**

With CLI or in phpMyAdmin

```sql
CREATE DATABASE db_name;
```

**Import database in verbose**

```sql
use db_name
source file.sql
```

## dump

To save database, it's useful to dump like this

```bash
mysqldump -u user -p --databases my_database > my_database.sql
```

Source: <https://community.jaguar-network.com/sauvegarde-automatique-dune-db-mysql-avec-mysqldump>

## Useful commands

### Delete user

```mysql[mysql]
DROP USER 'user'@'localhost';
```

### List of all users

```mysql[mysql]
SELECT host,user,plugin,host FROM mysql.user;
```

## Rename database

- From <https://stackoverflow.com/questions/67093/how-do-i-quickly-rename-a-mysql-database-change-schema-name>

To rename database you need to create new database and dump old database into the new, you can use a script to execute this

```bash[~/bin/rename_database.sh]
#!/bin/bash
set -e # terminate execution on command failure

mysqlconn="mysql -u root -ppassword"
olddb=$1
newdb=$2
$mysqlconn -e "CREATE DATABASE $newdb"
params=$($mysqlconn -N -e "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES \
                           WHERE table_schema='$olddb'")
for name in $params; do
      $mysqlconn -e "RENAME TABLE $olddb.$name to $newdb.$name";
done;
$mysqlconn -e "DROP DATABASE $olddb"
```

```bash
sh ~/bin/rename_database.sh old_database new_database
```
