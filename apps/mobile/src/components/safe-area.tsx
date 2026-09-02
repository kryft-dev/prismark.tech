import { SafeAreaView } from 'react-native-safe-area-context'
import { withUniwind } from 'uniwind'

// Uniwind only reads className on React Native's own components. Anything from
// another package has to be wrapped once, or its classes silently do nothing.
export const SafeArea = withUniwind(SafeAreaView)
