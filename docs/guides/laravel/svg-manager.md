# SVG Manager

:::tip

You can easily display SVG file on Laravel without create a specific *blade* file for each SVG, just keep SVG in a defined folder and load it from a method of `helpers.php`. You will need to install **composer** dependency [**oscarotero/inline-svg**](https://github.com/oscarotero/inline-svg).

:::

```bash
composer require oscarotero/inline-svg
```

Create `helpers.php` in `app/` folder

<vue-code-info ext="php" path="app/helpers.php">

```php
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

<vue-code-info ext="json" path="composer.json">
```json
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
</vue-code-info>


You can define SVG folder in `.env` with `SVG_PATH` variable

<vue-code-info ext="env" path=".env">
```js
SVG_PATH="resources/svg"
```
</vue-code-info>

And add any SVG file in this folder, like this one

<vue-code-info ext="svg" path="resources/svg/github.svg">
```html
<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><path d="M250 0C111.875 0 0 111.875 0 250C0 360.625 71.5625 454.063 170.937 487.188C183.437 489.375 188.125 481.875 188.125 475.313C188.125 469.375 187.813 449.688 187.813 428.75C125 440.313 108.75 413.437 103.75 399.375C100.937 392.187 88.75 370 78.125 364.062C69.375 359.375 56.875 347.812 77.8125 347.5C97.5 347.187 111.563 365.625 116.25 373.125C138.75 410.937 174.688 400.313 189.063 393.75C191.25 377.5 197.812 366.562 205 360.312C149.375 354.062 91.25 332.5 91.25 236.875C91.25 209.687 100.938 187.187 116.875 169.687C114.375 163.437 105.625 137.812 119.375 103.437C119.375 103.437 140.313 96.875 188.125 129.063C208.125 123.438 229.375 120.625 250.625 120.625C271.875 120.625 293.125 123.438 313.125 129.063C360.938 96.5625 381.875 103.437 381.875 103.437C395.625 137.812 386.875 163.437 384.375 169.687C400.313 187.187 410 209.375 410 236.875C410 332.812 351.563 354.062 295.938 360.312C305 368.125 312.813 383.125 312.813 406.563C312.813 440 312.5 466.875 312.5 475.313C312.5 481.875 317.188 489.688 329.688 487.188C428.438 454.063 500 360.312 500 250C500 111.875 388.125 0 250 0Z" /></svg>
```
</vue-code-info>

And load SVG directly in any *blade*

<vue-code-info ext="blade" path="resources/views/welcome.blade.php">
```html
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
</vue-code-info>
