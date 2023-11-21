---
title: SSH
description: Generate and manage SSH keys
---

## SSH

### Generate

From [Create ed25519 key](https://github.com/kirkmicz/Cheat-Sheet/blob/master/Linux%20&%20Unix/Create%20ed25519%20key.md)

::code-group
  ```bash [ed25519]
  ssh-keygen -t ed25519 -b 4096 -C "user@mail"
  ```
  ```bash [ed25519 (no mail)]
  ssh-keygen -t ed25519
  ```
  ```bash [rsa]
  ssh-keygen -t rsa -b 2048
  ```
::

### Add to server

Connect to your remote server and add your public key to `~/.ssh/authorized_keys`.

```bash
vim ~/.ssh/authorized_keys
```

```sh [~/.ssh/authorized_keys]
ssh-ed25519 AAAAC3Nza...
```

And add your `id_ed25519.pub` or `id_rsa.pub`.

Exit your remote server and try SSH connection.

### Usage

::alert{type="info"}
To find your IP address, you can use:

```bash
ip a | grep glo | awk '{print $2}' | head -1 | cut -f1 -d/
```
::

Here, `user` is your username, `hostname` is your server hostname or IP address.

```bash
ssh <user>@<hostname>
```

If it works, you can disable password authentication.

#### Disable password authentication

You can disable password authentication by editing the `/etc/ssh/sshd_config` file on your server.

```bash
vim /etc/ssh/sshd_config
```

```sh [/etc/ssh/sshd_config]
PasswordAuthentication no
```

```bash
systemctl restart sshd
```

#### Use different port

By default, SSH uses port 22. You can change it by editing the `/etc/ssh/sshd_config` file on your server.

```bash
vim /etc/ssh/sshd_config
```

```sh [/etc/ssh/sshd_config]
Port 22
```

```bash
systemctl restart sshd
```

To use SSH on a different port, you need to specify the port number when connecting.

```bash
ssh -p <port> <user>@<hostname>
```

#### Use different private key

By default, SSH uses `~/.ssh/id_ed25519` or `~/.ssh/id_rsa` as private key. You can use different private key by using `-i` option.

```bash
ssh -i <private key filename> <user>@<hostname>
```

You can use `-o` option to specify `IdentitiesOnly` to prevent SSH from trying other authentication methods.

```bash
ssh -o "IdentitiesOnly=yes" -i <private key filename> <user>@<hostname>
```

### Config

You can create a `~/.ssh/config` file to store your SSH configuration.

```bash
vim ~/.ssh/config
```

```sh [~/.ssh/config]
Host <myserver>
  HostName <hostname_or_ip_address>
  User <username>
  Port <port>
  IdentityFile <private key filename path>
  IdentitiesOnly yes
```

```bash
ssh <myserver>
```

## SCP

SCP is a command-line utility that allows you to securely copy files and directories between two locations. This command use same authentication method as SSH.

[Tutorial](https://haydenjames.io/linux-securely-copy-files-using-scp/)

From server to personal computer

```bash
scp username@from_host:file.txt /local/directory/
```

From personal computer to server

```bash
scp file.txt username@to_host:/remote/directory/
```

## RSYNC

Good alternative to SCP, [rsync](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories-on-a-vps) is a fast and versatile command-line utility for synchronizing files and directories between two locations over a remote shell, or from/to a remote RSYNC daemon. It uses an algorithm that minimizes the amount of data copied by only moving the portions of files that have changed.

```bash
rsync -Phhr username@server:/home/path/to/dir ./
```

*-P for progress*
*-hh for human human readible*
*-r for récursif*
