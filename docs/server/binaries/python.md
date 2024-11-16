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
alias py-env="source ~/bin/venv/bin/activate"
alias py="source ~/bin/venv/bin/activate && python3"
EOF
```

And now you can activate the virtual environment by running:

```sh
py-env
```

Or run Python directly:

```sh
py
```

## Use scripts

Create a script file, like `hello.py`:

```python
print("Hello, World!")
```

Run the script:

```sh
py hello.py
```

## Install Python packages

Assure you are in the virtual environment:

```sh
py-env
```

Install packages using `pip`:

```sh
pip install <package>
```

## VSCode environment

For VSCode users, use `Shift+Ctrl+P` / `Shift+Cmd+P` and select `Python: Select Interpreter` to select local virtual environment, like `/Users/$USER/bin/venv/bin`.
