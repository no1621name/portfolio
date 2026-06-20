<script setup lang="ts">
import { useGetPageCollectionKey } from '~/composables/use-get-collection-keys';

const config = useAppConfig();
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

const metadata = {
  title: page.value?.title,
  description: page.value?.description || config.defaultInfo.description
};

useSeoMeta(metadata);
defineOgImage('NuxtSeo.satori', metadata);
</script>

<template>
  <div :class="!!page?.layoutCentered ? 'flex flex-col justify-center grow' : 'w-full'">
    <h1
      v-if="page?.title && !['Index', 'Главная'].includes(page.title)"
      class="sr-only"
    >
      {{ page.title }}
    </h1>
    <ContentRenderer
      v-if="page"
      :value="page"
    />
  </div>
</template>
