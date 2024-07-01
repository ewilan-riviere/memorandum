FROM node:20.15.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# RUN apt update && apt upgrade -y

COPY . /usr/src/app/
RUN rm -rf node_modules
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -
RUN /root/.local/share/pnpm/pnpm install
RUN /root/.local/share/pnpm/pnpm build

# keep running container
# CMD ["tail", "-f", "/dev/null"]

FROM nginx:latest

COPY --from=0 /usr/src/app/. /usr/share/nginx/html

COPY .vitepress/nginx/default.conf /etc/nginx/conf.d/default.conf
