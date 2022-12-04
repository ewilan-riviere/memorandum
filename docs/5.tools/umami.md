---
title: Umami
description: Umami is a simple, fast, website analytics tool for those who care about privacy.
---

## Installation

From <https://umami.is/docs/install>

```bash
npm install -g yarn
```

```bash
git clone https://github.com/umami-software/umami.git
cd umami
yarn install
```

```bash
vim .env
```

```bash title=".env"
DATABASE_URL=mysql://DATABASE_USER:DATABASE_PASSWORD@localhost:3306/DATABASE_NAME
```

```bash
vim /etc/nginx/sites-available/umami.domain.conf
```

```bash title="/etc/nginx/sites-available/umami.domain.conf"
server {
  listen 80;
  server_name umami.domain;

  add_header X-Robots-Tag "noindex, nofollow, nosnippet, noarchive";
  add_header X-Frame-Options SAMEORIGIN;
  add_header X-Content-Type-Options nosniff;
  add_header X-XSS-Protection "1; mode=block";

  charset utf-8;

  error_log /var/log/nginx/umami.log warn;
  access_log /var/log/nginx/umami.log;

  location / {
    include proxy_params;
    proxy_pass http://localhost:3100;
  }
}
```

```bash
ln -s /etc/nginx/sites-available/umami.domain.conf /etc/nginx/sites-enabled/umami.domain.conf
```

```bash
sudo service nginx reload
```

```js title="ecosystem.config.js"
module.exports = {
  apps: [
    {
      name: 'umami',
      script: 'npm',
      cwd: '/home/user/www/umami',
      args: 'start',
      env: {
        PORT: 3100,
      }
    }
  ],
}
```

```bash
pm2 kill ; pm2 start ecosystem.config.js ; pm2 save
```

Go to <https://umami.domain>.

```bash
username: admin
password: umami
```
