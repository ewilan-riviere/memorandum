---
title: Node.js
description: "Install Node.js and NPM on Windows"
---

# Node.js

::alert{type="warning"}
**scoop is necessary**

> You can manage multiple versions of PHP on same machine with **scoop**, if you don't install it, check this guide: [**scoop**](/os-server/windows/scoop/install)
> ::

Install [**NVM**](https://github.com/coreybutler/nvm-windows)

```sh
scoop install nvm
```

Check all versions

```sh
nvm list available
```

Install the last LTS

```sh
nvm install 18.17.0
```

Use new version

```sh
nvm use 18.17.0
```

## Error npm update

When you try to update npm

```sh
npm i -g npm
```

You will have this error

```sh
npm ERR! code EEXIST
npm ERR! path C:\Users\user\scoop\apps\nvm\current\nodejs\nodejs\npm.cmd
npm ERR! Refusing to delete C:\Users\user\scoop\apps\nvm\current\nodejs\nodejs\npm.cmd: is outside C:\Users\user\scoop\apps\nvm\current\nodejs\nodejs\node_modules\npm and not a link
npm ERR! File exists: C:\Users\user\scoop\apps\nvm\current\nodejs\nodejs\npm.cmd
npm ERR! Remove the existing file and try again, or run npm
npm ERR! with --force to overwrite files recklessly.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\user\AppData\Roaming\npm-cache\_logs\2021-08-16T07_54_44_449Z-debug.log
```

To get latest NPM version from <https://github.com/coreybutler/nvm-windows/issues/300#issuecomment-788810759>

<content-code-group>
  <content-code-block label="NVM scoop" active>

```sh
cd C:\Users\USERNAME\scoop\apps\nvm\current\nodejs\v14.18.0
```

  </content-code-block>
  <content-code-block label="NVM installer">

```sh
cd %APPDATA%\nvm\v14.18.0
```

  </content-code-block>
</content-code-group>

Rename current `npm` cli

```sh
mv npm npm-old
mv npm.cmd npm-old.cmd
mv npx npx-old
mv npx.cmd npx-old.cmd
```

Find current CLI

```sh
cd node_modules\
mv npm npm-old
cd npm-old\bin
```

Install new NPM version

```sh
node npm-cli.js i -g npm@latest
```
