<script setup lang='ts'>
import type { PossibleModalsType } from '@/types'
interface Props {
  title: string
  icon: string
  text: string
  btnText: string
  modal: PossibleModalsType
}
defineProps<Props>()
const { openModal } = (useGeneralStore())
</script>

<template>
  <div class="bg-slate-600 rounded-xl shadow max-w-sm relative flex-shrink-0 w-screen-sm">
    <div class="p-6 space-y-8">
      <h3 class="text-2xl font-bold">
        {{ title }}
      </h3>

      <NuxtPicture
        class="inline-block"
        preload
        :src="`/svg/${icon}.svg`"
        :img-attrs="{ class: 'h-24 w-24 mx-auto' }"
      />

      <p v-html="text" />

      <button class="btn main party_btn" @click="openModal(modal)">
        {{ btnText }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.party_btn {
  --at-apply: rounded-xl bg-slate-100 text-slate-600 font-bold px-6 py-2 uppercase;
}
</style>
