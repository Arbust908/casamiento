import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'inline-block rounded-xl px-4 py-2 mt-4 transition duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1 hover:scale-110'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
    ['border-base', 'border-gray-200 dark:border-dark-200'],
    ['bg-base', 'bg-white dark:bg-dark-100'],
    ['color-base', 'text-gray-900 dark:text-dark-300'],
    ['color-fade', 'text-gray-900:50 dark:text-dark-300:50'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'height': '1.5em',
        'flex-shrink': '0',
        'display': 'inline-block',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  include: ['./**/*.vue', './**/*.md'],
})
