# Linux: basics

This guide has been set for Ubuntu 18.04, if you have another distribution use it carefully.

## 1. Useful packages

```bash
sudo apt install -y exfat-utils exfat-fuse curl git gimp chromium-browser nethogs vim ssh fonts-firacode
```

:::tip
- `exfat-utils exfat-fuse` packages allow to use `exFAT` disks ([**wiki**](https://doc.ubuntu-fr.org/exfat))
- `curl` allow to get free resources with protocol
- `git` to use git commands
- `gimp` to edit images
- `chromium-browser`, if `firefox-esr` is installed by default on Ubuntu, you will need Chrome or Chromium if you develop website to check webkit
- `nethogs` package allow to check bandswidth usage with `sudo nethogs`
- `vim` is command line editor, very powerful
- `ssh` package to use SSH transfers
- `fonts-firacode` package to install [**fira code fonts**](https://github.com/tonsky/FiraCode)
:::

Configure Vim:

```bash
sudo apt install -y vim && cp /usr/share/vim/vimrc ~/ && mv ~/vimrc .vimrc && ~/.vimrc
sudo vim ~/.vimrc
```

Copy this at the end of `.vimrc` to enable basics features.

```vim
set nocompatible
set number
set background=dark
syntax on
set tabstop=4
set smartindent
set autoindent
set backspace=indent,eol,start
set ignorecase
set ruler
set showcmd
set mouse=a
```

# NVM

Check last version on [**NVM GitHub**](https://github.com/nvm-sh/nvm) and change it if you want latest. Here, the **NVM** version is **`0.35.3`** and **NodeJS** version is **`12.16.1`** LTS.

```bash
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.35.3/install.sh -o install_nvm.sh && bash install_nvm.sh && rm install_nvm.sh && source ~/.profile && nvm ls-remote && nvm install 12.16.1 && nvm use 12.16.1 && node -v && nvm ls && nvm alias default 12.16.1 && nvm use default
```

### ZSH & Oh my ZSH

```bash
sudo apt install -y zsh && sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

##### Add a new theme: Spaceship prompt

[**GitHub**](https://github.com/denysdovhan/spaceship-prompt)

```bash
git clone https://github.com/denysdovhan/spaceship-prompt.git "$ZSH_CUSTOM/themes/spaceship-prompt" && ln -s "$ZSH_CUSTOM/themes/spaceship-prompt/spaceship.zsh-theme" "$ZSH_CUSTOM/themes/spaceship.zsh-theme"
```

Edit this line of `~/.zshrc`

```
ZSH_THEME="spaceship"
```

:::tip

Add this to `~/.zshrc` to keep NVM global command and execute `source ~/.zshrc` to reload profile

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

:::

# Classic Yarn

```bash
sudo apt update && sudo apt install --no-install-recommends yarn
sudo apt remove -y cmdtest && sudo npm install -g yarn
```

# Code

```bash
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg && sudo install -o root -g root -m 644 packages.microsoft.gpg /usr/share/keyrings/ && sudo sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list' && sudo apt-get install apt-transport-https && sudo apt-get update && sudo apt-get install code
```

```json
{
    "workbench.iconTheme": "material-icon-theme",
    "workbench.colorTheme": "Monokai",
    "window.zoomLevel": 1,
    "explorer.confirmDragAndDrop": false,
    "files.autoSave": "off",
    "explorer.confirmDelete": false,
    "gitlens.advanced.messages": {
        "suppressLineUncommittedWarning": true
    },
    "eslint.validate": [
        "vue",
        "html",
        "javascript",
        "typescript",
        "javascriptreact", 
        "typescriptreact"
    ],
    "editor.fontFamily": "'Fira Code",
    "editor.fontLigatures": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "extensions.ignoreRecommendations": false,
    
}
```


# Vue and Angular

```bash
npm install -g @vue/cli && npm install -g @angular/cli
```

# UFW

```bash
sudo apt install -y ufw && sudo ufw app list && sudo ufw allow OpenSSH && sudo ufw enable && sudo ufw status
```

### Apps

#### Spotify

```bash
curl -sS https://download.spotify.com/debian/pubkey.gpg | sudo apt-key add - && sudo echo "deb http://repository.spotify.com stable non-free" | sudo tee /etc/apt/sources.list.d/spotify.list && sudo apt-get update && sudo apt-get install spotify-client
```

# Postman

```bash
tar -xzf apps/Postman*.tar.gz && sudo rm -rf /opt/Postman && sudo mv Postman /opt/Postman && sudo ln -s /opt/Postman/Postman /usr/bin/postman && cp apps/postman*.desktop ~/.local/share/applications/
```

# Discord, Mailspring, GitKraken

```bash
sudo apt install -y libatomic1 libappindicator1 libc++1 libsecret-1-dev gconf2 && sudo apt --fix-broken install
```

```bash
sudo dpkg -i apps/discord*.deb
sudo dpkg -i apps/mailspring*.deb
sudo dpkg -i apps/gitkraken*.deb
```

[**Video players**](https://itsfoss.com/video-players-linux/)

# Remove KDE and Gnome applications

```bash
sudo apt remove -y kontact kmail thunderbird kontact plasma-discover akregator kdepim-themeeditors pim-sieve-editor ktnef ktorrent
```

```
sudo apt remove -y pim-data-exporter gnome-mines gnome-sudoku aisleriot gnome-mahjongg
```

# Web server
sudo chown -R ewilan:ewilan /var/www

# Install LAMP
# Complete instruction here:
# https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-ubuntu-18-04
sudo apt update && sudo apt install -y apache2 && sudo ufw allow in "Apache Full" && sudo apt install -y mysql-server

sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;

sudo apt install -y php libapache2-mod-php php-mysql && sudo nano /etc/apache2/mods-enabled/dir.conf && sudo systemctl restart apache2 && sudo systemctl status apache2 && apt search php- | less && sudo apt install php-cli

sudo mkdir /var/www/dev && sudo chown -R $USER:$USER /var/www/dev && sudo chmod -R 755 /var/www/dev && sudo cp apache2/index.html /var/www/dev && sudo cp apache2/dev.conf /etc/apache2/sites-available/ && sudo a2ensite dev && sudo apache2ctl configtest && sudo systemctl restart apache2 && sudo cp apache2/info.php /var/www/html/


# Install phpMyAdmin
# Complete instructions here:
# https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-18-04
sudo apt update && sudo apt install -y phpmyadmin php-mbstring php-gettext && sudo phpenmod mbstring && sudo systemctl restart apache2

sudo chmod -R 775 /var/www/* && sudo chown -R $USER:$USER /var/www/*
sudo a2enmod rewrite

mysql -u root -p
CREATE USER 'ewilan'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'ewilan'@'localhost' WITH GRANT OPTION;
exit;

# Secure phpMyAdmin instance with authentification
sudo rm /etc/apache2/conf-available/phpmyadmin.conf && sudo cp ./phpmyadmin.conf /etc/apache2/conf-available/

sudo cp ./.htaccess /usr/share/phpmyadmin/ && sudo htpasswd -c /etc/phpmyadmin/.htpasswd ewilan

# Composer
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && php -r "if (hash_file('sha384', 'composer-setup.php') === 'e0012edf3e80b6978849f5eff0d4b4e4c79ff1609dd1e613307e16318854d24ae64f26d17af3ef0bf7cfb710ca74755a') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" && php composer-setup.php && php -r "unlink('composer-setup.php');" && sudo mv composer.phar /usr/local/bin/composer && sudo chown -R $USER ~/.config/composer/

echo 'export PATH=~/.composer/vendor/bin:$PATH\nalias update-upgrade="sudo apt update && sudo apt -y upgrade && sudo snap refresh && sudo apt autoremove"\nalias install-app="sudo apt -y install"\nalias apache="cd /var/www/html/"\nalias touchpad="xinput disable 12 && xinput enable 12"\nalias ssh-ewilan-riviere="ssh -p 65002 u617196699@194.5.156.43"\nalias cp-v="rsync --info=progress2"' >> ~/.zshrc

# KDE alt
# system settings > window behaviour > window behaviour (again) > window actions tab

# Laravel
composer global require laravel/installer
sudo chown -R $USER ~/.composer/

# Install LEMP
# https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-ubuntu-18-04

sudo apt autoremove -y


## PHP

### Composer

Use command line of [**Composer website**](https://getcomposer.org/download/)

<img src="/images/linux/composer-installation-commands.jpg" class="cover-img" />

You have just to copy installation instructions and composer will be download, this is an example:

> php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"  
> php -r "if (hash_file('sha384', 'composer-setup.php') === 'e0012edf3e80b6978849f5eff0d4b4e4c79ff1609dd1e613307e16318854d24ae64f26d17af3ef0bf7cfb710ca74755a') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"  
> php composer-setup.php  
> php -r "unlink('composer-setup.php');"

```bash
sudo mv composer.phar /usr/local/bin/composer && sudo chown -R $USER ~/.config/composer/
```