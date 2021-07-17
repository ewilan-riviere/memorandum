---
title: OS versions
description: 'Show differences between OS versions supported by Flutter'
position: 11
category: 'Flutter'
---

## Android

![android-versions](/documentation/flutter/android-feat.jpg)

History of Android:

- [**developer.android.com/studio/releases/platforms#11**](https://developer.android.com/studio/releases/platforms#11)
- [**en.wikipedia.org/wiki/Android_version_history#Overview**](https://en.wikipedia.org/wiki/Android_version_history#Overview)

| Name               | Version numbers | Initial stable release date | Supported (security fixes) | API level |
| :----------------- | :-------------- | :-------------------------- | :------------------------- | :-------- |
| Alpha              | 1.0             | Sept. 23, 2008              | No                         | 1         |
| Beta               | 1.1             | February 9, 2009            | No                         | 2         |
| Cupcake            | 1.5             | April 27, 2009              | No                         | 3         |
| Donut              | 1.6             | Sept. 15, 2009              | No                         | 4         |
| Eclair             | 2.0 – 2.1       | Oct. 26, 2009               | No                         | 5 – 7     |
| Froyo              | 2.2 – 2.2.3     | May 20, 2010                | No                         | 8         |
| Gingerbread        | 2.3 – 2.3.7     | December 6, 2010            | No                         | 9 – 10    |
| Honeycomb          | 3.0 – 3.2.6     | February 22, 2011           | No                         | 11 – 13   |
| Ice Cream Sandwich | 4.0 – 4.0.4     | Oct. 18, 2011               | No                         | 14 – 15   |
| Jelly Bean         | 4.1 – 4.3.1     | July 9, 2012                | No                         | 16 – 18   |
| KitKat             | 4.4 – 4.4.4     | Oct. 31, 2013               | No                         | 19 – 20   |
| Lollipop           | 5.0 – 5.1.1     | November 12, 2014           | No                         | 21 – 22   |
| Marshmallow        | 6.0 – 6.0.1     | Oct. 5, 2015                | No                         | 23        |
| Nougat             | 7.0 – 7.1.2     | August 22, 2016             | No                         | 24 – 25   |
| Oreo               | 8.0 – 8.1       | August 21, 2017             | Yes                        | 26 – 27   |
| Pie                | 9               | August 6, 2018              | Yes                        | 28        |
| Android 10         | 10              | Sept. 3, 2019               | Yes                        | 29        |
| Android 11         | 11              | Sept. 8, 2020               | Yes                        | 30        |

### Update in Flutter

In Flutter, Android version reference can be found into `build.gradle`, you can compare with **API level** (it's other name of SDK level) above. In this example, the application can be used by Android KitKat 4.4 but not under this version and the target version is Android 10.

```groovy[android/app/build.gradle]
android {
    compileSdkVersion 29

    // ...

    defaultConfig {
        minSdkVersion 19
        targetSdkVersion 29
        // ...
    }
}
```

## iOS

- From [**en.wikipedia.org/wiki/List_of_iOS_and_iPadOS_devices**](https://en.wikipedia.org/wiki/List_of_iOS_and_iPadOS_devices)

<app-img source="ios-versions.webp"></app-img>

| Gen  | Model                                       | Life (Released - Discontinued)  |
| :--- | :------------------------------------------ | :------------------------------ |
| 1    | iPhone                                      | June 29, 2007 - July 11, 2008   |
| 2    | iPhone 3G                                   | July 11, 2008 - June 7, 2010    |
| 3    | iPhone 3GS                                  | June 19, 2009 - Sept. 12, 2012  |
| 4    | iPhone 4                                    | June 24, 2010 - Sept. 10, 2013  |
| 5    | iPhone 4S                                   | Oct. 14, 2011 - Sept. 9, 2014   |
| 6    | iPhone 5                                    | Sept. 21, 2012 - Sept. 10, 2013 |
| 7    | iPhone 5C / 5S                              | Sept. 20, 2013 - Sept. 9, 2015  |
| 8    | iPhone 6 / 6 Plus                           | Sept. 19, 2014 - Sept. 7, 2016  |
| 9    | iPhone 6S / 6S Plus / SE (1st)              | Sept. 25, 2015 - Sept. 12, 2018 |
| 10   | iPhone 7 / 7 Plus                           | Sept. 16, 2016 - Sept. 10, 2019 |
| 11   | iPhone 8 / 8 Plus / X                       | Sept. 22, 2017 - April 15, 2020 |
| 12   | iPhone XS / XS Max / XR                     | Sept. 21, 2018 - Sept. 10, 2019 |
| 13   | iPhone 11 / 11 Pro / 11 Pro Max / SE (2nde) | Sept. 20, 2019 - Oct. 13, 2020  |
| 14   | iPhone 12 / 12 Pro / 12 Mini / 12 Pro Max   | Oct. 23, 2020 - ...             |

**Flutter support iOS 8.0 and later.**

### Update in Flutter

You need to open `ios` directory with Xcode, open Runner from navigation panel and you will have an option to setup minimal iOS version.
