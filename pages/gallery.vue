<script setup lang="ts">
const { filteredArtworks, initArtworks, filters } = useGallery()

useHead({
  title: '苗昀的画廊 - 作品集',
  meta: [
    { name: 'description', content: '浏览所有艺术作品，发现更多精彩' }
  ]
})

// Ensure data is loaded
initArtworks()
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
      
      <!-- Pagination (Mock) -->
      <div class="mt-12 flex justify-center gap-2">
        <button class="w-10 h-10 rounded-lg flex items-center justify-center bg-sky-500 text-white shadow-lg shadow-sky-500/20">1</button>
        <button class="w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">2</button>
        <button class="w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">3</button>
      </div>
    </div>
  </div>
</template>
