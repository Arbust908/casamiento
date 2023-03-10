<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { PossibleModals, useGeneralStore } from '@/composables/general'
import { CIVIL, PARTY } from '@/constants'
import { useFamilyStore } from '@/stores/family'

const familyState = useFamilyStore()
const { family_id } = useRoute().params
const family_UUID = computed(() => Array.isArray(family_id) ? family_id[0] : family_id)
const { data } = useAsyncData('family', async () => await familyState.fetchFamilyByUUID(family_UUID.value))

const { daysLeft, hoursLeft, minutesLeft, secondsLeft } = useCountdown(
  PARTY.startDateTime,
)
const topDate = useDateFormat(PARTY.startDateTime, 'DD.MM.YYYY')

const generalState = useGeneralStore()

const { openModal } = (generalState)
const { hasModal } = storeToRefs(generalState)

const { MUSIC, DRESS_CODE, DRIVE, FIESTA, CEREMONIA, REGALOS } = PossibleModals
const { url: partyUrl } = useGCalendar({
  title: PARTY.fantasyName,
  location: PARTY.place,
  description: PARTY.description,
  startDateTime: PARTY.startDateTime,
  endDateTime: PARTY.endDateTime,
})
const { url: civilUrl } = useGCalendar({
  title: CIVIL.fantasyName,
  location: CIVIL.place,
  description: CIVIL.description,
  startDateTime: CIVIL.startDateTime,
  endDateTime: CIVIL.endDateTime,
})
</script>

<template>
  <!-- Portada -->
  <section class="relative py-14 min-h-full">
    <NuxtPicture
      format="webp"
      class="absolute inset-0 -z-1"
      preload
      src="/images/fondo.png"
      :img-attrs="{ class: 'relative h-full w-full object-cover' }"
    />
    <div class="absolute inset-x-0 top-0 flex justify-center">
      <NuxtPicture
        format="webp"
        class="header-decoration delay-3"
        preload
        src="/images/Grupo01_a.png"
        :img-attrs="{ class: 'max-h-50' }"
      />
      <NuxtPicture
        format="webp"
        class="header-decoration"
        preload
        src="/images/Grupo01_b.png"
        :img-attrs="{ class: 'max-h-50' }"
      />
      <NuxtPicture
        format="webp"
        class="header-decoration delay-2"
        preload
        src="/images/Grupo01_c.png"
        :img-attrs="{ class: 'max-h-50' }"
      />
    </div>

    <div
      class="pt-40 flex flex-col justify-center items-center gap-y-6 max-w-sm mx-auto"
    >
      <div class="grid grid-cols-[1fr_120px_1fr] w-full items-center gap-4 px-6">
        <div class="date-decorator" />
        <span class="text-2xl">
          {{ topDate }}
        </span>
        <div class="date-decorator" />
      </div>
      <h1 class="text-[100px] md:text-[130px] center flex flex-col md:flex-row gap-6 items-center font-main">
        <span class="-my-12">Alda</span>
        <span class="font-sans font-semibold text-[40px] text-slate-300">&</span>
        <span class="-my-12">Fran</span>
      </h1>
      <div class="px-6 w-full">
        <div class="date-decorator" />
      </div>
      <h2 class="text-[24px] font-regular" />
      <NuxtLink href="#regresiva">
        <i class="i-ri-arrow-drop-down-line text-6xl animate-bounce mt-6" />
      </NuxtLink>
    </div>
    <InviteTopCurve
      class="absolute -bottom-px w-full -z-1"
      color-one="#475569"
      color-two="#334155"
      color-three="#1e293b"
    />
  </section>
  <!-- Cuenta Regresiva -->
  <section class="bg-slate-800 flex justify-center items-center py-10 relative">
    <div class="grid max-w-lg -top-40 relative">
      <NuxtPicture
        format="webp"
        class="col-start-1 row-start-1"
        loading="lazy"
        src="/images/contador_2.png"
      />
      <div
        class="col-start-1 row-start-1 flex flex-col gap-y-6 justify-center items-center"
      >
        <span class="text-[32px] md:text-[40px] font-regular">Faltan</span>

        <div class="flex divide-x-2 divide-slate-500 max-sm:max-w-sm">
          <ClientOnly>
            <div class="counting-box">
              <span class="counting-number">{{ daysLeft }}</span>
              <span class="counting-text">d??as</span>
            </div>

            <div class="counting-box">
              <span class="counting-number">{{ hoursLeft }}</span>
              <span class="counting-text">hs</span>
            </div>

            <div class="counting-box">
              <span class="counting-number">{{ minutesLeft }}</span>
              <span class="counting-text">min</span>
            </div>
            <div class="counting-box">
              <span class="counting-number">{{ secondsLeft }}</span>
              <span class="counting-text">seg</span>
            </div>
          </ClientOnly>
        </div>
        <span class="text-[20px] md:text-[28px] font-regular"> para la fiesta! </span>
      </div>
    </div>
  </section>
  <!-- Ceremonia - Fiesta -->
  <section class="bg-slate-800 relative py-10">
    <aside class="absolute grid top-10 -left-22 opacity-50 z-0">
      <NuxtPicture
        format="webp"
        class="col-start-1 row-start-1"
        loading="lazy"
        src="/images/Grupo02_a.png"
      />
      <NuxtPicture
        format="webp"
        class="col-start-1 row-start-1"
        loading="lazy"
        src="/images/Grupo02_b.png"
      />
      <NuxtPicture
        format="webp"
        class="col-start-1 row-start-1"
        loading="lazy"
        src="/images/Grupo02_c.png"
      />
    </aside>
    <InviteGoldenLines class="absolute inset-x-0" />
    <div
      id="regresiva"
      class="flex flex-col gap-y-8 lg:flex-row lg:gap-x-24 lg:gap-y-0 items-center justify-center lg:items-start lg:max-w-2xl lg:justify-between mx-auto"
    >
      <InviteEventCard class="z-10 relative mb-20" v-bind="CIVIL" />
      <InviteEventCard class="z-10 relative mb-20" v-bind="PARTY" />
    </div>
  </section>
  <!-- Fiesta -->
  <section class="bg-slate-800 px-6 flex flex-col justify-center text-center">
    <InviteGoldenLines2 />
    <div class="heading">
      <h2>
        Fiesta
      </h2>
      <p>
        Hagamos juntos una fiesta ??pica. Aqu?? algunos detalles a tener en cuenta.
      </p>
    </div>
    <div
      class="relative flex flex-col gap-8 items-center xl:flex-row xl:justify-center xl:gap-14"
    >
      <NuxtPicture
        format="webp"
        loading="lazy"
        src="/images/Grupo03.png"
        class="absolute -top-40 -left-30 scale-50"
      />
      <!-- Canciones -->
      <InvitePartyCard
        title="Musica"
        text="??Cu??l es la canci??n que no debe faltar en la PlayList de la fiesta?"
        icon="musica"
        btn-text="sugerir canci??n"
        :modal="MUSIC"
      />
      <!-- Dress Code -->
      <InvitePartyCard
        title="Dress Code"
        text="Una orientaci??n para tu vestuario"
        icon="vestuario"
        btn-text="ver m??s"
        :modal="DRESS_CODE"
      />
      <!-- Notas -->
      <InvitePartyCard
        title="Tips y Notas"
        text="Informaci??n adicional para tener en cuenta"
        icon="tips"
        btn-text="+ Info"
        :modal="DRIVE"
      />
    </div>
  </section>
  <!-- Regalos -->
  <section
    class="relative overflow-hidden bg-gradient-to-b from-slate-800 to-slate-700"
  >
    <div class="absolute -right-20 top-10 opacity-50 z-1">
      <NuxtPicture
        format="webp"
        loading="lazy"
        src="/images/Grupo02.png"
        class="-scale-x-100 relative top-0 h-full inline-block"
        :img-attrs="{ class: 'inline-block w-full' }"
      />
    </div>

    <div class="heading">
      <h2>
        Regalos
      </h2>
      <p>
        El mejor regalo es que vengan a compartir este momento con nosotros.<br>
        Pero si insisten en regalarnos algo... ??Nos pueden ayudar con nuestro viaje!
      </p>
    </div>
    <div
      class="col-structure"
    >
      <NuxtPicture
        class="inline-block cursor-pointer"
        preload
        src="/svg/regalos.svg"
        :img-attrs="{ class: 'h-24 w-24 mx-auto' }"
        @click="openModal(REGALOS)"
      />

      <button
        class="btn main rounded-xl bg-slate-100 text-slate-600 font-bold px-6 py-2 uppercase w-50 mx-auto"
        @click="openModal(REGALOS)"
      >
        Ver m??s
      </button>
      <InviteGoldenLines2 />
    </div>
  </section>
  <!-- Instagram -->
  <section class="relative bg-gradient-to-b from-slate-700 to-slate-600">
    <NuxtPicture
      format="webp"
      class="absolute inset-0 -z-1"
      preload
      src="/images/fondo.png"
      :img-attrs="{ class: 'relative h-full w-full object-cover' }"
    />
    <div class="heading">
      <h2>
        Compartimos este d??a junto a vos
      </h2>
      <p>
        Compart?? tus fotos y videos de ese hermoso d??a
      </p>
    </div>
    <div class="col-structure">
      <div class="px-4 inline-flex w-full justify-center">
        <div class="p-4 flex justify-center items-center rounded-full border-4">
          <i class="i-ri-instagram-line w-10 h-10" />
        </div>
      </div>

      <div>
        <a
          target="_blank"
          href="https://www.instagram.com/explore/tags/aldayfran/"
          class="text-4xl font-light tracking-wide text-slate-300 uppercase"
        >#aldayfran</a>
      </div>

      <a
        class="inline-block rounded-full bg-slate-100 text-slate-600 font-bold px-6 py-3 uppercase"
        target="_blank"
        href="https://www.instagram.com/explore/tags/aldayfran/"
      >Ver en Instagram</a>
    </div>
  </section>
  <Teleport to="body">
    <InviteModal :open="hasModal" />
  </Teleport>
  <!-- Footer -->
  <section class="flex flex-col px-6 gap-y-5 items-center">
    <h4 class="text-6xl font-main flex text-center gap-4 flex items-center">
      <span>Alda</span>
      <span class="text-slate-400 font-sans text-[40px]">&</span>
      <span>Fran</span>
    </h4>
    <div class="flex flex-col gap-y-6 lg:flex-row lg:gap-y-0 lg:gap-x-6 font-sans text-[16px]">
      <button
        class="hover:(text-amber-500 underline)"
        @click="openModal(CEREMONIA)"
      >
        Confirmar asistencia a civil
      </button>
      <button class="hover:(text-amber-500 underline)" @click="openModal(FIESTA)">
        Confirmar asistencia a fiesta
      </button>
      <button class="hover:(text-amber-500 underline)" @click="openModal(MUSIC)">
        Sugerir canci??n
      </button>
      <a
        class="hover:(text-amber-500 underline) text-center"
        :href="partyUrl"
      >
        Agendar fiesta
      </a>
      <a
        class="hover:(text-amber-500 underline) text-center"
        :href="civilUrl"
      >
        Agendar civil
      </a>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
    --at-apply: py-[10vw] lg:py-[5vw];
    & > .heading {
      --at-apply: text-center mb-12 px-8;
      & > h2 {
        --at-apply: text-gray-100 text-[60px] font-main;
      }
      & > p {
        --at-apply: text-gray-300 text-[20px] font-sans;
      }
    }
    & > .col-structure {
      --at-apply: flex flex-col text-center mx-auto px-10 relative z-10 items-center gap-y-10;
    }
}
.counting {
  &-box {
    --at-apply: flex flex-col gap-y-3 px-4 py-1 items-center md:w-20;
  }
  &-number {
    --at-apply: text-2xl md:text-4xl font-semibold;
  }
  &-text {
    --at-apply: text-md md:text-lg font-light;
  }
}
.header-decoration {
    --at-apply: absolute -top-20;
    animation: drop-fade 1.5s ease-in-out both;
    animation-delay: 1s;
    &.delay-2 {
        animation-delay: 0.75s;
    }
    &.delay-3 {
        animation-delay: 0.5s;
    }
}
.date-decorator {
    --at-apply: w-full h-px bg-slate-100;
}

@keyframes drop-fade {
    from {
        opacity: 0;
        transform: translateY(-100px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
