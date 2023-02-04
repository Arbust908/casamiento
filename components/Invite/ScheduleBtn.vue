<template>
  <a :href="url" target="_blank" class="btn">
    Agendar
  </a>
</template>

<script setup lang='ts'>
interface Props {
  title: string;
  location: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
}
const props = defineProps<Props>()
function gDateFormatter(date: string){
  return date.replaceAll('-', '').replaceAll(':', '');
}

const url = computed(() => {
  /* https://calendar.google.com/calendar/u/0/r/eventedit?dates=20230324T160000/20230325T010000&ctz=America/Buenos_Aires&text=La+Fiesta&location=Estaci%C3%B3n+Fatima&details=Una+Gran+fiesta+de+casamiento+con+Alda+y+Fran&uid=c527e48a-9c90-468a-bb81-9f36d320e191 */
  const title = encodeURIComponent(props.title)
  const location = encodeURIComponent(props.location)
  const description = encodeURIComponent(props.description)
  const startDateTime = encodeURIComponent(gDateFormatter(props.startDateTime))
  const endDateTime = encodeURIComponent(gDateFormatter(props.endDateTime))


    return `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${startDateTime}/${endDateTime}&ctz=America/Buenos_Aires&text=${title}&location=${location}&details=${description}&uid=c527e48a-9c90-468a-bb81-9f36d320e191`
})
</script>
