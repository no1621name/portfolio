<script setup lang="ts">
import { useGetExperienceCollectionKey } from '~/composables/use-get-collection-keys';

const { locale, t } = useI18n();

const collectionKey = useGetExperienceCollectionKey();

const { data: entries } = await useAsyncData(
  'experience-entries',
  () => queryCollection(collectionKey.value)
    .order('startDate', 'DESC')
    .all(),
  { watch: [locale] }
);

function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString(locale.value, { year: 'numeric', month: 'numeric' });
}

function formatEndDate(date: Date | string | undefined): string {
  if (!date) return t('experience.present');
  return formatDate(date);
}

function calculateDuration(startDate: Date | string, endDate?: Date | string): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const diffMs = end.getTime() - start.getTime();
  const diffMonths = Math.round(diffMs / (1000 * 60 * 60 * 24 * 30.44));

  if (diffMonths < 12) {
    return `~${diffMonths} ${t('experience.month')}`;
  }
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;
  return months > 0
    ? `~${years} ${t('experience.year')} ${months} ${t('experience.month')}`
    : `~${years} ${t('experience.year')}`;
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="entry in entries"
      :key="entry.slug"
      class="flex flex-col"
    >
      <div class="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 w-full py-2 px-0 border-b border-transparent hover:border-divider transition-colors">
        <div class="flex flex-col">
          <span class="font-heading text-xl text-primary">
            <span class="text-muted mr-2">&gt;</span>{{ entry.company }}
          </span>
          <span class="text-secondary text-sm">
            {{ entry.jobTitle }}
          </span>
        </div>
        <div class="flex items-center gap-3 text-sm text-muted font-mono whitespace-nowrap">
          <span class="text-primary/70">
            {{ calculateDuration(entry.startDate, entry.endDate) }}
          </span>
          <span class="inline-flex items-center gap-1">
            [{{ formatDate(entry.startDate) }}] <UIcon name="i-lucide-move-right" /> [{{ formatEndDate(entry.endDate) }}]
          </span>
        </div>
      </div>

      <div class="py-2 text-sm text-primary/80 prose prose-mono prose-invert max-w-none">
        <ContentRenderer :value="entry" />
      </div>
    </div>
  </div>
</template>
