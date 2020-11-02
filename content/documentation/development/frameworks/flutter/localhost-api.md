---
title: Communication with localhost API
description: ''
position: 4
category: 'Flutter'
---

Flutter cannot communication directly with a Vhost, the app need a online API, like <https://jsonplaceholder.typicode.com> and **NOT** <http://laravel-app.localhost> (a supposed Vhost with NGINX or Apache2 for example). To communicate with localhost API, you need to use tunnelling service like **ngrok** or **expose**.

## ngrok

To use API with Flutter app, you can't directly use localhost VHost, it's necessary to use [**ngrok**](https://ngrok.com) (you need to create free account to get auth token).

1 - Install **ngrok**

**ngrok** on Linux : [github.com/inconshreveable/ngrok/issues/447](https://github.com/inconshreveable/ngrok/issues/447)

<code-group>
  <code-block label="Linux" active>

  ```bash
  # TODO
  ```

  </code-block>
  <code-block label="Windows">

  ```bash
  scoop install ngrok
  ```

  </code-block>
</code-group>

Save token just once after install (to have it, you need to create an account and check your dashboard : [**dashboard.ngrok.com/auth/your-authtoken**](https://dashboard.ngrok.com/auth/your-authtoken))

```bash
ngrok authtoken random_token
```

2 - Execute serve on your back-end application

### Example for a Laravel application

```bash
php artisan serve
```

To get default http://127.0.0.1:8000

The application is available on port `8000`

3 - And, in another tab, execute **ngrok**

If the application is available on port `8000`, execute below command (change port if it's necessary)

```bash
ngrok http 8000
```

4 - You will have output like

```bash
Forwarding                    http://random-generated-key.ngrok.io -> http://localhost:8000
```

---

## Expose

Official documentation: [**beyondco.de/docs/expose/introduction**](https://beyondco.de/docs/expose/introduction)

Install expose globbaly with `composer`

```bash
composer global require beyondcode/expose
```

Expose your Vhost, here `laravel-app.localhost` is the hypothetical Vhost

```bash
expose share laravel-app.localhost
```

You will have this output

```bash
Local-URL:              laravel-app.localhost
Dashboard-URL:          http://127.0.0.1:4040
Expose-URL:             https://random-key.sharedwithexpose.com
```

And you can connect your app to https://random-key.sharedwithexpose.com
