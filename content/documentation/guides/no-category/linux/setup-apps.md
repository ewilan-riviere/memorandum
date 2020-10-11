---
# image: nuxtjs.jpg
title: '📦 Install applications'
---

## 1. NPM: global installations

```bash
npm install -g @vue/cli && npm install -g @angular/cli && npm i -g gitmoji-cli && npm install -g eslint && npm install -g svgo && npm i -g vuepress
```

## 2.  Visual Studio Code

[**Visual Studio Code**](https://code.visualstudio.com/)

```bash
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg && sudo install -o root -g root -m 644 packages.microsoft.gpg /usr/share/keyrings/ && sudo sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list' && sudo apt-get install apt-transport-https && sudo apt-get update && sudo apt-get install code && rm packages.microsoft.gpg
```

Look at this configuration: [**code.visualstudio.com**](https://code.visualstudio.com/docs/setup/linux#_visual-studio-code-is-unable-to-watch-for-file-changes-in-this-large-workspace-error-enospc)

:::tip "Visual Studio Code is unable to watch for file changes in this large workspace"

```bash
cat /proc/sys/fs/inotify/max_user_watches
```

```bash
sudo vim /etc/sysctl.conf
```

Add this line to the end

<vue-code-info ext="conf" path="/etc/sysctl.conf">

```bash
fs.inotify.max_user_watches=524288
```

</vue-code-info>

```bash
sudo sysctl -p
```

:::

## 3. Spotify

[**Spotify**](https://www.spotify.com)

```bash
curl -sS https://download.spotify.com/debian/pubkey.gpg | sudo apt-key add - && sudo echo "deb http://repository.spotify.com stable non-free" | sudo tee /etc/apt/sources.list.d/spotify.list && sudo apt-get update && sudo apt-get install spotify-client
```

## 4. Postman

[**Postman**](https://www.postman.com/)

```bash
curl -L  https://dl.pstmn.io/download/latest/linux64 -o postman.tar.gz && tar -xzf postman*.tar.gz && sudo rm -rf /opt/Postman && sudo mv Postman /opt/Postman && sudo ln -s /opt/Postman/Postman /usr/bin/postman
```

Create icon to launch Postman from your apps

```bash
vim postman.desktop
```

Copy these infos into this new file

```bash
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

Move icon to apps folder

```bash
mv postman.desktop ~/.local/share/applications/
```

---

:::warning

If you want to install next apps, you need some dependencies

```bash
sudo apt install -y libatomic1 libappindicator1 libc++1 libsecret-1-dev gconf2 && sudo apt --fix-broken install
```

:::

## 5. Mailspring

[**Mailspring**](https://getmailspring.com/)

```bash
curl -L https://updates.getmailspring.com/download\?platform\=linuxDeb -o mailspring.deb && sudo dpkg -i mailspring.deb
```

## 6. Discord

[**Discord**](https://discord.com/new)

```bash
wget -O discord.deb "https://discordapp.com/api/download?platform=linux&format=deb" && sudo dpkg -i discord.deb
```

## 7. GitKraken

[**GitKraken**](https://www.gitkraken.com/)

```bash
curl -L https://www.gitkraken.com/download/linux-deb -o gitkraken.deb && sudo dpkg -i gitkraken.deb
```

## 8. Video player

[**Video players**](https://itsfoss.com/video-players-linux/)

---

## 9. Chromium & Chrome

### Chromium

```bash
sudo apt install -y chromium-browser
```

### Google Chrome

```bash
sudo sh -c 'echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list' && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - && sudo apt-get update
```

```bash
sudo apt install -y google-chrome-stable
```

---

## Remove KDE and Gnome applications

```bash
sudo apt remove -y kontact kmail thunderbird kontact plasma-discover akregator kdepim-themeeditors pim-sieve-editor ktnef ktorrent
```

```
sudo apt remove -y pim-data-exporter gnome-mines gnome-sudoku aisleriot gnome-mahjongg
```
