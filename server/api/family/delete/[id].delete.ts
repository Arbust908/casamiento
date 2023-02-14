import { serverSupabaseClient } from '#supabase/server'
import type { Family } from '@/types'
export default eventHandler(async (event) => {
  const params = getRouterParams(event)
  const client = serverSupabaseClient(event)
  const { data } = await client.from('families').select('*, guests(*)').eq('id', params.id).limit(1) as { data: Family[] }
  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Family not found',
    })
  }

  const guestIds = data[0].guests.map(guest => guest.id)

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
  const { error } = await client.from('families').delete().eq('id', params.id)

  if (!error) {
    return params.id
  }
  else {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error purging families',
    })
  }
})
