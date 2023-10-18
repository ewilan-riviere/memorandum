---
title: WiFi
description: WiFi is a wireless networking technology that allows devices to communicate without wires.
---

## Support

### Windows

```powershell
netsh wlan show drivers
```

- 802.11 – WiFi 0
- 802.11b – WiFi 1
- 802.11a – WiFi 2
- 802.11g – WiFi 3
- 802.11n – WiFi 4
- 802.11ac – WiFi 5
- 802.11ax – WiFi 6 and WiFi 6E
- 802.11be – WiFi 7

Example:

```
Interface name: Wi-Fi

    Driver                    : Intel(R) Dual Band Wireless-AC 8260
    Vendor                    : Intel Corporation
    Provider                  : Microsoft
    Date                      : 9/3/2018
    Version                   : 20.70.3.3
    INF file                  : netwtw06.inf
    Type                      : Native Wi-Fi Driver
    Radio types supported     : 802.11b 802.11g 802.11n 802.11a 802.11ac
    FIPS 140-2 mode supported : Yes
    802.11w Management Frame Protection supported : Yes
    Hosted network supported  : No
    Number of supported bands : 2
                                2.4 GHz [ 0 MHz - 0 MHz]
                                5 GHz   [ 0 MHz - 0 MHz]
    IHV service present       : Yes
    IHV adapter OUI           : [00 00 00], type: [00]
    Wireless Display Supported: Yes (Graphics Driver: Yes, Wi-Fi Driver: Yes)
```

In this example, the WiFi adapter supports 802.11b, 802.11g, 802.11n, 802.11a, and 802.11ac, in WiFi is 3, 4, 5, 2, and 5 respectively.
