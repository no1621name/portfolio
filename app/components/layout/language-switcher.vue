<script setup lang="ts">
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value);
});
</script>

<template>
  <UButton
    v-for="availableLocale in availableLocales"
    :key="availableLocale.code"
    :to="switchLocalePath(availableLocale.code)"
    variant="ghost"
    size="sm"
    color="primary"
  >
    {{ availableLocale.code }}
  </UButton>
</template>
