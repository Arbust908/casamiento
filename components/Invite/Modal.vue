<script setup lang='ts'>
import { storeToRefs } from 'pinia'
import { PossibleModals, useGeneralStore } from '@/composables/general'
import { useFamilyStore } from '@/stores/family'

const props = defineProps<{
  open: boolean
}>()
const generalState = useGeneralStore()
const familyState = useFamilyStore()

const { selectedFamily } = storeToRefs(familyState)

const { currentModal } = storeToRefs(generalState)
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

const modalTitle = computed(() => {
  switch (currentModal.value) {
    case PossibleModals.CEREMONIA:
      return 'Te esperamos para el Civil?'
    case PossibleModals.FIESTA:
      return 'Venis a la Fiesta?'
    case PossibleModals.MUSIC:
      return 'Pongamos play!'
    case PossibleModals.DRESS_CODE:
      return 'Código de Vestimenta'
    case PossibleModals.DRIVE:
      return 'Como llego?'
    case PossibleModals.REGALOS:
      return 'Regalos'
    default:
      return ''
  }
})
</script>

<template>
  <Transition name="fade-in">
    <aside v-if="backdropOpen" class="modal__backdrop cursor-pointer" @click.self="closeModal()">
      <Transition name="pop-up">
        <article v-if="boxOpen" class="modal__box cursor-auto">
          <div class="i-ri-close-line text-slate-200 absolute top-3 right-6 w-8 h-8 cursor-pointer" @click="closeModal" />
          <h3 class="modal__title">
            {{ modalTitle }}
          </h3>

          <InviteCeremonyModal v-if="currentModal === PossibleModals.CEREMONIA" />
          <InvitePartyModal v-else-if="currentModal === PossibleModals.FIESTA" :guests="selectedFamily?.guests" />
          <InviteMusicModal v-else-if="currentModal === PossibleModals.MUSIC" />
          <InviteDressCodeModal v-else-if="currentModal === PossibleModals.DRESS_CODE" />
          <InviteDriveModal v-else-if="currentModal === PossibleModals.DRIVE" />
          <InvitePresentModal v-else-if="currentModal === PossibleModals.REGALOS" />
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
    --at-apply: max-w-md w-full rounded p-5 bg-slate-700 relative transform will-change-auto;
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
