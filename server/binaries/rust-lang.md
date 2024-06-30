---
title: Rust
description: How to install Rust on your system.
---

# Rust

{{ $frontmatter.description }}

## Install

You can check [official guide](https://www.rust-lang.org/tools/install) for more information.

Download installer and press `Enter` to install Rust with default settings.

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Press `Enter` to continue.

```sh:output
1) Proceed with standard installation (default - just press enter)
2) Customize installation
3) Cancel installation
>
```

After successful installation, you will see this message.

```sh:output
To get started you may need to restart your current shell.
This would reload your PATH environment variable to include
Cargo's bin directory ($HOME/.cargo/bin).
```

So you need to restart your shell, you can just exit SSH session and reconnect.

## Commands

### Version

Check Rust version.

```sh
rustc -vV
```

### Cargo

You can use `cargo` to manage Rust packages like installing, compiling, running, updating, and more.

```sh
cargo --version
```

### Update

You can update Rust with `rustup`.

```sh
rustup update
```

### Uninstall

You can uninstall Rust with `rustup`.

```sh
rustup self uninstall
```

## Errors

If you have an error like `rustc: command not found`, you can check if `cargo` is in `~/.zshrc`.

```sh
cat ~/.zshrc
```

If it's not there, you can add it.

```sh
vim ~/.zshrc
```

```sh [~/.zshrc]
export PATH=$HOME/.cargo/bin:$PATH
```

```sh
source ~/.zshrc
```
