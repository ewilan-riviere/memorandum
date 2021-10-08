---
title: Symbolic links
description: 'Create symbolic links'
position: 2
---

- From [**howtogeek.com**](https://www.howtogeek.com/howto/16226/complete-guide-to-symbolic-links-symlinks-on-windows-or-linux/)

```ps1
cmd /c mklink /J "C:\path\to\target" "C:\path\to\origin"
```

```ps1
New-Item -ItemType Junction -Path C:\workspace\development\flutter\current -Target C:\workspace\development\flutter\2.5.2
```
