---
title: Git
description: Useful commands
---

# Git

![elijahmanor.com](https://elijahmanor.com/images/git-branch/git-branch.png)
> Fron elijahmanor.com

## New user

```bash
git config --global user.email "you@example.com"
```

```bash
git config --global user.name "Your Name"
```

## Conflicts with end of file

It's cause of Windows end of file (CRLF) conflict with Linux end of file  (LF), just update global git core

```bash
git config --global core.autocrlf false
```

And re-clone repository

## “Pulling without specifying...”

> “Pulling without specifying how to reconcile divergent branches is discouraged”

```bash
git config --global pull.ff only
```

## Change default editor

Example to change to vim editor

```bash
git config --global core.editor "vim"
```

## Erase a branch with another

Erase a branch with another

```bash
git checkout branch_to_erase
git reset --hard branch_to_keep
```

## Delete branch

```bash
# local
git branch -d branch_to_delete
# on origin remote
git push origin --delete branch_to_delete
```

## Commit changes on other branch

```bash
git stash
git checkout other_branch
git stash pop
```

## Unstage all files

```bash
git reset
```

## Add files and commit

```bash
git commit -am
```

## Pull to overwrite local files

*Source : [stackoverflow.com](https://stackoverflow.com/questions/1125968/how-do-i-force-git-pull-to-overwrite-local-files)*

```bash
git fetch --all
```

Take master branch to overwrite local

```bash
git reset --hard origin/master
```

With another branch

```bash
git reset --hard origin/branch_name
```
