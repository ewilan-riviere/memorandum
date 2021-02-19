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

# with option like 'ssh-server dev.server.org'
function ssh-server($server) {
    ssh -i C:\Users\ewila\.ssh\id_rsa.pub "ubuntu@$server"
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
function user-go {
    cd C:/Users/ewila
}
# Laravel
function artisan-seed {
    php artisan migrate:fresh --seed
}
function artisan-clear {
    php artisan cache:clear ; php artisan config:clear ; php artisan route:clear ; php artisan view:clear
}
function artisan-routes {
    php artisan route:list --compact
}
function artisan-helper {
    php artisan ide-helper:generate ; php artisan ide-helper:models ; php artisan ide-helper:meta
}
function php-cs-fix {
    ./vendor/bin/php-cs-fixer fix
}
# composer
function composer-setup {
    composer install ; php artisan key:generate ; php artisan storage:link
    if(!(Test-Path -Path '.env')) {
        New-Item .env
    }
}
function composer-v {
    composer --version
}
# php
function php-7.4 {
    scoop reset php/php7.4-nts
}
function php-8.0 {
    scoop reset php/php-nts
}
```
