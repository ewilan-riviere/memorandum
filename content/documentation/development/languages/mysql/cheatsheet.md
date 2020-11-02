---
title: Cheatsheet
description: ''
position: 1
category: 'MySQL'
---

## Database importation

:::tip About Windows
Don't use `PowerShell` to execute below commands, use `cmd` if you want to import database with correct encoding.
:::

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

**Import database directly**

`-u` specify user and `-p` specify connection with password, this one will be asked when command is executed.

In this example, prompt is in same directory of `file.sql`, of course it's necessary to give the relative path of SQL file with this command.

```bash
mysql -u username -p db_name < file.sql
```
