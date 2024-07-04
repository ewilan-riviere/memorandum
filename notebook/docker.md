---
title: Docker
description: Docker notes
---

# Docker

{{ $frontmatter.description }}

## List

### Check images

List all images:

```sh
docker images
```

### Check containers

List all containers:

```sh
docker ps
```

## Clear

### Clear unused images

Clear only unused images:

```sh
docker image prune -f
```

### Clear unused containers

Clear only unused containers:

```sh
docker container prune -f
```

### Clear all unused

Clear all unused images, containers, and networks:

```sh
docker system prune -f
```

## Remove

### Remove all

::: warning
This will remove all images, containers, and networks.
:::

```sh
docker system prune --all -f
```

### Remove all containers

Remove all containers:

```sh
docker rm $(docker ps -a -q)
```

### Remove all images

Remove all images:

```sh
docker rmi $(docker images -q)
```

### Remove all volumes

Remove all volumes:

```sh
docker volume rm $(docker volume ls -q)
```

### Remove all networks

Remove all networks:

```sh
docker network rm $(docker network ls -q)
```

## Build

### Build image

Build an image from a Dockerfile:

```sh
docker build -t my-image .
```

### Build image with tag

Build an image with a tag:

```sh
docker build -t my-image:latest .
```

## Run

### Run container

Run a container from an image:

```sh
docker run my-image
```

### Run container with port

Run a container with a port:

```sh
docker run -p 8080:80 my-image
```

### Run container with volume

Run a container with a volume:

```sh
docker run -v /path/to/host:/path/to/container my-image
```

### Run container with interactive

Run a container with interactive mode:

```sh
docker run -it my-image
```

### Run container with detach

Run a container with detach mode:

```sh
docker run -d my-image
```

### Run container with name

Run a container with a name:

```sh
docker run --name my-container my-image
```

### Run container with environment

Run a container with an environment variable:

```sh
docker run -e MY_ENV=my-value my-image
```

## Run with docker compose

### Up

Run with docker compose:

```sh
docker compose up
```

### Up and build

Run with docker compose and build:

```sh
docker compose up --build
```

### Up and detach

Run with docker compose and detach:

```sh
docker compose up -d
```

### Down

Stop with docker compose:

```sh
docker compose down
```

### Down and remove

Stop with docker compose and remove:

```sh
docker compose down -v
```

## Logs

### Check logs

Check logs of a container:

```sh
docker logs my-container
```

### Check logs with follow

Check logs of a container with follow:

```sh
docker logs -f my-container
```

## Exec

### Exec command

Execute a command in a running container:

```sh
docker exec my-container ls
```

### Exec interactive

Execute an interactive command in a running container:

```sh
docker exec -it my-container bash
```

## Copy

### Copy from container

Copy a file from a container:

```sh
docker cp my-container:/path/to/file /path/to/host
```

### Copy to container

Copy a file to a container:

```sh
docker cp /path/to/host my-container:/path/to/container
```
