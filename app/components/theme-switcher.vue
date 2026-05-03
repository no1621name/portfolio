<script setup lang="ts">
const colorMode = useColorMode();

const themes = ref([
  { value: 'green', label: 'green', icon: 'i-lucide-terminal' },
  { value: 'mono', label: 'mono', icon: 'i-lucide-monitor' },
  { value: 'ibm', label: 'ibm', icon: 'i-lucide-cpu' }
]);

const activeThemeIcon = computed(() => themes.value.find(theme => theme.value === colorMode.value)?.icon);
</script>

<template>
  <USelect
    v-model="colorMode.preference"
    :items="themes"
    :icon="activeThemeIcon"
    size="sm"
  />
</template>
