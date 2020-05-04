# Yarn

## Yarn errors with prod

If you works on **Windows** on *local* and you've a **Linux** *prod*, when you execute `yarn`, `yarn.lock` will change on *prod*. It's cause by differences between **Windows** and **Linux**. You can copy `yarn.lock` from *prod* with `scp` command to your *local* and you won't have any other problems with **yarn**.