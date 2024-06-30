import type { DefaultTheme } from 'vitepress'

export const sidebar = {
  '/notebook/': { base: '/notebook/', items: sidebarNotebook() },
  '/server/': { base: '/server/', items: sidebarServer() },
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
      link: '/server/',
      activeMatch: '/server/',
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
        { text: 'SSH', link: 'administration/ssh' },
        { text: 'Prepare server', link: 'administration/prepare-server' },
        { text: 'Basic packages', link: 'administration/basic-packages' },
        { text: 'git', link: 'administration/git' },
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
        { text: 'Node.js', link: 'binaries/nodejs' },
        { text: 'Swoole', link: 'binaries/swoole' },
        { text: 'Rust', link: 'binaries/rust-lang' },
      ],
    },
    {
      text: 'CI/CD',
      collapsed: false,
      items: [
        { text: 'Drone', link: 'ci-cd/drone' },
        { text: 'Git hooks', link: 'ci-cd/git-hooks' },
        { text: 'GitLab CI', link: 'ci-cd/gitlab-ci' },
        { text: 'GitLab Runner', link: 'ci-cd/gitlab-runner' },
      ],
    },
    {
      text: 'Docker',
      collapsed: false,
      items: [
        { text: 'Setup Docker', link: 'docker/install' },
      ],
    },
    {
      text: 'NGINX',
      collapsed: false,
      items: [
        { text: 'Setup NGINX', link: 'nginx/install' },
        { text: 'Examples', link: 'nginx/examples' },
        { text: 'SSL & Certbot', link: 'nginx/ssl-certbot' },
        { text: 'Node.js & PM2', link: 'nginx/nodejs-pm2' },
      ],
    },
    {
      text: 'Sysadmin',
      collapsed: false,
      items: [
        { text: 'Disk', link: 'sysadmin/disk' },
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
      ],
    },
    {
      text: 'ffmpeg',
      collapsed: false,
      items: [
        { text: 'Install', link: 'ffmpeg/install' },
        { text: 'Convert', link: 'ffmpeg/convert' },
        { text: 'Metadata', link: 'ffmpeg/metadata' },
        { text: 'HEVC H265', link: 'ffmpeg/hevc-h265' },
      ],
    },
  ]
}
