<script setup lang='ts'>
const accounts = [
  {
    name: 'Brubank - C.A. Pesos',
    data: [
      ['CBU', '1430001713000038210013'],
      ['Alias', 'aldanaculatina'],
      ['CUIT', '27-34976849-1'],
    ],
  },
  {
    name: 'First Century Bank - Checking',
    data: [
      ['Cta', '4020426822105'],
      ['Nro de ruta ABA', '061120084'],
      ['Titular', 'Aldana Belen Culatina'],
    ],
  },
]
</script>

<template>
  <section>
    <article v-for="acc in accounts" :key="acc.name">
      <h3>{{ acc.name }}</h3>
      <InvitePresentDataBtn v-for="d in acc.data" :key="`${acc.name}-${d[0]}`" :data="d" />
    </article>
  </section>
</template>

<style lang="scss" scoped>
  article {
    --at-apply: mb-6;
    h3 {
      --at-apply: text-xl font-bold mb-2;
    }
  }
</style>
