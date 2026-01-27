<script setup lang="ts">
const stats = [
  { label: '艺术作品', value: '1250' },
  { label: '艺术家', value: '89' },
  { label: '艺术分类', value: '24' },
  { label: '访客数量', value: '15680' }
]
</script>

<template>
  <section class="py-16 bg-gray-50 dark:bg-dark-bg/50 border-y border-gray-100 dark:border-gray-800">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div 
          v-for="(stat, index) in stats" 
          :key="index"
          class="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center group"
        >
          <div class="text-4xl lg:text-5xl font-bold text-sky-500 dark:text-sky-400 mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">
            {{ stat.value }}
          </div>
          <div class="text-gray-500 dark:text-gray-400 font-medium">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
