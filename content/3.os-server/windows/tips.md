---
title: Tips
description: 'Some tips for Windows'
---

## Tabs into explorer

From <https://github.com/thebookisclosed/ViVe> and <https://pureinfotech.com/enable-tabs-file-explorer-windows-11>

::alert{type="warning"}
Windows update
>
You have to use Windows 11 22H2 or later
::

```bash
scoop install vivetool
```

Enable File Explorer tabs on Windows 11 22H2

```bash
vivetool /enable /id:37634385
vivetool /enable /id:39145991
```

Enable File Explorer’s new navigation pane

```bash
vivetool /enable /id:36354489
```
