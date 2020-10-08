---
image: windows-terminal.jpg
description: 'Découvrir le nouveau terminal de Windows, bien plus ergonomique que PowerShell.'
title: 'Windows terminal'
tags: ['terminal', 'configuration', 'windows']
date: 2020-05-01
author: 'Ewilan Rivière'
---

<img src="/covers/windows-terminal.jpg" class="post-logo" />

[**GitHub: microsoft/terminal**](https://github.com/microsoft/terminal)

Le Windows terminal est un nouveau terminal fait par Microsoft qui remplace avantageusement le PowerShell classique avec un design bien plus ergonomique et des options plus facilement modifiables, ce terminal se rapproche beaucoup des terminaux de Linux de part son aspect _user-friendly_.

**Fonctionnalités**

- Onglets
- Configuration facile avec un simple .json
- Multi-profils de Shell (intègre WSL s'il est installé)
- Raccourcis configurables

## 1. Installation

### 1. a. Windows Store

Sur le Windows Store, rechercher `windows terminal` et vous devrez trouver cela résultat [**Windows terminal**](https://www.microsoft.com/fr-fr/p/windows-terminal-preview/9n0dx20hk701?activetab=pivot:overviewtab). Téléchargez-le et le terminal sera disponible depuis vos applications.

<img src="./windows-terminal-store.jpg" class="post-logo" />

### 1. b. Scoop

Si vous n'avez pas accès au Windows Store, vous pouvez l'installer avec Scoop, un gestionnaire de paquets pour Windows dont l'installation est expliquée dans [**cet article**](/scoop-package-manager)

```bash
scoop bucket add extras
scoop install windows-terminal
```

---

## 2. Configuration

:::tip Références utiles

- [microsoft/terminal: documentation](https://github.com/microsoft/terminal/blob/master/doc/user-docs/index.md)
- [microsoft/terminal: JSON documentation](https://github.com/microsoft/terminal/blob/master/doc/cascadia/SettingsSchema.md)
  :::

Lancez l'application et vous découvrirez le nouveau terminal de Windows avec ses onglets très utiles quand on fait du développement. N'hésitez pas à cliquer sur <kbd>⌵</kbd>, à côté du bouton ouvrant un nouvel onglet : <kbd>+</kbd> et sélectionnez **Paramètres** (<kbd>Ctrl</kbd>+<kbd>,</kbd>) pour ouvrir le fichier .json de configuration. Toute modification sera appliquée directement.

Vous pourrez trouver des informations sur la manière de configurer ce fichier dans la documentation du dépôt GitHub mais voici un exemple de configuration possible :

<hide-reveal title="Détails de la configuration">

<<< @/articles/windows-terminal/json-config-terminal.json

</hide-reveal>

## Install Ubuntu Shell

## Install modules

- [**choco**](https://chocolatey.org/install)
- [**dahlbyk/posh-git**](https://github.com/dahlbyk/posh-git)
- **PS version**: `$PSVersionTable.PSVersion`
- [**pretty terminal**](https://www.hanselman.com/blog/HowToMakeAPrettyPromptInWindowsTerminalWithPowerlineNerdFontsCascadiaCodeWSLAndOhmyposh.aspx)
- **git**
  - [**git bash**](https://stackoverflow.com/questions/56839307/adding-git-bash-to-the-new-windows-terminal)
  - [**get-git-for-windows**](https://haacked.com/archive/2011/12/19/get-git-for-windows.aspx/)
- **PS profile**
  - [**PS Profile doc**](<https://docs.microsoft.com/en-us/previous-versions//bb613488(v=vs.85)?redirectedfrom=MSDN>)
  - [**PS profile**](https://community.spiceworks.com/how_to/164244-adding-modules-to-your-powershell-profile)

**PS execution**

```powershell
Set-ExecutionPolicy -ExecutionPolicy Unrestricted
```

**Power Shell** example profile

```powershell {4}
Import-Module posh-git
Import-Module oh-my-posh
Import-Module PSReadLine
Set-Theme Paradox
```

## 3. Linux bash on Windows terminal

### 3. a. Activate Windows Sub-system for Linux (WSL)

With **admin** _PowerShell_:

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

PowerShell ask you to reboot, you need it before below step.

### 3. b. Ubuntu application

On **Windows Store**, search `ubuntu` to find [**Ubuntu** application](https://www.microsoft.com/fr-fr/p/ubuntu/9nblggh4msv6?activetab=pivot:overviewtab) (take the best starred) and download it. When Ubuntu is available, launch it and define UNIX username and UNIX password.

Restart Windows terminal and a new profile is available with `Linux`.
