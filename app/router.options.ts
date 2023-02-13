export default {
  scrollBehavior: async (to: any, from: any, savedPosition: any) => {
    if (savedPosition)
      return savedPosition

    const findEl = async (hash: string, x: number) => {
      return document.querySelector(hash)
        || new Promise((resolve) => {
          if (x > 50)
            return resolve(null)

          setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
        })
    }
    function Position(obj: any) {
      let currentTop = 0
      if (obj.offsetParent) {
        do
          currentTop += obj.offsetTop
        while ((obj = obj.offsetParent))
        return currentTop
      }
    }

    if (to.hash) {
      const el = await findEl(to.hash, 0) as HTMLElement
      if ('scrollBehavior' in document.documentElement.style)
        return window.scrollTo({ top: Position(el), behavior: 'smooth' })

      else
        return window.scrollTo(0, el.offsetTop)
    }

    return { x: 0, y: 0, behavior: 'smooth' }
  },
}
