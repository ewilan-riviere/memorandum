---
image: seo-checklist.jpg
title: 'Checklist SEO'
description: 'Comment bien faire référencer un site web, côté technique.'
tags: ['seo', 'search']
date: 2020-10-05
author: 'Nina Vaillant'
---

*Search Engine Optimisation*

## 1. Choisir son domaine préféré

Pour les CMS open source

Les « www » peuvent apparaître (ou non) devant le nom de domaine donnant ainsi pour un même site :

- [**https://www.useweb.com**](https://www.useweb.com)
- [**http://useweb.com**](http://useweb.com)

Les moteurs de recherche ne « comprennent » pas cette subtilité, et considère donc qu’il s’agit de 2 url différentes.
Pour éviter cela, il faut choisir avec le client le nom de domaine qu’il préfère et le déclarer aux moteurs de recherche.

**Mode d’emploi :**

- Se connecter à la Google Search Console et déclarer les 4 variantes du nom de domaine :
  - [**http://www.useweb.com**](http://www.useweb.com)
  - [**http://useweb.com**](http://useweb.com)
  - [**https://www.useweb.com**](https://www.useweb.com)
  - [**https://useweb.com**](https://useweb.com)
- Définir son domaine préféré en se rendant dans le menu « Paramètres du site ». Les faire pour chacune des variantes.
- Enfin, indiquer le domaine préféré dans le CMS (voire le mode d’emploi du CMS utilisé).

## 2. Optimiser le robots.txt

Le fichier robots.txt est un fichier texte installé dans le répertoire racine d’un site Web.

Il indique aux robots d’exploration des moteurs de recherche les pages à ne pas indexer, grâce à plusieurs instructions :

- User-agent : correspondent aux robots de moteurs de recherche comme Googlebot pour Boogle ou Bingbot pour Bing.
- Disallow : interdit l’accès à une url ou un dossier
- Allow : indiquer les url à explorer

**Mode d’emploi :**

- Créer un fichier robots.txt (le fichier doit être inférieur à 62 Ko).
- Rentrer toutes les données nécessaires au crawl des robots d’indexation, exemple :
  - User-agent: *
  - Disallow: /admin-a/
  - Disallow: /admin-b/
- Ajouter si besoin des commentaires en commençant la ligne par #, ils seront néanmoins ignorés par les robots des moteur de recherche.
- Placer le fichier robots.txt à la racine du site internet.

## 3. Optimiser la structure des URLs

**Bonnes pratiques, à diffuser auprès de vos clients et partenaires :**

- Uniquement des caractères en minuscule et non accentués
- Utiliser le – (6) et non le _ (8) comme séparateur
- Supprimer les mots inutiles et les mots de liaison (de, à, et etc.)
- Utiliser les mots-clés dans les URL
- Eviter les chiffres
- Eviter d’utiliser trop de slash (/)

**Idéalement, pour chaque page créée, le `<slug>` doit être administrable afin qu’elle soit le plus optimisée possible.**

## 4. Optimiser le sitemap XML

Fichier au format XML qui répertorie toutes les pages importantes disponibles sur le site Web, qui comprend :

- L’URL
- Le titre
- La date de publication
- La dernière mise à jour

Il permet de faciliter la tâche d’exploration du site par les robots d’indexation. En général, il est visible à l’URL suivante : useweb.com/sitemap_index.xml.

**Mode d’emploi :**

- Lister toutes les pages importantes du site Web (ainsi que leur version canonique si elles existent), en général il s’agit de :
  - Pages
  - Articles
  - Catégories
- Eviter d’y ajouter les étiquettes, archives auteurs etc.
- Créer votre sitemap grâce à un des [outils générateurs de sitemap](https://code.google.com/archive/p/sitemap-generators/wikis/SitemapGenerators.wiki) pour créer le fichier.
- Mettre à disposition la sitemap pour les robots d’indexation en l’indiquant dans le fichier robots.txt, ou en l’envoyant sur la Search Console.

:::tip robots.txt
Insérez la ligne suivante n'importe où dans votre fichier robots.txt, en spécifiant le chemin d'accès vers votre sitemap :
Sitemap : [**http://example.com/emplacement_sitemap.xml**](http://example.com/emplacement_sitemap.xml)

Utilisez la fonctionnalité "ping" pour nous demander d'explorer votre sitemap. Envoyez une requête HTTP GET comme suit : [**http://www.google.com/ping?sitemap=<complete_url_of_sitemap>**](http://www.google.com/ping?sitemap=<complete_url_of_sitemap>)
Exemple : [**http://www.google.com/ping?sitemap=https://example.com/sitemap.xml**](http://www.google.com/ping?sitemap=https://example.com/sitemap.xml)
:::

**Bonnes pratiques (source : support.google.com) :**

- Publier de préférence la sitemap à la racine du site.
- Ne pas inclure d’identifiant de session dans les URL pour limiter la double exploration de ces URL.
- Signaler les versions multi langues d’une URL grâce aux annotations hreflang.
- Encoder les fichiers sitemap en UTF-8.
- Scinder les sitemap volumineux (taille maximale 50 000 URL pour 50 Mo) et utiliser un [fichier d’index de sitemap](https://support.google.com/webmasters/answer/75712?visit_id=637358455846780671-3085698860&rd=1).
- Ne répertorier que les URL canoniques dans le sitemap.
- Renvoyer vers une seule version d’une URL si celle-ci a une version mobile et desktop. Sinon, l’[annoter](https://developers.google.com/search/mobile-sites/mobile-seo/separate-urls#annotation-in-sitemaps) pour indiquer la version classique et la mobile.

:::tip sitemap.xml
**Annotations dans le sitemap**

L'annotation `rel="alternate"` des pages pour ordinateur peut être incluse directement dans les **sitemaps**, comme suit :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>    <loc>http://www.example.com/page-1/</loc>
    <xhtml:link rel="alternate" media="only screen and (max-width: 640px)"
    href="http://m.example.com/page-1" />
  </url>
</urlset>
```

Toutefois, la balise `rel="canonical"` obligatoire doit quand même être ajoutée au code HTML de la page mobile.
:::

## 5. Sécuriser le site Web

Chaque site Web doit être sécurisé avec son propre certificat SSL.

Quand cela n’est pas le cas, sensibilisez votre client ou votre partenaire et expliquez-lui l’importance de sécuriser les données de son site.

TODO cerbot

## 6. Installer les balises de référencement

Les balises indispensables sont au nombre de 3

- Balise <Title>
- Balises d’en-tête (Hn)
- Balises <Meta>

**Idéalement, chaque page créée sur le site Internet devra comporter depuis le B.O. un champs où l’administrateur du site pourra renseigner le Title (limité à 80 caractères) et la Meta (limitée à 165 caractères).**
**Il devra également être prévu dans le code une hiérarchie des en-têtes Hn (H1 unique, H2, H3 etc. pouvant aller jusqu’au H6) afin que l’administrateur ou le rédacteur puisse structurer son contenu.**

<md-img source="seo-tags-01.jpg"></md-img>

Les balises <alt> sur les images ont aussi un rôle très important pour le référencement.

**Idéalement, chaque image intégrée dans le site Web devra posséder une balise de texte alternatif. Pensez à la renseigner sur toutes les images utilisés dans le Front.**

**Pensez à intégrer ce champs dans le B.O. afin que l’administrateur ou le rédacteur puisse la renseigner quand il intègre des images dans du contenu administrable.**

<md-img source="seo-tags-02.jpg"></md-img>

## 7. Vérifier les URLs canoniques

Les balises canoniques évitent à Google de considérer que du contenu est dupliqué. Si du contenu similaire est accessible depuis plusieurs URL (exemple, la description d’un pull en laine jaune `www.monsite.fr/pull-jaune` et du même pull en laine rouge `www.monsite.fr/pull-rouge`), il faut spécifier une URL canonique.

L’URL canonique est l’adresse d’une page définie comme étant l’original et signalée aux moteurs de recherche afin qu’ils n’indexent d’autres pages ayant repris le contenu de l’original.

| Méthodes | Instructions | Avantages | Inconvénients |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| En-tête HTTP rel=canonical  | Envoyez un en-tête rel=canonical dans la réponse de votre page                                                                                                                                                     | - N'augmente pas la taille de la page - Peut mettre en correspondance un nombre infini de pages en double | Gestion de la mise en correspondance complexe sur les sites volumineux ou sur ceux dont les URL changent souvent                                                                                                                                                                                    |
| Sitemap                     | Définissez vos pages canoniques dans un sitemap                                                                                                                                                                    | Facile à mettre en place et à gérer, surtout sur des sites volumineux                                     | - Googlebot devra malgré tout trouver les pages en double associées à toutes les pages canoniques que vous désignez dans le sitemap - Indicateur moins puissant pour Googlebot que la technique de mise en correspondance rel=canonical                                                             |
| Balise `<link>` rel=canonical | Ajoutez une balise `<link>` au code de toutes les pages en double, en dirigeant vers la page canonique                                                                                                               | Peut mettre en correspondance un nombre infini de pages en double                                         | Peut augmenter la taille de la page Gestion de la mise en correspondance complexe sur les sites volumineux ou sur ceux dont les URL changent souvent Fonctionne uniquement pour les pages HTML, pas pour les fichiers comme les PDF. Dans ce cas, vous pouvez utiliser l'en-tête HTTP rel=canonical |
| Redirection 301             | Utilisez les redirections 301 pour indiquer à Googlebot qu'une URL de redirection constitue une meilleure version qu'une URL donnée. Utilisez cette méthode uniquement lorsque vous abandonnez une page en double.                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Variante AMP                | Si l'une de vos variantes est une page AMP, vous devrez suivre les consignes AMP pour indiquer la page canonique et la variante AMP.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

## 8. Optimiser au maximum les temps de chargement

**Visez un temps de chargement inférieur à 3 secondes !**

Les bonnes pratiques pour un site plus rapide :

- Compresser le Javascript : minifier le code pour utiliser la version la plus compacte possible
- Compresser aussi les images : idéalement, faire en sorte que les images ne dépassent pas 150Ko
- Définir les propriétés de cache : activer la mise en cache HTTP pour accélérer les sites Web
- Réduire les requêtes HTTP : combiner les fichiers CSS/JS qui le peuvent

## 9. Optimiser la navigation

Sensibilisez votre client, le Webdesigner, aux bonnes pratiques suivantes :

- Tout contenu important doit être accessible en 3 clics ou moins
- Le fil d’Ariane doit être présent sur chaque page
- La page 404 doit être optimisée

## 10. Open Graph

TODO open graph

TODO Nuxt tips
