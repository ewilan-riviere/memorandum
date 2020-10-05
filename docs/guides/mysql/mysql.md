# MySQL

## Database importation

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

:::tip About Windows
Don't use `PowerShell` to execute below command, use `cmd` if you want to import database with correct encoding.
:::

```bash
mysql -u username -p password db_name < file.sql
```
