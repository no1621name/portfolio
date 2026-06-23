<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

const skull = `
  _____
 /     \\
| () () |
 \\  ^  /
  |||||
  |||||`;

const hanldeNavigate = () => {
  clearError({ redirect: localePath('/') });
};

defineShortcuts({
  enter: hanldeNavigate
});
</script>

<template>
  <div class="w-full flex grow items-center justify-center">
    <div class="relative border border-border bg-muted/50 rounded-lg  w-fit max-w-xl">
      <div class="scanlines absolute inset-0 pointer-events-none rounded-lg" />

      <div class="relative font-mono text-sm">
        <div class="border-b border-border bg-muted/50 px-3 py-2 flex items-center gap-2 mb-6 rounded-t-lg">
          <div class="text-xs text-muted">
            guest@portfolio:~
          </div>
          <span class="text-primary">$ </span>
          <span class="text-text">error 404</span>
        </div>

        <pre
          class="text-primary leading-none font-bold select-none mb-6 w-max mx-auto"
        >{{ skull }}</pre>

        <div class="text-center mb-8">
          <h1 class="font-heading text-4xl lg:text-6xl text-primary leading-none mb-2">
            {{ t('notFound.title') }}
          </h1>
          <h2 class="text-xl lg:text-2xl text-text mb-4">
            {{ t('notFound.subtitle') }}
          </h2>
          <p class="text-muted max-w-md mx-auto">
            {{ t('notFound.description') }}
          </p>
        </div>

        <div class="border-t border-border flex justify-center">
          <NuxtLink
            class="cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/10 transition-colors font-mono text-sm w-full md:w-auto justify-center"
            @click="hanldeNavigate"
          >
            <span>> </span>
            <span>{{ t('notFound.homeLink') }}</span>
            <span class="cursor" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
