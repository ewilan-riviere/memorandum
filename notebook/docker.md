---
title: Docker
description: Docker notes
---

# Docker

{{ $frontmatter.description }}

## Check images

```sh
docker images
```

## Check containers

```sh
docker ps
```

## Clear unused images

```sh
docker image prune -f
```

## Clear unused containers

```sh
docker container prune -f
```

## Clear all unused

```sh
docker system prune -f
```

## Clear all

::: warning
This will remove all images, containers, and networks.
:::

```sh
docker system prune --all -f
```
