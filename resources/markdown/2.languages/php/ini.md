---
title: php.ini
description: 'Setup php.ini by version'
---

## About `cacert.pem`

In local, you can need to setup `cacert.pem`, in each config, you will see `curl.cainfo` with `PATH_TO_CACERT` as value, you have to set correct path to your `cacert.pem`

On Windows, I have this path after install `cacert` with `scoop`

```ini [php.ini]
curl.cainfo = "C:\Users\USERNAME\scoop\apps\cacert\current\cacert.pem"
```

## PHP 7.4

```ini [php.ini]
; ...

memory_limit = -1

; ...

extension_dir = "ext"

; ...

extension=bz2
extension=curl
;extension=ffi
extension=ftp
extension=fileinfo
extension=gd2
extension=gettext
extension=gmp
extension=intl
extension=imap
extension=ldap
extension=mbstring
extension=exif      ; Must be after mbstring as it depends on it
extension=mysqli
;extension=oci8_12c  ; Use with Oracle Database 12c Instant Client
extension=odbc
extension=openssl
;extension=pdo_firebird
extension=pdo_mysql
;extension=pdo_oci
extension=pdo_odbc
extension=pdo_pgsql
extension=pdo_sqlite
extension=pgsql
extension=shmop

; ...

extension=soap
extension=sockets
extension=sodium
extension=sqlite3
extension=tidy
extension=xmlrpc
extension=xsl

; ...

curl.cainfo = "PATH_TO_CACERT"

; ...
```

## PHP 8.0 & 8.1

This config enable PHP 8 JIT.

```ini [php.ini]
; ...

memory_limit = -1

; ...

extension_dir = "ext"

; ...

extension=bz2
extension=curl
;extension=ffi
extension=ftp
extension=fileinfo
extension=gd2
extension=gettext
extension=gmp
extension=intl
extension=imap
extension=ldap
extension=mbstring
extension=exif      ; Must be after mbstring as it depends on it
extension=mysqli
;extension=oci8_12c  ; Use with Oracle Database 12c Instant Client
;extension=oci8_19  ; Use with Oracle Database 19 Instant Client
extension=odbc
extension=openssl
;extension=pdo_firebird
extension=pdo_mysql
;extension=pdo_oci
extension=pdo_odbc
extension=pdo_pgsql
extension=pdo_sqlite
extension=pgsql
extension=shmop

; ...

extension=soap
extension=sockets
extension=sodium
extension=sqlite3
extension=tidy
extension=xsl

; ...

opcache.enable=1

; ...

opcache.enable_cli=1

opcache.jit_buffer_size=-1

; ...

curl.cainfo = "C:\Users\ewila\scoop\apps\cacert\current\cacert.pem"

; ...
```
