# 💻 Windows: Windows terminal

[GitHub: microsoft/terminal](https://github.com/microsoft/terminal)

Windows terminal is the newest terminal from Microsoft and it is better than ***any*** terminal on Windows.

**Features**:
- *Multi-tabs*
- *Easy configuration with JSON*
  - *Colors*
  - *Fonts*
  - *Design*
- *Select shells with profiles*
- *Keybindings*

## 1. Download Windows Terminal

On **Windows Store**, search `windows terminal` and you will find [Windows terminal](https://www.microsoft.com/fr-fr/p/windows-terminal-preview/9n0dx20hk701?activetab=pivot:overviewtab). Download it and launch it from applications.

<img src="/images/windows-terminal.jpg" class="cover-img" />

## 2. Configuration

[microsoft/terminal: documentation](https://github.com/microsoft/terminal/blob/master/doc/user-docs/index.md)  
[microsoft/terminal: JSON documentation](https://github.com/microsoft/terminal/blob/master/doc/cascadia/SettingsSchema.md)

You will discover the new Windows terminal with tabs, you can configure it with the **arrow button** **&#8964;**, just next to **plus button** **&#43;**, and select **Settings**. It's will open JSON file, any change will be applied automatically.

```json

// To view the default settings, hold "alt" while clicking on the "Settings" button.
// For documentation on these settings, see: https://aka.ms/terminal-documentation

{
    "$schema": "https://aka.ms/terminal-profiles-schema",

    "defaultProfile": "{79285a8e-036c-446f-8a9c-78994e34bf78}",

    "profiles":
    [
        {
            // Make changes here to the powershell.exe profile
            "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
            "name": "Windows PowerShell",
            "commandline": "powershell.exe",
            "hidden": false
        },
        {
            // Make changes here to the cmd.exe profile
            "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
            "name": "cmd",
            "commandline": "cmd.exe",
            "hidden": false
        },
        {
            "guid": "{b453ae62-4e3d-5e58-b989-0a998ec441b8}",
            "hidden": false,
            "name": "Azure Cloud Shell",
            "source": "Windows.Terminal.Azure"
        },
        {
            "acrylicOpacity" : 0.8,
            "background" : "#000000",
            "backgroundImage" : "C:/users/barto/AppData/Local/Packages/Microsoft.WindowsTerminal_8wekyb3d8bbwe/RoamingState/unicorn.gif",
            "backgroundImageOpacity" : 0.7,
            "backgroundImageStretchMode" : "uniformToFill",
            "closeOnExit" : false,
            "colorScheme" : "Konsole",
            "commandline" : "powershell.exe",
            "cursorColor" : "#00FF00",
            "cursorHeight" : 25,
            "cursorShape" : "vintage",
            "fontFace" : "Fira Code",
            "fontSize" : 12,
            "guid" : "{79285a8e-036c-446f-8a9c-78994e34bf78}",
            "historySize" : 9001,
            "icon" : "C:/Users/eriviere/Pictures/avatar/dirty_unicorn.png",
            "name" : "Ewie PowerShell",
            "padding" : "0, 0, 0, 0",
            "snapOnInput" : true,
            "startingDirectory" : "%USERPROFILE%/Documents/workspace/",
            "useAcrylic" : true
        },
        {
            "guid": "{2c4de342-38b7-51cf-b940-2309a097f518}",
            "hidden": false,
            "name": "Ubuntu",
            "source": "Windows.Terminal.Wsl",
            "acrylicOpacity" : 0.8,
            "background" : "#000000",
            "backgroundImage" : "C:/users/barto/AppData/Local/Packages/Microsoft.WindowsTerminal_8wekyb3d8bbwe/RoamingState/unicorn.gif",
            "backgroundImageOpacity" : 0.7,
            "backgroundImageStretchMode" : "uniformToFill",
            "closeOnExit" : false,
            "colorScheme" : "Konsole",
            "cursorColor" : "#00FF00",
            "cursorHeight" : 25,
            "cursorShape" : "vintage",
            "fontSize" : 12,
            "historySize" : 9001,
            "icon" : "C:/Users/eriviere/Pictures/avatar/dirty_unicorn.png",
            "padding" : "0, 0, 0, 0",
            "snapOnInput" : true,
            "startingDirectory" : "%USERPROFILE%/Documents/workspace/",
            "useAcrylic" : true,
            "fontFace" : "Fira Code"
        },
        {
            "guid": "{2c4de342-38b7-51cf-b940-2309a097f518}",
            "hidden": false,
            "name": "Ubuntu",
            "source": "Windows.Terminal.Wsl"
        }
    ],

    // Add custom color schemes to this array
    "schemes": [ 
        {
            "background" : "#33FF00",
            "black" : "#33FF00",
            "blue" : "#3465A4",
            "brightBlack" : "#5bac0b",
            "brightBlue" : "#729FCF",
            "brightCyan" : "#34E2E2",
            "brightGreen" : "#8AE234",
            "brightPurple" : "#AD7FA8",
            "brightRed" : "#EF2929",
            "brightWhite" : "#b1b1b1",
            "brightYellow" : "#FCE94F",
            "cyan" : "#06989A",
            "foreground" : "#33FF00",
            "green" : "#b6b6b6",
            "name" : "Konsole",
            "purple" : "#75507B",
            "red" : "#CC0000",
            "white" : "#219b02",
            "yellow" : "#C4A000"
        }
    ],

    // Add any keybinding overrides to this array.
    // To unbind a default keybinding, set the command to "unbound"
    "keybindings": [
        { "command": "closePane", "keys": ["ctrl+w"] },
        { "command": "newTab", "keys": ["ctrl+t"] }
    ]
}
```

## 3. Linux bash on Windows terminal

### 3. a. Activate Windows Sub-system for Linux (WSL)

With **admin** *PowerShell*:

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

PowerShell ask you to reboot, you need it before below step.

### 3. b. Ubuntu application

On **Windows Store**, search `ubuntu` to find [**Ubuntu** application](https://www.microsoft.com/fr-fr/p/ubuntu/9nblggh4msv6?activetab=pivot:overviewtab) (take the best starred) and download it. When Ubuntu is available, launch it and define UNIX username and UNIX password.

Restart Windows terminal and a new profile is available with `Linux`.