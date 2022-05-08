/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import generateSitemap from 'vite-ssg-sitemap'

import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

import Markdown from 'vite-plugin-md'
import Prism from 'markdown-it-prism'
import LinkAttributes from 'markdown-it-link-attributes'

import Content from './src/plugins/content'
import svgLoader from 'vite-svg-loader'

import Inspector from "vite-plugin-vue-inspector"

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
      '@/': path.resolve(__dirname),
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),

    Content({
      path: './src/pages/content/',
      include: [/\.(md)$/],
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
    }),

    svgLoader({
      defaultImport: 'component',
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/webfansplz/vite-plugin-vue-inspector
    Inspector(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        'vue/macros',
        '@vueuse/head',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
      directoryAsNamespace: true,
    }),

    // https://github.com/antfu/vite-plugin-md
    // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
    Markdown({
      headEnabled: true,
      markdownItSetup(md) {
        md.use(require('markdown-it-anchor')) // https://www.npmjs.com/package/markdown-it-anchor
        md.use(require('markdown-it-multimd-table')) // https://www.npmjs.com/package/markdown-it-multimd-table
        md.use(require('markdown-it-table-of-contents')) // https://www.npmjs.com/package/markdown-it-table-of-contents
        md.use(require('markdown-it-container'), 'classname', {
          // https://www.npmjs.com/package/markdown-it-container
          validate: (name: string) => name.trim().length,
          render: (tokens: any, idx: string) => {
            const name = tokens[idx].info.trim() as
              | 'warning'
              | 'see'
              | 'tips'
              | 'info'
              | 'read'
              | 'danger'
            const emojis = {
              warning: '🚧',
              see: '👉',
              tips: '💡',
              info: 'ℹ️',
              read: '🔎',
              danger: '🚨',
              default: '',
            }
            let label = emojis[name] || emojis['default']
            const isHidden = name.includes('hide')
            label = isHidden
              ? ''
              : `<span class="container-label capitalize inline-flex mr-2 w-5 h-5 justify-center items-center text-1.2rem">${label}</span>`

            if (tokens[idx].nesting === 1) {
              return `<div class="p-4 mt-4 mb-4 rounded-lg alert text-sm leading-relaxed ${name}">
              <div class="flex items-start">
                ${label}
                <div class="flex-grow alert-content">\n`
            } else {
              return '</div></div></div>\n'
            }
          },
        })
        md.use(require('markdown-it-task-lists')) // https://www.npmjs.com/package/markdown-it-task-lists
        md.use(require('@traptitech/markdown-it-spoiler')) // https://www.npmjs.com/package/@traptitech/markdown-it-spoiler
        md.use(require('markdown-it-named-code-blocks')) // https://www.npmjs.com/package/markdown-it-named-code-blocks
        md.use(require('markdown-it-copy'), {
          // https://www.npmjs.com/package/markdown-it-copy
          btnText: 'copy',
          failText: 'Failed',
          successText: 'Success',
          successTextDelay: '1500',
          showCodeLanguage: true,
        })
        // https://prismjs.com/
        md.use(Prism) // https://www.npmjs.com/package/markdown-it-prism
        md.use(LinkAttributes, {
          // https://www.npmjs.com/package/markdown-it-link-attributes
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
      },
    }),
  ],

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onFinished() {
      generateSitemap()
    },
  },

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})
