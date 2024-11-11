---
title: TablePlus
description: TablePlus is a modern, native tool for working with relational databases.
---

# TablePlus

{{ $frontmatter.description }}

## Local database

![local](/docs/tableplus-local.jpg)

```yaml
name: localhost
host: 127.0.0.1
port: 3306
user: root
password: root
```

## Remote database

![remote](/docs/tableplus-remote.jpg)

```yaml
name: server
host: 127.0.0.1
port: 3306
user: <server-mysql-username>
password: <server-mysql-password>
ssl_mode: preferred
over_ssh: true
server: <server-ipv4>
```

SSH config

```yaml
port: 22
user: <server-username>
use_ssh_key: <import-ssh-key-private>
```
