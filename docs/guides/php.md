# PHP

## Multiple versions

> With Ubuntu 18.04
> [**www.ostechnix.com**](https://www.ostechnix.com/how-to-switch-between-multiple-php-versions-in-ubuntu/)

Check php version like this:

```bash
php -v
```

For example, if I have PHP 7.2 and I want PHP 7.3, I install new PHP version with apt repository:

```bash
sudo add-apt-repository -y ppa:ondrej/php
sudo apt update
sudo apt install php7.3
```

If I have some problems of dependencies, I can install these for this PHP version:

```bash
sudo apt install php7.3-mbstring
sudo apt install php7.3-xml
```