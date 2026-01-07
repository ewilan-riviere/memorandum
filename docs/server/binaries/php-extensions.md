---
title: PHP extensions
description: PHP can be extended with extensions.
---

# PHP extensions

{{ $frontmatter.description }}

## About

Traditional PHP extensions can be installed with `apt` like `mysql`, `xml`, `curl`, `gd`, `mbstring`, `zip` or `intl`. You can see more about in [this guide](/server/binaries/php#install-extensions).

But some extensions like `swoole`, `imagick` or `pcov` need to be installed manually. A package manager called [PECL](https://pecl.php.net) can be used to install PHP extensions, but it's not recommanded because it's not always up-to-date. You can see more about in [this guide](/server/binaries/pear).

::: warning
Today, some extensions are maintained and some are not, check errors if you have it and check issues on extensions GitHub repositories to find solutions. For extensions listed here, you can install it with PHP 8.2.
:::

### Add manually extension

When you compile manually and extension, sometimes it's not added to your PHP installation. You have to add it manually.

::: info
Keep in mind when you install an extension, it is available only for the PHP version you compiled it with.
:::

Find your `php.ini` file.

```sh
php --ini
```

Use any editor to add extension.

```sh
sudo vim /your/path/to/php.ini
```

In your `php.ini`, add this to the first line.

```ini
extension="<extension>.so"
```

### Verify extension

Check if PHP can use extension.

```sh
php -m | grep <extension>
```

If you see `extension`, extension is ready.

### For Windows

If you use Windows, installation guide is available in [seperate guide](/systems/windows/php-extensions).

## Extensions

### ImageMagick

_ImageMagick, invoked from the command line as magick, is a free and open-source cross-platform software suite for displaying, creating, converting, modifying, and editing raster images. Created in 1987 by John Cristy, it can read and write over 200 image file formats. It is widely used in open-source applications._

- GitHub: <https://github.com/Imagick/imagick>
- PECL: <http://pecl.php.net/package/imagick> with `imagick`
- PHP docs: <https://www.php.net/manual/en/book.imagick.php>
- Official website: <https://imagemagick.org/index.php>

::: warning
You have to install ImageMagick before you install PHP extension. You can check [this guide](/server/binaries/imagemagick).
:::

Clone the repository

```sh
git clone https://github.com/Imagick/imagick
cd imagick
```

Compile from source

```sh
phpize
./configure
make
```

Install

```sh
sudo make install
```

- [Add manually extension](#add-manually-extension)
- [Verify extension](#verify-extension)
- You have an error like `attempt to perform an operation not allowed`, check [here](#attempt-to-perform-an-operation-not-allowed)

### MongoDB

_MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas._

- GitHub: <https://github.com/mongodb/mongo-php-driver>
- PECL: <http://pecl.php.net/package/mongodb> with `mongodb`
- PHP docs: <https://www.php.net/manual/en/book.mongodb.php>
- Official website: <https://www.mongodb.com/>

::: warning
You have to install MongoDB before you install PHP extension.
:::

Install from PECL

```sh
sudo pecl install mongodb
```

Choose default values when you have questions.

- [Verify extension](#verify-extension)

### PCOV

_CodeCoverage compatible driver for PHP._

- GitHub: <https://github.com/krakjoe/pcov>
- PECL: <https://pecl.php.net/package/pcov> with `pcov`
- Compile from source: <https://github.com/krakjoe/pcov/blob/develop/INSTALL.md>

::: warning macOS
Make sure you have `pcre2` installed on macOS, you can check ['pcre2.h' file not found](#pcre2-h-file-not-found) if you have errors.
:::

Clone the repository

```sh
git clone https://github.com/krakjoe/pcov.git
cd pcov
```

Compile from source

```sh
sudo phpize
./configure --enable-pcov
make
make test
```

Install

```sh
sudo make install
```

- [Add manually extension](#add-manually-extension)
- [Verify extension](#verify-extension)

### Redis

_The open source, in-memory data store used by millions of developers as a database, cache, streaming engine, and message broker._

::: info
To use Redis with PHP, you can use `phpredis` extension OR `predis/predis` composer package. `phpredis` is a C extension and is faster than `predis/predis` which is written in PHP. So, for production, it's recommended to use `phpredis` extension.
:::

- GitHub PECL (PHP extension): <https://github.com/phpredis/phpredis>
- PECL (PHP extension): <http://pecl.php.net/package/redis> with `redis`
- GitHub `predis/predis` (Composer package): <https://github.com/predis/predis>
- Official website: <https://redis.io/>

::: warning
You have to install Redis before you install PHP extension. You can check [this guide](/server/binaries/redis).
:::

To install this extension, you can install **PHP extension** OR **composer package**.

#### PHP extension

::: info
It's recommended to use `phpredis` extension for production because it's faster than `predis/predis`.
:::

Clone the repository

```sh
git clone https://github.com/phpredis/phpredis.git
cd phpredis
```

Compile from source

```sh
sudo phpize
./configure
make
```

Install

```sh
sudo make install
```

- [Add manually extension](#add-manually-extension)
- [Verify extension](#verify-extension)

#### `predis/predis` composer package

::: info
Predis is a Redis client written entirely in PHP and does not require any additional extensions. It's not as fast as `phpredis` extension but is easier to install.
:::

```sh
composer require predis/predis
```

::: warning
If you use `predis/predis`, you don't need to install `phpredis` extension but `predis/predis` is not as fast as `phpredis` extension.
:::

#### Usage

##### Laravel

To use Redis with Laravel, you have to set your Redis client in your `.env` file.

```txt:.env
# for phpredis
REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

```txt:.env
# for predis/predis
REDIS_CLIENT=predis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

###### RedisException : Connection refused

Check if Redis server is running.

```sh
sudo systemctl status redis
```

If it's not running, start Redis server.

```sh
sudo systemctl start redis
```

###### Class 'Redis' not found

If you use `phpredis` extension and you have this error, check if extension is enabled.

```sh
php -m | grep redis
```

If it's not enabled, enable it with [Add manually extension](#add-manually-extension) guide.

If you use [Laravel Valet](https://laravel.com/docs/master/valet), reinstall Valet.

```sh
valet install
```

### SQL Server

_Microsoft SQL Server is a relational database management system developed by Microsoft. As a database server, it is a software product with the primary function of storing and retrieving data as requested by other software applications—which may run either on the same computer or on another computer across a network._

- GitHub: <https://github.com/Microsoft/msphpsql>
- PECL: <https://pecl.php.net/package/sqlsrv> with `sqlsrv`
- PHP docs: <https://www.php.net/manual/en/book.sqlsrv.php>
- Official website: <https://www.microsoft.com/en-us/sql-server/sql-server-downloads>

::: warning
For SQL Server, Microsoft offers only installation with PECL. You can check [this guide](/server/binaries/pear) to install PECL.
:::

::: code-group

```sh [Debian]
sudo pecl install sqlsrv pdo_sqlsrv
```

```sh [macOS Intel]
brew install autoconf automake libtool
brew tap microsoft/mssql-release https://github.com/Microsoft/homebrew-mssql-release
brew update
HOMEBREW_ACCEPT_EULA=Y brew install msodbcsql18 mssql-tools
sudo pecl install sqlsrv pdo_sqlsrv
```

```sh [macOS Silicon]
brew install autoconf automake libtool
brew tap microsoft/mssql-release https://github.com/Microsoft/homebrew-mssql-release
brew update
HOMEBREW_ACCEPT_EULA=Y brew install msodbcsql18 mssql-tools
sudo CXXFLAGS="-I/opt/homebrew/opt/unixodbc/include/" LDFLAGS="-L/opt/homebrew/lib/" pecl install sqlsrv
sudo CXXFLAGS="-I/opt/homebrew/opt/unixodbc/include/" LDFLAGS="-L/opt/homebrew/lib/" pecl install pdo_sqlsrv
```

:::

#### To upgrade

::: code-group

```sh [Debian / macOS Intel]
sudo pecl upgrade sqlsrv
sudo pecl upgrade pdo_sqlsrv
```

```sh [macOS Silicon]
sudo CXXFLAGS="-I/opt/homebrew/opt/unixodbc/include/" LDFLAGS="-L/opt/homebrew/lib/" pecl upgrade sqlsrv
sudo CXXFLAGS="-I/opt/homebrew/opt/unixodbc/include/" LDFLAGS="-L/opt/homebrew/lib/" pecl upgrade pdo_sqlsrv
```

:::

- [Verify extension](#verify-extension)

### Swoole

_Swoole is an event-driven, asynchronous, coroutine-based concurrency library with high performance for PHP._

- Official website: <https://www.swoole.com/>
- GitHub: <https://github.com/swoole/swoole-src>
- PECL: <https://pecl.php.net/package/swoole> with `swoole`
- PHP docs: <https://www.php.net/manual/en/book.swoole.php>
- Compile from source: <https://github.com/swoole/swoole-src#2-install-from-source-recommended>

Requirements

```sh
sudo apt install -y g++ make
```

Clone the repository

```sh
git clone https://github.com/swoole/swoole-src.git && \
cd swoole-src
```

Compile from source. When you compile some questions may appear, you can use the default values.

```sh
phpize
./configure
make
```

Install

```sh
sudo make install
```

- [Add manually extension](#add-manually-extension)
- [Verify extension](#verify-extension)

### WinRAR

_WinRAR is a trialware file archiver utility for Windows, developed by Eugene Roshal of win.rar GmbH. It can create and view archives in RAR or ZIP file formats, and unpack numerous archive file formats._

- GitHub: <https://github.com/cataphract/php-rar>
- PECL: <https://pecl.php.net/package/rar> with `rar`
- PHP docs: <https://www.php.net/manual/en/book.rar.php>
- Official website: <https://www.win-rar.com/start.html?&L=0>

With recent PHP versions, you could have some problem with installation from package managers.

To install package, you have to compile the package, you can find an example [here](https://github.com/cataphract/php-rar/issues/17#issuecomment-1001826233).

::: warning PHP 8.2
For PHP 8.2, even manual compilation, you will have maybe some errors. A [pull request](https://github.com/cataphract/php-rar/pull/18) offer to fix this problem, in some months PR could be accepted. But even with this bug, PHP and `rar` extension will work.
:::

Clone the repository

```sh
cd ~
git clone https://github.com/cataphract/php-rar
cd php-rar
```

Compile from source

```sh
phpize
./configure
make
```

Install

```sh
sudo make install
```

- [Add manually extension](#add-manually-extension)
- [Verify extension](#verify-extension)

## Troubles

### `pcre2.h` file not found

On macOS you need to install `pcre2` and link it to current PHP version.

```sh
brew install pcre2
# OR
brew reinstall pcre2
```

File `/opt/homebrew/opt/pcre2/include/pcre2.h` have to be present.

Check current versions

```sh
ls /opt/homebrew/Cellar/pcre2/
ls /opt/homebrew/Cellar/php/
```

Link `pcre2` to current `php`.

```sh
ln -s /opt/homebrew/opt/pcre2/include/pcre2.h /opt/homebrew/opt/php@8.4/include/php/ext/pcre/pcre2.h
```

::: info If not works

```sh
ln -s /opt/homebrew/Cellar/pcre2/<PCRE2_VERSION>/include/pcre2.h /opt/homebrew/Cellar/php/<PHP_VERSION>/include/php/ext/pcre/pcre2.h
```

You can use this script to execute all steps.

```sh
php_version=$(php -v | grep ^PHP | awk '{print $2}')
pcre2_version=$(ls /opt/homebrew/Cellar/pcre2/)
sudo ln -s /opt/homebrew/Cellar/pcre2/$pcre2_version/include/pcre2.h /opt/homebrew/Cellar/php/$php_version/include/php/ext/pcre/pcre2.h
```

:::

### `make install`: `pecl: File exists`

```sh
# sudo make install
mkdir: /opt/homebrew/Cellar/php@8.4/8.4.16_1/pecl: File exists
mkdir: /opt/homebrew/Cellar/php@8.4/8.4.16_1/pecl: No such file or directory
make: *** [install-modules] Error 1
```

```sh
sudo rm -rf /opt/homebrew/Cellar/php@8.4/8.4.16_1/pecl
sudo mkdir -p /opt/homebrew/Cellar/php@8.4/8.4.16_1/pecl
```

### Not work after installation

```sh
# sudo make install
Installing shared extensions:     /opt/homebrew/Cellar/php@8.4/8.4.16_1/pecl/20240924/
Installing header files:          /opt/homebrew/Cellar/php@8.4/8.4.16_1/include/php/
```

```sh
# php --ini
Warning: PHP Startup: Unable to load dynamic library 'imagick.so' (tried: /opt/homebrew/lib/php/pecl/20240924/imagick.so (dlopen(/opt/homebrew/lib/php/pecl/20240924/imagick.so, 0x0009): tried: '/opt/homebrew/lib/php/pecl/20240924/imagick.so' (no such file), '/System/Volumes/Preboot/Cryptexes/OS/opt/homebrew/lib/php/pecl/20240924/imagick.so' (no such file), '/opt/homebrew/lib/php/pecl/20240924/imagick.so' (no such file)), /opt/homebrew/lib/php/pecl/20240924/imagick.so.so (dlopen(/opt/homebrew/lib/php/pecl/20240924/imagick.so.so, 0x0009): tried: '/opt/homebrew/lib/php/pecl/20240924/imagick.so.so' (no such file), '/System/Volumes/Preboot/Cryptexes/OS/opt/homebrew/lib/php/pecl/20240924/imagick.so.so' (no such file), '/opt/homebrew/lib/php/pecl/20240924/imagick.so.so' (no such file))) in Unknown on line 0
Configuration File (php.ini) Path: /opt/homebrew/etc/php/8.4
Loaded Configuration File:         /opt/homebrew/etc/php/8.4/php.ini
Scan for additional .ini files in: /opt/homebrew/etc/php/8.4/conf.d
Additional .ini files parsed:      /opt/homebrew/etc/php/8.4/conf.d/error_log.ini,
/opt/homebrew/etc/php/8.4/conf.d/ext-opcache.ini,
/opt/homebrew/etc/php/8.4/conf.d/php-memory-limits.ini
```

```sh
sudo cp /opt/homebrew/Cellar/php@8.4/8.4.16_1/pecl/20240924/* /opt/homebrew/lib/php/pecl/20240924
```

### Attempt to perform an operation not allowed

If you have an error like this

```sh:output
attempt to perform an operation not allowed by the security policy `PDF' @ error/constitute.c/IsCoderAuthorized/408.
```

Check you have `ghostscript` installed with `gs --version`. And if it's okay, open `/etc/ImageMagick-6/policy.xml` to remove some lines

```xml:/etc/ImageMagick-6/policy.xml
<!-- disable ghostscript format types -->
<!-- <policy domain="coder" rights="none" pattern="PS" /> -->
<!-- <policy domain="coder" rights="none" pattern="PS2" /> -->
<!-- <policy domain="coder" rights="none" pattern="PS3" /> -->
<!-- <policy domain="coder" rights="none" pattern="EPS" /> -->
<!-- <policy domain="coder" rights="none" pattern="PDF" /> -->
<!-- <policy domain="coder" rights="none" pattern="XPS" /> -->
```

### VSCode with PHP Intelephense

With [PHP Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client), you can add `imagick` to your `settings.json`.

```json
{
  "intelephense.stubs": ["imagick", "rar"]
}
```

### Scripts

You can add extension with a script.

Find PECL extension directory

```sh
pecl_path=$(pecl config-get ext_dir)
```

Find PHP configuration file

```sh
phpini_path=$(php -i | grep /.+/php.ini -oE)
```

Copy extension to PECL extension directory and add extension to PHP configuration file

```sh
sudo cp ./modules/<extension>.so $pecl_path
sudo echo "extension=<extension>.so" > $phpini_path
```

#### Example

::: info
After compilation, you can use this script to add `rar` extension.
:::

You will find PHP extension here: `~/php-rar/modules/rar.so`. To use it, find PECL extension directory.

```sh
pecl_path=$(pecl config-get ext_dir)
phpini_path=$(php -i | grep /.+/php.ini -oE)
sudo cp ~/php-rar/modules/rar.so $pecl_path
echo "extension=rar.so" | sudo tee -a $phpini_path
```

Now you remove local `php-rar`.

```sh
rm -r ~/php-rar
```

### Failed loading `/opt/homebrew/opt/php/.../opcache.so`

For this macOS error, you have to bind `opcache` extension to current PHP version.

```sh
php --ini
```

```sh:output
Failed loading /opt/homebrew/opt/php/lib/php/20240924/opcache.so [...]
Configuration File (php.ini) Path: /opt/homebrew/etc/php/8.4
Loaded Configuration File:         /opt/homebrew/etc/php/8.4/php.ini
Scan for additional .ini files in: /opt/homebrew/etc/php/8.4/conf.d
Additional .ini files parsed:      /opt/homebrew/etc/php/8.4/conf.d/error_log.ini,
/opt/homebrew/etc/php/8.4/conf.d/ext-opcache.ini,
/opt/homebrew/etc/php/8.4/conf.d/php-memory-limits.ini
```

You have to check configuration file path and edit `ext-opcache.ini`.

```sh
cat /opt/homebrew/etc/php/8.4/conf.d/ext-opcache.ini
```

Check if path is correct.

```ini
[opcache]
zend_extension=/opt/homebrew/opt/php/lib/php/20240924/opcache.so # path could be different
```

If this path doesn't exist, you have to find correct path, for example:

```ini
# example here, path is for PHP 8.4 on Apple Silicon
zend_extension=/opt/homebrew/opt/php@8.4/lib/php/20240924/opcache.so
```
