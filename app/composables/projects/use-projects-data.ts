import type { SkillsCollectionItem } from '@nuxt/content';
import type { ProjectCollectionItem, SkillItem } from '~/types/content';

export function useProjectsData(projects: Ref<ProjectCollectionItem[] | undefined>, skillsData: Ref<SkillsCollectionItem | null | undefined>) {
  const skills = computed<SkillItem[]>(() => skillsData.value?.items ?? []);

  const uniqueCompanySlugs = computed(() =>
    [...new Set(projects.value?.filter((p): p is ProjectCollectionItem & { company: string } => !!p.company).map(p => p.company) ?? [])]
  );

  const uniqueStackSlugs = computed(() =>
    [...new Set(projects.value?.flatMap(p => p.stack) ?? [])]
  );

  return { projects, skills, uniqueCompanySlugs, uniqueStackSlugs };
}
