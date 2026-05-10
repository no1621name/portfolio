<script setup lang="ts">
withDefaults(defineProps<{
  role?: string;
  status?: string;
  location?: string;
}>(), {
  role: 'frontend dev',
  status: 'active search',
  location: 'Earth'
});

const terminalLinks = await useGetTerminalMenuLinks();
</script>

<template>
  <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center content-center w-full">
    <div class="flex flex-col h-auto gap-6">
      <div class="font-heading text-3xl lg:text-4xl text-primary">
        <slot name="title" />
      </div>
      <div class="text-muted text-base lg:text-md max-w-xl *:my-0">
        <slot
          name="description"
        />
      </div>
    </div>

    <div class="border w-full lg:ml-auto min-w-0">
      <div class="border-b border-border bg-muted px-3 py-2 flex items-center gap-2">
        <div class="text-xs text-muted font-mono">
          guest@portfolio:~
        </div>
      </div>

      <div class="relative">
        <div class="scanlines absolute inset-0 pointer-events-none" />
        <div class="p-4 md:p-6 flex flex-col gap-4 font-mono text-sm overflow-auto">
          <div class="w-max">
            <div class="flex gap-8 items-start">
              <pre class="text-primary leading-none font-bold select-none">
  ____
 / ___|
| |  _
| |_| |
 \____|
        </pre>

              <div class="flex flex-col gap-3 text-text w-full">
                <p>
                  <span class="text-muted">role:</span>
                  {{ role }}
                </p>
                <p>
                  <span class="text-muted">status:</span>
                  <UChip
                    as="span"
                    standalone
                    inset
                    class="mx-2"
                  />
                  <span class="text-success">
                    {{ status }}
                  </span>
                </p>
                <p>
                  <span class="text-muted">location:</span>
                  {{ location }}
                </p>
              </div>
            </div>
            <TerminalMenu :items="terminalLinks" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
