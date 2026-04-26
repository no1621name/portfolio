<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui';

const colorMode = useColorMode();

const themes: SelectItem[] = [
  { value: 'green', label: 'Green', icon: 'i-lucide-terminal' },
  { value: 'mono', label: 'Mono', icon: 'i-lucide-monitor' },
  { value: 'ibm', label: 'IBM', icon: 'i-lucide-cpu' }
];
</script>

<template>
  <USelect
    v-model="colorMode.preference"
    :items="themes"
    size="sm"
    class="w-32"
  />
</template>
