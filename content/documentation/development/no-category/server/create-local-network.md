---
title: Create local network
description: ''
position: 1
category: 'Server'
---

# 🖧 Networking: share directory

<img src="/images/python.jpg" class="cover-img" />

How to establish a local network between two computers with Python.

## 1. On host computer

### 1. a. Create network

This will share `my-directory/` directory on network:

```bash
cd my-directory/

python3 -m http.server
```

:::tip
You can use `python -m SimpleHTTPServer` if you haven't Python 3.
:::

### 2. b. Check IP of machine

```bash
ip a
```

You will have this output with some variations:

```bash{11}
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: enp3s0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state DOWN group default qlen 1000
    link/ether 6c:2b:59:70:38:4d brd ff:ff:ff:ff:ff:ff
3: wlp4s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether ec:5c:68:48:9f:fb brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.36/24 brd 192.168.1.255 scope global dynamic noprefixroute wlp4s0
       valid_lft 83517sec preferred_lft 83517sec
    inet6 fe80::c8b6:69c0:eb8f:a11c/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
```

**About this output**:

- `1: lo:` loopack, it's not important here
- `2: enp3s0:` ethernet, in this example we can note `NO-CARRIER` because no ethernet cable is connected
- `3: wlp4s0` wifi, in this example we can note `192.168.1.36`

The url of your network depending of your connection type. If you use ethernet, take ethernet IP and if you use wifi, take wifi IP.

## 2. On guest computer

In any browser, just try to access to `192.168.1.36:8000` (for this example) and you will see list of files into shared directory. When you click on any file, you will can download it.
