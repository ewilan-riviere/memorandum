---
title: PHP
---

# PHP

To get latest versions of PHP

::code-group

```bash [Ubuntu]
sudo add-apt-repository ppa:ondrej/php
sudo apt update
```

```bash [Debian]
sudo apt install -y software-properties-common ca-certificates lsb-release apt-transport-https
sudo sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'
wget -qO - https://packages.sury.org/php/apt.gpg | sudo apt-key add -
sudo apt update
```

::

Install latest PHP version.

```bash
sudo apt -y install php8.2-fpm
```

Add PHP extension

```bash
sudo apt install -y php8.2-mbstring php8.2-mysql php8.2-common php8.2-mysql php8.2-xml php8.2-curl php8.2-gd php8.2-imagick php8.2-cli php8.2-dev php8.2-imap php8.2-mbstring php8.2-opcache php8.2-soap php8.2-zip php8.2-intl php8.2-bz2
```

## Switch PHP

```bash
sudo update-alternatives --config php
```

## Composer

Use command line instructions of [**Composer website**](https://getcomposer.org/download/) to download and install latest version of Composer

![composer](/docs/composer.jpg)

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

You have just to copy installation instructions and composer will be download, this is an example:

```bash
sudo mv composer.phar /usr/local/bin/composer
sudo chown -R $USER ~/.config/composer/
```

To install global package like `laravel`

```bash
composer global require laravel/installer
```

Add this to `.zshrc`

```bash
vim ~/.zshrc
```

```bash[~/.zshrc]
export PATH=~/.config/composer/vendor/bin:$PATH
```

```bash
source ~/.zshrc
```

Now you can use `composer`.

## LEMP Stack

Install **NGINX** or **Apache2** to have VHost.

- [**NGINX: LEMP**](/os-server/linux/lemp/install)
- **Apache2: LAMP**
