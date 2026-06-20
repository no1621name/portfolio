<script setup lang="ts">
import type { MatrixInstance } from './plugins/matrix-transition.client';

const matrixRef = useTemplateRef<MatrixInstance>('matrixRef');
const { $matrix } = useNuxtApp();
onMounted(() => $matrix(matrixRef.value));

const skipPageTransition = useSkipPageTransition();
const transitionOptions = computed(() => {
  return skipPageTransition.value
    ? 'none'
    : 'page';
});

const { locale } = useI18n();

useHead({
  htmlAttrs: {
    lang: locale
  },
  titleTemplate: title => title ? `${title} | guest@portfolio:~` : 'guest@portfolio:~'
});
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <UiMatrixTransition ref="matrixRef" />
    <NuxtLayout>
      <NuxtPage :transition="{ name: transitionOptions }" />
    </NuxtLayout>
  </UApp>
</template>
