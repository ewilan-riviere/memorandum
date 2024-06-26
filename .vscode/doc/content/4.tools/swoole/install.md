---
title: Install Swoole
description: PHP is flying today.
---

# Install Swoole

From <https://github.com/swoole/swoole-src>.

## macOS

With <https://brew.sh>

```bash
brew install pcre2
```

Check versions

```bash
ls /opt/homebrew/Cellar/pcre2/
ls /opt/homebrew/Cellar/php/
```

Change below command versions

```bash
ln -s /opt/homebrew/Cellar/pcre2/10.42/include/pcre2.h /opt/homebrew/Cellar/php/8.2.2/include/php/ext/pcre/pcre2.h
```

Install with default options

```bash
pecl install swoole
```

## Linux

Install with all options

```bash
pecl install swoole
```

Find `php.ini` file

```bash
php -i | grep php.ini
```

Enable extension in `php.ini` (around line 900). Change PHP version if needed.

```bash
sudo vim /etc/php/8.2/cli/php.ini
```

```bash [/etc/php/8.2/cli/php.ini]
extension=swoole.so
```

```bash
php -i | grep php.ini                      # check the php.ini file location
sudo echo "extension=swoole.so" >> php.ini  # add the extension=swoole.so to the end of php.ini
php -m | grep swoole                       # check if the swoole extension has been enabled
```
