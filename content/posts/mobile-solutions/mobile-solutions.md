---
permalink: mobile-solutions
image: mobile-solutions.jpg
description: 'Les différentes possibilités pour développer sur mobile en-dehors du natif.'
title: 'Solutions mobiles'
subtitle: 'Recherche sur les solutions mobiles existantes'
tags: ['cordova', 'flutter', 'mobile', 'nativescript', 'recherche']
date: 2020-06-16
author: 'Ewilan Rivière'
---

Actuellement trois possibilités sont envisagées :

- **Cordova** et le WebView
- **NativeScript Vue** et son API native
- **Flutter** et son moteur

## Adapter la solution au projet

Faire **une application mobile** se réfléchit en amont sur le *pourquoi* qui amènera au *comment*. Les solutions sont nombreuses mais nous pouvons déjà **exclure les solutions purement natives** que sont le développement **en Swift** ou **en Java / Kotlin** qui nécessitent de réécrire deux fois l'application pour la faire fonctionner sur les deux plateformes que sont **iOS** et **Android**. Par conséquent il nous reste des **solutions natives** comme **Flutter**, **hybrides** comme **NativeScript** ou un **portage webview** comme **Cordova**.

Chacune de ces solutions comporte **des avantages** et **des inconvénients** et donc, il convient de choisir une solution plutôt qu'une autre **selon le projet** d'origine.

### Cordova, la solution simple

<md-img source="cordova.jpg"></md-img>

Cette solution est à utiliser **uniquement dans des cas spécifiques**, elle ne permet **pas** de construire **une véritable application mobile**. L'intérêt de Cordova est d'**utiliser le WebView** (le moteur de rendu HTML) pour embarquer la partie web du projet. L'affichage de l'application est donc **le même affichage que celui donné par le navigateur mobile**, à savoir un site web responsive et non **pas une véritable application mobile**. L'avantage est donc simplement d'**avoir une présence sur l'AppStore et le Play Store** allant au-delà de la présence sur le web. Le code utilisé est le même que le site, Cordova se charge d'embarquer ce qui est nécessaire. Pour utiliser les avantages mobiles tels que la caméra ou la géolocalisation, des plugins de Cordova sont disponibles.

Il est nécessaire de rappeler que sur chaque store, les applications sont notées par les utilisateurs sur leurs performances et leur utilité, une mauvaise note globale qui serait obtenue avec une application de basse qualité affecterait la crédibilité du projet et le nombre d'utilisateurs qui prendrait le temps de la télécharger serait plutôt négligeable. Le PWA est souvent une meilleure alternative.

<md-img source="overview-cordova.jpg"></md-img>

<compare lang="fr">
  <template v-slot:advantages>
    - Présence sur le store
    - Code 100% réutilisable
  </template>
  <template v-slot:disadvantages>
    - L'application n'est qu'une version responsive embarquée
    - Performances mauvaises
    - Maintenabilité qui peut devenir compliquée
    - Expérience utilisateur dégradée / Popularité basse
  </template>
</compare>

### NativeScript Vue, un portage efficace

<md-img source="nativescript-vue.jpg"></md-img>

Dans le cas où **un site web déjà existant** a été **réalisé en Vue.js** et qu'on souhaite **faire une application mobile qui y est liée**, NativeScript Vue est une solution idéale pour **éviter de réécrire une grande partie du code**. Elle se sert de son moteur JavaScript pour compiler l'application côté mobile (avec une nette amélioration des performances côté Android grâce au moteur V8 de Google).

Une partie du **code devra être réécrit cependant**. NativeScript Vue propose des composants qui utilisent l'API native et qui permettent de **traduire du XML en mobile**, donc **tout le code HTML n'est plus valable**, il faudra le réadapter tout en gardant sa logique. Un autre problème va survenir, c'est **le CSS qui lui aussi ne peut pas être converti en mobile** (en-dehors de quelques attributs) et donc il devra être repensé. Il ne faut pas oublier que **le design d'un site web n'est pas conforme** à une utilisation **à** travers **une application mobile** qui comporte des normes différentes en terme **d'expérience utilisateur** donc un **design mobile** (différent du design responsive) devra être fourni.

La **partie `script` ne bougera quasiment pas** dans sa logique et pourra utiliser la plupart des méthodes qui ont été codées pour le site web. L'application ainsi obtenue est **conforme aux standards des applications mobiles**, utilisant des composants faits pour le mobile et **ayant accès à toutes les options offertes par le support**.

<md-img source="overview-nativescript-vue.jpg"></md-img>

<compare lang="fr">
  <template v-slot:advantages>
    - Application propre et conforme
    - Code en partie réutilisable, la logique restera la même
    - Bonnes performances
    - API native et accès à toutes les options
  </template>
  <template v-slot:disadvantages>
    - Réécriture d'une partie de l'application nécessaire
    - Adaptation à NativeScript Vue
    - Débuggage compliqué et rechargement à chaud aléatoire
  </template>
</compare>

### Flutter, l'ultime

<md-img source="flutter.jpg"></md-img>

Si les solutions précédentes ne fournissaient pas **un véritable SDK** (*"Software Developpment Kit"*), Flutter arrive avec l'artillerie lourde, avec un tout nouveau langage exclusif : **Dart** (orienté Objet, héritier du JavaScript et du C). Une réécriture est donc nécessaire, l'application **pourra utiliser la même API** que le site web mais tout **son design devra être refait en Dart** avec les composants dédiés. On pourrait donc penser que c'est un engagement coûteux et pas nécessairement intéressant, or Flutter a une popularité qui n'est plus à démontrer. C'est un choix évident en cas de développement mobile uniquement, **est-il superflu en cas d'une partie web et d'une partie mobile** ?

Tout dépend de **la qualité de l'application souhaitée** et le projet sur **le long terme**. Si NativeScript Vue permet de faire également une application de qualité, travailler avec n'est pas sans certains désagréments, notamment en terme de **débuggage**, quand Flutter offre des outils de qualité en développement et en débuggage. Si le projet doit durer sur le long terme avec **une application assez complexe et de multiples fonctionnalitées**, il sera sans doute préférable de **choisir Flutter** pour des questions de maintenabilité. En revanche, avec **une application simple aux fonctionnalités limitées**, **NativeScript Vue** peut être intéressant pour développer rapidement une application. Dans le cas où toutes les personnes travaillant sur l'application sont formées à Flutter et à NativeScript Vue, il est possible que Flutter reste un choix pertinent même dans le cas d'une application légère.

:::tip
Il est possible de faire du web avec Flutter, par conséquent on réutilise le même code sur les deux plateformes.
:::

<md-img source="overview-flutter.jpg"></md-img>

<compare lang="fr">
  <template v-slot:advantages>
    - Application propre et conforme
    - Excellentes performances
    - Quasiment toutes les options du support sont disponibles
    - Débuggage et rechargement à chaud très efficaces
    - SDK très soutenu
    - Communauté très active et de nombreux widgets sont disponibles
    - Soutenu par Google : puissance de frappe, promotion, long terme
  </template>
  <template v-slot:disadvantages>
    - Code à réécrire, l'API reste la même
    - Formation à Flutter nécessaire
    - Application plus lourde
    - Soutenu par Google : connu pour avoir déjà abandonné des projets, GAFAM
  </template>
</compare>

**Liens utiles**

- [**scriptol.fr**](https://www.scriptol.fr/programmation/dart.php)
- [**developpez.com**](https://soat.developpez.com/tutoriels/dart/dart-manuel-reference/)

---

## Comparaison croisée

<md-img source="compare-access-native-features.jpg"></md-img>
<md-img source="compare-third-party-librairies.jpg"></md-img>
<md-img source="compare-learn-write.jpg"></md-img>
<md-img source="compare-perf.jpg"></md-img>
<md-img source="compare-popularity.jpg"></md-img>
<md-img source="compare-pre-styled-components.jpg"></md-img>
<md-img source="compare-third-party-librairies.jpg"></md-img>
<md-img source="compare-write-once-use-everywhere.jpg"></md-img>

---

## Et plus loin

### PWA Progressive Web App

En terme d'efficacité, le PWA reste la solution la plus séduisante, elle apporte tout pour le mobile en-dehors de la présence sur le store.

- Chargement instantané : les *services workers* permettent à vos applications de se charger presque instantanément et de manière fiable, quel que soit le type de connexion réseau de votre utilisateur.
- Rapide : les animations, le défilement et la navigation fluides rendent l'expérience agréable.
- Peut être ajouter à l'accueil : dès que les critères du PWA sont remplis, Chrome invite à ajouter le PWA sur l'écran d'accueil.
- Sécurisé : Le HTTPS sécurise la connexion entre vous et vos utilisateurs, en garantissant que les informations de vos utilisateurs sont protégées et ne sont pas altérées.
- Notifications "push" : les notifications "push" sur le web permettent de renouer facilement avec les utilisateurs en affichant des notifications pertinentes, opportunes et contextuelles, même lorsque le navigateur est fermé. Les utilisateurs passent 4 fois plus de temps sur le PWA.
- Réactivité : les utilisateurs modernes vivent sur des téléphones, des tablettes et des ordinateurs portables, vos applications et sites web devraient faire de même. Apprenez à structurer et à coder votre contenu pour qu'il s'affiche bien sur l'écran, quelle que soit sa taille.
- Conversions améliorées : l'expérience utilisateur élevée aide à augmenter les conversions.

### Ionic Vue

Ionic Vue est encore en développement et ce choix n'est pas conseillé en production, à utiliser de manière expérimentale.

- [ionicframework.com](https://ionicframework.com/docs/vue/overview)
- [alligator.io](https://alligator.io/vuejs/vue-ionic/)
- [dev.to/aaronksaunders](https://dev.to/aaronksaunders/build-your-first-ionic-vue-app-18kj)
- [digitalocean.com](https://dev.to/aaronksaunders/build-your-first-ionic-vue-app-18kj)
- [techiediaries.com](https://www.techiediaries.com/ionic-vue/)

### React Native

Le framework le plus populaire historiquement et très apprécié de ses utilisateurs. Ses performances sont proches de NativeScript Vue et les resources disponibles pour React Native sont nombreuses, il faut cependant être à l'aise avec React, le mieux étant d'avoir une côté web développé en ReactJS pour porter facilement le code en React Native.

React Native invoque les API Objective-C pour le rendu vers les composants iOS, ou les API Java pour le rendu vers les composants Android, au lieu de rendre vers le DOM du navigateur. Il utilise le code JavaScript pour gérer les vues natives. Il finit souvent par rendre des vues basées sur le web et semble être le choix préféré pour le développement de plates-formes inter-applications.

<md-img source="overview-reactnative.jpg"></md-img>

---

## Sources

- [**frandroid**](https://www.frandroid.com/android/535194_quest-ce-que-flutter-loutil-permettant-de-creer-des-applications-android-et-ios)
- [**konstantinfo**](https://www.konstantinfo.com/blog/react-native-vs-flutter-vs-ionic-vs-nativescript-vs-pwa/)
- [**academind**](https://academind.com/learn/flutter/react-native-vs-flutter-vs-ionic-vs-nativescript-vs-pwa/)
- [**stackshare**](https://stackshare.io/stackups/flutter-vs-nativescript)
- [**cordova**](https://cordova.apache.org/docs/fr/9.x/guide/overview/index.html)
- [**flutter**](https://flutter.dev/docs/resources/technical-overview)
