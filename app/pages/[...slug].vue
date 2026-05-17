<script setup lang="ts">
import type { PageCollections } from '@nuxt/content';

const route = useRoute();
const { locale, defaultLocale } = useI18n();

const slug = computed(() => Array.isArray(route.params.slug) ? route.params.slug as string[] : [route.params.slug as string]);
const collection = computed(() => `content_${locale.value}` as keyof PageCollections);
const path = computed(() => {
  const localePrefix = locale.value === defaultLocale ? '' : `/${locale.value}`;

  return `${localePrefix}/pages/${slug.value}`;
});
const { data: page } = await useAsyncData('page-' + route.path, () =>
  queryCollection(collection.value).path(path.value).first()
);

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}
</script>

<template>
  <div :class="!!page?.layoutCentered ? 'flex flex-col justify-center grow' : 'w-full'">
    <ContentRenderer
      v-if="page"
      :value="page"
    />
  </div>
</template>
