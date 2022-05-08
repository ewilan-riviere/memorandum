---
title: SSH management
description: ''
position: 1
category: 'Misc'
---

## Connection to server

You need server's IP address, username and password for basic server. If it's server with high level of security, you need to have your SSH Key in `/home/username/.ssh/authorized_keys` for username with which use to connect.

### Example with local network

I check local IP with this command:

```bash
ip a
```

I have large output with these informations:

<vue-code-info ext="sh-output"></vue-code-info>

```bash{7}
2: enp3s0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state DOWN group default qlen 1000
    link/ether 6c:2b:59:70:38:4d brd ff:ff:ff:ff:ff:ff
3: wlp4s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether ec:5c:68:48:9f:fb brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.30/24 brd 192.168.1.255 scope global dynamic noprefixroute wlp4s0
       valid_lft 81161sec preferred_lft 81161sec
    inet6 fe80::e765:c338:16e:ee00/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
```

I haven't ethernet cable, so **`enp3s0` is empty**, so I check just **`wlp4s0`** with **w for WiFi** and I can see IP address: **192.168.1.30**. And now, I can connect my host machine to my other machine:

```bash
username@192.168.1.30
```

## Copy file with SSH: SCP command

[Tutorial](https://haydenjames.io/linux-securely-copy-files-using-scp/)

From server to personal computer

```bash
scp username@from_host:file.txt /local/directory/
```

From personal computer to server

```bash
scp file.txt username@to_host:/remote/directory/
```

- <https://devblogs.microsoft.com/powershell/using-the-openssh-beta-in-windows-10-fall-creators-update-and-windows-server-1709/>
- <https://www.it-swarm.dev/fr/ssh/le-demarrage-de-ssh-agent-sous-windows-10-echoue-impossible-de-demarrer-le-service-ssh-agent-erreur-1058/807399778/>
- <https://winaero.com/blog/enable-openssh-server-windows-10/>
- <https://www.howtogeek.com/howto/windows-vista/allow-pings-icmp-echo-request-through-your-windows-vista-firewall/>
- <https://superuser.com/questions/627208/unable-to-ping-a-windows-machine-from-linux>

## rsync

```bash
rsync -Phhr username@server:/home/path/to/dir ./
```

*-P for progress*  
*-hh for human human readible*  
*-r for récursif*  
