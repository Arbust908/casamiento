export function glue(args: string[]) {
  if (args.length === 0)
    return ''

  if (args.length === 1)
    return args[0]

  const last = args.pop()

  return `${args.join(', ')} y ${last}`
}
