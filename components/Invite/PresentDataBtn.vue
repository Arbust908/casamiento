<script setup lang='ts'>
defineProps<{
  data: [string, string]
}>()
const hasCopied = ref(false)
const copyData = (data: string) => {
  navigator.clipboard.writeText(data)
  hasCopied.value = true
  setTimeout(() => {
    hasCopied.value = false
  }, 2000)
}
</script>

<template>
  <button @click="copyData(data[1])">
    <span v-if="hasCopied">Copiado!</span>
    <template v-else>
      <span>{{ data[0] }}</span>
      <span>{{ data[1] }}</span>
      <i class="i-ri-file-copy-2-line text-transparent" />
    </template>
  </button>
</template>

<style lang="scss" scoped>
    button {
      --at-apply: "px-4 py-2 flex items-center justify-between gap-x-2 rounded-xl hover:(text-slate-200 shadow-xl)";
      & > span:first-of-type {
        --at-apply: "text-slate-200 font-bold";
      }
      &:hover i {
        --at-apply: text-slate-200;
      }
    }
</style>
