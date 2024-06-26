---
title: Git hooks
---

# Git hooks

When repo is updated, you need to execute some commands like `npm install` or `npm build` for example. To do this, you can use **git hooks**, it's script that you can configure when git event triggered. Check `repo/.git/hooks/` directory, it's available on all repositories and not gittable. If you want to execute commands after `git pull`, create a new script and name it `post-merge`.

At the root of repository create new bash script

```bash
vim .git/hooks/post-merge
```

Add commands to build app

```bash [.git/hooks/post-merge]
#!/bin/bash

pnpm i
pnpm build
```

Change rights on this file with this command:

```bash
sudo chmod 775 .git/hooks/post-merge
```

```bash
./.git/hooks/post-merge
```

All commands in this scripts will be executed after *git pull*.
