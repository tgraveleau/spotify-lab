import type { Config } from 'tailwindcss'

import { colors } from './src/ui/theme/colors'
import { spacings } from './src/ui/theme/spacings'
import { convertNumberToPx } from './src/ui/theme/theme.lib'

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'media',
  theme: {
    extend: {
      colors,
      spacing: convertNumberToPx(spacings),
    },
  },
  plugins: [],
}

export default config
