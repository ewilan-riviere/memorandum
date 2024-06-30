---
title: Chromium & Chrome
---

# Chromium & Chrome

## Chromium

```sh
sudo apt install -y chromium-browser
```

## Google Chrome

```sh
sudo sh -c 'echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list'
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo apt-get update
```

```sh
sudo apt install -y google-chrome-stable
```
