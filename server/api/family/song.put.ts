import { serverSupabaseClient } from '#supabase/server'
import type { Family } from '@/types'
export default eventHandler(async (event) => {
  const body = await readBody(event)
  const client = serverSupabaseClient(event)

  const { id, songTitle } = body as Partial<Family>

  if (!id || !songTitle) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
    })
  }

  // @ts-expect-error: Supabase doesn't know about the songTitle field
  const { data, error } = await client.from('families').update({ songTitle }).eq('id', id).select()

  if (!data || error) {
    console.error(error)
    throw createError({
      statusCode: 404,
      statusMessage: 'Song Title had an error',
    })
  }

  if (data[0])
    return { family: data[0] as Family }

  throw createError({
    statusCode: 418,
    statusMessage: 'Your song is a teapot',
  })
})
