import type { SelectMenuItem } from '@nuxt/ui';
import type { ExperienceCollectionItem, SkillItem } from '~/types/content';

export function useProjectOptions(
  experiences: Ref<ExperienceCollectionItem[] | undefined>,
  skills: Ref<SkillItem[]>,
  uniqueCompanySlugs: Ref<string[]>,
  uniqueStackSlugs: Ref<string[]>
) {
  const companyOptions = computed<SelectMenuItem[]>(() =>
    experiences.value
      ?.filter(e => uniqueCompanySlugs.value.includes(e.slug))
      .map(e => ({ label: e.company, value: e.slug })) ?? []
  );

  const stackOptions = computed<SelectMenuItem[]>(() =>
    skills.value
      .filter(s => uniqueStackSlugs.value.includes(s.slug))
      .map(s => ({ label: s.name, value: s.slug }))
  );

  return { companyOptions, stackOptions };
}
