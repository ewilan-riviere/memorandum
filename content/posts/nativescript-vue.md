---
permalink: nativescript-vue
image: nativescript-vue.jpg
description: 'Comment installer et utiliser NativeScript Vue sur Windows.'
title: 'NativeScript Vue sous Windows'
subtitle: 'Découvrir le framework mobile by Telerik'
tags: ['javascript', 'vue', 'mobile', 'configuration', 'windows']
date: 2020-05-04
author: 'Ewilan Rivière'
---


[[toc]]

## Mise à jour

### Simplifier l'installation complète

<vue-badges :badges='[["OpenJDK"], ["AndroidStudio"], ["AndroidSDK"], ["NativeScript"], ["VisualStudioCode"], ["Scoop"]]'></vue-badges>

Installez d'abord **Flutter**, à travers [**cet article**](/posts/2020/06/18/flutter-setup-windows), pour avoir toutes les **dépendances nécessaires pour NativeScript** : l'**openJDK**, **Android Studio**, **Android SDK**... Ainsi vous n'aurez pas à utiliser **Chocolatey** pour télécharger les dépendances nécessaires.

Exécutez simplement ceci à la fin de l'installation de Flutter (dans un nouveau terminal) :

```bash
# Installer NativeScript CLI et des outils de développement
npm i -g tns nativescript @vue/cli @vue/cli-init vue-devtools
# Installer une dépendance de NativeScript
sdkmanager "build-tools;28.0.3"
```

La commande `sdkmanager` dépend de la variable d'environnement `ANDROID_HOME`. Si celle-ci a été correctement configurée comme ceci : `C:\Users\user\scoop\apps\android-sdk\current`, le SDK devrait pouvoir installer cette dépendance pour NativeScript. Vérifier si l'installation est correcte avec :

```bash
tns doctor
```

#### Debug

- Dépendance manquante avec le SDK Manager

Listez les dépendances possibles du SDK Manager avec :

```bash
sdkmanager --list
```

Et installez la dépendance souhaitée comme ceci :

```bash
# Example d'une dépendance du SDK Manager
build-tools;28.0.3 | 28.0.3 | Android SDK
Build-Tools 28.0.3

# Installation
sdkmanager "build-tools;28.0.3"
```

### Créer une application

Générer une application avec un template vide

```bash
tns create MyNewApp --template tns-template-blank-ng
cd MyNewApp
npm install
```

Scanner les appareils disponibles :

> Si aucun appareil n'est trouvé, relancez l'émulateur ou branchez un appareil Android ou iOS sur votre ordinateur.

```bash
tns device
```

Lancer la prévisualisation de votre application sur l'émulateur ou l'appareil choisi

> Le mode debug vous fournira une URL DevTools qui vous permettera de visualiser la console dans le DevTools de Google Chrome uniquement avec ce message :
>
> *To start debugging, open the following URL in Chrome:
> chrome-devtools://devtools/bundled/inspector.html?experiments=true&ws=localhost:40000*

```bash
# En mode debug
tns debug android
# En mode classique
tns run
```

Vous pouvez mettre en place Vue DevTools avec les instructions expliquées ici : [**nativescript-vue.org/vue-devtools**](https://nativescript-vue.org/en/docs/getting-started/vue-devtools/).

:::tip
Si vous utilisez **Visual Studio Code**, installez [**l'extension NativeScript Vue Snippets**](https://marketplace.visualstudio.com/items?itemName=msaelices.nativescript-vue-snippets) et [**l'extension NativeScript**](https://marketplace.visualstudio.com/items?itemName=NativeScript.nativescript).
:::

#### Liens utiles

> NativeScript propose différentes déclinaisons : Angular, TypeScript , JavaScript, Vue... Veillez à sélectionner celle qui vous concerne

- [**Plugins**](https://market.nativescript.org/?tab=plugins) : plugins à utiliser dans les applications pour rendre le développement plus simple
- [**Templates**](https://market.nativescript.org/?tab=templates) : templates préconfigurés à utiliser lors de la création de l'application
- [**Examples**](https://market.nativescript.org/?tab=samples&framework=all_frameworks&category=all_samples) : examples d'applications en NativeScript

### Le HMR ne fonctionne pas bien

L'un des problèmes principaux de NativeScript est son HMR à tendance capricieuse. Si le hot-reloading ne fonctionne pas correctement, quittez l'application en la supprimant des applications récentes et relancez-là depuis la liste des applications. Si cela n'améliore pas la situation, coupez la commande `tns run` et relancez-là. C'est un problème que vous rencontrerez souvent et il faudra s'y faire et plus vous connaitrez NativeScript Vue, plus vous ferez des tests de manière ponctuelle, le début est le plus difficile. Il n'y a actuellement aucune solution efficace pour avoir un HMR efficace, en-dehors de passer à Flutter.

---

## Configuration complète

Après avoir essayé de développer à travers l'application **NativeScript Playground**, il apparaît assez vite que le développement est plus efficient si on installe tout localement sans avoir à utiliser un terminal Android ou iOS pour tester l'application en développement. Ainsi, il faudra installer un certains nombre de dépendances pour pouvoir développer directement sur son propre poste.

Les dépendances nécessaires sont listées ici : [**docs.nativescript.org/start/ns-setup-win**](https://docs.nativescript.org/start/ns-setup-win). Toutes les commandes proposées utilisent [**Chocolatey**](https://chocolatey.org/) pour installer les dépendances nécessaires. Il est possible de choisir de s'en inspirer et de configurer les dépendances demandées par soi-même mais cela demande une certaine aisance. **Il est à noter que certaines commandes proposées ne sont plus valables.**

Par conséquent, si l'on accepte de laisser **Chocolatey** gérer l'installation des dépendances, on peut simplement passer par la commande `tns`. Si celle-ci n'a pas été installée, installez-là avec également `nativescript`.

```powershell
npm i -g tns nativescript @vue/cli @vue/cli-init vue-devtools
```

:::tip
Si vous avez une bande passante assez peu élevée, NPM pourra avoir quelques difficultés à installer `nativescript` ou `tns`, n'hésitez pas à relancer la commande NPM si celle-ci plante.
:::

Une fois ces deux dépendances Node.js installées, exécutez simplement la commande suivante :

```powershell
tns doctor
```

Cela lancera un script de vérification des dépendances pour NativeScript qui échouera car les dépendances n'ont pas encore été installées. Ce qui nous intéresse est la proposition faite par `tns` qui posera cette question :

```powershell
Your environment is not configured properly and you will not be able to execute local builds.
Select "Sync to Playground" to enjoy NativeScript without any local setup. All you need is a couple of companion apps installed on your devices.
Select "Configure for Local Builds" to run the setup script and automatically configure your environment for local builds.
Select "Skip Step and Configure Manually" to disregard this option and install any required components manually.
```

Sélectionnez `Configure for Local Builds` à l'aide des flèches de direction et faites <kbd>Entrée</kbd>, cela lancera le téléchargement de toutes les dépendances nécessaires. Lorsque cette question arrivera, acceptez :

```powershell
Do you want to install Android emulator? (Y)es/(N)o:
```

```
× You need to have the Android SDK Build-tools installed on your system. You can install any version in the following range: '>=23 <=29'.
 Run `$ sdkmanager` from your command-line to install required `Android Build Tools`. In case you already have them installed, make sure `ANDROID_HOME` environment variable is set correctly.

The setup script was not able to configure your environment for local builds. To execute local builds, you have to set up your environment manually. Please consult our setup instructions here 'https://docs.nativescript.org/start/quick-setup'.
```

vue init nativescript-vue/vue-cli-template my-new-app
cd my-new-app
npm install

Brancher son smartphone OU installer Android Studio pour avoir un émulateur virtuel

tns run

Si l'appareil est détecté, la compilation va se lancer et prendre un certain temps. Quand elle sera terminée, toute modification des fichiers de l'application lancera le hot reloading et rechargera l'application.

Scanner les appareils disponibles

tns device

---

Download Android Studio : [**developer.android.com/studio**](https://developer.android.com/studio) and install it  

- When it's installed, launch it and search 'AVD Manager'
- Select a device like Nexus 6, select `Next` and select image like Android Nougat v7 or Marshmallow v6
  - Don't select a too recent image, the image have to be compatible multiple smartphones, with Marshmallow you can cover 70% of Android market
- When image is downloaded, create the virtual device

:::warning
If virtualization is disable on your MB, the device won't be able to start. Check BIOS or UEFI to enable it, check `CPU features` and `SYM` is it's exist for your MB.
:::

When virtual device start, check if you see it with `tns device`. If all it's ok, try to start your app with `tns run`, the virtual device have to refresh and display your application.

:::tip
**I've black screen when my app start**
Try to reboot virtual device and command `tns run` or try to plug Android smartphone to your machine to try to start app on a real smartphone.
:::

Manage Virtual Devices [**developer.android.com/studio/run/managing-avds.html**](https://developer.android.com/studio/run/managing-avds.html)  

- [https://docs.nativescript.org/tooling/android-virtual-devices](https://docs.nativescript.org/tooling/android-virtual-devices)
- [https://www.androidcentral.com/installing-android-sdk-windows-mac-and-linux-tutorial](https://www.androidcentral.com/installing-android-sdk-windows-mac-and-linux-tutorial)
- <https://alligator.io/vuejs/getting-started-vue-nativescript/>
- <https://docs.nativescript.org/angular/start/quick-setup>
- <https://docs.nativescript.org/start/cli-basics>
- <https://market.nativescript.org/?tab=samples&framework=vue&category=all_samples>

## Configuration rapide

> Pour faire du véritable développement, il est conseillé d'effectuer la *configuration complète*

La mise en place d'une **application mobile** peut se faire facilement avec **NativeScript** en utilisant **VueJS**, présenté ici [**nativescript.org/vue**](https://www.nativescript.org/vue) ce framework utilise la puissance de **VueJS** pour construire rapidement et proprement une **application**.

:::tip
N'hésitez pas à consulter la documentation NativeScript pour Vue : [**nativescript-vue.org/en/docs/**](https://nativescript-vue.org/en/docs/introduction/)
:::

:::warning
Vous aurez besoin d'un smartphone (iOS ou Android) pour visualiser votre application ainsi que de l'application **NativeScript Playground**

- [**App Store**](https://apps.apple.com/us/app/nativescript-playground/id1263543946)
- [**Google Play**](https://play.google.com/store/apps/details?id=org.nativescript.play)
:::

Pour commencer, il est possible d'utiliser rapidement NativeScript grâce à un IDE web et un tutorial proposé en même temps ici : [**play.nativescript.org**](https://play.nativescript.org/). Mais rapidement, il sera préférable de migrer en local pour travailler plus efficacement. Visual Studio Code est un excellent IDE qui se prête très bien à ce type de projet. Vous aurez d'abord besoin d'installer **NativeScript** en local global avec **NPM** :

```bash
npm install -g nativescript@latest
```

Cela vous donnera une nouvelle commande : `tns`. Deux choix s'offrent à vous, vous pouvez choisir de télécharger l'application d'exemple fournie sur le tutorial ou vous pouvez créer une nouvelle application avec `tns` pour avoir un dépôt avec tous les fichiers nécessaires.

Quel que soit votre choix, si vous utilisez Visual Studio Code, vous aurez besoin de deux extensions à télécharger directement dans votre onglet **Extensions** :

- [**NativeScript**](https://marketplace.visualstudio.com/items?itemName=Telerik.nativescript) : pour tester votre application et la lier avec votre smartphone.
- [**NativeScript-Vue Snippets**](https://marketplace.visualstudio.com/items?itemName=msaelices.nativescript-vue-snippets) : pour avoir les snippets de NativeScript Vue

---

Pour visualiser votre application, cela dépend de ce que vous souhaitez.

- Si vous choisissez de **continuer l'application de tutorial**, téléchargez-la et placez-la dans un répertoire
- Si vous souhaitez **créer une nouvelle application** lancez la commande suivante :

```bash
tns create my-new-application
```

:::tip
Continuer l'application du tutorial est très bien pour s'habituer à NativeScript mais si vous souhaitez créer une véritable application qui sera sur git, je vous conseille de créer une nouvelle application. Et recréer l'application du tutorial dans la nouvelle peut être intéressant.
:::

---

Rendez-vous dans votre dépôt avec le terminal et exécutez la commande suivante :

```bash
tns preview
```

Cela va générer un QR Code que vous pourrez lire avec l'application **NativeScript Playground** (indiquée précédemment) et ainsi envoyer la preview de votre application directement sur votre smartphone à travers cette application. Cela peut mettre un certain temps à se charger, c'est normal.

---

Vous pouvez maintenant modifier les fichiers de votre application et celle-ci se mettra à jour directement. Cela peut demander un peu de temps voire ne pas se mettre à jour. N'hésitez pas à faire <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> et sélectionner **NativeScript: Run on Android/iOS** selon votre appareil pour l'actualiser si nécessaire. Cette action n'est pas nécessaire à chaque changement, seulement l'application ne se met pas à jour.
