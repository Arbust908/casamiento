<script setup lang='ts'>
import type { ConfirmationStatusType } from '@/types'
import { ConfirmationStatus } from '@/types'
interface Props {
  confirmed: ConfirmationStatusType
}
const props = withDefaults(
  defineProps<Props>(),
  {
    confirmed: ConfirmationStatus.PENDING,
  },
)
const { CONFIRMED, DECLINED, PENDING } = ConfirmationStatus

const confirmationText = computed(() => {
  switch (props.confirmed) {
    case CONFIRMED:
      return 'Viene'
    case DECLINED:
      return 'No viene'
    default:
      return 'Pendiente'
  }
})
</script>

<template>
  <span
    class="confirmation-pill" :class="{
      'text-emerald-800 bg-emerald-100': confirmed === CONFIRMED,
      'text-rose-800 bg-rose-100': confirmed === DECLINED,
      'text-gray-800 bg-gray-100': confirmed === PENDING,
    }"
  >
    <svg
      class="dot" :class="{
        'text-emerald-400': confirmed === CONFIRMED,
        'text-rose-400': confirmed === DECLINED,
        'text-gray-400': confirmed === PENDING,
      }" fill="currentColor" viewBox="0 0 8 8"
    >
      <circle cx="4" cy="4" r="3" />
    </svg>
    {{ confirmationText }}
  </span>
</template>

<style scoped lang='scss'>
.confirmation-pill {
    --at-apply: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mr-auto";

    & > .dot {
        --at-apply: -ml-0.5 mr-1.5 h-2 w-2;
    }
}
</style>
