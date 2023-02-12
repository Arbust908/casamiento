import { acceptHMRUpdate, defineStore } from 'pinia'

export const PossibleModals = {
  CEREMONIA: 'ceremonia',
  FIESTA: 'fiesta',
  MUSIC: 'music',
  AGENDAR_FIESTA: 'agendar_fiesta',
  AGENDAR_CEREMONIA: 'agendar_ceremonia',
  DRESS_CODE: 'dress_code',
  DRIVE: 'drive',
  REGALOS: 'regalos',
} as const

export type PossibleModalsTypes = typeof PossibleModals[keyof typeof PossibleModals]

export const useGeneralStore = defineStore('general', () => {
  const currentModal = ref<PossibleModalsTypes | null>(null)
  const hasModal = computed(() => currentModal.value !== null)

  function setModal(modal: PossibleModalsTypes | null) {
    currentModal.value = modal
  }

  function openModal(modal: PossibleModalsTypes) {
    setModal(modal)
  }

  function closeModal() {
    setModal(null)
  }

  return {
    currentModal,
    hasModal,
    setModal,
    openModal,
    closeModal,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGeneralStore, import.meta.hot))
