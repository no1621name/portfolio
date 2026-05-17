<script setup lang="ts">
import type { TerminalMenuItem } from '~/types/navigation';

const props = defineProps<{
  items: TerminalMenuItem[];
}>();

const focusedIndex = ref(0);
const localePath = useLocalePath();

const navigate = (index: number) => {
  navigateTo(localePath(props.items[index]?.path ?? '/'));
};

defineShortcuts({
  arrowdown: () => {
    focusedIndex.value = (focusedIndex.value + 1) % props.items.length;
  },
  arrowup: () => {
    focusedIndex.value = (focusedIndex.value - 1 + props.items.length) % props.items.length;
  },
  enter: () => {
    navigate(focusedIndex.value);
  }
});
</script>

<template>
  <div class="mt-2">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="cursor-pointer"
      :class="{ 'bg-muted/50': index === focusedIndex }"
      @mouseenter="focusedIndex = index"
      @click="navigate(index)"
    >
      <span
        v-if="index === focusedIndex"
        class="text-primary"
      >> </span>
      <span class="text-text">{{ item.label }}</span>
      <span
        v-if="index === focusedIndex"
        class="cursor"
      />
    </div>
  </div>
</template>
