---
title: Python
description: Python is a popular general-purpose programming language that is especially suited to web development.
---

# Python

{{ $frontmatter.description }}

## Install Python

::: code-group

```sh [Debian/Ubuntu]
sudo apt update -y
sudo apt -y install python3
sudo apt -y install python3-venv
```

```sh [macOS]
brew install python@3.14
brew link python@3.14 --force --overwrite
```

:::

## Check Python version

```sh
python --version
```

In some cases, old Python version can take priority on new version:

```sh:output
Python 3.9.6
```

Here a solution for macOS with Homebrew:

```sh:~/.zshrc
export PATH="/opt/homebrew/opt/python@3.14/bin:$PATH"
```

Reload your `PATH`:

```sh
source ~/.zshrc
python --version
```

Now Python v3.14 by Homebrew will be used. If not works, check where is your Python version:

```sh
which python3
# OR
which python
```

## Create a virtual environment

```sh
# Create a virtual environment in your home directory
python3 -m venv ~/venv_python
# Activate the virtual environment
source ~/venv_python/bin/activate
```

Add the following to your `.zshrc`:

```sh
# export PATH="/opt/homebrew/opt/python@3.14/bin:$PATH" # in some cases for macOS
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
