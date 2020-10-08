---
permalink: nginx-for-windows
image: nginx-for-windows.jpg
description: 'Installer NGINX pour gérer ses VHost directement sous Windows.'
title: 'NGINX sous Windows'
subtitle: 'Installer NGINX sur Windows'
tags: ['nginx', 'vhost', 'configuration', 'windows']
date: 2020-05-03
icon: launch
ribbon: popular
author: 'Ewilan Rivière'
---

:::tip Scoop
Cet article présente l'installation de **NGINX** avec **scoop**, si vous n'avez pas installé **scoop**, je vous propose d'aller lire l'article présentant cet excellent **CLI**.

**Article** [**Scoop pour Windows**](/articles/scoop-package-manager)
:::

:::warning Attention
Cet article a été écrit le 04 mai 2020 sur Windows 10.

&#8226; édition : professionnelle  
&#8226; Architecture : 64 bits  
&#8226; Version : 1903  
&#8226; Version du système d'exploitation : 18362.778  

Si votre version de Windows est différente, il est possible que certaines choses changent.
:::

:::tip WAMP & XAMPP
L'installation de NGINX a ici été réalisée avec XAMPP d'installé, tant que ce dernier n'est pas lancé, cela ne pose - en théorie - pas de problème. Une fois que NGINX est installé, XAMPP n'est plus utile. Tout comme WAMP si c'est ce que vous avez installé auparavant pour avoir un environnement de développement.  
Vous pouvez donc conserver XAMPP / WAMP durant l'installation si vous souhaitez garder une sécurité au cas où l'installation ne se termine pas comme prévu.
:::

Sur **Windows**, il est assez simple d'installer **WAMP** ou **XAMPP** qui gèrent pour vous l'installation d'**Apache**, de **MySQL**, de **PHP** et de **phpMyAdmin**. Cela devient plus compliqué dès lors que vous souhaitez installer **NGINX** à la place d'**Apache** et par conséquent installer **MySQL** / **PHP** / **phpMyAdmin** à la main. Il existe plusieurs façons de faire, ci-dessous, je présenterai une méthode utilisant **scoop** qui est un **CLI** (*command line installer*) pour **Windows** qui permet d'installer des binaires par l'intermédiaire de la ligne de commande comme pour **APT** sur **Linux**. Cela présente plusieurs avantages, dont celui de pouvoir tout gérer directement par le terminal au lieu de devoir utiliser une interface dépendant du logiciel installé.  
Ce guide est donc pour les utilisateurs avancés qui souhaitent prendre le temps d'installer l'équivalent de **LEMP**, qu'on pourrait donc appeler **WEMP**, sur Windows. Ce n'est pas une solution de facilité, cela demande de faire des configurations à la main et du temps. Nous verrons donc en détails l'installation de ce qui suit :

- **MySQL** : configuration du système de gestion de base de données
- **NGINX** : configuration du serveur web et configuration de VHosts
- **PHP** : configuration de PHP et de PHP-CGI pour NGINX
- **phpMyAdmin** : configuration de phpMyAdmin avec NGINX et MySQL

## 1. MySQL

Lancez la commande d'installation de **MySQL** avec **scoop** :

```powershell
scoop install mysql
```

Cette commande est l'installateur de **MySQL** qui vous permettra de le transformer en **Service Windows**, ce qui est nécessaire pour l'utiliser. Copiez la commande que vous avez obtenu - et non pas celle que je propose ici qui correspond à ma configuration - et executez-la dans un **PowerShell Admin** (sinon vous n'aurez pas les droit pour activer le service).

```powershell
mysqld --install MySQL --defaults-file="C:\Users\username\scoop\apps\mysql\current\my.ini"
```

Vérifiez maintenant que le **Service** **MySQL** est démarré : ouvrez le **Gestionnaire de tâches** en faisant un clic droit sur la barre de tâches et accédez à l'onglet **Services** pour rechercher MySQL et démarrez-le s'il ne l'est pas. Notez que **phpMyAdmin** n'est pas encore installé, il le sera plus loin.

## 2. NGINX

L'installation de **NGINX** demandera également d'installer [**NSSM**](https://nssm.cc/) (the Non-Sucking Service Manager) afin de créer un **Service** spécifique à **NGINX** vous permettant de démarrer, de redémarrer ou d'arrêter **NGINX** comme sous **Linux**.

```powershell
scoop install nginx ; scoop install nssm
```

```powershell
nssm install nginx
```

Vous aurez une interface où vous pourrez configurer un nouveau **Service** pour **NGINX**. Le plus important est de configurer le *Chemin* de l'application qui est par défaut `C:\Users\user\scoop\apps\nginx\current\nginx.exe`, vous pouvez éditer le nom du service qui sera le nom que vous chercherez dans la liste de **Services** et l'onglet détails est tout à fait facultatif.

<md-img source="nssm-nginx-1.jpg"></md-img>
<md-img source="nssm-nginx-2.jpg"></md-img>

Maintenant, ouvrez la liste des **Services**, cherchez y **NGINX** si vous avez bien appelé le **Service** comme ça et démarrez-le. Rendez-vous sur [**http://localhost**](http://localhost) et si vous avez l'écran d'accueil de NGINX, c'est que tout va bien.

<md-img source="nginx-home.jpg"></md-img>

## 3. PHP

Nous allons installer **PHP** grâce à un *bucket* de **scoop** qui permet d'accéder à plusieurs versions de **PHP**, parce qu'il est parfois nécessaire de rétrograder. Installons pour l'instant **PHP 7.4** :

```powershell
scoop bucket add php
scoop install php/php7.4-nts
```

Quand vous installez PHP, vous devez configurer le `php.ini` pour **chaque version**.Quand vous installez PHP avec **Scoop**, le chemin par défaut est celuii de votre **répertoire utilisateur** comme `C:/Users/username/scoop/apps/`. Vous pouvez trouver ci-dessous une configuration pour `php.ini` :

<spoiler label="Config for php.ini">

**At around line 400**

```ini[C:/Users/username/scoop/apps/php7.4-nts/current/php.ini]
; Maximum amount of memory a script may consume (128MB)
; http://php.net/memory-limit
memory_limit = 512M
```

**At around line 750:**

```ini[C:/Users/username/scoop/apps/php7.4-nts/current/php.ini]
; Directory in which the loadable extensions (modules) reside.
; http://php.net/extension-dir
; extension_dir = "./"
; On windows:
extension_dir = "ext"
```

**At around line 900:**

```ini[C:/Users/username/scoop/apps/php7.4-nts/current/php.ini]
; Notes for Windows environments :
;
; - Many DLL files are located in the extensions/ (PHP 4) or ext/ (PHP 5+)
;   extension folders as well as the separate PECL DLL download (PHP 5+).
;   Be sure to appropriately set the extension_dir directive.
;
extension=bz2
extension=curl
;extension=ffi
extension=ftp
extension=fileinfo
extension=gd2
extension=gettext
extension=gmp
extension=intl
extension=imap
extension=ldap
extension=mbstring
extension=exif      ; Must be after mbstring as it depends on it
extension=mysqli
;extension=oci8_12c  ; Use with Oracle Database 12c Instant Client
extension=odbc
extension=openssl
;extension=pdo_firebird
extension=pdo_mysql
;extension=pdo_oci
extension=pdo_odbc
extension=pdo_pgsql
extension=pdo_sqlite
extension=pgsql
extension=shmop

; The MIBS data available in the PHP distribution must be installed.
; See http://www.php.net/manual/en/snmp.installation.php
;extension=snmp

extension=soap
extension=sockets
extension=sodium
extension=sqlite3
extension=tidy
extension=xmlrpc
extension=xsl
```

</spoiler>

Vérifiez la version de PHP avec :

```
php -v
```

Si ce n'est pas la bonne et que vous avez installé **WAMP** ou **XAMPP**, il est possible que la version prise en charge soit écrasée par celle de ces programmes. Rendez-vous dans la section des [**6. Erreurs connues**](#_6-erreurs-communes)

### 3. a. Composer (optionnel)

**Composer** est un gestionnaire de paquets **PHP**, utilisé par **Laravel** et **Symfony**, installez-le si vous le souhaitez :

```powershell
scoop install composer
```

### 3. b. Versions multiples de PHP

```powershell
scoop install php/php7.3-nts
scoop reset php/php7.3-nts
```

### 3. c. PHP-CGI pour NGINX

Maintenant que vous avez installé **PHP**, nous allons configurer **PHP-CGI** pour **NGINX**. Pour cela, il faut créer un nouveau **Service** avec **NSSM**, avec comme **chemin** par défaut `C:\Users\username\scoop\apps\php7.4-nts\current\php-cgi.exe` pour la version 7.4 de PHP. Mais cette fois, le **Service** va prendre un paramètre :

<md-img source="nssm-php-cgi.jpg"></md-img>

```
C:\Users\username\scoop\apps\php7.4-nts\current\php-cgi.exe
C:\Users\username\scoop\apps\php7.4-nts\current
-b 127.0.0.1:9074 -c C:\Users\username\scoop\apps\php7.4-nts\current\php.ini
```

Notez bien cette partie du paramètre `127.0.0.1:9074`, le port **9074** pourrait être un autre mais le port *9000* a été choisi parce qu'il est peu utilisé et *9074* pour la version 7.4 de PHP afin de le retrouver plus facilement car cette URL sera utilisée dans la configuration NGINX. Pour la version 7.3 de PHP, vous pourriez utiliser `127.0.0.1:9073`. Vérifiez que le **Service** est bien lancé.

Maintenant que **NSSM** est installé vous pouvez simplement utiliser cette commande :

```powershell
nssm start <nom-du-service>
```

## 4. phpMyAdmin

Téléchargez la dernière version de [**phpMyAdmin**](https://www.phpmyadmin.net/) et placez là directement dans le répertoire `html` de **NGINX**, par défaut : `C:/Users/username/scoop/apps/nginx/current/html`.

```
📦C:/Users/username/scoop/apps/nginx/current
 ┣ 📂conf
 ┣ 📂conf.original
 ┣ 📂contrib
 ┣ 📂docs
 ┣ 📂html
 ┃ ┣ 📂phpmyadmin
 ┃ ┃ ┣ 📂doc
 ┃ ┃ ┣ 📂...
 ┃ ┣ 📜50x.html
 ┃ ┣ 📜index.html
 ┃ ┗ 📜info.php
 ┣ 📂html.original
 ┣ 📂logs
 ┣ 📂logs.original
 ┣ 📂temp
 ┗ 📜nginx.exe
```

Configurez **NGINX** pour le rendre accessible :

:::tip
Cela va configurer phpMyAdmin avec PHP 7.4. Si vous souhaitez utiliser une autre version, configurer le PHP-CGI avec NSSM et changez le port pour cette ligne `fastcgi_pass   127.0.0.1:9074;`
:::

```nginx[C:/Users/username/scoop/apps/nginx/current/conf/nginx.conf]
worker_processes  1;

events {
  worker_connections  1024;
}

http {
  include       mime.types;
  default_type  application/octet-stream;
  sendfile        on;
  keepalive_timeout  65;

  server {
    listen 80;
    index index.php index.html index.htm index.nginx-debian.html;
    server_name localhost;

    location / {
      try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
      fastcgi_pass   127.0.0.1:9074;
      include        fastcgi.conf;
    }

    location ~ /\.ht {
      deny all;
    }
  }
}

```

Maintenant **phpMyAdmin** est disponible sur [**http://localhost/phpmyadmin**](http://localhost/phpmyadmin) où vous pourrez vous connecter avec le compte utilisateur définit dans la section **MySQL** ou avec `root` si vous n'avez pas sécurisé votre installation.

## 5. Créer un VHost

<!-- TODO vhost -->

:::tip
Cela va configurer ce virtual host (une application Laravel) avec PHP 7.4. Si vous souhaitez utiliser une autre version, configurer le PHP-CGI avec NSSM et changez le port pour cette ligne `fastcgi_pass   127.0.0.1:9074;`
:::

:::warning
Ajoutez cette confiuguration à la configuration actuelle, n'écrasez pas ce qui existe déjà dans `nginx.conf`.
:::

```nginx[C:/Users/username/scoop/apps/nginx/current/conf/nginx.conf]
# ...

http {

  # ...

  server {
    listen 80;
    server_name secob.localhost;
    root C:\workspace\laravel-app\public;
    index index.php index.html index.htm index.nginx-debian.html;

    location / {
      try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ ^/media/cache {
      try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
      fastcgi_pass   127.0.0.1:9074;
      include        fastcgi.conf;
    }
  }
}
```

Redémarrez le **Service** **NGINX** avec :

```
nssm restart <nom-du-service-nginx>
```

<!-- TODO multiple PHP-CGI, host windows, when write windows version, author, title meta, php-nts -->

## 6. Erreurs communes

### 6. a. Débuggage de phpMyAdmin

Si phpMyAdmin ne fonctionne pas correctement, il est préférable de créer un phpinfo(). Créez un fichier php dans `C:\Users\username\scoop\apps\nginx\current\html\` appelé `info.php` :

```php[C:\Users\username\scoop\apps\nginx\current\html\info.php]
<?php
    phpinfo();
?>
```

Vous pourrez ensuite y accéder [**http://localhost/info.php**](http://localhost/info.php). Vous pourrez y voir la version de PHP utilisée par phpMyAdmin et plusieurs autres informations intéressantes.

Si cette entrée de va pas charger le `php.ini` auquel vous vous attendez, il y a un problème dans le **Service** géré par **NSSM**.

```
Loaded Configuration File C:\Users\username\scoop\apps\php7.4-nts\7.4.5\php.ini
```

Vous avez ensuite la **liste des extensions** que ce `php.ini` charge. Si vous n'y voyez pas une extension que vous avez activé dans la configuration de PHP, il y a un problème.

#### Liste des erreurs connues

- **L'extension mysqli est manquante** : vérifier dans le `php.ini` (utilisé par **phpMyAdmin** via le *phpinfo*) si l'extension `mysqli` est activée : `extension=mysqli`. Si tout est bien configuré, vérifiez bien le paramètre du PHP-CGI utilisé qui est responsable du `php.ini`.  
Si rien ne fonctionne vérifiez les **Variables d'environnement**, ouvrez le menu Démarrer et recherchez `variables` et sélectionnez **Modifier les variables d'environnement du système**. Une fenêtre s'ouvrira, sélectionnez **Variables d'environnement**. Dans les variables utilisateur, cherchez la variable `PHP_INI_SCAN_DIR`, cliquez sur *Modifier* vérifiez bien que le *path* est correct.

- **The server requested authentication method unknown to the client** :

> The server requested authentication method unknown to the client mysqli::real_connect(): The server requested authentication method unknown to the client

Cette erreur peut apparaître lorsque vous tentez d'accéder à phpMyAdmin ou que vous faites une migration avec Laravel, par exemple. Elle est dû à la configuration de l'utilisateur, entrez dans MySQL en utilisant la commande `mysql` ou `mysql -u root -p` si vous 'lavez sécurisé. Redéfinissez le mot de passe de chaque utilisateur créé, `root` bien sûr et pour tous ceux que vous avez créé également.

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
ALTER USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

- **`php -v` ne donne pas la bonne version de PHP** : vérifiez les **Variables d'environnement**, ouvrez le menu Démarrer et recherchez `variables` et sélectionnez **Modifier les variables d'environnement du système**. Une fenêtre s'ouvrira, sélectionnez **Variables d'environnement**. Dans les variables système, cherchez la variable `Path`, cliquez sur *Modifier* vérifiez bien qu'il n'y a pas de chemin vers PHP venant de WAMP ou XAMPP.

:::warning
Si vous supprimez le path vers WAMP ou XAMPP, vous ne pourrez plus utiliser leur version de PHP. Assurez-vous que le reste de la configuration fonctionne.
:::

- **cURL error 60: SSL certificate problem: unable to get local issuer certificate** : télécharger [https://curl.haxx.se/ca/cacert.pem](https://curl.haxx.se/ca/cacert.pem), le placer ici par exemple : `C:/Users/username/scoop/apps/nginx/current/cacert.pem` et modifier tous les php.ini utilisés en modifiant l'entrée `curl.cainfo` comme cela `curl.cainfo = "C:\Users\username\scoop\apps\nginx\current\cacert.pem`

- **Il semble que la connexion au serveur aie été perdue. Merci de vérifier la connectivité réseau et l'état du serveur.** : erreur qui semble lié à la configuration de phpMyAdmin. TODO
