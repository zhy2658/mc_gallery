<script setup lang="ts">
const runtime = ref('')
const startYear = 2026
const currentYear = new Date().getFullYear()
const copyrightYear = currentYear === startYear ? `${startYear}` : `${startYear}-${currentYear}`
let timer: ReturnType<typeof setInterval> | null = null

const updateRuntime = () => {
  const startDate = new Date('2026-01-20T00:00:00')
  const now = new Date()
  const diffTime = now.getTime() - startDate.getTime()
  
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diffTime % (1000 * 60)) / 1000)
  
  runtime.value = `本站已运行 ${days}天 ${hours}小时 ${minutes}分 ${seconds}秒`
}

onMounted(() => {
  updateRuntime()
  timer = setInterval(updateRuntime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <footer class="bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-gray-800 py-8 transition-colors duration-300">
    <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left flex flex-col gap-1">
        <div>
          <span class="font-medium text-gray-900 dark:text-white">苗畅的画廊</span>
          <span class="mx-2">© {{ copyrightYear }}</span>
          <span>版权声明：保留所有权利</span>
        </div>
        <div v-if="runtime" class="text-xs opacity-80">
          <span class="mr-2">2026年1月20日</span>
          <span>{{ runtime }}</span>
        </div>
      </div>
      
      <div class="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
        <NuxtLink to="/about" class="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">关于</NuxtLink>
        <a href="#" class="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">帮助</a>
        <a href="#" class="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">条款</a>
      </div>
    </div>
  </footer>
</template>
