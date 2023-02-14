import { serverSupabaseClient } from '#supabase/server'
import type { Family } from '@/types'
export default eventHandler(async (event) => {
  const body = await readBody(event)
  const client = serverSupabaseClient(event)

  const { id, wasSent } = body as Partial<Family>
  if (!wasSent || !id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
    })
  }

  // @ts-expect-error: Supabase doesn't know about the comments field
  const { data, error } = await client.from('families').update({ wasSent }).eq('id', id).select()

  if (!data || error) {
    console.error(error)
    throw createError({
      statusCode: 404,
      statusMessage: 'fam had an error',
    })
  }

  if (data[0])
    return { family: data[0] as Family }

  throw createError({
    statusCode: 418,
    statusMessage: 'Your family is a teapot',
  })
})
