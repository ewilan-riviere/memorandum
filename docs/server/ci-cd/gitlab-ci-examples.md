---
title: GitLab CI Examples
description: GitLab CI/CD Examples
---

# GitLab CI Examples

{{ $frontmatter.description }}

**GitLab variables**

- `CI_PROJECT_NAME`: project's name, like `memorandum` in `https://gitlab.com/kiwilan/memorandum.git`
- `CI_JOB_ID`: ID of CI, useful to create a `dist` directory with random name

**Group variables**

- `GITLAB_SSH_PRIVATE_KEY`: SSH private key associated to group allowed to access to server
- `MAIN_SSH_PORT`: server SSH port, like `22`
- `MAIN_IP`: server IP address
- `MAIN_USER`: server deploy user

**Project variables**

- `DOCKER_CONTAINER`: name of Docker container to deploy

## Build inside

```yaml
variables:
  DOCKER_IMAGE: "alpine:3.23.0"

stages:
  - deploy

deploy-job:
  stage: deploy
  image: $DOCKER_IMAGE
  before_script:
    - apk add --no-cache openssh-client sshpass
    - eval $(ssh-agent -s)
    - echo "$GITLAB_SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh && chmod 700 ~/.ssh
    - ssh-keyscan -p $MAIN_SSH_PORT $MAIN_IP >> ~/.ssh/known_hosts && chmod 644 ~/.ssh/known_hosts

  script:
    - ssh -p $MAIN_SSH_PORT $MAIN_USER@$MAIN_IP "
      . ~/.zshrc &&
      cd /var/www/$CI_PROJECT_NAME &&
      git pull &&
      docker compose down &&
      docker compose up -d --build &&
      notifier discord '$CI_PROJECT_TITLE deployed'"
  only:
    - main
```

## Build outside

Setup `ssh` with `rsync`, external build of project and replace static files inside container.

```yml
variables:
  DOCKER_IMAGE: "node:20.15.0"

stages:
  - deploy

deploy-job:
  stage: deploy
  image: $DOCKER_IMAGE
  before_script:
    - "command -v ssh-agent >/dev/null || ( apk add --update openssh )"
    - eval $(ssh-agent -s)
    - echo "$GITLAB_SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
    - ssh-keyscan -p $MAIN_SSH_PORT $MAIN_IP >> ~/.ssh/known_hosts
    - chmod 644 ~/.ssh/known_hosts
    - echo "Installing dependencies..."
    - apt-get update -qq && apt-get install -y -qq sshpass
    - apt-get install -y -qq rsync
    - echo "Setup..."
    - git clone https://gitlab.com/kiwilan/memorandum.git
    - cd memorandum
    - npm install -g pnpm
    - pnpm i
    - echo "Building..."
    - pnpm build
    - echo "Deploying..."
  script:
    - rsync -azPhhr -e "ssh -p $MAIN_SSH_PORT" docs/.vitepress/dist $MAIN_USER@$MAIN_IP:/home/$MAIN_USER/www/$CI_PROJECT_NAME/dist-$CI_JOB_ID
    - rsync -azPhhr -e "ssh -p $MAIN_SSH_PORT" node_modules $MAIN_USER@$MAIN_IP:/home/$MAIN_USER/www/$CI_PROJECT_NAME/node_modules-$CI_JOB_ID
    - ssh -p $MAIN_SSH_PORT $MAIN_USER@$MAIN_IP "
      . ~/.zshrc &&
      cd /var/www/$CI_PROJECT_NAME &&
      git pull &&
      docker exec $DOCKER_CONTAINER rm -rf /app/node_modules &&
      docker exec $DOCKER_CONTAINER rm -rf /app/docs/.vitepress/dist &&
      docker cp dist-$CI_JOB_ID/dist $DOCKER_CONTAINER:/app/docs/.vitepress/dist &&
      docker cp node_modules-$CI_JOB_ID/node_modules $DOCKER_CONTAINER:/app/node_modules &&
      docker restart $DOCKER_CONTAINER &&
      rm -rf dist-$CI_JOB_ID &&
      rm -rf node_modules-$CI_JOB_ID &&
      docker logs $DOCKER_CONTAINER &&
      notifier discord '$CI_PROJECT_TITLE deployed'"
  only:
    - main
```
