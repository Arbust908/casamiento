import type { Family, WorkingFamily } from './Family'
import type { Guest, WorkingGuest } from './Guest'
import type { Role, User } from './User'

export const ConfirmationStatus = {
  CONFIRMED: 3,
  DECLINED: 2,
  PENDING: 1,
} as const

type ConfirmationStatusType = typeof ConfirmationStatus[keyof typeof ConfirmationStatus]

interface EventData {
  event: string
  place: string
  name: string
  startDateTime: string
  endDateTime: string
  maps: string
  modal: string
  description: string
  fantasy_name: string
}

export type { Family, WorkingFamily, Guest, WorkingGuest, User, Role, ConfirmationStatusType, EventData }
