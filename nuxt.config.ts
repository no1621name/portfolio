// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content'
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-04-03',

  eslint: {
    config: {
      stylistic: {
        indent: 2,
        commaDangle: 'never',
        quotes: 'single',
        semi: true
      }
    }
  }
});
