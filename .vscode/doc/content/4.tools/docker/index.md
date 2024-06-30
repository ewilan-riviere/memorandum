---
title: Docker
description: How to use Docker
---

# Docker

- Official: <https://docs.docker.com/engine/install/debian>
- <https://www.it-connect.fr/installation-pas-a-pas-de-docker-sur-debian-11>

## Debian

Install dependencies

```sh
sudo apt-get install apt-transport-https ca-certificates curl gnupg2 software-properties-common
```

Add Docker’s official GPG key

```sh
sudo curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

Add Docker’s stable repository

```sh
sudo echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list
```

Update APT and install Docker

```sh
sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io
```

Add user to `docker` group

```sh
sudo usermod -aG docker $USER
```

Reboot

```sh
sudo reboot
```

Check Docker service

```sh
sudo systemctl status docker
```

## Commands

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

## Dockerfile

```docker
FROM [IMAGE]

RUN [COMMAND]

WORKDIR [PATH]

COPY [HOST_PATH] [CONTAINER_PATH]

CMD [COMMAND]
```

## Docker Compose

- <https://docs.docker.com/compose/install>

```sh
sudo curl -L ""
```

## Commands

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

## Docker Compose file

```yaml
version: "3.9"

services:
  [SERVICE]:
    image: [IMAGE]
    container_name: [NAME]
    restart: [always|no|on-failure]
    ports:
      - "[HOST_PORT]:[CONTAINER_PORT]"
    volumes:
      - "[HOST_PATH]:[CONTAINER_PATH]"
    environment:
      - [KEY]=[VALUE]
    depends_on:
      - [SERVICE]
```
