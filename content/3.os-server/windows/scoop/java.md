---
title: Java
description: A command-line installer for Windows
---

# Java

::alert{type="warning"}
**scoop is necessary**
>
You can manage multiple versions of PHP on same machine with **scoop**, if you don't install it, check this guide: [**scoop**](/docs/operating-systems/windows/scoop)

::

## Add bucket

```bash
scoop update
```

```bash
scoop bucket add java
```

## Install openjdk

```bash
scoop install openjdk
```

## Check system varibales

In Windows environement variables, scoop add some variables.

```
JAVA_HOME => C:\Users\USERNAME\scoop\apps\openjdk\current
```

```
Path => [
    C:\Users\USERNAME\scoop\apps\openjdk\current\bin
]
```

## Check Java

**Restart your terminal** and try execute Java.

```bash
java
```
