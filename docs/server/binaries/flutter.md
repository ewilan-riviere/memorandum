---
title: Flutter
description: Flutter is Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.
---

# Flutter

{{ $frontmatter.description }}

[Official documentation](https://docs.flutter.dev/get-started/install)

## IDE

I advice using [Visual Studio Code](https://code.visualstudio.com/) for Flutter development with the [Flutter extension](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter).

## macOS

::: warning For macOS silicon
Some Flutter components require the Rosetta 2 translation process on Macs running Apple silicon. To run all Flutter components on Apple silicon, install Rosetta 2.

```sh
sudo softwareupdate --install-rosetta --agree-to-license
```

:::

### Android Studio

::: info
If you don't need to develop for Android, you can skip this step.
:::

Install with [Homebrew](https://brew.sh/)

```sh
brew install --cask android-studio
```
