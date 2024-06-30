---
title: Visual Studio Code
---

# Visual Studio Code

[**Visual Studio Code**](https://code.visualstudio.com/) with apt

```sh
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

```sh
cat /proc/sys/fs/inotify/max_user_watches
```

```sh
sudo vim /etc/sysctl.conf
```

Add this line to the end

```sh [/etc/sysctl.conf]
fs.inotify.max_user_watches=524288
```

```sh
sudo sysctl -p
```

::
