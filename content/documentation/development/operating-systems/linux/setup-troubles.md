---
title: Setup troubles
description: 'Problems about setup'
position: 2
category: 'Linux'
---

- Prepare boot useb key with Rufus on Windows, just use windows.iso
- Install Windows

:::tip

- In Windows, run Command Prompt as admin
- Invoke a Safe Mode boot with the command: `bcdedit /set {current} safeboot minimal`
- Restart the PC and enter your BIOS during bootup.
- Change from IDE to AHCI mode then Save & Exit.
- Windows 10 will launch in Safe Mode.
- Right click the Window icon and select to run the Command Prompt in Admin mode from among the various options.
- Cancel Safe Mode booting with the command: `bcdedit /deletevalue {current} safeboot`
- Restart your PC once more and this time it will boot up normally but with AHCI mode activated.
:::

Machine: Dell 15 5584

- Delete any program for Intel Storage Rapid
- Right click on Windows logo, choose execute, type `msconfig`
- Go to Startup tab, select safe boot and accept reboot
- Go to the BIOS, **System Configuration**, **SATA Operation**, select **AHCI**
- Reboot, if system boot on Linux, use Boot-repair to repair boot, if not, boot on LiveUSB and use Boot-repair
- On Windows, you can login with password of Microsoft account (and not with secret code). If you have problems, keep *shift* and select *reboot* at the bottom right to trigger safe mode options
- When you are login, disable safe mode and reboot, your system will be repaired now!

---

With MSI XPG X570 motherboard

- make sure in UEFI settings to select USB key to boot on it
- install linux (keep uefi install on nvme, choose any disk for root)
- restart computer
- if grub not work, got to uefi and select linux disk in priorities boot
- repair grub if not work
- grub have to work now
