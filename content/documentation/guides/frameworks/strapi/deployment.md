# Deployment

:::tip GITHUB
- [**github.com/strapi/strapi-starter-nuxt-blog**](https://github.com/strapi/strapi-starter-nuxt-blog)
- [**github.com/strapi/strapi-starter-blog**](https://github.com/strapi/strapi-starter-blog)
:::

- [**strapi.io: documentation/deployment => main doc**](https://strapi.io/documentation/3.0.0-beta.x/getting-started/deployment.html#hosting-provider-guides)
- [**strapi.io: documentation/deployment => DigitalOcean configuration**](https://strapi.io/documentation/3.0.0-beta.x/deployment/digitalocean.html)
- [**strapi.io: documentation/deployment => NGINX configuration**](https://strapi.io/documentation/3.0.0-beta.x/deployment/nginx-proxy.html)
- [**strapi.io: documentation/deployment => another doc**](https://strapi.io/blog/how-to-deploy-a-strapi-application)


<vue-code-info ext="js" path="ecosystem.config.js">

```js
module.exports = {
  apps : [
    {
      name: 'strapi-front',
      script: 'npm',
      cwd: '/var/www/strapi/strapi-front',
      args: 'start',
      env: {
        PORT: 3001
      },
    },
    {
      name: 'strapi-back',
      cwd: '/var/www/strapi/strapi-back',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        DATABASE_HOST: 'strapi-back.localhost', // database endpoint
        DATABASE_PORT: 5432,
        DATABASE_NAME: 'strapi', // DB name
        DATABASE_USERNAME: 'ewilan', // your username for psql
        DATABASE_PASSWORD: 'password', // your password for psql
      },
    },
  ]
};
```
</vue-code-info>

<vue-code-info ext="nginx" path="strapi">

```nginx
server {
  # Listen HTTP
  listen 80;
  server_name strapi-back.localhost;

  # Proxy Config
  location / {
    proxy_pass http://strapi-back.localhost;
    proxy_http_version 1.1;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Server $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $http_host;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_pass_request_headers on;
  }
}

server {
  listen 80;
  server_name strapi.localhost;

  location / {
    include proxy_params;
    proxy_pass http://localhost:3001;
  }
}
```
</vue-code-info>

---

## Links

### Strapi

- <https://strapi.io/blog/strapi-starter-nuxt-blog?utm_content=134788584&utm_medium=social&utm_source=twitter&hss_channel=tw-3832252517>
- <https://strapi.io/documentation/3.0.0-beta.x/getting-started/deployment.html#hosting-provider-guides>
- <https://strapi.io/documentation/3.0.0-beta.x/deployment/nginx-proxy.html>
- <https://strapi.io/blog/how-to-deploy-a-strapi-application>
- <https://strapi.io/documentation/3.0.0-beta.x/deployment/digitalocean.html>


### PostgreSQL

- <https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04>
- <https://stackoverflow.com/questions/22483555/give-all-the-permissions-to-a-user-on-a-db>
- <https://www.guru99.com/postgresql-drop-database.html>
- <https://www.postgresql.org/docs/8.0/sql-createuser.html>
- <https://www.a2hosting.com/kb/developer-corner/postgresql/managing-postgresql-databases-and-users-from-the-command-line>
- <https://www.postgresqltutorial.com/postgresql-show-databases/>

### phpPgAdmin

- <https://www.howtoforge.com/tutorial/ubuntu-postgresql-installation/>
- <https://stackoverflow.com/questions/56642735/how-to-install-postgresql-and-phppgadmin-with-nginx>
- <https://brunobastos.net/how-to-install-phppgadmin-to-work-with-nginx-without-apache/>
