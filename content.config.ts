import { defineContentConfig, defineCollection, z } from '@nuxt/content';

const pageSchema = z.object({
  layoutCentered: z.boolean().optional(),
  terminalMenuLabel: z.string().optional()
});

const skillSchema = z.object({
  slug: z.string(),
  name: z.string(),
  icon: z.string(),
  link: z.string(),
  category: z.string()
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
    }),
    skills: defineCollection({
      type: 'data',
      source: 'skills.json',
      schema: skillSchema
    })
  }
});
