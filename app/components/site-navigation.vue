<script setup lang="ts">
import type { NavLink } from '~/types/navigation';

const route = useRoute();
const localePath = useLocalePath();

defineProps<{
  navLinks: NavLink[];
}>();

const isActive = (path: string) => {
  return route.path === localePath(path);
};
</script>

<template>
  <nav class="flex gap-x-2 items-center justify-center md:justify-center fixed bottom-0 left-0 right-0 md:relative md:bottom-auto md:left-auto md:right-auto z-50 bg-default border-t border-default md:border-t-0">
    <UTooltip
      v-for="link in navLinks"
      :key="link.path"
      :text="link.label"
    >
      <UButton
        :to="localePath(link.path)"
        :aria-label="link.label"
        :variant="isActive(link.path) ? 'solid' : 'ghost'"
        class="leading-none"
        size="lg"
        square
      >
        {{ link.symbol }}
      </UButton>
    </UTooltip>
  </nav>
</template>
