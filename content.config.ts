import { defineContentConfig, defineCollection } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/**/*.md',
        prefix: '/en'
      }
    }),
    content_ru: defineCollection({
      type: 'page',
      source: {
        include: 'ru/**/*.md',
        prefix: ''
      }
    })
  }
});
