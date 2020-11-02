---
title: Introduction
description: ''
position: 1
category: 'Flutter'
---

## Welcome

Flutter is a framework to develop applications for smartphones (Android & iOS). It's can be complicated to install it because you need to install Flutter but Android Studio is very useful too, so it's a guide about installation

- [**Install Flutter on Linux**](https://flutter.dev/docs/get-started/install/linux)
- [**Android Studio**](https://developer.android.com/studio)
- <https://doc.ubuntu-fr.org/android_sdk>
- <https://developer.android.com/studio/run/emulator-acceleration?utm_source=android-studio#vm-linux>
- <https://stackoverflow.com/questions/50652071/flutter-command-not-found>
- [**flutter.dev/docs/resources/architectural-overview**](https://flutter.dev/docs/resources/architectural-overview)
- <https://medium.com/@dev.n/the-complete-flutter-series-article-3-lists-and-grids-in-flutter-b20d1a393e39>
- <https://medium.com/@suragch/a-complete-guide-to-flutters-listtile-597a20a3d449>
- <https://medium.com/flutter-community/12-useful-libraries-to-support-development-using-flutter-3b8df97d898>
- <https://pub.dev/packages/local_auth> : auth with fingerprint
- <https://pub.dev/packages/bottom_navy_bar>
- [**github.com/Solido/awesome-flutter**](https://github.com/Solido/awesome-flutter)
- <https://bloclibrary.dev>
- <https://flutter.dev/docs/deployment/android>
- <https://fluttercentral.com/Articles/Post/1145/ListView_with_Images_from_the_Internet>
- <https://blog.usejournal.com/flutter-search-in-listview-1ffa40956685>

## WIP

:::details snap
Don't use snap to install Flutter, you will have PATH problems. Check [Setup Flutter](/frameworks/flutter/setup-flutter)
:::

[**askubuntu.com/questions/965599/where-is-the-install-location-for-the-snap-download-tool**](https://askubuntu.com/questions/965599/where-is-the-install-location-for-the-snap-download-tool)

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
