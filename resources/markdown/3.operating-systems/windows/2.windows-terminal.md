---
title: Windows terminal
description: 'A nice terminal on Windows'
position: 2
category: 'Windows'
---

<content-image source="windows-terminal.webp"></content-image>

::alert{type="warning"}> scoop is necessary

You will need to have **scoop** to install Windows terminal, if you don't install it, check this guide: [**scoop**](/development/operating-systems/windows/scoop)

::

Windows terminal is a recent terminal for Windows, by Microsoft.

**Features**

- Tabs
- JSON config
- Multiple Shell profiles (even [**WSL**](/devops/operating-systems/wsl) if installed)
- Shorcuts
- Switch tabs <kbd>Ctrl</kbd> + <kbd>Tab</kbd>

**Documentation**

- [**GitHub**](https://github.com/microsoft/terminal)
- [**official documentation**](https://docs.microsoft.com/fr-fr/windows/terminal/)

## Installation

You can easily install it with **scoop** (from *bucket extras*). You can install it from **Windows Store** instead, if you like it.

```powershell[PowerShell]
sudo scoop install windows-terminal
```

You will find Windows Terminal in startup menu, launch it and you will see the new terminal, click on <kbd>⌵</kbd> and select **Settings** (<kbd>Ctrl</kbd> + <kbd>,</kbd>), this will open JSON configuration. Any update will be applied directly.

<spoiler label="Example of Windows terminal configuration">

Here it's just an example, check [**official documentation**](https://docs.microsoft.com/fr-fr/windows/terminal/) if you want to know more about Windows terminal configuration.

This example will give you a terminal with black background, green font and two shortcuts: <kbd>Ctrl</kbd> + <kbd>W</kbd> to close tab and <kbd>Ctrl</kbd> + <kbd>T</kbd> to open new tab.

```json
// ...
{
    // ...
    // replace 'defaultProfile' with new 'guid' profile
    "defaultProfile": "{79285a8e-036c-446f-8a9c-78994e34bf78}",
    // ...
    "profiles": {
        "defaults": {
            // ...
        },
        "list": [
            // ...
            {
                "guid": "{79285a8e-036c-446f-8a9c-78994e34bf78}",
                "hidden": false,
                "name": "Konsole",
                "commandline": "powershell.exe",
                // config
                "acrylicOpacity": 0.8,
                "backgroundImageOpacity": 0.7,
                "backgroundImageStretchMode": "uniformToFill",
                "closeOnExit": false,
                "colorScheme": "Konsole",
                "cursorHeight": 25,
                "cursorShape": "vintage",
                "fontFace": "Fira Code",
                "fontSize": 12,
                "icon": "C:/Users/username/Documents/WindowsPowerShell/icon.ico",
                "historySize": 9001,
                "padding": "0, 0, 0, 0",
                "snapOnInput": true,
                "startingDirectory": "C:/workspace",
                "useAcrylic": true
            }
        ]
    },
    // ...
    "schemes": [
        {
            "name": "Konsole",
            //
            "cursorColor": "#00FF00",
            "selectionBackground": "#FFFFFF",
            //
            "background": "#000000",
            "foreground": "#33FF00",
            //
            "black": "#2d3748",
            "blue": "#3465A4",
            "cyan": "#06989A",
            "green": "#b6b6b6",
            "purple": "#75507B",
            "red": "#CC0000",
            "white": "#219b02",
            "yellow": "#9c8000",
            "brightBlack": "#5bac0b",
            "brightBlue": "#729FCF",
            "brightCyan": "#34E2E2",
            "brightGreen": "#8AE234",
            "brightPurple": "#AD7FA8",
            "brightRed": "#EF2929",
            "brightWhite": "#b1b1b1",
            "brightYellow": "#FCE94F"
        }
    ],
    // ...
    "actions": [

        // ...

        {
            "command": "closePane",
            "keys": [
                "ctrl+w"
            ]
        },
        {
            "command": "newTab",
            "keys": [
                "ctrl+t"
            ]
        }
    ]
}
```

</spoiler>

## Profile

You can improve your current profile with some modules, so you need to find your current profile.

```powershell[PowerShell]
$PROFILE
```

### Oh My Posh

- From [**ohmyposh.dev/docs**](https://ohmyposh.dev/docs/installation/)

*Optional: upgrade your PowerShell to 7+*

```bash
sudo scoop install Meslo-NF ; scoop install https://github.com/JanDeDobbeleer/oh-my-posh/releases/latest/download/oh-my-posh.json
```

Update `Microsoft.PowerShell_profile.ps1`, to find it, execute `$PROFILE` and you will get the path

```ps1[Microsoft.PowerShell_profile.ps1]
Invoke-Expression (oh-my-posh --init --shell pwsh --config "$(scoop prefix oh-my-posh)/themes/jandedobbeleer.omp.json")
```

Add `"fontFace": "MesloLGM NF"` to Windows Terminal JSOn settings

```json
{
    "profiles": {
        "list": [
            {
                "guid": "{79285a8e-036c-446f-8a9c-78994e34bf78}",
                "fontFace": "MesloLGM NF",
            }
        ]
    }
}
```

```bash
scoop update oh-my-posh
```

```bash
oh-my-posh --print-shell
```

#### VS Code

Open JSON Settings in VS Code

```json
{
    "terminal.integrated.automationShell.windows": "Windows.Terminal.PowershellCore",
    "terminal.integrated.fontFamily": "MesloLGM NF"
}
```

## Update PowerShell

- From [**github.com/PowerShell**](https://github.com/PowerShell/PowerShell#get-powershell)

Download the **Windows (x86) stable .msi** version, update **Settings JSON** of Windows Terminal:

```json
{
    "profiles": {
        "list": [
            {
                "guid": "{79285a8e-036c-446f-8a9c-78994e34bf78}",
                // "commandline": "powershell.exe",
                "commandline": "C:\\Program Files (x86)\\PowerShell\\7\\pwsh.exe",
            }
        ]
    }
}
```

::alert{type="info"}
The path of $PROFILE will be change, check it.
::