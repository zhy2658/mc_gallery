<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/outline'

const { artworks, initArtworks } = useGallery()

// Ensure we have data
if (artworks.value.length === 0) {
  initArtworks()
}

// Get top 2 featured items
const featured = computed(() => artworks.value.slice(0, 2))
</script>

<template>
  <section class="py-20 bg-white dark:bg-dark-bg">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-sky-500 dark:text-sky-400 mb-4">
          精选作品
        </h2>
        <p class="text-gray-500 dark:text-gray-400 text-lg">
          精心挑选的优秀艺术作品，为您呈现最纯粹的视觉享受
        </p>
      </div>

      <!-- Featured Grid -->
      <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div 
          v-for="work in featured" 
          :key="work.id"
          class="group cursor-pointer"
        >
          <div class="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-lg">
            <NuxtImg 
              :src="work.imageUrl" 
              :alt="work.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
              loading="lazy"
              decoding="async"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 class="text-white text-xl font-bold mb-1">{{ work.title }}</h3>
              <p class="text-white/80 text-sm">{{ work.artist }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center">
        <NuxtLink 
          to="/gallery" 
          class="inline-flex items-center gap-2 text-sky-500 dark:text-sky-400 font-medium hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
        >
          查看更多作品
          <ArrowRightIcon class="w-5 h-5" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
