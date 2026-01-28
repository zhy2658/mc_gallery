<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const { filteredArtworks, initArtworks, filters, page, totalPages, setPage } = useGallery()

useHead({
  title: '苗昀的画廊 - 作品集',
  meta: [
    { name: 'description', content: '浏览所有艺术作品，发现更多精彩' }
  ]
})

// Ensure data is loaded
initArtworks()

// Generate page numbers to display
const displayedPages = computed(() => {
  const total = totalPages.value
  const current = page.value
  const delta = 2 // Number of pages to show around current
  
  const range = []
  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i)
  }

  if (current - delta > 2) {
    range.unshift('...')
  }
  if (current + delta < total - 1) {
    range.push('...')
  }

  const pages = []
  if (total > 0) pages.push(1)
  pages.push(...range)
  if (total > 1) pages.push(total)
  
  // Dedup and sort just in case logic above overlaps for small totals
  // Actually simpler logic for small counts:
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  return pages
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-bg py-12">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold text-sky-500 dark:text-sky-400 mb-4">
          艺术画廊
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          探索精美的艺术作品收藏
        </p>
      </div>

      <!-- Filters -->
      <SearchFilter />

      <!-- Grid -->
      <div 
        v-if="filteredArtworks.length > 0"
        class="grid gap-6"
        :class="filters.viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'"
      >
        <ArtworkCard 
          v-for="work in filteredArtworks" 
          :key="work.id" 
          :artwork="work"
          :class="{ 'flex gap-6': filters.viewMode === 'list' }"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <p class="text-gray-500 dark:text-gray-400 text-lg">
          没有找到匹配的艺术作品
        </p>
      </div>
      
      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-12 flex justify-center items-center gap-2">
        <!-- Prev Button -->
        <button 
          @click="setPage(page - 1)" 
          :disabled="page === 1"
          class="w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous Page"
        >
          <ChevronLeftIcon class="w-5 h-5" />
        </button>

        <!-- Page Numbers -->
        <template v-for="(p, index) in displayedPages" :key="index">
          <button 
            v-if="typeof p === 'number'"
            @click="setPage(p)"
            :class="[
              'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
              page === p 
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' 
                : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            ]"
          >
            {{ p }}
          </button>
          <span v-else class="w-10 h-10 flex items-center justify-center text-gray-400">
            {{ p }}
          </span>
        </template>

        <!-- Next Button -->
        <button 
          @click="setPage(page + 1)" 
          :disabled="page === totalPages"
          class="w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next Page"
        >
          <ChevronRightIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>
