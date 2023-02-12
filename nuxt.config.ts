export default defineNuxtConfig({
  app: {
    head: {
      title: 'Alda & Fran se Casan!',
      meta: [
        { name: 'description', content: 'Nos casamos el 24 de marzo a las 16:00 en Estacion Fatima' },
      ],
    },
  },
  modules: [
    '@nuxt/image-edge',
    '@nuxtjs/color-mode',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt',
  ],
  css: [
    '@/assets/main.css',
  ],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
  router: {
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

      if (to.hash) {
        const el = await findEl(to.hash, 0) as HTMLElement
        if ('scrollBehavior' in document.documentElement.style)
          return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })

        else
          return window.scrollTo(0, el.offsetTop)
      }

      return { x: 0, y: 0, behavior: 'smooth' }
    },
  },
  vite: {
    server: {
      hmr: {
        clientPort: 24600,
        port: 24600,
      },
      watch: {
        usePolling: true,
      },
    },
  },
  experimental: {
    viteNode: false,
  },
  unocss: {
    preflight: true,
  },
  colorMode: {
    classSuffix: '',
  },
  // https://github.com/nuxt/framework/issues/6204#issuecomment-1201398080
  hooks: {
    'vite:extendConfig': function (config: any, { isServer }: any) {
      if (isServer) {
        // Workaround for netlify issue
        // https://github.com/nuxt/framework/issues/6204
        config.build.rollupOptions.output.inlineDynamicImports = true
      }
    },
  },
  plugins: [],
})
