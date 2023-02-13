<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGeneralStore } from '@/composables/general'

import 'vue3-lottie/dist/style.css'

const generalState = useGeneralStore()

const { hasModal } = storeToRefs(generalState)

const documentHeight = () => {
  // https://nirazanbasnet.medium.com/dont-use-100vh-for-mobile-responsive-43a709c7e9e6
  const doc = document.documentElement
  doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
}
watch(hasModal, (val) => {
  const bodyEl = document.body
  if (val) {
    bodyEl.style.top = `-${window.scrollY}px`
    bodyEl.style.position = 'fixed'
  }
  else {
    const scrollY = document.body.style.top
    bodyEl.style.position = ''
    bodyEl.style.top = ''
    window.scrollTo(0, parseInt(scrollY || '0') * -1)
  }
})
onMounted(() => {
  if (document)
    documentHeight()

  if (window)
    window.addEventListener('resize', documentHeight)
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
 --doc-height: 100%;
}
html, body , #__nuxt{
  margin: 0;
  padding: 0;
  height: 100vh; /* fallback for Js load */
  height: var(--doc-height);
  width: 100%;
}

html.dark {
  background: #222;
}
</style>
