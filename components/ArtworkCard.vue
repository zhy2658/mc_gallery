<script setup lang="ts">
import { HeartIcon, EyeIcon, PhotoIcon } from '@heroicons/vue/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid'
import type { Artwork } from '~/composables/useGallery'

const props = defineProps<{
  artwork: Artwork
}>()

const isLoaded = ref(false)
const hasError = ref(false)
const likesCount = ref(props.artwork.likes)
const isLiked = ref(false)
const isLiking = ref(false)

// Sync with prop if it changes
watch(() => props.artwork.likes, (newVal) => {
  likesCount.value = newVal
})

const onImageLoad = () => {
  isLoaded.value = true
}

const onImageError = () => {
  hasError.value = true
  isLoaded.value = true // Stop loading state
}

const toggleLike = async (e: Event) => {
  e.preventDefault()
  e.stopPropagation()
  
  if (isLiking.value) return
  
  isLiking.value = true
  const originalLikes = likesCount.value
  
  // Optimistic update
  likesCount.value += 1
  isLiked.value = true
  
  try {
    const res = await $fetch<{ success: boolean, likes: number }>(`/api/artworks/${props.artwork.id}/like`, { method: 'POST' })
    if (res.success) {
      likesCount.value = res.likes
    }
  } catch (e) {
    // Revert
    likesCount.value = originalLikes
    isLiked.value = false
  } finally {
    isLiking.value = false
  }
}
</script>

<template>
  <div class="group relative bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
    <!-- Image Container -->
    <NuxtLink :to="'/artwork/' + artwork.id" class="block relative w-full aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer">
      <!-- Loading Skeleton -->
      <div 
        v-if="!isLoaded && !hasError"
        class="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse z-10"
      >
        <PhotoIcon class="w-8 h-8 text-gray-400 dark:text-gray-600" />
      </div>

      <!-- Error State -->
      <div 
        v-if="hasError"
        class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10"
      >
        <div class="text-center text-gray-400">
          <PhotoIcon class="w-8 h-8 mx-auto mb-1" />
          <span class="text-xs">加载失败</span>
        </div>
      </div>

      <NuxtImg 
        :src="artwork.imageUrl" 
        :alt="artwork.title"
        loading="lazy"
        decoding="async"
        @load="onImageLoad"
        @error="onImageError"
        class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 will-change-transform"
        :class="{ 'opacity-0': !isLoaded, 'opacity-100': isLoaded }"
      />
      
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
        <button 
          @click="toggleLike"
          class="p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-colors"
          :class="{ 'text-rose-500 bg-white/30': isLiked }"
        >
          <component :is="isLiked ? HeartIconSolid : HeartIcon" class="w-6 h-6" />
        </button>
        <div class="p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-colors">
          <EyeIcon class="w-6 h-6" />
        </div>
      </div>
      
      <!-- Category Badge -->
      <span class="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs rounded-full">
        {{ artwork.category }}
      </span>
    </NuxtLink>

    <!-- Content -->
    <div class="p-5">
      <NuxtLink :to="'/artwork/' + artwork.id">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-sky-500 transition-colors">
          {{ artwork.title }}
        </h3>
      </NuxtLink>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
        {{ artwork.description }}
      </p>
      
      <div class="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 pt-4 border-t border-gray-100 dark:border-gray-700">
        <span>{{ artwork.artist }}</span>
        <div class="flex items-center gap-3">
          <span class="flex items-center gap-1">
            <EyeIcon class="w-3 h-3" /> {{ artwork.views }}
          </span>
          <span class="flex items-center gap-1" :class="{ 'text-rose-500': isLiked }">
            <component :is="isLiked ? HeartIconSolid : HeartIcon" class="w-3 h-3" /> {{ likesCount }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
