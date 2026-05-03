<template>
  <div
    class="min-h-screen"
  >
    <header class="border-b border-default bg-default">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <SiteNavigation
          :nav-links="[
            { symbol: '~', path: '', label: 'Homepage' },
            { symbol: 'whoami', path: '/about', label: 'About' }
          ]"
        />
        <div>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8 pb-20 md:pb-8">
      <slot />
    </main>

    <footer class="border-t border-default bg-default mt-auto">
      <div class="container mx-auto px-4 py-4 text-center text-muted">
        <p>uptime: <span class="text-primary">calculating...</span></p>
      </div>
    </footer>
  </div>
</template>
