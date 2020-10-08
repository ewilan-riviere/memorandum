---
permalink: scoop-package-manager
image: scoop-package-manager.jpg
description: 'Gérer ses programmes directement depuis scoop, un excellent gestionnaire de paquets, sur Windows.'
title: 'Scoop, gestionnaire de paquets'
subtitle: 'Installer scoop sur Windows et gérer les paquets'
tags: ['scoop', 'package manager', 'configuration', 'windows']
date: 2020-05-02
author: 'Ewilan Rivière'
---

<md-img source="scoop-package-manager.jpg"></md-img>

:::tip Liens utiles

- [**scoop.sh**](https://scoop.sh/) : vous n'avez rien à télécharger depuis ce site mais il propose les commandes de base pour installer le Command-Line Installer depuis votre terminal. Ces commandes sont disponibles également dans cet article.
- [**Dépôt GitHub**](https://github.com/lukesampson/scoop)
- [**Documentation**](https://github.com/lukesampson/scoop/wiki) : documentation succinte de l'utilisation de scoop, les binaires proposés sont loin d'être les seuls à être disponibles. La [**fiche des commandes**](https://github.com/lukesampson/scoop/wiki/Commands) est, elle, assez utile.
  :::

Scoop est un gestionnaire de paquets pour Windows, il est semblable à `apt` disponible sous Linux. Vous pouvez très simplement télécharger et installer de nombreux paquets logiciels directement depuis votre terminal avec la comande `scool install`. Il est préférable de lancer le terminal en mode PowerShell Admin, que ce soit avec le PowerShell classique ou le nouveau terminal de Windows. Scoop met à disposition énormément de logiciels, les installe, les configure (notamment pour les variables PATH, bien connues pour être très agaçantes sous Windows) et les met à jour. C'est une révolution pour les utilisateurs de Windows qui étaient habitués à l'utilisation de wizards d'installation, passablement plus agaçants à utiliser, en particulier lors de la configuration d'un nouveau poste.

---

## 1. Installer Scoop

Lancez simplement PowerShell en Admin et exécutez la commande suivante :

```powershell
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')
```

Si vous avez une erreur lors de l'exécution de ce script, il est nécessaire de mettre en place des autorisations supplémentaires sur PowerShell :

```powershell
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
```

Relancez la commande précédente et Scoop devrait s'installer sans problèmes. Vous pouvez le trouver dans votre répertoire utilisateur, typiquement : `C:/Users/current-user/scoop/apps/scoop`, si vous souhaitez le modifier, cela est possible mais il est conseillé de le laisser à cet emplacement.

---

## 2. Utiliser Scoop

La toute première commande à connaitre avec scoop est la suivante :

```bash
scoop search nom-du-logiciel
```

Vous trouverez peu de documentation sur Scoop et sur les logiciels supportés, tout simplement parce que c'est un gestionnaire qui est d'abord pensé pour l'utilisation directe dans le terminal. Ainsi, si vous souhaitez savoir si un logiciel est disponible, il suffit d'utiliser la commande `scoop search` pour avoir une liste de ce que Scoop peut installer.

### 2. a. Exemple simple : NVM

Nous allons voir un exemple concret avec NVM, aka Node Version Manager, qui peut installer plusieurs instances de Node.js pour pouvoir changer de version si nécessaire.

```bash
scoop search nvm
```

Cela nous donnera le résultat suivant :

```bash
'main' bucket:
    nvm (1.1.7)
```

NVM dépend du `main` _bucket_, il est donc installable directement en utilisant la commande :

```bash
scoop install nvm
```

NVM est maintenant installé dans le répertoire de Scoop de votre dossier utilisateur. Comme il s'agit de NVM, pour avoir une version de Node.js, il convient de l'installer grâce à la commande `nvm` maintenant disponible car Scoop a mis à jour les variables de PATH.

:::warning

N'oubliez pas que lorsque le PATH a été mis à jour, il est préférable de relance le terminal pour l'actualiser, sinon la commande pourrait ne pas être disponible.
:::

```bash
nvm install 12.16.2
nvm use 12.16.2
```

### 2. b. Exemple avec le bucket extras : Firefox

Scoop propose beaucoup de paquets dans son _bucket_ principal, nommé `main`. Mais d'autres paquets sont disponibles et proposés par la commande de `search`, ces autres paquets sont disponibles dans d'autres _buckets_ comme `extras`. Il faut donc installer le _bucket_ désiré, qui consiste donc à ajouter une source supplémentaire à Scoop (les utilisateur·ices de `apt` ne seront ici pas perdus) pour obtenir encore plus de paquets.

:::tip Note

La commande de `search` renverra tous les paquets disponibles, que les _buckets_ supplémentaires soient ajoutés ou non à Scoop. Les ajouter ne changera donc pas le résultat de la recherche mais permettra d'installer les paquets.
:::

```bash
scoop search firefox
```

Firefox est disponible via Scoop sur le _bucket_ `extras` :

```bash
'extras' bucket:
    firefox-beta (80.0b1)
    firefox-developer (80.0b1)
    firefox-esr (68.11.0)
    firefox-nightly (81.0a1.20200730093956)
    firefox (79.0)
    tor-browser (9.5.3) --> includes 'firefox.exe'
```

C'est la version classique qui va nous intéresser : `firefox (79.0)`. Pour l'installer, il faut ajouter le _bucket_ `extras` :

```bash
scoop bucket add extras
```

Maintenant, il est possible d'installer Firefox :

```bash
scoop install firefox
```

Scoop va installer Firefox et le navigateur sera disponible comme avec l'installation classique mais ici, tout sera centralisé par Scoop.

---

## 3. Désinstaller un paquet

Il suffit d'utiliser la commande `scoop uninstall` avec le nom du paquet :

:::tip

Si vous hésitez sur le nom du paquet, vous pouvez utiliser `scoop list` pour avoir la liste des paquets et ainsi obtenir le nom du paquet que vous souhaitez désinstaller. Physiquement, vous pouvez les retrouver dans votre dossier utilisateur, dans le répertoire `scoop`.
:::

```bash
scoop uninstall nom-du-paquet
```

Scoop s'occupera de gérer les variables PATH pour éviter qu'il reste des références qui n'existent plus.

---

## 4. Scoop _cheatsheet_

Rechercher un paquet :  
_Scoop vous renverra tous les paquets dont le nom s'approche de votre recherche, vous pourrez donc recevoir beaucoup de résultats._

```bash
scoop search nom-du-paquet
```

Connaître la liste des paquets installés et leur version :

```bash
scoop list
```

Connaître l'état de Scoop :

```bash
scoop status
```

Mettre à jour Scoop et recherche de nouvelles mises à jour :  
_Cela ne met à jour que Scoop_

```bash
scoop update
```

Mettre à jour tous les paquets

```bash
scoop update *
```

Mettre à jour un paquet spécifique

```bash
scoop update nom-du-paquet
```

Désinstaller un paquet

```bash
scoop uninstall nom-du-paquet
```

---

## 5. Paquets notables gérés par Scoop

Ceci n'est absolument une liste exhaustive, n'hésitez pas à faire une recherche avec Scoop pour savoir si un paquet est disponible.

- `php` avec la dernière version sur le _bucket_ `main` : plus d'informations sur [**cet article**](/nginx-for-windows/)
  - toutes les versions sur le _bucket_ `php` (en particulier les versions NTS)
  - possibilité de changer de version facilement entre toutes celles qui sont installées : si `php7.4-nts` et `php7.3-nts` sont installés, on peut par exemple rétrograder la version de PHP avec `scoop reset php/php7.3-nts`
- `mysql` sur le _bucket_ `main` : plus d'informations sur [**cet article**](/nginx-for-windows/)
- `nginx` sur le _bucket_ `main` : plus d'informations sur [**cet article**](/nginx-for-windows/)
- `apache` sur le _bucket_ `main`
- `nodejs` sur le _bucket_ `main` (LTS et dernière version)
- `nvm` sur le _bucket_ `main`, préférable à Node.js
- `firefox` sur le _bucket_ `extras`
- `windows-terminal` sur le _bucket_ `extras`
- `vscode` sur le _bucket_ `extras`
- `phpstorm` sur le _bucket_ `jetbrains`
- `curl` sur le _bucket_ `main`
- `vim` sur le _bucket_ `main`
- `composer` sur le _bucket_ `main`
- `7zip` sur le _bucket_ `main`
- `yarn` sur le _bucket_ `main`
- `youtube-dl` sur le _bucket_ `main`
- `ffmpeg` sur le _bucket_ `main`
- `git` sur le _bucket_ `main`
- `openssh` sur le _bucket_ `main`
- `openjdk` sur le _bucket_ `java`
- `sudo` sur le _bucket_ `main`
- `firacode` sur le _bucket_ `nerd-fonts`
- `victor-mono` sur le _bucket_ `nerd-fonts`
