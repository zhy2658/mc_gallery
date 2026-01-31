<script setup lang="ts">
import { HeartIcon, EyeIcon, ArrowLeftIcon, CalendarIcon, TagIcon, UserIcon } from '@heroicons/vue/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid'
import type { Artwork } from '~/composables/useGallery'

const route = useRoute()
const router = useRouter()
const id = route.params.id as string

// Fetch artwork data
const { data: artwork, error, refresh } = await useFetch<Artwork>(`/api/artworks/${id}`)

// Handle 404
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Artwork not found',
    fatal: true
  })
}

// Track visit on mount
onMounted(() => {
  if (id) {
    $fetch(`/api/artworks/${id}/visit`, { method: 'POST' })
  }
})

const isLiked = ref(false) // In a real app, check if user liked it
const isLiking = ref(false)

const toggleLike = async () => {
  if (isLiking.value || !artwork.value) return
  
  isLiking.value = true
  // Optimistic update
  const originalLikes = artwork.value.likes
  artwork.value.likes += 1
  isLiked.value = true
  
  try {
    const res = await $fetch<{ success: boolean, likes: number }>(`/api/artworks/${id}/like`, { method: 'POST' })
    if (res.success) {
      artwork.value.likes = res.likes
    }
  } catch (e) {
    // Revert on error
    artwork.value.likes = originalLikes
    isLiked.value = false
  } finally {
    isLiking.value = false
  }
}

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <!-- Back Button -->
    <button 
      @click="router.back()" 
      class="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8 transition-colors"
    >
      <ArrowLeftIcon class="w-5 h-5" />
      <span>返回</span>
    </button>

    <div v-if="artwork" class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Image Section -->
      <div class="relative group rounded-2xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
        <NuxtImg 
          :src="artwork.imageUrl" 
          :alt="artwork.title"
          class="w-full h-auto object-cover"
          placeholder
        />
      </div>

      <!-- Details Section -->
      <div class="flex flex-col">
        <div class="mb-6">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-sm rounded-full font-medium">
              {{ artwork.category }}
            </span>
          </div>
          
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ artwork.title }}
          </h1>

          <div class="flex flex-wrap gap-6 text-gray-500 dark:text-gray-400 text-sm mb-8">
            <div class="flex items-center gap-2">
              <UserIcon class="w-4 h-4" />
              <span>{{ artwork.artist }}</span>
            </div>
            <div class="flex items-center gap-2">
              <CalendarIcon class="w-4 h-4" />
              <span>{{ formatDate(artwork.createdAt) }}</span>
            </div>
          </div>
        </div>

        <div class="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 mb-10">
          <p>{{ artwork.description }}</p>
        </div>

        <!-- Action Bar -->
        <div class="mt-auto pt-8 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <EyeIcon class="w-5 h-5" />
              <span class="font-medium">{{ artwork.views }}</span>
              <span class="text-xs">浏览</span>
            </div>
            <div class="flex items-center gap-2 text-rose-500">
              <HeartIconSolid class="w-5 h-5" />
              <span class="font-medium">{{ artwork.likes }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">喜欢</span>
            </div>
          </div>

          <button 
            @click="toggleLike"
            class="flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 transform active:scale-95"
            :class="isLiked ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400' : 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'"
          >
            <component :is="isLiked ? HeartIconSolid : HeartIcon" class="w-5 h-5" />
            <span>{{ isLiked ? '已喜欢' : '喜欢这个作品' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
