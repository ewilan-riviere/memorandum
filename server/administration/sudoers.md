---
title: Sudoers
description: Add user to sudoers
---

# Sudoers

{{ $frontmatter.description }}

From <https://linuxize.com/post/how-to-add-user-to-sudoers-in-ubuntu/>

Log in as `root` with `root` password

```sh
su -
```

Add `my-user` to sudoers

::: info
Replace `my-user` with your username.
:::

```sh
visudo
```

Add a new line for `my-user`

```sh:/etc/sudoers
my-user  ALL=(ALL:ALL) ALL
```

Disconnect and reconnect to apply changes

```sh
exit
```

Now you can use sudo with `my-user`

```sh
sudo apt update
```
