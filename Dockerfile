FROM node:20.15.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk add --no-cache git

COPY . /usr/src/app/
RUN rm -rf node_modules
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -
RUN /root/.local/share/pnpm/pnpm install
RUN /root/.local/share/pnpm/pnpm build

EXPOSE 3000

CMD ["/root/.local/share/pnpm/pnpm", "run", "start"]
