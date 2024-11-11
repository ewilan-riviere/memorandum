---
title: Java
description: A command-line installer for Windows
---

# Java

::: warning Scoop is necessary
This guide use `scoop` to install this binary, if you don't have it, check [this guide](/systems/windows/scoop)
:::

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
