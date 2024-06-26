import type { DefaultTheme } from 'vitepress'

export const sidebar = {
  '/notebook/': { base: '/notebook/', items: sidebarNotebook() },
  '/server/': { base: '/server/', items: sidebarServer() },
  '/systems/': { base: '/systems/', items: sidebarSystems() },
  '/tools/': { base: '/tools/', items: sidebarTools() },
}

export function navigation(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Notebook',
      link: '/notebook/cheatsheet',
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
        { text: 'Windows', link: '/systems/windows' },
      ],
    },
    {
      text: 'Tools',
      link: '/tools/',
      activeMatch: '/tools/',
    },
    // {
    //   text: 'Reference',
    //   link: '/reference/site-config',
    //   activeMatch: '/reference/'
    // },
    // {
    //   text: 'Dropdown Menu',
    //   items: [
    //     { text: 'Item A', link: '/item-1' },
    //     { text: 'Item B', link: '/item-2' },
    //     { text: 'Item C', link: '/item-3' }
    //   ]
    // }
  ]
}

function sidebarNotebook(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        { text: 'Notebook', link: 'cheatsheet' },
        { text: 'MySQL / MariaDB', link: 'mysql' },
        { text: 'Vitepress', link: 'vitepress' },
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
        { text: 'Server basics', link: 'administration/server-basics' },
        { text: 'Vim', link: 'administration/vim' },
        { text: 'ZSH & Oh my ZSH', link: 'administration/zsh' },
        { text: 'SSH / SCP / rsync', link: 'administration/ssh-scp-rsync' },
        { text: 'Git', link: 'administration/git' },
        { text: 'Screen', link: 'administration/screen' },
        { text: 'fail2ban', link: 'administration/fail2ban' },
        { text: 'Message of the day (MOTD)', link: 'administration/motd' },
        { text: 'Sudoers', link: 'administration/sudoers' },
      ],
    },
    {
      text: 'Binaries',
      collapsed: false,
      items: [
        { text: 'Bun', link: 'binaries/bun' },
        { text: 'Go', link: 'binaries/golang' },
        { text: 'ImageMagick', link: 'binaries/imagemagick' },
        { text: 'MySQL / MariaDB', link: 'binaries/mysql' },
        { text: 'Node.js', link: 'binaries/nodejs' },
        { text: 'PEAR / PECL', link: 'binaries/pear' },
        { text: 'PHP', link: 'binaries/php' },
        { text: 'PHP extensions', link: 'binaries/php-extensions' },
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
        { text: 'Ready-to-use', link: 'docker/ready-to-use' },
      ],
    },
    {
      text: 'Sysadmin',
      collapsed: false,
      items: [
        { text: 'Disk', link: 'sysadmin/disk' },
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
  ]
}
