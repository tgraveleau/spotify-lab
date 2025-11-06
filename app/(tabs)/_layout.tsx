import { Tabs } from 'expo-router'
import React from 'react'

import { HapticTab } from '$ui/components/haptic-tab'
import { IconSymbol } from '$ui/components/ui/icon-symbol'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1DB954',
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="wrapped"
        options={{
          title: 'Wrapped',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="list.bullet.circle.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  )
}
