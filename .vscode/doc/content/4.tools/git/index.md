---
title: Git
description: Useful commands
---

# Git

![elijahmanor.com](https://elijahmanor.com/images/git-branch/git-branch.png)

> Fron elijahmanor.com

## New user

```sh
git config --global user.email "you@example.com"
```

```sh
git config --global user.name "Your Name"
```

## Conflicts with end of file

It's cause of Windows end of file (CRLF) conflict with Linux end of file (LF), just update global git core

```sh
git config --global core.autocrlf false
```

And re-clone repository

## “Pulling without specifying...”

> “Pulling without specifying how to reconcile divergent branches is discouraged”

```sh
git config --global pull.ff only
```

## Change default editor

Example to change to vim editor

```sh
git config --global core.editor "vim"
```

## Erase a branch with another

Erase a branch with another

```sh
git checkout branch_to_erase
git reset --hard branch_to_keep
```

## Delete branch

```sh
# local
git branch -d branch_to_delete
# on origin remote
git push origin --delete branch_to_delete
```

## Commit changes on other branch

```sh
git stash
git checkout other_branch
git stash pop
```

## Unstage all files

```sh
git reset
```

## Add files and commit

```sh
git commit -am
```

## Pull to overwrite local files

_Source : [stackoverflow.com](https://stackoverflow.com/questions/1125968/how-do-i-force-git-pull-to-overwrite-local-files)_

```sh
git fetch --all
```

Take master branch to overwrite local

```sh
git reset --hard origin/master
```

With another branch

```sh
git reset --hard origin/branch_name
```
