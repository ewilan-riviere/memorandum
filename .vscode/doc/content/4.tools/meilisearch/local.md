---
title: Local
description: How to setup Meilisearch
---

# Local

## OS

### Linux/WSL

The simple way to setup Meilisearch is `curl`

```sh
curl -L https://install.meilisearch.com | sh
```

Now you can launch Meilisearch

```sh
./meilisearch
```

But the best solution is to add to binaries

```sh
sudo mv ./meilisearch /usr/bin/
```

Now you can launch it

```sh
meilisearch
```

### macOS

The simple way to setup Meilisearch is `homebrew`

```sh
brew update && brew install meilisearch
```

Now you can launch Meilisearch

```sh
meilisearch
```

### Windows

You will need to install [Docker](https://www.docker.com)

Pull the image

```sh
docker pull getmeili/meilisearch:v1.0
```

Execute the image

```sh
docker run -it --rm \
    -p 7700:7700 \
    -e MEILI_ENV='development' \
    -v $(pwd)/meili_data:/meili_data \
    getmeili/meilisearch:v1.0
```

## Update

With `curl`, just override existing binaries, with `homebrew`, just update and with Docker, just pull the new image.

You will have to delete `data.ms` in meilisearch directory to update the database.
