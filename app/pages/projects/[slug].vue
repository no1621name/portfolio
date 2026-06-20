<script setup lang="ts">
import type { SkillItem, ExperienceCollectionItem } from '~/types/content';

const config = useAppConfig();
const route = useRoute();
const { locale } = useI18n();

const slug = computed(() => route.params.slug as string);
const path = computed(() => `/${locale.value}/projects/${slug.value}`);

const projectsCollectionKey = useGetProjectsCollectionKey();
const experienceCollectionKey = useGetExperienceCollectionKey();

const { data: project } = await useAsyncData(
  `project-${path.value}`,
  () => queryCollection(projectsCollectionKey.value).path(path.value).first()
);

const projectStack = computed(() => project.value?.stack ?? []);
const projectCompany = computed(() => project.value?.company);

const { data: skillsData } = await useAsyncData(
  'skills-data-project',
  () => queryCollection('skills').first()
);

const skills = computed<SkillItem[]>(() => {
  const allSkills = skillsData.value?.items ?? [];
  const slugs = new Set(projectStack.value);
  return allSkills.filter(s => slugs.has(s.slug));
});

const { data: company } = await useAsyncData<ExperienceCollectionItem | null>(
  `project-company-${projectCompany.value ?? 'none'}`,
  () => {
    const slug = projectCompany.value;
    if (!slug) return Promise.resolve(null);
    return queryCollection(experienceCollectionKey.value).where('slug', '=', slug).first();
  }
);

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true });
}

const metadata = {
  title: project.value?.name,
  description: project.value?.description || config.defaultInfo.project
};

useSeoMeta(metadata);

if (project.value?.image) {
  useSeoMeta({
    ogImage: project.value.image
  });
}
else {
  defineOgImage('NuxtSeo.satori', metadata);
}
</script>

<template>
  <div
    v-if="project"
    class="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:gap-8"
  >
    <div class="lg:col-span-2 flex flex-col gap-4">
      <h1 class="font-heading text-2xl text-primary">
        {{ project.name }}
      </h1>

      <img
        v-if="project.image"
        :src="project.image"
        :alt="project.name"
        class="w-full rounded-lg border border-divider"
      >

      <div class="text-sm text-primary/80 prose prose-mono prose-invert max-w-none">
        <ContentRenderer :value="project" />
      </div>
    </div>

    <div class="lg:col-span-1">
      <UiProjectSidebar
        :company="company"
        :skills="skills"
        :project="project"
      />
    </div>
  </div>
</template>
