import '../../global.css'
import { palette } from '@prismark/theme'
import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'
import { Uniwind } from 'uniwind'

// One theme. Keeps native alerts, sheets, and the keyboard dark as well.
Uniwind.setTheme('dark')

// The navigator paints its own ground under every screen. Left alone it is
// white, and shows through during transitions and behind short content.
const screenOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: palette.bg },
} as const

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={palette.bg} />
      <Stack screenOptions={screenOptions} />
    </>
  )
}
