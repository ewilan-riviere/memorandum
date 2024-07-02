---
title: PHP extensions for Windows
description: PHP can be extended with extensions.
---

# PHP extensions for Windows

{{ $frontmatter.description }}

::: warning Scoop is necessary
This guide use `scoop` to install this binary, if you don't have it, check [this guide](/systems/windows/scoop)
:::

## About

For some packages, you have to choose the right version of extension. It could be difficult, so I will explain it.

### PHP Version

```ps1
php -i | find "PHP Version"
```

```[output]
PHP Version => 8.1.17
```

PHP version is PHP 8.1, so I take the `php_imagick-*-8.1-*.zip` version.

::: info
If you don't find your PHP version in all versions, your PHP version could be too recent, you have to wait before `imagick` release for your PHP version.
:::

### Thread Safety

```ps1
php -i | find "Thread Safety"
```

```ps1:output
Thread Safety => disabled
```

Thread Safety is disabled, so I take the `php_imagick-*-nts-*.zip` version (`nts` for Non Thread Safe).

### Architecture

You have to install `grep` with `scoop`

```ps1
php -i | Where-Object { $_ -like "*Architecture*" }
```

```ps1:output
Architecture => x64
```

Architecture is `x64`, so I take the `php_imagick-*x64.zip` version.

## imagick

You could install locally these dependencies to have binaries

```ps1
scoop install imagemagick ghostscript ffmpeg
```

Download binary from <https://windows.php.net/downloads/pecl/releases/imagick/>

Example with for PHP 8.1 and Imagick v3.7.0, I choose `php_imagick-3.7.0-8.1-nts-vs16-x64.zip` from <https://windows.php.net/downloads/pecl/releases/imagick/3.7.0/>

Choose wisely your version

- `php_imagick-3.7.0` is imagick version from [GitHub](https://github.com/Imagick/imagick)
- `8.1` is PHP version, choose a version that match with yours.
- `nts` is for **non thread safe**, you can choose `ts` for **thread safe** if you installed PHP thread safe
- `x64` is for 64 bits CPU, choose `x86` for 32 bits CPU

Extract archive locally.

- Find `php_imagick.dll` into archive and move it to `C:\Users\USERNAME\scoop\apps\php-nts\current\ext`
- Locate all other `.dll` files and move it to `C:\Users\USERNAME\scoop\apps\php-nts\current`
- Add `extension=imagick` to `C:\Users\USERNAME\scoop\apps\php8.1-nts\current\php.ini` at the top of the file

Check if `imagick` works (with `grep` from `scoop`)

```ps1
php -m | Select-String -Pattern "imagick"
```

## rar

Download binary from <https://windows.php.net/downloads/pecl/releases/rar/>

Example with for PHP 8.1 and RAR v4.2.0, I choose `php_rar-4.2.0-8.1-nts-vs16-x64.zip` from <https://windows.php.net/downloads/pecl/releases/rar/4.2.0/>

- Extract archive locally.
- Find `php_rar.dll` into archive and move it to `C:\Users\USERNAME\scoop\apps\php-nts\current\ext`
- Add `extension=rar` to `C:\Users\USERNAME\scoop\apps\php8.1-nts\current\php.ini` at the top of the file

Check if `rar` works (with `grep` from `scoop`)

```ps1
php -m | Select-String -Pattern "rar"
```

You could install locally this dependency to have binary

```ps1
scoop install unrar
```

## pcov

Download binary from <https://windows.php.net/downloads/pecl/releases/pcov/>

Example with for PHP 8.1 and PCOV v1.0.11, I choose `php_pcov-1.0.11-8.1-nts-vs16-x64.zip` from <https://windows.php.net/downloads/pecl/releases/pcov/1.0.11/>

- Extract archive locally.
- Find `php_pcov.dll` into archive and move it to `C:\Users\USERNAME\scoop\apps\php-nts\current\ext`
- Add `extension=pcov` to `C:\Users\USERNAME\scoop\apps\php8.1-nts\current\php.ini` at the top of the file

Check if `pcov` works (with `grep` from `scoop`)

```ps1
php -m | Select-String -Pattern "pcov"
```
