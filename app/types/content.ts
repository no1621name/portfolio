import type { PageCollections as ContentPageCollections, SkillsCollectionItem } from '@nuxt/content';

export type PageCollections = Pick<ContentPageCollections, 'pages_en' | 'pages_ru'>;
export type ExperienceCollections = Pick<ContentPageCollections, 'experience_en' | 'experience_ru'>;
export type ProjectCollections = Pick<ContentPageCollections, 'projects_en' | 'projects_ru'>;

export type ExperienceCollectionItem = ContentPageCollections['experience_en'] | ContentPageCollections['experience_ru'];
export type ProjectCollectionItem = ContentPageCollections['projects_en'] | ContentPageCollections['projects_ru'];
export type SkillItem = SkillsCollectionItem['items'][number];
