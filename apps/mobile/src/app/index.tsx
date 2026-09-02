import { palette } from '@prismark/theme'
import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native'

import { Mark } from '../components/mark'
import { SafeArea } from '../components/safe-area'

const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState('')

  const sendCode = useCallback(() => {
    const trimmed = email.trim()
    if (!trimmed.includes('@')) return
    router.push({ pathname: '/code', params: { email: trimmed } })
  }, [email, router])

  return (
    <SafeArea className="flex-1 bg-background">
      <KeyboardAvoidingView behavior={keyboardBehavior} className="flex-1">
        <View className="flex-1 justify-center px-5 pb-20">
          <View className="mb-7">
            <Mark />
          </View>
          <Text className="text-[26px] leading-8 font-semibold tracking-tight text-foreground">
            Sign in to Prismark
          </Text>
          <Text className="mt-1 text-base text-muted-foreground">
            We'll email you a six-digit code. No passwords here.
          </Text>

          <Text className="mt-4 text-sm text-muted-foreground">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={sendCode}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="send"
            keyboardAppearance="dark"
            selectionColor={palette.text}
            className="mt-1.5 h-11 rounded-md border border-input bg-ground px-3 text-[15px] text-foreground"
          />

          <Pressable
            onPress={sendCode}
            accessibilityRole="button"
            className="mt-5 h-11 items-center justify-center rounded-md bg-primary"
          >
            <Text className="text-[15px] font-medium text-primary-foreground">Send me a code</Text>
          </Pressable>

          <Text className="mt-3 text-sm text-muted-foreground">
            Don't have an account? Someone at your company creates it for you.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeArea>
  )
}
