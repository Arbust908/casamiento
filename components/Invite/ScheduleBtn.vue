<script setup lang='ts'>
import { useGCalendar } from '~~/composables/useGCalendar'

interface Props {
  title: string
  location: string
  description: string
  startDateTime: string
  endDateTime: string
}
const props = defineProps<Props>()

const { url } = useGCalendar(props)
</script>

<template>
  <a :href="url" target="_blank" class="btn">
    Agendar
  </a>
</template>
