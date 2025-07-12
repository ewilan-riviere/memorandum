---
title: GitLab Runner
description: GitLab Runner is a service that runs jobs in CI/CD pipeline on your server. You can use shared runners from GitLab or install your own runner.
---

# GitLab Runner

{{ $frontmatter.description }}

Documentation is [available here](https://docs.gitlab.com/runner) and [GitLab Runner binaries](https://gitlab-runner-downloads.s3.amazonaws.com/latest/index.html).

::: tip
You have repository runner and group runner. Repository runner is available only for this repository, group runner is available for all repositories in this group.

You can find your runners in `Settings > CI/CD > Runners` or in `Settings > Build > Runners`.

- Example for group: <https://gitlab.com/groups/GROUP/-/runners>
- Example for repository: <https://gitlab.com/GROUP/REPOSITORY/-/settings/ci_cd>
:::

## Install GitLab Runner

Documentation is [available here](https://docs.gitlab.com/runner/install/linux-repository/).

Add the official GitLab repository to your system.

```sh
curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh" | sudo bash
```

Install GitLab Runner.

```sh
sudo apt udpate
sudo apt install -y gitlab-runner-helper-images gitlab-runner
```

Now service is installed and running.

```sh
sudo systemctl status gitlab-runner
```

## GitLab Runner registration

Now go to your GitLab instance and choose any project. Go to `Settings` > `CI/CD` and expand `Runners` section.

::: info
Your runner will be available for all projects in your GitLab instance.
:::

Select `New project runner`

![gitlab-runner-new-runner](/docs/gitlab-runner-new-runner.jpg)

You will a new screen to config your runner.

::: info
I advice to check `Run untagged jobs` and pay attention to `Tags` field. You have to set tags used in your `.gitlab-ci.yml` file. In my example, my configs use often `deploy` and `test` tags. If a job has `deploy` tag, it will be executed by this runner, BUT if a job is tagged with `docker` tag, this runner will not execute it.
:::

![gitlab-runner-config](/docs/gitlab-runner-config.jpg)

```yml:.gitlab-ci.yml
# Tag used here is `deploy`, so this job will be executed by runner with `deploy` tag
stages:
  - deploy # This is a stage

deploy-job:
  stage: deploy # This is a job
```

When you finish, click on `Create runner`.

On new screen, keep `Linux` for the Operating systems and pay attention to the token. In this example, it's `glrt-s6u2ZR1xJNsMW4yUDhrR`, keep it for the next step.

![gitlab-runner-register](/docs/gitlab-runner-register.jpg)

## Configuration on server

Now, you have to register your runner on your server.

Copy `Step 1` from GitLab website command to register your runner on your server.

```sh
gitlab-runner register  --url https://gitlab.com  --token TOKEN
```

```sh:output
Enter the GitLab instance URL (for example, https://gitlab.com/):
```

I choose `https://gitlab.com/` because I use GitLab SaaS. If you use your own GitLab instance, you have to enter your URL.

```sh:output
Enter a name for the runner. This is stored only in the local config.toml file:
```

You can enter any name you want. I keep default name, it's hostname.

```sh:output
Enter an executor: ssh, docker, docker-autoscaler, custom, shell, docker-windows, docker+machine, kubernetes, instance, parallels, virtualbox:
```

I choose `docker` because I want to execute my jobs in Docker containers.

```sh:output
Enter the default Docker image (for example, ruby:2.7):
```

If you choose `docker` executor, you have to enter a default Docker image. I choose `alpine:latest`.

```sh:output
Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!

Configuration (with the authentication token) was saved in "/home/$USER/.gitlab-runner/config.toml"
```

## Enable Runner for project

Now, you have to enable your runner for your project.

Go to your project in GitLab, and go to `Settings` > `CI/CD` > `Runners`.

You will see your runner in the **Project runners** list, click on `Enable for this project`.

![gitlab-runner-enable](/docs/gitlab-runner-enable.jpg)

::: info
You can disable GitLab shared runners, to use only your runners. See right panel with **Instance runners** and uncheck `Enable instance runners for this project`.
:::

## Commands

### Start

```sh
sudo gitlab-runner start
```

### Status

```sh
sudo gitlab-runner status
```

### Stop

```sh
sudo gitlab-runner stop
```

### Unregister

```sh
sudo gitlab-runner unregister --all-runners
```

## Tips

### Deploy from GitLab CI/CD

To deploy your project from GitLab CI/CD, you have to add your SSH key to your GitLab project.

- In `before_script` step, you have to add your SSH key to the runner
- In `script` step, you can deploy your project

::: info
To know more about GitLab CI/CD variables, check [this guide](/server/ci-cd/gitlab-ci#variables).
:::

We take an example with this base `.gitlab-ci.yml` file:

```yml:.gitlab-ci.yml
stages:
  - deploy

deploy-job:
  stage: deploy
  image: node:20.16.0
  before_script:
  script:
  only:
    - main
```

#### SSH key

In this part, you have to add your SSH key to your GitLab project. You have to add three variables:

::: tip
Create a dedicated SSH key for your runner, don't use your personal SSH key. Keep your current SSH key in a safe place, and create a new one for your runner.

```sh
ssh-keygen -t ed25519
```

Rename it

```sh
mv ~/.ssh/id_ed25519 ~/.ssh/id_ed25519_gitlab
mv ~/.ssh/id_ed25519.pub ~/.ssh/id_ed25519_gitlab.pub
```

Allow public key `~/.ssh/id_ed25519_gitlab.pub` on your runner server

```sh
echo "ssh-ed25519 YoUr-PuBliC-KeY gitlab@your-device" >> ~/.ssh/authorized_keys
```

And add private key `~/.ssh/id_ed25519_gitlab` to your GitLab CI/CD Variables (with prefix and suffix).

:::

- `SSH_PRIVATE_KEY`: Your SSH **private** key
- `SSH_PORT`: Your SSH port, like `22`
- `SSH_IP`: Your SSH IP, like `123.456.789.0`

::: tip
To avoid to repeat your variables, you can add them as group variables, to know more about group variables, check [this guide](/server/ci-cd/gitlab-ci#group-variables).
:::

```yml:.gitlab-ci.yml
  before_script:
    - "command -v ssh-agent >/dev/null || ( apk add --update openssh )"
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
    - ssh-keyscan -p $SSH_PORT $SSH_IP >> ~/.ssh/known_hosts
    - chmod 644 ~/.ssh/known_hosts
    - apt-get update -qq && apt-get install -y -qq sshpass
    - apt-get install -y -qq rsync
```

Now, your SSH key is added to your runner, and your runner can clone your project, private or public.

::: info
In this example, I add `rsync` to my runner to deploy my project.
:::

#### Build

In this part, you have to build your project. In this example, we use a [Memorandum](https://gitlab.com/kiwilan/memorandum), a Vitepress project.

In these steps, we clone the project, install dependencies and build the project.

```yml:.gitlab-ci.yml
  before_script:
    - echo "Checkout..."
    - git clone https://gitlab.com/kiwilan/memorandum.git
    - cd memorandum
    - npm install -g pnpm
    - pnpm i
    - echo "Building..."
    - pnpm build
```

#### Deploy

In this part, you have to deploy your project.

- We use `rsync` to copy the `dist` folder to our server.
- We use `ssh` to connect to our server and pull the project.

::: info Why don't build on the server?
You can build your project directly on your server, but it will take some seconds and during this time, your site will be down. With current method, your site will receive the new version only when the build is finished.
:::

```yml:.gitlab-ci.yml
  script:
    - rsync -azPhhr -e "ssh -p $SSH_PORT" .vitepress/dist $SSH_USER@$SSH_IP:/home/$SSH_USER/www/$CI_PROJECT_NAME/.vitepress/dist-$CI_JOB_ID
    - ssh -p $SSH_PORT $SSH_USER@$SSH_IP "
      . ~/.zshrc &&
      cd /var/www/$CI_PROJECT_NAME &&
      git pull
```

::: info
The `$CI_JOB_ID` variable is available in GitLab CI/CD. You can find a list of predefined variables here: <https://docs.gitlab.com/ee/ci/variables/>.
:::

#### Complete `.gitlab-ci.yml`

```yml:.gitlab-ci.yml
stages:
  - deploy

deploy-job:
  stage: deploy
  image: node:20.16.0
  before_script:
    - "command -v ssh-agent >/dev/null || ( apk add --update openssh )"
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
    - ssh-keyscan -p $SSH_PORT $SSH_IP >> ~/.ssh/known_hosts
    - chmod 644 ~/.ssh/known_hosts
    - echo "Installing dependencies..."
    - apt-get update -qq && apt-get install -y -qq sshpass
    - apt-get install -y -qq rsync
    - echo "Checkout..."
    - git clone https://gitlab.com/kiwilan/memorandum.git
    - cd memorandum
    - npm install -g pnpm
    - pnpm i
    - echo "Building..."
    - pnpm build
  script:
    - rsync -azPhhr -e "ssh -p $SSH_PORT" .vitepress/dist $SSH_USER@$SSH_IP:/home/$SSH_USER/www/$CI_PROJECT_NAME/.vitepress/dist-$CI_JOB_ID
    - ssh -p $SSH_PORT $SSH_USER@$SSH_IP "
      . ~/.zshrc &&
      cd /var/www/$CI_PROJECT_NAME &&
      git pull &&
      docker exec $DOCKER_CONTAINER rm -rf /usr/share/nginx/html/node_modules &&
      docker exec $DOCKER_CONTAINER rm -rf /usr/share/nginx/html/.vitepress/dist &&
      docker cp .vitepress/dist-$CI_JOB_ID/dist $DOCKER_CONTAINER:/usr/share/nginx/html/.vitepress/dist &&
      docker restart $DOCKER_CONTAINER &&
      rm -rf .vitepress/dist-$CI_JOB_ID &&
      docker logs $DOCKER_CONTAINER
  only:
    - main
```
