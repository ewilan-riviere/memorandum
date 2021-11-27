---
title: Docker
description: 'Install Docker ron Linux'
position: 6
---

## Install

```bash
sudo apt update
```

<content-code-group>
  <content-code-block label="Ubuntu" active>

  ```bash
  sudo apt install apt-transport-https ca-certificates curl software-properties-common
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
  ```

  </content-code-block>
  <content-code-block label="Debian">

  ```bash
  sudo apt install apt-transport-https ca-certificates curl gnupg2 software-properties-common
  curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
  sudo apt update
  ```

  </content-code-block>
</content-code-group>

```bash
apt-cache policy docker-ce
sudo apt install docker-ce -y
```

## Executing the Docker Command Without Sudo

```bash
sudo usermod -aG docker ${USER}
su - ${USER}
```

```bash
groups
```

```bash
# output
ewilan sudo www-data docker
```

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version
```
