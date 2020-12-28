---
title: "Deployment: iOS"
description: 'When your app is ready, you will have to deploy it.'
position: 5
category: 'Flutter'
---

:::tip Links

- [**flutter.dev/docs/deployment/ios**](https://flutter.dev/docs/deployment/ios)

:::

## Clean cache

Before to deploy iOS app, you need to clean cache

**Close Xcode**

```bash
rm ios/Podfile.lock
```

```bash
flutter clean ; flutter pub get
```

```bash
cd ios ; pod update ; cd ../
```
