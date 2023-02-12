<script setup lang='ts'>
import { useGeneralStore } from '@/composables/general'

const props = defineProps<{
  open: boolean
}>()
const generalState = useGeneralStore()

const { closeModal } = generalState

const backdropOpen = ref(false)
const boxOpen = ref(false)

watch(
  () => props.open,
  (open) => {
    if (open) {
      backdropOpen.value = true
      setTimeout(() => {
        boxOpen.value = true
      }, 300)
    }
    else {
      boxOpen.value = false
      setTimeout(() => {
        backdropOpen.value = false
      }, 300)
    }
  },
)
</script>

<template>
  <Transition name="fade-in">
    <aside v-if="backdropOpen" class="modal__backdrop cursor-pointer" @click.self="closeModal()">
      <Transition name="pop-up">
        <article v-if="boxOpen" class="modal__box cursor-auto">
          <div class="i-ri-close-line text-slate-200 absolute top-3 right-6 w-8 h-8 cursor-pointer" @click="closeModal" />
          <h3 class="modal__title">
            <slot name="title" />
          </h3>
          <slot />
        </article>
      </Transition>
    </aside>
  </Transition>
</template>

<style scoped lang='scss'>
.modal {
  &__backdrop {
    --at-apply: fixed inset-0 bg-gray-700/50 backdrop-blur-md z-30 flex justify-center items-center h-full;
  }
  &__box {
    --at-apply: max-w-md w-full rounded p-5 bg-slate-700 relative transform will-change-auto shadow shadow-slate-100/25;
  }
  &-decoration {
    --at-apply: absolute -z-1 w-full inset-x-0 transition;
    &.top {
      --at-apply: top-0 -translate-y-full -scale-x-100;
    }
    &.bottom {
      --at-apply: bottom-0 translate-y-full;
    }
  }
  &__title {
    --at-apply: text-2xl text-center font-bold mb-12;
  }
  &__btn {
    --at-apply: rounded-xl bg-slate-100 border border-transparent text-slate-700 py-1 px-3 mx-auto;
    &:hover {
      --at-apply: bg-transparent text-slate-100 border-slate-100;
    }
  }
}
/* fade in vue3 transition animation */
.fade-in-enter-active,
.fade-in-leave-active {
  --at-apply: transition-opacity duration-300;
}
.fade-in-enter,
.fade-in-leave-to {
  --at-apply: opacity-0;
}
/* pop up vue3 transition animation */
.pop-up-enter-active,
.pop-up-leave-active {
  --at-apply: transition-all duration-300;
}
.pop-up-enter,
.pop-up-leave-to {
  --at-apply: transform scale-50 opacity-0;
}
</style>
