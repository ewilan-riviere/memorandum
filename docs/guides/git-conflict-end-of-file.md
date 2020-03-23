# Git

## Git: conflicts with end of file

It's cause of Windows end of file (CRLF) conflict with Linux end of file  (LF), just udpate global git core

```bash
git config --global core.autocrlf false
```

And re-clone repository

## Erase a branch with another

Erase a branch with another

```bash
git checkout branch_to_erase
gir reset --hard branch_to_keep
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

## Cheatsheet

```bash
# unstage all files
git reset
# add all modified files and commit
git commit -am