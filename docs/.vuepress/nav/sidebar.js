module.exports = {
    getGuideSidebar: (main, webServer, server, linux, raspberry, git, laravel) => {
        return [
            {
                title: main,
                collapsable: false,
                children: [
                '',
                'create-local-network',
                'digital-ocean-init',
                'windows-new-terminal',
                'important-links'
                ]
            },
            {
                title: server,
                collapsable: true,
                children: [
                'server-nodejs-pm2',
                'server-auto-deploy',
                'ssh-management',
                'server-yarn'
                ]
            },
            {
                title: linux,
                collapsable: true,
                children: [
                'linux-installation-basics',
                'linux-lemp',
                'linux-php',
                'js/eslint'
                ]
            },
            {
                title: webServer,
                collapsable: true,
                children: [
                'web-server-nginx',
                'web-server-nginx-new-subdomain',
                'web-server-apache'
                ]
            },
            {
                title: git,
                collapsable: true,
                children: [
                'git-conflict-end-of-file'
                ]
            },
            {
                title: laravel,
                collapsable: true,
                children: [
                'laravel-cors-error',
                'laravel-backpack',
                'laravel-translations',
                'laravel-vuejs-mail'
                ]
            },
            {
                title: raspberry,
                collapsable: true,
                children: [
                'raspberry-as-media-center',
                'raspberry-manipulation',
                ]
            }
        ]
    },
    getGamesSidebar: (main, oxygenNotIncluded) => {
        return [
            {
                title: main,
                collapsable: false,
                children: [
                ''
                ]
            },
            {
                title: oxygenNotIncluded,
                collapsable: true,
                children: [
                'oni-useful-links'
                ]
            }
        ]
    },
    getSafeSidebar: (main, ssh) => {
        return [
            {
                title: main,
                collapsable: false,
                children: [
                ''
                ]
            },
            {
                title: ssh,
                collapsable: true,
                children: [
                'ssh-keys'
                ]
            }
        ]
    },
    getProjectSidebar: (main, portfolio) => {
        return [
            '',
            {
                title: portfolio,
                collapsable: true,
                children: [
                    'portfolio/setup'
                ]
            }
        ]
    }
}
