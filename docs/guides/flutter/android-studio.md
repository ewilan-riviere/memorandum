# Android Studio

:::warning
This guide is for Ubuntu 18.04, Android Studio 4 and Flutter 1.20.
:::

- [**developer.android.com/studio**](https://developer.android.com/studio) website of Android Studio
- [**doc.ubuntu-fr.org/android_sdk**](https://doc.ubuntu-fr.org/android_sdk) documentation about Linux installation

## 1. Installation

```bash
sudo apt install -y android-studio
```

When the package is installed, search **Android Studio** in your apps and execute it. **Execute Android Studio** from your apps, setup to keep all as default. A wizard will **download tools**, when tools configuration is finish, you can **create an basic project to use IDE**.

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
sudo apt install qemu-kvm && ls -al /dev/kvm\n && grep kvm /etc/group\n && sudo adduser $USER kvm
```

Restart / Logout

If nothing work:

```bash
sudo chown $USER /dev/kvm
```
