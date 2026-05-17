<script setup lang="ts">
import type { SkillItem, ExperienceCollectionItem, ProjectCollectionItem } from '~/types/content';

const props = defineProps<{
  project: ProjectCollectionItem;
  skills: SkillItem[];
  company?: ExperienceCollectionItem | null;
}>();

const { t } = useI18n();

const externalLink = computed(() => {
  const link = props.project.link;
  if (!link) return null;
  return link.startsWith('http') ? link : `https://${link}`;
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <div
      v-if="skills.length"
      class="flex flex-col gap-3"
    >
      <h3 class="text-sm font-mono text-muted uppercase">
        {{ t('projectDetail.technologies') }}
      </h3>
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="skill in skills"
          :key="skill.slug"
          variant="subtle"
          size="sm"
          class="font-mono"
        >
          <UIcon
            v-if="skill.icon"
            :name="skill.icon"
            class="w-3.5 h-3.5"
          />
          {{ skill.name }}
        </UBadge>
      </div>
    </div>

    <div
      v-if="company"
      class="flex flex-col gap-3"
    >
      <h3 class="text-sm font-mono text-muted uppercase">
        {{ t('projectDetail.company') }}
      </h3>
      <span class="text-primary">
        {{ company.company }}
      </span>
    </div>

    <div
      v-if="externalLink"
      class="flex flex-col gap-3"
    >
      <h3 class="text-sm font-mono text-muted uppercase">
        {{ t('projectDetail.link') }}
      </h3>
      <NuxtLinkLocale
        :to="externalLink"
        target="_blank"
        rel="noopener"
        class="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
      >
        <UIcon
          name="i-lucide-external-link"
          class="w-4 h-4"
        />
        {{ t('projectDetail.viewProject') }}
      </NuxtLinkLocale>
    </div>
  </div>
</template>
