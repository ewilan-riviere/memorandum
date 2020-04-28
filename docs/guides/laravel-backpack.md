# Laravel: Backpack

## Create new Model

- Create **migration** (in case you're starting from scratch)
```bash
php artisan make:migration:schema create_tags_table --model=0 --schema="name:string:unique"
php artisan migrate
```

- Create a **Model** with **Request** and **Controller** for the admin panel
```bash
php artisan backpack:crud tag
```

- Add a **route** for this admin panel to `routes/backpack/custom.php`
```bash
php artisan backpack:add-custom-route "Route::crud('tag', 'TagCrudController');"
```

## Backpack errors

When you install **Backpack** with **Laravel elfinder***.

:::tip
Laravel elfinder is a file manager you can use in Backpack and it's heavy. If you want it, just answer `yes` to this question: `Install barryvdh/laravel-elfinder to provide an admin interface for File Management? (yes/no) [no]:` when you execute the below command.
:::

```bash
php artisan backpack:install
```

You can have this output error:

<code-heading type="sh-output"></code-heading>

```bash
Symfony\Component\Process\Exception\ProcessTimedOutException  : The process "composer require barryvdh/laravel-elfinder" exceeded the timeout of 300 seconds.
```

It's just composer error because installation take too time (cause of **elfinder**), you can up max tim for composer installation to avoid this error.

```bash
composer config --global process-timeout 2000
```
