import type { PageCollections as ContentPageCollections } from '@nuxt/content';

export type PageCollections = Pick<ContentPageCollections, 'pages_en' | 'pages_ru'>;
export type ExperienceCollections = Pick<ContentPageCollections, 'experience_en' | 'experience_ru'>;
