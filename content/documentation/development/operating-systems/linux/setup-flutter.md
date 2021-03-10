---
title: Setup Flutter
description: 'How to setup Flutter on Linux'
position: 8
category: 'Flutter'
---

## Flutter

[**flutter.dev/docs/linux**](https://flutter.dev/docs/get-started/install/linux) Official Flutter
website

<alert type="warning">
You need to install **Android Studio** before install **Flutter**, follow [**this guide**](/guides/flutter/android-studio/)
</alert>

## 1. Installation

Example to download with terminal with Flutter `v1.22.4`, check official website to download last version. But you can download this version and upgrade Flutter after with `flutter upgrade`

```bash
wget -O flutter_linux_1.22.4-stable.tar.xz "https://storage.googleapis.com/flutter_infra/releases/stable/linux/flutter_linux_1.22.4-stable.tar.xz"
```

```bash
mv flutter_linux*.tar.xz ~/Android ; tar xf ~/Android/flutter_linux*.tar.xz ~/Android
```

Add this `.profile`, `.bashrc` or `.zshrc`

```bash
export PATH="$PATH:/home/$USER/Android/flutter/bin"
```

```bash
source ~/.zshrc
```

### Multiple version

- [**github.com/leoafarias/fvm**](https://github.com/leoafarias/fvm): FVM allow you to install multiple Flutter version

You need to have Dart

```bash
sudo add-apt-repository ppa:hachre/dart ; sudo apt-get update ; sudo apt-get install darteditor dartsdk dartium dartvm
```

```bash
pub global activate fvm
```

You need to add FVM path to `.profile` and `fvm` will be available.

```bash
fvm releases
```

```bash
fvm install 1.22.6
```

```bash
fvm list
```

```bash
fvm use 1.22.6
```

```bash
fvm flutter run
```

## 2. Setup

```bash
flutter doctor
```

You will see some infos about Flutter setup

<alert type="info"> Android licenses

If you see this

```bash
Some Android licenses not accepted.  To resolve this, run: flutter doctor
      --android-licenses
```

Execute follow command to accept all licenses

```bash
flutter doctor --android-licenses
```

Accept all licenses.
</alert>

<alert type="info"> Android Studio

If you see this

```bash
[!] Android Studio (version 4.0)
    ✗ Flutter plugin not installed; this adds Flutter specific functionality.
    ✗ Dart plugin not installed; this adds Dart specific functionality.
```

Find `Plugins` with double tape on <kbd>N</kbd>
Download plugin `Flutter` on Android Studio (accept Dart plugin to be installed)
</alert>

<alert type="info"> Visual Studio Code
Download [**Flutter**](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter) and [**Dart**](https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code) extensions for Visual Studio Code
</alert>

<alert type="info"> Connected device

```bash
[!] Connected device
    ! No devices available
```

Start emulator from AVD Manager in Android Studio (you can close Android Studio after this), you can also connect a Android smartphone to your computer, Flutter can check it too. If Flutter can't, check if phone is detected with `adb devices`. If this command don't see your phone, try another cable or phone.
</alert>

Run `flutter doctor` to check if evrything is okay

## 3. Create a new app

Respect CamelCase for app name

```bash
flutter create myApp ; cd myApp
```

Download all Java dependencies to execute app, this will take long time at the first execution.

```bash
flutter run
```

From VSCode

In `Debug` tab, create Flutter & Dart launch config if not exist
Accept to `always open Dart DevTools`

You need to install **Google Chrome**

```bash
sudo sh -c 'echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list' ; wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - ; sudo apt-get update
```

```bash
sudo apt install -y google-chrome-stable
```

With CLI

With this command, `flutter run` will run app with DevTools, you can access to it with an generated URL after run

```bash
flutter pub global activate devtools
```

May crash if `flutter run` take already the DevTools port

```bash
flutter pub global run devtools
```

## 4. Upgrade

```bash
flutter upgrade # or flutter upgrade --force
```

## 5. Snap on Ubuntu

I advice you to **NOT** install Flutter with snap, you will have PATH problems, even it's the official setup offer by FLutter documentation.

- [**askubuntu.com/questions/965599/where-is-the-install-location-for-the-snap-download-tool**](https://askubuntu.com/questions/965599/where-is-the-install-location-for-the-snap-download-tool)

```bash
sudo snap install flutter --classic
```

Add to .zshrc

```bash[~/.zshrc]
export PATH="/snap/bin:$PATH"
```

```bash
sudo apt-add-repository ppa:maarten-fonville/android-studio
sudo apt-get update
sudo apt-get install android-studio
```

- Execute Android Studio, setup it with default options
- Hardware acceleration for emulator : [**developer.android.com/studio/emulator-acceleration**](https://developer.android.com/studio/run/emulator-acceleration?utm_source=android-studio#vm-linux)
- Download dependencies
- Create new default project
- Open AVD manager (double shift and research)
- Create new phone : Pixel 2 with Oreo 8.1 (with Play store)
- Download Android system image

```bash
flutter doctor --android-licenses
```
