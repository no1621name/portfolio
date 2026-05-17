import type { ExperienceCollections, PageCollections } from '~/types/content';

export const useGetPageCollectionKey = () => {
  const { locale } = useI18n();
  const key = computed<keyof PageCollections>(() => `pages_${locale.value}`);
  return key;
};

export const useGetExperienceCollectionKey = () => {
  const { locale } = useI18n();
  const key = computed<keyof ExperienceCollections>(() => `experience_${locale.value}`);
  return key;
};
