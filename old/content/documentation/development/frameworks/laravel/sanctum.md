---
title: Sanctum
description: 'How to configure Sanctum'
position: 5
category: 'Laravel'
---

## Laravel Sanctum setup

- <https://github.com/laravel/sanctum>
- <https://github.com/laravel/breeze>
- <https://github.com/laravel/jetstream>

```json
{
  "require": {
    "laravel/framework": "^8.12",
    "laravel/sanctum": "2.9"
  }
}
```

```yml
SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost
```

```yml
SANCTUM_STATEFUL_DOMAINS=www.my-domain.com
SESSION_DOMAIN=.my-domain.com
```

```php
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/private', [PrivateController::class, 'index'])->name('private.index');
});
```

```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'register', 'home', 'user', 'dashboard'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => false,

    'supports_credentials' => true,
];
```

```php
<?php

return [
    // ...

    'features' => [
        Features::registration(),
        Features::resetPasswords(),
        Features::emailVerification(),
        Features::updateProfileInformation(),
        Features::updatePasswords(),
        Features::twoFactorAuthentication([
            'confirmPassword' => true,
        ]),
    ],
];
```

```php
<?php

// Add below line
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

class Kernel extends HttpKernel
{

    /**
     * The application's route middleware groups.
     *
     * @var array
     */
    protected $middlewareGroups = [
        // ...

        'api' => [
            // Add below line
            EnsureFrontendRequestsAreStateful::class,
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];
}
```

## SPA

### Nuxt.js

- <https://auth.nuxtjs.org>
- <https://github.com/nuxt-community/dotenv-module>

```json
{
  "dependencies": {
    "@nuxtjs/auth-next": "5.0.0-1612791489.a5d8c28",
    "@nuxtjs/axios": "^5.13.1",
  }
}
```

```js
export default {
  // ...
  
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  axios: {
    baseURL: process.env.API_URL,
    credentials: true,
    https: false,
    headers: {
      common: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    },
  },

  proxy: {
    '/api': {
      target: `${process.env.API_URL}/api`,
      pathRewrite: { '^/api': '/' },
    },
  },

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.API_URL,
      },
    },
    redirect: {
      login: '/sign-in',
      logout: '/sign-in',
      callback: '/',
      home: '/dashboard',
    },
    cookie: {
      options: {
        sameSite: 'lax',
      },
    },
  },
}
```

```yml
PORT=3000
HOST=localhost
BASE_URL=http://localhost:3000
API_URL=http://localhost:8000
```

```yml
PORT=3005
HOST=127.0.0.1
BASE_URL=https://www.my-domain.com
API_URL=https://www.my-domain.com
```

```vue
<template>
  <form @submit.prevent="submit">
    <div>
      <label for="email"> Email address </label>
      <input
        id="email"
        v-model="form.email"
        name="email"
        type="email"
        required
      />
    </div>

    <div>
      <label for="password"> Password </label>
      <input
        id="password"
        v-model="form.password"
        name="password"
        type="password"
        required
      />
    </div>

    <button type="submit">Sign in</button>
  </form>
</template>

<script>
export default {
  name: 'PageSignin',
  auth: 'guest',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async submit() {
      try {
        await this.$auth.loginWith('laravelSanctum', {
          data: this.form,
        })
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
```

```vue
<template>
    <div>
        <h1>Dashboard</h1>
        <button @click="logout">Sign out</button>
        <div>
            {{ private }}
        </div>
    </div>
</template>

<script>
export default {
  name: 'PageDashboard',
  middleware: 'auth',
  async asyncData({ app, query, error, params, $content, $auth, store }) {
    try {
      const [private] = await Promise.all([app.$axios.$get(`/api/private`)])

      return {
        private,
      }
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
```
