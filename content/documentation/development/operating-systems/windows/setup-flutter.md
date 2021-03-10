---
title: Setup Flutter
description: 'How to setup Flutter on Windows'
position: 8
category: 'Flutter'
---

## Flutter

[**flutter.dev/docs/windows**](https://flutter.dev/docs/get-started/install/windows) Official Flutter
website

<alert type="warning">
You need to install **Android Studio** before install **Flutter**, follow [**this guide**](/guides/flutter/android-studio/)
</alert>

## 1. Installation

```bash
scoop add bucket extras ; scoop install flutter
```

### Multiple version

- [**github.com/leoafarias/fvm**](https://github.com/leoafarias/fvm): FVM allow you to install multiple Flutter version

You need to have Dart

```bash
scoop install dart
```

```bash
pub global activate fvm
```

When FVM is enabled, you have to add it to Windows PATH, restart your terminal and `fvm` command will be available.

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
