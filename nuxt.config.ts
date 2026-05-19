import { readdirSync } from 'fs';
import { resolve } from 'path';

export default defineNuxtConfig({
  modules: [
    '@vercel/speed-insights',
    '@vercel/analytics',
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/i18n'
  ],
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    classSuffix: '-theme',
    storage: 'cookie',
    fallback: 'green',
    preference: 'green'
  },

  content: {
    renderer: {
      anchorLinks: false,
      alias: {
        a: 'NuxtLinkLocale'
      }
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/en': { prerender: true },
    '/projects': { prerender: false, ssr: true },
    '/en/projects': { prerender: false, ssr: true }
  },

  compatibilityDate: '2024-04-03',

  vite: {
    optimizeDeps: {
      include: [
        'pixi.js'
      ]
    }
  },

  typescript: {
    typeCheck: true
  },

  hooks: {
    'nitro:config'(nitroConfig) {
      const contentDir = resolve('./content');

      const enProjects = readdirSync(`${contentDir}/en/projects`)
        .filter(f => f.endsWith('.md'))
        .map(f => `/en/projects/${f.replace(/\.md$/, '')}`);

      const ruProjects = readdirSync(`${contentDir}/ru/projects`)
        .filter(f => f.endsWith('.md'))
        .map(f => `/projects/${f.replace(/\.md$/, '')}`);

      nitroConfig.prerender ??= {};
      nitroConfig.prerender.routes ??= [];
      nitroConfig.prerender.routes.push(...enProjects, ...ruProjects);
    }
  },

  eslint: {
    config: {
      stylistic: {
        indent: 2,
        commaDangle: 'never',
        quotes: 'single',
        semi: true
      }
    }
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-US' },
      { code: 'ru', name: 'Русский', language: 'ru-RU' }
    ],
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false
  },

  icon: {
    customCollections: [{
      prefix: 'custom',
      dir: './app/assets/icons'
    }],
    clientBundle: {
      scan: true,
      includeCustomCollections: true
    }
  }
});
