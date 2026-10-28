import { defineConfig } from 'vitepress'
import { redocPage } from './redoc-page'

export default defineConfig({
  title: 'Flora Documentation',
  description: 'Documentation for Flora, an index for the Haskell ecosystem',
  base: '/',
  cleanUrls: true,
  srcExclude: ['README.md'],
  ignoreDeadLinks: [/^\/api-reference/],
  appearance: 'force-auto',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  vite: {
    plugins: [redocPage()],
  },
  themeConfig: {
    logo: { light: '/logo_light_mode.svg', dark: '/logo_dark_mode.svg' },
    logoLink: 'https://flora.pm',
    nav: [
      { text: 'Guides', link: '/' },
      { text: 'API Reference', link: '/api-reference', target: '_self' },
      { text: 'flora.pm', link: 'https://flora.pm' },
    ],
    sidebar: [
      {
        text: 'Guides',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Namespaces', link: '/namespaces' },
          { text: 'Search features', link: '/search-features' },
          { text: 'Package Feeds', link: '/package-feeds' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/flora-pm/docs.flora.pm' }],
    editLink: {
      pattern: 'https://github.com/flora-pm/docs.flora.pm/edit/main/:path',
    },
  },
})
