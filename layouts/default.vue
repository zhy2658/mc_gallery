<script setup lang="ts">
const { initDarkMode } = useDarkMode()

onMounted(() => {
  initDarkMode()
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text transition-colors duration-300 font-sans">
    <AppHeader />
    <MobileMenu />
    
    <main class="flex-1 pt-16">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
