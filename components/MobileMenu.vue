<script setup lang="ts">
import { XMarkIcon, MoonIcon, SunIcon, HomeIcon, PhotoIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const { isDark, toggleDark } = useDarkMode()
const isMobileMenuOpen = useState('mobile-menu-open')

const closeMenu = () => {
  isMobileMenuOpen.value = false
}

const navItems = [
  { name: '首页', path: '/', icon: HomeIcon },
  { name: '画廊', path: '/gallery', icon: PhotoIcon },
  { name: '关于', path: '/about', icon: InformationCircleIcon }
]

// Close menu on route change
watch(() => route.path, () => {
  closeMenu()
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-full"
  >
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed inset-0 z-[60] bg-white dark:bg-dark-bg flex flex-col"
    >
      <!-- Header -->
      <div class="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-800">
        <div class="bg-sky-400 text-white px-4 py-1.5 rounded-full font-medium">
          苗昀的画廊
        </div>
        <button 
          @click="closeMenu"
          class="p-2 -mr-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- Nav Items -->
      <div class="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path"
          class="flex items-center gap-4 p-4 rounded-xl transition-colors"
          :class="route.path === item.path 
            ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'"
        >
          <component :is="item.icon" class="w-6 h-6" />
          <span class="font-medium text-lg">{{ item.name }}</span>
        </NuxtLink>
      </div>

      <!-- Footer Actions -->
      <div class="p-6 border-t border-gray-100 dark:border-gray-800">
        <div class="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl">
          <span class="text-gray-600 dark:text-gray-300 font-medium">暗夜模式</span>
          <button 
            @click="toggleDark" 
            class="p-2 rounded-full bg-white dark:bg-dark-card shadow-sm border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300"
          >
            <MoonIcon v-if="!isDark" class="w-5 h-5" />
            <SunIcon v-else class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
