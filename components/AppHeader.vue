<script setup lang="ts">
import { MoonIcon, SunIcon, Bars3Icon } from '@heroicons/vue/24/outline'

const route = useRoute()
const { isDark, toggleDark } = useDarkMode()
const isMobileMenuOpen = useState('mobile-menu-open', () => false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '画廊', path: '/gallery' },
  { name: '关于', path: '/about' }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <div class="bg-sky-400 text-white px-4 py-1.5 rounded-full font-medium transition-transform group-hover:scale-105">
          苗畅的画廊
        </div>
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path"
          class="text-gray-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400 font-medium transition-colors"
          :class="{ 'text-sky-500 dark:text-sky-400': route.path === item.path }"
        >
          {{ item.name }}
        </NuxtLink>
      </nav>

      <!-- Right Actions -->
      <div class="flex items-center gap-4">
        <!-- Dark Mode Toggle -->
        <button 
          @click="toggleDark" 
          class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors border border-gray-200 dark:border-gray-700"
          aria-label="Toggle Dark Mode"
        >
          <MoonIcon v-if="!isDark" class="w-5 h-5" />
          <SunIcon v-else class="w-5 h-5" />
        </button>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu" 
          class="md:hidden p-2 -mr-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <Bars3Icon class="w-6 h-6" />
        </button>
      </div>
    </div>
  </header>
</template>
