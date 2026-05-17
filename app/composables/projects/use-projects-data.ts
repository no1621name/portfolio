import type { ProjectCollectionItem, SkillItem } from '~/types/content';

export function useProjectsData() {
  const { locale } = useI18n();
  const projectsCollectionKey = useGetProjectsCollectionKey();
  const experienceCollectionKey = useGetExperienceCollectionKey();

  const { data: projects } = useAsyncData(
    `projects-${projectsCollectionKey.value}`,
    () => queryCollection(projectsCollectionKey.value).all(),
    { watch: [locale] }
  );

  const { data: skillsData } = useAsyncData(
    'skills-data',
    () => queryCollection('skills').first(),
    { watch: [locale] }
  );

  const { data: experiences } = useAsyncData(
    `experience-${experienceCollectionKey.value}`,
    () => queryCollection(experienceCollectionKey.value).all(),
    { watch: [locale] }
  );

  const skills = computed<SkillItem[]>(() => skillsData.value?.items ?? []);

  const uniqueCompanySlugs = computed(() =>
    [...new Set(projects.value?.filter((p): p is ProjectCollectionItem & { company: string } => !!p.company).map(p => p.company) ?? [])]
  );

  const uniqueStackSlugs = computed(() =>
    [...new Set(projects.value?.flatMap(p => p.stack) ?? [])]
  );

  return { projects, experiences, skills, uniqueCompanySlugs, uniqueStackSlugs };
}
