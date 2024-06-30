---
title: Docker
description: Docker installation on Debian
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

For Debian: <https://docs.docker.com/engine/install/debian/>

## Install

Dependencies

```sh
sudo apt update
sudo apt install -y ca-certificates curl gnupg
```

Add key

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

## Allow non-root user to run docker

```sh
sudo gpasswd -a $USER docker
newgrp docker
```

## Login to Docker Hub

```sh
sudo docker login
```

## Troubles

You can try to reboot

```sh
sudo reboot
```
