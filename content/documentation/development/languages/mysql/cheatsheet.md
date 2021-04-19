---
title: Cheatsheet
description: ''
position: 1
category: 'MySQL'
---

## Database importation

<alert type="info"> About Windows
Don't use `PowerShell` to execute below commands, use `cmd` if you want to import database with correct encoding.
</alert>

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

## Useful commands

### Delete user

```mysql[mysql]
DROP USER 'user'@'localhost';
```

### List of all users

```mysql[mysql]
SELECT host,user,plugin,host FROM mysql.user;
```
