<script setup lang="ts">
import type { MatrixIntsance } from './plugins/matrix-transition.client';

const matrixRef = useTemplateRef<MatrixIntsance>('matrixRef');
const { $matrix } = useNuxtApp();
onMounted(() => $matrix(matrixRef.value));

const skipPageTransition = useSkipPageTransition();
const transitionOptions = computed(() => {
  return skipPageTransition.value
    ? 'none'
    : 'page';
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
