---
title: "Setup"
description: 'Setup LaTeX'
position: 1
category: 'Latex'
---

## Windows

```bash
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

```bash
sudo apt install -y texlive texlive-xetex pandoc
```

Extra usefull packages

```bash
sudo apt install -y texlive-lang-french texlive-latex-extra
```

Full installation

```bash
sudo apt install -y texlive-full
```
