<script setup lang='ts'>
import { storeToRefs } from 'pinia'
import { useFamilyStore } from '@/stores/family'
const { closeModal } = useGeneralStore()
const { submitSong } = useFamilyStore()

const familyState = useFamilyStore()
const { selectedFamily } = storeToRefs(familyState)

const songTitle = ref(selectedFamily.value?.songTitle || '')

async function handleConfirm() {
  const confirmRes = await submitSong(songTitle.value)
  if (confirmRes)
    closeModal()
}
</script>

<template>
  <p class="mb-6">
    Queremos saber que canción te encantaría que suene en la fiesta. <br>
    Es tu oportunidad de pedir lo que quieras!
  </p>

  <form class="flex flex-col" @submit.prevent="handleConfirm">
    <input id="song" v-model="songTitle" type="text" class="border border-slate-200 rounded-lg p-2 mb-4">
    <button class="submit-btn" @click="handleConfirm">
      Enviar
    </button>
  </form>
</template>
