---
title: Tips & tricks
description: 'Tips for Tailwind'
position: 2
category: 'Tailwind CSS'
---

## Import fonts with Tailwind

From [**tailwindtoolbox.com/guides/adding-fonts-to-tailwind-css**](https://www.tailwindtoolbox.com/guides/adding-fonts-to-tailwind-css)

:::tip Visual Studio Code
Here, I use Visual Studio Code with extension [bradlc.vscode-tailwindcss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss). The example use NuxtJS application but it's works with anything.
:::

```
assets/
    - fonts/
        - DancingScript-Medium.ttf
    - css/
        - tailwind.css
pages/
    - index.vue
tailwind.config.js
```

Add font with `@font-face` to your `tailwind.css` for example

<vue-code-info ext="css" path="~/assets/css/tailwind.css">

```css
@font-face {
    font-family: "DancingScript";
    src: url("../fonts/DancingScript-Medium.ttf");
}
```

</vue-code-info>

Add the font to `theme.fontFamily` to `tailwind.config.js`

<vue-code-info ext="js" path="tailwind.config.js">

```js
module.exports = {
    theme: {
        fontFamily: {
            'dancing-script': ['DancingScript'],
        }
    }
}
```

</vue-code-info>

And you will be able to use `font-dancing-script` auto-generate tailwind class, you can use snippets with [bradlc.vscode-tailwindcss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

<vue-code-info ext="vue" path="pages/index.vue">

```vue
<template>
    <div>
        <h2 class="font-dancing-script">
            My title
        <h2>
    </div>
</template>
```

</vue-code-info>

## Center horizontally & vertically

```html
<div class="absolute transform -translate-y-1/2 top-1/2">
    Element to center
</div>
```

## Image with opacity

<text-on-image type="classic" />

```html
<div class="block-image-container">
  <div class="block-image">
    <div class="block-image-src">
      <img src="/images/css-tips/thymara.jpg" />
      <div class="block-image-text">
        It's too hot to work.
      </div>
    </div>
  </div>
</div>
```

```css
.block-image-container .block-image {
  position: relative;
  width: 100%;
}
.block-image-container .block-image-src {
  z-index: -1;
}
.block-image-src img {
  height: 16rem;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
.block-image-src::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0.2rem;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 100%;
  background: rgba(black, 0.5);
}
.block-image-container .block-image-text {
  z-index: 10;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  font-style: italic;
  font-size: 2rem;
}
```

<text-on-image type="tailwind" />

```html
<div class="text-on-img-tailwind">
  <div class="relative w-full">
    <div class="source" style="z-index: -1;">
      <img
        src="/images/css-tips/amd-ryzen.jpg"
        class="object-cover object-center w-full h-64"
      />
      <div
        class="absolute z-10 w-full text-2xl italic text-center text-white"
        style="top: 50%; left: 50%; transform: translate(-50%, -50%);"
      >
        Powerfull. Simplicity. Efficiency.
        <br />
        AMD.
      </div>
    </div>
  </div>
</div>
```

```css
.text-on-img-tailwind .source::after {
  @apply absolute top-0 bottom-0 left-0 right-0 w-full max-w-full bg-black bg-opacity-75;
  content: '';
}
```

## Link with elegant user feedback

```html
<div>
  <a href="http://www.google.fr/" class="link-yellow">
    Google
  </a>
</div>
```

```scss
.link-yellow {
    display: inline-block;
    text-decoration: none !important;
    background-image: linear-gradient(to right, orange, orange);
    background-position: 0% 85%;
    background-repeat: no-repeat;
    background-size: 0% 2px;
    transition: background-size .5s, color .5s;

    &:hover {
        color: black;
        background-size: 100% 2px;
    }
}
```

## `semi-colon expected`

Common error with Vetur with **@apply** Tailwind directive. Usse `postcss` as attribute to avoid this error.

```html
<style lang="postcss">

</style>
```

## Plugins

For v2.0 with [this guide](https://tailwindui.com/changes-for-v2#updating-your-tailwind-ui-projects)

```bash
yarn add @tailwindcss/forms @tailwindcss/typography @tailwindcss/aspect-ratio
```
