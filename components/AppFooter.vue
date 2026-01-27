<template>
  <footer class="bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-gray-800 py-8 transition-colors duration-300">
    <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
        <span class="font-medium text-gray-900 dark:text-white">苗昀的画廊</span>
        <span class="mx-2">© 2026</span>
        <span>版权声明：保留所有权利</span>
      </div>
      
      <div class="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
        <NuxtLink to="/about" class="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">关于</NuxtLink>
        <a href="#" class="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">帮助</a>
        <a href="#" class="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">条款</a>
      </div>
    </div>
  </footer>
</template>
