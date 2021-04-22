---
title: WSL
description: 'Windows Subsystem for Linux'
position: 5
category: 'Windows'
---

- [**blog.eleven-labs.com/developpement-sous-linux-depuis-windows-avec-wsl**](https://blog.eleven-labs.com/fr/le-developpement-sous-linux-depuis-windows-10-avec-wsl-2/)
- [**korben.info/installer-wsl2-windows-linux**](https://korben.info/installer-wsl2-windows-linux.html)
- [**korben.info/linux-wsl-gui-interface-graphique-windows**](https://korben.info/linux-wsl-gui-interface-graphique-windows-10.html)

List all distros with *state* and *version*

```bash
wsl --list --verbose
```

```bash
  NAME      STATE           VERSION
* Ubuntu    Running         2
```

### Delete distribution

Here for example to delete `Ubuntu` distribution

```bash
wsl --unregister Ubuntu
```

## WSL 2

<alert type="info"> Required

You need to have Windows 10 update 2004 before execute below commands.

</alert>

To install WSL 1 and download [**Ubuntu**](https://www.microsoft.com/en-US/p/ubuntu/9nblggh4msv6#activetab=pivot:overviewtab) from Windows Store for example.

```bash
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all
```

<alert type="warning">

Install any Linux distro with Windows Store and reboot after this.

</alert>

To switch to WSL 2 and install [**Linux Kernel**](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi) from Microsoft

```bash
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all
```

<alert type="warning">

Reboot after this.

</alert>

Convert distros to WSL 2

```bash
wsl --set-default-version 2
```

Check distros

```bash
wsl --list --verbose
```

<alert type="info"> Force WSL 2

```bash
wsl --set-version ubuntu 2
```

</alert>

## **Internet connection troubles**

Guide from [**github.com/microsoft/WSL/issues/5336**](https://github.com/microsoft/WSL/issues/5336#issuecomment-653881695)

### ***Reset network***

Open `cmd` as admin

```ps1
sudo wsl --shutdown ; sudo netsh winsock reset ; sudo netsh int ip reset all ; sudo netsh winhttp reset proxy ; sudo ipconfig /flushdns ; sudo netsh winsock reset ; sudo shutdown /r
```

Search `Network Reset` in Windows Search, enable it and restart Windows.

If doesn't work go to next step.

### ***WSL reset network config***

On WSL terminal

```bash
sudo rm /etc/resolv.conf || true
sudo rm /etc/wsl.conf || true
```

Open wsl.conf to edit it:

```bash
sudo vim /etc/wsl.conf
```

```bash
[network]
generateResolvConf = false

[automount]
enabled = true
options = "metadata"
mountFsTab = false
```

Open resolv.conf to edit it:

```bash
sudo vim /etc/resolv.conf
```

```bash
nameserver 8.8.8.8
nameserver 8.8.4.4
```

Exit WSL and in `cmd` admin

```bash
wsl --shutdown
```

If doesn't work go to next step.

### ***Misc***

- Disable Hyper-V feature

## Update Linux

```bash
sudo apt update ; sudo apt -y upgrade
```

```bash
sudo apt install -y curl git nethogs vim ssh zip unzip php-zip fonts-firacode net-tools speedtest-cli ; sudo chmod u+s $(which nethogs)
```

```bash
sudo vim /etc/vim/vimrc
```

Copy/paste this config at the end

```bash
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

Install NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

```bash
vim ~/.profile
```

Add this configuration at the end

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] ; \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] ; \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

Install Node.js **14.16.1**

```bash
source ~/.profile ; nvm ls-remote ; nvm install 14.16.1 ; nvm use 14.16.1 ; nvm alias default 14.16.1 ; nvm use default ; nvm ls ; node -v
```

Install yarn

```bash
npm install -g yarn
```

ZSH is a powerful command interpreter, better than bash. If you use it, you can improve it with [*Oh my ZSH*](https://ohmyz.sh/) which is configuration for ZSH.

*Install zsh*

```bash
sudo apt install -y zsh
```

*Install oh-my-zsh*

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

Install NGINX

```bash
sudo apt update ; sudo apt install -y nginx ; sudo ufw allow 'Nginx HTTP'
```

```bash
sudo apt install -y php-fpm php-mysql
```

```bash
sudo mv composer.phar /usr/local/bin/composer ; sudo chown -R $USER ~/.config/composer/ ; composer global require laravel/installer
```

## Tips

```bash
explorer.exe .
```
