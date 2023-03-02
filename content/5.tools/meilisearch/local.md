---
title: Local installation
description: How to setup Meilisearch
---

> MeiliSearch is a powerful, fast, open-source, easy to use and deploy search engine. Both searching and indexing are highly customizable. Features such as typo-tolerance, filters, and synonyms are provided out-of-the-box.

Here, the installation wil use GNU/Linux but it can be deploy on macOS too. For Windows, Windows Subsytem for Linux or Docker are some solutions.

- [**meilisearch.com**](https://www.meilisearch.com/)
- [**github.com/meilisearch/MeiliSearch**](https://github.com/meilisearch/MeiliSearch)
- [**installation guide**](https://docs.meilisearch.com/learn/getting_started/installation.html)

## OS

### Linux/WSL

The simple way to setup Meilisearch is `curl`

```bash
curl -L https://install.meilisearch.com | sh
```

Now you can launch Meilisearch

```bash
./meilisearch
```

But the best solution is to add to binaries

```bash
sudo mv ./meilisearch /usr/bin/
```

Now you can launch it

```bash
meilisearch
```

### macOS

The simple way to setup Meilisearch is `homebrew`

```bash
brew update && brew install meilisearch
```

Now you can launch Meilisearch

```bash
meilisearch
```

### Windows

You will need to install [Docker](https://www.docker.com)

Pull the image

```bash
docker pull getmeili/meilisearch:v1.0
```

Execute the image

```bash
docker run -it --rm \
    -p 7700:7700 \
    -e MEILI_ENV='development' \
    -v $(pwd)/meili_data:/meili_data \
    getmeili/meilisearch:v1.0
```

## Update

With `curl`, just override existing binaries, with `homebrew`, just update and with Docker, just pull the new image.

You will have to delete `data.ms` in meilisearch directory to update the database.
