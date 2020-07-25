# Translations

## **Get Laravel translations into VueJS**

Use [**tohidplus/laravel-vue-translation**](https://github.com/tohidplus/laravel-vue-translation) PHP package, just add it with **Composer** and publish it:

```bash
composer require tohidplus/laravel-vue-translation

php artisan vendor:publish --provider="Tohidplus\Translation\TranslationServiceProvider"
```

And into the `config/app.php`:

<code-heading type="php" path="config/app.php"></code-heading>

```php
<?php

'providers' => [
    // ...
    Tohidplus\Translation\TranslationServiceProvider::class,
    // ...
];
```

<code-heading type="js" path="resources/js/app.js"></code-heading>

```js
window.Vue = require('vue');

// If you want to add to window object
window.translate = require('./VueTranslation/Translation').default.translate;

// If you want to use it in your vue components
Vue.prototype.translate = require('./VueTranslation/Translation').default.translate;
```

Generation JSON archive with all translations, you will have to execute this after any update of translations (from `resources/lang/`):

```bash
php artisan VueTranslation:generate --watch=1
```

### *Into VueJS component*

<code-heading type="vue" path="/resources/js/components/my-component.vue"></code-heading>

```vue
<template>
    <div>
        {{ translate('titles.home') }}
    </div>
</template>
```