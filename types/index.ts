import type { Family, WorkingFamily } from './Family'
import type { Guest, WorkingGuest } from './Guest'
import type { Role, User } from './User'
import type { PossibleModals } from '@/composables/general'

export const ConfirmationStatus = {
  CONFIRMED: 3,
  DECLINED: 2,
  PENDING: 1,
} as const

type ConfirmationStatusType = typeof ConfirmationStatus[keyof typeof ConfirmationStatus]
type PossibleModalsType = typeof PossibleModals[keyof typeof PossibleModals]
interface EventData {
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

export type { Family, WorkingFamily, Guest, WorkingGuest, User, Role, ConfirmationStatusType, EventData, PossibleModalsType }
