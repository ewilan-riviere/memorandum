---
layout: home

title: Memorandum
titleTemplate: Personal documentation and notes

hero:
  name: Memorandum
  text: Personal documentation
  tagline: Some notes and thoughts
  actions:
    - theme: brand
      text: Notebook
      link: /notebook/cheatsheet
    - theme: alt
      text: Quickstart
      link: /guide/getting-started
  image:
    src: /logo.svg
    alt: VitePress

features:
  - title: Frameworks guides
    icon: 📚
    details: Guides and notes about frameworks and libraries
  - title: Personal notes
    icon: 📝
    details: Personal notes and thoughts
  - title: Cheatsheets
    icon: 📖
    details: Cheatsheets and quick references
  - title: Sysadmin
    icon: 🛠
    details: Sysadmin notes and scripts
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #0066b1 30%, #fff773);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #0066b1 50%, #fff773 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
