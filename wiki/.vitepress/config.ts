import { resolve } from 'node:path'
import { env } from 'node:process'
import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'

const IS_DEV = env.NODE_ENV === 'production'

const search = (): DefaultTheme.Config['search'] => {
  if (IS_DEV) return { provider: 'local' }

  return {
    provider: 'algolia',
    options: {
      appId: 'MDQBBYI18P',
      apiKey: '0f36f096b83770eae78115f2d88bd394',
      indexName: 'bsmg',
    },
  }
}

type Route =
  | readonly [name: string, path: string, routes?: Route[]]
  | readonly [name: string, routes: Route[]]

interface SidebarItem {
  name: string
  path: string
  routes: Route[]
}

const convert = ([text, link, routes]: Route): DefaultTheme.SidebarItem => {
  if (typeof link === 'string') {
    return {
      text,
      link,
      items: routes?.map(route => convert(route)),
    }
  }

  return {
    text,
    items: (link ?? routes)?.map(route => convert(route)),
  }
}

const sidebar = (...items: SidebarItem[]): DefaultTheme.SidebarMulti => {
  return Object.fromEntries(
    items.map(({ name, path, routes }) => [
      path,
      [
        {
          text: name,
          link: '.',
          items: routes?.map(route => convert(route)),
        },
      ],
    ]),
  )
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'BSMG Wiki',
  description: 'BSMG Wiki',
  lastUpdated: true,

  head: [['link', { rel: 'icon', href: '/icon.png' }]],

  locales: {
    root: {
      label: 'English',
      lang: 'en',

      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Beginners Guide', link: '/beginners-guide.md' },
          { text: 'BSMG Discord', link: 'https://discord.gg/beatsabermods' },
        ],
      },
    },
    fr: {
      label: 'Français',
      title: 'Wiki BSMG',

      themeConfig: {
        nav: [
          { text: 'Accueil', link: '/fr/' },
          { text: 'Guide du Débutant', link: '/fr/beginners-guide.md' },
          { text: 'Discord BSMG', link: 'https://discord.gg/beatsabermods' },
        ],
      },
    },
    de: {
      label: 'Deutsch',
      title: 'Wiki BSMG',

      themeConfig: {
        nav: [
          { text: 'Startseite', link: '/de/' },
          { text: 'Anfänger Guide', link: '/beginners-guide.md' },
          { text: 'BSMG Discord', link: 'https://discord.gg/beatsabermods' },
        ],
      },
    },
    nl: {
      label: 'Nederlands',
      title: 'Wiki BSMG',

      themeConfig: {
        nav: [
          { text: 'Hoofdmenu', link: '/nl/' },
          { text: 'Gids voor beginners', link: '/nl/beginners-guide.md' },
          { text: 'BSMG Discord', link: 'https://discord.gg/beatsabermods' },
        ],
      },
    },
    ja: {
      label: '日本語',
      title: 'Wiki BSMG',

      themeConfig: {
        nav: [
          { text: 'ホーム', link: '/ja/' },
          { text: '初心者ガイド', link: '/ja/beginners-guide.md' },
          { text: 'BSMG Discord', link: 'https://discord.gg/beatsabermods' },
        ],
      },
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: [2, 3],

    sidebar: sidebar(
      {
        name: 'About Us',
        path: '/about/',
        routes: [
          ['Staff', './staff'],
          ['Moderators', './moderators'],
          ['Modders', './modders'],
          ['Supports', './supports'],
          ['Mapping Supports', './mapping-supports'],
          ['3D Artists', './3d-artists'],
          ['Translators', './translators'],
        ],
      },
      {
        name: 'Communities',
        path: '/communities/',
        routes: [
          ['Community Hub', './community-hub'],
          ['Regional Hub', './regional-hub'],
        ],
      },
      {
        name: 'Frequently Asked Questions',
        path: '/faq/',
        routes: [['Install Folder', './install-folder']],
      },
      {
        name: 'Mapping',
        path: '/mapping/',
        routes: [
          [
            'Mapping',
            [
              ['Basic Mapping', './basic-mapping'],
              ['Intermediate Mapping', './intermediate-mapping'],
              ['Extended Mapping', './extended-mapping'],
            ],
          ],
          [
            'Lighting',
            [
              ['Basic Lighting', './basic-lighting'],
              ['Intermediate Lighting', './intermediate-lighting'],
              ['Advanced Lighting', './advanced-lighting'],
              ['Extended Lighting', './extended-lighting'],
            ],
          ],
          [
            'Audio',
            [
              ['Basic Audio Setup', './basic-audio'],
              ['Advanced Audio Editing', './advanced-audio'],
            ],
          ],
          ['Downmapping', './downmapping'],
          ['Editor Keybinds', './editor-keybinds'],
          ['Mapping Glossary', './glossary'],
          ['How to Testplay', './how-to-testplay'],
          ['Default Environment Colors', './lighting-defaults'],
          ['Map Format', './map-format'],
          ['Coping with Mapping Anxiety', './mapping-anxiety'],
          ['Mapping Resources Contributors', './mapping-credits'],
          ['MMA2 User Guide', './mediocre-map-assistant'],
        ],
      },
      {
        name: 'Modding',
        path: '/modding/',
        routes: [
          ['PC', './pc-mod-dev-intro'],
          [
            'Quest',
            './quest-mod-dev-intro',
            [
              ['Config', './quest-mod-dev-config'],
              ['Custom Types', './quest-mod-dev-custom-types'],
              ['UI', './quest-mod-dev-ui'],
            ],
          ],
        ],
      },
      {
        name: 'Models',
        path: '/models/',
        routes: [
          ['Custom Sabers', './custom-sabers'],
          ['Custom Avatars', './custom-avatars'],
          ['Custom Platforms', './custom-platforms'],
          ['Custom Notes', './custom-notes'],
          ['Custom Walls', './custom-walls'],
          [
            'Guides',
            [
              ['Custom Sabers Guide', './sabers-guide'],
              ['Custom Avatars Guide', './avatars-guide'],
              ['Custom Platforms Guide', './platforms-guide'],
              ['Custom Notes Guide', './notes-guide'],
              [
                'Baked Lighting Platforms Guide',
                './baked-lighting-platforms-guide',
              ],
            ],
          ],
          ['Shader Migration Guide', './shader-migration'],
        ],
      },
    ),

    footer: {
      message: 'Copyright © 2019-2023 Beat Saber Modding Group',
      copyright: 'Licensed under CC BY-NC-SA 4.0',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/bsmg/wiki' }],
    editLink: {
      pattern: 'https://github.com/bsmg/wiki/edit/master/wiki/:path',
    },

    search: search(),
  },
})
