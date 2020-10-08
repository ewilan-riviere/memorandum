---
permalink: flutter-on-windows
image: flutter-on-windows.jpg
description: 'Comment installer et utiliser Flutter sur Windows.'
title: 'Flutter sous Windows'
subtitle: 'Découvrir le framework mobile by Google'
tags: ['dart', 'flutter', 'mobile', 'configuration', 'windows']
date: 2020-06-17
author: 'Ewilan Rivière'
---

## 1. Configuration de Flutter

:::tip Scoop
Vous aurez besoin d'installer **Scoop** sur Windows pour la suite du guide. N'hésitez pas à consulter cet article : [**Scoop pour Windows**](/articles/scoop-package-manager)
:::

:::warning
Vous aurez besoin d'installer plusieurs logiciels qui prendront environ 3 à 4 Go d'espace disque, ce qui demandera une bonne bande passante et de l'espace sur votre disque dur.  
<vue-badges :badges='[["AndroidStudio"], ["AndroidSDK"], ["Flutter"], ["Dart"], ["VisualStudioCode"]]'></vue-badges>
:::

> Documentation officielle : [**flutter.dev/docs**](https://flutter.dev/docs/get-started/install/windows)

Ce guide se base sur la documentation officielle mais en utilisant **Scoop** pour les dépendances nécessaires : Android Studio, Java et Flutter.

```powershell
scoop install android-studio ; scoop bucket add java ; scoop bucket add extras ; scoop install flutter
```

:::tip Information
`scoop install flutter` installera plusieurs dépendances avec Flutter :

- ADB
- Android SDK
- OpenJDK 8
- Flutter

À la fin de l'installation, **Scoop** vous demandera quelle plateforme Android utiliser, choisissez celle par défaut.
:::

Mettre à jour Flutter après son installation

```bash
flutter upgrade --force
```

---

## 2. Configuration de l'émulateur Android

:::tip Information
Vous pouvez utiliser un appareil Android réel et vous passez de l'émulateur.
:::

- Lancer **Android Studio** depuis **Windows menu**
- Téléchargerles mises à jour
- Lancer **new project for phone**, garder la **configuration par défaut**, il s'agit juste d'accéder à *Android Studio*
- Taper **deux fois** sur <kbd>⇧ Shift</kbd> pour accéder à la **recherche globale** et chercher **`AVD` pour trouver AVD Manager** et le sélectionner
- Créer un **nouveau `Virtual Device`**, garder par défaut le *Pixel 2* avec *Play Store*
- Choisir une image récente comme **Oreo** et **la télécharger**
- Terminer l'installation et **lancer l'émulateur depuis AVD**, si vous voyez un message comme `Unable to locate ADB`, cela n'empêchera pas l'émulateur de fonctionner. **Démarrer l'émulateur** avec le bouton de la barre d'action latérale.

Si tout fonctionne bien, vous aurez un appareil Android détecté par Flutter. Vous pouvez ajouter les plugins à Android Studio  (même si vous ne les utilisez pas) pour satisfaire les dépendances de Flutter.

- Tapez **deux** fois sur <kbd>⇧ Shift</kbd> pour accéder à la **recherche globale** et recherchez **`plugins` pour trouver Plugins** et sélectionnez le
- Recherchez `flutter` pour trouver **Flutter plugin** et l'installer, acceptez l'installation de **Dart plugin** aussi et relancez l'IDE une fois le téléchargement terminé

---

## 3. Configurer Visual Studio Code

> *Vous pouvez utiliser Android Studio comme IDE, cette étape est optionnelle*

Télécharger et installer [**Visual Studio Code**](https://code.visualstudio.com/), dans le panneau **Extensions** recherchez `flutter` pour trouver [**Flutter extension**](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter) et installez-là.

Tapez le raccourci <kbd>Ctrl</kbd> + <kbd>⇧ Shift</kbd> + <kbd>P</kbd> pour **ouvrir la console de VSCode**, recherchez `JSON` et sélectionnez **Prefrences: Open Settings (JSON)**, vous pouvez ajouter cette option pour auto formatter le code lors de sa sauvegarde

```json
{
    //...
    "editor.formatOnSave": true,
}
```

---

## 4. Vérifier l'installation de Flutter

Après toutes ces étapes, vous avez saisi le problème : configurer Flutter n'est pas simple. Mais vous avez une commande très utile pour vérifier si tout s'est bien passé. Fermez votre terminal actuel et ouvrez-en un nouveau pour actualiser le `PATH` de l'environnement :

```bash
flutter doctor -v
```

Cette commande vous fera une vérification complète de l'installation de Flutter. Quelque-unes des erreurs possibles sont listées ci-dessous :

### 4.a. Débuggage

#### 4.b. `Android license status unknown`

Acceptez toutes les licenses avec cette commande :

```bash
flutter doctor --android-licenses
```

Vous devrez accepter chaque license manuellement.

#### 4.c. Erreur Java comme... / Erreur `ANDROID_SDK_ROOT`

```bash
Exception in thread "main" java.lang.NoClassDefFoundError: javax/xml/bind/annotation/XmlSchema
        at com.android.repository.api.SchemaModule$SchemaModuleVersion.<init>(SchemaModule.java:156)
        at com.android.repository.api.SchemaModule.<init>(SchemaModule.java:75)
        at com.android.sdklib.repository.AndroidSdkHandler.<clinit>(AndroidSdkHandler.java:81)
        at com.android.sdklib.tool.sdkmanager.SdkManagerCli.main(SdkManagerCli.java:73)
        at com.android.sdklib.tool.sdkmanager.SdkManagerCli.main(SdkManagerCli.java:48)
Caused by: java.lang.ClassNotFoundException: javax.xml.bind.annotation.XmlSchema
        at java.base/jdk.internal.loader.BuiltinClassLoader.loadClass(BuiltinClassLoader.java:582)
        at java.base/jdk.internal.loader.ClassLoaders$AppClassLoader.loadClass(ClassLoaders.java:190)
        at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:499)
        ... 5 more
```

Cette erreur est causée par les **variables d'environnement**, ouvrez le **menu démarrer de Windows**, recherchez `variables` et sélectionnez **Modifier les variables d'environnement système**. Cliquez sur **Variables d'environnement** et vous aurez une fenêtre avec deux parties, regardez les **Variables de l'utilisateur** et comparez les avec celles-ci

```
ANDROID_HOME => C:\Users\user\scoop\apps\android-sdk\current
ANDROID_SDK_ROOT => C:\Users\user\scoop\apps\android-sdk\current
JAVA_HOME => C:\Users\user\scoop\apps\adopt8-hotspot\current
```

:::tip Information
La variable **ANDROID_HOME** peut utiliser le JRE d'Android Studio ainsi `C:\Users\user\scoop\apps\android-studio\current\jre`
:::

#### 4.d. Commande non reconnue

Fermez tous vos terminaux et ouvrez-en un nouveau, cela fera une mise à jour du `PATH`. Si cela ne fonctionne pas, allez voir vos variables d'environnement.

---

## 5. Installer Dart

Flutter embarque Dart mais si vous souhaitez avoir l'interface en ligne de commande, vous pouvez l'installer avec Scoop.

```bash
scoop install dart
```

## 6. Aller plus loin

- [**stackoverflow.com/android-studio-java-home-doesnt-point-to-a-valid-jvm-installation**](https://stackoverflow.com/questions/28345340/android-studio-java-home-doesnt-point-to-a-valid-jvm-installation)
- [**github.com/flutter/issues**](https://github.com/flutter/flutter/issues/16025)
