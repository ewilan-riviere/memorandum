---
title: Introduction
description: 'Empower your NuxtJS application with @nuxt/content module: write in a content/ directory and fetch your Markdown, JSON, YAML and CSV files through a MongoDB like API, acting as a Git-based Headless CMS.'
position: 1
category: Getting started
features:
  - Full markdown documentation
  - Powered by NuxtJS & nuxt/content
  - Examples, boiler plates, snippets
  - Built to be extensible
  - Blazing fast hot reload in development
  - Vue components in Markdown
  - Full-text search
  - Support static site generation with `nuxt generate`
  - Powerful QueryBuilder API (MongoDB like)
  - Syntax highlighting to code blocks in markdown files using PrismJS.
  - Table of contents generation
  - Handles Markdown, CSV, YAML, JSON(5), XML
  - Extend with custom parsers
  - Extend with hooks
---

<img src="/default.webp" />

I'm Web developer since 2018, I learn a lot about some different languages, frameworks, techs... And I needed to have some place to get more than snippets. I wanted to can write some article about concepts, with boiler plates and explications. But I would to have a beautiful interface and user friendly blocks of codes, easy to copy.

It's not really a documentation or a blog, it's curious mix between two. I update it regulary but I advice you to use information with caution, these can be not up to date.

<content-list :items="features"></content-list>

**Ewilan Rivière**

Empower your NuxtJS application with `@nuxt/content` module: write in a `content/` directory and fetch your Markdown, JSON, YAML, XML and CSV files through a MongoDB like API, acting as a **Git-based Headless CMS**. This is *italic text*.

## Features

<p class="flex items-center">Enjoy light and dark mode:&nbsp;<layout-color-switcher class="inline-flex ml-2"></layout-color-switcher></p>

### Title

Text.

#### Memorandum

Text.

```js
let number = 1
if(number >= 2) {
  //
}
```

##### Link

[github.com/ewilan-riviere/memorandum](https://github.com/ewilan-riviere/memorandum)

> Aute proident sint officia aliquip esse quis qui consectetur cillum duis duis irure incididunt. Ut ea sit nisi mollit quis elit nostrud sunt occaecat mollit. Eu in sint mollit occaecat eiusmod nostrud cillum sunt dolore occaecat. Ea et non aliquip consequat id ea commodo id duis do commodo occaecat.
>
> Text

<img src="/content/icon.png" />

<img src="/default.webp" />

- item 1
- item 2

---

1. item 1
2. item 2

## HTML

<p><span class="note">A mix of <em>Markdown</em> and <em>HTML</em>.</span></p>

## Custom components

<content-movie-info name="Porco Rosso">
  <template #summary>

Porco Rosso (Japanese: 紅の豚, Hepburn: _Kurenai no Buta_, lit. _Crimson Pig_) is a
1992 Japanese animated comedy-adventure film written and directed by
[Hayao Miyazaki]. It is based on _Hikōtei Jidai_ ("The Age of the Flying Boat"), a
three-part 1989 watercolor manga by Miyazaki.

[Hayao Miyazaki]: https://en.wikipedia.org/wiki/Hayao_Miyazaki

  </template>
</content-movie-info>

## Links

<nuxt-link to="/articles">Nuxt Link to Blog</nuxt-link>

<a href="/articles">Html Link to Blog</a>

[Markdown Link to Blog](/articles)

<a href="https://nuxtjs.org">External link html</a>

[External Link markdown](https://nuxtjs.org)

## Codeblocks

```js{1,3-5}[server.js]
const http = require('http')
const bodyParser = require('body-parser')

http.createServer((req, res) => {
  bodyParser.parse(req, (error, body) => {
    res.end(body)
  })
}).listen(3000)
```

## Footnotes

Here is a footnote reference,[^1]
another,[^longnote],
and optionally there are inline
notes.^[you can type them inline, which may be easier, since you don’t
have to pick an identifier and move down to type the note.]

[^1]: Here is the footnote.

[^longnote]: Here’s one with multiple blocks.

    Subsequent paragraphs are indented to show that they
belong to the previous footnote.

        { some.code }

    The whole paragraph can be indented, or just the first
    line.  In this way, multi-paragraph footnotes work like
    multi-paragraph list items.

This paragraph won’t be part of the note, because it
isn’t indented.
