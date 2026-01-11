FROM ewilanriviere/alpine-nodejs:v0.3 AS build-stage

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --force --frozen-lockfile

COPY . .
RUN pnpm build

FROM ewilanriviere/nginx-vitepress:v0.3 AS production-stage

COPY --from=build-stage /app/docs/.vitepress/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
