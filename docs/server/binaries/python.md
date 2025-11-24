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
# For Ubuntu/Debian systems
sudo apt -y install python3-venv
```

```sh
# Create a virtual environment in your home directory
python3 -m venv ~/venv_python
# Activate the virtual environment
source ~/venv_python/bin/activate
```

Add the following to your `.zshrc`:

```sh
alias python="python3"
alias py-env="source ~/venv_python/bin/activate"
alias py="source ~/venv_python/bin/activate && python3"
```

Source the `.zshrc`:

```sh
source ~/.zshrc
```

And now you can activate the virtual environment by running:

```sh
py-env
```

Or run Python directly:

```sh
py
```

## Upgrade pip

```sh
pip install --upgrade pip
```

## Use scripts

Create a script file, like `hello.py`:

```py:hello.py
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

For VSCode users, use `Shift+Ctrl+P` / `Shift+Cmd+P` and select `Python: Select Interpreter` to select local virtual environment, like `/Users/$USER/venv_python/bin/python`.
