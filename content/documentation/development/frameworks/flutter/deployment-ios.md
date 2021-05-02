---
title: "Deployment: iOS"
description: 'When your app is ready, you will have to deploy it.'
position: 5
category: 'Flutter'
---

<alert type="info" title="Links">

Magna ea nostrud proident mollit ea dolore pariatur enim incididunt nisi dolore veniam irure nisi. Occaecat nostrud proident eu excepteur tempor laboris sit quis aliqua. Incididunt sint incididunt ex ea voluptate sit. Et tempor nulla est nostrud pariatur ad sint commodo id ullamco cupidatat.

- [**flutter.dev/docs/deployment/ios**](https://flutter.dev/docs/deployment/ios)

</alert>

## Clean cache

Before to deploy iOS app, you need to clean cache

- Close Xcode
- Execute cleaning

```bash
flutter clean ; rm -Rf ios/Pods ; rm -Rf ios/.symlinks ; rm -Rf ios:Flutter/Flutter.framework ; rm -Rf ios/Flutter/Flutter.podspec ; rm ios/Podfile.lock ; flutter pub get ; cd ios ; pod update ; cd ../
```

## Uncheck Runner

- [**github.com/flutter/flutter/issues/30287**](https://github.com/flutter/flutter/issues/30287)

In Xcode, select **Runner**, select **TARGETS/Runner**, select **Build phases**, open **Copy Bundle Resources** and remove **Runner.app** if you find it into list of files.

In project navigator, find `Runner/Info.plist`, open it and, at *right* side you have to see **Target membership**, uncheck Runner if checked.
