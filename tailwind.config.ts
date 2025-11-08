import type { Config } from 'tailwindcss'

import { theme } from './src/ui/theme/theme'

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'media',
  theme: {
    extend: theme,
  },
  plugins: [],
}

export default config
