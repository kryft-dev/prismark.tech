import '../../global.css'
import { Stack } from 'expo-router'
import { Uniwind } from 'uniwind'

// One theme. Keeps native alerts, sheets, and the keyboard dark as well.
Uniwind.setTheme('dark')

const screenOptions = { headerShown: false } as const

export default function RootLayout() {
  return <Stack screenOptions={screenOptions} />
}
