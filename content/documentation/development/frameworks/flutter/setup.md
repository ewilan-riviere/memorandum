---
title: 'Setup & versions'
description: 'How to setup Flutter'
position: 1
category: 'Flutter'
---

## Linux

TODO link

## Windows

TODO link

## Multiple versions

### Multiple version

- [**github.com/leoafarias/fvm**](https://github.com/leoafarias/fvm): FVM allow you to install multiple Flutter version

You need to have Dart

- For Linux, I offer to add `dart` to `sources.list.d` [**dart.dev/get-dart**](https://dart.dev/get-dart)
- For Windows, I offer to use `scoop` to install `dart` [scoop.sh](https://scoop.sh)

<code-group>
  <code-block label="Linux" active>

  ```bash
  sudo apt-get update ; sudo apt-get install apt-transport-https ; sudo sh -c 'wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -' ; sudo sh -c 'wget -qO- https://storage.googleapis.com/download.dartlang.org/linux/debian/dart_stable.list > /etc/apt/sources.list.d/dart_stable.list' ; sudo apt-get update ; sudo apt-get install dart ; echo 'export PATH="$PATH:/usr/lib/dart/bin"' >> ~/.profile ; source ~/.profile
  ```

  </code-block>
  <code-block label="Windows">

  ```bash
  sudo scoop install dart
  ```

  </code-block>
</code-group>

Install globally `FVM` with `pub`

```bash
pub global activate fvm
```

You need to add FVM path to `.profile` or PATH on Windows and `fvm` will be available (on Windows, you will need to restart your terminal).

<code-group>
  <code-block label="Linux" active>

  ```bash
  echo 'export PATH="$PATH":"$HOME/.pub-cache/bin"' >> ~/.profile ; source ~/.profile
  ```

  </code-block>
  <code-block label="Windows">

  Add `C:\Users\USERNAME\AppData\Local\Pub\Cache\bin` to user `Path` in Windows environement variables.

  ```bash
  TODO
  ```

  </code-block>
</code-group>

List Flutter releases

```bash
fvm releases
```

And install which one

```bash
fvm install 1.22.6
```

List all installed versions

```bash
fvm list
```

On the root of a project

```bash
fvm use 1.22.6 # OR use just 'fvm use' to select manually
```

Use `FVM` like proxy for flutter commands

```bash
fvm flutter run
```
