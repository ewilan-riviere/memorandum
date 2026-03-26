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
brew unlink python@3.14 && brew link python@3.14 --force --overwrite
```

:::

### Check Python installation

```sh
python --version
```

In some cases, old Python version can take priority on new version:

```sh:output
Python 3.9.6
```

Here a solution for macOS with Homebrew:

::: tip
Adapt path if your OS is Linux.
:::

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

### Install `uv`

[`uv`](https://github.com/astral-sh/uv) is an extremely fast Python package and project manager, written in Rust.

This replaces `pip`, but more importantly, this CLI allows for better management of Python environments. In the rest of this guide, `uv` will be used, so it is recommended that you install it.

Follow [these instructions](https://github.com/astral-sh/uv?tab=readme-ov-file#installation):

::: code-group

```sh [macOS and Linux]
curl -LsSf https://astral.sh/uv/install.sh | sh
```

```sh [Windows]
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

:::

You can now uses `uv` command.

## Virtual environment

### Global `.venv`

Python uses a virtual environment to run, so you only need to create it once globally:

```sh
python3 -m venv ~/.venv
```

And you'll need to enable it this way (and do so every time):

```sh
source ~/.venv/bin/activate
```

The output in your terminal will indicate that the Python environment is active:

```sh:output
(.venv) # <- Python ~/.venv is enabled
user@debian ~
$
```

### Local `.venv`

Of course, a global Python environment is only recommended for installing a CLI globally, for example, but not for each individual project.

The goal is to keep each project and its dependencies isolated in order to minimize the risk of version conflicts.

#### Generate `.venv`

In each project, you can now uses `uv` to easily isolate your projects:

```sh
├── pyproject.toml
├── README.md
├── requirements.txt
├── src
├── tests
```

In this project, you can execute `uv` to create a local `venv`:

```sh
uv venv
```

The local Python environment has been created

```sh:output
Using CPython 3.12.13
Creating virtual environment at: .venv
Activate with: source .venv/bin/activate
```

The Python version depends either on the `.python-version` file, which takes precedence if it exists, or on the version specified in the `pyproject.toml` file:

```sh:.python-version
3.12
```

```toml:pyproject.toml
[project]
requires-python = ">=3.12"
```

::: tip Override
You can override these settings using these commands:

```sh
# Setup with Python 3.12
uv venv --python 3.12
```

```sh
# Install and setup with Python 3.12
uv python install 3.12
```

:::

#### Package manager

To help Python to understand package manager used:

```toml:pyproject.toml
[tool.deptry.package_module_name_map]
uv = "uv"
```

#### Dependencies

To handle dependencies from `pyproject.toml`, like this (and lock libraries versions):

```toml:pyproject.toml
dependencies = [
  "python-dotenv",
  "httpx",
  "rich",
]
```

You can `sync` with `uv`:

```sh
uv sync
```

::: tip Cross-compatible
To handle cross-compatibility with `pip` for legacy:

```sh
uv export --format requirements-txt > requirements.txt
```

You don't have to edit manually `requirements.txt`, let `uv` override it when needed.

:::

Now `uv.lock` will represents dependencies.

## `pyproject.toml`

Full example:

```toml
[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[project]
name = "mycli"
version = "0.1.0"
description = "My Python CLI"
readme = "README.md"
authors = [{ name = "Author" }]
requires-python = ">=3.12"

dependencies = [
  "python-dotenv",
  "httpx",
  "rich",
]

[project.scripts]
mycli = "mycli.app:main"

[project.optional-dependencies]
dev = ["pytest~=8.0.0", "pytest-cov", "uv>=0.5.0"]

[tool.setuptools]
package-dir = { "" = "src" }

[tool.deptry]
known_first_party = ["mycli"]

[tool.deptry.per_rule_ignores]
DEP002 = ["pytest", "pytest-cov", "uv"]

[tool.deptry.package_module_name_map]
uv = "uv"

[dependency-groups]
dev = ["pytest-cov>=7.0.0"]
```

## Useful alias

You can add these alias to `~/.zshrc`:

```sh:~/.zshrc
export PATH="/opt/homebrew/opt/python@3.14/bin:$PATH" # macOS
export PATH="$HOME/.venv/bin:$PATH" # global CLI
alias python="python3"
alias py-global="source ~/.venv/bin/activate" # global python venv
alias va="source .venv/bin/activate" # local python venv
alias ur="uv run" # shortcut for uv run
```

```sh
source ~/.zshrc
```

You can now enable local environment with `va` command and use `ur` shortcut for `uv run`.

```sh
ur pytest
```

## Execute

```sh
uv run python main.py
```

## Tests

```sh
├── pyproject.toml
├── README.md
├── src
├── tests
│   ├── __init__.py
│   ├── book
│   │   ├── __init__.py
│   │   └── test_book.py
│   ├── pack
│   │   ├── __init__.py
│   │   ├── test_pack.py
│   │   └── test_unpack.py
│   └── test_files.py
└── uv.lock
```

To use `pytest` with `uv`:

```toml:pyproject.toml
[project.optional-dependencies]
dev = ["pytest~=8.0.0"]
```

::: tip
You can allow `dev` dependencies to be sync:

```sh
uv sync --extra dev
```

:::

Now you can execute tests:

```sh
uv run pytest
```

### Options

You can print output with `-s` flag and enable verbose with `-v` flag:

```sh
uv run pytest -s -v
```

You can execute specific test

```sh
uv run pytest -s ./tests/book/test_book.py
```

You can execute specific method in test

```sh
uv run pytest -s ./tests/book/test_book.py
```

## More

### Check loaded `venv`

```sh
which python3
```

### `deptry`

[`deptry`](https://deptry.com/) is a command line tool to check for issues with dependencies in a Python project, such as unused or missing dependencies. It supports projects using Poetry, pip, PDM, uv, and more generally any project supporting PEP 621 specification.

### `deactivate`

You can disable a virtual environment with:

```sh
deactivate
```

### Global CLI

You can install CLI globally:

```sh
uv pip install .
```

And you can allow editable mode:

```sh
uv pip install -e .
```

### direnv

<https://direnv.net/>

`direnv` is an extension for your shell. It augments existing shells with a new feature that can load and unload environment variables depending on the current directory.

### VSCode

For VSCode users, use `Shift+Ctrl+P` / `Shift+Cmd+P` and select `Python: Select Interpreter` to select local virtual environment, like `/Workspace/project/.venv/bin/python`.

```json:.vscode/settings.json
{
  "python.venvFolders": [".venv", "venv", "env"],
  "pylint.importStrategy": "fromEnvironment",
  "python.analysis.typeCheckingMode": "basic",
}
```
