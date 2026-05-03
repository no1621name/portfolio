import { defineContentConfig, defineCollection, z } from '@nuxt/content';

const pageSchema = z.object({
  layoutCentered: z.boolean().optional()
});

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/**/*.md',
        prefix: '/en'
      },
      schema: pageSchema
    }),
    content_ru: defineCollection({
      type: 'page',
      source: {
        include: 'ru/**/*.md',
        prefix: ''
      },
      schema: pageSchema
    })
  }
});
