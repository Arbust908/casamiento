<script setup lang='ts'>
import { storeToRefs } from 'pinia'
import { PossibleModals, useGeneralStore } from '@/composables/general'
import { useFamilyStore } from '@/stores/family'

const generalState = useGeneralStore()
const familyState = useFamilyStore()

const { selectedFamily } = storeToRefs(familyState)

const { currentModal } = storeToRefs(generalState)
const { closeModal } = generalState

const show = ref(false)

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
  <aside class="modal__backdrop cursor-pointer" @click.self="closeModal()">
    <article class="modal__box cursor-auto">
      <NuxtPicture
        format="webp"
        loading="lazy"
        src="/images/Grupo_PopUpMusica.webp"
        class="modal-decoration top"
        :img-attrs="{ class: 'inline-block' }"
      />
      <div class="i-ri-close-line text-slate-200 absolute top-3 right-6 w-8 h-8 cursor-pointer" @click="closeModal" />
      <h3 class="modal__title">
        {{ modalTitle }}
      </h3>
      <button @click="show = true">
        -
      </button>
      <p v-if="show" class="mb-4" @click="show = false">
        {{ selectedFamily }}
      </p>

      <InviteCeremonyModal v-if="currentModal === PossibleModals.CEREMONIA" />
      <InvitePartyModal v-else-if="currentModal === PossibleModals.FIESTA" :guests="selectedFamily?.guests" />
      <InviteMusicModal v-else-if="currentModal === PossibleModals.MUSIC" />
      <InviteDressCodeModal v-else-if="currentModal === PossibleModals.DRESS_CODE" />
      <InviteDriveModal v-else-if="currentModal === PossibleModals.DRIVE" />
      <InvitePresentModal v-else-if="currentModal === PossibleModals.REGALOS" />

      <NuxtPicture
        format="webp"
        loading="lazy"
        src="/images/Grupo_PopUpMusica-2.webp"
        class="modal-decoration bottom"
        :img-attrs="{ class: 'inline-block' }"
      />
    </article>
  </aside>
</template>

<style scoped lang='scss'>
.modal {
  &__backdrop {
    @apply fixed inset-0 bg-gray-700/50 backdrop-blur-md z-30 flex justify-center items-center h-full;
  }
  &__box {
    @apply max-w-md w-full rounded p-5 bg-slate-700 relative transform;
    animation: fade-in 0.6s ease-in-out;
    will-change: opacity transform;
  }
  &-decoration {
    @apply absolute -z-1 w-full inset-x-0 transition;
    &.top {
      @apply top-0 -translate-y-full -scale-x-100;
    }
    &.bottom {
      @apply bottom-0 translate-y-full;
    }
  }
  &__title {
    @apply text-2xl text-center font-bold mb-4;
  }
  &__btn {
    @apply rounded-xl bg-slate-100 border border-transparent text-slate-700 hover:bg-transparent hover:text-slate-100 hover:border-slate-100 py-1 px-3 mx-auto;
  }
}
@keyframes fade-in {
  0% {
    @apply opacity-0 scale-50;
  }
  90% {
    @apply opacity-100 scale-105;
  }
  100% {
    @apply opacity-100 scale-100;
  }
}
</style>
