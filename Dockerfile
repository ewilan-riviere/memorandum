FROM ewilanriviere/alpine-nodejs:v0.3

COPY . /app
RUN pnpm install --force && pnpm build

CMD ["pnpm", "run", "start"]
