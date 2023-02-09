<script setup lang='ts'>
import type { PossibleModalsType } from '@/types'
interface Props {
  event: string
  place: string
  name: string
  startDateTime: string
  endDateTime: string
  maps: string
  modal: PossibleModalsType
  description: string
  fantasy_name: string
}
const props = defineProps<Props>()
const generalState = useGeneralStore()

const { openModal } = (generalState)
const when = computed(() => {
  const intl = new Intl.DateTimeFormat('es', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
  const date = intl.format(new Date(props.startDateTime)).replaceAll(',', '').split(' ')
  const returnDate = `${date[0]} ${date[1]} ${date[2]} a las ${date[3]}`

  return returnDate
})
</script>

<template>
  <article class="flex flex-col justify-center items-center gap-y-6 max-w-sm">
    <picture class="p-6 rounded-full bg-slate-600 text-slate-200">
      <SvgCeremony />
    </picture>
    <h3 class="grid grid-cols-[15px_1fr_15px]">
      <svg
        x="0px" y="0px"
        viewBox="0 0 19.8 65.3"
        class="my-2"
      >
        <polygon class="bannerSvg" points="19.8,65.3 19.8,0 0,0 19.3,32.1 0,65.3 " />
      </svg>
      <span class="flex items-center bg-[#CFD6BB] text-2xl font-bold text-slate-800 px-4 p-4 uppercase">
        {{ event }}
      </span>
      <svg
        x="0px" y="0px"
        viewBox="0 0 21.2 65.3"
        class="my-2"
      >
        <polygon class="bannerSvg" points="0,0 0,65.3 21.2,65.3 0.8,31.1 21.2,0 " />
      </svg>
    </h3>
    <div class="info-box">
      <h6>Día</h6>
      <p>{{ when }}</p>
      <button class="btn main" @click="openModal(modal)">
        Confirmar asistencia
      </button>
    </div>

    <div class="info-box">
      <h6>Lugar</h6>
      <p>{{ name }}</p>
      <InviteScheduleBtn
        :title="fantasy_name"
        :location="place"
        :description="description"
        :start-date-time="startDateTime"
        :end-date-time="endDateTime"
      />
    </div>

    <div class="info-box">
      <h6>Dirección</h6>
      <p>{{ place }}</p>
      <a class="btn" :href="maps" target="_blank">
        ¿Cómo llegar?
      </a>
    </div>
  </article>
</template>

<style scoped lang='postcss'>
.bannerSvg {
    fill: #CFD6BB;
    --at-apply: h-full;
}
.info-box {
    --at-apply: text-center;
    & h6 {
        --at-apply: text-2xl text-slate-300 font-bold;
    }
}
</style>
