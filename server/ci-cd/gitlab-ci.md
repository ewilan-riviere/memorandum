---
title: GitLab CI
description: GitLab CI/CD deployment
---

# GitLab CI

{{ $frontmatter.description }}

## Run Docker instance

GitLab CI use Docker container to run jobs. To deploy on your server, you have to create a SSH key for GitLab CI.

You can create a local Docker `alpine:latest` to test CI.

```sh
docker pull alpine:latest
```

Run with interactive mode

```sh
docker run -it alpine:latest sh
```

Init SSH

```sh
command -v ssh-agent >/dev/null || ( apk add --update openssh )
eval $(ssh-agent -s)
```

### Create SSH key

```sh
ssh-keygen -t ed25519
```

Now you can add the public key **to your server** `~/.ssh/authorized_keys` file.

```sh
cat ~/.ssh/id_ed25519.pub
```

And private key to GitLab CI/CD Variables.

```sh
cat ~/.ssh/id_ed25519
```

### Test CI

Set variables:

```sh
SSH_IP=xxx.xxx.xxx.xxx
SSH_USER=linux_user_on_your_server
SSH_PRIVATE_KEY=`cat ~/.ssh/id_ed25519`
```

Setup SSH

```sh
echo -e "${SSH_PRIVATE_KEY}" | tr -d '\r' | ssh-add - > /dev/null
mkdir -p ~/.ssh
chmod 700 ~/.ssh
ssh-keyscan 168.119.97.151 >> ~/.ssh/known_hosts
chmod 644 ~/.ssh/known_hosts
```

Test SSH

```sh
ssh -${SSH_USER}@${SSH_IP}
```

If it works, you can exit.

```sh
exit
```

## GitLab CI/CD Variables

You can find variables in `Settings > CI/CD > Variables`.

::: info
You have two ways to set variables:

- **Project variables** are available only for this project.
- **Group variables** are available for all projects in this group.

::

![gitlab-ci](/docs/gitlab-ci.webp)

## GitLab CI/CD Pipeline

Now you can create a `.gitlab-ci.yml` file at the root of your project.

```yaml [.gitlab-ci.yml]
# A pipeline is composed of independent jobs that run scripts, grouped into stages.
# Stages run in sequential order, but jobs within stages run in parallel.
#
# For more information, see: https://docs.gitlab.com/ee/ci/

stages:
  - deploy

variables:
  NODE_VERSION: 18.17.0

deploy-job:
  stage: deploy
  image: alpine:latest
  before_script:
    - "command -v ssh-agent >/dev/null || ( apk add --update openssh )"
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
    - ssh-keyscan $SSH_IP >> ~/.ssh/known_hosts
    - chmod 644 ~/.ssh/known_hosts
  script:
    - ssh $SSH_USER@$SSH_IP "
      . ~/.zshrc &&
      cd ~/www/$CI_PROJECT_NAME &&
      git pull &&
      ~/.nvm/versions/node/v$NODE_VERSION/bin/pnpm i &&
      ~/.nvm/versions/node/v$NODE_VERSION/bin/pnpm generate &&
      notifier '$CI_PROJECT_TITLE deployed'"
  only:
    - main
```

- `$CI_PROJECT_NAME` and `$CI_PROJECT_TITLE` are [predefined variables](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html) from GitLab CI.
- `$NODE_VERSION` is a custom variable for this project only, defined in `variables:` section.
- `$SSH_PRIVATE_KEY`, `$SSH_IP` and `$SSH_USER` are custom variables, defined in `Settings > CI/CD > Variables`.
- `. ~/.zshrc` allow to load zsh config file.
- `~/.nvm/versions/node/v$NODE_VERSION/bin/pnpm` is the path to pnpm binary.
- `notifier` is a custom script with `go` to send notification to Discord, you can find it here [notifier](https://gitlab.com/kiwilan/notifier)

Now you can install your own runner on your server with [this guide](/server/ci-cd/gitlab-runner).
