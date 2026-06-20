import { readdirSync } from 'fs';
import { resolve } from 'path';

const DEFAULT_INFO = {
  name: 'Георгий Сысуев',
  description: 'Портфолио фронтенд-разработчика',
  url: 'https://georges1621-portfolio.vercel.app',
  projectDescription: 'Проект портфолио',
  locale: 'ru'
};

const CONTENT_DIR = resolve('./content');

function getProjectRoutes(locale: string) {
  const prefix = locale === 'ru' ? '' : `/${locale}`;
  const dir = `${CONTENT_DIR}/${locale}/projects`;

  return readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => `${prefix}/projects/${f.replace(/\.md$/, '')}`);
}

function getPageRoutes(locale: string) {
  const prefix = locale === 'ru' ? '' : `/${locale}`;
  const dir = `${CONTENT_DIR}/${locale}/pages`;

  return readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map((f) => {
      const base = f.replace(/\.md$/, '').replace(/^\d+\./, '');
      if (base === 'index') return prefix || '/';
      return `${prefix}/${base}`;
    });
}

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
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    'nuxt-security'
  ],
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: DEFAULT_INFO.url,
    name: DEFAULT_INFO.name,
    description: DEFAULT_INFO.description,
    defaultLocale: DEFAULT_INFO.locale,
    indexable: true
  },

  colorMode: {
    classSuffix: '-theme',
    storage: 'cookie',
    fallback: 'green',
    preference: 'green'
  },

  content: {
    renderer: {
      anchorLinks: false
    },
    database: {
      type: 'libsql',
      url: process.env.TURSO_URL ?? '',
      authToken: process.env.TURSO_AUTH_TOKEN ?? ''
    }
  },

  appConfig: {
    defaultInfo: DEFAULT_INFO
  },

  runtimeConfig: {
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    telegramChatId: process.env.TELEGRAM_CHAT_ID
  },

  routeRules: {
    '/projects': { prerender: false, ssr: true },
    '/en/projects': { prerender: false, ssr: true },
    '/__nuxt_content/**': {
      csurf: false
    }
  },

  vite: {
    optimizeDeps: {
      include: [
        'pixi.js',
        'valibot'
      ]
    }
  },

  typescript: {
    typeCheck: true
  },

  hooks: {
    'nitro:config'(nitroConfig) {
      const prerenderedRoutes = [
        ...getProjectRoutes('en'),
        ...getProjectRoutes('ru'),
        ...getPageRoutes('en'),
        ...getPageRoutes('ru')
      ];
      nitroConfig.prerender ??= {};
      nitroConfig.prerender.routes ??= [];
      nitroConfig.prerender.routes.push(...prerenderedRoutes);
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
    defaultLocale: DEFAULT_INFO.locale,
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
  },

  linkChecker: {
    enabled: false
  },

  ogImage: {
    security: {
      renderTimeout: 30000
    }
  },

  schemaOrg: {
    identity: {
      type: 'Person',
      name: 'Georgii Sysuev',
      url: DEFAULT_INFO.url
    }
  },

  security: {
    corsHandler: false,
    csrf: {
      enabled: true,
      methodsToProtect: ['POST']
    },
    rateLimiter: {
      tokensPerInterval: 60,
      interval: 60000
    },
    headers: {
      contentSecurityPolicy: false
    }
  }
});
