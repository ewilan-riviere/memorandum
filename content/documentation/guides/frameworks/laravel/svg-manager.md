---
title: SVG manager
description: ''
position: 1
category: 'Laravel'
---

:::tip

You can easily display SVG file on Laravel without create a specific *blade* file for each SVG, just keep SVG in a defined folder and load it from a method of `helpers.php`. You will need to install **composer** dependency [**oscarotero/inline-svg**](https://github.com/oscarotero/inline-svg).

:::

```bash
composer require oscarotero/inline-svg
```

## Basic

Create `helpers.php` in `app/` folder

<vue-code-info ext="php" path="app/helpers.php">

```php[app/helpers.php]
<?php

use InlineSvg\Collection;
use InlineSvg\Transformers\Cleaner;

if (! function_exists('getIcon')) {
  /**
    * Get SVG icon inline with attributes
    *
    * @param string $name name of SVG file
    * @param int $size if SVG is a square, just square length
    * @param string|null $class additionnal class for <svg class="">
    * @param int|null $width width of SVG to overwrite $size if SVG is not square
    * @param int|null $height height of SVG to overwrite $size if SVG is not square
    *
    * @return string $requestedIcon <svg></svg>
    */
  function getIcon(
    string $name,
    int $size = 20,
    string $class = '',
    int $width = null,
    int $height = null
  ) : string {

    $svgPath = base_path($_ENV['SVG_PATH'] ? $_ENV['SVG_PATH'] : 'resources/svg');
    $icons = Collection::fromPath($svgPath);
    $icons->addTransformer(new Cleaner());

    if ($width === null && $height === null) {
        $width = $size;
        $height = $size;
    }

    $requestedIcon = $icons->get($name);
    $requestedIcon = $requestedIcon->withAttributes([
        'width' => $width,
        'height' => $height,
        'class' => $class,
        'style' => 'fill: currentColor',
    ]);
    return $requestedIcon;
  }
}
```

</vue-code-info>

Add `helpers.php` in `autoload.files` in `composer.json`

```json[composer.json]
{
  "name": "...",
  "require": {
    // ...
    "oscarotero/inline-svg": "^2.0"
  },
  "autoload": {
    "files": [
      "app/helpers.php"
    ]
  }
}
```

You can define SVG folder in `.env` with `SVG_PATH` variable

```js[.env]
SVG_PATH="resources/svg"
```

And add any SVG file in this folder, like this one

```html[resources/svg/github.svg]
<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
  <path d="M250 0C111.875 0 0 111.875 0 250C0 360.625 71.5625 454.063 170.937 487.188C183.437 489.375 188.125 481.875 188.125 475.313C188.125 469.375 187.813 449.688 187.813 428.75C125 440.313 108.75 413.437 103.75 399.375C100.937 392.187 88.75 370 78.125 364.062C69.375 359.375 56.875 347.812 77.8125 347.5C97.5 347.187 111.563 365.625 116.25 373.125C138.75 410.937 174.688 400.313 189.063 393.75C191.25 377.5 197.812 366.562 205 360.312C149.375 354.062 91.25 332.5 91.25 236.875C91.25 209.687 100.938 187.187 116.875 169.687C114.375 163.437 105.625 137.812 119.375 103.437C119.375 103.437 140.313 96.875 188.125 129.063C208.125 123.438 229.375 120.625 250.625 120.625C271.875 120.625 293.125 123.438 313.125 129.063C360.938 96.5625 381.875 103.437 381.875 103.437C395.625 137.812 386.875 163.437 384.375 169.687C400.313 187.187 410 209.375 410 236.875C410 332.812 351.563 354.062 295.938 360.312C305 368.125 312.813 383.125 312.813 406.563C312.813 440 312.5 466.875 312.5 475.313C312.5 481.875 317.188 489.688 329.688 487.188C428.438 454.063 500 360.312 500 250C500 111.875 388.125 0 250 0Z" />
</svg>
```

And load SVG directly in any *blade*

```html[resources/views/welcome.blade.php]
<style>
.my-auto {
  margin: auto 0;
}
.text-blue {
  color: blue;
}
</style>

<span class="my-auto text-blue">
  {!! getIcon('github', 50) !!}
</span>
```

## With Livewire (Laravel Jetstream)

If you use recent Laravel app, like v8.0, you can add [**Jetstream**](https://jetstream.laravel.com), a scaffolding for Laravel.

> Laravel Jetstream is a beautifully designed application scaffolding for Laravel. Jetstream provides the perfect starting point for your next Laravel application and includes login, registration, email verification, two-factor authentication, session management, API support via [Laravel Sanctum](https://github.com/laravel/sanctum) , and optional team management.

When you install Jetsteam, you can choose between two options : [**Livewire**](https://laravel-livewire.com/) or [**Inertia**](https://inertiajs.com/). The aim of this guide is to manage SVG with PHP files and Inertia use Vue files, so this part is about manage SVG with Livewire which allow you to create components into Blade files.

Create Livewire `icon` component

```bash
php artisan make:livewire icon
```

This command will create a new file: `app/Http/Livewire/Icon.php`, you can add this content

```php[app/Http/Livewire/Icon.php]
<?php

namespace App\Http\Livewire;

use Livewire\Component;
use InlineSvg\Collection;
use InlineSvg\Transformers\Cleaner;

class Icon extends Component
{
  public string $name;
  public ?int $size = 20;
  public ?string $class = '';
  public ?int $width = null;
  public ?int $height = null;
  public string $icon;

  public function render()
  {
    $svgPath = base_path($_ENV['SVG_PATH'] ? $_ENV['SVG_PATH'] : 'resources/svg');
    $icons = Collection::fromPath($svgPath);
    $icons->addTransformer(new Cleaner());

    if ($this->width === null && $this->height === null) {
      $width = $this->size;
      $height = $this->size;
    } else {
      $width = $this->width;
      $height = $this->height;
    }

    $icon = $icons->get($this->name);
    $icon = $icon->withAttributes([
      'width' => $width,
      'height' => $height,
      'class' => $this->class,
      'style' => 'fill: currentColor',
    ]);

    $this->icon = $icon;

    return view('livewire.icon');
  }
}
```

You can define SVG folder in `.env` with `SVG_PATH` variable

```js[.env]
SVG_PATH="resources/svg"
```

Add new SVG icon into `resources/svg` like `laravel.svg`

```html[resources/svg/laravel.svg]
<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
  <path d="M492.583 113.125C492.77 113.792 492.874 114.479 492.874 115.188V222.479C492.874 225.292 491.354 227.896 488.937 229.271L398.874 281.146V383.938C398.874 386.75 397.374 389.313 394.958 390.729L206.895 498.959C206.458 499.209 205.999 499.375 205.52 499.521C205.354 499.563 205.187 499.688 205.02 499.729C203.708 500.104 202.312 500.104 201.02 499.729C200.791 499.688 200.604 499.563 200.416 499.479C199.979 499.313 199.52 499.188 199.104 498.959L11.1244 390.729C8.68689 389.313 7.18689 386.75 7.18689 383.938V61.9585C7.18689 61.271 7.29106 60.5835 7.47856 59.9168C7.54106 59.6668 7.68689 59.4793 7.77022 59.2501C7.89522 58.8335 8.06189 58.4168 8.24939 58.0418C8.33272 57.771 8.56189 57.5835 8.72856 57.3543C8.97856 57.021 9.16606 56.7085 9.41606 56.4168C9.66606 56.2085 9.93689 56.0418 10.1869 55.8543C10.4786 55.6043 10.7494 55.3543 11.0411 55.146H11.0619L105.083 1.04178C107.479 -0.354055 110.479 -0.354055 112.895 1.04178L206.895 55.146H206.937C207.249 55.3543 207.499 55.5835 207.791 55.8335C208.041 56.021 208.312 56.2085 208.562 56.396C208.833 56.6876 208.999 57.0001 209.249 57.3335C209.416 57.5626 209.666 57.771 209.77 58.021C209.999 58.4168 210.124 58.8126 210.27 59.2293C210.333 59.4585 210.499 59.6668 210.541 59.896C210.749 60.5418 210.833 61.2293 210.833 61.9376V263.021L289.166 217.938V115.146C289.166 114.458 289.27 113.771 289.458 113.104C289.52 112.875 289.645 112.667 289.729 112.438C289.874 112.021 290.02 111.625 290.229 111.208C290.374 110.958 290.604 110.771 290.749 110.521C290.999 110.208 291.187 109.896 291.437 109.625C291.687 109.375 291.958 109.208 292.208 109.042C292.499 108.813 292.749 108.563 293.062 108.375H293.083L387.104 54.2501C389.52 52.8543 392.499 52.8543 394.916 54.2501L488.937 108.375C489.27 108.583 489.499 108.813 489.812 109.021C490.062 109.229 490.333 109.396 490.562 109.604C490.833 109.896 491.02 110.208 491.27 110.521C491.437 110.771 491.666 110.958 491.77 111.208C491.999 111.625 492.145 112.021 492.27 112.438C492.395 112.667 492.52 112.896 492.583 113.125ZM477.166 217.958V128.729L444.291 147.646L398.833 173.813V263.042L477.166 217.958V217.958ZM383.187 379.417V290.104L338.479 315.625L210.833 388.5V478.625L383.187 379.417ZM22.8119 75.5001V379.417L195.166 478.625V388.5L105.124 337.563L105.083 337.5H105.041C104.749 337.292 104.52 337.063 104.208 336.854C103.979 336.646 103.708 336.479 103.479 336.292L103.458 336.25C103.187 336 103.02 335.729 102.812 335.438C102.604 335.188 102.374 334.958 102.229 334.667H102.187C102.02 334.375 101.916 334.021 101.77 333.688C101.645 333.354 101.479 333.125 101.395 332.792C101.312 332.417 101.27 332.021 101.229 331.604C101.187 331.313 101.104 331.042 101.104 330.75V120.604L55.6869 94.4168L22.8119 75.5001V75.5001ZM108.979 16.8751L30.6452 61.9585L108.979 107.042L187.27 61.9585L108.979 16.8751ZM149.729 298.229L195.187 272.063V75.5001L162.27 94.4376L116.812 120.604V317.167L149.729 298.229V298.229ZM391.02 70.0835L312.687 115.167L391.02 160.229L469.333 115.146L391.02 70.0835V70.0835ZM383.187 173.813L337.729 147.646L304.833 128.729V217.958L350.291 244.125L383.187 263.042V173.813ZM202.979 374.938L317.854 309.354L375.27 276.604L296.999 231.542L206.916 283.396L124.812 330.688L202.979 374.938V374.938Z" />
</svg>
```

You will find another file into `resources/views/livewire`: `icon.blade.php`

```php[resources/views/livewire/icon.blade.php]
<span class="{{ $class }}">
  {!! $icon !!}
</span>
```

And now, you can call your `icon` component into any `blade` file and pass parameter with HTML attributes, like Vue files !  

In this example, I use Tailwind CSS framework for design.

```php[resources/views/welcome.blade.php]
<div>
  <livewire:icon name="laravel" :size="60" class="my-auto text-red-500">
</div>
```
