---
title: KDE
description: 'Tips about KDE'
position: 7
category: 'Linux'
---

Install KDE Plasma with some basic apps and redshift for blue light management (you can control with a widget in systray)

```bash
sudo apt install -y kde-standard plasma-applet-redshift-control
```

In **Settings**

Input devices -> Touchpad -> Taps
Mouse Click Emulation
Scrolling
Reverse scrolling "Vertical"

Applications Style -> Window decorations
Add "Arc OSX Black"

Applications -> Default applications
Change if need

Window management -> Window behavior -> Windows actions -> Inner window, titlebar & frame
Left button -> Nothing

Desktop behavior -> Screen locking -> Appearance
Choose Image, "Scale, Keep Proportions"

Startup and  Shutdown -> Login Screen (SDDM) -> Theme
Update Background

Left click on desktop
Configure Desktop
Choose image
"Scale, Keep Proportions"

Account Details -> User Manager
Click on avatar, `Load from file...`

---

GIMP
Windows -> Single window mode

## Remove `snap`

You will see snap here

```bash
lsblk -p
```

```bash
snap list
```

Example:

```bash
sudo snap remove gnome-3-26-1604 gnome-calculator gnome-characters gnome-logs gnome-system-monitor
```

```bash
sudo umount /snap/core/6350
```

```bash
sudo apt purge snapd
```

## Switch HDMI

<https://www.simplified.guide/kde/automatically-run-program-on-startup>

disable sleep ->systemtray->disable power management

KDE Settings
Multimedia->Audio Volume->Advanced

Built-in Audio

- Analog Stereo Output
- Digital Stereo (HDMI) Output

## MacOS design

![alt](https://www.youtube.com/watch?v=UYn4UYQ-nTo)

- Window Management->Window Behavior->Advanced
    - Window placement: `Centered`
- Global Theme->Get new global themes
    - Search `mcmojave` to find `McMojave LAF`: install `01-com...McMojave.tar.xz`
    - Apply new theme
- Icons->Icons->Get new Icons
    - Search `la capitaine` to find `La Capitaine`: install `0.6.1`
    - Apply new icons
- Cursors->Get new cursors
    - Search `osx el cap` to find `OSX-ElCap-(KDE).tar.bz2`
    - Apply new cursors
- Application style->Application style->`Configure GNOME/GTK  application style...`->`Download new GNOME/GTK application styles...`->Choose GTK 3.x Themes
    - Search `mchigh` to find `McHigh Sierra`: install `Sierra-dark-solid-alt.tar.xz`
    - Select `Sierra-dark-solid-alt` for GTK2 theme and GTK3 theme
- Window decoration->Titlebar buttons
    - Remove all except `Minimize`, `Maximize` and `Close`
    - Move features on the left: `Close`, `Minimize`, `Maximize`
- Open `settings.ini` with **vim**: `vim ~/.config/gtk-3.0/settings.ini`

Original `settings`

```ini
[Settings]
gtk-application-prefer-dark-theme=1
gtk-button-images=1
gtk-cursor-theme-name=McMojave-cursors
gtk-decoration-layout=close,minimize,maximize:
gtk-enable-animations=1
gtk-font-name=Noto Sans,  10
gtk-icon-theme-name=McMojave-circle-dark
gtk-menu-images=1
gtk-primary-button-warps-slider=0
gtk-theme-name=Sierra-dark-solid-alt
gtk-toolbar-style=GTK_TOOLBAR_BOTH_HORIZ
```

New `settings`

```ini
[Settings]
gtk-application-prefer-dark-theme=false
gtk-button-images=1
gtk-cursor-theme-name=OSX-ElCap
gtk-fallback-icon-theme=la-capitaine-icon-theme
gtk-decoration-layout=close,minimize,maximize:
gtk-enable-animations=1
gtk-font-name=Noto Sans,  10
gtk-icon-theme-name=la-capitaine-icon-theme
gtk-menu-images=1
gtk-primary-button-warps-slider=0
gtk-theme-name=Sierra-dark-solid-alt
gtk-toolbar-style=GTK_TOOLBAR_BOTH_HORIZ
gtk-decoration-layout=close,minimize,maximize:menu
```

- Desktop behavior->Desktop effects->Search `blur`
    - On `Blur`, on the left full activate it with full blue checkbox, on the right, click on settings to open dialog
    - On dialog `Blur strength` to 75% and `Noise strength` to 0%
- Window management->KWin scripts->Get new scripts
    - Search `force`: install `Force blur`
    - Apply Force blur
- `sudo add-apt-repository ppa:papirus/papirus`, `sudo apt install -y qt5-style-kvantum`, launch Kvantum Manager
    - Select Change/delete theme, select KvMojave
    - Select Configure active theme, in `Hacks` toggle `Transparent menu title`, in `Compositing & general look`, `Reduce window opacity by` `5%`, `Reduce menu opacity by` `15%`

- Click right on task bar, add panel, empty panel
    - Place to the top, click on it to open Widgets panel, select get new Widgets
    - Search `clock`: install `Better inline clock`
    - Search `application title`: install `Application title`
    - Search `simple menu`: install `Simple menu` v1.0.12
    - Add widgets to top panel: `6:54` to `9:30`
- Install dock: `sudo apt install -y latte-dock`
    - Customize `9:55` to `12:50`
- From `13:44` `sudo vim /usr/share/sddm/themes/plasma-chili/Login.qml`

```qml
PlasmaComponents.TextField {
    id: passwordBox
    
    Layout.fillWidth: true
    Layout.minimumHeight: 21
    implicitHeight: usernameFontSize * 2.85
    font.pointSize: usernameFontSize * 0.8
    opacity: passwordFieldOutlined ? 0.75 : 0.5
    font.family: config.Font || "Noto Sans"
    placeholderText: config.PasswordFieldPlaceholderText == "Password" ? i18nd("plasma_lookandfeel_org.kde.lookandfeel", "Password") : config.PasswordFieldPlaceholderText
    focus: !showUsernamePrompt || lastUserName
    echoMode: TextInput.Password
    revealPasswordButtonShown: hidePasswordRevealIcon
    onAccepted: startLogin()

    style: TextFieldStyle {
        textColor: passwordFieldOutlined ? "white" : "black"
        placeholderTextColor: passwordFieldOutlined ? "white" : "black"
        passwordCharacter: config.PasswordFieldCharacter == "" ? "●" : config.PasswordFieldCharacter
        background: Rectangle {
            radius: 3
            border.color: "white"
            border.width: 1
            color: passwordFieldOutlined ? "transparent" : "white"
        }
    }
```

