import { defineContentConfig, defineCollection } from '@nuxt/content';
import { object, array, string, date, number, optional, boolean } from 'valibot';

const pageSchema = object({
  layoutCentered: optional(boolean()),
  terminalMenuLabel: optional(string())
});

const skillSchema = object({
  items: array(
    object({
      slug: string(),
      name: string(),
      icon: string(),
      link: string(),
      category: string(),
      order: optional(number())
    })
  )
});

const experienceSchema = object({
  slug: string(),
  company: string(),
  startDate: date(),
  endDate: optional(date()),
  jobTitle: string()
});

const projectSchema = object({
  name: string(),
  stack: array(string()),
  company: optional(string()),
  link: optional(string())
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
      },
      schema: experienceSchema
    }),
    experience_ru: defineCollection({
      type: 'page',
      source: {
        include: 'ru/experience/**/*.md'
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
