---
title: PEAR / PECL
description: PEAR is a framework and distribution system for reusable PHP components.
---

# PEAR / PECL

{{ $frontmatter.description }}

- GitHub: <https://github.com/pear/pear-core>
- PECL: <https://pecl.php.net/package/pear> with `pear`
- Official website: <https://pear.php.net>

## Debian

```sh
sudo apt install -y php-pear
```

## macOS

```sh
brew install pkg-config zlib
```

```sh
curl -O http://pear.php.net/go-pear.phar
sudo php -d detect_unicode=0 go-pear.phar
```

```sh
sudo pecl install pear/pear-core-minimal
```
