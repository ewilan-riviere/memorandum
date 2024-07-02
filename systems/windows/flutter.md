---
title: Flutter
description: "How to setup Flutter on Windows"
position: 8
category: "Flutter"
---

# Flutter

::: warning Scoop is necessary
This guide use `scoop` to install this binary, if you don't have it, check [this guide](/systems/windows/scoop)
:::

[**flutter.dev/docs/windows**](https://flutter.dev/docs/get-started/install/windows) Official Flutter
website

::alert{type="warning"}

This guide will install **Android Studio** with Flutter

::

## 1. Installation

```sh
scoop install android-studio
scoop bucket add java
scoop bucket add extras
scoop install openjdk15
```

```sh
scoop install flutter
flutter upgrade --force
```

```sh
flutter doctor -v
```

```sh
flutter doctor --android-licenses
```

::alert{type="info"}

**Multiple versions**

If you want to use multiple versions of Flutter, you can use FVM, check this guide : **Flutter: multiples versions**

::
