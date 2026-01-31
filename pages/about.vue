<script setup lang="ts">
useHead({
  title: '苗畅的画廊 - 关于',
  meta: [
    { name: 'description', content: '关于苗畅，艺术家介绍' }
  ]
})
</script>

<template>
  <div class="py-20 bg-white dark:bg-dark-bg">
    <div class="container mx-auto px-4 max-w-4xl">
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          关于 <span class="text-sky-500">苗畅</span>
        </h1>
        <p class="text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
          "艺术不是模仿，而是创造。每一次落笔，都是与灵魂的对话。"
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div class="relative rounded-2xl overflow-hidden shadow-2xl">
          <NuxtImg 
            src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Artist%20portrait%20in%20studio%2C%20natural%20lighting%2C%20creative%20atmosphere%2C%20professional%20photography&image_size=portrait_4_3" 
            alt="苗畅" 
            class="w-full h-full object-cover"
          />
        </div>
        <div class="space-y-6 text-gray-600 dark:text-gray-300">
          <p>
            苗畅是一位充满激情的当代艺术家，专注于探索自然与城市之间的微妙关系。
            他的作品融合了传统技法与现代审美，创造出既有深意又极具视觉冲击力的艺术语言。
          </p>
          <p>
            毕业于知名艺术学院，苗畅的作品曾在多个国际画廊展出，并被私人收藏家广泛收藏。
            他相信艺术应该触动人心，引发思考，而不仅仅是视觉上的愉悦。
          </p>
          <div class="pt-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">主要成就</h3>
            <ul class="space-y-2 list-disc list-inside">
              <li>2023年 国际当代艺术金奖</li>
              <li>2024年 "城市之光" 个人画展</li>
              <li>作品《晨雾》被国家美术馆收藏</li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Contact -->
      <div class="bg-gray-50 dark:bg-dark-card rounded-3xl p-8 md:p-12 text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">联系方式</h2>
        <p class="text-gray-500 dark:text-gray-400 mb-8">
          对作品感兴趣？欢迎通过以下方式联系
        </p>
        <div class="flex flex-col md:flex-row justify-center gap-6">
          <a href="#" class="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full transition-colors">
            发送邮件
          </a>
          <a href="#" class="px-8 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-full transition-colors">
            关注 Instagram
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
