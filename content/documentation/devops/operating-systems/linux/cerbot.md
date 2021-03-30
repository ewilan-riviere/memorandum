---
title: Cerbot with NGINX
description: 'How to setup Cerbot with NGINX'
position: 5
category: 'Linux'
---

[**Guide from digitalocean.com**](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-debian-10)

```bash
sudo apt install python3-acme python3-certbot python3-mock python3-openssl python3-pkg-resources python3-pyparsing python3-zope.interface
sudo apt install python3-certbot-nginx
sudo ufw status
sudo certbot --nginx
```
