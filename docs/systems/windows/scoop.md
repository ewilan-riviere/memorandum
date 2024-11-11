---
title: Scoop
description: scoop is a command-line install for Windows, it's very close to APT on Linux if you know it.
---

# Scoop

{{ $frontmatter.description }} With this tool, you can install easily many packages directly from your PowerShell terminal, check [scoop.sh](https://scoop.sh) to get more informations.

- Packages are installed in your **User** directory by default (but you can modify it): `C:\Users\username\scoop`
- Find all applications directly in startup menu
- If package need to have specific **path**, **scoop** will create it, for example if you install `mysql` with **scoop** you will can use `mysql` in PowerShell terminal to access to MySQL CLI (and same for NPM, Yarn, PHP, Python, Flutter, Rust...).
- A package uninstalled will remove **path** config to avoid conflicts
- Update all packages with one command
- Get last versions of your favorites languages
- Get multiple versions of same language (if **scoop** offer it): PHP, Java...

## Installation

Use <kbd>Windows</kbd> + <kbd>X</kbd> to open menu and select **Windows PowerShell (Admin)**, you will have blue window and you can install **scoop** now

::: code-group

```ps1 [Classic]
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

```ps1 [Permissions error]
Set-ExecutionPolicy RemoteSigned -scope CurrentUser ; Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')
```

:::

Install `sudo` to have admin right with regular PowerShell

```ps1:PowerShell-Admin
scoop install sudo
```

Now, you can open regular PowerShell window (you can find it with <kbd>Windows</kbd> + <kbd>X</kbd>) and try to install `curl`

::: code-group

```ps1 [Classic]
scoop install curl
```

```ps1 [Permissions error]
sudo scoop install curl
```

:::

## Usage

### Search

**scoop** offers a wide range of packages, if you want to find one, just use `scoop search`

```ps1
scoop search git
```

And output give you some info about packages with this name, package version and _bucket_.

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

If I just want `git`, I will install _git (2.29.2.windows.1)_ from _main_ _bucket_ with `scoop install git`

### Bucket

A _bucket_ is a specific repository for some packages, when you install **scoop** you have by default _main bucket_ but you can add more _buckets_ to get more packages. With scoop search, you will see _bucket_ of each package. For example, if you want to install `windows-terminal` package, you need to have _extras bucket_, you can add it with `scoop bucket add extras` and you will able to install `windows-terminal` with `sudo scoop install windows-terminal`. Try to search `scoop search windows-terminal` and you will see!

Search results:

```ps1:output
'extras' bucket:
    windows-terminal (1.3.2651.0)
```

Add _extras bucket_:

```ps1
scoop bucket add extras
```

Install `windows-terminal`, a modern terminal for Windows:

```ps1
scoop install windows-terminal
```

### Uninstall

You can easily uninstall any package

```ps1
scoop uninstall curl
```

### List

To list all installed packages with _bucket_

```ps1
scoop list
```

### Status

To know **scoop** status

```ps1
scoop status
```

### Update

::: code-group

```ps1 [Itself]
scoop update
```

```ps1 [All packages]
scoop update *
```

```ps1 [Specific package]
scoop update curl
```

:::

## Packages

You can find many package with **scoop**, you can see below just some examples:

### Tools

| Package                         | Bucket | About | Link                                                                           |
| :------------------------------ | :----- | :---- | :----------------------------------------------------------------------------- |
| **7zip**                        | main   | main  | [7-zip.org](https://www.7-zip.org)                                             |
| **curl**                        | main   | main  | [curl.se](https://curl.se)                                                     |
| **git** or **git-with-openssh** | main   | main  | [git-scm.com](https://git-scm.com)                                             |
| **grep**                        | main   | main  | [man7.org](https://man7.org/linux/man-pages/man1/grep.1.html)                  |
| **ffmpeg**                      | main   | main  | [ffmpeg.org](https://www.ffmpeg.org)                                           |
| **make**                        | main   | main  | [gnu.org](https://www.gnu.org/software/make/manual/make.html)                  |
| **sudo**                        | main   | main  | [sudo.ws](https://www.sudo.ws)                                                 |
| **touch**                       | main   | main  | [man7.org](https://man7.org/linux/man-pages/man1/touch.1.html)                 |
| **vim**                         | main   | main  | [vim.org](https://www.vim.org)                                                 |
| **which**                       | main   | main  | [gnuwin32.sourceforge.net](http://gnuwin32.sourceforge.net/packages/which.htm) |
| **windows-terminal**            | main   | main  | [github.com/microsoft/terminal](https://github.com/microsoft/terminal)         |
| **wget**                        | main   | main  | [gnu.org](https://www.gnu.org/software/wget)                                   |
| **youtube-dl**                  | main   | main  | [youtube-dl.org](https://youtube-dl.org)                                       |

- **oh-my-posh**
  - `scoop install https://github.com/JanDeDobbeleer/oh-my-posh/releases/latest/download/oh-my-posh.json`

### Development

| Package        | Bucket | About | Link |
| :------------- | :----- | :---- | :--- |
| adb            | main   |       |      |
| android-sdk    | extras |       |      |
| bit            | main   |       |      |
| cacert         | main   |       |      |
| composer       | main   |       |      |
| doctl          | main   |       |      |
| docker         | main   |       |      |
| docker-compose | main   |       |      |
| glow           | main   |       |      |
| flutter        | main   |       |      |
| mysql          | main   |       |      |
| nginx          | main   |       |      |
| ngrok          | main   |       |      |
| nssm           | main   |       |      |
| nvm            | main   |       |      |
| pandoc         | main   |       |      |
| python         | main   |       |      |
| rust           | main   |       |      |
| obsidian       | extras |       |      |
| symfony-cli    | main   |       |      |
| yarn           | main   |       |      |

#### PHP

More informations about switch between versions and configurations: **documentation/development/operating-systems/windows/php**

| Package    | Bucket | About | Link |
| :--------- | :----- | :---- | :--- |
| php-nts    | main   |       |      |
| php7.3-nts | php    |       |      |
| php7.4-nts | php    |       |      |

### Softwares

::: warning Install softwares with scoop
Some software use internal auto-update which can create some conflicts. For example, with `vscode`, I stop to install it with scoop because update not work properly.
:::

| Package        | Bucket    | About | Link |
| :------------- | :-------- | :---- | :--- |
| android-studio | extras    |       |      |
| discord        | extras    |       |      |
| firefox        | extras    |       |      |
| gimp           | extras    |       |      |
| googlechrome   | extras    |       |      |
| mp3tag         | extras    |       |      |
| phpstorm       | jetbrains |       |      |
| postman        | extras    |       |      |
| rufus          | extras    |       |      |
| vlc            | extras    |       |      |
| vscode         | extras    |       |      |

### Fonts

| Package       | Bucket     | About | Link |
| :------------ | :--------- | :---- | :--- |
| Cascadia-Code | nerd-fonts |       |      |
| firacode      | nerd-fonts |       |      |
| Meslo-NF      | nerd-fonts |       |      |
| Victor-Mono   | nerd-fonts |       |      |

## Troubles

### scoop update: fast-forward not possible

```ps1
cd C:\Users\USERNAME\scoop\bucket\main
```

```ps1
git reset --hard origin/master
```

```ps1
scoop update
```
