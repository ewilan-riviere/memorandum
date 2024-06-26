import type { DefaultTheme } from 'vitepress'

export const sidebar = {
  '/notebook/': { base: '/notebook/', items: sidebarNotebook() },
  '/server/': { base: '/server/', items: sidebarServer() },
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
      text: 'Introduction',
      collapsed: false,
      items: [
        { text: 'Welcome', link: '/' },
        { text: 'Screen', link: 'screen' },
        { text: 'SSH', link: 'ssh' },
      ],
    },
    {
      text: 'Administration',
      collapsed: false,
      items: [
        { text: 'fail2ban', link: 'administration/fail2ban' },
        { text: 'Message of the day (MOTD)', link: 'administration/motd' },
      ],
    },
    {
      text: 'Binaries',
      collapsed: false,
      items: [
        { text: 'Go', link: 'binaries/golang' },
        { text: 'Node.js', link: 'binaries/nodejs' },
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
        { text: 'Setup Docker', link: 'docker' },
      ],
    },
    {
      text: 'NGINX',
      collapsed: false,
      items: [
        { text: 'Setup NGINX', link: 'nginx' },
        { text: 'SSL & Certbot', link: 'nginx/ssl-certbot' },
        { text: 'Node.js & PM2', link: 'nginx/nodejs-pm2' },
      ],
    },
  ]
}
