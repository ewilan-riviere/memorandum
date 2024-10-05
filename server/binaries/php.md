---
title: PHP
description: PHP is a popular general-purpose scripting language that is especially suited to web development.
---

# PHP

{{ $frontmatter.description }}

## Requirements

- For Debian, use [Sury PHP](https://deb.sury.org/).
- For Ubuntu, use [Ondřej Surý](https://launchpad.net/~ondrej/+archive/ubuntu/php).

::: code-group

```sh [Debian]
sudo apt update -y
sudo apt -y install lsb-release ca-certificates curl
sudo curl -sSL -o /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
sudo sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'
sudo apt update -y
```

```sh [Ubuntu]
sudo add-apt-repository ppa:ondrej/php
sudo apt update -y
```

:::

### Install PHP

Here, PHP 8.2 is used as an example. You can replace it with the version you want.

::: info
This guide uses `fpm` as the PHP handler to use with NGINX.
:::

```sh
sudo apt -y install php8.2-fpm
```

### Install extensions

Here are some common PHP extensions:

```sh
sudo apt install -y php8.2-mbstring \
  php8.2-mysql \
  php8.2-common \
  php8.2-cli \
  php8.2-dev \
  php8.2-xml \
  php8.2-curl \
  php8.2-gd \
  php8.2-imagick \
  php8.2-imap \
  php8.2-opcache \
  php8.2-soap \
  php8.2-zip \
  php8.2-bz2 \
  php8.2-intl
```

### Fix PHP-FPM owner

If you use NGINX, you need to change the PHP-FPM owner to `nginx`. You have to change the owner in the PHP-FPM configuration file for each PHP version you have installed.

```sh
sudo sed -i 's/www-data/nginx/' /etc/php/8.2/fpm/pool.d/www.conf
```

Restart PHP-FPM:

```sh
sudo systemctl restart php8.2-fpm
```

## Usage

### Specific PHP version

If you installed multiple PHP versions, you can use a specific version by specifying the version number.

```sh
php8.2 -v
```

### PHP version

To see the current PHP version, run the following command:

```sh
php -v
```

You can change current version with [Switch PHP](/server/binaries/php#switch-php)

### PHP modules

```sh
php -m
```

#### Specific module

```sh
php -m | grep <module>
```

Example:

```sh
php -m | grep curl
```

If you see `curl` in the output, it means the `curl` module is installed.

## Switch PHP

To switch PHP versions, use the following command:

```sh
sudo update-alternatives --config php
```

## Composer

Use command line instructions of [**Composer website**](https://getcomposer.org/download/) to download and install latest version of Composer

![composer](/docs/composer.jpg)

```sh
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

You have just to copy installation instructions and composer will be download, this is an example:

```sh
sudo mv composer.phar /usr/local/bin/composer
sudo chown -R $USER ~/.config/composer/
```

### Global package

To install global package like `laravel`

::: info
This is an example, you can replace `laravel` with any package you want.
:::

```sh
composer global require laravel/installer
```

Add this to `.zshrc`

```sh
vim ~/.zshrc
```

```sh[~/.zshrc]
export PATH=~/.config/composer/vendor/bin:$PATH
```

```sh
source ~/.zshrc
```

Now you can use `composer`.
