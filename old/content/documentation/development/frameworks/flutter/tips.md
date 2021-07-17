---
title: Tips & tricks
description: ''
position: 6
category: 'Flutter'
---

## Create app

```bash
flutter create myApp
```

## Setup

Download dependencies, execute this after clone

```bash
flutter pub get
```

Run `flutter` app from terminal

```bash
flutter run
```

## Upgrade

To upgrade `flutter` CLI

```bash
flutter upgrade
```

## Debugging

List Android (emulator and smartphones) with `adb`

```bash
adb devices
```

Default enable DevTools

```bash
flutter pub global activate devtools
```

```bash
flutter pub global run devtools
```

Check if `flutter` install works

```bash
flutter doctor
```

Clean repo and repair it

```bash
flutter clean
```

```bash
flutter pub cache repair
```

## Networking

### To use API

[**flutter.dev/docs/development/data-and-backend/networking**](https://flutter.dev/docs/development/data-and-backend/networking)

Add `<uses-permission android:name="android.permission.INTERNET" />` to `AndroidManifest.xml`

```xml[android/app/src/main/AndroidManifest.xml]
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.sanctum">
    <uses-permission android:name="android.permission.INTERNET" />
    <application>
        <!-- ...  -->
    </application>
</manifest>
```

This configuration allow to use online API, not localhost API, to do this, you have to use a tunneling service like [**ngrok**](/frameworks/flutter/localhost-api).

Your app is available on <http://random-generated-key.ngrok.io>

## Add packages

Add new package to `pubspec.yaml`, here example with `http` package

Check documentation on [**pub.dev/packages/http**](https://pub.dev/packages/http) on **Installing** tab and add this to `pubspec.yaml` (respect indent)

```yaml[pubspec.yaml]
dependencies:
  flutter:
    sdk: flutter
  http: ^0.12.2
```

If you use VSCode, the IDE will execute `flutter pub get` but if not works, execute it manually. Add package at the top of the file where you want to use it :

```dart[lib/main.dart]
import 'package:http/http.dart' as http;

// example of usage
Future<http.Response> fetchAlbum() {
  return http.get('https://jsonplaceholder.typicode.com/albums/1');
}
```

If you want to see full example : [**flutter.dev/networking/fetch-data**](https://flutter.dev/docs/cookbook/networking/fetch-data)

Check [**To use API**](#to-use-api) to allow HTTP requests in your app.

## Manage assets

Example to manage fonts and assets:

```yaml[pubspec.yaml]
flutter:

  # ...
  fonts:
    - family: Poppins
      fonts:
        - asset: assets/fonts/Poppins-Medium.ttf

  assets:
    - assets/images/
    - assets/svg/
    - .env
```

Here, we have:

- `Poppins-Medium.ttf` in `assets/fonts/`
- Some images in `assets/images/`
- Some svg in `assets/svg/`
- `.env` (with package `flutter_dotenv`)

With this config, all images in assets/images/ will be loaded.

## Theme colors for app

In web, we have global Sass variables, in Flutter we have `ThemeData` to define main colors in the app. Some Widgets will use default color based on this list but you can define a color based of an item of this list if you want.

<alert type="info" title="getColorHexFromStr">

`getColorHexFromStr()` is totally optional, I use it to transform hexa code to Flutter color hex.

</alert>

```dart[lib/theme/style.dart]
import 'package:flutter/material.dart';

ThemeData appTheme() {
  return ThemeData(
    primaryColor: Color(getColorHexFromStr('ce6442')),
    accentColor: Colors.red,
    hintColor: Colors.white,
    dividerColor: Colors.white,
    buttonColor: Color(getColorHexFromStr('ce6442')),
    scaffoldBackgroundColor: Colors.black,
    canvasColor: Colors.black,
  );
}

// Give colorHex from hexa code
int getColorHexFromStr(String colorStr) {
  colorStr = "FF" + colorStr;
  colorStr = colorStr.replaceAll("#", "");
  int val = 0;
  int len = colorStr.length;
  for (int i = 0; i < len; i++) {
    int hexDigit = colorStr.codeUnitAt(i);
    if (hexDigit >= 48 ; hexDigit <= 57) {
      val += (hexDigit - 48) * (1 << (4 * (len - 1 - i)));
    } else if (hexDigit >= 65 ; hexDigit <= 70) {
      // A..F
      val += (hexDigit - 55) * (1 << (4 * (len - 1 - i)));
    } else if (hexDigit >= 97 ; hexDigit <= 102) {
      // a..f
      val += (hexDigit - 87) * (1 << (4 * (len - 1 - i)));
    } else {
      throw new FormatException("An error occurred when converting a color");
    }
  }
  return val;
}
```

If you want to define `ThemeData.primaryColor` (on any Widget, `MaterialButton` is just an example)

```dart[lib/any_file.dart]
MaterialButton(
  color: Theme.of(context).primaryColor,
  // ...
)
```

## Android version / minSdk version

Some packages need a minimal SDK Android version, like [flutter_secure_storage](https://pub.dev/packages/flutter_secure_storage), to change it update `android.defaultConfig.minSdkVersion` in `android/app/build.gradle`.

```gradle[android/app/build.gradle]
// ...

android {
    compileSdkVersion 28

    // ...

    defaultConfig {
        // ...
        minSdkVersion 18
        targetSdkVersion 28
        // ...
    }

    // ...
}
```

Change minimal SDK version is an important update, if user has an Android version below this SDK version, they couldn't use the application and PlayStore disallow download. To know link between SDK version and Android version, check [**developer.android.com/studio/releases/platforms**](https://developer.android.com/studio/releases/platforms) or [**en.wikipedia.org/wiki/Android_version_history#Overview**](https://en.wikipedia.org/wiki/Android_version_history#Overview). In this example, SDK version 18 is used by Android 4.3 (Jelly Bean), smartphone with below Android version can't use the application.

## Change application name

Change attribute `android:label` in `<application />` in `<manifest />`

```xml[android/app/src/main/AndroidManifest.xml]
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="com.example.cap_transactions">
  <application
    android:name="io.flutter.app.FlutterApplication"
    android:label="My beautiful app"
    android:icon="@mipmap/ic_launcher">
  </application>
</manifest>
```

If you have problems, delete `build/` folder and uninstall app from smartphone.

## Change application icon

Check [**Flutter/Flutter packages**](/frameworks/flutter/packages#launcher-icons) to discover how to use [flutter_launcher_icons](https://pub.dev/packages/flutter_launcher_icons).
