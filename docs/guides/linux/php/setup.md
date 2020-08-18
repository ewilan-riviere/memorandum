# Setup

PHP: *Hypertext Preprocessor*

## PHP (for apache2)

```bash
sudo apt install php libapache2-mod-php php-mysql
sed -i 's/DirectoryIndex index.html index.cgi index.pl index.php index.xhtml index.htm/DirectoryIndex index.php index.html index.cgi index.pl index.xhtml index.htm/g' /etc/apache2/mods-enabled/dir.conf
sudo systemctl restart apache2
sudo apt install php-cli
```

## PHP FPM (for NGINX)

*FastCGI Process Manager*

With apt source `universe`, you will have LTS version of PHP, for example (in august 2020), I have PHP 7.2

Install PHP FPM 7.2 with extensions

```bash
sudo apt install -y php7.2-fpm
```

```bash
sudo apt install -y php7.2-mbstring php7.2-common php7.2-mysql php7.2-xml php7.2-xmlrpc php7.2-curl php7.2-gd php7.2-imagick php7.2-cli php7.2-dev php7.2-imap php7.2-mbstring php7.2-opcache php7.2-soap php7.2-zip php7.2-intl -y
```

With PPA `ondrej/php`, we can install all PHP versions

Add PPA to `apt`

```bash
sudo add-apt-repository -y ppa:ondrej/php && sudo apt update
```

Install PHP FPM 7.4 with extensions

```bash
sudo apt install -y php7.4-fpm
```

```bash
sudo apt install -y php7.4-mbstring php7.4-common php7.4-mysql php7.4-xml php7.4-xmlrpc php7.4-curl php7.4-gd php7.4-imagick php7.4-cli php7.4-dev php7.4-imap php7.4-mbstring php7.4-opcache php7.4-soap php7.4-zip php7.4-intl -y
```
