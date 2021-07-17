---
title: Notes
description: 'Notes about Flutter'
position: 13
category: 'Flutter'
---

// Concat variable into String

```dart
'$_api/real-estate-companies'
```

// stringify JSON

```dart
print(json.decode(response.body));
```

// Extract first result from List

```dart
List<Currency> currencies = ...;
Currency dollar = currencies.firstWhere((currency) => currency.code == "USD");
```

// Passing Data to a Stateful Widget

```dart
class ServerIpText extends StatefulWidget {
  final String serverIP;

  const ServerIpText ({ Key key, this.serverIP }): super(key: key);

  @override
  _ServerIpTextState createState() =>_ServerIpTextState();
}

class _ServerIpTextState extends State<ServerIpText> {
  @override
  Widget build(BuildContext context) {
    return Text(widget.serverIP);
  }
}

class AnotherClass extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: ServerIpText(serverIP: "127.0.0.1")
    );
  }
}
```

// Factory, if exist

<https://stackoverflow.com/questions/58141074/how-do-i-import-a-json-property-to-a-dart-object-when-it-may-or-may-not-exist>

// Built split by abi

```bash
flutter build apk --split-per-abi
```

// Stringify List

<https://stackoverflow.com/questions/59143173/convert-list-to-json-string-then-convert-this-string-back-to-list-in-dart>
