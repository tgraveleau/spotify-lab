import { Tabs } from 'expo-router'
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs'

import { colors } from '$ui/theme/colors'

export default function TabLayout() {
  const liquidGlassActivated = true
  return liquidGlassActivated ? (
    <NativeTabs tintColor={colors.text.accent}>
      <NativeTabs.Trigger name="wrapped">
        <Icon sf={{ default: 'list.bullet.rectangle', selected: 'list.bullet.rectangle.fill' }} />
        <Label>Wrapped</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Icon sf={{ default: 'person', selected: 'person.fill' }} />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  ) : (
    <Tabs>
      <Tabs.Screen name="wrapped" options={{ title: 'Wrapped' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  )
}
