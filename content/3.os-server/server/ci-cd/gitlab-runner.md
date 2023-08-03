---
title: GitLab Runner
---

# GitLab Runner

GitLab Runner is a service that runs jobs in CI/CD pipeline on your server. You can use shared runners from GitLab or install your own runner.

## Install GitLab Runner

You have to install GitLab Runner on your server. Find your version in this [the list](https://gitlab-runner-downloads.s3.amazonaws.com/latest/index.html), and find your architecture.


::alert{type="info"}
To find your architecture, you can use this command:

```bash
uname -a
```

Example

```bash [output]
Linux xxxxx 6.1.0-10-amd64 xxxxx x86_64 GNU/Linux
```

My architecture is `amd64`.

And to find distribution:

```bash
lsb_release -a
```

Example

```bash [output]
No LSB modules are available.
Distributor ID:	Debian
Description:	Debian GNU/Linux 12 (bookworm)
Release:	12
Codename:	bookworm
```

My OS is `Debian`, so I will select `deb` packages.
::

In my example, link is `https://gitlab-runner-downloads.s3.amazonaws.com/latest/deb/gitlab-runner_amd64.deb`

```bash
curl -LJO "https://gitlab-runner-downloads.s3.amazonaws.com/latest/deb/gitlab-runner_${arch}.deb"
```

Install GitLab Runner

```bash
sudo dpkg -i gitlab-runner_${arch}.deb
```

::alert{type="info"}
To update GitLab Runner, download again the package and install it.
::

```bash
sudo gitlab-runner install --user root
sudo gitlab-runner start
sudo gitlab-runner status
```

### Create a new runner on GitLab

Go to `Settings > CI/CD > Runners` and click on `Expand` button.

![gitlab-runner](/docs/gitlab-runner.webp)

After creating a new runner, you will see a token. You will need it to register your runner.

![gitlab-runner](/docs/gitlab-runner-02.webp)

### Register GitLab Runner

```bash
sudo gitlab-runner register
```

```bash [output]
Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com/):
https://gitlab.com/
```

```bash [output]
Please enter the gitlab-ci token for this runner:
xxxxxxxxxxxxxxxxxxxx
```

```bash [output]
Please enter the gitlab-ci description for this runner:
[xxx.xxx.xxx.xxx]: my-runner
```

```bash [output]
Please enter the executor: docker, docker-ssh, parallels, shell, ssh, virtualbox, docker+machine, kubernetes, custom, docker-ssh+machine, docker+machine (docker, docker-ssh, parallels, shell, ssh, virtualbox, docker+machine, kubernetes, custom, docker-ssh+machine, docker+machine):
docker
```

```bash [output]
Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!
```

Start GitLab Runner

```bash
sudo gitlab-runner start my-runner
```

### Commands

#### Start GitLab Runner

```bash
sudo gitlab-runner start
```

#### Check GitLab Runner status

```bash
sudo gitlab-runner status
```

#### Stop GitLab Runner

```bash
sudo gitlab-runner stop
```

#### Unregister GitLab Runner

```bash
sudo gitlab-runner unregister --all-runners
```
