---
title: Installation of Docker
description: Docker installation on Debian
---

# Docker

{{ $frontmatter.description }}

For Debian: <https://docs.docker.com/engine/install/debian/>

## Installation

Requirements

```sh
sudo apt update
sudo apt install -y ca-certificates curl gnupg
```

Add repository

```sh
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Install docker dependencies

```sh
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Enable and start docker

```sh
sudo systemctl enable docker
sudo systemctl start docker
```

Check if docker is running

```sh
sudo systemctl status docker
```

## Cheatsheet

### Docker

- `docker ps`: list containers
- `docker ps -a`: list all containers
- `docker --version`: show version
- `docker images`: list images
- `docker rm [ID]`: remove container
- `docker rmi [ID]`: remove image
- `docker run -it [IMAGE]`: run image
- `docker run -it --rm [IMAGE]`: run image and remove it after exit
- `docker run -it --rm -v [HOST_PATH]:[CONTAINER_PATH] [IMAGE]`: run image and mount volume
- `docker run -it --rm -v [HOST_PATH]:[CONTAINER_PATH] -p [HOST_PORT]:[CONTAINER_PORT] [IMAGE]`: run image and mount volume and expose port

### Docker Compose

- `docker-compose up`: start containers
- `docker-compose up -d`: start containers in background
- `docker-compose down`: stop containers
- `docker-compose down -v`: stop containers and remove volumes
- `docker-compose logs`: show logs
- `docker-compose logs -f`: show logs in real time
- `docker-compose exec [SERVICE] [COMMAND]`: execute command in service
- `docker-compose exec [SERVICE] sh`: execute shell in service
- `docker-compose exec [SERVICE] bash`: execute bash in service
- `docker-compose exec [SERVICE] mysql -u [USER] -p`: execute mysql in service

## Options

### Allow non-root user to run docker

```sh
sudo gpasswd -a $USER docker
newgrp docker
```

### Login to Docker Hub

```sh
sudo docker login
```
