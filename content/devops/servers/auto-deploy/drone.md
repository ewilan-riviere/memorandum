---
title: Drone CI
description: 'Auto deploy your work with Drone'
position: 2
category: 'auto-deploy'
---

- <https://www.drone.io>
- <https://github.com/drone-runners/drone-runner-exec>
- <https://linuxize.com/post/how-to-remove-docker-images-containers-volumes-and-networks/>
- setup
  - <https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-drone-on-ubuntu-20-04>
  - <https://www.vultr.com/docs/how-to-install-drone-ci-on-ubuntu-18-04>
  - <https://eriksamuelsson.com/how-to-install-and-configure-drone-ci-on-a-self-hosted-server/>
  - <https://ubuntu.com/blog/continuous-integration-with-juju-and-drone-ci>
  - <https://docs.drone.io/cli/install/>
- provider webhook : <https://docs.drone.io/server/provider/github/>

Docker

- <https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04>
- <https://linuxhint.com/install_configure_docker_ubuntu/>
- <https://grigorkh.medium.com/how-to-install-docker-on-ubuntu-20-04-f1b99845959e>

**You have to get Docker to install Drone, check [this guide](/devops/operating-systems/linux/docker)**

## GitHub OAuth application

Create a new GitHub OAuth application from <https://github.com/settings/developers>, choose **OAuth Apps** and **New OAuth App**. Copy **Client ID** and one **Client secrets**.

- **Homepage URL**: `http://drone.domain.com`
- **Authorization callback URL**: `http://drone.domain.com/login`

## Create docker-compose config

```bash
mkdir ~/www/drone
cd ~/www/drone
vim docker-compose.yml
```

- `GITHUB_CLIENT_ID`: previous GitHub **Client ID**
- `GITHUB_CLIENT_SECRET`: previous GitHub **Client secrets**
- `SECRET_KEY`: generated with `openssl rand -hex 16`, same for `drone-server` and `drone-agent`
- `DRONE_DOMAIN`: like `drone.domain.com`, so you have to create VHost with Apache2 or NGINX
- `GITHUB_USERNAME`: like `ewilan-riviere`

```yml[~/www/drone/docker-compose.yml]
version: '3.7'

services:
  drone:
    container_name: drone
    image: drone/drone:2
    ports:
      - 7777:80
    volumes:
      - /var/lib/drone:/data
      - /var/run/docker.sock:/var/run/docker.sock
    restart: always
    environment:
      - DRONE_GITHUB_SERVER=https://github.com
      - DRONE_GITHUB_CLIENT_ID=GITHUB_CLIENT_ID
      - DRONE_GITHUB_CLIENT_SECRET=GITHUB_CLIENT_SECRET
      - DRONE_AGENTS_ENABLED=true
      - DRONE_RPC_SECRET=SECRET_KEY
      - DRONE_SERVER_HOST=DRONE_DOMAIN
      - DRONE_SERVER_PROTO=https
      - DRONE_TLS_AUTOCERT=true
      - DRONE_USER_CREATE=username:GITHUB_USERNAME,admin:true
      - DRONE_LOGS_TRACE=true
      - DRONE_LOGS_PRETTY=true
      - DRONE_LOGS_COLOR=true

  runner:
    container_name: runner
    image: drone/drone-runner-docker:1
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    restart: always
    environment:
      - DRONE_RPC_HOST=DRONE_DOMAIN
      - DRONE_RPC_SECRET=SECRET_KEY
      - DRONE_RUNNER_CAPACITY=1
      - DRONE_RUNNER_NAME=rocket
      - DRONE_LOGS_TRACE=true
      - DRONE_LOGS_PRETTY=true
      - DRONE_LOGS_COLOR=true
```

## Install `drone-runner-exec`

From <https://docs.drone.io/runner/exec/installation/linux>

```bash
curl -L https://github.com/drone-runners/drone-runner-exec/releases/latest/download/drone_runner_exec_linux_amd64.tar.gz | tar zx
sudo install -t /usr/local/bin drone-runner-exec
```

```bash
mkdir ~/.drone-runner-exec
vim ~/.drone-runner-exec/config
```

- `DRONE_DOMAIN`: same as previous
- `SECRET_KEY`: same as previous
- `USERNAME`: your Linux username

```bash[~/.drone-runner-exec/config]
DRONE_RPC_PROTO=https
DRONE_RPC_HOST=DRONE_DOMAIN
DRONE_RPC_SECRET=SECRET_KEY
DRONE_LOG_FILE=/home/USERNAME/.drone-runner-exec/log.txt
DRONE_HTTP_BIND=7779
```

```bash
sudo drone-runner-exec service install
```

```bash
sudo vim /etc/systemd/system/drone-runner-exec.service
```

- `USERNAME`: your Linux username

```bash[/etc/systemd/system/drone-runner-exec.service]
[Unit]
Description=Drone Exec Runner
ConditionFileIsExecutable=/usr/local/bin/drone-runner-exec

[Service]
User=USERNAME
StartLimitInterval=5
StartLimitBurst=10
ExecStart=/usr/local/bin/drone-runner-exec "service" "run" "--config" "/home/USERNAME/.drone-runner-exec/config"
Restart=always
RestartSec=120
EnvironmentFile=-/etc/sysconfig/drone-runner-exec

[Install]
WantedBy=multi-user.target
```

Start service

```bash
sudo service drone-runner-exec start
```

## Create NGINX Vhost

```bash
sudo vim /etc/nginx/sites-available/drone.domain.com.conf
```

- `DRONE_DOMAIN`: same as previous

```nginx[/etc/nginx/sites-available/drone.domain.com.conf]
server {
  listen 80;
  server_name DRONE_DOMAIN;

  access_log /var/log/nginx/drone.access.log;
  error_log /var/log/nginx/drone.error.log;

  location / {
    include proxy_params;
    proxy_pass http://localhost:7777;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|ico|eot|svg|ttf|woff|woff2)$ {
    include proxy_params;
    proxy_pass http://localhost:7777;
    access_log off;
  }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/drone.domain.com.conf /etc/nginx/sites-enabled 
sudo service nginx restart
```

You can enable HTTPS with certbot

```bash
sudo certbot --nginx
```

## Activate Drone

```bash
cd ~/www/drone
```

```bash
docker-compose pull
docker-compose up -d
```

Now Drone is available on `https://drone.domain.com`

## Install CLI

From <https://github.com/harness/drone-cli>

```bash
curl -L https://github.com/harness/drone-cli/releases/latest/download/drone_linux_amd64.tar.gz | tar zx
sudo install -t /usr/local/bin drone
```

## Feedback

You can install plugin to get feedback after deployment, like [**drone-discord**](https://github.com/appleboy/drone-discord), you will need to install [**Go language**](https://go.dev/) [**check this guide**](/devops/operating-systems/linux/go).

### Discord

If you have a [**Discord server**](https://discord.com/), you can setup a webhook to setup plugin.

1. On your server, go to *Server settings*
2. Choose *Integrations*, select *Webhooks*
3. Create a *new webhook* and *copy webhook URL*

You will have an URL like `https://discord.com/api/webhooks/914189993424064622/gf9Soxdun4B0HAus-af7rT54bwWwpJXpjugTzPSt_fZwMDlzB1OjkuX-tbBfKBGucFxP`

- `914189993424064622`: WEBHOOK_ID
- `gf9Soxdun4B0HAus-af7rT54bwWwpJXpjugTzPSt_fZwMDlzB1OjkuX-tbBfKBGucFxP`: WEBHOOK_TOKEN

Now you can install `drone-discord`

```bash
go install github.com/appleboy/drone-discord@latest
```

Check if command works

```bash
drone-discord
```

If it's works, try to use webhook

```bash
drone-discord \
  --webhook-id WEBHOOK_ID \
  --webhook-token WEBHOOK_TOKEN \
  --message "Test Message"
```

If everythings is works, you will have a new notification on your server.
