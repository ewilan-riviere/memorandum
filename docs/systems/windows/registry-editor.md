---
title: Registry Editor
description: "How to use the Windows Registry Editor"
position: 8
---

# Registry Editor

The Windows Registry Editor is a powerful tool that allows you to view and modify the Windows registry, which is a database that stores low-level settings for the operating system and applications.

## Accessing the Registry Editor

You can access the Registry Editor in several ways:

- Press `Win + R`, type `regedit`, and press `Enter`.
- Search for "Registry Editor" in the Start menu.
- Open the Run dialog (`Win + R`), type `regedit`, and click OK.
- Use the command line by typing `regedit` and pressing `Enter`.

## Change *Drag and Drop* Behavior

To change the drag and drop behavior in Windows, you can modify the registry settings. This can be useful if you want to enable or disable certain features related to drag and drop.

Navigate to the following key:

```plaintext
HKEY_CURRENT_USER\Control Panel\Desktop
```

Edit the following values:

- **DragHeight**: Set the height in pixels that the mouse must move before a drag operation is initiated, default is `1` pixel.
- **DragWidth**: Set the width in pixels that the mouse must move before a drag operation is initiated, default is `1` pixel.

You can set these values to `1000` to increase the threshold, which can help prevent accidental drags. And now, restart your computer for the changes to take effect.
