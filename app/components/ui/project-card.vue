<script setup lang="ts">
import type { ProjectCollectionItem, SkillItem, ExperienceCollectionItem } from '~/types/content';
import { getPreviewText } from '~/utils/prose';

const props = defineProps<{
  project: ProjectCollectionItem;
  skillMap: Map<string, SkillItem>;
  companyMap: Map<string, ExperienceCollectionItem>;
}>();

const skills = computed(() => props.project.stack.map(slug => props.skillMap.get(slug)).filter((s): s is SkillItem => !!s));
const company = computed(() => props.project.company ? props.companyMap.get(props.project.company) : undefined);
const path = computed(() => {
  return '/' + props.project.stem.split('/').slice(1).join('/');
});
</script>

<template>
  <NuxtLinkLocale
    :to="path"
    class="group block p-4 border border-divider rounded-lg hover:border-primary/50 transition-colors"
  >
    <div class="flex flex-col gap-2">
      <h3 class="font-heading text-lg text-primary group-hover:text-primary/80 transition-colors">
        {{ project.name }}
      </h3>

      <p class="text-sm text-secondary line-clamp-2">
        {{ getPreviewText(project.body) }}
      </p>

      <div class="flex flex-wrap items-center gap-2 pt-1">
        <UBadge
          v-for="s in skills"
          :key="s.slug"
          variant="subtle"
          size="sm"
          class="font-mono"
        >
          <UIcon
            v-if="s.icon"
            :name="s.icon"
            class="w-3.5 h-3.5"
          />
          {{ s.name }}
        </UBadge>

        <span
          v-if="company"
          class="text-xs text-muted font-mono ml-auto"
        >
          {{ company.company }}
        </span>
      </div>
    </div>
  </NuxtLinkLocale>
</template>
