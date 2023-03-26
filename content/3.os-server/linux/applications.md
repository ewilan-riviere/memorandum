---
title: Applications
description: 'Add some applications to Ubuntu'
position: 2
category: 'Linux'
---

# Applications

Common apps

```bash
sudo apt install -y vlc gimp
```

## Visual Studio Code

[**Visual Studio Code**](https://code.visualstudio.com/) with apt

```bash
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /usr/share/keyrings/
sudo sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt-get install apt-transport-https
sudo apt-get update
sudo apt-get install code
rm packages.microsoft.gpg
```

Look at this configuration: [**code.visualstudio.com**](https://code.visualstudio.com/docs/setup/linux#_visual-studio-code-is-unable-to-watch-for-file-changes-in-this-large-workspace-error-enospc)

::alert{type="info"}

"Visual Studio Code is unable to watch for file changes in this large workspace"

```bash
cat /proc/sys/fs/inotify/max_user_watches
```

```bash
sudo vim /etc/sysctl.conf
```

Add this line to the end

```bash [/etc/sysctl.conf]
fs.inotify.max_user_watches=524288
```

```bash
sudo sysctl -p
```
::

## Spotify

[**Spotify**](https://www.spotify.com)

```bash
curl -sS https://download.spotify.com/debian/pubkey_0D811D58.gpg | sudo apt-key add -
echo "deb http://repository.spotify.com stable non-free" | sudo tee /etc/apt/sources.list.d/spotify.list
sudo apt-get update
sudo apt-get install -y spotify-client
```

## Postman

[**Postman**](https://www.postman.com/)

```bash
curl -L  https://dl.pstmn.io/download/latest/linux64 -o postman.tar.gz
tar -xzf postman*.tar.gz
sudo rm -rf /opt/Postman
sudo mv Postman /opt/Postman
sudo ln -s /opt/Postman/Postman /usr/bin/postman
```

Create icon to launch Postman from your apps

```bash
vim ~/.local/share/applications/postman.desktop
```

Copy these infos into this new file

```bash [~/.local/share/applications/postman.desktop]
[Desktop Entry]
Encoding=UTF-8
Name=Postman
Exec=postman
# Before v6.1.2
# Icon=/opt/Postman/resources/app/assets/icon.png
Icon=/opt/Postman/app/resources/app/assets/icon.png
Terminal=false
Type=Application
Categories=Development;
```

---

::alert{type="warning"}
If you want to install next apps, you need some dependencies

```bash
sudo apt install -y libatomic1 libappindicator1 libc++1 libsecret-1-dev gconf2
sudo apt --fix-broken install
```
::

## Discord

[**Discord**](https://discord.com/new)

```bash
wget -O discord.deb "https://discordapp.com/api/download?platform=linux&format=deb" ; sudo dpkg -i discord.deb
```

## GitKraken

[**GitKraken**](https://www.gitkraken.com/)

```bash
curl -L https://www.gitkraken.com/download/linux-deb -o gitkraken.deb ; sudo dpkg -i gitkraken.deb
```

## Video player

[**Video players**](https://itsfoss.com/video-players-linux/)

---

## Chromium & Chrome

### Chromium

```bash
sudo apt install -y chromium-browser
```

### Google Chrome

```bash
sudo sh -c 'echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list'
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo apt-get update
```

```bash
sudo apt install -y google-chrome-stable
```

---

## Remove KDE and Gnome applications

```bash
sudo apt remove -y kontact kmail thunderbird kontact plasma-discover akregator kdepim-themeeditors pim-sieve-editor ktnef ktorrent
```

```bash
sudo apt remove -y pim-data-exporter gnome-mines gnome-sudoku aisleriot gnome-mahjongg
```
