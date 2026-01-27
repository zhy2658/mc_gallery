<script setup lang="ts">
import { MagnifyingGlassIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/vue/24/outline'

const { filters } = useGallery()

const categories = [
  { label: '全部', value: 'all' },
  { label: '风景', value: '风景' },
  { label: '城市', value: '城市' },
  { label: '静物', value: '静物' },
  { label: '抽象', value: '抽象' }
]

const sortOptions = [
  { label: '最新发布', value: 'latest' },
  { label: '最受欢迎', value: 'popular' }
]
</script>

<template>
  <div class="bg-white dark:bg-dark-card rounded-2xl shadow-sm p-4 mb-8">
    <div class="flex flex-col md:flex-row gap-4">
      <!-- Search -->
      <div class="flex-1 relative">
        <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          v-model="filters.search"
          type="text" 
          placeholder="搜索艺术作品..." 
          class="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-sky-500 transition-all"
        >
      </div>

      <!-- Filters Group -->
      <div class="flex gap-2 overflow-x-auto pb-2 md:pb-0">
        <!-- Category Dropdown -->
        <select 
          v-model="filters.category"
          class="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 cursor-pointer min-w-[120px]"
        >
          <option v-for="cat in categories" :key="cat.value" :value="cat.value">
            {{ cat.label }}
          </option>
        </select>

        <!-- Sort Dropdown -->
        <select 
          v-model="filters.sort"
          class="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 cursor-pointer min-w-[120px]"
        >
          <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>

        <!-- View Toggle -->
        <div class="flex bg-gray-50 dark:bg-gray-800 p-1 rounded-xl">
          <button 
            @click="filters.viewMode = 'grid'"
            class="p-2 rounded-lg transition-colors"
            :class="filters.viewMode === 'grid' ? 'bg-white dark:bg-gray-700 text-sky-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'"
          >
            <Squares2X2Icon class="w-5 h-5" />
          </button>
          <button 
            @click="filters.viewMode = 'list'"
            class="p-2 rounded-lg transition-colors"
            :class="filters.viewMode === 'list' ? 'bg-white dark:bg-gray-700 text-sky-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'"
          >
            <ListBulletIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
