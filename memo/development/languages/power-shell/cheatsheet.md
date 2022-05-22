---
title: Cheatsheet
description: 'Useful commands'
position: 1
---

## Common

List all binaries in PATH

```ps1
Get-ChildItem Env:
```

List PATH

```ps1
$env:path -split ";"
```

Find profile

```ps1
$env:UserName
```

Check PowerShell version

```ps1
$PSVersionTable
```

Path of current PowerShell profile

```ps1
$profile
```

## Use `cmd` command into PowerShell

```ps1
cmd /c <command>
```
