<script setup lang='ts'>

</script>

<template>
  <p>Queremos que nuestra fiesta sea unica, asi que si tenes alguna recomendacion de misuca que siempre quiziste escuchar en un casamiento este es tu momento</p>
  
  <form class="flex flex-col">
    <label for="song" class="text-slate-200 my-4">
    <p>Recomendanos <b class="text-orange-400">ESA</b> cancion que no puede faltar</p>
    </label>
    <input type="text" id="song" class="border border-slate-200 rounded-lg p-2 mb-4" />
    <button class="bg-orange-500 text-orange-100 rounded-2xl ml-auto py-2 px-6 uppercase text-center transition duration-150 ease-in-out hover:(text-orange-200 bg-orange-600 shadow)">Toma!</button>
  </form>
</template>
