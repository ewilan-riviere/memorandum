---
title: Setup on M1
description: 'Homebrew, Node.js, and all the goodies'
position: 2
category: 'MacOS'
---

By [Richard So](https://richardso21.medium.com/?source=post_page-----cfdb2daeed2d--------------------------------) on [codeburst.io](https://codeburst.io/my-ultimate-m1-mac-developer-setup-cfdb2daeed2d)

The M1 Apple product lineup is all the hype nowadays, and it’s well deserved. With up to [3.5 times the CPU performance with only a quarter of power consumption](https://www.apple.com/mac/m1/) compared to previous devices, Apple finally convinced me to commit the switch to macOS with their new MacBook Pro 13-inch.

> **_Yet, there are a few problems…_**

1. I’ve never owned a Mac in my life.
2. (More urgently) The new M1 chip is [ARM-based](https://en.wikipedia.org/wiki/ARM_architecture).

_What’s wrong with that?_ **Virtually all software had previously been built only on the x86–64 architecture**, meaning program compatibility is at the mercy of the developers or at Apple’s compatibility layer, Rosetta 2.

As an avid programmer who [relies on apps to make apps](/5-underrated-apps-for-programmers-you-should-use-right-now-738388693169), this issue is exacerbated. Regardless, I’ve managed to jump through numerous hoops to get my fresh **M1 Mac prepped up for most types of development**. The burning question is **_how_**?

> _This article is a guide for properly setting up a development environment on_ macOS systems running the new M1 chip_, based on my own experience. Split to numbered sections, with_ **_installation instructions for the dev tool up front and block quoted_**_, the guide is set to have you up and running ASAP! Each section will also have a small description for those who are new to the macOS developer ecosystem._
>
> _There are_ **_no vague install scripts_**_, just clear-cut steps to know exactly what you’re doing throughout the process._ **With that said, enjoy!**

## Step 0) Rosetta 2

> _Run_ `**/usr/sbin/softwareupdate --install-rosetta --agree-to-license**` _on the_ **_terminal_** _(open using spotlight search or launchpad)._

As I mentioned before, Rosetta 2 is an x86–64 compatibility layer developed by Apple so you can install and run apps that haven’t been ported to ARM yet. You’ll need this eventually, even if you’re not a developer (software such as much of the Adobe suite rely on Rosetta at the time of writing).

## 1) The Xcode CLT

![](https://miro.medium.com/max/520/1*8SaCjBI9YdIC_9kyPGA1oA.png)

> _On your terminal, run_ `**_xcode-select --install_**`_. You’ll need to rerun this command for every system update._

Some goodies I include in this guide have the Xcode Command Line Tools (CLT) as a dependency. Crucial developer tooling also comes with this installation, most notably `git`. _FYI: You_ **_don’t_** _have to install Xcode from the App Store._

## 2) Homebrew

> **_NOTE:_** **Not all homebrew packages support the M1 chip**, so you will need to install two versions of Homebrew (one running natively, and another over Rosetta).
>
> _Paste and_ **_run this command on the terminal_** _to install homebrew:_

/bin/bash -c "$(curl -fsSL [https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh](https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh))"

> _Then,_ **_make a “Rosetta” version of your terminal_** _with the following directions (or watch the GIF below):_
>
> _Go to your “Applications” folder on Finder → right click_ `_Terminal_` _in the “Utilities” folder →_ `_Duplicate_` _→ rename to “Rosetta Terminal” →_ `_Get Info_` _→_ `_Open using Rosetta_`
>
> _Finally,_ **_run the command again on the Rosetta version_** _of your terminal._

![](https://miro.medium.com/max/1600/1*tOL98VeOe10If22z1rzVKg.gif)

A GIF showing the steps to make a “Rosetta” duplicate of your terminal.

Homebrew should be a must-have for macOS developers. It’s a package manager, much like `pacman` ,`apt-get` , or `chocolatey` from various Linux distributions or Windows. It allows you access to tools otherwise inaccessible and is a more streamlined alternative to downloading disk image files or installing apps from the App Store.

## 3) iTerm 2

![](https://miro.medium.com/max/512/0*weLHeLzAWx7YizKr.png)

> _Install it using homebrew on your_ **_native_** _terminal using the following command:_ `**_brew install --cask iterm2_**`

iTerm 2 is one of the best terminal emulators you can get for macOS. It’s like a huge extension pack for the default terminal, supporting color themes, tabbed and split panes, tight integration with `tmux`, and so much more.

## 4) Zsh and Oh-My-Zsh

![](https://miro.medium.com/max/3328/1*kqijhIQ81fsaeGyn_8GpRw.png)

iTerm2 + Zsh + powerlevel10k = Awesomeness

Zsh is the default terminal shell that comes with macOS. It would have been my preferred shell anyways, especially for its extensibility.

### Oh My Zsh (oh-my-zsh)

> _Run the following command under iTerm, then go through any prompts:_

sh -c "$(curl -fsSL <https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh>)"

“**_Oh My Zsh will not make you a 10x developer…but you may feel like one._**” Oh My Zsh simplifies the process of getting plugins/themes a whole lot, allowing you to add and configure them easily in your `~/.zshrc` file.

### Notable Zsh Plugins + Themes

> _Below are some all-time favorite plugins and themes to use for the Zsh shell._ **_Read through their READMEs_** _to see what each one does and investigate its installation instructions._

* `[**zsh-autosuggestions**](https://github.com/zsh-users/zsh-autosuggestions)` is exactly what the name entails: it’s a powerful plugin that suggests commands as you type based on your history in the terminal.
* `[**zsh-syntax-highlighting**](https://github.com/zsh-users/zsh-syntax-highlighting)` brings basic bash script syntax coloring support to the Zsh terminal. With this, you’ll be able to spot mistypes before running commands.
* `[**powerlevel10k**](https://github.com/romkatv/powerlevel10k)` is an awesome-looking theme for Zsh which can actually [make your shell faster](https://github.com/romkatv/powerlevel10k#instant-prompt)!

### Configuring ~/.zshrc

At this point, you may have already made multiple changes to your `**~/.zshrc**` file to install plugins/themes. Here are some more one-liner **suggestions you should add to the end of this file** to fine-tune your Zsh shell on macOS:

* `**alias brewr="arch -x86_64 /usr/local/bin/brew $@**`This allows you to run your non-native version of homebrew without using the “Rosetta” terminal. Just use `brewr` in place of `brew` if you run to installation compatibility issues.
* `**alias leg="arch -x86_64 $@**` Similar to the previous suggestion, this line allows you to run any command-line tools emulated by the Rosetta compatibility layer. Niche, but may come in handy in the future.
* `**bindkey -v ; export KEYTIMEOUT=1**` Enables Vim bindings on Zsh. It’s completely up to you, but know that [I’m a huge fan of Vim](https://towardsdatascience.com/how-to-vim-b1719c67f76a).

## 5) Programming Languages

I’ve personally configured my M1 Mac system for JavaScript and Python development so far, and will detail both setups below. If you don’t primarily use these languages, feel free to skip this section. If you want to laugh at me for being a [Soydev](https://www.urbandictionary.com/define.php?term=Soydev), go right ahead!

### 5.1) NVM and Node.js

![](https://miro.medium.com/max/512/0*eBbzE_gqwqErGa6o.png)

> **_NOTE:_ Do not use Homebrew to install NVM.** Node.js will run on Rosetta (not natively) as a result.
>
> **_Install_** _Node Version Manager (NVM) using the following_ **_command_**_:_

curl -o- [https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh](https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh) | bash

> _Follow any directions as stated by the installer (e.g. editing the_ `_~/.zshrc_` _file). Then, install a fresh version of Node.js by running_ `**_nvm install node_**`_._

Node Version Manager (NVM) is a tool to manage Node.js installs within your system, hence the name. NVM has become the primary method of installing Node to power your JavaScript projects.

### 5.2) Python

![](https://miro.medium.com/max/512/0*WfwbAdgzz__9Fl8e.png)

> _Run_ `**_brew install miniconda_**` _(or_ `**_brew install anaconda_**` _if you prefer)._

Apple’s macOS does come with Python (`python` and `python3`). However, a noticeable amount of Python libraries is **not compatible with the M1 chip** at the time of writing (such as `pandas`). Instead, install Miniconda, a stripped-down version of Anaconda that can manage multiple Python environments. **Miniconda’s/Anaconda’s Python will run on Rosetta.**

Here’s a very comprehensive article summing up the remarkable performance of the new M1 chip on Python for Data Science tasks:

## 6) IDEs and Text Editors

Luckily, my best suggestions for an IDE or text editor are already natively supported on M1 silicon. Together, both cover cover most programming languages you’ll ever need.

### 6.1) Visual Studio Code

![](https://miro.medium.com/max/2478/1*mF9iOhsJULoxGMXwHrAeXA.png)

> _Run_ `**_brew install --cask visual-studio-code_**` _instead of going to the official website to flex your having homebrew._

Based on my previous article, it’s a no-brainer including this here. If you want to read why VSCode is such a viable/capable text editor, read it here:

### 6.2) The JetBrains Suite

![](https://miro.medium.com/max/3936/1*jgEgOnn6gG2E6sye9DZZ9Q.png)

> _Run_ `**_brew install --cask jetbrains-toolbox_**`_, then install your needed IDEs from JetBrains Toolbox._ **Personal preference: don’t let it run on login.**

My previous article also criticized how slow JetBrains’s IDEs can be at times, especially during startup. Good thing that won’t be a problem with the M1 silicon chip! While still being heavier than VSCode, it compensates this with far superior auto-complete and many more features out-of-the-box. After all is said, **I recommend to have both VSCode and JetBrains Toolbox to cover all your bases.**

## Conclusion

**Well, there you have it!** With these 7 steps, you’ll be able to turn your new M1 device into a full-fledged programming/development environment in no time. Have fun with it, and _stay tuned for a list of unique macOS utilities you should install!_
