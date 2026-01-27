<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <section class="relative h-[calc(100vh-4rem)] min-h-[600px] flex items-center overflow-hidden bg-gradient-to-br from-[#5b78f0] to-[#6f48c2]">
    <!-- Background Decor (Optimized using radial gradients instead of multiple blurred divs) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.05)_0%,transparent_25%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_75%_66%,rgba(168,85,247,0.2)_0%,transparent_40%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_66%_50%,rgba(56,189,248,0.1)_0%,transparent_20%)]"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
      <!-- Left Content -->
      <div class="text-center lg:text-left space-y-8">
        <h1 class="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
          探索 <span class="text-amber-400">艺术之美</span>
        </h1>
        <p class="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto lg:mx-0 font-light">
          在这里发现世界各地的独特艺术作品，感受创意与灵感的碰撞。
          沉浸在视觉的盛宴中，寻找属于你的那份感动。
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <NuxtLink 
            to="/gallery" 
            class="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-colors shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
          >
            立即体验
            <ArrowRightIcon class="w-5 h-5" />
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-medium transition-colors backdrop-blur-sm flex items-center justify-center"
          >
            了解更多
          </NuxtLink>
        </div>
      </div>

      <!-- Right Image Stack -->
      <div class="relative hidden lg:block h-[500px]">
        <!-- Decorative Cards using NuxtImg -->
        <div class="absolute top-10 right-10 w-64 h-80 rounded-2xl overflow-hidden shadow-xl transform rotate-6 hover:rotate-0 transition-transform duration-500 z-10 border-4 border-white/10 will-change-transform">
          <NuxtImg 
            src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Modern%20art%20gallery%20interior%2C%20minimalist%20design%2C%20soft%20lighting%2C%20high%20resolution&image_size=portrait_4_3" 
            alt="Art 1" 
            class="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="absolute top-24 right-48 w-60 h-72 rounded-2xl overflow-hidden shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 z-20 border-4 border-white/10 will-change-transform">
          <NuxtImg 
            src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Colorful%20abstract%20painting%2C%20vibrant%20colors%2C%20acrylic%20pour%2C%20artistic%20texture&image_size=portrait_4_3" 
            alt="Art 2" 
            class="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="absolute top-48 right-20 w-72 h-64 rounded-2xl overflow-hidden shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500 z-30 border-4 border-white/10 will-change-transform">
          <NuxtImg 
            src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Serene%20landscape%20painting%2C%20sunset%20over%20ocean%2C%20impressionist%20style%2C%20calming%20colors&image_size=landscape_4_3" 
            alt="Art 3" 
            class="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        
        <!-- Floating Badge -->
        <div class="absolute top-0 right-0 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center animate-bounce-slow">
           <div class="w-8 h-8 rounded-full border-2 border-sky-400"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-bounce-slow {
  animation: bounce 3s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(-5%); }
  50% { transform: translateY(5%); }
}
</style>
