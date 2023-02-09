<script setup lang="ts">
import type { Family } from '@/types'
import { ConfirmationStatus } from '@/types'
import AdminStats from '@/components/Admin/AdminStats.vue'
interface Metric {
  name: string
  value: string
  unit: string
}
const { CONFIRMED, DECLINED, PENDING } = ConfirmationStatus

const { data } = await useFetch('/api/families')
const families = computed<Family[]>(() => data.value?.families ?? [])

const showFilter = ref(false)

const confirmedFilter = ref<false | number>(false)
const groupFilter = ref<string[]>([])

const filteredFamilies = ref(families.value)

const filterFamilies = (flias: Family[]) => {
  const _families = JSON.parse(JSON.stringify(flias))
  return _families.filter((family: Family) => {
    family.guests = family.guests?.filter((guest) => {
      if (confirmedFilter.value)
        return guest.confirmed === confirmedFilter.value

      return true
    })

    if (groupFilter.value.length === 0)
      return true

    return groupFilter.value.includes(family.group)
  })
}

const nonHeadClasses = (isHead: number) => {
  return {
    'opacity-0': !isHead,
  }
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

const handleStatusSelection = (id: number) => {
  statusSelected.value = statusOptions.find(option => option.id === id) ?? statusOptions[0]
  confirmedFilter.value = statusSelected.value.value
  filteredFamilies.value = filterFamilies(families.value)
}

definePageMeta({
  layout: 'admin',
})
</script>

<template>
  <section class="p-4 rounded bg-slate-800 h-full text-slate-600">
    <AdminStats :metrics="metrics" />
    {{ families.length }}
    <nav class="m-2 mt-4 flex justify-end">
      <div v-if="showFilter" class="flex gap-x-4 text-slate-400">
        <LazyAdminDropDown :options="statusOptions" :selected-id="statusSelected.id" @update:selected-id="handleStatusSelection" />
        {{ confirmedFilter }}
      </div>
      <button class="w-6 h-6 flex justify-center items-center rounded-full p-2 hover:bg-slate-300" @click="showFilter = !showFilter">
        <div v-if="showFilter" class="i-ri-close-line text-slate-500" />
        <div v-else class="i-ri-filter-3-line text-slate-500" />
      </button>
    </nav>
    <div class="table-head">
      <span />
      <span>Familia</span>
      <span />
      <span>Nombre</span>
      <span>Confirmacion</span>
      <span>Grupo</span>
      <span>Acciones</span>
    </div>
    <div class="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list">
        <template v-for="item in filteredFamilies" :key="item.id">
          <li v-for="guest in item.guests" :key="guest.id" class="table-body">
            <input type="checkbox" :class="nonHeadClasses(guest.isHead)">
            <span class="text-sm font-medium text-gray-700" :class="nonHeadClasses(guest.isHead)">
              {{ item.name }}
            </span>
            <span class="i-bx:crown w-5 h-5" :class="nonHeadClasses(guest.isHead)" />
            <span class="text-sm font-medium text-gray-700">
              {{ guest.name }}
            </span>
            <AdminConfirmPill :confirmed="guest.confirmed" />
            <span class="block mr-auto text-sm font-medium bg-rose-600 px-2 py-px rounded-full text-white" :class="nonHeadClasses(guest.isHead)">
              {{ item.group }}
            </span>
            <div class="flex items-center gap-x-3">
              <button v-if="guest.isHead" class="flex items-center justify-center p-1 rounded hover:bg-rose-200 hover:shadow hover:text-rose-600">
                <span class="i-bx:music w-5 h-5" />
                <!-- <span class="text-sm truncate">{{ item.songTitle }}</span> -->
              </button>
              <button v-if="guest.isHead" class="flex items-center justify-center p-1 rounded hover:bg-rose-200 hover:shadow hover:text-rose-600">
                <span class="i-bx:comment-detail w-5 h-5" />
                <!-- <span class="text-sm truncate">{{ item.comments }}</span> -->
              </button>
              <button class="flex items-center justify-center p-1 rounded hover:bg-rose-200 hover:shadow hover:text-rose-600 disabled:opacity-50" disabled>
                <span class="i-bx:x-circle w-5 h-5" />
              </button>
              <button class="flex items-center justify-center p-1 rounded hover:bg-rose-200 hover:shadow hover:text-rose-600">
                <span class="i-bx:info-square w-5 h-5" />
              </button>
            </div>
          </li>
          <hr class="border-2 border-rose-100 mx-8 rounded-full my-4">
        </template>
      </ul>
    </div>
  </section>
</template>

<style scoped>
  .table-head,
  .table-body {
    grid-template-columns: 24px 180px 32px 140px 120px 110px 1fr;

    --at-apply: grid gap-8;
  }
  .table-head {
    --at-apply: text-lg font-light text-gray-200 my-4 px-6;
  }

  .table-body {
    --at-apply: text-sm font-normal text-gray-600 items-center px-4 py-4 sm:px-6 hover:bg-gray-100;
  }
</style>
