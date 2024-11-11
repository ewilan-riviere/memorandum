---
title: "Setup"
description: "Setup LaTeX"
position: 1
category: "Latex"
---

## Windows

```sh
sudo scoop install latex
```

Update **Environnement System Variables**, **User variables**, in **Path** add new line

```ps1
C:\Users\USERNAME\scoop\apps\latex\current\texmfs\install\miktex\bin\x64
```

This line allow access to binaries like for xetex.

Uncheck `Always show this dialog`

## Linux

LaTeX with xetex engine and Pandoc

```sh
sudo apt install -y texlive texlive-xetex pandoc
```

Extra usefull packages

```sh
sudo apt install -y texlive-lang-french texlive-latex-extra
```

Full installation

```sh
sudo apt install -y texlive-full
```

## Linux

- [**latex-project.org**](https://www.latex-project.org)
- [**doc.ubuntu-fr.org/latex**](https://doc.ubuntu-fr.org/latex)
- [**itsfoss.com/latex-editors-linux**](https://itsfoss.com/latex-editors-linux)

```sh
sudo apt -y update ; sudo apt -y install texlive
```

```sh
sudo add-apt-repository ppa:lyx-devel/release ; sudo apt update ; sudo apt -y install lyx
```

```sh
sudo apt -y install pandoc
```
