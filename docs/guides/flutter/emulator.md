# Setup

:::warning
This guide is for Ubuntu 18.04, Android Studio 4 and Flutter 1.20.
:::

```bash
sudo apt install -y android-studio
```

## Platform-tools

`~/Android/SdK/tools` and `~/Android/SdK/platform-tools`

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

## Virtual device

Execute Android Studio from your apps and create a new app (keep all as default) to access to IDE. Open **AVD Manager** from toolbar or search `avd` in global search (double tape on <kbd>N</kbd>).

![alt](/images/flutter/avd-manager.jpg)

Create new device, select phone, select recent Android OS, like Oreo 8.1, and select a phone with PlayStore, like Pixel 2. Download image to create virtual device and launch it.

### Troubles with KVM

If you have this error in AVD Manager

```bash
/dev/kvm permission denied
```

Setup KVM with this

```bash
sudo apt install qemu-kvm && ls -al /dev/kvm\n && grep kvm /etc/group\n && sudo adduser $USER kvm
```

Restart / Logout

If nothing work:

```bash
sudo chown $USER /dev/kvm
```

## Flutter

https://flutter.dev/docs/get-started/install/linux

### Download

```bash
curl -L https://storage.googleapis.com/flutter_infra/releases/stable/linux/flutter_linux_1.20.1-stable.tar.xz  -o flutter_linux_1.20.1-stable.tar.xz
```

```bash
mv flutter_linux_1.20.1-stable.tar.xz ~/Android && cd ~/Android
```
```bash
tar xf flutter_linux_1.20.1-stable.tar.xz
```

Add this `.profile`, `.bashrc` or `.zshrc`

```bash
export PATH="$PATH:/home/ewilan/Android/flutter/bin"
```
```bash
source ~/.zshrc
```

### Setup

```bash
flutter doctor
```
```bash
flutter doctor --android-licenses
```

Accept all licenses.

:::tip Android Studio

Download plugin `Flutter` on Android Studio (accept Dart plugin to be installed)
Find `Plugins` with double tape on <kbd>N</kbd>
:::

:::tip Visual Studio Code 
Download [**Flutter**](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter) and [**Dart**](https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code) extensions for Visual Studio Code
:::

Start emulator from AVD Manager in Android Studio (you can close Android Studio after this)

Run `flutter doctor` to check if evrything is okay

Respect CamelCase for app name

```bash
flutter create myApp && cd myApp
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
sudo sh -c 'echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list' && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - && sudo apt-get update
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

## AVD Manager without Android Studio

```bash
~/Android/Sdk/tools/emulator -list-avds
```
```bash
~/Android/Sdk/tools/emulator -avd Pixel_2
```
