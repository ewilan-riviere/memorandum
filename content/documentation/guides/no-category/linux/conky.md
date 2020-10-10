# Conky

## 1. Setup

```bash
sudo apt install -y conky-all lm-sensors
```

```bash
vim ~/.conkyrc
```

:::details Add this config in .conkyrc
<<< docs/guides/linux/.conkyrc
:::

### 1.a. Update Network infos

Check network infos

```bash
ip a
```

You will have output like this

```bash
2: enp3s0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state DOWN group default qlen 1000
    link/ether 6c:2b:59:70:38:4d brd ff:ff:ff:ff:ff:ff
3: wlp4s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether ec:5c:68:48:9f:fb brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.25/24 brd 192.168.1.255 scope global dynamic noprefixroute wlp4s0
       valid_lft 83269sec preferred_lft 83269sec
    inet6 fe80::8582:de49:523c:5488/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
```

Here, `enp3s0` is **ethernet** connection and `wlp4s0` is **wifi** connection.

In `.conkyrc`, you have to replace `enp3s0` and `wlp4s0` with your infos.

## 2. Autostart

```bash
vim ~/.config/autostart/conky
```

```bash
#!/bin/bash
conky -b
```

```bash
sudo chmod 775 ~/.config/autostart/conky
```

restart or execute

```bash
conky -b
```
