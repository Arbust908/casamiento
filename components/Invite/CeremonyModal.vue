<script setup lang='ts'>
import { storeToRefs } from 'pinia'
import type { Guest } from '@/types'
import { useFamilyStore } from '@/stores/family'
import { useGeneralStore } from '@/composables/general'

const generalState = useGeneralStore()
const { confirmFamily } = useFamilyStore()
const familyState = useFamilyStore()

const { selectedFamily } = storeToRefs(familyState)
const { closeModal } = generalState

const guests = ref([] as Guest[])
const comment = ref('')

function handleConfirmChange(guest: Guest) {
  const index = guests.value.findIndex(g => g.id === guest.id)
  if (index !== -1)
    guests.value.splice(index, 1, guest)

  else
    guests.value.push(guest)
}

async function handleConfirm() {
  const confirmRes = await confirmFamily({ guests: guests.value, comment: comment.value })
  if (confirmRes)
    closeModal()
}

onBeforeMount(() => {
  guests.value = selectedFamily.value?.guests || [] as Guest[]
  comment.value = selectedFamily.value?.comments || ''
})
</script>

<template>
  <section class="space-y-6 flex flex-col items-end">
    <template v-for="g in guests" :key="g.id">
      <InviteGuestSelectionCeremony :guest="g" class="w-full" @change="handleConfirmChange" />
    </template>
    <button class="submit-btn" @click="handleConfirm">
      Enviar
    </button>
  </section>
</template>
