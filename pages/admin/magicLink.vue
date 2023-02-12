<script setup lang='ts'>
import MagicBookJson from '@/assets/lottie/magic_book.json'

definePageMeta({
  layout: 'empty',
})
</script>

<template>
  <main class="flex justify-center items-center">
    <section class="bg-slate-200 rounded-2xl p-6 w-[300px] h-[300px]">
      <h1 class="text-rose-500 font-bold text-center uppercase text-2xl mb-6">
        Magic Link
      </h1>
      <ClientOnly>
        <Vue3Lottie :animation-data="MagicBookJson" :height="200" :width="200" />
      </ClientOnly>
    </section>
  </main>
</template>
