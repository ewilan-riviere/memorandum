# NativeScript Vue

*Guide writed to setup NativeScript Vue on Ubuntu 18.04, 06 june 2020*

:::tip
**How to setup NativeScript locally on Linux** : [**docs.nativescript.org**](https://docs.nativescript.org/angular/start/ns-setup-linux)

This guide not follow all the NativeScript documentation but if you have problems, you can use the documentation too.
:::

Install NativeScript CLI to have `tns` command

<code-block ext="sh">
```bash
npm install -g nativescript@latest
```
</code-block>

Install dependencies and OpenJDK 8

```bash
sudo apt-get install lib32z1 lib32ncurses5 libbz2-1.0:i386 libstdc++6:i386 g++ openjdk-8-jdk
```

:::tip
With multiple jdk versions use
```bash
sudo update-alternatives --config java
```
:::

Add this to `~/.bashrc` or `~/.zhsrc` to get access to Java version

```bash
export JAVA_HOME=$(update-alternatives --query javac | sed -n -e 's/Best: *\(.*\)\/bin\/javac/\1/p')
```

## Install Android Studio

:::tip
**How to setup Android Studio on Linux** : [**stackoverflow**](https://askubuntu.com/questions/634082/how-to-install-android-studio-on-ubuntu)

**Android Studio** is not vital to develop **Native Script Vue App** for Android but it's really more practical to install it to **setup Virtual Device** to develop without an real Android smartphone. It's will be very useful to develop on virtual devices because you can change system or change phone. You can install just SDK tools without Android Studio but it can be less practical to install virtual device without graphic user interface. Check this if you want to install virtual device with command line tool : [docs.nativescript.org](https://docs.nativescript.org/angular/tooling/android-virtual-devices#creating-android-virtual-device-via-command-line-tool).

The problem is size of Android Studio, it's really heavy, with ~900 Mo for just the application and ~800 Mo for a sytem image, so you need to have free disk space and a good bandswith to download all of it. If you don't have any space, the solution can be to use a real Android terminal.
:::

Download [**Android Studio**](https://developer.android.com/studio) archive and extract it in `/opt` dir

```bash
sudo tar -zxvf android-studio-ide-193.6514223-linux.tar.gz -C /opt/
```

Create an icon to launch it from your applications

```bash
vim ~/.local/share/applications/androidstudio.desktop
```
```bash
[Desktop Entry]
Version=1.0
Type=Application
Name=Android Studio
Exec="/opt/android-studio/bin/studio.sh" %f
Icon=/opt/android-studio/bin/studio.png
Categories=Development;IDE;
Terminal=false
StartupNotify=true
StartupWMClass=android-studio
```

:::tip
You don't have to create an icon if you don't want to. Just go to `/opt/android-studio/bin/` if you have extract archive here and execute `./studio.sh`.
:::

Launch **Android Studio** and select *standard installation* and continue to *download components*. When it's finish, create an *empty project* and use <kbd>Shift</kbd> shortcut **twice** to *search everywhere*, search `AVD` and select `AVD Manager` (Android Virtual Device Manager).

<img src="/images/linux/android-avd-search.jpg" class="" style="margin-top: 1rem" />

Select `Create Virtual Device`, select a phone like `Nexus 6` and select *system image*, not too recent and not too old, **Marshmallow v6** or **Nougat v7** are good options. When virtual device is created, you can start it from `AVD Manager` in *Actions* with play icon.

:::tip
You will build an application for Android. If we take Android fleet, we have many different smartphones with many system, if you choose a too recent system image, your application could be not compatible with old systems. With Marshmallow or Nougat, you cover almost 70% of Android fleet.
:::

<img src="/images/linux/android-distributions.jpg" class="" style="margin-top: 1rem" />

### Configure graphics acceleration, aka KVM

<img src="/images/linux/kvm.jpg" class="" style="margin-top: 1rem" />

To make screen rendering more faster, you have to configure graphics acceleration with KVM, Kernel Virtual Machine. If you have this error on AVD Manager of Android Studio, it's possible you have to enable KVM to have virtual device, in my case, virtual device refuse to start without KVM. After enabling KVM, you have maybe to restart computer / logout.

- Enable KVM on Linux : [**developer.android.com**](https://developer.android.com/studio/run/emulator-acceleration#accel-graphics)
- KVM with Ubuntu : [**help.ubuntu.com: KVM**](https://help.ubuntu.com/community/KVM/Installation)
- Android Studio KVM device permission denied : [**stackoverflow.com**](https://stackoverflow.com/questions/37300811/android-studio-dev-kvm-device-permission-denied)

If KVM is enabled and virtual device refuse to start, check this post : [**stackoverflow.com**](https://stackoverflow.com/questions/42728353/cannot-start-android-device-emulator-on-linux)

### Setup SDK Tools

On the [official guide](https://docs.nativescript.org/angular/start/ns-setup-linux), on *5* & *6* parts, you have to install [Android SDK](developer.android.com/sdk/index.html). It's not necessary if you installed Android Studio but you have a command to execute on *6* part.

```bash
sudo $ANDROID_HOME/tools/bin/sdkmanager "tools" "emulator" "platform-tools" "platforms;android-28" "build-tools;28.0.3" "extras;android;m2repository" "extras;google;m2repository"
```

You can't execute this command like this because `$ANDROID_HOME` is not set, you can follow original documentation to do this but it's not work for me. I offer others solutions.

#### Set SDK Manager on your side

*This part use a stackoverflow post of awquadros, you can find original here: [**stackoverflow.com**](https://stackoverflow.com/questions/60440509/android-command-line-tools-sdkmanager-always-shows-warning-could-not-create-se)*

Android Studio can install SDK Manager for you, check below, but you can install this on your side if you want. Check original stackoverflow post if you want some details.

```bash
sudo apt install android-sdk
```

```bash
sudo mkdir /usr/lib/android-sdk/cmdline-tools
```

Download the Android *Command line tools only* for Linux on [**developer.android.com**](https://developer.android.com/studio?hl=en-419#downloads)

```bash
sudo unzip ~/Downloads/commandlinetools-linux-*.zip -d /usr/lib/android-sdk/cmdline-tools
```

Use `vim` to edit your `~/.bashrc`, your `~/.profile` or your `~/.zshrc` and add these lines

```bash
export ANDROID_SDK_ROOT=/usr/lib/android-sdk
export PATH=$ANDROID_SDK_ROOT/cmdline-tools/tools/bin:$PATH
```

Execute `source` on the modified file like `source ~/.zshrc` to update PATH and execute this command. You have to have version of `sdkmanager`.

```bash
sdkmanager --version
```

If `sdkmanager` is available execute this command

```bash
sdkmanager "tools" "emulator" "platform-tools" "platforms;android-28" "build-tools;28.0.3" "extras;android;m2repository" "extras;google;m2repository"
```

If you have this error, execute `sdkmanager` command with `sudo`. It's possible `sudo` not work with `sdkmanager`, check this post if you want to enable `sudo` for any command: [**stackoverflow.com**](https://stackoverflow.com/questions/12996397/command-not-found-when-using-sudo)

```bash
Warning: Failed to read or create install properties file.
```

#### Set SDK Manager with Android Studio

TODO

```bash
export ANDROID_SDK_ROOT=/usr/lib/android-sdk
export PATH=$ANDROID_SDK_ROOT/cmdline-tools/tools/bin:$PATH
alias mysudo='sudo -E env "PATH=$PATH"'
export ANDROID_HOME=$ANDROID_SDK_ROOT
export PATH="${PATH}:${ANDROID_HOME}tools/:${ANDROID_HOME}platform-tools/"
```

Now you can check if all setup is valid with this command

```bash
tns doctor
```

#### Create application

Now you can create your application with this command

```bash
tns create my-app-name --template tns-template-drawer-navigation-vue
```

It's will be template with drawer navigation with Vue but you can choose other template and other technology here : [**docs.nativescript.org**](https://docs.nativescript.org/tooling/docs-cli/project/creation/create). You can find other templates here : [**market.nativescript.org**](https://market.nativescript.org/?tab=templates&category=all_templates).

Go to your application directory and download Node.js dependencies

```bash
cd my-app
npm i
```

Launch Android Studio, open **AVD Manager** and launch your virtual device. Turn on the device with right sidebar and execute this command when the smartphone is on

```bash
tns device
```

And you will have an output like this, if not, your virtual device is not detected, try to reinstall it.

```bash
Connected devices & emulators
Searching for devices...
iTunes is not available for this operating system. You will not be able to work with connected iOS devices.
┌───┬───────────────┬──────────┬───────────────┬──────────┬───────────┬───────────────┐
│ # │ Device Name   │ Platform │ Device        │ Type     │ Status    │ Connection    │
│   │               │          │ Identifier    │          │           │ Type          │
│ 1 │ Nexus 6 API   │ Android  │ emulator-5554 │ Emulator │ Connected │ Local         │
│   │ 24            │          │               │          │           │               │
└───┴───────────────┴──────────┴───────────────┴──────────┴───────────┴───────────────┘
```

If all is ok, you can execute this command at the root of your app repository

```bash
tns run
```

First time it will take time to download and setup all dependencies, when it will done, the app will be execute on virtual device with hot reloading. If not work, try to recreate an other application or restart your machine.

---

- https://medium.com/better-programming/install-android-studio-in-ubuntu-b8aed675849f
- https://docs.nativescript.org/angular/start/cli-basics
