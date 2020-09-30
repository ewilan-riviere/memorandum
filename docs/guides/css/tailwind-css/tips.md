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

<code-info ext="css" path="~/assets/css/tailwind.css">

```css
@font-face {
  font-family: "DancingScript";
  src: url("../fonts/DancingScript-Medium.ttf");
}
```

</code-info>

Add the font to `theme.fontFamily` to `tailwind.config.js`

<code-info ext="js" path="tailwind.config.js">

```js
module.exports = {
  theme: {
    fontFamily: {
      'dancing-script': ['DancingScript'],
    }
}
```

</code-info>

And you will be able to use `font-dancing-script` auto-generate tailwind class, you can use snippets with [bradlc.vscode-tailwindcss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

<code-info ext="vue" path="pages/index.vue">

```vue
<template>
    <div>
        <h2 class="font-dancing-script">
            My title
        <h2>
    </div>
</template>
```

<code-info>
