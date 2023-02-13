<script setup lang='ts'>
import type { Family, Guest } from '@/types'
import { glue } from '@/utils/glue'

const props = defineProps<{
  family: Family
}>()

const emits = defineEmits(['deleteFamily', 'deleteGuest', 'familyModal', 'copyLink'])
const runtimeConfig = useRuntimeConfig()

const nonHeadClasses = (isHead: number) => {
  return {
    'opacity-0': !isHead,
  }
}

const makeFamilyLink = (fam: Family) => {
  const BASE_URL = runtimeConfig.public.baseUrl
  const uuid = fam.uuid
  const familyLink = `${BASE_URL}/${uuid}`

  const guestArray = fam.guests.map(g => g.name)
  const mainGuest = fam.guests.find(g => g.isHead)

  const msg = `Buenas ${mainGuest?.name}! 
Como ya sabés, nos casamos pronto 💍🥂y nos encantaría que nos acompañes en nuestro festejo! 
Vas a encontrar tu invitación y demás información en el siguiente link: ${familyLink}
Podés confirmar tu asistencia ${guestArray.length > 1 ? 'y la de tu grupo familiar ' : ''}hasta el día 06/03.
Nos vemos ahí ✨

Alda & Fran 🤍`

  navigator.clipboard.writeText(msg)
  emits('copyLink', msg)

  return msg
}

const handleFamilyModal = () => {
  emits('familyModal', props.family)
}

const orderedGuests = computed(() => {
  const _guests = JSON.parse(JSON.stringify(props.family.guests))
  return _guests.sort((a: Guest, b: Guest) => b.isHead - a.isHead)
})
</script>

<template>
  <div class="relative">
    <TransitionGroup name="fade">
      <li v-for="guest in orderedGuests" :key="guest.id" class="table-body">
        <span class="text-sm font-medium text-gray-700" :class="nonHeadClasses(guest.isHead)">
          {{ family.name }}
        </span>
        <span class="i-bx:crown w-5 h-5" :class="nonHeadClasses(guest.isHead)" />
        <span class="text-sm font-medium text-gray-700">
          {{ guest.name }}
        </span>
        <AdminConfirmPill :confirmed="guest.confirmed" />
        <span class="block mr-auto text-sm font-medium bg-rose-600 px-2 py-px rounded-full text-white" :class="nonHeadClasses(guest.isHead)">
          {{ family.group }}
        </span>
        <div class="table__actions">
          <button v-if="guest.isHead" class="action__btn music" @click="handleFamilyModal">
            <span class="i-bx:music w-5 h-5" />
          </button>
          <button v-if="guest.isHead" class="action__btn comment" @click="handleFamilyModal">
            <span class="i-bx:comment-detail w-5 h-5" />
          </button>
          <button v-if="guest.isHead" class="action__btn link" @click="makeFamilyLink(family)">
            <span class="i-bx:copy-alt w-5 h-5" />
          </button>
          <button class="action__btn info" @click="handleFamilyModal">
            <span class="i-bx:info-square w-5 h-5" />
          </button>
          <button class="action__btn disabled:opacity-50 delete" disabled>
            <span class="i-bx:x-circle w-5 h-5" />
          </button>
        </div>
      </li>
    </TransitionGroup>
    <hr v-if="orderedGuests.length">
  </div>
</template>

<style scoped lang='scss'>
.table {
&-body {
  grid-template-columns: 180px 32px 140px 120px 110px 1fr;

  --at-apply: grid gap-8;
}

&-body {
  --at-apply: text-sm font-normal text-gray-600 items-center px-4 py-4 sm:px-6 hover:bg-gray-100;
}
&__actions {
  --at-apply: grid gap-4 items-center;

  grid-auto-columns: 28px;
  grid-template-areas: 'music comment link info delete';
}
}

.action {
  &__btn {
    --at-apply: flex items-center justify-center p-1 rounded hover:bg-rose-200 hover:shadow hover:text-rose-600;

    &.music {
      grid-area: music;
    }
    &.comment {
      grid-area: comment;
    }
    &.info {
      grid-area: info;
    }
    &.link {
      grid-area: link;
    }
    &.delete {
      grid-area: delete;
    }
  }
}

/* fade enter left leave right */
.fade {

    &-enter-active,
    &-leave-active {
      --at-apply: transition duration-300 ease-in-out;
    }
    &-enter,
    &-leave-to {
      --at-apply: opacity-0;
    }
    &-enter-to,
    &-leave {
        --at-apply: opacity-100;
    }

    &-enter {
        --at-apply: translate-x-4;
    }
    &-enter-to {
        --at-apply: translate-x-0;
    }
    &-leave {
        --at-apply: translate-x-0;
    }
    &-leave-to {
        --at-apply: -translate-x-4;
    }
}
</style>
