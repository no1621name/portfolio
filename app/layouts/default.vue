<script setup lang="ts">
const navLinks = await useGetNavLinks();
</script>

<template>
  <div class="min-h-screen">
    <header class="border-b border-default bg-default sticky top-0 z-50">
      <div class="container mx-auto p-2 md:p-4 flex justify-between items-center">
        <SiteNavigation
          :nav-links="navLinks"
        />
        <div class="w-full flex justify-between md:w-max">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8 pb-20 md:pb-8">
      <slot />
    </main>
  </div>
</template>
