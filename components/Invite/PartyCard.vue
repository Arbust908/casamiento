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
  <div class="bg-slate-600 rounded-xl shadow w-[300px] h-[400px] relative flex-shrink-0 p-6 flex flex-col justify-between">
    <h3 class="text-6xl font-main">
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
</template>

<style scoped lang="scss">
.party_btn {
  --at-apply: rounded-xl bg-slate-100 text-slate-600 font-bold px-6 py-2 uppercase;
}
</style>
