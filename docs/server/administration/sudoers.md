---
title: Sudoers
description: Add user to sudoers
---

# Sudoers

{{ $frontmatter.description }}

From <https://linuxize.com/post/how-to-add-user-to-sudoers-in-ubuntu/>

## Connect as root

Log in as `root` with `root` password

```sh
su -
```

## Add `my-user` to sudoers

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

## If `sudo` don't ask for password

### From `/etc/sudoers`

If you see `ALL=(ALL) NOPASSWD:ALL`, replace it:

```diff:/etc/sudoers
-my-user  ALL=(ALL) NOPASSWD:ALL
+my-user  ALL=(ALL) ALL
```

If you see `@includedir /etc/sudoers.d` at the end of the file, check the files in `/etc/sudoers.d/` directory.

### From `/etc/sudoers.d/`

```sh
sudo visudo -f /etc/sudoers.d/90-cloud-init-users
```

If you see `ALL=(ALL) NOPASSWD:ALL`, replace it:

```diff:/etc/sudoers.d/90-cloud-init-users
-my-user  ALL=(ALL) NOPASSWD:ALL
+my-user  ALL=(ALL) ALL
```

::: info For a Raspberry Pi
The file is `/etc/sudoers.d/010_pi-nopasswd`

```sh
sudo visudo -f /etc/sudoers.d/010_pi-nopasswd
```

If you see `ALL=(ALL) NOPASSWD:ALL`, replace it:

```diff:/etc/sudoers.d/010_pi-nopasswd
-my-user  ALL=(ALL) NOPASSWD:ALL
+my-user  ALL=(ALL) ALL
```
:::

### Check `sudo` command

```sh
sudo -k     # Force sudo to ask for password
sudo ls     # Run a command with sudo
```
