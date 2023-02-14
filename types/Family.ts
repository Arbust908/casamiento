import type { Guest, WorkingGuest } from './Guest'

export const SentStatus = {
  NOT_SENT: 1,
  SENT: 9,
} as const
export type SentStatusType = typeof SentStatus[keyof typeof SentStatus]

export interface Family extends WorkingFamily {
  id: number
  createdAt: string
  updatedAt: string
  uuid: string
  guests: Guest[]
}

export interface WorkingFamily {
  comments: string
  createdAt?: string
  group: string
  guests?: Guest[] | WorkingGuest[]
  id?: number
  name: string
  songTitle: string
  updatedAt?: string
  uuid?: string
  wasSent?: number
}
