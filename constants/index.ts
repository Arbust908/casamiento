import type { EventData } from '@/types'
import { PossibleModals } from '@/composables/general'

export const PARTY: EventData = {
  event: 'Fiesta',
  place: 'Isla Jorge 290, Fatima',
  name: 'Estación Fatima',
  startDateTime: '2023-03-24T16:00:00',
  endDateTime: '2023-03-25T01:00:00',
  maps: 'https://goo.gl/maps/z4yMM464VmvGzH5v7',
  modal: PossibleModals.FIESTA,
  description: 'Nos Casamos! a festejar a lo grande! Comida, bebida, música y Gran Compania!',
  fantasyName: 'La fiesta de Alda y Fran',
}
export const CIVIL: EventData = {
  event: 'Civil',
  place: 'Holmberg 2548, Buenos Aires',
  name: 'Sede Comunal 12',
  startDateTime: '2023-03-21T12:30:00',
  endDateTime: '2023-03-21T13:30:00',
  maps: 'https://goo.gl/maps/bHFyh2YE8LUw2Wz67',
  modal: PossibleModals.CEREMONIA,
  description: 'Nos juntamos en La Sede Comunal 12 para celebrar el casamiento por civil.',
  fantasyName: 'Alda y Fran se sasan!',
}

