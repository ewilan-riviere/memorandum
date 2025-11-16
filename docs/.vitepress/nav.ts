import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Sidebar = {
  '/notebook/': { base: '/notebook/', items: sidebarNotebook() },
  '/server/': { base: '/server/', items: sidebarServer() },
  '/systems/': { base: '/systems/', items: sidebarSystems() },
  '/frameworks/': { base: '/frameworks/', items: sidebarFrameworks() },
  '/tools/': { base: '/tools/', items: sidebarTools() },
}

export function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Notebook',
      link: '/notebook/notebook',
      activeMatch: '/notebook/',
    },
    {
      text: 'Server',
      activeMatch: '/server/',
      items: [
        { text: 'Welcome', link: '/server/welcome' },
        { text: 'Administration', link: '/server/administration' },
        { text: 'Binaries', link: '/server/binaries' },
        { text: 'CI/CD', link: '/server/ci-cd' },
        { text: 'Docker', link: '/server/docker' },
        { text: 'Sysadmin', link: '/server/sysadmin' },
        { text: 'Web server', link: '/server/web-server' },
      ],
    },
    {
      text: 'Systems',
      activeMatch: '/systems/',
      items: [
        { text: 'Windows', link: '/systems/windows/scoop' },
        { text: 'Windows WSL', link: '/systems/windows-wsl/installation' },
        { text: 'macOS', link: '/systems/macos/disk' },
      ],
    },
    {
      text: 'Frameworks',
      activeMatch: '/frameworks/',
      items: [
        { text: 'Laravel', link: '/frameworks/laravel/setup' },
      ],
    },
    {
      text: 'Tools',
      link: '/tools/',
      activeMatch: '/tools/',
    },
  ]
}

function sidebarNotebook(): DefaultTheme.SidebarItem[] {
  return [
    {
      collapsed: false,
      items: [
        { text: 'Notebook', link: 'notebook' },
      ],
    },
    {
      text: 'Languages',
      collapsed: false,
      items: [
        { text: 'MySQL / MariaDB', link: 'languages/mysql' },
        { text: 'PHP', link: 'languages/php' },
      ],
    },
    {
      text: 'Laravel',
      collapsed: false,
      items: [
        { text: 'Production', link: 'laravel/production' },
        { text: 'Fresh project', link: 'laravel/fresh-project' },
        { text: 'Packages', link: 'laravel/packages' },
        { text: 'Starter kits', link: 'laravel/starter-kits' },
        { text: 'Filament', link: 'laravel/filament' },
        { text: 'Tailwind CSS', link: 'laravel/tailwindcss' },
        { text: 'Linters', link: 'laravel/linters' },
        { text: 'Typescript', link: 'laravel/typescript' },
        { text: 'Alpine.js', link: 'laravel/alpinejs' },
      ],
    },
    {
      text: 'Linters',
      collapsed: false,
      items: [
        { text: 'Configs', link: 'linters/configs' },
        { text: 'ESLint', link: 'linters/eslint' },
      ],
    },
    {
      text: 'Misc',
      collapsed: false,
      items: [
        { text: 'Twitter curators', link: 'misc/twitter-curators' },
        { text: 'Useful links', link: 'misc/useful-links' },
        { text: 'Vitepress', link: 'misc/vitepress' },
      ],
    },
    {
      text: 'Tools',
      collapsed: false,
      items: [
        { text: 'Docker', link: 'tools/docker' },
      ],
    },
  ]
}

function sidebarServer(): DefaultTheme.SidebarItem[] {
  return [
    {
      items: [
        { text: 'Welcome', link: 'welcome' },
      ],
    },
    {
      text: 'Administration',
      collapsed: false,
      items: [
        { text: 'Connection & user', link: 'administration/connection-user' },
        { text: 'Vim', link: 'administration/vim' },
        { text: 'ZSH & Oh my ZSH', link: 'administration/zsh' },
        { text: 'Basics & UFW', link: 'administration/basics-ufw' },
        { text: 'SSH / SCP / rsync', link: 'administration/ssh-scp-rsync' },
        { text: 'Git', link: 'administration/git' },
        { text: 'Screen', link: 'administration/screen' },
        { text: 'fail2ban', link: 'administration/fail2ban' },
        { text: 'Message of the day (MOTD)', link: 'administration/motd' },
        { text: 'Sudoers', link: 'administration/sudoers' },
        { text: 'Supervisor', link: 'administration/supervisor' },
        { text: 'WiFi and Bluetooth', link: 'administration/wifi-bluetooth' },
      ],
    },
    {
      text: 'Binaries',
      collapsed: false,
      items: [
        { text: 'Bun', link: 'binaries/bun' },
        { text: 'Go', link: 'binaries/golang' },
        { text: 'Flutter', link: 'binaries/flutter' },
        { text: 'ImageMagick', link: 'binaries/imagemagick' },
        { text: 'Meilisearch', link: 'binaries/meilisearch' },
        { text: 'MySQL / MariaDB', link: 'binaries/mysql' },
        { text: 'Node.js', link: 'binaries/nodejs' },
        { text: 'PEAR / PECL', link: 'binaries/pear' },
        { text: 'PHP', link: 'binaries/php' },
        { text: 'PHP extensions', link: 'binaries/php-extensions' },
        { text: 'Python', link: 'binaries/python' },
        { text: 'Redis', link: 'binaries/redis' },
        { text: 'Rust', link: 'binaries/rust-lang' },
        { text: 'Swoole', link: 'binaries/swoole' },
        { text: 'WinRAR', link: 'binaries/rar' },
      ],
    },
    {
      text: 'CI/CD',
      collapsed: false,
      items: [
        { text: 'Git hooks', link: 'ci-cd/git-hooks' },
        { text: 'Drone', link: 'ci-cd/drone' },
        { text: 'GitLab CI', link: 'ci-cd/gitlab-ci' },
        { text: 'GitLab Runner', link: 'ci-cd/gitlab-runner' },
      ],
    },
    {
      text: 'Docker',
      collapsed: false,
      items: [
        { text: 'Installation', link: 'docker/installation' },
        { text: 'Examples', link: 'docker/examples' },
        { text: 'Ready-to-use', link: 'docker/ready-to-use' },
      ],
    },
    {
      text: 'Sysadmin',
      collapsed: false,
      items: [
        { text: 'Disk', link: 'sysadmin/disk' },
        { text: 'Network', link: 'sysadmin/network' },
      ],
    },
    {
      text: 'Web server',
      collapsed: false,
      items: [
        { text: 'NGINX', link: 'web-server/nginx' },
        { text: 'NGINX usage', link: 'web-server/nginx-usage' },
        { text: 'NGINX examples', link: 'web-server/nginx-examples' },
        { text: 'SSL & Certbot', link: 'web-server/ssl-certbot' },
        { text: 'Node.js & PM2', link: 'web-server/nodejs-pm2' },
      ],
    },
  ]
}

function sidebarSystems(): DefaultTheme.SidebarItem[] {
  return [
    {
      items: [
        { text: 'Welcome', link: 'welcome' },
        {
          text: 'Windows',
          collapsed: false,
          items: [
            { text: 'Scoop', link: 'windows/scoop' },
            { text: 'Tips', link: 'windows/tips' },
            { text: 'Flutter', link: 'windows/flutter' },
            { text: 'Java', link: 'windows/java' },
            { text: 'MySQL', link: 'windows/mysql' },
            { text: 'NGINX', link: 'windows/nginx' },
            { text: 'Node.js', link: 'windows/nodejs' },
            { text: 'PHP', link: 'windows/php' },
            { text: 'PHP extensions', link: 'windows/php-extensions' },
            { text: 'phpMyAdmin', link: 'windows/phpmyadmin' },
          ],
        },
        {
          text: 'Windows WSL',
          collapsed: false,
          items: [
            { text: 'Installation', link: 'windows-wsl/installation' },
            { text: 'Cheatsheet', link: 'windows-wsl/cheatsheet' },
            { text: 'GUI', link: 'windows-wsl/gui' },
            { text: 'WSL 2', link: 'windows-wsl/wsl-2' },
            { text: 'Troubles', link: 'windows-wsl/troubles' },
          ],
        },
        {
          text: 'macOS',
          collapsed: false,
          items: [
            { text: 'Disk', link: 'macos/disk' },
          ],
        },
      ],
    },
  ]
}

function sidebarFrameworks(): DefaultTheme.SidebarItem[] {
  return [
    {
      items: [
        {
          text: 'Laravel',
          collapsed: false,
          items: [
            { text: 'Setup', link: 'laravel/setup' },
            { text: 'Tools', link: 'laravel/tools' },
            { text: 'API documentation', link: 'laravel/api-documentation' },
            { text: 'Queue: jobs & schedule', link: 'laravel/queue-jobs-schedule' },
            { text: 'Queue: Redis', link: 'laravel/queue-redis' },
            { text: 'Valet', link: 'laravel/valet' },
            { text: 'Deployment', link: 'laravel/deployment' },
            { text: 'Search', link: 'laravel/search' },
            { text: 'Tips', link: 'laravel/tips' },
            { text: 'Relationships', link: 'laravel/relationships' },
            { text: 'Octane', link: 'laravel/octane' },
            { text: 'Eloquent', link: 'laravel/eloquent' },
            { text: 'Vite', link: 'laravel/vite' },
            { text: 'Vite: ESLint', link: 'laravel/vite-eslint' },
            { text: 'Vite: CSS framework', link: 'laravel/vite-css-framework' },
            { text: 'Vite: Alpine JS', link: 'laravel/vite-alpine-js' },
            { text: 'Vite: Livewire', link: 'laravel/vite-livewire' },
            { text: 'Webpack: JS config', link: 'laravel/webpack-js-config' },
          ],
        },
      ],
    },
    {
      items: [
        {
          text: 'Flutter',
          collapsed: false,
          items: [
            { text: 'Install', link: 'flutter/install' },
          ],
        },
      ],
    },
  ]
}

function sidebarTools(): DefaultTheme.SidebarItem[] {
  return [
    {
      items: [
        { text: 'Welcome', link: 'welcome' },
      ],
    },
    {
      text: 'Tools',
      collapsed: false,
      items: [
        { text: 'TablePlus', link: 'tableplus' },
        { text: 'phpMyAdmin', link: 'phpmyadmin' },
      ],
    },
    {
      text: 'FFMPEG',
      collapsed: false,
      items: [
        { text: 'Setup FFMPEG', link: 'ffmpeg/install' },
        { text: 'Convert', link: 'ffmpeg/convert' },
        { text: 'Metadata', link: 'ffmpeg/metadata' },
        { text: 'HEVC H265', link: 'ffmpeg/hevc-h265' },
      ],
    },
    {
      text: 'Hardware',
      collapsed: false,
      items: [
        { text: 'NVME', link: 'hardware/nvme' },
      ],
    },
  ]
}
