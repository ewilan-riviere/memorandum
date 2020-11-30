---
title: scoop
description: 'A command-line installer for Windows'
position: 1
category: 'Windows'
---

<md-img source="scoop.webp"></md-img>

**scoop** is a command-line install for Windows, it's very close to **APT** on Linux if you know it. With this tool, you can install easily many packages directly from your PowerShell terminal, check [**scoop.sh**](https://scoop.sh): to get more informations.

:::tip Why install packages with scoop ?

- Packages are installed in your **User** directory by default (but you can modify it): `C:\Users\username\scoop`
- Find all applications directly in startup menu
- If package need to have specific **path**, **scoop** will create it, for example if you install `mysql` with **scoop** you will can use `mysql` in PowerShell terminal to access to MySQL CLI (and same for NPM, Yarn, PHP, Python, Flutter, Rust...).
- A package uninstalled will remove **path** config to avoid conflicts
- Update all packages with one command
- Get last versions of your favorites languages
- Get multiple versions of same language (if **scoop** offer it): PHP, Java...

:::

## Setup **scoop**

Use <kbd>Windows</kbd> + <kbd>X</kbd> to open menu and select **Windows PowerShell (Admin)**, you will have blue window and you can install **scoop** now

```powershell[PowerShell-Admin]
Set-ExecutionPolicy RemoteSigned -scope CurrentUser ; Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')
```

Install `sudo` to have admin right with regular PowerShell

```powershell[PowerShell-Admin]
scoop install sudo
```

Now, you can open regular PowerShell window (you cna find it with <kbd>Windows</kbd> + <kbd>X</kbd>) and try to install `curl`

```powershell[PowerShell]
sudo scoop install curl
```

## Usage

### Search

**scoop** offers a wide range of packages, if you want to find one, just use `scoop search`

```powershell[PowerShell]
scoop search git
```

And output give you some info about packages with this name, package version and *bucket*.

```[Output]
'extras' bucket:
    deepgit (4.0.2)
    gcloud (317.0.0) --> includes 'git-credential-gcloud.cmd'
    gitahead (2.6.3)
    ...

'main' bucket:
    ...
    git (2.29.2.windows.1)
    ...
```

If I just want `git`, I will install *git (2.29.2.windows.1)* from *main* *bucket* with `sudo scoop install git`

### Bucket

A *bucket* is a specific repository for some packages, when you install **scoop** you have by default *main bucket* but you can add more *buckets* to get more packages. With scoop search, you will see *bucket* of each package. For example, if you want to install `windows-terminal` package, you need to have *extras bucket*, you can add it with `scoop bucket add extras` and you will able to install `windows-terminal` with `sudo scoop install windows-terminal`. Try to search `scoop search windows-terminal` and you will see!

```powershell[Output]
'extras' bucket:
    windows-terminal (1.3.2651.0)
```

```powershell[PowerShell]
scoop bucket add extras
```

```powershell[PowerShell]
sudo scoop install windows-terminal
```

### Uninstall

You can easily uninstall any package

```powershell[PowerShell]
scoop uninstall curl
```

### List

To list all installed packages with *bucket*

```powershell[PowerShell]
scoop list
```

### Update

To know **scoop** status

```powershell[PowerShell]
scoop status
```

To update **scoop** **itself**

```powershell[PowerShell]
scoop update
```

To update **all packages** installed

```powershell[PowerShell]
scoop update *
```

To update **specific package**

```powershell[PowerShell]
scoop update curl
```

## Examples

You can find many package with **scoop**, you can see below just some examples:

### Useful packages

- 7zip [main]
- curl [main]
- git [main]
- sudo [main]
- touch [main]
- vim [main]
- wget [main]
- windows-terminal [extras]

### Languages and frameworks

- adopt8-hotspot [java]
- flutter [extras]
- mysql [main]
- nvm [main]
- php7.3-nts [php]
- php7.4-nts [php]
- python [main]
- rust [main]

### For development

- android-studio [extras]
- composer [main]
- docker [main]
- docker-compose [main]
- doctl [main]
- firacode [nerd-fonts]
- glow [main]
- nginx [main]
- ngrok [main]
- nssm [main]
- phpstorm [jetbrains]
- postman [extras]
- Victor-Mono [nerd-fonts]
- vscode [extras]
- yarn [main]
- which [main]

### Softwares

- discord [extras]
- firefox [extras]
- ffmpeg [main]
- gimp [extras]
- googlechrome [extras]
- rufus [extras]
- vlc [extras]
- youtube-dl [main]
