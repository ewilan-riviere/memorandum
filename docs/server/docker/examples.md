---
title: Examples
description: Some Dockerfiles examples
---

# Examples

{{ $frontmatter.description }}

## NPM

```dockerfile
FROM node:22.16.0-alpine

WORKDIR /app

COPY . .

RUN rm -rf node_modules

RUN npm install
RUN npm build

EXPOSE 3000

CMD ["npm", "start"]
```

### pnpm

```dockerfile
FROM node:22.16.0-alpine

WORKDIR /app

COPY . .

RUN npm i -g pnpm

RUN rm -rf node_modules

RUN pnpm install
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
```

### Bun native

```dockerfile
FROM oven/bun:1.2

WORKDIR /app

COPY . .

RUN rm -rf node_modules

RUN bun install
RUN bun bundle

EXPOSE 3000
CMD ["bun", "start"]
```

### Bun with node

```dockerfile
FROM node:22.16.0-alpine

WORKDIR /app

COPY . .

RUN apk add --no-cache curl bash

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
ENV BUN_INSTALL="/root/.bun"
ENV PATH="${BUN_INSTALL}/bin:$PATH"

RUN rm -rf node_modules

RUN bun install
RUN bun bundle

EXPOSE 3000

CMD ["bun", "start"]
```
