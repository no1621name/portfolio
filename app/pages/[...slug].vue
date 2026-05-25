<script setup lang="ts">
import { useGetPageCollectionKey } from '~/composables/use-get-collection-keys';

const route = useRoute();
const { locale, defaultLocale } = useI18n();
const collectionKey = useGetPageCollectionKey();

const slug = computed(() => Array.isArray(route.params.slug) ? route.params.slug as string[] : [route.params.slug as string]);
const path = computed(() => {
  const localePrefix = locale.value === defaultLocale ? '' : `/${locale.value}`;

  return `${localePrefix}/${slug.value.join('/')}`;
});
const { data: page } = await useAsyncData('page-' + route.path, () =>
  queryCollection(collectionKey.value).path(path.value).first()
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
