---
title: Deployment on Android
description: 'When your app is ready, you will have to deploy it.'
position: 5
category: 'Flutter'
---

![android-versions](/documentation/flutter/google-play.jpg)

:::tip Links

- [**flutter.dev/docs/deployment/android**](https://flutter.dev/docs/deployment/android)

:::

## Sign the app

To publish on the Play Store, you need to give your app a digital signature. Use the following instructions to sign your app.

<code-group>
  <code-block label="Windows" active>

  ```powershell
  keytool -genkey -v -keystore c:\Users\$env:UserName\key.jks -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 -alias key
  ```

  </code-block>
  <code-block label="Linux/Mac">

  ```bash
  keytool -genkey -v -keystore ~/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key
  ```

  </code-block>
</code-group>

Create a password and answer to questions

- Quels sont vos nom et prénom : `RIVIERE Ewilan`
- Quel est le nom de votre unité organisationnelle : `Developers`
- Quel est le nom de votre entreprise : `Enterprise`
- Quel est le nom de votre ville de résidence : `Rennes`
- Quel est le nom de votre état ou province : `FRANCE`
- Quel est le code pays à deux lettres pour cette unité : `FR`
- Est-ce CN=RIVIERE Ewilan, OU= Developers, O=Enterprise, L=Rennes, ST=FRANCE, C=FR : `oui`

### Migrate key

Default generated key use `JKS` format, you can migrate to `PKCS12` with this command:

<code-group>
  <code-block label="Windows" active>

  ```powershell
  keytool -genkey -v -keystore c:\Users\$env:UserName\key.jks -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 -alias key
  ```

  </code-block>
  <code-block label="Linux/Mac">

  ```bash
  keytool -genkey -v -keystore ~/key.jks -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 -alias key
  ```

  </code-block>
</code-group>

### Reference key

In your Flutter application create `android/key.properties` with password of your key and it path location

```properties[android/key.properties]
storePassword=password
keyPassword=password
keyAlias=key
storeFile=C:/Users/<user name>/key.jks
```

`key.properties` contain passwords, so it's necessary to add it to `.gitignore`

```bash[android/.gitignore]
gradle-wrapper.jar
/.gradle
/captures/
/gradlew
/gradlew.bat
/local.properties
GeneratedPluginRegistrant.java
# add this line
key.properties
```

### Configuration

Update `android/app/build.gradle`

```groovy[android/app/build.gradle]
// ...

// For key
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
  keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
//

android {
  // ...

  // For key
  signingConfigs {
    release {
      keyAlias keystoreProperties['keyAlias']
      keyPassword keystoreProperties['keyPassword']
      storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
      storePassword keystoreProperties['storePassword']
    }
  }
  buildTypes {
    release {
      // TODO: Add your own signing config for the release build.
      // Signing with the debug keys for now, so `flutter run --release` works.
      signingConfig signingConfigs.debug
    }
  }
  //
}
```

After this, execute `clean`:

```bash
flutter clean
```

---

## Build a APK & install it

```bash
flutter pub get
```

### Build app bundle

```bash
flutter build appbundle
```

If everything works, you will find your app bunble to `build/app/outputs/bundle/release/app.aab`  
<https://github.com/google/bundletool>

### Obfuscating

Documentation : [**github.com/flutter/flutter/wiki/Obfuscating-Dart-Code**](https://github.com/flutter/flutter/wiki/Obfuscating-Dart-Code)

### Build APK

```bash
flutter build apk
```

Check `build/app/outputs/flutter-apk/app-release.apk`

### Install APK

Connect smartphone to computer with USB cable

```bash
flutter install
```

---

## Publish the app on Google Play Store

todo

---

## Promote the app

- <https://play.google.com/intl/en_us/badges/>
- <https://github.com/steverichey/google-play-badge-svg>
