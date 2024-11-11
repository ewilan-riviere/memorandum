---
title: Swoole
description: Coroutine-based concurrency library for PHP
---

# Swoole

{{ $frontmatter.description }}

From <https://github.com/swoole/swoole-src>.

## macOS

With <https://brew.sh>

```sh
brew install pcre2
```

Check versions

```sh
ls /opt/homebrew/Cellar/pcre2/
ls /opt/homebrew/Cellar/php/
```

Change below command versions

```sh
ln -s /opt/homebrew/Cellar/pcre2/10.42/include/pcre2.h /opt/homebrew/Cellar/php/8.2.2/include/php/ext/pcre/pcre2.h
```

Install with default options

```sh
pecl install swoole
```

## Linux

Install with all options

```sh
pecl install swoole
```

Find `php.ini` file

```sh
php -i | grep php.ini
```

Enable extension in `php.ini` (around line 900). Change PHP version if needed.

```sh
sudo vim /etc/php/8.2/cli/php.ini
```

```sh [/etc/php/8.2/cli/php.ini]
extension=swoole.so
```

```sh
php -i | grep php.ini                      # check the php.ini file location
sudo echo "extension=swoole.so" >> php.ini  # add the extension=swoole.so to the end of php.ini
php -m | grep swoole                       # check if the swoole extension has been enabled
```
