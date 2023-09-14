---
title: Flutter
description: "How to setup Flutter on Windows"
position: 8
category: "Flutter"
---

# Flutter

[**flutter.dev/docs/windows**](https://flutter.dev/docs/get-started/install/windows) Official Flutter
website

::alert{type="warning"}

This guide will install **Android Studio** with Flutter

::

## 1. Installation

```bash
scoop install android-studio
scoop bucket add java
scoop bucket add extras
scoop install openjdk15
```

```bash
scoop install flutter
flutter upgrade --force
```

```bash
flutter doctor -v
```

```bash
flutter doctor --android-licenses
```

::alert{type="info"}

**Multiple versions**

If you want to use multiple versions of Flutter, you can use FVM, check this guide : **Flutter: multiples versions**

::
