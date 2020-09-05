# Welcome

- <https://flutter.dev/docs/get-started/install/linux>
- <https://developer.android.com/studio>
- <https://doc.ubuntu-fr.org/android_sdk>
- <https://doc.ubuntu-fr.org/snap>

- <https://developer.android.com/studio/run/emulator-acceleration?utm_source=android-studio#vm-linux>

- <https://stackoverflow.com/questions/50652071/flutter-command-not-found>

```
flutter
sudo snap install flutter --classic

https://askubuntu.com/questions/965599/where-is-the-install-location-for-the-snap-download-tool
add to .zshrc
export PATH="/snap/bin:$PATH"


android studio

sudo apt-add-repository ppa:maarten-fonville/android-studio
sudo apt-get update 
sudo apt-get install android-studio

launch software and follow wizard, install it with classic options
hardware acceleration for emulator
https://developer.android.com/studio/run/emulator-acceleration?utm_source=android-studio#vm-linux
download dependencies

create new project
open avd manager (double shift and research)
create new phone
ex: pixel 2 with oreo 8.1 (with play store)
download android system image


flutter doctor --android-licenses
```


:::details

```bash
You need to correctly set up your flutter path.

from here https://flutter.dev/docs/get-started/install/macos#update-your-path

    Determine the directory where you placed the Flutter SDK. You will need this in Step 3.
    Open (or create) $HOME/.bash_profile. You can do that by using terminal text editor by going in terminal and typing nano ~/.bash_profile

macOS Catalina uses the Z shell by default, so edit $HOME/.zshrc.

If you are using a different shell, the file path and filename will be different on your machine.

    Add the following line and change [PATH_TO_FLUTTER_GIT_DIRECTORY] to be the path where you cloned Flutter’s git repo:

export PATH=[PATH_TO_FLUTTER_GIT_DIRECTORY]/flutter/bin:$PATH

for example:

export PATH=~/Documents/flutter/bin:$PATH

    press CTRL X and when it asked you to save the file, choose yes

    Run source $HOME/.bash_profile to refresh the current window or restart the terminal

    Verify that the flutter/bin directory is now in your PATH by running: echo $PATH

Notice that [PATH_TO_FLUTTER_GIT_DIRECTORY] is where you installed flutter SDK, not the location of your app

Instead of nano, you can use any text editor to edit ~/.bash_profile
```

:::
