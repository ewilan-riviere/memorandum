---
title: Disk
description: Disk management on macOS
---

# Disk

## List disks

```sh
diskutil list
```

## Verify disk

::: info
Replace `/dev/disk2` with the disk you want to verify.
:::

- Verify disk
- Erase disk
- Repair disk
- Unmount disk

```sh
diskutil verifyDisk /dev/disk2
diskutil eraseDisk JHFS+ BackupMaster /dev/disk2
diskutil repairDisk /dev/disk2
diskutil unmountDisk /dev/disk2
```
