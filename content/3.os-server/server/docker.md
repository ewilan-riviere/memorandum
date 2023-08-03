---
title: Docker
---

# Docker

For Debian: <https://docs.docker.com/engine/install/debian/>

## Install

Dependencies

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
```

Add key

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Install docker dependencies

```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Enable and start docker

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

Check if docker is running

```bash
sudo systemctl status docker
```

## Login to Docker Hub

```bash
sudo docker login
```

## Troubles

You can try to reboot

```bash
sudo reboot
```