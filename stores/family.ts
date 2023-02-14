import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Family, Guest, WorkingFamily } from '@/types'

export const useFamilyStore = defineStore('family', () => {
  const families = ref<Array<WorkingFamily | Family>>([])
  const selectedFamily = ref<WorkingFamily | Family | null>(null)

  function selectFamily(fam: WorkingFamily | Family | null) {
    selectedFamily.value = fam
  }

  async function fetchFamilies() {
    const res = await $fetch('/api/families')
    families.value = res.families

    return res
  }

  async function fetchFamilyByUUID(uuid: string) {
    try {
      const res = await $fetch(`/api/family/${uuid}`) as { family: Family }
      selectFamily(res.family)
      return res.family
    }
    catch (err) {
      console.error(err)
    }
  }
  async function confirmFamily(confirmGuests: { guests: Guest[]; comment: string }) {
    if (!confirmGuests.guests.length)
      return console.error('No guests to confirm')

    if (!confirmGuests.comment)
      return console.error('No comment to confirm')

    selectedFamily.value!.guests = confirmGuests.guests
    if (confirmGuests.comment !== 'no comment, bro')
      selectedFamily.value!.comments = confirmGuests.comment

    try {
      const confirmations = confirmGuests.guests.map((guest) => {
        return {
          id: guest?.id || -1,
          confirmed: guest.confirmed,
          ceremonyConfirm: guest.ceremonyConfirm,
        }
      }) || []

      const confirmation = $fetch('/api/guest/confirm', {
        method: 'PUT',
        body: JSON.stringify(confirmations),
      })
      const comment = $fetch('/api/family/update', {
        method: 'PUT',
        body: JSON.stringify({
          id: selectedFamily.value?.id,
          comments: selectedFamily.value!.comments,
        }),
      })

      const [conf, comm] = await Promise.all([confirmation, comment])

      selectedFamily.value!.guests = conf.guests
      selectedFamily.value = { ...selectedFamily.value!, ...comm.family }

      return selectedFamily.value
    }
    catch (err) {
      console.error(err)
    }
  }

  async function submitSong(songTitle: string) {
    const selectedFamilyId = selectedFamily.value?.id
    if (!selectedFamilyId)
      return console.error('No family selected')

    const payload = {
      id: selectedFamilyId,
      songTitle,
    }

    const res = await $fetch('/api/family/song', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }) as { songTitle: string }

    selectedFamily.value!.songTitle = res.songTitle
    return res
  }

  return {
    families,
    selectedFamily,
    selectFamily,
    fetchFamilies,
    fetchFamilyByUUID,
    confirmFamily,
    submitSong,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useFamilyStore, import.meta.hot))
