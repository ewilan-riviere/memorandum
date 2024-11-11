---
title: Postman
---

# Postman

[**Postman**](https://www.postman.com/)

```sh
curl -L  https://dl.pstmn.io/download/latest/linux64 -o postman.tar.gz
tar -xzf postman*.tar.gz
sudo rm -rf /opt/Postman
sudo mv Postman /opt/Postman
sudo ln -s /opt/Postman/Postman /usr/bin/postman
```

Create icon to launch Postman from your apps

```sh
vim ~/.local/share/applications/postman.desktop
```

Copy these infos into this new file

```sh [~/.local/share/applications/postman.desktop]
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

```sh
sudo apt install -y libatomic1 libappindicator1 libc++1 libsecret-1-dev gconf2
sudo apt --fix-broken install
```

::
