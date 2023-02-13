import fs from 'fs'
import guestList from '@/server/guests'
import type { Family, WorkingFamily, WorkingGuest } from '@/types'
import { serverSupabaseClient } from '#supabase/server'

const guestListArray = guestList.split(/\r?\n/)
const listHeaders = guestListArray.shift()?.split(',')

const result = guestListArray.map((guest) => {
  const regex = /"(.*?)"/g
  const result = guest.match(regex)
  const keyWord = result?.[0] || '"'

  const guestArray = guest.replaceAll(keyWord, '').split(',')

  const guestObject: { [key: string]: string } = {}
  if (listHeaders) {
    listHeaders.forEach((header, index) => {
      guestObject[header] = guestArray[index]
    })
  }

  return guestObject
}).map((guest) => {
  /* console.log(guest) */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { email, delete1, ...correctedGuest } = guest
  return correctedGuest
}).reduce((acc, guest, i) => {
  const {
    name,
    surname,
    plusOne,
    group,
    miembroUno,
    miembroDos,
    miembroTres,
    miembroCuatro,
    miembroCinco,
  } = guest

  const _family = {} as WorkingFamily
  const falseFamId = i + 2
  _family.group = group
  _family.name = `${falseFamId}`
  _family.songTitle = ''
  _family.comments = ''
  const newGuests = [`${name} ${surname}`, plusOne, miembroUno, miembroDos, miembroTres, miembroCuatro, miembroCinco].filter(Boolean)
  const _guests = newGuests.map((guest, index) => {
    const _guest = {} as WorkingGuest
    _guest.name = guest
    _guest.isHead = index === 0 ? 1 : 0
    _guest.confirmed = 0
    _guest.familyId = falseFamId

    return _guest
  })

  acc.push([_family, _guests])

  return acc
}, [] as any[])

export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event)

  const { data: families } = await client.from('families').select('*, guests(*)') as { data: Family[] }
  /* Save the families in a .json file named as 'familes-${date}' */
  const date = new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-')
  const fileName = `families-${date}.json`
  fs.mkdirSync('./families', { recursive: true })
  fs.writeFileSync(`./families/${fileName}`, JSON.stringify(families, null, 2))

  const guestIds = families?.flatMap(family => family.guests.map(guest => guest.id)) || []
  for (let i = 0; i < guestIds.length; i++) {
    const id = guestIds[i]
    const { error: purgeError } = await client.from('guests').delete().eq('id', id)
    if (purgeError) {
      console.error(id)
      console.error(purgeError)
      throw createError({
        statusCode: 500,
        statusMessage: 'Error purging guests',
      })
    }
  }

  const familieIds = families?.map(family => family?.id) || []

  for (let i = 0; i < familieIds.length; i++) {
    const id = familieIds[i]
    const { error: purgeError } = await client.from('families').delete().eq('id', id)
    if (purgeError) {
      console.error(id)
      console.error(purgeError)
      throw createError({
        statusCode: 500,
        statusMessage: 'Error purging families',
      })
    }
  }

  console.log('Purged families and guests')
  const makeFamilies = result.map(family => family[0])

  const { data, error } = await client.from('families').insert(makeFamilies).select()
  if (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error inserting families',
    })
  }
  const familyIdsTable = (data as Family[])?.map(family => [family.id, Number(family.name)]) || []
  const makeGuests = result.map(family => family[1]).flat() as Guest[]
  const makeGuestsWithFamilyId = makeGuests.map((guest) => {
    const familyId = familyIdsTable.find(family => family[1] === Number(guest.familyId))
    if (!familyId) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Error inserting guests',
      })
    }
    return { ...guest, familyId: familyId[0] }
  })

  const { data: guests, error: guestsErrors } = await client.from('guests').insert(makeGuestsWithFamilyId).select()
  if (guestsErrors) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error inserting guests',
    })
  }

  return [data, guests]
})
