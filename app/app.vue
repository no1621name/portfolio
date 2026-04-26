<script setup lang="ts">
import type { MatrixIntsance } from './plugins/matrix-transition.client';

const matrixRef = useTemplateRef<MatrixIntsance>('matrixRef');
const { $matrix } = useNuxtApp();
onMounted(() => $matrix(matrixRef.value));
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <MatrixTransition ref="matrixRef" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
