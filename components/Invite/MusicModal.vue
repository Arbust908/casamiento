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
  <p>Queremos que nuestra fiesta sea unica, asi que si tenes alguna recomendacion de misuca que siempre quiziste escuchar en un casamiento este es tu momento</p>

  <form class="flex flex-col" @submit.prevent="handleConfirm">
    <label for="song" class="text-slate-200 my-4">
      <p>Recomendanos <b class="text-brick-400">ESA</b> cancion que no puede faltar</p>
    </label>
    <input id="song" v-model="songTitle" type="text" class="border border-slate-200 rounded-lg p-2 mb-4">
    <button class="bg-brick-500 text-brick-100 rounded-2xl ml-auto py-2 px-6 uppercase text-center transition duration-150 ease-in-out hover:(text-brick-200 bg-brick-600 shadow)">
      Toma!
    </button>
  </form>
</template>
