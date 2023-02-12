<script setup lang="ts">
import { PARTY } from '@/constants'

const { daysLeft, hoursLeft, minutesLeft, secondsLeft } = useCountdown(
  PARTY.startDateTime,
)
const topDate = useDateFormat(PARTY.startDateTime, 'DD.MM.YYYY')
</script>

<template>
  <!-- Portada -->
  <section class="relative h-6/10">
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
      <h1 class="text-6xl center flex flex-col items-center">
        <span>Alda</span>
        <span>&</span>
        <span>Fran</span>
      </h1>
      <div class="p-6 w-full">
        <div class="date-decorator" />
      </div>
    </div>
    <InviteTopCurve
      class="absolute -bottom-px w-full -z-1"
      color-one="#475569"
      color-two="#334155"
      color-three="#1e293b"
    />
  </section>
  <!-- Cuenta Regresiva -->
  <section class="bg-slate-800 flex justify-center items-center py-10">
    <div class="grid max-w-lg">
      <NuxtPicture
        format="webp"
        class="col-start-1 row-start-1"
        loading="lazy"
        src="/images/contador_2.png"
      />
      <div
        class="col-start-1 row-start-1 flex flex-col gap-y-8 justify-center items-center"
      >
        <span class="text-4xl font-bold">Falta</span>

        <div class="flex divide-x-2 divide-slate-500">
          <ClientOnly>
            <div class="flex flex-col gap-y-3 px-4 py-1 items-center w-20">
              <span class="text-4xl font-light">{{ daysLeft }}</span>
              <span class="text-lg font-bold">días</span>
            </div>

            <div class="flex flex-col gap-y-3 px-4 py-1 items-center w-20">
              <span class="text-4xl font-light">{{ hoursLeft }}</span>
              <span class="text-lg font-bold">hs</span>
            </div>

            <div class="flex flex-col gap-y-3 px-4 py-1 items-center w-20">
              <span class="text-4xl font-light">{{ minutesLeft }}</span>
              <span class="text-lg font-bold">min</span>
            </div>

            <div class="flex flex-col gap-y-3 px-4 py-1 items-center w-20">
              <span class="text-4xl font-light">{{ secondsLeft }}</span>
              <span class="text-lg font-bold">sec</span>
            </div>
          </ClientOnly>
        </div>
        <span class="text-xl font-bold"> para la fiesta! </span>
      </div>
    </div>
  </section>
  <!-- Instagram -->
  <section class="relative bg-gradient-to-b from-slate-800 to-slate-600">
    <div class="absolute w-6/12 -right-10 top-10 opacity-50 z-1 lg:w-3/12 lg:right-0">
      <NuxtPicture
        format="webp"
        loading="lazy"
        src="/images/Grupo02_a.png"
        class="absolute -scale-x-100"
        :img-attrs="{ class: 'inline-block' }"
      />
      <NuxtPicture
        format="webp"
        loading="lazy"
        src="/images/Grupo02_b.png"
        class="absolute -scale-x-100"
        :img-attrs="{ class: 'inline-block' }"
      />
      <NuxtPicture
        format="webp"
        loading="lazy"
        src="/images/Grupo02_c.png"
        class="absolute -scale-x-100"
        :img-attrs="{ class: 'inline-block' }"
      />
    </div>
    <NuxtPicture
      format="webp"
      class="absolute inset-0 -z-1"
      preload
      src="/images/fondo.png"
      :img-attrs="{ class: 'relative h-full w-full object-cover' }"
    />
    <div class="max-w-sm mx-auto px-4 text-center space-y-12">
      <h2 class="text-3xl">
        Compartimos este día junto a vos
      </h2>
      <p class="px-4">
        Compartí tus fotos y videos de ese hermoso día
      </p>

      <div class="px-4" />

      <div class="px-4">
        <a
          target="_blank"
          href="https://www.instagram.com/"
          class="text-4xl font-ligth tracking-wide text-slate-300 uppercase"
        >#aldayfran</a>
      </div>

      <a
        class="inline-block rounded-full bg-slate-100 text-slate-600 font-bold px-6 py-3 uppercase"
        target="_blank"
        href="https://www.instagram.com/"
      >Ver en Instagram</a>
    </div>
  </section>
  <!-- Footer -->
  <section class="flex flex-col px-6 gap-y-5 items-center">
    <h4 class="text-3xl font-light flex text-center gap-4">
      <span>Alda</span>
      <span class="text-slate-500">&</span>
      <span>Fran</span>
    </h4>
  </section>
</template>

<style scoped lang="scss">
section {
    --at-apply: py-12;
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
