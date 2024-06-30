---
title: Java
description: A command-line installer for Windows
---

# Java

::alert{type="warning"}
**scoop is necessary**

> You can manage multiple versions of PHP on same machine with **scoop**, if you don't install it, check this guide: [**scoop**](/os-server/windows/scoop/install)
> ::

## Add bucket

```sh
scoop update
```

```sh
scoop bucket add java
```

## Install openjdk

```sh
scoop install openjdk
```

## Check system varibales

In Windows environement variables, scoop add some variables.

```ps1
JAVA_HOME => C:\Users\USERNAME\scoop\apps\openjdk\current
```

```ps1
Path => [
    C:\Users\USERNAME\scoop\apps\openjdk\current\bin
]
```

## Check Java

**Restart your terminal** and try execute Java.

```sh
java
```
