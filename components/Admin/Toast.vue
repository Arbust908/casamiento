<script setup lang='ts'>

</script>

<template>
  <article class="rounded bg-slate-500 shadow w-[500px] fixed top-6 right-6 rounded-xl p-4 flex gap-x-2">
    <div class="toast__icon">
      <slot name="icon" />
    </div>
    <div class="toast__content">
      <slot />
    </div>
  </article>
</template>

<style scoped lang='scss'>
.toast {
    &__icon {
        --at-apply: flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-200 text-indigo-6;
    }
    &__content {
        --at-apply: flex-grow text-sm;
    }
}
</style>
