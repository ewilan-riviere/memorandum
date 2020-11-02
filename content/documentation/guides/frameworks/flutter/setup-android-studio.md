---
title: Setup Android Studio
description: 'How to setup Android Studio on Linux'
position: 2
category: 'Flutter'
---

:::tip

Android Studio is optional if you want to use Flutter. But if you install it you will have two important features:

- Android SDK to debug and useful commands about Android
- Emulators to run your application without any Android smartphone

If you don't want Android Studio, it's your choice and you can install it after Flutter. If you want to install just SDK tools, you can download it from [official website](https://developer.android.com/studio) and install it.

:::

:::warning
This guide is for Ubuntu 18.04, Android Studio 4 and Flutter 1.20. I give some tips for other distributions.
:::

- [**developer.android.com/studio**](https://developer.android.com/studio) website of Android Studio
- [**doc.ubuntu-fr.org/android_sdk**](https://doc.ubuntu-fr.org/android_sdk) documentation about Linux installation

## 1. Installation

### 1. a. On Ubuntu with PPA

Android Studio is not available with APT but on Ubuntu we can add a PPA to add it to APT.

```bash
sudo apt-add-repository ppa:maarten-fonville/android-studio && sudo apt install -y android-studio
```

### 1. b. On another distribution

You have two choices, you can download directly archive [on official website](https://developer.android.com/studio) or with terminal and *wget*. If you choose this method, this is an example with a version of Android Studio (september 2020), if you want a recent version, check on [official website](https://developer.android.com/studio) if you can find most recent Android Studio - you can update link and download it with terminal.

```bash
wget -O android-studio.tar.gz "https://redirector.gvt1.com/edgedl/android/studio/ide-zips/4.0.1.0/android-studio-ide-193.6626763-linux.tar.gz"
```

Move archive to `/opt` and extract it

```bash
sudo mv android-studio*.tar.gz /opt && sudo tar xf /opt/android-studio*.tar.gz
```

Create an application launcher

```bash
vim android-studio.desktop
```

```bash
[Desktop Entry]
Encoding=UTF-8
Name=Android Studio
Exec=/opt/android-studio/bin/studio.sh
# Before v6.1.2
# Icon=/opt/Postman/resources/app/assets/icon.png
Icon=/opt/android-studio/bin/studio.png
Terminal=false
Type=Application
Categories=Development;
```

```bash
mv android-studio.desktop ~/.local/share/applications/
```

---

When the package is installed, search **Android Studio** in your apps and execute it and setup to keep all as default. A wizard will **download tools**, when tools configuration is finish, you can **create an basic project to use IDE**.

## 2. Platform-tools

`~/Android/SdK/tools` and `~/Android/SdK/platform-tools` are installed when Android Studio is installed and setup. It's tools to work with Android, it's very useful to debug.

In `.profile`, `.bashrc` or `.zshrc`

```bash
export PATH=${PATH}:/home/ewilan/Android/Sdk/tools
export PATH=${PATH}:/home/ewilan/Android/Sdk/tools:/home/ewilan/Android/Sdk/platform-tools
```

And check if you have `adb` command

```bash
adb devices
```

```bash
source ~/.zshrc
```

## 3. Virtual device

[**developer.android.com/emulator-acceleration**](https://developer.android.com/studio/run/emulator-acceleration?utm_source=android-studio#vm-linux): Configure VM acceleration on Linux

Open **AVD Manager** from toolbar or search `avd` in global search (double tape on <kbd>N</kbd>).

![alt](/images/flutter/avd-manager.jpg)

**Create new device**, select **phone** with **PlayStore**, like **Pixel 2** and select recent **Android OS**, like `Oreo 8.1`. **Download image** to create virtual device and **launch it**. If you have some problems with `KVM` check below.

### 3.a. AVD Manager without Android Studio

:::tip
Android Studio have to be installed, this tip works if you want to launch emulator after create a new device with Android Studio.
:::

List availables emulator devices

```bash
~/Android/Sdk/tools/emulator -list-avds
```

Start an emulator where `Pixel_2` is emulator's name

```bash
~/Android/Sdk/tools/emulator -avd Pixel_2
```

### 3.b. Troubles with KVM

If you have this error in AVD Manager

```bash
/dev/kvm permission denied
```

Setup KVM with this

```bash
sudo apt install qemu-kvm && ls -al /dev/kvm\n && grep kvm /etc/group\n
```

```bash
sudo adduser $USER kvm
```

Restart / Logout

If nothing work:

```bash
sudo chown $USER /dev/kvm
```
