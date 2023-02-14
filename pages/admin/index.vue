<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Family } from '@/types'
import { ConfirmationStatus, SentStatus } from '@/types'
interface Metric {
  name: string
  value: string
  unit: string
}
const { CONFIRMED, DECLINED, PENDING } = ConfirmationStatus

const { data, refresh } = await useFetch('/api/families')
const families = computed<Family[]>(() => data.value?.families ?? [])
const generalState = useGeneralStore()

const { openModal } = generalState
const { hasModal } = storeToRefs(generalState)

const confirmedFilter = ref<false | number>(false)

const filteredFamilies = ref(families.value)

const filterFamilies = (flias: Family[]) => {
  const _families = JSON.parse(JSON.stringify(flias))
  return _families.filter((family: Family) => {
    return family.guests?.filter((guest) => {
      if (confirmedFilter.value)
        return guest.confirmed === confirmedFilter.value

      return true
    })
  }).sort((fa: Family, fb: Family) => fa.id - fb.id)
}

const metrics = computed<Metric[]>(() => {
  const familiesLength = String(families.value.length)
  const familiesName = familiesLength === '1' ? 'Familia' : 'Familias'

  const guestsLength = String(families.value.reduce((acc, cur) => cur.guests ? acc + cur.guests?.length : 0, 0))
  const guestsName = guestsLength === '1' ? 'Invitado' : 'Invitados'

  const confirmedLength = String(families.value.reduce((acc, cur) => cur.guests ? acc + cur.guests.filter(g => g.confirmed).length : 0, 0))
  const confirmedName = confirmedLength === '1' ? 'Confirmado' : 'Confirmados'

  return [
    {
      name: familiesName,
      value: familiesLength,
      unit: '',
    },
    {
      name: guestsName,
      value: guestsLength,
      unit: '',
    },
    {
      name: confirmedName,
      value: confirmedLength,
      unit: '',
    },
  ]
})
interface statusOptionType {
  id: number
  name: string
  value: false | number
}
const statusOptions: statusOptionType[] = [
  {
    id: 0,
    name: 'Todos',
    value: false,
  },
  {
    id: 1,
    name: 'Vienen',
    value: CONFIRMED,
  },
  {
    id: 2,
    name: 'No vienen',
    value: DECLINED,
  },
  {
    id: 3,
    name: 'Sin respuesta',
    value: PENDING,
  },
]

const statusSelected = ref(statusOptions[0])

const groupFilters = computed(() => {
  const groups = families.value.map(family => family.group)
  const uniqueGroups = [...new Set(groups)]
  return uniqueGroups
})

const copiedText = ref('')

const selectedGroup = ref('')
const handleStatusSelection = (id: number) => {
  console.log('Status Filter')
  statusSelected.value = statusOptions.find(option => option.id === id) ?? statusOptions[0]
  confirmedFilter.value = statusSelected.value.value
  filteredFamilies.value = filterFamilies(families.value)
}

const statusBtnClasses = (id: number) => {
  const theme = {
    0: 'bg-slate-800 text-slate-100',
    1: 'bg-gray-800 text-gray-100',
    2: 'bg-rose-800 text-rose-100',
    3: 'bg-emerald-800 text-emerald-100',
  } as { [key: number]: string }
  const active = statusSelected.value.id === id

  return {
    'px-2 py-1 rounded transform': true,
    [theme[id]]: true,
    'opacity-50 hover:(opacity-100 shadow -translate-y-1)': !active,
    'hover:(opacity-50 translate-y-1)': active,
  }
}
const handleCopyLink = (link: string) => {
  const text = `Copiaste el link: ${link}`
  copiedText.value = text
  setTimeout(() => {
    copiedText.value = ''
  }, 2000)
}
const modalTitle = ref('')
const modalFamily = ref<Family>()
const handleFamilyModal = (fam: Family) => {
  modalTitle.value = fam.name
  modalFamily.value = fam
  openModal('fiesta')
}

function handleSelectGroup(group: string) {
  console.log('Group Filter')
  selectedGroup.value = selectedGroup.value === group ? '' : group
  const _groupFamily = selectedGroup.value === '' ? families.value : families.value.filter(family => family.group === group)
  filteredFamilies.value = filterFamilies(_groupFamily)
}
const {
  NOT_SENT,
  SENT,
} = SentStatus
const hasSentStatus = ref(0)
function handelSentGroup(hasSent: number) {
  console.log('hasSent Filter')
  hasSentStatus.value = hasSentStatus.value === hasSent ? 0 : hasSent
  const _groupFamily = hasSentStatus.value === 0 ? families.value : families.value.filter(family => family.wasSent === hasSent)
  filteredFamilies.value = filterFamilies(_groupFamily)
}

async function handleRefresh() {
  await refresh()
  filteredFamilies.value = filterFamilies(families.value)

  console.log('selectedGroup', selectedGroup.value)
  console.log('hasSentStatus', hasSentStatus.value)
  console.log('statusSelected', statusSelected.value)

  if (selectedGroup.value !== '') {
    const selectGroup = selectedGroup.value
    selectedGroup.value = ''
    handleSelectGroup(selectGroup)
  }

  if (hasSentStatus.value !== 0) {
    const hasSent = hasSentStatus.value
    hasSentStatus.value = 0
    handelSentGroup(hasSent)
  }

  if (statusSelected.value.id !== 0) {
    const seletId = statusSelected.value.id
    statusSelected.value = statusOptions[0]
    handleStatusSelection(seletId)
  }
}

definePageMeta({
  layout: 'admin',
})
</script>

<template>
  <section class="p-4 rounded bg-slate-800 h-full text-slate-600">
    <AdminStats :metrics="metrics" />
    <nav class="m-2 mt-4 flex justify-end items-center gap-x-3">
      <span class="i-ri-mail-open-line w-5 h-5" :class="hasSentStatus === SENT ? 'text-slate-100' : 'text-slate-500'" @click="handelSentGroup(SENT)" />
      <span class="i-ri-mail-line w-5 h-5" :class="hasSentStatus === NOT_SENT ? 'text-slate-100' : 'text-slate-500'" @click="handelSentGroup(NOT_SENT)" />
      <div class="bg-slate-600 w-1 rounded-full h-12" />
      <button
        v-for="group in groupFilters" :key="group" class="rounded-full px-2 py-1"
        :class="selectedGroup === group ? 'bg-slate-300 text-slate-800 ring' : 'bg-slate-800  text-slate-100'"
        @click="handleSelectGroup(group)"
      >
        {{ group }}
      </button>
      <div class="bg-slate-600 w-1 rounded-full h-12" />
      <button v-for="opt in statusOptions" :key="opt.id" :class="statusBtnClasses(opt.id)" @click="handleStatusSelection(opt.id)">
        {{ opt.name }}
      </button>
    </nav>
    <div class="table-head">
      <span>Familia</span>
      <span />
      <span>Nombre</span>
      <span>Confirmacion</span>
      <span>Grupo</span>
      <span>Acciones</span>
    </div>
    <div class="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list">
        <AdminFamilyRow
          v-for="family in filteredFamilies"
          :key="family.id"
          :family="family"
          @copy-link="handleCopyLink"
          @family-modal="handleFamilyModal"
          @refresh-please="handleRefresh"
        />
      </ul>
    </div>
    <Teleport to="body">
      <AdminToast v-if="copiedText">
        <template #icon>
          <span class="i-bx:copy-alt w-5 h-5" />
        </template>
        <p>{{ copiedText }}</p>
      </AdminToast>
    </Teleport>
    <Teleport to="body">
      <AdminModal :open="hasModal">
        <template #title>
          {{ modalTitle }}
        </template>
        <AdminModalContent :family="modalFamily" />
      </AdminModal>
    </Teleport>
  </section>
</template>

<style scoped lang="scss">
.table {
  &-head {
    grid-template-columns: 180px 32px 140px 120px 110px 1fr;

    --at-apply: grid gap-8;
  }
  &-head {
    --at-apply: text-lg font-light text-gray-200 my-4 px-6;
  }
}
</style>
