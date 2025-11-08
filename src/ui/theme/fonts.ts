import { useFonts as useExpoFonts } from 'expo-font'

export const fonts = {
  sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
  serif: 'ui-serif',
  rounded: 'ui-rounded',
  mono: 'ui-monospace',
}

export const useFonts = () => {
  const [fontsLoaded] = useExpoFonts({
    Inter: require('@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf'),
    'Inter-Medium': require('@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf'),
    'Inter-SemiBold': require('@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf'),
    'Inter-Bold': require('@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf'),
  })

  return fontsLoaded
}
