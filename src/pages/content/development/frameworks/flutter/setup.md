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

- [**github.com/leoafarias/fvm**](https://github.com/leoafarias/fvm): FVM allow you to install multiple Flutter version

You need to have Dart

- For Linux, I offer to add `dart` to `sources.list.d` [**dart.dev/get-dart**](https://dart.dev/get-dart)
- For Windows, I offer to use `scoop` to install `dart` [scoop.sh](https://scoop.sh)

<content-code-group>
  <content-code-block label="Linux" active>

  ```bash
  sudo apt-get update ; sudo apt-get install apt-transport-https ; sudo sh -c 'wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -' ; sudo sh -c 'wget -qO- https://storage.googleapis.com/download.dartlang.org/linux/debian/dart_stable.list > /etc/apt/sources.list.d/dart_stable.list' ; sudo apt-get update ; sudo apt-get install dart ; echo 'export PATH="$PATH:/usr/lib/dart/bin"' >> ~/.profile ; source ~/.profile
  ```

  </content-code-block>
  <content-code-block label="Windows">

  ```bash
  sudo scoop install dart
  ```

  </content-code-block>
</content-code-group>

Install globally `FVM` with `pub`

```bash
pub global activate fvm
```

You need to add FVM path to `.profile` or PATH on Windows and `fvm` will be available (on Windows, you will need to restart your terminal).

<content-code-group>
  <content-code-block label="Linux" active>

  ```bash
  echo 'export PATH="$PATH":"$HOME/.pub-cache/bin"' >> ~/.profile ; source ~/.profile
  ```

  </content-code-block>
  <content-code-block label="Windows">

  ```bash
  # This PowerShell command will add `C:\Users\USERNAME\AppData\Local\Pub\Cache\bin` to user `Path` in Windows environement variables. You have to restart your current terminal.
  $INCLUDE = "C:\Users\$env:UserName\AppData\Local\Pub\Cache\bin" ; $OLDPATH = [System.Environment]::GetEnvironmentVariable('PATH','user') ; $NEWPATH = "$OLDPATH;$INCLUDE" ; [Environment]::SetEnvironmentVariable("PATH", "$NEWPATH", "user")
  ```

  </content-code-block>
</content-code-group>

### List Flutter releases

```bash
fvm releases
```

### Install any version

```bash
fvm install 1.22.6
```

### List all installed versions

```bash
fvm list
```

On the root of a project, execute `fvm use` to setup FVM Flutter version, this will create `.fvm` directory on the root of project and any `fvm` command will use version setup (if you install it).

```bash
fvm use 1.22.6 # OR use just 'fvm use' to select manually
```

### Example of `fvm_config.json`

```json[.fvm/fvm_config.json]
{
  "flutterSdkVersion": "1.22.6"
}
```

Use `FVM` like proxy for flutter commands

```bash
fvm flutter run
```
