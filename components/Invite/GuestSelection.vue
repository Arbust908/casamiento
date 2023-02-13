<script setup lang='ts'>
import type { ConfirmationStatusType, Guest } from '@/types'
import { ConfirmationStatus } from '@/types'
const props = defineProps <{
  guest: Guest
}>()
const emit = defineEmits <{
  (event: 'change', guest: Guest): void
}>()
const {
  CONFIRMED,
  DECLINED,
  PENDING,
} = ConfirmationStatus
const confirmation = ref(props.guest.confirmed)
const answer = computed(() => {
  return confirmation.value === CONFIRMED || confirmation.value === DECLINED
})
const confirmationToText = computed(() => {
  switch (confirmation.value) {
    case CONFIRMED:
      return 'CONFIRMED'
    case DECLINED:
      return 'DECLINED'
    default:
      return 'PENDING'
  }
})
function handleSelection(selection: ConfirmationStatusType) {
  if (selection === confirmation.value)
    confirmation.value = PENDING

  else
    confirmation.value = selection

  emit('change', { ...props.guest, confirmed: confirmation.value })
}
function selectedClasses(selection: ConfirmationStatusType) {
  return {
    'text-slate-700': confirmation.value === selection,
    'text-slate-300': confirmation.value !== selection,
  }
}
</script>

<template>
  <article class="flex justify-between items-center" :data-id="guest.id" :data-answer="confirmationToText">
    <p class="text-lg font-bold">
      {{ guest.name }}
    </p>
    <div class="px-4 py-1 rounded bg-slate-500 relative">
      <button :class="selectedClasses(CONFIRMED)" class="w-[100px] p-1 relative z-10" @click="handleSelection(CONFIRMED)">
        Obvio que si
      </button>
      <button :class="selectedClasses(DECLINED)" class="w-[100px] p-1 relative z-10" @click="handleSelection(DECLINED)">
        No puedo
      </button>
      <Transition name="pop">
        <aside
          v-if="answer" class="bg-slate-300 rounded w-[100px] h-8 absolute top-1 z-1 transition duration-150 transform ease-out" :class="{
            'translate-x-0': confirmation === CONFIRMED,
            'translate-x-[100px]': confirmation === DECLINED,
          }"
        />
      </Transition>
    </div>
  </article>
</template>

<style scoped lang='scss'>
.pop-enter-active, .pop-leave-active {
  --at-apply: transition duration-300 transform ease-out;
}
.pop-enter, .pop-leave-to {
  --at-apply: translate-y-0 opacity-0 scale-0;
}
</style>
