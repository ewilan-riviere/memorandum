---
title: Vitepress
description: Notes on Vitepress
---

# Vitepress

{{ $frontmatter.description }}

Memorandum uses [Vitepress](https://vitepress.dev/) to generate the site. This page contains notes on how to use Vitepress.

From [official Vitepress documentation](https://vitepress.dev/guide/markdown).

## Filename

Add a filename to the code block to specify the language.

**Input**

````
```js:example.js
console.log("Hello, VitePress!");
```
````

**Output**

```js:example.js
console.log("Hello, VitePress!");
```

## Code Groups

You can group multiple code blocks like this:

**Input**

````md
::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
};

export default config;
```

```ts [config.ts]
import type { UserConfig } from "vitepress";

const config: UserConfig = {
  // ...
};

export default config;
```

:::
````

**Output**

::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
};

export default config;
```

```ts [config.ts]
import type { UserConfig } from "vitepress";

const config: UserConfig = {
  // ...
};

export default config;
```

:::

## Footnotes

You can add footnotes to your markdown files

```md
Footnote 1 link[^first].

[^first]: Footnote can reference [^second].
[^second]: Other footnote.
```

Footnote 1 link[^first].

[^first]: Footnote can reference [^second].
[^second]: Other footnote.

## Colored Diffs in Code Blocks

Adding the `// [!code --]` or `// [!code ++]` comments on a line will create a diff of that line, while keeping the colors of the codeblock.

**Input**

````
```js
export default {
  data () {
    return {
      msg: 'Removed' // [!!code --] (replace `!!` with `!`)
      msg: 'Added' // [!!code ++] (replace `!!` with `!`)
    }
  }
}
```
````

**Output**

```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added' // [!code ++]
    }
  }
}
```

## Errors and Warnings in Code Blocks

Adding the `// [!code warning]` or `// [!code error]` comments on a line will color it accordingly.

**Input**

````
```js
export default {
  data () {
    return {
      msg: 'Error', // [!!code error] (replace `!!` with `!`)
      msg: 'Warning' // [!!code warning] (replace `!!` with `!`)
    }
  }
}
```
````

**Output**

```js
export default {
  data() {
    return {
      msg: "Error", // [!code error]
      msg: "Warning", // [!code warning]
    };
  },
};
```

## Line Numbers

You can enable line numbers for each code blocks via config:

```js
export default {
  markdown: {
    lineNumbers: true,
  },
};
```

Please see [`markdown` options](https://vitepress.dev/reference/site-config#markdown) for more details.

You can add `:line-numbers` / `:no-line-numbers` mark in your fenced code blocks to override the value set in config.

You can also customize the starting line number by adding `=` after `:line-numbers`. For example, `:line-numbers=2` means the line numbers in code blocks will start from `2`.

**Input**

````md
```ts {1}
// line-numbers is disabled by default
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts:line-numbers {1}
// line-numbers is enabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers=2 {1}
// line-numbers is enabled and start from 2
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```
````

**Output**

```ts {1}
// line-numbers is disabled by default
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts:line-numbers {1}
// line-numbers is enabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers=2 {1}
// line-numbers is enabled and start from 2
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```

## Custom Containers

Custom containers can be defined by their types, titles, and contents.

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

### Custom Title

You may set custom title by appending the text right after the "type" of the container.

**Input**

````md
::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code

```js
console.log("Hello, VitePress!");
```

:::
````

**Output**

::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code

```js
console.log("Hello, VitePress!");
```

:::

## Line Highlighting in Code Blocks

**Input**

````
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

In addition to a single line, you can also specify multiple single lines, ranges, or both:

- Line ranges: for example `{5-8}`, `{3-10}`, `{10-17}`
- Multiple single lines: for example `{4,7,9}`
- Line ranges and single lines: for example `{4,7-13,16,23-27,40}`

**Input**

````
```js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum'
    }
  }
}
```
````

**Output**

```js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```

Alternatively, it's possible to highlight directly in the line by using the `// [!code highlight]` comment.

**Input**

````
```js
export default {
  data () {
    return {
      msg: 'Highlighted!' // [!!code highlight]
    }
  }
}
```
````

**Output**

```js
export default {
  data() {
    return {
      msg: "Highlighted!", // [!code highlight]
    };
  },
};
```

## Import Code Snippets

You can import code snippets from existing files via following syntax:

```md
<<< @/filepath
```

It also supports [line highlighting](#line-highlighting-in-code-blocks):

```md
<<< @/filepath{highlightLines}
```

**Input**

```md
<<< @/snippets/snippet.js{2}
```

**Code file**

<<< @/snippets/snippet.js

**Output**

<<< @/snippets/snippet.js{2}

::: tip
The value of `@` corresponds to the source root. By default it's the VitePress project root, unless `srcDir` is configured. Alternatively, you can also import from relative paths:

```md
<<< ../snippets/snippet.js
```

:::

## Markdown File Inclusion

You can include a markdown file in another markdown file, even nested.

::: tip
You can also prefix the markdown path with `@`, it will act as the source root. By default, it's the VitePress project root, unless `srcDir` is configured.
:::

For example, you can include a relative markdown file using this:

**Input**

```md
# Docs

## Basics

<!--@include: ./parts/basics.md-->
```

**Part file** (`parts/basics.md`)

```md
Some getting started stuff.

### Configuration

Can be created using `.foorc.json`.
```

**Equivalent code**

```md
# Docs

## Basics

Some getting started stuff.

### Configuration

Can be created using `.foorc.json`.
```

It also supports selecting a line range:

**Input**

```md
# Docs

## Basics

<!--@include: ./parts/basics.md{3,}-->
```

**Part file** (`parts/basics.md`)

```md
Some getting started stuff.

### Configuration

Can be created using `.foorc.json`.
```

**Equivalent code**

```md
# Docs

## Basics

### Configuration

Can be created using `.foorc.json`.
```

The format of the selected line range can be: `{3,}`, `{,10}`, `{1,10}`

::: warning
Note that this does not throw errors if your file is not present. Hence, when using this feature make sure that the contents are being rendered as expected.
:::

## Emoji :tada:

**Input**

```
:tada: :100:
```

**Output**

:tada: :100:

A [list of all emojis](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs) is available.

## Advanced Configuration

VitePress uses [markdown-it](https://github.com/markdown-it/markdown-it) as the Markdown renderer. A lot of the extensions above are implemented via custom plugins. You can further customize the `markdown-it` instance using the `markdown` option in `.vitepress/config.js`:

```js
import { defineConfig } from "vitepress";
import markdownItAnchor from "markdown-it-anchor";
import markdownItFoo from "markdown-it-foo";

export default defineConfig({
  markdown: {
    // options for markdown-it-anchor
    // https://github.com/valeriangalliat/markdown-it-anchor#usage
    anchor: {
      permalink: markdownItAnchor.permalink.headerLink(),
    },

    // options for @mdit-vue/plugin-toc
    // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
    toc: { level: [1, 2] },

    config: (md) => {
      // use more markdown-it plugins!
      md.use(markdownItFoo);
    },
  },
});
```

See full list of configurable properties in [Config Reference: App Config](https://vitepress.dev/reference/site-config#markdown).
