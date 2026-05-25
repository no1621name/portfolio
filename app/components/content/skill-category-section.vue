<script setup lang="ts">
const props = defineProps<{
  title: string;
  category: string;
}>();

const { data: skills } = await useAsyncData(
  `skills-${props.category}`,
  () => queryCollection('skills').first().then(data =>
    data?.items
      .filter(item => item.category === props.category)
      .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
  )
);
</script>

<template>
  <section class="flex flex-col gap-6 mb-8">
    <h2 class="font-heading text-2xl text-primary">
      // {{ title }}
    </h2>

    <div class="w-full grid auto-rows-fr grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6  items-center gap-4">
      <UTooltip
        v-for="skill in skills"
        :key="skill.slug"
        :text="skill.name"
      >
        <NuxtLink
          :to="skill.link"
          :aria-label="skill.name"
          target="_blank"
          rel="noopener noreferrer"
          class="aspect-square md:aspect-auto scanlines group p-6 flex items-center justify-center border border-transparent transition-all duration-200 hover:border-primary hover:bg-primary/5! hover:bg-none!"
        >
          <UIcon
            :name="skill.icon"
            class="relative aspect-square transition duration-200 min-w-15 w-3/4 md:w-15 lg:w-20 flex h-full opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
          />
        </NuxtLink>
      </UTooltip>
    </div>
  </section>
</template>
