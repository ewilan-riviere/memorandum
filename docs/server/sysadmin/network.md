---
title: Network
description: Network management
---

# Network

## Physical network devices

List all physical network devices

```sh
lspci -nn | grep -i eth
```

```bash:output
27:00.0 Ethernet controller [0200]: Realtek Semiconductor Co., Ltd. RTL8111/8168/8211/8411 PCI Express Gigabit Ethernet Controller [10ec:8168] (rev 15)
28:00.0 Ethernet controller [0200]: Realtek Semiconductor Co., Ltd. RTL8125 2.5GbE Controller [10ec:8125] (rev 05)
```

## MAC address

List all MAC addresses

```sh
ip -o link show | awk '/ether/ && $17 !~ /^02:/ {print $2, $17}'
```

```bash:output
enp1s0: cc:64:1a:f1:b1:a5
enp4s0: 9c:6b:00:83:61:80
br-85a758841392: brd
br-d81df38dd6f7: brd
br-3a9631f1f493: brd
br-9eed9f47fa84: brd
br-a534b41718ba: brd
br-afc581886491: brd
br-b1d6375ddf94: brd
br-61646c589be1: brd
br-72a4815e82be: brd
br-dc2ed71ae362: brd
```

Get MAC address of the main interface

```sh
ip -o link show | awk '/ether/ && $17 !~ /^02:/ {print $17; exit}'
```

```bash:output
cc:64:1a:f1:b1:a5
```

Get MAC address of a specific interface

```sh
cat /sys/class/net/enp1s0/address
```

```bash:output
cc:64:1a:f1:b1:a5
```

## Network interfaces

### Get interfaces

List all network interfaces except loopback and virtual ones

```sh
ip -o link show | awk -F': ' '!($2 ~ /^(lo|docker0|veth|br-|tun|gre|wg)/) {print $2}'
```

```bash:output
enp1s0
enp4s0
```

### Details of specific interface

Get details of a specific interface

```sh
ip link show enp1s0
```

```bash:output
2: enp1s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether cc:64:1a:f1:b1:a5 brd ff:ff:ff:ff:ff:ff
```

### Full information of specific interface

Get full address information of a specific interface

```sh
ip addr show enp1s0
```

```bash:output
2: enp1s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether cc:64:1a:f1:b1:a5 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.71/24 brd 192.168.1.255 scope global dynamic enp1s0
       valid_lft 27270sec preferred_lft 27270sec
```

### Settings of specific interface

Get detailed settings of a specific interface

```sh
sudo ethtool enp1s0
```

```bash:output
Settings for enp1s0:
	Supported ports: [ TP	 MII ]
	Supported link modes:   10baseT/Half 10baseT/Full
	                        100baseT/Half 100baseT/Full
	                        1000baseT/Full
	                        2500baseT/Full
	Supported pause frame use: Symmetric Receive-only
	Supports auto-negotiation: Yes
	Supported FEC modes: Not reported
	Advertised link modes:  10baseT/Half 10baseT/Full
	                        100baseT/Half 100baseT/Full
	                        1000baseT/Full
	                        2500baseT/Full
	Advertised pause frame use: Symmetric Receive-only
	Advertised auto-negotiation: Yes
	Advertised FEC modes: Not reported
	Link partner advertised link modes:  10baseT/Half 10baseT/Full
	                                     100baseT/Half 100baseT/Full
	                                     1000baseT/Full
	                                     2500baseT/Full
	Link partner advertised pause frame use: Symmetric Receive-only
	Link partner advertised auto-negotiation: Yes
	Link partner advertised FEC modes: Not reported
	Speed: 2500Mb/s
	Duplex: Full
	Auto-negotiation: on
	master-slave cfg: preferred slave
	master-slave status: slave
	Port: Twisted Pair
	PHYAD: 0
	Transceiver: external
	MDI-X: Unknown
	Supports Wake-on: pumbg
	Wake-on: d
	Link detected: yes
```

### Driver of specific interface

Get driver information of a specific interface

```sh
sudo ethtool -i enp1s0
```

```bash:output
driver: r8169
version: 6.1.0-41-amd64
firmware-version: rtl8125b-2_0.0.2 07/13/20
expansion-rom-version:
bus-info: 0000:01:00.0
supports-statistics: yes
supports-test: no
supports-eeprom-access: no
supports-register-dump: yes
supports-priv-flags: no
```

### Statistics of specific interface

Get network statistics of a specific interface

```sh
ip -s link show enp1s0
```

```bash:output
2: enp1s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether cc:64:1a:f1:b1:a5 brd ff:ff:ff:ff:ff:ff
    RX:    bytes   packets errors dropped  missed   mcast
    359206989415 267203155      0       0       0   13787
    TX:    bytes   packets errors dropped carrier collsns
    645359343893 522202407      0       0       0       0
```

### Routing of specific interface

Get routing information of a specific interface

```sh
ip route show dev enp1s0
```

```bash:output
default via 192.168.1.254
192.168.1.0/24 proto kernel scope link src 192.168.1.71
```

## Static DHCP leases

### Via router

You can set static DHCP leases by update settings in your DHCP server configuration.

```sh
sudo vim /etc/network/interfaces
```

Add the following lines to configure your network interface to use DHCP, here `eno1` is the name of your network interface:

```conf:/etc/network/interfaces
auto eno1
iface eno1 inet dhcp
```

Choose DHCP menu in your router administration panel.

![](/docs/router/static-dhcp-lease-1.jpg)

Add a new static lease by entering MAC address, IP address, and description.

![](/docs/router/static-dhcp-lease-2.jpg)

![](/docs/router/static-dhcp-lease-3.jpg)

And now, device associated with the MAC address will always get the same IP address from DHCP server.

You can now claim the new IP address by renewing the DHCP lease on your server:

_Here, `eno1` is the name of your network interface. Adjust it according to your system._

```sh
sudo dhclient -r eno1
sudo dhclient eno1
```

## Ubuntu disable Cloud-init network configuration

If you are using Ubuntu with Cloud-init, you may need to disable Cloud-init network configuration to manage network settings manually.

Create or edit the Cloud-init configuration file:

```sh
sudo vim /etc/cloud/cloud.cfg.d/99-disable-cloud-init.cfg
```

Add the following lines to disable Cloud-init network configuration:

```yaml:/etc/cloud/cloud.cfg.d/99-disable-cloud-init.cfg
network: {config: disabled}
```

Find your MAC address of the main network interface:

Here, `eno1` is the name of your network interface. Adjust it according to your system.

```sh
ip link show eno1
```

Save the file and exit the editor.

```sh
sudo vim /etc/netplan/01-main.yaml
```

Here, `eno1` is the name of your network interface. Adjust it according to your system.

```yaml:/etc/netplan/01-main.yaml
network:
  version: 2
  ethernets:
    eno1:
      macaddress: cc:64:1a:f1:bb:19
      dhcp4: true
```

```sh
sudo mv /etc/netplan/50-cloud-init.yaml /root/
```

Then, regenerate the network configuration files:

```sh
sudo netplan generate
sudo netplan apply
```

Restart networking service:

```sh
sudo systemctl restart networking.service
sudo systemctl status networking.service
```

Reboot the system to apply the changes:

```sh
sudo reboot
```
