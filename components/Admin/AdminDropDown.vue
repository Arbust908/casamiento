<script setup lang="ts">
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
interface Props {
  options: { id: number; name: string; value: string }[]
  selectedId?: number
}
interface Emits {
  (e: 'update:selectedId', id: number): void
}
const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selected = ref(props.options.find(option => option.id === props.selectedId))
watch(selected, (value) => {
  emit('update:selectedId', value?.id || -1)
})
</script>

<template>
  <Listbox v-model="selected" as="div" class="flex gap-x-4">
    <ListboxLabel class="text-sm">
      Estados
    </ListboxLabel>
    <div class="relative">
      <ListboxButton class="relative w-full cursor-default rounded-md border border-slate-400 bg-slate-900 py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
        <span class="block truncate">{{ selected?.name || 'no seleccionado' }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <div class="i-ri-arrow-down-s-line h-5 w-5 text-slate-200" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption v-for="opt in options" :key="opt.id" v-slot="{ active, selected }" as="template" :value="opt">
            <li class="relative cursor-default select-none py-2 pl-3 pr-9" :class="[active ? 'text-white bg-indigo-600' : 'text-slate-900']">
              <span class="block truncate" :class="[selected ? 'font-semibold' : 'font-normal']">{{ opt.name }}</span>

              <span v-if="selected" class="absolute inset-y-0 right-0 flex items-center pr-4" :class="[active ? 'text-white' : 'text-indigo-600']">
                <div class="i-ri-check-line h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
