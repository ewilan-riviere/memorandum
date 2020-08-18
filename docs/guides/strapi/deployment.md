# Deployment

- https://strapi.io/blog/strapi-starter-nuxt-blog?utm_content=134788584&utm_medium=social&utm_source=twitter&hss_channel=tw-3832252517

- https://strapi.io/documentation/3.0.0-beta.x/getting-started/deployment.html#hosting-provider-guides
- https://strapi.io/documentation/3.0.0-beta.x/deployment/nginx-proxy.html
- https://strapi.io/blog/how-to-deploy-a-strapi-application
- https://strapi.io/documentation/3.0.0-beta.x/deployment/digitalocean.html

pgsql
- https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04
- https://stackoverflow.com/questions/22483555/give-all-the-permissions-to-a-user-on-a-db
- https://www.guru99.com/postgresql-drop-database.html
- https://www.postgresql.org/docs/8.0/sql-createuser.html
- https://www.a2hosting.com/kb/developer-corner/postgresql/managing-postgresql-databases-and-users-from-the-command-line
- https://www.postgresqltutorial.com/postgresql-show-databases/

phppgadmin
- https://www.howtoforge.com/tutorial/ubuntu-postgresql-installation/
- https://stackoverflow.com/questions/56642735/how-to-install-postgresql-and-phppgadmin-with-nginx
- https://brunobastos.net/how-to-install-phppgadmin-to-work-with-nginx-without-apache/


```js
module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name: 'deploy',
      script: 'index.js',
      cwd: '/home/ewilan/deploy'
    },
    {
        name: 'portfolio',
        script: 'npm',
        cwd: '/home/ewilan/www/portfolio-front',
        args: 'start',
        env: {
            PORT: 3001
        },
    },
    {
        name: 'erotica-back',
        script: 'npm',
        cwd: '/home/ewilan/www/erotica-back',
        args: 'start config/server.js',
        env: {
            PORT: 1337
        },
    },
    {
      name: 'strapi',
      cwd: '/home/ewilan/www/erotica-back',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        DATABASE_HOST: 'localhost', // database endpoint
        DATABASE_PORT: '5432',
        DATABASE_NAME: 'strapi', // DB name
        DATABASE_USERNAME: 'ewilan', // your username for psql
        DATABASE_PASSWORD: 'password', // your password for psql
      },
    },
  ]
};
```
```nginx
server {
    # Listen HTTP
    listen 80;
    server_name erotica.git-project.xyz;

    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
