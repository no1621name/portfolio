import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: 'pages/**/*.md',
      prefix: '/'
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/**/*.md',
      schema: z.object({
        name: z.string()
      })
    })
  }
});
