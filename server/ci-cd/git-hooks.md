---
title: Git hooks
description: Git hooks examples
---

# Git hooks

{{ $frontmatter.description }}

When repo is updated, you need to execute some commands like `npm install` or `composer install` for example. To do this, you can use **git hooks**, it's script that you can configure when git event triggered.

Check `.git/hooks` directory on root of repository, it's available on all repositories. If you want to execute commands after `git pull`, create a new script and name it `post-merge`.

::: warning
Your git hooks, like `.git/hooks/post-merge` won't be pushed, it's only available on your local repository.
:::

## Create post-merge script

At the root of repository create new bash script

```sh
vim .git/hooks/post-merge
```

Add commands to build app (you can add your own commands, this is just an example)

```sh:.git/hooks/post-merge
#!/bin/bash

npm install
npm run build
```

Make your script executable

```sh
sudo chmod +x .git/hooks/post-merge
```

Verify that your script is executable

```sh
./.git/hooks/post-merge
```

All commands in this scripts will be executed after _git pull_.

## Tips

### Save your scripts

You can create a directory into your repository, like `bin`, and save your scripts into it. Then you can call your scripts from `.git/hooks/post-merge`.

```sh
mkdir bin
```

You can add all your commands into a script, like `bin/build.sh`.

```sh:bin/build.sh
#!/bin/bash

npm i
npm run build
```

Then you can call this script from `.git/hooks/post-merge`.

```sh:.git/hooks/post-merge
#!/bin/bash

./bin/build.sh
```

`.git/hooks/post-merge` won't be pushed but `bin/build.sh` will be pushed and you can share it with your team. Just create a new `.git/hooks/post-merge` if you install this repository on a new machine.
