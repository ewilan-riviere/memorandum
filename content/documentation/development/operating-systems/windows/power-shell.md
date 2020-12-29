---
title: PowerShell
description: 'Tips about PowerShell'
position: 6
category: 'Windows'
---

## Cheatsheet

Find profile

```ps1
$env:USERPROFILE
```

```ps1
$profile
```

List all binaries in PATH

```ps1
Get-ChildItem Env:
```

## Custom profile

Find it with

```ps1
$profile
```

And custom it

```ps1[Microsoft.PowerShell_profile.ps1]
Import-Module posh-git
Import-Module oh-my-posh
Import-Module PSReadLine
Set-Theme Paradox

function ssh-server-simple {
    ssh -i C:\Users\username\.ssh\id_rsa "user@server"
}
# with option like 'ssh-server dev.server.org'
function ssh-server($server) {
    ssh -i C:\Users\username\.ssh\id_rsa "user@$server"
}
function lara-seed {
    php artisan migrate:fresh --seed
}
function flutter-clean {
    flutter clean ; flutter pub get
}
function flutter-rebuild {
    flutter clean ; flutter pub get ; flutter run
}
function flutter-build {
    flutter build apk --split-per-abi ; cp build\app\outputs\flutter-apk\app-armeabi-v7a-release.apk
}
```
