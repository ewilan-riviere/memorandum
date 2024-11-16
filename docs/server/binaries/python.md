---
title: Python
description: Python is a popular general-purpose programming language that is especially suited to web development.
---

# Python

{{ $frontmatter.description }}

## Install Python

```sh
sudo apt update -y
sudo apt -y install python3
```

## Create a virtual environment

```sh
sudo apt -y install python3-venv
mkdir -p ~/bin/venv
python3 -m venv ~/bin/venv
source ~/bin/venv/bin/activate
```

Add the following to your `.zshrc`:

```sh
<<EOF>> ~/.zshrc cat
alias py="source ~/bin/venv/bin/activate"
EOF
```

And now you can activate the virtual environment by running:

```sh
py
```
