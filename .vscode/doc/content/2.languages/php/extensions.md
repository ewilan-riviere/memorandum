---
title: Extensions
description: Add extensions to PHP
---

## ImageMagick

### Windows

Find PHP version.

```sh
php -i | find "PHP Version"
```

Find if PHP use thread safe or NTS

```sh
php -i | find "Thread Safety"
```

#### Download from official website

Download ImageMagick DLL from [ImageMagick binaries](https://imagemagick.org/script/download.php#windows) like `ImageMagick-*-HDRI-x64-dll.exe` (with CPU 64 bits) and install.

#### Download with scoop

Alternative is scoop but, when I write this guide the download link is broken.

```sh
scoop install imagemagick
```

### Install imagick PECL

PHP use interface to use ImageMagick, this interface works with PECL. You have to download last version on [PECL](https://pecl.php.net/package/imagick/3.7.0/windows). Choose your PHP version with thread safety and architecture. For me, it's `7.4 Non Thread Safe (NTS) x64` for PHP 7.4 NTS.

Extract the archive, find `php_imagick.dll` and put it into `ext` directory of your PHP version. Like `C:\Users\USERNAME\scoop\apps\php7.4-nts\7.4.30\ext` for my version.

When DLL is in extensions, you can edit `php.ini` in `C:\Users\eriviere\scoop\apps\php7.4-nts\7.4.30` to add extension without `php_*.dll`.

```ini:C:\Users\eriviere\scoop\apps\php7.4-nts\7.4.30\php.ini
extension=imagick
```

You can find your `php.ini` with this command.

```sh
php --ini
```

### Check if ImageMagick works with PHP

**Restart your terminal**.

Try to find `imagick` in the output of this command.

```sh
php -i
```

## Rar

- <https://github.com/cataphract/php-rar>
- <https://pecl.php.net/package/rar/4.2.0/windows>
- <https://www.rarlab.com/rar_add.htm>
