<script setup lang='ts'>
import { PARTY } from '@/constants'
</script>

<template>
  <p>Todo queremos pasarla bien y cuidarons, asi que si no sabes como ir o volver avisanos, podemos contactarte que salga por su zona o quizas hasta se puede cordinar e ir en patota.</p>
  <hr class="my-4 bg-yellow-700" />
  <p>Si vas en auto, el lugar tiene estacionamiento. Una cosa menos que pensar</p>
  <div class="flex justify-end">
    <a class="mt-6 inline-flex border rounded-full p-4 transition-all duration-150 ease-in-out cursor-pointer hover:(bg-rose-600 text-white border-rose-400)" :href="PARTY.maps" target="_blank" title="Google Maps">
      <i class="i-ri-map-pin-5-line w-6 h-6" />
    </a>
  </div>
</template>