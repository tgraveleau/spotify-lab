import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs'

import { colors } from '$ui/theme/colors'

export default function TabLayout() {
  return (
    <NativeTabs tintColor={colors.primary}>
      <NativeTabs.Trigger name="wrapped">
        <Icon sf={{ default: 'list.bullet.rectangle', selected: 'list.bullet.rectangle.fill' }} />
        <Label>Wrapped</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="discover">
        <Icon
          sf={{
            default: 'rectangle.and.text.magnifyingglass',
            selected: 'rectangle.and.text.magnifyingglass.rtl',
          }}
        />
        <Label>Discover</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Icon sf={{ default: 'person.crop.circle', selected: 'person.crop.circle.fill' }} />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
