---
title: MySQL
description: "How to setup MySQL on Windows"
---

## MySQL

::: warning Scoop is necessary
This guide use `scoop` to install this binary, if you don't have it, check [this guide](/systems/windows/scoop)
:::

Install MySQL with **scoop**

```ps1
sudo scoop install mysql
```

You will have some infos in output, but find this line `mysqld --install MySQL --defaults-file="path\to\my.ini"`. Copy/paste it and execute it with `sudo` (if you take this example, change `USERNAME`). This command will install **Service** for MySQL.

```ps1
sudo mysqld --install MySQL --defaults-file="C:\Users\USERNAME\scoop\apps\mysql\current\my.ini"
```

::alert{type="info"}
Open **Task Manager** and find **Services** tab, search **MySQL**, click right on it to **start** this **Service**.
::

### Create new user

Access to MySQL CLI with `mysql`

```ps1
mysql
```

_Alter_ `root` user (you can change `password` if you want more secure password)

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
```

::alert{type="info"}
You can _create_ new user, you can change `username` and `password`

```sql
CREATE USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' WITH GRANT OPTION;
exit
```

::
