---
title: SSH / SCP / rsync
description: Usage of SSH, SCP and rsync
---

# SSH / SCP / rsync

{{ $frontmatter.description }}

## Generate key

From [Create ed25519 key](https://github.com/kirkmicz/Cheat-Sheet/blob/master/Linux%20&%20Unix/Create%20ed25519%20key.md)

::: code-group

```sh [ed25519]
ssh-keygen -t ed25519 -b 4096 -C "user@mail"
```

```sh [ed25519 (no mail)]
ssh-keygen -t ed25519
```

```sh [rsa]
ssh-keygen -t rsa -b 2048
```

:::

### Add to server

Connect to your remote server and add your public key to `~/.ssh/authorized_keys`.

```sh
vim ~/.ssh/authorized_keys
```

```sh:~/.ssh/authorized_keys
ssh-ed25519 AAAAC3Nza...
```

And add your `id_ed25519.pub` or `id_rsa.pub`.

Exit your remote server and try SSH connection.

## Usage

::: info
To find your IP address, you can use:

```sh
ip a | grep glo | awk '{print $2}' | head -1 | cut -f1 -d/
```

:::

Here, `user` is your username, `hostname` is your server hostname or IP address.

```sh
ssh <user>@<hostname>
```

If it works, you can disable password authentication.

### Disable password authentication

You can disable password authentication by editing the `/etc/ssh/sshd_config` file on your server.

```sh
vim /etc/ssh/sshd_config
```

Change the `PasswordAuthentication` option:

```sh:/etc/ssh/sshd_config
PasswordAuthentication yes # [!code --]
PasswordAuthentication no # [!code ++]
```

Restart the SSH service:

```sh
systemctl restart sshd
```

### Use different port

By default, SSH uses port 22. You can change it by editing the `/etc/ssh/sshd_config` file on your server.

```sh
vim /etc/ssh/sshd_config
```

Change the port number:

```sh:/etc/ssh/sshd_config
Port 22 # [!code --]
Port 23 # [!code ++]
```

Restart the SSH service:

```sh
systemctl restart sshd
```

::: warning Firewall
Don't forget to open the port in your server firewall. If you use UFW, you can use:

```sh
ufw allow <port>
```

And check the status:

```sh
ufw status
```

You can delete old port:

```sh
ufw delete allow <old port>
```

:::

::: warning fail2ban
If you use fail2ban, you need to add the new port to the configuration.

```sh
vim /etc/fail2ban/jail.local
```

```sh:/etc/fail2ban/jail.local
[sshd]
port = <port>
```

And restart the service:

```sh
systemctl restart fail2ban
```

:::

To use SSH on a different port, you need to specify the port number when connecting.

```sh
ssh -p <port> <user>@<hostname>
```

### Use different private key

By default, SSH uses `~/.ssh/id_ed25519` or `~/.ssh/id_rsa` as private key. You can use different private key by using `-i` option.

```sh
ssh -i <private key filename> <user>@<hostname>
```

You can use `-o` option to specify `IdentitiesOnly` to prevent SSH from trying other authentication methods.

```sh
ssh -o "IdentitiesOnly=yes" -i <private key filename> <user>@<hostname>
```

## SSH config

You can create a `~/.ssh/config` file to store your SSH configuration.

```sh
vim ~/.ssh/config
```

- `Host` is the alias you want to use to connect to your server.
- `HostName` is the IP address or hostname of your server.
- `User` is your username.
- `Port` is the port number.
- `IdentityFile` is the path to your private key.
- `IdentitiesOnly` is set to `yes` to prevent SSH from trying other authentication methods.

```sh:~/.ssh/config
Host <myserver>
  HostName <hostname_or_ip_address>
  User <username>
  Port <port>
  IdentityFile <private key filename path>
  IdentitiesOnly yes
```

Now you can connect to your server using the alias.

```sh
ssh <myserver>
```

::: details SSH config example

```sh:~/.ssh/config
Host my-wonderful-server
  HostName 123.456.789.0
  User unicorn_admin
  Port 22
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes

Host my-other-wonderful-server
  HostName 123.456.789.1
  User panda_admin
  Port 23
  IdentityFile ~/.ssh/id_rsa
  IdentitiesOnly yes
```

```sh
ssh my-wonderful-server
```

:::

## SCP

SCP is a command-line utility that allows you to securely copy files and directories between two locations. This command use same authentication method as SSH.

[Tutorial](https://haydenjames.io/linux-securely-copy-files-using-scp/)

From server to personal computer

```sh
scp username@from_host:file.txt /local/directory/
```

From personal computer to server

```sh
scp file.txt username@to_host:/remote/directory/
```

### Use different SSH port

From server to personal computer

```sh
scp -P <port> username@from_host:file.txt /local/directory/
```

From personal computer to server

```sh
scp -P <port> file.txt username@to_host:/remote/directory/
```

## rsync

Good alternative to SCP, [rsync](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories-on-a-vps) is a fast and versatile command-line utility for synchronizing files and directories between two locations over a remote shell, or from/to a remote rsync daemon. It uses an algorithm that minimizes the amount of data copied by only moving the portions of files that have changed.

```sh
rsync -Phhr username@server:/home/path/to/dir ./
```

- _-P for progress_
- _-hh for human human readible_
- _-r for recursive_

### Use different SSH port

```sh
rsync -Phhr -e 'ssh -p <port>' username@server:/home/path/to/dir ./
```
