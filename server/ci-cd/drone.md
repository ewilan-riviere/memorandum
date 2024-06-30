---
title: Drone
description: Auto deploy your work from git forge
---

# Drone

{{ $frontmatter.description }}

When you push some modifications on your repo, your server not update automatically. If you use **webhooks**, you can send **push event** to your server execute `git pull` on your repo. But we need to receive this push event, it's call a **payload**, we have to configure server to receive it and update repository.

To use webhooks, you can use [**Drone**](https://github.com/ewilan-riviere/drone), this project is forked from [adr1enbe4udou1n](https://github.com/adr1enbe4udou1n), thanks to him!

Drone will listen on a specific url, when it receive a payload, it will execute a `git pull` on your repository, and with a [**post-merge**](/server/ci-cd/git-hooks) hook, you can execute some commands like `npm install` or `composer install`.

::: info
To install Drone, you need to have a server with [Node.js](/server/binaries/nodejs), [PM2](/server/nginx/nodejs-pm2) and [NGINX](/server/nginx/install) installed.
:::

After that, you can follow [this documentation](https://github.com/ewilan-riviere/drone).

## Git forge payload

To enabled GitHub, GitLab or Bitbucket to send payload to your server, you need to configure it on your repository settings. You can see [examples here](https://github.com/ewilan-riviere/drone#configure-webhooks-on-forges).

## Deployment

When Drone is activated, it will execute a `git pull` on server's repository when you push anything on this repository. The next step is to configure a Git hook to execute some commands like `npm install` or `composer install` for example.

To know more about this, check [**Git hooks**](/server/ci-cd/git-hooks) documentation.

When your `post-merge` hook is ready, Drone will automatically execute it on each push.
