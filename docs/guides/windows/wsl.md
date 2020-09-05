# Windows Subsytem for Linux

- [**blog.eleven-labs.com/developpement-sous-linux-depuis-windows-avec-wsl*](https://blog.eleven-labs.com/fr/le-developpement-sous-linux-depuis-windows-10-avec-wsl-2/)
- [**korben.info/installer-wsl2-windows-linux**](https://korben.info/installer-wsl2-windows-linux.html)
- [**korben.info/linux-wsl-gui-interface-graphique-windows*](https://korben.info/linux-wsl-gui-interface-graphique-windows-10.html)

List all distros with *state* adn *version*

```bash
wsl --list --verbose
```

```bash
  NAME      STATE           VERSION
* Ubuntu    Running         2
```

## WSL 2

:::tip Required

You need to have Windows 10 update 2004 before execute below commands.

:::

To install WSL 1 and download [**Ubuntu**](https://www.microsoft.com/en-US/p/ubuntu/9nblggh4msv6#activetab=pivot:overviewtab) from Windows Store for example.

```bash
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all
```

:::warning

Install any Linux distro with Windows Store and reboot after this.

:::

To switch to WSL 2

```bash
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all
```

:::warning

Reboot after this.

:::

And install [**Linux Kernel**](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi) from Microsoft

Convert distros to WSL 2

```bash
wsl --set-default-version 2
```

Check distros

```bash
wsl --list --verbose
```

:::tip Force WSL 2

```bash
wsl --set-version ubuntu 2
```

:::
