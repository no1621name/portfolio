<template>
  <div
    class="min-h-screen"
  >
    <header class="border-b border-default bg-default">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="font-heading text-xl">
          Terminal Portfolio
        </h1>
        <ThemeSwitcher />
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>

    <footer class="border-t border-default bg-default mt-auto">
      <div class="container mx-auto px-4 py-4 text-center text-muted">
        <p>uptime: <span class="text-primary">calculating...</span></p>
      </div>
    </footer>
  </div>
</template>
