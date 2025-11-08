import type { Config } from 'tailwindcss'

import { colors } from './src/ui/theme/colors'
import { convertNumberToPx } from './src/ui/theme/convertNumberToPx'
import { spacings } from './src/ui/theme/spacings'
// import { fonts } from './src/ui/theme/fonts'

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'media',
  theme: {
    extend: {
      colors,
      spacing: convertNumberToPx(spacings),
      // fontFamily: { ...fonts },
    },
  },
  plugins: [],
}

export default config
