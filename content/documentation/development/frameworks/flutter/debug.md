---
title: Debug
description: ''
position: 7
category: 'Flutter'
---

:::tip Documentation

[**flutter.dev/docs/testing/debugging**](https://flutter.dev/docs/testing/debugging)

:::

## Console log

If you use `flutter run` to excute your app, you can print message directly in your terminal with `print()`.

Example with default layout when a new flutter project is generated, here if use click on floating button, `My message` will appear in terminal.

```dart[lib/main.dart]
// ...

class _MyHomePageState extends State<MyHomePage> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          // ...
      ),
      body: Center(
        // ...
      ),
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

:::warning

`print()` can print only basic types like `String` or `bool`, but `Object` will just print `Instance of...`.

## Dart DevTools

**Dart DevTools** is available on <http://127.0.0.1:9100/#/> (only with **Google Chrome**), if you execute your app with Visual Studio Code **Run**, you can choose to always open DevTools (and it's generally works fine) but if you execute your app with `flutter run` you will see an output like:

```bash
An Observatory debugger and profiler on JSN L21 is available at: http://127.0.0.1:50539/N85_rPfSJSk=/
```

So, you can find **Observatory** to <http://127.0.0.1:50539/random_key=/> but if you want to use **Dart DevTools**, got to <http://127.0.0.1:9100/#/> and, in **Connect to a Running App** input, add <http://127.0.0.1:50539/random_key=/> to connect **Dart DevTools** to current app.

## Gradle version

- [**developer.android.com/studio/releases/gradle-plugin**](https://developer.android.com/studio/releases/gradle-plugin#4-1-0)
