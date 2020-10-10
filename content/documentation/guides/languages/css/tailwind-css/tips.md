# Tips

## Import fonts with Tailwind

From [**tailwindtoolbox.com/guides/adding-fonts-to-tailwind-css**](https://www.tailwindtoolbox.com/guides/adding-fonts-to-tailwind-css)

:::tip
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

<vue-code-info>
