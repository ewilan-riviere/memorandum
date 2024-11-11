# Memorandum

[![vitepress][vitepress-version-src]][vitepress-version-href]
[![node][node-src]][node-href]
[![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)

[![pipeline](https://gitlab.com/kiwilan/memorandum/badges/main/pipeline.svg)](https://gitlab.com/kiwilan/memorandum)

Personal documentation, deploy on [memorandum.kiwilan.app](https://memorandum.kiwilan.app), built using [Vitepress](https://vitepress.dev/), a modern static website generator.

## Installation

```
pnpm i
```

```
pnpm dev
```

### Deployment

Check the [VitePress Deployment Guide](https://vitepress.dev/guide/deploy) for more details.

Build the project:

```sh
pnpm build
```

Preview the project:

```sh
pnpm preview
```

## Docker

You can use Docker to build and run the project.

Create a `.env` file:

```sh
cp .env.example .env
```

Build and run the project:

```sh
docker compose down
docker compose up --build -d
```

Website is available at `3000` port by default (you can change it in the `.env` file).

You can see the logs with:

```sh
docker logs memorandum -f # docker compose logs -f
```

You can find NGINX configuration for your server in [.vitepress/nginx/example.conf](.vitepress/nginx/example.conf).

## License

This project is licensed under the MIT License.

---

For a detailed explanation of how things work, check out [VitePress](https://vitepress.dev/).

[vitepress-version-src]: https://img.shields.io/badge/dynamic/json?label=VitePress&query=devDependencies[%27vitepress%27]&url=https://raw.githubusercontent.com/ewilan-riviere/memorandum/main/package.json&color=28CF8D&logo=vitepress&logoColor=ffffff&labelColor=18181b
[vitepress-version-href]: https://vitepress.dev/
[node-src]: https://img.shields.io/badge/dynamic/json?label=Node.js&query=engines[%27node%27]&url=https://raw.githubusercontent.com/ewilan-riviere/memorandum/main/package.json&color=28CF8D&labelColor=18181b
[node-href]: https://nodejs.org/en
