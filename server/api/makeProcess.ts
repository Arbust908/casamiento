import guestList from '@/server/guests'
import type { WorkingFamily, WorkingGuest } from '@/types'

const guestListArray = guestList.split(/\r?\n/)
const listHeaders = guestListArray.shift()?.split(',')

const result = guestListArray.map((guest) => {
  const guestArray = guest.split('"')
    .map((value, index) => index % 2 === 0 ? value.split(',') : value)
    .map((value, index, array) => {
      if (array.length !== 1) {
        if (Array.isArray(value))
          value.length === 7 ? value.pop() : value.shift()
      }
      return value
    })
    .flat()

  const guestObject: { [key: string]: string } = {}
  if (listHeaders) {
    listHeaders.forEach((header, index) => {
      guestObject[header] = guestArray[index]
    })
  }
  return guestObject
}).map((guest) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { email, delete1, ...correctedGuest } = guest
  return correctedGuest
}).reduce((acc, guest, i) => {
  const {
    name,
    surname,
    plusOne,
    group,
    familyName,
    miembroUno,
    miembroDos,
    miembroTres,
    miembroCuatro,
    miembroCinco,
  } = guest

  const _family = {} as WorkingFamily
  _family.group = group
  _family.name = familyName
  _family.songTitle = ''
  _family.comments = ''
  const newGuests = [`${name} ${surname}`, plusOne, miembroUno, miembroDos, miembroTres, miembroCuatro, miembroCinco].filter(Boolean)
  const _guests = newGuests.map((guest, index) => {
    const _guest = {} as WorkingGuest
    _guest.name = guest
    _guest.isHead = index === 0 ? 1 : 0
    _guest.confirmed = 0
    _guest.familyId = i + 2

    return _guest
  })

  acc.push([_family, _guests])

  return acc
}, [] as any[])

export default defineEventHandler(() => ({
  result,
}))
