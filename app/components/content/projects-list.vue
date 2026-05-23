<script setup lang="ts">
import type { SkillItem, ExperienceCollectionItem } from '~/types/content';
import { useProjectFilters } from '~/composables/projects/use-project-filters';
import { useProjectsData } from '~/composables/projects/use-projects-data';
import { useProjectOptions } from '~/composables/projects/use-project-options';
import { matchesSearch, matchesStack, matchesCompany } from '~/utils/project-filters';
import { useGetProjectsCollectionKey, useGetExperienceCollectionKey } from '~/composables/use-get-collection-keys';

const { t, locale } = useI18n();

const projectsCollectionKey = useGetProjectsCollectionKey();
const experienceCollectionKey = useGetExperienceCollectionKey();

const [
  { data: projects },
  { data: skillsData },
  { data: experiences }
] = await Promise.all([
  useAsyncData(
    `projects-${projectsCollectionKey.value}`,
    () => queryCollection(projectsCollectionKey.value).all(),
    { watch: [locale] }
  ),
  useAsyncData(
    'skills-data',
    () => queryCollection('skills').first(),
    { watch: [locale] }
  ),
  useAsyncData(
    `experience-${experienceCollectionKey.value}`,
    () => queryCollection(experienceCollectionKey.value).all(),
    { watch: [locale] }
  )
]);

const { skills, uniqueCompanySlugs, uniqueStackSlugs } = useProjectsData(projects, skillsData);
const { searchQuery, selectedStack, selectedCompanies } = useProjectFilters();
const { companyOptions, stackOptions } = useProjectOptions(experiences, skills, uniqueCompanySlugs, uniqueStackSlugs);

const skillMap = computed(() =>
  new Map<string, SkillItem>(skills.value.map(s => [s.slug, s]))
);

const companyMap = computed(() =>
  new Map<string, ExperienceCollectionItem>((experiences.value ?? []).map(e => [e.slug, e]))
);

const isLoading = computed(() => !projects.value);

const filteredProjects = computed(() =>
  (projects.value ?? []).filter(project =>
    matchesSearch(project, searchQuery.value)
    && matchesStack(project, selectedStack.value)
    && matchesCompany(project, selectedCompanies.value)
  )
);
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-3">
      <UInput
        v-model="searchQuery"
        :placeholder="t('projects.searchPlaceholder')"
        icon="i-lucide-search"
        :ui="{ trailing: 'pe-1' }"
        class="w-full"
      >
        <template
          v-if="searchQuery.length"
          #trailing
        >
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            icon="i-lucide-x"
            aria-label="Clear input"
            @click="searchQuery = ''"
          />
        </template>
      </UInput>

      <div class="flex flex-wrap gap-3">
        <USelectMenu
          v-model="selectedStack"
          :items="stackOptions"
          value-key="value"
          multiple
          :placeholder="t('projects.technologiesPlaceholder')"
          icon="i-lucide-code"
          :clear="selectedStack.length > 0"
          class="flex-1 min-w-48"
        />

        <USelectMenu
          v-model="selectedCompanies"
          :items="companyOptions"
          value-key="value"
          multiple
          :placeholder="t('projects.companiesPlaceholder')"
          icon="i-lucide-building-2"
          :clear="selectedCompanies.length > 0"
          class="flex-1 min-w-48"
        />
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <template v-if="isLoading">
        <div class="text-center py-8 text-muted">
          {{ t('projects.loading') }}
        </div>
      </template>

      <template v-else>
        <UiProjectCard
          v-for="project in filteredProjects"
          :key="project.path"
          :project="project"
          :skill-map="skillMap"
          :company-map="companyMap"
        />

        <div
          v-if="filteredProjects.length === 0"
          class="text-center py-8 text-muted"
        >
          {{ t('projects.noResults') }}
        </div>
      </template>
    </div>
  </div>
</template>
