---
title: Debug
description: ''
position: 7
category: 'Flutter'
---

<alert type="info" title="Documentation">

[**flutter.dev/docs/testing/debugging**](https://flutter.dev/docs/testing/debugging)

</alert>

## Log

If you use `flutter run` to excute your app, you can print message directly in your terminal with `print()`. You can use `debugPrint()` with `material.dart` dependency, there is no differences but you can use `debugPrint` for static log like on a `try...catch` in `catch` and `print` just for temporary log.

<alert type="warning">

`print()` can print only basic types like `String` or `bool`, but `Object` will just print `Instance of...`.

</alert>

Example with default layout when a new flutter project is generated, here if use click on floating button, `My message` will appear in terminal.

```dart[lib/main.dart]
// ...

class _MyHomePageState extends State<MyHomePage> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // ...
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          print('My message!');
        },
        child: Icon(Icons.chat),
      ),
    );
  }
}
```

You can use [**logger**](https://pub.dev/packages/logger) package to have beautiful logging, personnaly I use it to static logging when a tricky method is successful or failed. Here, an example to use `logger`

```dart
class Log {
  /// Return simple logger
  Logger get logger {
    return Logger(
      printer: PrettyPrinter(methodCount: 0, lineLength: 50),
    );
  }

  warn(String message) {
    Log().logger.w(message);
  }

  info(String message) {
    Log().logger.i(message);
  }

  danger(String message) {
    Log().logger.d(message);
  }
}

class AnyClass {
  /// Method to check if [http] call is successfull or not
  myMethod() {
    final String _url = 'API URL';
    
    try {
      response = await http.get(
        _url,
      );
    } catch(e) {
      Log.warn('myMethod error on URL: $_url');
    }
  }
}
```

## Dart DevTools

**Dart DevTools** is available on <http://127.0.0.1:9100/#/> (only with **Google Chrome**), if you execute your app with Visual Studio Code **Run**, you can choose to always open DevTools (and it's generally works fine) but if you execute your app with `flutter run` you will see an output like:

```bash
An Observatory debugger and profiler on JSN L21 is available at: http://127.0.0.1:50539/N85_rPfSJSk=/
```

So, you can find **Observatory** to <http://127.0.0.1:50539/random_key=/> but if you want to use **Dart DevTools**, got to <http://127.0.0.1:9100/#/> and, in **Connect to a Running App** input, add <http://127.0.0.1:50539/random_key=/> to connect **Dart DevTools** to current app.

## Gradle version

For some plugins, you need to upgrade Gradle. On Android, Gradle version need to be manage by Gradle plugin. You can change Gradle version on `gradle-wrapper.properties` on `distributionUrl`, like on this example of Gradle 5.6.2

```properties[android/gradle/wrapper/gradle-wrapper.properties]
# ...
distributionUrl=https\://services.gradle.org/distributions/gradle-5.6.2-all.zip
```

But, you need to upgrade Gradle plugin on `build.gradle`, on `buildscript.dependencies.classpath`, like on this example of Gralde plugin 3.5.0, this version can manage Gradle 5.6.2, check array below

```groovy[android/build.gradle]
buildscript {
  repositories {
    // ...
  }

  dependencies {
    // ...
    classpath 'com.android.tools.build:gradle:3.5.0'
  }
}
```

| Plugin version | Required Gradle version |
| -------------- | ----------------------- |
| 3.2.0          | 3.2.1 4.6+              |
| 3.3.0          | 3.3.3 4.10.1+           |
| 3.4.0          | 3.4.3 5.1.1+            |
| 3.5.0          | 3.5.4 5.4.1+            |
| 3.6.0          | 3.6.4 5.6.4+            |
| 4.0.0+         | 6.1.1+                  |
| 4.1.0+         | 6.5+                    |

If you want to check complete array of versions, check it on [**developer.android.com/studio/releases/gradle-plugin**](https://developer.android.com/studio/releases/gradle-plugin#4-1-0)

## Reduce application size

- [**Measuring your app's size**](https://flutter.dev/docs/perf/app-size) : official doc
- [**Obfuscating The Flutter App**](https://medium.com/flutterdevs/obfuscating-the-flutter-app-80a190ed7540) : article summarizing very well the concept
- [**Using the app size tool**](https://flutter.dev/docs/development/tools/devtools/app-size) : official doc about DevTools and app size

You can analyze your application with `--analyze-size` flag for **APK** or **Android App Bundle** for `android-arm`, `android-arm64` or `android-x64`. Add the flag on `build` with `--target-platform` like this for android-arm64.

```bash
flutter build apk --analyze-size --target-platform=android-arm64
```

Reduce size tips:

- Optimize assets with [**Optimizilla**](https://imagecompressor.com/fr/) and try different formats like `SVG` (instead of `PNG`) or `WEBP` (instead of `JPG`) with [**Convertio**](https://convertio.co/)
- For your fonts, you can use [**google_fonts**](https://pub.dev/packages/google_fonts)

## INSTALL_PARSE_FAILED_NO_CERTIFICATES

<alert type="info">

I see this error only on physical device, try to use emulator if you can.

</alert>

With a real device you can have an error about certificates. You can try some solutions by order of efficiency

- Execute flutter clean
- Clear cache of Play Store app
- Check if the tested application is uninstalled before execute flutter run
- Check USB cable, try to change it
- Check USB connection mode, try `MIDI` if you have this option
- Restart phone
- Try to generate new key for signing and **not migrate** ,it to PKCS12 format, and update path of key in `android/key.properties`
- Comment lines about key on `android/app/build.gradle` to create debug version without key
- Try to update `android/key.properties` `storeFile` path with `C:\Users\USERNAME\.android\debug.keystore`
  - Update `storePassword` and `keyPassword` with `android` to use default debug key
- Restart computer
- Try different physical device
