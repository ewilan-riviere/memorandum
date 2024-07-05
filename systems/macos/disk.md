---
title: Disk
description: Disk management on macOS
---

# Disk

## List disks

```sh
diskutil list
```

## Mount disk

::: info
Replace `/dev/disk2` with the disk you want to mount.
:::

```sh
diskutil mountDisk /dev/disk2
```

## Unmount disk

::: info
Replace `/dev/disk2` with the disk you want to unmount.
:::

```sh
diskutil unmountDisk /dev/disk2
```

## Verify disk

::: info
Replace `/dev/disk2` with the disk you want to verify.
:::

```sh
diskutil verifyDisk /dev/disk2
```

## Repair disk

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
