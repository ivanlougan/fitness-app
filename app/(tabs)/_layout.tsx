import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#e91e63',
      headerShown: false,
      tabBarStyle: { backgroundColor: '#FFF9FB' }
    }}>
      <Tabs.Screen name="index" options={{ title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          )
        }} />
        <Tabs.Screen name="menu" options={{ title: "Extras",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'list' : 'list-outline'} size={24} color={color} />
          )
         }} />
      <Tabs.Screen name="leaderboards" options={{ title: "Leaderboards",
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'people' : 'people-outline'} size={24} color={color} />
        )
       }} />
      <Tabs.Screen name="user" options={{ title: "Profile",
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
        )
       }} />
    </Tabs>
  )
}
