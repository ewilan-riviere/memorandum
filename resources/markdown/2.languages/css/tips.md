---
title: Tips & tricks
description: ''
---

## Flip horizontally / vertically

```css
span {
  display: inline-block;
}
.flip_H {
  transform: scale(-1, 1);
}
.flip_V {
  transform: scale(1, -1);
}
```

```html
<span class="flip_H">
  Demo text &#9986;
</span>
<span class="flip_V">
  Demo text &#9986;
</span>
```

## Image with opacity

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

## Word wraping

```css
.hyphenate {
  text-align: justify !important;
  -webkit-hyphens: auto !important;
  -moz-hyphens: auto !important;
  -ms-hyphens: auto !important;
  hyphens: auto !important;
}
```

For better display

```html
<div class="hyphenate" lang="en">...</div>
```

## Import font

```css
@font-face {
  font-family: "Morpheus";
  src: url("~assets/fonts/morpheus.ttf");
}

.font-morpheus {
  font-family: 'Morpheus';
}
```

## Hyphens

- [**css-tricks.com/almanac/properties/h/hyphenate**](https://css-tricks.com/almanac/properties/h/hyphenate)
- [**medium.com**](https://medium.com/clear-left-thinking/all-you-need-to-know-about-hyphenation-in-css-2baee2d89179)

## Scrollbar

```css
.scrollbar {
  scrollbar-color: rgb(91, 98, 111) transparent;
  scrollbar-width: thin;
}
```
