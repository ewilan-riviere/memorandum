---
title: Setup
description: 'How to setup and create new project'
position: 1
category: 'Symfony'
---

## Linux

```bash
wget https://get.symfony.com/cli/installer -O - | bash ; sudo mv /home/$USER/.symfony/bin/symfony /usr/local/bin/symfony
```

```bash
symfony new symfony-project --full
```

- <https://yoandev.co/utiliser-tailwind-css-2-purgecss-avec-symfony-et-webpack-encore>
- <https://stackoverflow.com/questions/64925926/error-postcss-plugin-tailwindcss-requires-postcss-8>
- <https://les-tilleuls.coop/fr/blog/article/test-tailwindcss-v2>
- <https://gitlab.com/yoandev.co/utiliser-tailwind-css-2-purgecss-avec-symfony-et-webpack-encore>
- <https://marketplace.visualstudio.com/items?itemName=mblode.twig-language>

```bash
php bin/console doctrine:schema:update --force
```

```bash
php bin/console doctrine:fixtures:load
```

```bash
php bin/console make:entity
```

```bash
symfony console make:fixtures BookFixtures
```
