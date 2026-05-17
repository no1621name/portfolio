import { defineContentConfig, defineCollection, z } from '@nuxt/content';

const pageSchema = z.object({
  layoutCentered: z.boolean().optional(),
  terminalMenuLabel: z.string().optional()
});

const skillSchema = z.object({
  items: z.array(
    z.object({
      slug: z.string(),
      name: z.string(),
      icon: z.string(),
      link: z.string(),
      category: z.string(),
      order: z.number().optional()
    })
  )
});

const experienceSchema = z.object({
  slug: z.string(),
  company: z.string(),
  startDate: z.date(),
  endDate: z.date().optional(),
  jobTitle: z.string()
});

const projectSchema = z.object({
  name: z.string(),
  stack: z.array(z.string()),
  company: z.string().optional(),
  link: z.string().optional()
});

export default defineContentConfig({
  collections: {
    pages_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/pages/**/*.md',
        prefix: '/en'
      },
      schema: pageSchema
    }),
    pages_ru: defineCollection({
      type: 'page',
      source: {
        include: 'ru/pages/**/*.md',
        prefix: ''
      },
      schema: pageSchema
    }),
    skills: defineCollection({
      type: 'data',
      source: 'skills.json',
      schema: skillSchema
    }),
    experience_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/experience/**/*.md'
        // prefix: '/en'
      },
      schema: experienceSchema
    }),
    experience_ru: defineCollection({
      type: 'page',
      source: {
        include: 'ru/experience/**/*.md'
        // prefix: ''
      },
      schema: experienceSchema
    }),
    projects_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/projects/**/*.md'
      },
      schema: projectSchema
    }),
    projects_ru: defineCollection({
      type: 'page',
      source: {
        include: 'ru/projects/**/*.md'
      },
      schema: projectSchema
    })
  }
});
