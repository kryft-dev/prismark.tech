import { palette } from '@prismark/theme'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { CodeInput } from '../components/code-input'

const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined

export default function Code() {
  const router = useRouter()
  const { email } = useLocalSearchParams<{ email: string }>()
  const [code, setCode] = useState('')

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView behavior={keyboardBehavior} className="flex-1">
        <View className="flex-1 justify-center px-5 pb-20">
          <Pressable
            onPress={router.back}
            accessibilityRole="button"
            className="mb-2.5 flex-row items-center gap-1 self-start"
          >
            <ChevronLeft size={14} strokeWidth={2} color={palette.text2} />
            <Text className="text-sm text-muted-foreground">Different email</Text>
          </Pressable>
          <Text className="text-[26px] leading-8 font-semibold tracking-tight text-foreground">
            Check your email
          </Text>
          <Text className="mt-1 text-base text-muted-foreground">
            We sent a code to {email}. It works for 10 minutes.
          </Text>

          <CodeInput value={code} onChange={setCode} />

          <Pressable accessibilityRole="button" className="mt-3 self-start">
            <Text className="text-sm font-medium text-info">Send a new code</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
