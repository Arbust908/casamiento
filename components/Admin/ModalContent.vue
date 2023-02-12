<script setup lang='ts'>
import type { Family, Guest } from '@/types'
import { ConfirmationStatus } from '@/types'
const props = defineProps<{
  family: Family
}>()

const keys = useMagicKeys()
const shiftCtrlA = keys['Shift+D']
const showDev = ref(false)

watch(shiftCtrlA, (v) => {
  if (v)
    showDev.value = !showDev.value
})

const { CONFIRMED, DECLINED } = ConfirmationStatus

const party = computed(() => {
  const { guests } = props.family
  if (!guests)
    return false

  const confirmed = [] as Guest[]
  const declined = [] as Guest[]

  guests.forEach((guest) => {
    if (guest.confirmed === CONFIRMED)
      confirmed.push(guest)
    else if (guest.confirmed === DECLINED)
      declined.push(guest)
  })

  return [confirmed, declined]
})
const civil = computed(() => {
  const { guests } = props.family
  if (!guests)
    return false

  const confirmed = [] as Guest[]
  const declined = [] as Guest[]

  guests.forEach((guest) => {
    if (guest.ceremonyConfirm === CONFIRMED)
      confirmed.push(guest)
    else if (guest.ceremonyConfirm === DECLINED)
      declined.push(guest)
  })

  return [confirmed, declined]
})
const confirmedText = (groups: Guest[][]) => {
  if (!groups)
    return ''
  const [confirmed, declined] = groups
  if (!confirmed)
    return ''

  if (confirmed.length === 0)
    return 'Ninguno confirmo'

  if (confirmed.length === 1)
    return `${confirmed[0].name} confirmo`

  const [last, ...names] = confirmed.map((guest: Guest) => guest.name)

  return `${names.join(', ')} y ${last} confirmaron`
}
const declineText = (groups: Guest[][]) => {
  if (!groups)
    return ''
  const [confirmed, declined] = groups
  if (!declined)
    return ''

  if (declined.length === 0)
    return 'Ninguno cancelo'

  if (declined.length === 1)
    return `${declined[0].name} cancelo`

  const [last, ...names] = declined.map((guest: Guest) => guest.name)

  return `${names.join(', ')} y ${last} cancelaron`
}

const showPartyGuests = computed(() => party.value && (party.value[0].length || party.value[1].length))

const showCivilGuests = computed(() => civil.value && (civil.value[0].length || civil.value[1].length))

const noResponse = computed(() => {
  const { songTitle, comments } = props.family
  return !songTitle && !comments && !showPartyGuests.value && !showCivilGuests.value
})
</script>

<template>
  <section>
    <article v-if="noResponse" class="mb-6">
      <h2 class="text-xl font-light">
        No hay respuesta aun
      </h2>
    </article>
    <template v-else>
      <article class="border-b-2 space-y-2 mb-6">
        <h2 class="text-xl font-light">
          Fiesta
        </h2>
        <dl>
          <dt>Cancion</dt>
          <dd>{{ family.songTitle }}</dd>
        </dl>
        <dl>
          <dt>Comentario</dt>
          <dd>{{ family.comments }}</dd>
        </dl>
        <template v-if="showPartyGuests">
          <p>{{ confirmedText(party || [[], []]) }}</p>
          <p>{{ declineText(party || [[], []]) }}</p>
        </template>
      </article>
      <article class="border-b-2 space-y-2 mb-6">
        <h2 class="text-xl font-light">
          Civil
        </h2>
        <template v-if="showCivilGuests">
          <p>{{ confirmedText(civil || [[], []]) }}</p>
          <p>{{ declineText(civil || [[], []]) }}</p>
        </template>
      </article>
    </template>
    <article v-if="showDev">
      {{ JSON.stringify(family) }}
    </article>
  </section>
</template>

<style scoped lang='scss'>

</style>
